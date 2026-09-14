import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, Clock3, User } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FloatingDecor } from "@/components/floating-decor";
import { ScrollReveal } from "@/components/scroll-reveal";
import { APP_URL, LEVEL_LABELS, getCourse, getSession } from "@/lib/api";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function CourseDetailPage({ params }: Props) {
  const { id } = await params;
  const [course, session] = await Promise.all([getCourse(id), getSession()]);
  if (!course) notFound();
  const user = session
    ? { name: session.name, username: session.username, avatarUrl: session.avatarUrl }
    : null;

  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--background)]">
      <SiteHeader user={user} />
      <main className="relative pb-16 pt-28 sm:pb-24 sm:pt-36">
        <FloatingDecor />
        <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
          <Link
            href="/cursos"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-[hsl(var(--sidebar-foreground)/0.5)] transition hover:text-[hsl(var(--sidebar-foreground))]"
          >
            <ArrowLeft className="h-4 w-4" />
            Cursos
          </Link>

          <ScrollReveal>
            <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02]">
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
                <h1 className="mt-4 text-2xl font-black text-[hsl(var(--sidebar-foreground))] sm:text-3xl">
                  {course.title}
                </h1>
                {course.shortDescription && (
                  <p className="mt-3 text-sm leading-relaxed text-[hsl(var(--sidebar-foreground)/0.7)]">
                    {course.shortDescription}
                  </p>
                )}
                {course.description && (
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-[hsl(var(--sidebar-foreground)/0.55)]">
                    {course.description}
                  </p>
                )}

                <div className="mt-6 flex flex-wrap gap-5 border-t border-white/[0.06] pt-5 text-sm text-[hsl(var(--sidebar-foreground)/0.55)]">
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
                    <h2 className="text-lg font-bold text-[hsl(var(--sidebar-foreground))]">Conteúdo do curso</h2>
                    <ol className="mt-4 space-y-3">
                      {course.modules.map((m) => (
                        <li key={m.id} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4">
                          <p className="text-sm font-bold text-[hsl(var(--sidebar-foreground))]">
                            {m.orderNumber}. {m.title}
                          </p>
                          <p className="mt-1 text-xs text-[hsl(var(--sidebar-foreground)/0.4)]">
                            {m.lessons.length} aulas
                          </p>
                        </li>
                      ))}
                    </ol>
                  </div>
                )}

                <div className="mt-8 flex flex-wrap gap-3">
                  <a href={`${APP_URL}/login?callbackUrl=/courses/${course.slug}`} className="hx-hero-btn px-6 py-3">
                    Começar curso no app
                  </a>
                  <a href={`${APP_URL}/register`} className="hx-btn-secondary px-6 py-3">
                    Criar conta grátis
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
