// Temas da landing — portados do app principal.
// Cada tema aplica variáveis CSS no <html> + classes de efeito no <body>.

export type ThemeMode = "dark" | "light";

export type LandingThemeVars = {
  "--background": string;
  "--foreground": string;
  "--primary": string;
  "--accent": string;
  "--surface": string;
  "--surface-strong"?: string;
  "--secondary"?: string;
  "--border": string;
  /** Tokens de fundo complementares presentes nos temas do app. */
  "--theme-glow-1"?: string;
  "--theme-glow-2"?: string;
  "--theme-gradient-from"?: string;
  "--theme-gradient-mid"?: string;
  "--theme-gradient-to"?: string;
  /** Cor do texto sobre --primary, alinhada ao app. */
  "--primary-fg"?: string;
  /** Hover do botão primário. Sem isto todos os temas herdavam o #1d4ed8 de
   *  :root (o botão hacker ficava azul no hover). */
  "--primary-hover"?: string;
  "--sidebar-background"?: string;
  "--sidebar-foreground"?: string;
  "--sidebar-accent"?: string;
  "--sidebar-accent-foreground"?: string;
  "--sidebar-border"?: string;
  "--sidebar-ring"?: string;
  "--sidebar-highlight"?: string;
};

export type LandingTheme = {
  id: string;
  label: string;
  mode: ThemeMode;
  vars: LandingThemeVars;
  fx: string[];
};

export const DEFAULT_THEME_ID = "default";

/** Classes de efeito (body) suportadas pelos temas. */
export const LANDING_FX_CLASSES = [
  "fx-glow-pulse",
  "fx-shimmer",
  "fx-aurora-bg",
] as const;

export const LANDING_THEMES: LandingTheme[] = [
  {
    // Tema padrão espelha o conjunto de variáveis de cosmetics.ts no app.
    id: "default",
    label: "Padrão Hexavante",
    mode: "dark",
    vars: {
      "--background": "#06080f",
      "--foreground": "#f8fafc",
      "--primary": "#2563eb",
      "--primary-hover": "#1d4ed8",
      "--primary-fg": "#ffffff",
      "--accent": "#14b8a6",
      "--surface": "rgba(15, 23, 42, 0.78)",
      "--border": "rgba(148, 163, 184, 0.18)",
      "--theme-glow-1": "rgba(37, 99, 235, 0.2)",
      "--theme-glow-2": "rgba(34, 211, 238, 0.12)",
      "--theme-gradient-from": "#0f172a",
      "--theme-gradient-mid": "#06080f",
      "--theme-gradient-to": "#030712",
    },
    fx: [],
  },
  {
    id: "cyberpunk",
    label: "Cyberpunk",
    mode: "dark",
    vars: {
      "--background": "#0c0614",
      "--foreground": "#faf5ff",
      "--primary": "#a21caf",
      "--primary-hover": "#86198f",
      "--primary-fg": "#ffffff",
      "--accent": "#22d3ee",
      "--surface": "rgba(26, 15, 46, 0.88)",
      "--border": "rgba(217, 70, 239, 0.18)",
      "--theme-glow-1": "rgba(217, 70, 239, 0.2)",
      "--theme-glow-2": "rgba(34, 211, 238, 0.12)",
      "--theme-gradient-from": "#1a0f2e",
      "--theme-gradient-mid": "#0c0614",
      "--theme-gradient-to": "#06030a",
    },
    fx: ["fx-glow-pulse", "fx-shimmer", "fx-aurora-bg"],
  },
  {
    id: "hacker",
    label: "Hacker",
    mode: "dark",
    vars: {
      "--background": "#030a05",
      "--foreground": "#ecfdf5",
      "--primary": "#15803d",
      "--primary-hover": "#166534",
      "--primary-fg": "#ffffff",
      "--accent": "#4ade80",
      "--surface": "rgba(10, 31, 18, 0.9)",
      "--border": "rgba(34, 197, 94, 0.18)",
      "--theme-glow-1": "rgba(34, 197, 94, 0.18)",
      "--theme-glow-2": "rgba(74, 222, 128, 0.12)",
      "--theme-gradient-from": "#0a1f12",
      "--theme-gradient-mid": "#030a05",
      "--theme-gradient-to": "#010502",
    },
    fx: ["fx-glow-pulse"],
  },
  {
    id: "obsidian",
    label: "Obsidiana",
    mode: "dark",
    vars: {
      "--background": "#020203",
      "--foreground": "#e2e8f0",
      "--primary": "#4f46e5",
      "--primary-hover": "#4338ca",
      "--primary-fg": "#ffffff",
      "--accent": "#94a3b8",
      "--surface": "rgba(12, 12, 16, 0.92)",
      "--border": "rgba(148, 163, 184, 0.12)",
      "--theme-glow-1": "rgba(99, 102, 241, 0.1)",
      "--theme-glow-2": "rgba(148, 163, 184, 0.06)",
      "--theme-gradient-from": "#0c0c10",
      "--theme-gradient-mid": "#020203",
      "--theme-gradient-to": "#010102",
    },
    fx: ["fx-glow-pulse", "fx-shimmer"],
  },
  {
    id: "sunset",
    label: "Pôr do sol",
    mode: "dark",
    vars: {
      "--background": "#1a0a08",
      "--foreground": "#fff7ed",
      "--primary": "#c2410c",
      "--primary-hover": "#9a3412",
      "--primary-fg": "#ffffff",
      "--accent": "#fb7185",
      "--surface": "rgba(42, 18, 16, 0.9)",
      "--border": "rgba(249, 115, 22, 0.18)",
      "--theme-glow-1": "rgba(249, 115, 22, 0.2)",
      "--theme-glow-2": "rgba(251, 113, 133, 0.1)",
      "--theme-gradient-from": "#2a1210",
      "--theme-gradient-mid": "#1a0a08",
      "--theme-gradient-to": "#0f0504",
    },
    fx: ["fx-glow-pulse"],
  },
  {
    id: "ocean",
    label: "Oceano",
    mode: "dark",
    vars: {
      "--background": "#041018",
      "--foreground": "#ecfeff",
      "--primary": "#0369a1",
      "--primary-hover": "#075985",
      "--primary-fg": "#ffffff",
      "--accent": "#06b6d4",
      "--surface": "rgba(12, 36, 51, 0.9)",
      "--border": "rgba(14, 165, 233, 0.18)",
      "--theme-glow-1": "rgba(14, 165, 233, 0.16)",
      "--theme-glow-2": "rgba(6, 182, 212, 0.1)",
      "--theme-gradient-from": "#0c2433",
      "--theme-gradient-mid": "#041018",
      "--theme-gradient-to": "#020a10",
    },
    fx: ["fx-glow-pulse", "fx-aurora-bg"],
  },
  {
    id: "sakura",
    label: "Sakura",
    mode: "dark",
    vars: {
      "--background": "#1a0a14",
      "--foreground": "#fdf2f8",
      "--primary": "#be185d",
      "--primary-hover": "#9d174d",
      "--primary-fg": "#ffffff",
      "--accent": "#f9a8d4",
      "--surface": "rgba(42, 16, 32, 0.9)",
      "--border": "rgba(236, 72, 153, 0.18)",
      "--theme-glow-1": "rgba(236, 72, 153, 0.16)",
      "--theme-glow-2": "rgba(249, 168, 212, 0.1)",
      "--theme-gradient-from": "#2a1020",
      "--theme-gradient-mid": "#1a0a14",
      "--theme-gradient-to": "#100610",
    },
    fx: ["fx-glow-pulse", "fx-shimmer", "fx-aurora-bg"],
  },
  {
    id: "midnight",
    label: "Meia-noite",
    mode: "dark",
    vars: {
      "--background": "#08051a",
      "--foreground": "#f5f3ff",
      "--primary": "#6d28d9",
      "--primary-hover": "#5b21b6",
      "--primary-fg": "#ffffff",
      "--accent": "#a78bfa",
      "--surface": "rgba(21, 16, 42, 0.92)",
      "--border": "rgba(139, 92, 246, 0.18)",
      "--theme-glow-1": "rgba(139, 92, 246, 0.14)",
      "--theme-glow-2": "rgba(167, 139, 250, 0.08)",
      "--theme-gradient-from": "#15102a",
      "--theme-gradient-mid": "#08051a",
      "--theme-gradient-to": "#040210",
    },
    fx: ["fx-glow-pulse", "fx-shimmer"],
  },
  {
    id: "amber",
    label: "Âmbar",
    mode: "dark",
    vars: {
      "--background": "#14100a",
      "--foreground": "#fffbeb",
      "--primary": "#a16207",
      "--primary-hover": "#854d0e",
      "--primary-fg": "#ffffff",
      "--accent": "#fcd34d",
      "--surface": "rgba(36, 28, 16, 0.92)",
      "--border": "rgba(245, 158, 11, 0.18)",
      "--theme-glow-1": "rgba(245, 158, 11, 0.14)",
      "--theme-glow-2": "rgba(252, 211, 77, 0.08)",
      "--theme-gradient-from": "#241c10",
      "--theme-gradient-mid": "#14100a",
      "--theme-gradient-to": "#14100a",
    },
    fx: ["fx-glow-pulse"],
  },
  {
    id: "snow",
    label: "Neve",
    mode: "light",
    vars: {
      "--background": "#ffffff",
      "--foreground": "#1e293b",
      "--primary": "#5865f2",
      "--primary-hover": "#4752c4",
      "--accent": "#3b82f6",
      "--surface": "rgba(255, 255, 255, 0.95)",
      "--border": "rgba(0, 0, 0, 0.08)",
      "--primary-fg": "#ffffff",
      "--theme-glow-1": "rgba(88, 101, 242, 0.04)",
      "--theme-glow-2": "rgba(59, 130, 246, 0.03)",
      "--theme-gradient-from": "#ffffff",
      "--theme-gradient-mid": "#f1f5f9",
      "--theme-gradient-to": "#e2e8f0",
    },
    fx: [],
  },
  {
    id: "daylight",
    label: "Luz do dia",
    mode: "light",
    vars: {
      "--background": "#f8fafc",
      "--foreground": "#1e293b",
      "--primary": "#0f766e",
      "--primary-hover": "#115e59",
      "--accent": "#14b8a6",
      "--surface": "rgba(255, 255, 255, 0.95)",
      "--border": "rgba(0, 0, 0, 0.08)",
      "--primary-fg": "#ffffff",
      "--theme-glow-1": "rgba(13, 148, 136, 0.04)",
      "--theme-glow-2": "rgba(20, 184, 166, 0.03)",
      "--theme-gradient-from": "#f0fdfa",
      "--theme-gradient-mid": "#f8fafc",
      "--theme-gradient-to": "#e2e8f0",
    },
    fx: [],
  },
  {
    id: "cream",
    label: "Creme",
    mode: "light",
    vars: {
      "--background": "#fffdf7",
      "--foreground": "#292524",
      "--primary": "#b45309",
      "--primary-hover": "#92400e",
      "--accent": "#f59e0b",
      "--surface": "rgba(255, 255, 255, 0.94)",
      "--border": "rgba(0, 0, 0, 0.08)",
      "--primary-fg": "#ffffff",
      "--theme-glow-1": "rgba(245, 158, 11, 0.05)",
      "--theme-glow-2": "rgba(217, 119, 6, 0.03)",
      "--theme-gradient-from": "#fffdf7",
      "--theme-gradient-mid": "#fef9ee",
      "--theme-gradient-to": "#fef3c7",
    },
    fx: [],
  },
  {
    id: "pearl",
    label: "Pérola",
    mode: "light",
    vars: {
      "--background": "#faf9fe",
      "--foreground": "#1e1b4b",
      "--primary": "#7c3aed",
      "--primary-hover": "#6d28d9",
      "--accent": "#8b5cf6",
      "--surface": "rgba(255, 255, 255, 0.94)",
      "--border": "rgba(0, 0, 0, 0.08)",
      "--primary-fg": "#ffffff",
      "--theme-glow-1": "rgba(124, 58, 237, 0.04)",
      "--theme-glow-2": "rgba(139, 92, 246, 0.03)",
      "--theme-gradient-from": "#faf9fe",
      "--theme-gradient-mid": "#f5f3ff",
      "--theme-gradient-to": "#ede9f9",
    },
    fx: [],
  },
  {
    id: "hexavante-reverso",
    label: "Hexavante Reverso",
    mode: "light",
    vars: {
      "--background": "#ffffff",
      "--foreground": "#1c1917",
      "--primary": "#c1121f",
      "--primary-hover": "#9f0f19",
      "--primary-fg": "#ffffff",
      "--accent": "#e11d48",
      "--surface": "rgba(255, 255, 255, 0.95)",
      "--border": "rgba(0, 0, 0, 0.08)",
      "--theme-glow-1": "rgba(193, 18, 31, 0.05)",
      "--theme-glow-2": "rgba(225, 29, 72, 0.04)",
      "--theme-gradient-from": "#fffdfd",
      "--theme-gradient-mid": "#fef2f2",
      "--theme-gradient-to": "#ffe4e6",
    },
    fx: [],
  },
];

/** Tokens de navegação copiados de cosmetics.ts para preservar a paleta do app. */
const SIDEBAR_THEME_VARS: Record<string, Pick<LandingThemeVars,
  "--sidebar-background" | "--sidebar-foreground" | "--sidebar-accent" |
  "--sidebar-accent-foreground" | "--sidebar-border" | "--sidebar-ring" | "--sidebar-highlight"
>> = {
  default: {
    "--sidebar-background": "240 6% 7%",
    "--sidebar-foreground": "210 20% 96%",
    "--sidebar-accent": "217 25% 14%",
    "--sidebar-accent-foreground": "210 20% 98%",
    "--sidebar-border": "217 20% 16%",
    "--sidebar-ring": "217 91% 60%",
    "--sidebar-highlight": "187 85% 53%",
  },
  cyberpunk: {
    "--sidebar-background": "280 40% 7%",
    "--sidebar-foreground": "280 15% 94%",
    "--sidebar-accent": "285 35% 14%",
    "--sidebar-accent-foreground": "280 10% 97%",
    "--sidebar-border": "280 30% 16%",
    "--sidebar-ring": "292 84% 61%",
    "--sidebar-highlight": "292 84% 61%",
  },
  hacker: {
    "--sidebar-background": "145 45% 5%",
    "--sidebar-foreground": "140 20% 92%",
    "--sidebar-accent": "145 38% 11%",
    "--sidebar-accent-foreground": "140 15% 96%",
    "--sidebar-border": "145 32% 13%",
    "--sidebar-ring": "142 76% 45%",
    "--sidebar-highlight": "142 76% 45%",
  },
  obsidian: {
    "--sidebar-background": "240 10% 4%",
    "--sidebar-foreground": "220 12% 90%",
    "--sidebar-accent": "240 12% 10%",
    "--sidebar-accent-foreground": "220 10% 96%",
    "--sidebar-border": "240 8% 12%",
    "--sidebar-ring": "239 84% 67%",
    "--sidebar-highlight": "239 84% 67%",
  },
  sunset: {
    "--sidebar-background": "15 50% 7%",
    "--sidebar-foreground": "30 25% 94%",
    "--sidebar-accent": "18 42% 13%",
    "--sidebar-accent-foreground": "30 20% 97%",
    "--sidebar-border": "18 38% 15%",
    "--sidebar-ring": "25 95% 53%",
    "--sidebar-highlight": "25 95% 53%",
  },
  ocean: {
    "--sidebar-background": "205 55% 7%",
    "--sidebar-foreground": "195 25% 94%",
    "--sidebar-accent": "205 48% 12%",
    "--sidebar-accent-foreground": "195 20% 97%",
    "--sidebar-border": "205 42% 14%",
    "--sidebar-ring": "199 89% 48%",
    "--sidebar-highlight": "199 89% 48%",
  },
  sakura: {
    "--sidebar-background": "330 38% 8%",
    "--sidebar-foreground": "330 20% 94%",
    "--sidebar-accent": "330 32% 14%",
    "--sidebar-accent-foreground": "330 15% 97%",
    "--sidebar-border": "330 28% 16%",
    "--sidebar-ring": "330 81% 60%",
    "--sidebar-highlight": "330 81% 60%",
  },
  midnight: {
    "--sidebar-background": "260 42% 7%",
    "--sidebar-foreground": "260 20% 94%",
    "--sidebar-accent": "260 38% 13%",
    "--sidebar-accent-foreground": "260 15% 97%",
    "--sidebar-border": "260 32% 15%",
    "--sidebar-ring": "258 90% 66%",
    "--sidebar-highlight": "258 90% 66%",
  },
  amber: {
    "--sidebar-background": "38 38% 7%",
    "--sidebar-foreground": "45 25% 94%",
    "--sidebar-accent": "38 32% 13%",
    "--sidebar-accent-foreground": "45 20% 97%",
    "--sidebar-border": "38 28% 15%",
    "--sidebar-ring": "38 92% 50%",
    "--sidebar-highlight": "38 92% 50%",
  },
  snow: {
    "--sidebar-background": "220 20% 97%",
    "--sidebar-foreground": "222 47% 11%",
    "--sidebar-accent": "220 16% 93%",
    "--sidebar-accent-foreground": "222 47% 8%",
    "--sidebar-border": "220 13% 89%",
    "--sidebar-ring": "235 86% 57%",
    "--sidebar-highlight": "235 86% 57%",
  },
  daylight: {
    "--sidebar-background": "170 20% 97%",
    "--sidebar-foreground": "175 30% 12%",
    "--sidebar-accent": "170 16% 93%",
    "--sidebar-accent-foreground": "175 30% 8%",
    "--sidebar-border": "170 13% 89%",
    "--sidebar-ring": "162 76% 36%",
    "--sidebar-highlight": "162 76% 36%",
  },
  cream: {
    "--sidebar-background": "40 30% 97%",
    "--sidebar-foreground": "24 15% 14%",
    "--sidebar-accent": "40 20% 93%",
    "--sidebar-accent-foreground": "24 15% 10%",
    "--sidebar-border": "40 15% 89%",
    "--sidebar-ring": "32 95% 44%",
    "--sidebar-highlight": "32 95% 44%",
  },
  pearl: {
    "--sidebar-background": "265 25% 97%",
    "--sidebar-foreground": "260 30% 14%",
    "--sidebar-accent": "265 18% 93%",
    "--sidebar-accent-foreground": "260 30% 10%",
    "--sidebar-border": "265 14% 89%",
    "--sidebar-ring": "262 83% 58%",
    "--sidebar-highlight": "262 83% 52%",
  },
  "hexavante-reverso": {
    "--sidebar-background": "0 30% 98%",
    "--sidebar-foreground": "0 25% 14%",
    "--sidebar-accent": "0 62% 94%",
    "--sidebar-accent-foreground": "0 60% 20%",
    "--sidebar-border": "0 30% 90%",
    "--sidebar-ring": "0 72% 46%",
    "--sidebar-highlight": "0 72% 46%",
  },
};

const EXTRA_THEME_VARS: Record<string, Pick<LandingThemeVars, "--surface-strong" | "--secondary">> = {
  default: { "--surface-strong": "rgba(15, 23, 42, 0.96)", "--secondary": "#111827" },
  cyberpunk: { "--surface-strong": "rgba(12, 6, 20, 0.97)", "--secondary": "#1a0f2e" },
  hacker: { "--surface-strong": "rgba(3, 10, 5, 0.98)", "--secondary": "#0a1f12" },
  obsidian: { "--surface-strong": "rgba(2, 2, 3, 0.98)", "--secondary": "#0c0c10" },
  sunset: { "--surface-strong": "rgba(26, 10, 8, 0.97)", "--secondary": "#2a1210" },
  ocean: { "--surface-strong": "rgba(4, 16, 24, 0.97)", "--secondary": "#0c2433" },
  sakura: { "--surface-strong": "rgba(26, 10, 20, 0.97)", "--secondary": "#2a1020" },
  midnight: { "--surface-strong": "rgba(8, 5, 26, 0.98)", "--secondary": "#15102a" },
  amber: { "--surface-strong": "rgba(20, 16, 10, 0.98)", "--secondary": "#241c10" },
  snow: { "--surface-strong": "#ffffff", "--secondary": "#f1f5f9" },
  daylight: { "--surface-strong": "#ffffff", "--secondary": "#f0fdfa" },
  cream: { "--surface-strong": "#ffffff", "--secondary": "#fef9ee" },
  pearl: { "--surface-strong": "#ffffff", "--secondary": "#f5f3ff" },
  "hexavante-reverso": { "--surface-strong": "#ffffff", "--secondary": "#fef2f2" },
};

export type AccountThemeState = {
  authenticated: boolean;
  ownedThemeIds: string[];
  equippedThemeId: string;
};

export const DEFAULT_ACCOUNT_THEME_STATE: AccountThemeState = {
  authenticated: false,
  ownedThemeIds: [DEFAULT_THEME_ID],
  equippedThemeId: DEFAULT_THEME_ID,
};

export function getLandingTheme(id: string | null | undefined): LandingTheme {
  const theme = (
    LANDING_THEMES.find((t) => t.id === id) ??
    LANDING_THEMES.find((t) => t.id === DEFAULT_THEME_ID)!
  );
  return {
    ...theme,
    vars: {
      ...theme.vars,
      ...EXTRA_THEME_VARS[theme.id],
      ...SIDEBAR_THEME_VARS[theme.id],
    },
  };
}

/**
 * Todas as variáveis controladas pelo tema são removidas na troca antes de
 * aplicar o novo conjunto, evitando que valores opcionais vazem entre temas.
 */
const APPLIED_THEME_KEYS = Array.from(new Set([
  ...LANDING_THEMES.flatMap((theme) => Object.keys(theme.vars)),
  ...Object.values(EXTRA_THEME_VARS).flatMap((vars) => Object.keys(vars)),
  ...Object.values(SIDEBAR_THEME_VARS).flatMap((vars) => Object.keys(vars)),
]));

/** Aplica o tema no <html> (vars + data-theme-mode) e os efeitos no <body>. */
export function applyLandingTheme(theme: LandingTheme): void {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  for (const knownTheme of LANDING_THEMES) {
    root.classList.remove(`theme-${knownTheme.id}`);
    document.body.classList.remove(`theme-${knownTheme.id}`);
  }
  root.classList.add(`theme-${theme.id}`);
  document.body.classList.add(`theme-${theme.id}`);
  for (const key of APPLIED_THEME_KEYS) root.style.removeProperty(key);
  for (const [key, value] of Object.entries(theme.vars)) {
    root.style.setProperty(key, value);
  }
  root.setAttribute("data-theme-mode", theme.mode);
  for (const fx of LANDING_FX_CLASSES) {
    document.body.classList.toggle(fx, theme.fx.includes(fx));
  }
}
