import { ArrowRight, Trophy } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FloatingDecor } from "@/components/floating-decor";
import { ScrollReveal } from "@/components/scroll-reveal";
import { CompeteCards } from "@/components/showcase-cards";
import { APP_URL, getSession } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function CompetirPage() {
  const session = await getSession();
  const user = session
    ? { name: session.name, username: session.username, avatarUrl: session.avatarUrl }
    : null;

  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--background)]">
      <SiteHeader user={user} />
      <main>
        <section className="relative overflow-hidden pb-12 pt-32 sm:pb-16 sm:pt-40">
          <FloatingDecor />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
            <ScrollReveal>
              <div className="mx-auto max-w-2xl text-center">
                <div className="mb-5 inline-flex items-center gap-2 hx-intro-chip">
                  <Trophy className="h-3.5 w-3.5" />
                  Competir
                </div>
                <h1 className="text-4xl font-black tracking-tight text-[hsl(var(--sidebar-foreground))] sm:text-5xl">
                  Estudar também é <span className="hx-accent-text">competir</span>
                </h1>
                <p className="mt-5 text-base text-[hsl(var(--sidebar-foreground)/0.56)] sm:text-lg">
                  Ranking, loja, salas ao vivo e conquistas — uma prévia do que te espera no app.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="border-t border-white/[0.06] bg-white/[0.02] py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <ScrollReveal>
              <CompeteCards />
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <div className="mt-10 text-center">
                <a href={`${APP_URL}/register`} className="hx-hero-btn px-8 py-4">
                  Competir no app <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
