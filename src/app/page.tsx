import Link from "next/link";
import { GraduationCap } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SectionHeading } from "@/components/section-heading";
import { CourseCard, ExamCard, TutorialCard, CertificateCard, EmptyState } from "@/components/cards";
import {
  APP_URL,
  getCourses,
  getExams,
  getMyCertificates,
  getPlatformStats,
  getTutorials,
} from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [stats, coursesRes, tutorialsRes, exams, certificates] = await Promise.all([
    getPlatformStats(),
    getCourses({ limit: 8 }),
    getTutorials({ limit: 8 }),
    getExams({}),
    getMyCertificates(),
  ]);

  const loggedIn = certificates !== null;

  return (
    <div className="min-h-screen bg-[#070b16]">
      <SiteHeader loggedIn={loggedIn} />

      <main className="pt-28 sm:pt-32">
        {/* Hero */}
        <section className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <span className="hx-chip mx-auto">Catálogo público da Hexavante</span>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
            Aprenda, pratique e <span className="text-cyan-300">evolua</span> em um só lugar.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg">
            Cursos, tutoriais, simulados e certificados — o mesmo conteúdo do app, aberto para
            você explorar antes de criar sua conta.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {loggedIn ? (
              <a href={APP_URL} className="hx-btn-primary">
                Ir para o app
              </a>
            ) : (
              <a href={`${APP_URL}/register`} className="hx-btn-primary">
                Criar conta grátis
              </a>
            )}
            <a href="#cursos" className="hx-btn-ghost">
              Explorar catálogo
            </a>
          </div>
        </section>

        {/* Stats */}
        <section className="mt-16 border-y border-white/10 bg-white/[0.02]">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-4 py-10 sm:grid-cols-5 sm:px-6">
            {[
              { value: `${stats.totalUsers.toLocaleString("pt-BR")}+`, label: "Alunos" },
              { value: String(stats.totalCourses), label: "Cursos" },
              { value: String(stats.totalTutorials), label: "Tutoriais" },
              { value: String(stats.totalExams), label: "Simulados" },
              { value: `${stats.totalLessons.toLocaleString("pt-BR")}+`, label: "Aulas" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="text-2xl font-black text-white sm:text-3xl">{s.value}</p>
                <p className="mt-1 text-xs text-slate-500">{s.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Cursos */}
        <section id="cursos" className="mx-auto max-w-7xl scroll-mt-24 px-4 py-16 sm:px-6 sm:py-20">
          <SectionHeading
            eyebrow="Cursos"
            title="Explore os cursos"
            description="O mesmo catálogo do app: videoaulas organizadas por nível, com instrutor e carga horária."
            moreHref="/cursos"
            moreLabel="Ver catálogo completo"
          />
          {coursesRes.data.length === 0 ? (
            <EmptyState message="Nenhum curso publicado no momento." />
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {coursesRes.data.map((c) => (
                <CourseCard key={c.id} course={c} />
              ))}
            </div>
          )}
        </section>

        {/* Tutoriais */}
        <section className="border-t border-white/10 bg-white/[0.02]">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
            <SectionHeading
              eyebrow="Tutoriais"
              title="Aprenda na prática"
              description="Guias diretos criados por instrutores — mesmos tutoriais publicados no app."
              moreHref="/tutorials"
              moreLabel="Ver todos os tutoriais"
            />
            {tutorialsRes.data.length === 0 ? (
              <EmptyState message="Nenhum tutorial publicado no momento." />
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {tutorialsRes.data.map((t) => (
                  <TutorialCard key={t.id} tutorial={t} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Simulados */}
        <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
          <SectionHeading
            eyebrow="Simulados"
            title="Teste seus conhecimentos"
            description="Os mesmos simulados do app, com correção automática e gabarito comentado."
            moreHref="/simulados"
            moreLabel="Ver todos os simulados"
          />
          {exams.length === 0 ? (
            <EmptyState message="Nenhum simulado publicado no momento." />
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {exams.slice(0, 8).map((e) => (
                <ExamCard key={e.id} exam={e} />
              ))}
            </div>
          )}
        </section>

        {/* Certificados */}
        <section className="border-t border-white/10 bg-white/[0.02]">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
            <div className="mx-auto max-w-2xl text-center">
              <span className="hx-chip mx-auto">Certificados</span>
              <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">
                {loggedIn && certificates.length > 0
                  ? "Seus certificados"
                  : "Certifique seu conhecimento"}
              </h2>
              <p className="mt-4 text-base text-slate-400">
                {loggedIn && certificates.length > 0
                  ? "Estes são os certificados vinculados à sua conta."
                  : "Complete cursos no app e receba certificados para impulsionar seu currículo."}
              </p>
            </div>

            {loggedIn ? (
              certificates.length > 0 ? (
                <div className="mx-auto mt-10 grid max-w-4xl gap-4 sm:grid-cols-2">
                  {certificates.slice(0, 6).map((c) => (
                    <CertificateCard key={c.id} certificate={c} />
                  ))}
                </div>
              ) : (
                <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center">
                  <GraduationCap className="mx-auto h-10 w-10 text-amber-300" />
                  <p className="mt-4 text-sm text-slate-400">
                    Você ainda não possui certificados. Complete um curso no app para receber o
                    primeiro.
                  </p>
                  <a href={`${APP_URL}/app`} className="hx-btn-primary mt-6">
                    Continuar no app
                  </a>
                </div>
              )
            ) : (
              <div className="mx-auto mt-10 max-w-xl rounded-2xl border border-white/10 bg-white/[0.03] p-10 text-center">
                <GraduationCap className="mx-auto h-10 w-10 text-amber-300" />
                <p className="mt-4 text-sm text-slate-400">
                  Faça login para ver seus certificados — ou crie uma conta grátis e comece a
                  aprender hoje.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <a href={`${APP_URL}/register`} className="hx-btn-primary">
                    Criar conta grátis
                  </a>
                  <a href={`${APP_URL}/login`} className="hx-btn-ghost">
                    Entrar
                  </a>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-20">
          <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
            Pronto para começar?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base text-slate-400">
            Crie sua conta gratuita e continue de onde parou no app. Sem cartão de crédito.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            {loggedIn ? (
              <a href={APP_URL} className="hx-btn-primary">
                Ir para o app
              </a>
            ) : (
              <a href={`${APP_URL}/register`} className="hx-btn-primary">
                Criar conta grátis
              </a>
            )}
            <Link href="/cursos" className="hx-btn-ghost">
              Ver cursos
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
