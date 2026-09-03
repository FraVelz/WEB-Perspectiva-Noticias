"use client";

import { useEffect, useState } from "react";
import { IconCloud } from "./icons";

type Weather = {
  temp: number;
  humidity: number;
  wind: number;
};

async function loadWeather(): Promise<Weather> {
  const res = await fetch(
    "https://api.open-meteo.com/v1/forecast?latitude=4.711&longitude=-74.0721&current=temperature_2m,relative_humidity_2m,wind_speed_10m",
  );
  const data = await res.json();
  return {
    temp: Math.round(data.current.temperature_2m),
    humidity: Math.round(data.current.relative_humidity_2m),
    wind: Math.round(data.current.wind_speed_10m),
  };
}

export function WeatherChip() {
  const [temp, setTemp] = useState<number | null>(null);
  useEffect(() => {
    loadWeather()
      .then((w) => setTemp(w.temp))
      .catch(() => setTemp(15));
  }, []);
  if (temp === null) return null;
  return (
    <>
      <span aria-hidden>|</span>
      <span>{temp}°C</span>
    </>
  );
}

export function WeatherWidget() {
  const [weather, setWeather] = useState<Weather | null>(null);

  useEffect(() => {
    loadWeather()
      .then(setWeather)
      .catch(() => setWeather({ temp: 15, humidity: 82, wind: 8 }));
  }, []);

  return (
    <aside className="border border-ink p-4">
      <h2 className="font-[family-name:var(--font-sans)] text-[11px] uppercase tracking-[0.28em]">
        Clima · Bogotá
      </h2>
      <div className="mt-3 flex items-center gap-3">
        <IconCloud className="h-10 w-10" />
        <p className="font-[family-name:var(--font-display)] text-4xl">
          {weather ? `${weather.temp}°` : "—"}
        </p>
      </div>
      <p className="mt-2 font-[family-name:var(--font-sans)] text-[11px] uppercase tracking-[0.12em] text-muted">
        Humedad {weather?.humidity ?? "—"}% · Viento {weather?.wind ?? "—"} km/h
      </p>
    </aside>
  );
}
