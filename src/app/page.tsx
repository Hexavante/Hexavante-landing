import Link from "next/link";
import { ArrowRight, BookOpen, Coins, FileText, GraduationCap, Play, Sparkles, Target, Users } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { HeroImage } from "@/components/hero-image";
import { FloatingDecor } from "@/components/floating-decor";
import { ScrollReveal } from "@/components/scroll-reveal";
import { FeatureCards } from "@/components/feature-cards";
import { Badge } from "@/components/badge";
import styles from "./home.module.css";
import { CourseCard, ExamCard, TutorialCard, EmptyState } from "@/components/cards";
import {
  APP_URL,
  getCourses,
  getExams,
  getPlatformStats,
  getSession,
  getTutorials,
} from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [session, stats, coursesRes, tutorialsRes, exams] = await Promise.all([
    getSession(),
    getPlatformStats(),
    getCourses({ limit: 8 }),
    getTutorials({ limit: 8 }),
    getExams({}),
  ]);

  const user = session
    ? { name: session.name, username: session.username, avatarUrl: session.avatarUrl }
    : null;

  return (
    <div className={`${styles.home} min-h-screen overflow-x-hidden bg-[var(--background)]`}>
      <SiteHeader user={user} />

      <main>
        {/* ───── HERO ───── */}
        <section className={`${styles.hero} relative overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40`}>
          <FloatingDecor />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_1fr] lg:gap-10">
              <ScrollReveal>
                <div className="max-w-2xl">
                  <Badge><span className={styles.statusDot} /> Seu próximo nível começa aqui</Badge>
                  <h1 className="mt-6 text-4xl font-black tracking-tight text-[hsl(var(--sidebar-foreground))] sm:text-5xl lg:text-6xl xl:text-7xl">
                    {user
                      ? `Bem-vindo de volta, ${user.name?.split(" ")[0] ?? user.username}!`
                      : "Aprenda hoje. "}
                    {!user && <span className={styles.headlineAccent}>Vá além amanhã.</span>}
                  </h1>
                  <p className="mt-7 max-w-xl text-base leading-relaxed text-[hsl(var(--sidebar-foreground)/0.6)] sm:text-lg">
                    {user
                      ? "Continue de onde parou, acompanhe suas estatísticas e descubra novos cursos."
                      : "Encontre seu caminho entre cursos, simulados e novos desafios. Aprenda no seu ritmo e transforme cada passo em uma conquista."}
                  </p>
                  <div className="mt-10 flex flex-wrap gap-4">
                    {user ? (
                      <>
                        <a href={`${APP_URL}/app`} className="hx-hero-btn px-8 py-4">
                          Ir para o painel <ArrowRight className="h-4 w-4" />
                        </a>
                        <a href="/cursos" className="hx-btn-secondary px-8 py-4">
                          Explorar cursos
                        </a>
                      </>
                    ) : (
                      <>
                        <a href={`${APP_URL}/register`} className="hx-hero-btn px-8 py-4">
                          Começar agora <ArrowRight className="h-4 w-4" />
                        </a>
                        <a href="/cursos" className="hx-btn-secondary px-8 py-4">
                          Explorar cursos
                        </a>
                      </>
                    )}
                  </div>
                  <p className={styles.heroNote}><Sparkles size={14} aria-hidden="true" /> Seu ritmo. Seus objetivos. Sua evolução.</p>
                </div>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <div className={styles.heroVisual}>
                  <div className={styles.orbit} aria-hidden="true" />
                  <span className={styles.visualLabel}>APRENDER É SÓ O COMEÇO</span>
                  <HeroImage />
                  <div className={`${styles.floatingCard} ${styles.cardTop}`}><BookOpen aria-hidden="true" /><div><strong>Conhecimento que fica</strong><span>Do primeiro passo à prática</span></div></div>
                  <div className={`${styles.floatingCard} ${styles.cardBottom}`}><Target aria-hidden="true" /><div><strong>Um desafio de cada vez</strong><span>Aprenda. Pratique. Evolua.</span></div></div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ───── STATS BAR ───── */}
        <ScrollReveal>
          <section className={styles.statsBar}>
            {stats.totalUsers + stats.totalCourses + stats.totalTutorials + stats.totalExams + stats.totalLessons > 0 ? <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-10 sm:grid-cols-5 sm:px-6">
              {[
                { value: `${stats.totalUsers.toLocaleString("pt-BR")}+`, label: "Alunos ativos" },
                { value: `${stats.totalCourses}`, label: "Cursos disponíveis" },
                { value: `${stats.totalTutorials}`, label: "Tutoriais publicados" },
                { value: `${stats.totalExams}`, label: "Simulados criados" },
                { value: `${stats.totalLessons.toLocaleString("pt-BR")}+`, label: "Aulas disponíveis" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-black text-[hsl(var(--sidebar-foreground))] sm:text-3xl">{stat.value}</p>
                  <p className="mt-2 text-xs text-[hsl(var(--sidebar-foreground)/0.48)]">{stat.label}</p>
                </div>
              ))}
            </div> : <div className={styles.learningStrip}>
              <span>UM UNIVERSO DE POSSIBILIDADES</span>
              <span><BookOpen size={18} /> Cursos e videoaulas</span>
              <span><Target size={18} /> Prática com simulados</span>
              <span><Users size={18} /> Aprendizado em comunidade</span>
            </div>}
          </section>
        </ScrollReveal>

        {/* ───── FEATURES ───── */}
        <section className="relative py-24 sm:py-32">
          <FloatingDecor />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
            <ScrollReveal>
              <div className="mx-auto mb-12 max-w-2xl text-center">
                <div className="mb-5 inline-flex items-center gap-2 hx-intro-chip">
                  <Sparkles className="h-3.5 w-3.5" />
                  Funcionalidades
                </div>
                <h2 className="text-3xl font-black tracking-tight text-[hsl(var(--sidebar-foreground))] sm:text-4xl">
                  Tudo que você precisa para <span className="hx-accent-text">aprender</span>
                </h2>
                <p className="mt-5 text-base text-[hsl(var(--sidebar-foreground)/0.56)]">
                  Uma plataforma completa que reúne estudo, prática e competição.
                </p>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <FeatureCards />
            </ScrollReveal>
          </div>
        </section>

        {/* ───── COURSES ───── */}
        <section id="cursos" className="border-t border-white/[0.06] py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <ScrollReveal>
              <div className="mb-12 flex items-end justify-between">
                <div>
                  <div className="mb-4 inline-flex items-center gap-2 hx-intro-chip">
                    <BookOpen className="h-3.5 w-3.5" />
                    Cursos
                  </div>
                  <h2 className="text-3xl font-black tracking-tight text-[hsl(var(--sidebar-foreground))] sm:text-4xl">
                    Explore nossos cursos
                  </h2>
                  <p className="mt-3 text-sm text-[hsl(var(--sidebar-foreground)/0.5)]">
                    Descubra conteúdos para o seu próximo passo.
                  </p>
                </div>
                <Link href="/cursos" className="hidden items-center gap-1.5 text-sm font-medium hx-accent-text transition hover:brightness-110 sm:inline-flex">
                  Ver todos <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </ScrollReveal>
            {coursesRes.data.length === 0 ? (
              <EmptyState message="Nenhum curso publicado no momento." />
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {coursesRes.data.map((course, i) => (
                  <ScrollReveal key={course.id} delay={Math.min(i * 80, 320)}>
                    <CourseCard course={course} />
                  </ScrollReveal>
                ))}
              </div>
            )}
            <Link href="/cursos" className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium hx-accent-text sm:hidden">
              Ver todos os cursos <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* ───── TUTORIALS ───── */}
        <section className="border-t border-white/[0.06] bg-white/[0.02] py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <ScrollReveal>
              <div className="mb-12 flex items-end justify-between">
                <div>
                  <div className="mb-4 inline-flex items-center gap-2 hx-intro-chip">
                    <FileText className="h-3.5 w-3.5" />
                    Tutoriais
                  </div>
                  <h2 className="text-3xl font-black tracking-tight text-[hsl(var(--sidebar-foreground))] sm:text-4xl">
                    Tutoriais da comunidade
                  </h2>
                  <p className="mt-3 text-sm text-[hsl(var(--sidebar-foreground)/0.5)]">
                    Guias práticos para aprender algo novo e colocar em ação.
                  </p>
                </div>
                <Link href="/tutorials" className="hidden items-center gap-1.5 text-sm font-medium hx-accent-text transition hover:brightness-110 sm:inline-flex">
                  Ver todos <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </ScrollReveal>
            {tutorialsRes.data.length === 0 ? (
              <EmptyState message="Nenhum tutorial publicado no momento." />
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {tutorialsRes.data.map((tut, i) => (
                  <ScrollReveal key={tut.id} delay={Math.min(i * 80, 320)}>
                    <TutorialCard tutorial={tut} />
                  </ScrollReveal>
                ))}
              </div>
            )}
            <Link href="/tutorials" className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium hx-accent-text sm:hidden">
              Ver todos os tutoriais <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* ───── SIMULADOS ───── */}
        <section className="border-t border-white/[0.06] py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <ScrollReveal>
              <div className="mb-12 flex items-end justify-between">
                <div>
                  <div className="mb-4 inline-flex items-center gap-2 hx-intro-chip">
                    <Target className="h-3.5 w-3.5" />
                    Simulados
                  </div>
                  <h2 className="text-3xl font-black tracking-tight text-[hsl(var(--sidebar-foreground))] sm:text-4xl">
                    Teste seus conhecimentos
                  </h2>
                  <p className="mt-3 text-sm text-[hsl(var(--sidebar-foreground)/0.5)]">
                    Pratique, descubra seus pontos fortes e prepare seu próximo passo.
                  </p>
                </div>
                <Link href="/simulados" className="hidden items-center gap-1.5 text-sm font-medium hx-accent-text transition hover:brightness-110 sm:inline-flex">
                  Ver todos <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </ScrollReveal>
            {exams.length === 0 ? (
              <EmptyState message="Nenhum simulado publicado no momento." />
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {exams.slice(0, 8).map((exam, i) => (
                  <ScrollReveal key={exam.id} delay={Math.min(i * 80, 320)}>
                    <ExamCard exam={exam} />
                  </ScrollReveal>
                ))}
              </div>
            )}
            <Link href="/simulados" className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium hx-accent-text sm:hidden">
              Ver todos os simulados <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>

        {/* ───── MOEDAS CTA ───── */}
        <ScrollReveal>
          <section className="border-t border-white/[0.06] py-16 sm:py-20">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-8 sm:p-12">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-500/[0.07] via-transparent to-transparent" />
                <div className="relative flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
                  <div className="max-w-xl">
                    <div className="mb-4 inline-flex items-center gap-2 hx-intro-chip">
                      <Coins className="h-3.5 w-3.5" />
                      Moedas
                    </div>
                    <h2 className="text-2xl font-black tracking-tight text-[hsl(var(--sidebar-foreground))] sm:text-3xl">
                      Moedas Hexavante
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-[hsl(var(--sidebar-foreground)/0.56)] sm:text-base">
                      Desbloqueie cosméticos, itens e vantagens na loja da plataforma. Pague com
                      Pix ou cartão pelo Mercado Pago e receba o crédito na sua conta.
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-col gap-3 sm:items-end">
                    <Link href="/moedas" className="hx-hero-btn px-8 py-4">
                      Comprar moedas <ArrowRight className="h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* ───── CTA FINAL ───── */}
        <ScrollReveal>
          <section className={`${styles.finalCta} relative border-t border-white/[0.06] py-24 sm:py-32`}>
            <FloatingDecor />
            <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6">
              <div className="hx-icon-box mx-auto mb-8 h-16 w-16 rounded-2xl">
                <GraduationCap className="h-8 w-8" />
              </div>
              <h2 className="text-3xl font-black tracking-tight text-[hsl(var(--sidebar-foreground))] sm:text-4xl">
                {user ? "Continue sua jornada" : "Pronto para começar?"}
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base text-[hsl(var(--sidebar-foreground)/0.56)]">
                {user
                  ? "Acesse seu painel e continue de onde parou."
                  : "Crie sua conta gratuita e comece a aprender hoje. Sem cartão de crédito, sem compromisso."}
              </p>
              <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <a href={user ? `${APP_URL}/app` : `${APP_URL}/register`} className="hx-hero-btn px-9 py-4">
                  {user ? "Ir para o painel" : "Criar conta grátis"}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <Link href="/cursos" className="hx-btn-secondary px-9 py-4">
                  Ver cursos
                </Link>
              </div>
              <p className="mt-8 flex items-center justify-center gap-4 text-xs text-[hsl(var(--sidebar-foreground)/0.5)]">
                <span className="flex items-center gap-1"><Play className="h-3 w-3" /> Videoaulas</span>
                <span className="flex items-center gap-1"><Users className="h-3 w-3" /> Comunidade</span>
              </p>
            </div>
          </section>
        </ScrollReveal>
      </main>

      <SiteFooter />
    </div>
  );
}
