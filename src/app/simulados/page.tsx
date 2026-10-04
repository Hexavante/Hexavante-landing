import { ArrowRight, Target, Trophy } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FloatingDecor } from "@/components/floating-decor";
import { ScrollReveal } from "@/components/scroll-reveal";
import { ExamCard, EmptyState } from "@/components/cards";
import { FilterBar, SearchField, SubmitButton, TypePills } from "@/components/filters";
import { APP_URL, EXAM_TYPE_LABELS, getExams, getSession } from "@/lib/api";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ q?: string; tipo?: string; sort?: string }>;
};

export default async function ExamsPage({ searchParams }: Props) {
  const params = await searchParams;
  const [session, exams] = await Promise.all([
    getSession(),
    getExams({ q: params.q, tipo: params.tipo || undefined, sort: params.sort || undefined }),
  ]);
  const user = session
    ? { name: session.name, username: session.username, avatarUrl: session.avatarUrl }
    : null;
  const longExam = exams.find((exam) => exam.questionCount >= 100);

  const extra = new URLSearchParams();
  if (params.q) extra.set("q", params.q);
  if (params.sort) extra.set("sort", params.sort);

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
                  <Target className="h-3.5 w-3.5" />
                  Prática
                </div>
                <h1 className="text-4xl font-black tracking-tight text-[hsl(var(--sidebar-foreground))] sm:text-5xl">
                  Teste seus <span className="hx-accent-text">conhecimentos</span>
                </h1>
                <p className="mt-5 text-base text-[hsl(var(--sidebar-foreground)/0.56)] sm:text-lg">
                  Os mesmos simulados do app. Para responder e ver sua nota, entre no app.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="border-y border-white/[0.06] bg-white/[0.02]">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
            <FilterBar>
              <SearchField name="q" defaultValue={params.q} placeholder="Buscar simulados..." />
              <div className="w-full sm:w-48">
                <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Ordenar
                </label>
                <select name="sort" defaultValue={params.sort ?? "recent"} className="hx-input">
                  <option value="recent">Mais recentes</option>
                  <option value="popular">Mais populares</option>
                </select>
              </div>
              {params.tipo && <input type="hidden" name="tipo" value={params.tipo} />}
              <SubmitButton />
            </FilterBar>
          </div>
        </section>

        <section className="border-b border-white/[0.06]">
          <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
            <TypePills
              baseHref="/simulados"
              current={params.tipo}
              extra={extra.toString()}
              items={Object.entries(EXAM_TYPE_LABELS).map(([value, label]) => ({ value, label }))}
            />
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            {longExam && !params.q && !params.tipo && (
              <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-amber-400/20 bg-amber-400/[0.06] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
                <div className="flex items-start gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-amber-400/10 text-amber-300">
                    <Trophy className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-amber-200">Desafio especial</p>
                    <h2 className="mt-1 font-bold text-[hsl(var(--sidebar-foreground))]">{longExam.title}</h2>
                    <p className="mt-1 text-sm text-[hsl(var(--sidebar-foreground)/0.6)]">
                      {longExam.questionCount} questões. Conclua no app para desbloquear a conquista Maratona Hexavante.
                    </p>
                  </div>
                </div>
                <a href={`${APP_URL}/simulados/${longExam.slug}`} className="hx-hero-btn shrink-0 px-5 py-3">
                  Fazer desafio <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            )}

            <p className="mb-8 text-sm text-[hsl(var(--sidebar-foreground)/0.5)]">
              <span className="font-semibold text-[hsl(var(--sidebar-foreground))]">{exams.length}</span>{" "}
              simulados encontrados
            </p>

            {exams.length === 0 ? (
              <EmptyState message="Nenhum simulado encontrado com esses filtros." />
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {exams.map((e, i) => (
                  <ScrollReveal key={e.id} delay={Math.min(i * 60, 300)}>
                    <ExamCard exam={e} />
                  </ScrollReveal>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
