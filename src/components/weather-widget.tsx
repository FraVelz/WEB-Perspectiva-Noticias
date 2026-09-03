"use client";

import { useEffect, useState } from "react";

export function WeatherWidget() {
  const [temp, setTemp] = useState<number | null>(null);

  useEffect(() => {
    fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=4.711&longitude=-74.0721&current=temperature_2m",
    )
      .then((r) => r.json())
      .then((data) => {
        const value = data?.current?.temperature_2m;
        if (typeof value === "number") setTemp(Math.round(value));
      })
      .catch(() => setTemp(15));
  }, []);

  return (
    <aside className="border border-ink p-4">
      <h2 className="font-[family-name:var(--font-sans)] text-[11px] uppercase tracking-[0.28em]">
        Clima · Bogotá
      </h2>
      <p className="mt-3 font-[family-name:var(--font-display)] text-4xl">
        {temp === null ? "—" : `${temp}°`}
      </p>
      <p className="mt-1 text-sm text-muted">Sabana, edición de la tarde</p>
    </aside>
  );
}
