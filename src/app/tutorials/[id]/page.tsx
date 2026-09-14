import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock3, Eye } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FloatingDecor } from "@/components/floating-decor";
import { ScrollReveal } from "@/components/scroll-reveal";
import { VideoEmbed } from "@/components/video-embed";
import { ViewTracker } from "@/components/view-tracker";
import { APP_URL, formatDuration, getSession, getTutorial } from "@/lib/api";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function TutorialDetailPage({ params }: Props) {
  const { id } = await params;
  const [tutorial, session] = await Promise.all([getTutorial(id), getSession()]);
  if (!tutorial) notFound();
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
            href="/tutorials"
            className="mb-6 inline-flex items-center gap-1.5 text-sm text-[hsl(var(--sidebar-foreground)/0.5)] transition hover:text-[hsl(var(--sidebar-foreground))]"
          >
            <ArrowLeft className="h-4 w-4" />
            Tutoriais
          </Link>

          <ScrollReveal>
            <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.02]">
              {tutorial.videoUrl ? (
                <VideoEmbed url={tutorial.videoUrl} title={tutorial.title} />
              ) : tutorial.thumbnailUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={tutorial.thumbnailUrl} alt={tutorial.title} className="aspect-video w-full object-cover" />
              ) : null}

              <div className="p-6 sm:p-8">
                {tutorial.categoryName && (
                  <span className="hx-chip !text-xs">{tutorial.categoryName}</span>
                )}
                <h1 className="mt-4 text-2xl font-black text-[hsl(var(--sidebar-foreground))] sm:text-3xl">
                  {tutorial.title}
                </h1>
                {tutorial.description && (
                  <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-[hsl(var(--sidebar-foreground)/0.65)]">
                    {tutorial.description}
                  </p>
                )}

                <div className="mt-6 flex flex-wrap items-center gap-5 border-t border-white/[0.06] pt-5 text-sm text-[hsl(var(--sidebar-foreground)/0.5)]">
                  <span>por {tutorial.authorName}</span>
                  <span className="flex items-center gap-1.5">
                    <Clock3 className="h-4 w-4" /> {formatDuration(tutorial.duration)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Eye className="h-4 w-4" /> {tutorial.viewCount} views
                  </span>
                </div>

                {tutorial.tags.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {tutorial.tags.map((t) => (
                      <span key={t} className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-[hsl(var(--sidebar-foreground)/0.45)]">
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-8">
                  <a href={`${APP_URL}/register`} className="hx-hero-btn px-6 py-3">
                    Ver mais conteúdo no app
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </main>
      <SiteFooter />
      <ViewTracker tutorialId={tutorial.id} />
    </div>
  );
}
