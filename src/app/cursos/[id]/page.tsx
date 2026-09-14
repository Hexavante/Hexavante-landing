import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, Clock3, User } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { APP_URL, LEVEL_LABELS, getCourse, getMyCertificates } from "@/lib/api";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function CourseDetailPage({ params }: Props) {
  const { id } = await params;
  const [course, certificates] = await Promise.all([getCourse(id), getMyCertificates()]);
  if (!course) notFound();

  return (
    <div className="min-h-screen bg-[#070b16]">
      <SiteHeader loggedIn={certificates !== null} />
      <main className="mx-auto max-w-4xl px-4 pb-20 pt-28 sm:px-6 sm:pt-32">
        <Link
          href="/cursos"
          className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" /> Cursos
        </Link>

        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
          {course.thumbnailUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={course.thumbnailUrl} alt={course.title} className="aspect-video w-full object-cover" />
          ) : (
            <div className="flex aspect-video w-full items-center justify-center bg-gradient-to-br from-cyan-500/15 to-violet-500/15">
              <BookOpen className="h-16 w-16 text-white/20" />
            </div>
          )}

          <div className="p-6 sm:p-8">
            <div className="flex flex-wrap gap-2">
              <span className="hx-chip !text-xs">{LEVEL_LABELS[course.level] ?? course.level}</span>
              <span className="hx-chip !text-xs">{course.courseType}</span>
            </div>
            <h1 className="mt-4 text-2xl font-black text-white sm:text-3xl">{course.title}</h1>
            {course.shortDescription && (
              <p className="mt-3 text-sm leading-relaxed text-slate-300">{course.shortDescription}</p>
            )}
            {course.description && (
              <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-slate-400">
                {course.description}
              </p>
            )}

            <div className="mt-6 flex flex-wrap gap-5 border-t border-white/10 pt-5 text-sm text-slate-400">
              <span className="flex items-center gap-1.5">
                <User className="h-4 w-4" /> {course.instructorName}
              </span>
              <span>
                {course.totalModules} módulos · {course.totalLessons} aulas
              </span>
              {course.estimatedHours && (
                <span className="flex items-center gap-1.5">
                  <Clock3 className="h-4 w-4" /> {course.estimatedHours}h estimadas
                </span>
              )}
            </div>

            {course.modules.length > 0 && (
              <div className="mt-8">
                <h2 className="text-lg font-bold text-white">Conteúdo do curso</h2>
                <ol className="mt-4 space-y-3">
                  {course.modules.map((m) => (
                    <li key={m.id} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                      <p className="text-sm font-bold text-white">
                        {m.orderNumber}. {m.title}
                      </p>
                      <p className="mt-1 text-xs text-slate-500">{m.lessons.length} aulas</p>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            <div className="mt-8 flex flex-wrap gap-3">
              <a href={`${APP_URL}/login?callbackUrl=/courses/${course.slug}`} className="hx-btn-primary">
                Começar curso no app
              </a>
              <a href={`${APP_URL}/register`} className="hx-btn-ghost">
                Criar conta grátis
              </a>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
