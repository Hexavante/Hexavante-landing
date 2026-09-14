import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { TutorialCard, EmptyState } from "@/components/cards";
import { FilterBar, SearchField, SelectField, SubmitButton } from "@/components/filters";
import { getCategories, getMyCertificates, getTutorials } from "@/lib/api";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ q?: string; categoryId?: string; sort?: string; page?: string }>;
};

export default async function TutorialsPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page ?? 1) || 1);
  const [res, categories, certificates] = await Promise.all([
    getTutorials({
      q: params.q,
      categoryId: params.categoryId || undefined,
      sort: params.sort || undefined,
      page,
      limit: 24,
    }),
    getCategories(),
    getMyCertificates(),
  ]);

  return (
    <div className="min-h-screen bg-[#070b16]">
      <SiteHeader loggedIn={certificates !== null} />
      <main className="mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6 sm:pt-32">
        <span className="hx-chip">Catálogo</span>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
          Tutoriais
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-slate-400 sm:text-base">
          Os mesmos tutoriais publicados no app, servidos pela API pública. Filtre por categoria
          ou ordene por popularidade.
        </p>

        <div className="mt-8">
          <FilterBar>
            <SearchField name="q" defaultValue={params.q} placeholder="Buscar tutoriais..." />
            <SelectField
              name="categoryId"
              label="Categoria"
              defaultValue={params.categoryId ?? ""}
              options={[
                { value: "", label: "Todas as categorias" },
                ...categories.map((c) => ({ value: c.id, label: c.name })),
              ]}
            />
            <SelectField
              name="sort"
              label="Ordenar"
              defaultValue={params.sort ?? "recent"}
              options={[
                { value: "recent", label: "Mais recentes" },
                { value: "popular", label: "Mais vistos" },
              ]}
            />
            <SubmitButton />
          </FilterBar>
        </div>

        <p className="mb-6 text-sm text-slate-500">
          <span className="font-bold text-white">{res.pagination.total}</span> tutoriais encontrados
        </p>

        {res.data.length === 0 ? (
          <EmptyState message="Nenhum tutorial encontrado com esses filtros." />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {res.data.map((t) => (
              <TutorialCard key={t.id} tutorial={t} />
            ))}
          </div>
        )}

        {res.pagination.totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            {page > 1 && (
              <a
                href={`/tutorials?${new URLSearchParams({ ...params, page: String(page - 1) })}`}
                className="hx-btn-ghost !px-5 !py-2.5"
              >
                ← Anterior
              </a>
            )}
            <span className="text-sm text-slate-500">
              Página {page} de {res.pagination.totalPages}
            </span>
            {page < res.pagination.totalPages && (
              <a
                href={`/tutorials?${new URLSearchParams({ ...params, page: String(page + 1) })}`}
                className="hx-btn-ghost !px-5 !py-2.5"
              >
                Próxima →
              </a>
            )}
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
