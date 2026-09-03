"use client";

import Link from "next/link";
import { useState } from "react";
import { BrandMark, Tagline } from "./brand-mark";
import { IconClose, IconMenu, IconSearch, IconUser } from "./icons";
import { ThemeToggle } from "./theme-toggle";
import { WeatherChip } from "./weather-widget";
import { formatEditionDate } from "@/lib/format";
import { SECTIONS } from "@/lib/sections";
import { SITE } from "@/lib/seed-data";

export function SiteHeader({ current }: { current?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="hidden items-center justify-between border-b border-[var(--rule-soft)] py-2 font-[family-name:var(--font-sans)] text-[11px] uppercase tracking-[0.14em] text-muted md:flex">
          <div className="flex flex-wrap gap-x-3">
            <span>{formatEditionDate()}</span>
            <span aria-hidden>|</span>
            <span>{SITE.edition}</span>
            <span aria-hidden>|</span>
            <span>{SITE.city}</span>
            <WeatherChip />
          </div>
          <div className="flex items-center gap-2 text-ink">
            <Link href="/buscar" className="inline-flex items-center gap-1 px-2 py-1 hover:text-blue">
              <IconSearch />
              <span className="hidden lg:inline">Buscar</span>
            </Link>
            <Link
              href="/suscribirse"
              className="border border-ink bg-ink px-3 py-1 text-paper hover:bg-blue hover:border-blue"
            >
              Suscríbete
            </Link>
            <Link href="/admin" className="inline-flex items-center gap-1 px-2 py-1 hover:text-blue" aria-label="Redacción">
              <IconUser />
              <span className="hidden lg:inline">Redacción</span>
            </Link>
            <ThemeToggle compact />
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 py-3 md:hidden">
          <button
            type="button"
            className="border border-ink p-2"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <IconClose /> : <IconMenu />}
          </button>
          <BrandMark size={48} />
          <div className="flex items-center gap-1">
            <Link href="/buscar" className="p-2" aria-label="Buscar">
              <IconSearch />
            </Link>
            <ThemeToggle compact />
          </div>
        </div>
        <p className="border-b border-[var(--rule-soft)] pb-2 text-center font-[family-name:var(--font-sans)] text-[10px] uppercase tracking-[0.16em] text-muted md:hidden">
          {formatEditionDate()} · {SITE.city}
        </p>

        <div className="hidden flex-col items-center py-5 md:flex">
          <BrandMark size={88} />
          <Tagline ruled />
        </div>

        <nav className="relative hidden border-y-[3px] border-ink md:block">
          <div className="flex items-center justify-center pr-10">
            <NavLinks current={current} />
            <Link href="/buscar" className="absolute right-0 p-2" aria-label="Buscar">
              <IconSearch />
            </Link>
          </div>
        </nav>

        {open ? (
          <div className="border-b border-ink bg-paper py-4 md:hidden">
            <NavLinks current={current} stacked onNavigate={() => setOpen(false)} />
            <div className="mt-4 flex flex-col gap-2 font-[family-name:var(--font-sans)] text-[11px] uppercase tracking-[0.18em]">
              <Link href="/suscribirse" onClick={() => setOpen(false)}>
                Suscríbete
              </Link>
              <Link href="/admin" onClick={() => setOpen(false)}>
                Redacción
              </Link>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}

function NavLinks({
  current,
  stacked = false,
  onNavigate,
}: {
  current?: string;
  stacked?: boolean;
  onNavigate?: () => void;
}) {
  const items = [{ href: "/", slug: undefined as string | undefined, label: "Inicio" }, ...SECTIONS.map((s) => ({ href: `/seccion/${s.slug}`, slug: s.slug, label: s.label }))];

  return (
    <ul
      className={
        stacked
          ? "flex flex-col gap-3 font-[family-name:var(--font-sans)] text-[12px] uppercase tracking-[0.22em]"
          : "flex flex-wrap items-center justify-center font-[family-name:var(--font-sans)] text-[11px] uppercase tracking-[0.22em]"
      }
    >
      {items.map((item, i) => (
        <li
          key={item.href}
          className={stacked ? "" : `px-3 py-2 ${i > 0 ? "border-l border-ink" : ""}`}
        >
          <Link
            href={item.href}
            onClick={onNavigate}
            className={current === item.slug || (!current && item.href === "/") ? "font-semibold" : ""}
          >
            {item.label}
          </Link>
        </li>
      ))}
    </ul>
  );
}
