import Link from "next/link";
import { ArrowRight, Dices, GraduationCap, Users } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FloatingDecor } from "@/components/floating-decor";
import { ScrollReveal } from "@/components/scroll-reveal";
import { TeamDice, TEAM } from "@/components/team-dice";
import { APP_URL, getSession } from "@/lib/api";

export const dynamic = "force-dynamic";

function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

export default async function SobrePage() {
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
                  <Users className="h-3.5 w-3.5" />
                  Sobre nós
                </div>
                <h1 className="text-4xl font-black tracking-tight text-[hsl(var(--sidebar-foreground))] sm:text-5xl">
                  Quem faz o <span className="hx-accent-text">Hexavante</span>
                </h1>
                <p className="mt-5 text-base leading-relaxed text-[hsl(var(--sidebar-foreground)/0.56)] sm:text-lg">
                  O Hexavante nasceu como Trabalho de Conclusão de Curso: uma plataforma
                  educacional com cursos, simulados, tutoriais e gamificação — feita por
                  estudantes, para estudantes.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* Dado */}
        <section className="border-t border-white/[0.06] bg-white/[0.02] py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <ScrollReveal>
              <div className="mx-auto mb-10 max-w-2xl text-center">
                <div className="mb-5 inline-flex items-center gap-2 hx-intro-chip">
                  <Dices className="h-3.5 w-3.5" />
                  Dado da equipe
                </div>
                <h2 className="text-3xl font-black tracking-tight text-[hsl(var(--sidebar-foreground))] sm:text-4xl">
                  Role o dado, conheça o time
                </h2>
                <p className="mt-4 text-sm text-[hsl(var(--sidebar-foreground)/0.55)] sm:text-base">
                  Cada rolagem revela um membro do TCC e sua função no projeto.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <TeamDice />
            </ScrollReveal>
          </div>
        </section>

        {/* Equipe completa */}
        <section className="border-t border-white/[0.06] py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <ScrollReveal>
              <div className="mb-10 text-center">
                <h2 className="text-3xl font-black tracking-tight text-[hsl(var(--sidebar-foreground))] sm:text-4xl">
                  A equipe completa
                </h2>
                <p className="mt-3 text-sm text-[hsl(var(--sidebar-foreground)/0.5)]">
                  Os {TEAM.length} integrantes do TCC por trás do Hexavante.
                </p>
              </div>
            </ScrollReveal>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {TEAM.map((m, i) => (
                <ScrollReveal key={m.name} delay={Math.min(i * 60, 300)}>
                  <div className="flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5 transition hover:border-white/[0.12]">
                    <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-cyan-400/15 text-sm font-black text-cyan-300">
                      {initials(m.name)}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-[hsl(var(--sidebar-foreground))]">
                        {m.name}
                      </p>
                      <p className="mt-0.5 text-xs leading-relaxed text-[hsl(var(--sidebar-foreground)/0.5)]">
                        {m.role}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={100}>
              <div className="relative mx-auto mt-16 max-w-3xl overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center" style={{ boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.3)" }}>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent" />
                <div className="relative">
                  <div className="hx-icon-box mx-auto mb-5 h-14 w-14 rounded-2xl">
                    <GraduationCap className="h-7 w-7" />
                  </div>
                  <h2 className="text-2xl font-black text-[hsl(var(--sidebar-foreground))] sm:text-3xl">
                    Feito como TCC, pensado para durar
                  </h2>
                  <p className="mx-auto mt-4 max-w-xl text-sm text-[hsl(var(--sidebar-foreground)/0.6)]">
                    Cada membro trouxe sua especialidade — do código à documentação ABNT, do
                    planejamento ao marketing — para tirar o Hexavante do papel.
                  </p>
                  <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                    <Link href="/cursos" className="hx-hero-btn px-8 py-3.5">
                      Ver o resultado
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                    <a href={`${APP_URL}/register`} className="hx-btn-secondary px-8 py-3.5">
                      Criar conta grátis
                    </a>
                  </div>
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
