import Link from "next/link";
import Image from "next/image";
import { ArrowRight, BookOpen, FileText, GraduationCap, Play, Sparkles, Target, Users, Download } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FloatingDecor } from "@/components/floating-decor";
import { ScrollReveal } from "@/components/scroll-reveal";
import { FeatureCards } from "@/components/feature-cards";
import { CompeteSection, PlatformSection } from "@/components/showcase-sections";
import { Badge } from "@/components/badge";
import { CourseCard, ExamCard, TutorialCard, EmptyState } from "@/components/cards";
import {
  APP_URL,
  getCourses,
  getExams,
  getMyCertificates,
  getPlatformStats,
  getSession,
  getTutorials,
} from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [session, stats, coursesRes, tutorialsRes, exams, certificates] = await Promise.all([
    getSession(),
    getPlatformStats(),
    getCourses({ limit: 8 }),
    getTutorials({ limit: 8 }),
    getExams({}),
    getMyCertificates(),
  ]);

  const user = session
    ? { name: session.name, username: session.username, avatarUrl: session.avatarUrl }
    : null;

  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--background)]">
      <SiteHeader user={user} />

      <main>
        {/* ───── HERO ───── */}
        <section className="relative overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40">
          <FloatingDecor />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
            <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-6">
              <ScrollReveal>
                <div className="max-w-2xl">
                  <Badge>Plataforma educacional</Badge>
                  <h1 className="mt-6 text-4xl font-black tracking-tight text-[hsl(var(--sidebar-foreground))] sm:text-5xl lg:text-6xl xl:text-7xl">
                    {user
                      ? `Bem-vindo de volta, ${user.name?.split(" ")[0] ?? user.username}!`
                      : "Aprenda, pratique e "}
                    {!user && <span className="hx-accent-text">evolua</span>}
                    {!user && " em um só lugar."}
                  </h1>
                  <p className="mt-7 max-w-xl text-base leading-relaxed text-[hsl(var(--sidebar-foreground)/0.6)] sm:text-lg">
                    {user
                      ? "Continue de onde parou, acompanhe suas estatísticas e descubra novos cursos."
                      : "Cursos, simulados ao vivo, ranking competitivo e gamificação — tudo na plataforma que transforma estudo em progresso real."}
                  </p>
                  <div className="mt-10 flex flex-wrap gap-4">
                    {user ? (
                      <>
                        <a href={APP_URL} className="hx-hero-btn px-8 py-4">
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
                </div>
              </ScrollReveal>
              <ScrollReveal delay={200}>
                <div className="relative hidden lg:block">
                  <div className="absolute inset-0 rounded-full bg-[hsl(var(--sidebar-highlight))]/[0.06] blur-[3rem]" />
                  <Image
                    src="/brand/mascote-hero.png"
                    alt="Mascote Hexavante"
                    width={420}
                    height={420}
                    className="relative h-[340px] w-auto object-contain xl:h-[420px]"
                    priority
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </section>

        {/* ───── STATS BAR ───── */}
        <ScrollReveal>
          <section className="border-y border-white/[0.06] bg-white/[0.02]">
            <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-12 sm:grid-cols-5 sm:px-6">
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
            </div>
          </section>
        </ScrollReveal>

        {/* ───── FEATURES ───── */}
        <section className="relative py-24 sm:py-32">
          <FloatingDecor />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
            <ScrollReveal>
              <div className="mx-auto mb-20 max-w-2xl text-center">
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
                    O mesmo catálogo do app, servido pela API pública.
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
                    Os mesmos tutoriais publicados no app.
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
                    Os mesmos simulados do app, com correção automática.
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

        {/* ───── COMPETIR (vitrine visual) ───── */}
        <CompeteSection />

        {/* ───── PLATAFORMA (vitrine visual) ───── */}
        <PlatformSection />

        {/* ───── CERTIFICATES ───── */}
        <section id="certificados" className="border-t border-white/[0.06] bg-white/[0.02] py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <ScrollReveal>
              <div className="mx-auto max-w-2xl text-center">
                <div className="mb-5 inline-flex items-center gap-2 hx-intro-chip">
                  <GraduationCap className="h-3.5 w-3.5" />
                  Certificados
                </div>
                <h2 className="text-3xl font-black tracking-tight text-[hsl(var(--sidebar-foreground))] sm:text-4xl">
                  {user && certificates && certificates.length > 0
                    ? "Seus certificados"
                    : "Certifique seu conhecimento"}
                </h2>
                <p className="mt-5 text-base text-[hsl(var(--sidebar-foreground)/0.56)]">
                  {user && certificates && certificates.length > 0
                    ? "Estes são os certificados vinculados à sua conta."
                    : "Complete cursos e obtenha certificados reconhecidos para impulsionar seu currículo."}
                </p>
              </div>
            </ScrollReveal>

            {user && certificates && certificates.length > 0 ? (
              <ScrollReveal delay={100}>
                <div className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
                  {certificates.slice(0, 6).map((cert) => (
                    <div key={cert.id} className="flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-5">
                      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-amber-400/15 text-amber-300">
                        <GraduationCap className="h-6 w-6" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-bold text-[hsl(var(--sidebar-foreground))]">{cert.course.title}</p>
                        <p className="text-xs text-[hsl(var(--sidebar-foreground)/0.4)]">
                          {cert.course.categoryName} · {new Date(cert.issuedAt).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                      <Download className="h-4 w-4 shrink-0 text-[hsl(var(--sidebar-foreground)/0.4)]" />
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            ) : (
              <ScrollReveal delay={100}>
                <div className="mt-12 flex justify-center">
                  <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center" style={{ boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.3)" }}>
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent" />
                    <div className="relative">
                      <div className="hx-icon-box mx-auto mb-5 h-14 w-14 rounded-2xl">
                        <GraduationCap className="h-7 w-7" />
                      </div>
                      <p className="text-sm text-[hsl(var(--sidebar-foreground)/0.6)]">
                        {user ? "Complete um curso para receber seu certificado." : "Faça login e comece a aprender para ganhar certificados."}
                      </p>
                      <a
                        href={user ? `${APP_URL}/app` : `${APP_URL}/register`}
                        className="hx-hero-btn mt-6 px-6 py-3"
                      >
                        {user ? "Continuar no app" : "Criar conta grátis"}
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            )}
          </div>
        </section>

        {/* ───── CTA FINAL ───── */}
        <ScrollReveal>
          <section className="relative border-t border-white/[0.06] py-24 sm:py-32">
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
                <a href={user ? APP_URL : `${APP_URL}/register`} className="hx-hero-btn px-9 py-4">
                  {user ? "Ir para o painel" : "Criar conta grátis"}
                  <ArrowRight className="h-4 w-4" />
                </a>
                <Link href="/cursos" className="hx-btn-secondary px-9 py-4">
                  Ver cursos
                </Link>
              </div>
              <p className="mt-8 flex items-center justify-center gap-4 text-xs text-[hsl(var(--sidebar-foreground)/0.35)]">
                <span className="flex items-center gap-1"><Play className="h-3 w-3" /> Videoaulas</span>
                <span className="flex items-center gap-1"><Users className="h-3 w-3" /> Comunidade</span>
                <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" /> Certificados</span>
              </p>
            </div>
          </section>
        </ScrollReveal>
      </main>

      <SiteFooter />
    </div>
  );
}
