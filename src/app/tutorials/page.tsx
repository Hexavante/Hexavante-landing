import { FileText } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FloatingDecor } from "@/components/floating-decor";
import { ScrollReveal } from "@/components/scroll-reveal";
import { TutorialCard, EmptyState } from "@/components/cards";
import { FilterBar, SearchField, SelectField, SubmitButton } from "@/components/filters";
import { getCategories, getSession, getTutorials } from "@/lib/api";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ q?: string; categoryId?: string; sort?: string; page?: string }>;
};

export default async function TutorialsPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page ?? 1) || 1);
  const [session, res, categories] = await Promise.all([
    getSession(),
    getTutorials({
      q: params.q,
      categoryId: params.categoryId || undefined,
      sort: params.sort || undefined,
      page,
      limit: 24,
    }),
    getCategories(),
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
                  <FileText className="h-3.5 w-3.5" />
                  Aprenda
                </div>
                <h1 className="text-4xl font-black tracking-tight text-[hsl(var(--sidebar-foreground))] sm:text-5xl">
                  Tutoriais da <span className="hx-accent-text">comunidade</span>
                </h1>
                <p className="mt-5 text-base text-[hsl(var(--sidebar-foreground)/0.56)] sm:text-lg">
                  Os mesmos tutoriais publicados no app, servidos pela API pública.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="border-y border-white/[0.06] bg-white/[0.02]">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
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
        </section>

        <section className="py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <p className="mb-8 text-sm text-[hsl(var(--sidebar-foreground)/0.45)]">
              <span className="font-semibold text-[hsl(var(--sidebar-foreground))]">{res.pagination.total}</span>{" "}
              tutoriais encontrados
            </p>

            {res.data.length === 0 ? (
              <EmptyState message="Nenhum tutorial encontrado com esses filtros." />
            ) : (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {res.data.map((t, i) => (
                  <ScrollReveal key={t.id} delay={Math.min(i * 60, 300)}>
                    <TutorialCard tutorial={t} />
                  </ScrollReveal>
                ))}
              </div>
            )}

            {res.pagination.totalPages > 1 && (
              <div className="mt-10 flex items-center justify-center gap-3">
                {page > 1 && (
                  <a
                    href={`/tutorials?${new URLSearchParams({ ...params, page: String(page - 1) })}`}
                    className="hx-btn-secondary px-5 py-2.5"
                  >
                    ← Anterior
                  </a>
                )}
                <span className="text-sm text-[hsl(var(--sidebar-foreground)/0.45)]">
                  Página {page} de {res.pagination.totalPages}
                </span>
                {page < res.pagination.totalPages && (
                  <a
                    href={`/tutorials?${new URLSearchParams({ ...params, page: String(page + 1) })}`}
                    className="hx-btn-secondary px-5 py-2.5"
                  >
                    Próxima →
                  </a>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
