import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { BackgroundMusic } from "@/components/background-music";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
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
    <html lang="pt-BR" className={jakarta.variable}>
      <body className="app-shell overflow-x-hidden antialiased">
        {children}
        <BackgroundMusic />
      </body>
    </html>
  );
}
