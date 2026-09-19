import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";
import { BackgroundMusic } from "@/components/background-music";

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={grotesk.variable}>
      <body className="app-shell overflow-x-hidden antialiased">
        {children}
        <BackgroundMusic />
      </body>
    </html>
  );
}
