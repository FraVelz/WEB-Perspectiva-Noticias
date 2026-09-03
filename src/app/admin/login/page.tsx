"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { BrandMark, Tagline } from "@/components/brand-mark";
import { useAuth } from "@/components/admin/auth-provider";

export default function AdminLoginPage() {
  const { login, register, configured } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"login" | "register">("login");
  const [error, setError] = useState("");

  async function onSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    try {
      if (mode === "login") await login(email, password);
      else await register(email, password);
      router.replace("/admin");
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo entrar");
    }
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-md flex-col justify-center px-6">
      <BrandMark href="/" />
      <Tagline />
      <h1 className="mt-8 font-[family-name:var(--font-display)] text-3xl">Mesa de redacción</h1>
      {!configured ? (
        <p className="mt-4 text-sm text-breaking">Falta la configuración de Firebase en .env.local.</p>
      ) : (
        <form onSubmit={onSubmit} className="mt-6 space-y-4 font-[family-name:var(--font-sans)]">
          <input
            type="email"
            required
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-ink bg-paper px-3 py-2"
          />
          <input
            type="password"
            required
            minLength={6}
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-ink bg-paper px-3 py-2"
          />
          {error ? <p className="text-sm text-breaking">{error}</p> : null}
          <button
            type="submit"
            className="w-full border border-ink bg-ink py-2 text-[11px] uppercase tracking-[0.2em] text-paper"
          >
            {mode === "login" ? "Entrar" : "Crear cuenta"}
          </button>
        </form>
      )}
      <button
        type="button"
        className="mt-4 text-left text-sm underline"
        onClick={() => setMode(mode === "login" ? "register" : "login")}
      >
        {mode === "login" ? "Crear primera cuenta de redacción" : "Ya tengo cuenta"}
      </button>
    </main>
  );
}
