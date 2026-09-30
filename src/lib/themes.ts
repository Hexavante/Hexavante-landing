// Temas da landing — portados do app principal.
// Cada tema aplica variáveis CSS no <html> + classes de efeito no <body>.

export type ThemeMode = "dark" | "light";

export type LandingThemeVars = {
  "--background": string;
  "--foreground": string;
  "--primary": string;
  "--accent": string;
  "--surface": string;
  "--border": string;
  /** Ausentes no tema default: valem os fallbacks de globals.css (idênticos
   *  aos do app) — glow e gradiente do tema padrão são do próprio CSS. */
  "--theme-glow-1"?: string;
  "--theme-glow-2"?: string;
  "--theme-gradient-from"?: string;
  "--theme-gradient-mid"?: string;
  "--theme-gradient-to"?: string;
  /** Cor do texto sobre --primary (botões). Branco reprovava em 8 temas
   *  escuros (ex.: hacker 2.28:1) — valem os que passam ≥4.5:1. */
  "--primary-fg"?: string;
  /** Hover do botão primário. Sem isto todos os temas herdavam o #1d4ed8 de
   *  :root (o botão hacker ficava azul no hover). */
  "--primary-hover"?: string;
};

export type LandingTheme = {
  id: string;
  label: string;
  mode: ThemeMode;
  vars: LandingThemeVars;
  fx: string[];
};

export const THEME_STORAGE_KEY = "hx-landing-theme";
export const DEFAULT_THEME_ID = "default";

/** Classes de efeito (body) suportadas pelos temas. */
export const LANDING_FX_CLASSES = [
  "fx-glow-pulse",
  "fx-shimmer",
  "fx-aurora-bg",
] as const;

export const LANDING_THEMES: LandingTheme[] = [
  {
    // Tema default = tema "Padrão Hexavante" do app logado. Sem vars próprias
    // de glow/gradiente: valem os fallbacks de globals.css (.hx-themed-shell),
    // que são exatamente os do app. Nada aqui diverge de :root.
    id: "default",
    label: "Padrão",
    mode: "dark",
    vars: {
      "--background": "#06080f",
      "--foreground": "#f8fafc",
      "--primary": "#2563eb",
      "--accent": "#14b8a6",
      "--surface": "rgba(15, 23, 42, 0.78)",
      "--border": "rgba(148, 163, 184, 0.18)",
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
      "--primary": "#d946ef",
      "--primary-hover": "#e879f9",
      "--primary-fg": "#020617",
      "--accent": "#22d3ee",
      "--surface": "rgba(24, 12, 32, 0.8)",
      "--border": "rgba(217, 70, 239, 0.22)",
      "--theme-glow-1": "rgba(217, 70, 239, 0.2)",
      "--theme-glow-2": "rgba(34, 211, 238, 0.14)",
      "--theme-gradient-from": "#0c0614",
      "--theme-gradient-mid": "#1a0b28",
      "--theme-gradient-to": "#0c0614",
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
      "--primary": "#22c55e",
      "--primary-hover": "#4ade80",
      "--primary-fg": "#020617",
      "--accent": "#4ade80",
      "--surface": "rgba(8, 22, 12, 0.82)",
      "--border": "rgba(34, 197, 94, 0.22)",
      "--theme-glow-1": "rgba(34, 197, 94, 0.18)",
      "--theme-glow-2": "rgba(74, 222, 128, 0.12)",
      "--theme-gradient-from": "#030a05",
      "--theme-gradient-mid": "#07160c",
      "--theme-gradient-to": "#030a05",
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
      "--primary": "#6366f1",
      "--primary-hover": "#818cf8",
      "--primary-fg": "#020617",
      "--accent": "#94a3b8",
      "--surface": "rgba(12, 12, 18, 0.82)",
      "--border": "rgba(99, 102, 241, 0.22)",
      "--theme-glow-1": "rgba(99, 102, 241, 0.18)",
      "--theme-glow-2": "rgba(148, 163, 184, 0.12)",
      "--theme-gradient-from": "#020203",
      "--theme-gradient-mid": "#0e0e16",
      "--theme-gradient-to": "#020203",
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
      "--primary": "#f97316",
      "--primary-hover": "#fb923c",
      "--primary-fg": "#020617",
      "--accent": "#fbbf24",
      "--surface": "rgba(38, 18, 14, 0.82)",
      "--border": "rgba(249, 115, 22, 0.24)",
      "--theme-glow-1": "rgba(249, 115, 22, 0.2)",
      "--theme-glow-2": "rgba(251, 191, 36, 0.14)",
      "--theme-gradient-from": "#1a0a08",
      "--theme-gradient-mid": "#2c130d",
      "--theme-gradient-to": "#1a0a08",
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
      "--primary": "#0ea5e9",
      "--primary-hover": "#38bdf8",
      "--primary-fg": "#020617",
      "--accent": "#22d3ee",
      "--surface": "rgba(8, 28, 40, 0.82)",
      "--border": "rgba(14, 165, 233, 0.24)",
      "--theme-glow-1": "rgba(14, 165, 233, 0.2)",
      "--theme-glow-2": "rgba(34, 211, 238, 0.14)",
      "--theme-gradient-from": "#041018",
      "--theme-gradient-mid": "#082434",
      "--theme-gradient-to": "#041018",
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
      "--primary": "#ec4899",
      "--primary-hover": "#f472b6",
      "--primary-fg": "#020617",
      "--accent": "#f9a8d4",
      "--surface": "rgba(38, 16, 30, 0.82)",
      "--border": "rgba(236, 72, 153, 0.24)",
      "--theme-glow-1": "rgba(236, 72, 153, 0.2)",
      "--theme-glow-2": "rgba(249, 168, 212, 0.14)",
      "--theme-gradient-from": "#1a0a14",
      "--theme-gradient-mid": "#2e1226",
      "--theme-gradient-to": "#1a0a14",
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
      "--primary": "#8b5cf6",
      "--primary-hover": "#a78bfa",
      "--primary-fg": "#020617",
      "--accent": "#a78bfa",
      "--surface": "rgba(18, 12, 42, 0.82)",
      "--border": "rgba(139, 92, 246, 0.24)",
      "--theme-glow-1": "rgba(139, 92, 246, 0.2)",
      "--theme-glow-2": "rgba(167, 139, 250, 0.14)",
      "--theme-gradient-from": "#08051a",
      "--theme-gradient-mid": "#150e38",
      "--theme-gradient-to": "#08051a",
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
      "--primary": "#f59e0b",
      "--primary-hover": "#fbbf24",
      "--primary-fg": "#020617",
      "--accent": "#fcd34d",
      "--surface": "rgba(32, 26, 16, 0.82)",
      "--border": "rgba(245, 158, 11, 0.24)",
      "--theme-glow-1": "rgba(245, 158, 11, 0.2)",
      "--theme-glow-2": "rgba(252, 211, 77, 0.14)",
      "--theme-gradient-from": "#14100a",
      "--theme-gradient-mid": "#261c10",
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
      "--primary-hover": "#4338ca",
      "--accent": "#0ea5e9",
      "--surface": "rgba(255, 255, 255, 0.95)",
      "--border": "rgba(0, 0, 0, 0.08)",
      "--primary-fg": "#ffffff",
      "--theme-glow-1": "rgba(88, 101, 242, 0.1)",
      "--theme-glow-2": "rgba(14, 165, 233, 0.08)",
      "--theme-gradient-from": "#ffffff",
      "--theme-gradient-mid": "#eef2ff",
      "--theme-gradient-to": "#ffffff",
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
      "--primary": "#0d9488",
      "--primary-hover": "#14b8a6",
      "--accent": "#14b8a6",
      "--surface": "rgba(255, 255, 255, 0.95)",
      "--border": "rgba(0, 0, 0, 0.08)",
      /* #0d9488 com texto branco dá 3.8:1 — texto escuro passa 4.5:1 */
      "--primary-fg": "#0f172a",
      "--theme-glow-1": "rgba(13, 148, 136, 0.1)",
      "--theme-glow-2": "rgba(20, 184, 166, 0.08)",
      "--theme-gradient-from": "#f8fafc",
      "--theme-gradient-mid": "#e6f4f2",
      "--theme-gradient-to": "#f8fafc",
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
      "--primary": "#d97706",
      "--primary-hover": "#f59e0b",
      "--accent": "#f59e0b",
      "--surface": "rgba(255, 255, 255, 0.94)",
      "--border": "rgba(0, 0, 0, 0.08)",
      /* #d97706 com texto branco dá 3.2:1 — texto escuro passa 4.5:1 */
      "--primary-fg": "#0f172a",
      "--theme-glow-1": "rgba(217, 119, 6, 0.1)",
      "--theme-glow-2": "rgba(245, 158, 11, 0.08)",
      "--theme-gradient-from": "#fffdf7",
      "--theme-gradient-mid": "#fef3e2",
      "--theme-gradient-to": "#fffdf7",
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
      "--accent": "#a78bfa",
      "--surface": "rgba(255, 255, 255, 0.94)",
      "--border": "rgba(0, 0, 0, 0.08)",
      "--primary-fg": "#ffffff",
      "--theme-glow-1": "rgba(124, 58, 237, 0.1)",
      "--theme-glow-2": "rgba(167, 139, 250, 0.08)",
      "--theme-gradient-from": "#faf9fe",
      "--theme-gradient-mid": "#ede9fe",
      "--theme-gradient-to": "#faf9fe",
    },
    fx: [],
  },
];

export function getLandingTheme(id: string | null | undefined): LandingTheme {
  return (
    LANDING_THEMES.find((t) => t.id === id) ??
    LANDING_THEMES.find((t) => t.id === DEFAULT_THEME_ID)!
  );
}

/**
 * Variáveis já gravadas no <html> pelo último tema. Limpas na troca para não
 * vazar: o tema default não define glow/gradiente (usa o fallback do CSS, igual
 * ao app), então as vars do tema anterior precisam sair do inline style.
 */
let appliedThemeKeys: string[] = [];

/** Aplica o tema no <html> (vars + data-theme-mode) e os efeitos no <body>. */
export function applyLandingTheme(theme: LandingTheme): void {
  if (typeof document === "undefined") return;
  const root = document.documentElement;
  for (const key of appliedThemeKeys) {
    if (!(key in theme.vars)) root.style.removeProperty(key);
  }
  for (const [key, value] of Object.entries(theme.vars)) {
    root.style.setProperty(key, value);
  }
  appliedThemeKeys = Object.keys(theme.vars);
  root.setAttribute("data-theme-mode", theme.mode);
  for (const fx of LANDING_FX_CLASSES) {
    document.body.classList.toggle(fx, theme.fx.includes(fx));
  }
}
