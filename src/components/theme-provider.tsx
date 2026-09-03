"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";

type Theme = "paper" | "ink";

const ThemeContext = createContext<{
  theme: Theme;
  toggle: () => void;
}>({ theme: "paper", toggle: () => {} });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("paper");

  useEffect(() => {
    const stored = window.localStorage.getItem("pn-theme") as Theme | null;
    const initial = stored === "ink" || stored === "paper" ? stored : "paper";
    setTheme(initial);
    document.documentElement.classList.toggle("ink", initial === "ink");
  }, []);

  const value = useMemo(
    () => ({
      theme,
      toggle: () => {
        const next: Theme = theme === "paper" ? "ink" : "paper";
        setTheme(next);
        document.documentElement.classList.toggle("ink", next === "ink");
        window.localStorage.setItem("pn-theme", next);
      },
    }),
    [theme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}
