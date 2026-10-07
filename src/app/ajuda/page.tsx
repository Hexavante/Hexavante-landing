import type { Metadata } from "next";
import { HelpCircle, Mail, MessageCircle } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FloatingDecor } from "@/components/floating-decor";
import { ScrollReveal } from "@/components/scroll-reveal";
import { HelpCenter } from "@/components/help-center";
import { getSession } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Central de ajuda | Hexavante",
  description:
    "Respostas às dúvidas mais comuns da plataforma Hexavante: cursos, simulados, conta, configurações e assinatura — com busca, artigos por categoria e suporte por e-mail.",
};

export default async function AjudaPage() {
  const session = await getSession();
  const user = session
    ? { name: session.name, username: session.username, avatarUrl: session.avatarUrl }
    : null;

  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--background)]">
      <SiteHeader user={user} />
      <main>
        {/* ───── HERO ───── */}
        <section className="relative overflow-hidden pb-12 pt-32 sm:pb-16 sm:pt-40">
          <FloatingDecor />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
            <ScrollReveal>
              <div className="mx-auto max-w-2xl text-center">
                <div className="mb-5 inline-flex items-center gap-2 hx-intro-chip">
                  <HelpCircle className="h-3.5 w-3.5" />
                  Suporte
                </div>
                <h1 className="text-4xl font-black tracking-tight text-[hsl(var(--sidebar-foreground))] sm:text-5xl">
                  Central de <span className="hx-accent-text">ajuda</span>
                </h1>
                <p className="mt-5 text-base leading-relaxed text-[hsl(var(--sidebar-foreground)/0.56)] sm:text-lg">
                  Encontre respostas para suas dúvidas sobre cursos, simulados,
                  conta e assinatura — em poucos cliques.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ───── ARTIGOS ───── */}
        <section className="border-t border-white/[0.06] py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <ScrollReveal>
              <HelpCenter />
            </ScrollReveal>

            {/* ───── SUPORTE ───── */}
            <ScrollReveal>
              <div className="hx-card-accent mt-16 p-8 text-center">
                <MessageCircle className="hx-accent-text mx-auto mb-3 h-8 w-8" />
                <h2 className="text-lg font-bold text-[hsl(var(--sidebar-foreground))]">
                  Ainda precisa de ajuda?
                </h2>
                <p className="mt-2 text-sm text-[hsl(var(--sidebar-foreground)/0.56)]">
                  Nossa equipe está pronta para ajudar.
                </p>
                <a
                  href="mailto:suporte@hexavante.com.br"
                  className="hx-hero-btn mt-4 inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm font-bold"
                >
                  <Mail className="h-4 w-4" />
                  Enviar e-mail
                </a>
                <p className="mt-3 text-xs text-[hsl(var(--sidebar-foreground)/0.5)]">
                  suporte@hexavante.com.br
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
