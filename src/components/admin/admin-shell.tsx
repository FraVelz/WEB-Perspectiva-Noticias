"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandMark } from "@/components/brand-mark";
import { IconClose, IconDoc, IconFolder, IconMenu, IconPencil, IconPlus, IconUser } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "./auth-provider";

const LINKS = [
  { href: "/admin", label: "Redacción", icon: IconPencil },
  { href: "/admin/articulos", label: "Artículos", icon: IconDoc },
  { href: "/admin/articulos/nuevo", label: "Nuevo", icon: IconPlus },
  { href: "/admin/categorias", label: "Categorías", icon: IconFolder },
  { href: "/admin/autores", label: "Autores", icon: IconUser },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const { user, loading, isAdmin, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const isLogin = pathname === "/admin/login";
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (loading || isLogin) return;
    if (!user) router.replace("/admin/login");
  }, [loading, user, isLogin, router]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (isLogin) return <>{children}</>;
  if (loading || !user) {
    return <p className="p-10 font-[family-name:var(--font-sans)] text-sm text-muted">Cargando mesa…</p>;
  }

  const nav = (
    <>
      <BrandMark size={48} href="/" />
      <p className="mt-4 font-[family-name:var(--font-sans)] text-[10px] uppercase tracking-[0.22em] text-muted">
        Mesa de redacción
      </p>
      <nav className="mt-6 flex flex-col gap-1 font-[family-name:var(--font-sans)] text-[12px] uppercase tracking-[0.16em]">
        {LINKS.map((link) => {
          const Icon = link.icon;
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-2 px-2 py-2 ${active ? "bg-ink text-paper" : "text-muted hover:text-ink"}`}
            >
              <Icon />
              {link.label}
            </Link>
          );
        })}
      </nav>
      <div className="mt-8 space-y-3 text-sm">
        <p className="text-muted">{user.email}</p>
        {!isAdmin ? (
          <p className="text-breaking">Esta cuenta no está en la lista de redacción.</p>
        ) : null}
        <ThemeToggle compact />
        <button type="button" className="block underline" onClick={() => logout()}>
          Salir
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen md:grid md:grid-cols-[16rem_minmax(0,1fr)]">
      <div className="flex items-center justify-between border-b border-ink px-4 py-3 md:hidden">
        <BrandMark size={40} href="/" />
        <button type="button" className="border border-ink p-2" onClick={() => setOpen((v) => !v)} aria-label="Menú">
          {open ? <IconClose /> : <IconMenu />}
        </button>
      </div>
      {open ? <aside className="border-b border-ink p-5 md:hidden">{nav}</aside> : null}
      <aside className="hidden border-r border-ink p-5 md:block">{nav}</aside>
      <div className="p-4 sm:p-8">{children}</div>
    </div>
  );
}
