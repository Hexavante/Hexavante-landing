import { ArrowRight, Hexagon, Sparkles } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FloatingDecor } from "@/components/floating-decor";
import { ScrollReveal } from "@/components/scroll-reveal";
import { PlatformCards } from "@/components/showcase-cards";
import { PLATFORM_AREAS, platformAnchor } from "@/lib/platform-areas";
import { getSession } from "@/lib/api";
import { appUrl } from "@/lib/urls";

export const dynamic = "force-dynamic";

export default async function PlataformaPage() {
  const session = await getSession();
  const user = session
    ? { name: session.name, username: session.username, avatarUrl: session.avatarUrl }
    : null;

  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--background)]">
      <SiteHeader user={user} />
      <main>
        {/* HERO */}
        <section className="relative overflow-hidden pb-14 pt-32 sm:pb-16 sm:pt-40">
          <FloatingDecor />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
            <ScrollReveal>
              <div className="mx-auto max-w-3xl text-center">
                <div className="mb-5 inline-flex items-center gap-2 hx-intro-chip">
                  <Hexagon className="h-3.5 w-3.5" />
                  Plataforma
                </div>
                <h1 className="text-4xl font-black tracking-tight text-[hsl(var(--sidebar-foreground))] sm:text-5xl lg:text-6xl">
                  Uma plataforma <span className="hx-accent-text">completa</span>
                </h1>
                <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-[hsl(var(--sidebar-foreground)/0.56)] sm:text-lg">
                  Estatísticas, evolução, ajuda e equipe — uma prévia do que espera por
                  você dentro do app.
                </p>

                {/* indicadores das quatro áreas */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">
                  {PLATFORM_AREAS.map((area) => (
                    <a
                      key={area.id}
                      href={`#${platformAnchor(area.id)}`}
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-2 text-xs font-semibold text-[hsl(var(--sidebar-foreground)/0.7)] transition hover:border-cyan-400/30 hover:text-[hsl(var(--sidebar-foreground))]"
                    >
                      <span
                        className={`grid h-6 w-6 shrink-0 place-items-center rounded-full ${area.iconBg} ${area.iconColor}`}
                      >
                        <area.icon className="h-3.5 w-3.5" />
                      </span>
                      {area.label}
                    </a>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* SHOWCASE */}
        <section className="relative overflow-hidden border-t border-white/[0.06] py-14 sm:py-20">
          <div className="animate-bg-breathe pointer-events-none absolute left-1/2 top-0 h-72 w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-cyan-500/[0.07] blur-[6rem]" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
            <ScrollReveal>
              <div className="mx-auto mb-10 max-w-2xl text-center">
                <div className="mb-5 inline-flex items-center gap-2 hx-intro-chip">
                  <Sparkles className="h-3.5 w-3.5" />
                  Quatro áreas
                </div>
                <h2 className="text-3xl font-black tracking-tight text-[hsl(var(--sidebar-foreground))] sm:text-4xl">
                  Tudo o que você precisa em um só lugar
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-[hsl(var(--sidebar-foreground)/0.55)] sm:text-base">
                  Cada card abaixo é uma prévia visual do recurso real disponível no app.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={80}>
              <PlatformCards />
            </ScrollReveal>

            {/* CTA final */}
            <ScrollReveal delay={120}>
              <div
                className="relative mx-auto mt-14 max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center sm:p-10"
                style={{ boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.3)" }}
              >
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent" />
                <div className="relative">
                  <div className="hx-icon-box mx-auto mb-5 h-14 w-14 rounded-2xl">
                    <Sparkles className="h-7 w-7" />
                  </div>
                  <h2 className="text-2xl font-black text-[hsl(var(--sidebar-foreground))] sm:text-3xl">
                    Pronto para explorar de verdade?
                  </h2>
                  <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[hsl(var(--sidebar-foreground)/0.6)]">
                    Crie sua conta grátis e transforme a prévia em estatísticas reais, XP,
                    progresso e certificados.
                  </p>
                  <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <a href={appUrl("/register")} className="hx-hero-btn px-8 py-3.5">
                      Explorar no app
                      <ArrowRight className="h-4 w-4" />
                    </a>
                    <a href={appUrl("/login")} className="hx-btn-secondary px-8 py-3.5">
                      Já tenho conta
                    </a>
                  </div>
                  <p className="mt-5 text-xs text-[hsl(var(--sidebar-foreground)/0.5)]">
                    Sem cartão de crédito · comece em menos de um minuto
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
