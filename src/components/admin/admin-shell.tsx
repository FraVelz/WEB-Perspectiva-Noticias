"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { BrandMark } from "@/components/brand-mark";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAuth } from "./auth-provider";

const LINKS = [
  { href: "/admin", label: "Redacción" },
  { href: "/admin/articulos", label: "Artículos" },
  { href: "/admin/articulos/nuevo", label: "Nuevo" },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const { user, loading, isAdmin, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const isLogin = pathname === "/admin/login";

  useEffect(() => {
    if (loading || isLogin) return;
    if (!user) router.replace("/admin/login");
  }, [loading, user, isLogin, router]);

  if (isLogin) return <>{children}</>;
  if (loading || !user) {
    return <p className="p-10 font-[family-name:var(--font-sans)] text-sm text-muted">Cargando mesa…</p>;
  }

  return (
    <div className="min-h-screen md:grid md:grid-cols-[16rem_minmax(0,1fr)]">
      <aside className="border-b border-ink p-5 md:border-b-0 md:border-r">
        <BrandMark size={48} href="/" />
        <p className="mt-4 font-[family-name:var(--font-sans)] text-[10px] uppercase tracking-[0.22em] text-muted">
          Mesa de redacción
        </p>
        <nav className="mt-6 flex flex-col gap-2 font-[family-name:var(--font-sans)] text-[12px] uppercase tracking-[0.16em]">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? "font-semibold" : "text-muted"}
            >
              {link.label}
            </Link>
          ))}
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
      </aside>
      <div className="p-6 sm:p-8">{children}</div>
    </div>
  );
}
