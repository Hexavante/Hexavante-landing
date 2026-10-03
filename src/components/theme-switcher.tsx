"use client";

import { useEffect, useState } from "react";
import { Check, Lock, Palette } from "lucide-react";
import Link from "next/link";
import { LANDING_THEMES } from "@/lib/themes";
import { useLandingTheme } from "@/components/theme-provider";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "https://app.hexavante.com.br";

export function ThemeSwitcher() {
  const [open, setOpen] = useState(false);
  const [pendingId, setPendingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { authenticated, ownedThemeIds, equippedThemeId, equipTheme } = useLandingTheme();

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  async function choose(id: string) {
    if (!ownedThemeIds.includes(id) || pendingId) return;
    setPendingId(id);
    setError(null);
    const message = await equipTheme(id);
    setPendingId(null);
    if (message) {
      setError(message);
      return;
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
            <p className="px-2.5 pb-1 pt-1.5 text-[10px] font-bold uppercase tracking-widest text-[hsl(var(--sidebar-foreground)/0.5)]">
              Tema
            </p>
            {LANDING_THEMES.map((theme) => {
                  const isActive = theme.id === equippedThemeId;
                  const isOwned = ownedThemeIds.includes(theme.id);
                  return (
                    <button
                  key={theme.id}
                  type="button"
                      onClick={() => void choose(theme.id)}
                      disabled={!isOwned || pendingId !== null}
                      aria-pressed={isActive}
                      className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-left text-sm transition ${
                        isActive
                          ? "text-[hsl(var(--sidebar-foreground))]"
                          : isOwned
                            ? "text-[hsl(var(--sidebar-foreground)/0.78)] hover:bg-white/[0.06]"
                            : "cursor-not-allowed text-[hsl(var(--sidebar-foreground)/0.38)]"
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
                  {pendingId === theme.id ? (
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent" aria-label="Equipando" />
                  ) : isActive ? (
                    <Check className="h-4 w-4 shrink-0" />
                  ) : !isOwned ? (
                    <Lock className="h-3.5 w-3.5 shrink-0" aria-label="Tema não adquirido" />
                  ) : null}
                </button>
              );
            })}
            {error && <p role="alert" className="px-2.5 py-2 text-xs text-rose-400">{error}</p>}
            {!authenticated && (
              <Link href={APP_URL} className="mt-1 block rounded-lg border-t border-white/[0.08] px-2.5 py-2.5 text-xs font-semibold text-[hsl(var(--sidebar-highlight))] hover:bg-white/[0.04]">
                Entre no app para liberar temas
              </Link>
            )}
          </div>
        </>
      )}
    </div>
  );
}
