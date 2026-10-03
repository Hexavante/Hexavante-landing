"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import { applyLandingTheme, getLandingTheme, type AccountThemeState } from "@/lib/themes";

type ThemeContextValue = AccountThemeState & {
  equipTheme: (themeId: string) => Promise<string | null>;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function LandingThemeProvider({
  initialState,
  children,
}: {
  initialState: AccountThemeState;
  children: React.ReactNode;
}) {
  const [state, setState] = useState(initialState);

  const equipTheme = useCallback(async (themeId: string) => {
    if (themeId === state.equippedThemeId) return null;
    if (!state.ownedThemeIds.includes(themeId)) return "Você ainda não possui esse tema.";
    let response: Response;
    try {
      response = await fetch("/api/account/themes", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ themeId }),
      });
    } catch {
      return "Não foi possível conectar ao serviço de temas.";
    }
    const result = (await response.json().catch(() => ({}))) as { error?: string };
    if (!response.ok) return result.error ?? "Não foi possível equipar esse tema.";

    const theme = getLandingTheme(themeId);
    applyLandingTheme(theme);
    setState((current) => ({ ...current, equippedThemeId: themeId }));
    return null;
  }, [state.equippedThemeId, state.ownedThemeIds]);

  const value = useMemo(() => ({ ...state, equipTheme }), [state, equipTheme]);
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useLandingTheme() {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useLandingTheme deve ser usado dentro de LandingThemeProvider.");
  return context;
}
