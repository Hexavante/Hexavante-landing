import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ClipboardList, Clock3, Crown, Target } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FloatingDecor } from "@/components/floating-decor";
import { ScrollReveal } from "@/components/scroll-reveal";
import { APP_URL, EXAM_TYPE_LABELS, getExam, getSession } from "@/lib/api";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function ExamDetailPage({ params }: Props) {
  const { id } = await params;
  const [exam, session] = await Promise.all([getExam(id), getSession()]);
  if (!exam) notFound();
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
            href="/simulados"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-[hsl(var(--sidebar-foreground)/0.5)] transition hover:text-[hsl(var(--sidebar-foreground))]"
          >
            <ArrowLeft className="h-4 w-4" />
            Simulados
          </Link>

          <ScrollReveal>
            <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02]">
              {exam.coverImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={exam.coverImage} alt={exam.title} className="aspect-video w-full object-cover" />
              ) : (
                <div className="flex aspect-video w-full items-center justify-center bg-gradient-to-br from-rose-500/15 to-amber-500/15">
                  <Target className="h-16 w-16 text-white/20" />
                </div>
              )}

              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap gap-2">
                  <span className="hx-chip !text-xs">{EXAM_TYPE_LABELS[exam.examType] ?? exam.examType}</span>
                  {exam.isPremiumOnly && (
                    <span className="hx-chip !border-amber-400/30 !bg-amber-400/10 !text-xs !text-amber-300">
                      <Crown className="h-3 w-3" /> Premium
                    </span>
                  )}
                </div>
                <h1 className="mt-4 text-2xl font-black text-[hsl(var(--sidebar-foreground))] sm:text-3xl">
                  {exam.title}
                </h1>
                {exam.description && (
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-[hsl(var(--sidebar-foreground)/0.65)]">
                    {exam.description}
                  </p>
                )}

                <div className="mt-6 flex flex-wrap gap-5 border-t border-white/[0.06] pt-5 text-sm text-[hsl(var(--sidebar-foreground)/0.5)]">
                  <span className="flex items-center gap-1.5">
                    <ClipboardList className="h-4 w-4" /> {exam.questionCount} questões
                  </span>
                  {exam.timeLimit && (
                    <span className="flex items-center gap-1.5">
                      <Clock3 className="h-4 w-4" /> {exam.timeLimit} minutos
                    </span>
                  )}
                </div>

                <div className="mt-8 rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-5">
                  <p className="text-sm text-[hsl(var(--sidebar-foreground)/0.7)]">
                    Para responder às questões, ver sua nota e o gabarito comentado, entre no app.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <a href={`${APP_URL}/login?callbackUrl=/simulados/${exam.slug}`} className="hx-hero-btn px-6 py-3">
                      Fazer simulado no app
                    </a>
                    <a href={`${APP_URL}/register`} className="hx-btn-secondary px-6 py-3">
                      Criar conta grátis
                    </a>
                  </div>
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
