import { readFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const PROJECT = "perspectiva-noticias";
const LOCATION = "southamerica-east1";

function token() {
  const cfg = JSON.parse(
    readFileSync(join(homedir(), ".config/configstore/firebase-tools.json"), "utf8"),
  );
  const access = cfg.tokens?.access_token;
  if (!access) throw new Error("No hay access_token de Firebase CLI");
  return access;
}

async function api(url, { method = "GET", body } = {}) {
  const res = await fetch(url, {
    method,
    headers: {
      Authorization: `Bearer ${token()}`,
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let json;
  try {
    json = text ? JSON.parse(text) : {};
  } catch {
    json = { raw: text };
  }
  if (!res.ok) {
    const err = json.error?.message || json.error?.status || text || res.statusText;
    const e = new Error(`${method} ${url} → ${res.status}: ${err}`);
    e.status = res.status;
    e.body = json;
    throw e;
  }
  return json;
}

async function enableService(service) {
  try {
    await api(
      `https://serviceusage.googleapis.com/v1/projects/${PROJECT}/services/${service}:enable`,
      { method: "POST", body: {} },
    );
    console.log(`API habilitada: ${service}`);
  } catch (err) {
    if (String(err.message).includes("already enabled") || err.status === 409) {
      console.log(`API ya activa: ${service}`);
      return;
    }
    throw err;
  }
}

async function wait(ms) {
  await new Promise((r) => setTimeout(r, ms));
}

async function createFirestore() {
  const url = `https://firestore.googleapis.com/v1/projects/${PROJECT}/databases?databaseId=(default)`;
  const body = {
    locationId: LOCATION,
    type: "FIRESTORE_NATIVE",
    concurrencyMode: "PESSIMISTIC",
    appEngineIntegrationMode: "DISABLED",
  };
  for (let i = 0; i < 8; i++) {
    try {
      const op = await api(url, { method: "POST", body });
      console.log("Creando Firestore…", op.name || "ok");
      return;
    } catch (err) {
      const msg = String(err.message);
      if (msg.includes("already exists") || err.status === 409) {
        console.log("Firestore (default) ya existe");
        return;
      }
      if (err.status === 403 || err.status === 429 || msg.includes("has not been used")) {
        console.log("Esperando propagación de la API Firestore…");
        await wait(8000);
        continue;
      }
      throw err;
    }
  }
  throw new Error("No se pudo crear Firestore");
}

async function enableEmailAuth() {
  const configUrl = `https://identitytoolkit.googleapis.com/admin/v2/projects/${PROJECT}/config`;
  try {
    await api(
      `https://identitytoolkit.googleapis.com/admin/v2/projects/${PROJECT}/identityPlatform:initializeAuth`,
      { method: "POST", body: {} },
    );
    console.log("Identity Platform inicializado");
  } catch (err) {
    if (err.status !== 409 && !String(err.message).toLowerCase().includes("already")) {
      console.log("initializeAuth:", err.message);
    }
  }

  await api(`${configUrl}?updateMask=signIn.email`, {
    method: "PATCH",
    body: {
      signIn: {
        email: {
          enabled: true,
          passwordRequired: true,
        },
      },
    },
  });
  console.log("Auth email/password habilitado");
}

const services = [
  "firestore.googleapis.com",
  "identitytoolkit.googleapis.com",
  "firebase.googleapis.com",
];

for (const s of services) {
  await enableService(s);
}
await wait(4000);
await createFirestore();
await enableEmailAuth();
console.log("Firebase listo para Perspectiva Noticias");
