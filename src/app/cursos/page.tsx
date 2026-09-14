import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CourseCard, EmptyState } from "@/components/cards";
import { FilterBar, SearchField, SelectField, SubmitButton } from "@/components/filters";
import { getCourses, getMyCertificates } from "@/lib/api";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ q?: string; level?: string; courseType?: string; page?: string }>;
};

export default async function CoursesPage({ searchParams }: Props) {
  const params = await searchParams;
  const page = Math.max(1, Number(params.page ?? 1) || 1);
  const [res, certificates] = await Promise.all([
    getCourses({
      q: params.q,
      level: params.level || undefined,
      courseType: params.courseType || undefined,
      page,
      limit: 24,
    }),
    getMyCertificates(),
  ]);

  return (
    <div className="min-h-screen bg-[#070b16]">
      <SiteHeader loggedIn={certificates !== null} />
      <main className="mx-auto max-w-7xl px-4 pb-20 pt-28 sm:px-6 sm:pt-32">
        <span className="hx-chip">Catálogo</span>
        <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">
          Cursos
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-slate-400 sm:text-base">
          O mesmo catálogo do app, servido pela API pública. Busque por nome, filtre por nível e
          tipo.
        </p>

        <div className="mt-8">
          <FilterBar>
            <SearchField name="q" defaultValue={params.q} placeholder="Buscar cursos..." />
            <SelectField
              name="level"
              label="Nível"
              defaultValue={params.level ?? ""}
              options={[
                { value: "", label: "Todos os níveis" },
                { value: "BEGINNER", label: "Iniciante" },
                { value: "INTERMEDIATE", label: "Intermediário" },
                { value: "ADVANCED", label: "Avançado" },
              ]}
            />
            <SelectField
              name="courseType"
              label="Tipo"
              defaultValue={params.courseType ?? ""}
              options={[
                { value: "", label: "Todos os tipos" },
                { value: "FREE", label: "Gratuito" },
                { value: "PAID", label: "Pago" },
                { value: "PREMIUM", label: "Premium" },
              ]}
            />
            <SubmitButton />
          </FilterBar>
        </div>

        <p className="mb-6 text-sm text-slate-500">
          <span className="font-bold text-white">{res.pagination.total}</span> cursos encontrados
        </p>

        {res.data.length === 0 ? (
          <EmptyState message="Nenhum curso encontrado com esses filtros." />
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {res.data.map((c) => (
              <CourseCard key={c.id} course={c} />
            ))}
          </div>
        )}

        {res.pagination.totalPages > 1 && (
          <div className="mt-10 flex items-center justify-center gap-2">
            {page > 1 && (
              <a
                href={`/cursos?${new URLSearchParams({ ...params, page: String(page - 1) })}`}
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
                href={`/cursos?${new URLSearchParams({ ...params, page: String(page + 1) })}`}
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
