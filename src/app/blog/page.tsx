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

export const dynamic = "force-static";

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

export default function BlogPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--background)]">
      <SiteHeader user={null} />
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
                  Dicas de estudo, bastidores de construção da plataforma e
                  lançamentos dos cursos e simulados.
                </p>
                <p className="mt-4 text-xs text-[hsl(var(--sidebar-foreground)/0.5)]">
                  Estamos preparando os primeiros artigos. Enquanto isso, o
                  conteúdo já está nos canais abaixo.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="border-t border-white/[0.06] py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <ScrollReveal>
              <div className="hx-panel mb-10 rounded-2xl p-6 text-center">
                <p className="text-sm text-[hsl(var(--sidebar-foreground)/0.6)]">
                  O blog ainda não publicou artigos — as postagens serão
                  listadas aqui assim que chegarem.
                </p>
              </div>
            </ScrollReveal>

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
