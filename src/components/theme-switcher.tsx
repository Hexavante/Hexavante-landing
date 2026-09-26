"use client";

import { useEffect, useState } from "react";
import { Check, Palette } from "lucide-react";
import {
  LANDING_THEMES,
  THEME_STORAGE_KEY,
  applyLandingTheme,
  getLandingTheme,
} from "@/lib/themes";

export function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState("default");

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(THEME_STORAGE_KEY);
      const theme = getLandingTheme(saved);
      applyLandingTheme(theme);
      setActiveId(theme.id);
    } catch {
      // storage indisponível: mantém o tema padrão
    }
  }, []);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open ]);

  function choose(id: string) {
    const theme = getLandingTheme(id);
    applyLandingTheme(theme);
    setActiveId(theme.id);
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme.id);
    } catch {
      // storage indisponível: tema segue aplicado só na sessão
    }
    setOpen(false);
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label="Escolher tema"
        aria-expanded={open}
        title="Tema"
        className="rounded-lg p-2 text-[hsl(var(--sidebar-foreground)/0.6)] transition hover:bg-white/[0.06] hover:text-[hsl(var(--sidebar-foreground))]"
      >
        <Palette className="h-5 w-5" />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="absolute right-0 top-full z-50 mt-2 max-h-80 w-56 overflow-y-auto rounded-xl border border-white/[0.08] bg-[hsl(var(--sidebar-background))] p-1.5 shadow-2xl shadow-black/50">
            <p className="px-2.5 pb-1 pt-1.5 text-[10px] font-bold uppercase tracking-widest text-[hsl(var(--sidebar-foreground)/0.35)]">
              Tema
            </p>
            {LANDING_THEMES.map((theme) => {
              const isActive = theme.id === activeId;
              return (
                <button
                  key={theme.id}
                  type="button"
                  onClick={() => choose(theme.id)}
                  className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition hover:bg-white/[0.06] ${
                    isActive
                      ? "text-[hsl(var(--sidebar-foreground))]"
                      : "text-[hsl(var(--sidebar-foreground)/0.78)]"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className="h-3.5 w-3.5 shrink-0 rounded-full border border-white/20"
                    style={{ backgroundColor: theme.vars["--primary"] }}
                  />
                  <span className="min-w-0 flex-1 truncate font-medium">
                    {theme.label}
                  </span>
                  {isActive && <Check className="h-4 w-4 shrink-0" />}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
