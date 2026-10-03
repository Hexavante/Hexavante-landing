import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { getAccountThemeState } from "@/lib/api";
import { LANDING_FX_CLASSES, getLandingTheme } from "@/lib/themes";
import { LandingThemeProvider } from "@/components/theme-provider";
import type { CSSProperties } from "react";

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Hexavante — Aprenda, pratique e evolua",
    template: "%s | Hexavante",
  },
  description:
    "Catálogo público da Hexavante: cursos, tutoriais, simulados e certificados. Aprenda, pratique e evolua em um só lugar.",
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const accountTheme = await getAccountThemeState();
  const initialTheme = getLandingTheme(accountTheme.equippedThemeId);
  const activeFx = LANDING_FX_CLASSES.filter((fx) => initialTheme.fx.includes(fx)).join(" ");

  return (
    <html
      lang="pt-BR"
      className={`${grotesk.variable} theme-${initialTheme.id}`}
      data-theme-mode={initialTheme.mode}
      style={initialTheme.vars as CSSProperties}
    >
      <body className={`app-shell overflow-x-hidden antialiased theme-${initialTheme.id} ${activeFx}`.trim()}>
        <LandingThemeProvider initialState={accountTheme}>{children}</LandingThemeProvider>
      </body>
    </html>
  );
}
