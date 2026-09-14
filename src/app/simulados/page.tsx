import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ExamCard, EmptyState } from "@/components/cards";
import { FilterBar, SearchField, TypePills } from "@/components/filters";
import { SubmitButton } from "@/components/filters";
import { EXAM_TYPE_LABELS, getExams, getMyCertificates } from "@/lib/api";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ q?: string; tipo?: string; sort?: string }>;
};

export default async function ExamsPage({ searchParams }: Props) {
  const params = await searchParams;
  const [exams, certificates] = await Promise.all([
    getExams({ q: params.q, tipo: params.tipo || undefined, sort: params.sort || undefined }),
    getMyCertificates(),
  ]);

  const extra = new URLSearchParams();
  if (params.q) extra.set("q", params.q);
  if (params.sort) extra.set("sort", params.sort);

  return (
    <div className="min-h-screen bg-[#070b16]">
      <SiteHeader loggedIn={certificates !== null} />
      <main className="mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6 sm:pt-32">
        <span className="hx-chip">Catálogo</span>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
          Simulados
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-slate-400 sm:text-base">
          Os mesmos simulados do app, servidos pela API pública. Para responder e ver sua nota,
          entre no app.
        </p>

        <div className="mt-8">
          <FilterBar>
            <SearchField name="q" defaultValue={params.q} placeholder="Buscar simulados..." />
            <div className="w-full sm:w-48">
              <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
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

        <TypePills
          baseHref="/simulados"
          current={params.tipo}
          extra={extra.toString()}
          items={Object.entries(EXAM_TYPE_LABELS).map(([value, label]) => ({ value, label }))}
        />

        <p className="mb-6 text-sm text-slate-500">
          <span className="font-bold text-white">{exams.length}</span> simulados encontrados
        </p>

        {exams.length === 0 ? (
          <EmptyState message="Nenhum simulado encontrado com esses filtros." />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {exams.map((e) => (
              <ExamCard key={e.id} exam={e} />
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
