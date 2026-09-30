import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Briefcase, Code2, HeartHandshake, PenTool, Users } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FloatingDecor } from "@/components/floating-decor";
import { ScrollReveal } from "@/components/scroll-reveal";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Carreiras | Hexavante",
  description:
    "Trabalhe com a Hexavante: como participar do time, como se tornar instrutor e onde acompanhar as vagas abertas da plataforma educacional.",
};

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://app.hexavante.com.br";

/** Mesma fonte usada no rodapé — sem e-mail de contato inventado. */
const socials = [
  { label: "LinkedIn", href: "https://www.linkedin.com/in/hexa-vante-97b55542b/" },
  { label: "Discord", href: "https://discord.gg/UgNRJYX9e" },
  { label: "Instagram", href: "https://www.instagram.com/hexavante_ofc/" },
  { label: "YouTube", href: "https://www.youtube.com/@Hexavante" },
];

const areas = [
  {
    icon: Users,
    title: "Ensino",
    description:
      "Instrutores e especialistas que transformam conteúdo em trilhas, aulas e simulados com avaliação de qualidade.",
  },
  {
    icon: Code2,
    title: "Tecnologia",
    description:
      "Pessoas de produto, engenharia e design que mantêm a plataforma estável, rápida e agradável de usar.",
  },
  {
    icon: PenTool,
    title: "Conteúdo e comunidade",
    description:
      "Quem escreve, grava, modera e faz a comunidade acontecer nos canais oficiais do Hexavante.",
  },
  {
    icon: HeartHandshake,
    title: "Parcerias",
    description:
      "Educação, mídia e negócios: quem aproxima instituições, marcas e projetos à plataforma.",
  },
];

export default function CarreirasPage() {
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
                  <Briefcase className="h-3.5 w-3.5" />
                  Carreiras
                </div>
                <h1 className="text-4xl font-black tracking-tight text-[hsl(var(--sidebar-foreground))] sm:text-5xl">
                  Construa a Hexavante <span className="hx-accent-text">com a gente</span>
                </h1>
                <p className="mt-5 text-base leading-relaxed text-[hsl(var(--sidebar-foreground)/0.56)] sm:text-lg">
                  Somos um time pequeno e obsessivo por aprender bem. Veja como
                  participar e onde acompanhar as vagas.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="border-t border-white/[0.06] py-16 sm:py-20">
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <ScrollReveal>
              <div className="hx-panel mb-12 rounded-2xl p-6 sm:p-8">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <h2 className="text-lg font-black text-[hsl(var(--sidebar-foreground))]">
                      Vagas abertas agora
                    </h2>
                    <p className="mt-1 text-sm leading-relaxed text-[hsl(var(--sidebar-foreground)/0.6)]">
                      Não temos posições abertas neste momento. Assim que
                      abrirmos, publicamos aqui e nas redes oficiais.
                    </p>
                  </div>
                  <div className="flex shrink-0 flex-wrap gap-2">
                    {socials.map((social) => (
                      <a
                        key={social.href}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hx-chip transition hover:opacity-80"
                      >
                        {social.label}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <h2 className="text-xl font-black tracking-tight text-[hsl(var(--sidebar-foreground))] sm:text-2xl">
                O que procuramos
              </h2>
            </ScrollReveal>
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {areas.map((area, i) => (
                <ScrollReveal key={area.title} delay={i * 80}>
                  <article className="hx-card h-full rounded-2xl p-6">
                    <div className="hx-icon-box mb-4 h-11 w-11 rounded-xl">
                      <area.icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-base font-bold text-[hsl(var(--sidebar-foreground))]">
                      {area.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-[hsl(var(--sidebar-foreground)/0.56)]">
                      {area.description}
                    </p>
                  </article>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal delay={160}>
              <div className="hx-panel mt-12 rounded-2xl p-6 text-center sm:p-8">
                <h2 className="text-xl font-black tracking-tight text-[hsl(var(--sidebar-foreground))]">
                  Quer ensinar no Hexavante?
                </h2>
                <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-[hsl(var(--sidebar-foreground)/0.6)]">
                  Instrutores criam cursos, publicam aulas e acompanham o
                  desempenho dos alunos pela própria plataforma. A candidatura é
                  feita dentro do app, com avaliação do time de conteúdo.
                </p>
                <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <a
                    href={`${APP_URL}/instructor/apply`}
                    className="hx-hero-btn px-7 py-3"
                  >
                    Candidatar-se como instrutor
                    <ArrowRight className="h-4 w-4" />
                  </a>
                  <Link href="/cursos" className="hx-btn-secondary px-7 py-3">
                    Ver cursos da plataforma
                  </Link>
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
