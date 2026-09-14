import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
