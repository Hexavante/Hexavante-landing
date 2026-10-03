import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  Newspaper,
  Play,
} from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FloatingDecor } from "@/components/floating-decor";
import { ScrollReveal } from "@/components/scroll-reveal";
import { CourseCard, EmptyState, TutorialCard } from "@/components/cards";
import { getCourses, getSession, getTutorials } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Blog | Hexavante",
  description:
    "Novidades, bastidores e dicas de estudo da plataforma educacional Hexavante. Acompanhe enquanto o blog ganha vida.",
};

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://app.hexavante.com.br";

const channels = [
  {
    icon: BookOpen,
    title: "Tutoriais",
    description:
      "Guias passo a passo publicados na plataforma, com exemplos práticos de cada recurso.",
    href: "/tutorials",
    cta: "Ver tutoriais",
    internal: true,
  },
  {
    icon: GraduationCap,
    title: "Cursos",
    description:
      "Trilhas completas com aulas, exercícios e certificados de conclusão.",
    href: "/cursos",
    cta: "Ver cursos",
    internal: true,
  },
  {
    icon: Play,
    title: "YouTube",
    description:
      "Aulas, resumos e novidades em vídeo do canal oficial do Hexavante.",
    href: "https://www.youtube.com/@Hexavante",
    cta: "Assistir no canal",
    internal: false,
  },
];

export default async function BlogPage() {
  const [session, courses, tutorials] = await Promise.all([
    getSession(),
    getCourses({ limit: 3 }),
    getTutorials({ limit: 3 }),
  ]);
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
                  <Newspaper className="h-3.5 w-3.5" />
                  Blog
                </div>
                <h1 className="text-4xl font-black tracking-tight text-[hsl(var(--sidebar-foreground))] sm:text-5xl">
                  Novidades do <span className="hx-accent-text">Hexavante</span>
                </h1>
                <p className="mt-5 text-base leading-relaxed text-[hsl(var(--sidebar-foreground)/0.56)] sm:text-lg">
                  Novidades da plataforma e conteúdos para seguir aprendendo.
                </p>
                <p className="mt-4 text-xs text-[hsl(var(--sidebar-foreground)/0.5)]">
                  Explore os cursos e tutoriais publicados recentemente.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="border-t border-white/[0.06] py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <section aria-labelledby="recent-courses-title" className="mb-14">
              <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                  <h2
                    id="recent-courses-title"
                    className="text-2xl font-black text-[hsl(var(--sidebar-foreground))]"
                  >
                    Cursos recentes
                  </h2>
                  <p className="mt-1 text-sm text-[hsl(var(--sidebar-foreground)/0.55)]">
                    Trilhas e aulas disponíveis na plataforma.
                  </p>
                </div>
                <Link
                  href="/cursos"
                  className="hidden items-center gap-1 text-sm font-semibold text-[hsl(var(--sidebar-highlight))] sm:inline-flex"
                >
                  Todos os cursos <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              {courses.data.length ? (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {courses.data.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              ) : (
                <EmptyState message="Nenhum curso publicado no momento." />
              )}
            </section>

            <section aria-labelledby="recent-tutorials-title" className="mb-14">
              <div className="mb-6 flex items-end justify-between gap-4">
                <div>
                  <h2
                    id="recent-tutorials-title"
                    className="text-2xl font-black text-[hsl(var(--sidebar-foreground))]"
                  >
                    Tutoriais recentes
                  </h2>
                  <p className="mt-1 text-sm text-[hsl(var(--sidebar-foreground)/0.55)]">
                    Guias práticos publicados pela comunidade.
                  </p>
                </div>
                <Link
                  href="/tutorials"
                  className="hidden items-center gap-1 text-sm font-semibold text-[hsl(var(--sidebar-highlight))] sm:inline-flex"
                >
                  Todos os tutoriais <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
              {tutorials.data.length ? (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {tutorials.data.map((tutorial) => (
                    <TutorialCard key={tutorial.id} tutorial={tutorial} />
                  ))}
                </div>
              ) : (
                <EmptyState message="Nenhum tutorial publicado no momento." />
              )}
            </section>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {channels.map((channel, i) => (
                <ScrollReveal key={channel.title} delay={i * 80}>
                  <article className="hx-card hx-card-hover h-full rounded-2xl p-6">
                    <div className="hx-icon-box mb-4 h-11 w-11 rounded-xl">
                      <channel.icon className="h-5 w-5" />
                    </div>
                    <h2 className="text-base font-bold text-[hsl(var(--sidebar-foreground))]">
                      {channel.title}
                    </h2>
                    <p className="mt-2 text-sm leading-relaxed text-[hsl(var(--sidebar-foreground)/0.56)]">
                      {channel.description}
                    </p>
                    {channel.internal ? (
                      <Link
                        href={channel.href}
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[hsl(var(--sidebar-highlight))]"
                      >
                        {channel.cta}
                        <ArrowRight className="h-4 w-4" />
                      </Link>
                    ) : (
                      <a
                        href={channel.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[hsl(var(--sidebar-highlight))]"
                      >
                        {channel.cta}
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    )}
                  </article>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={240}>
              <div className="mt-12 flex flex-col items-center justify-center gap-4 text-center sm:flex-row">
                <a href={`${APP_URL}/register`} className="hx-hero-btn px-7 py-3">
                  Criar conta grátis
                  <ArrowRight className="h-4 w-4" />
                </a>
                <Link href="/sobre" className="hx-btn-secondary px-7 py-3">
                  Conhecer a equipe
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
