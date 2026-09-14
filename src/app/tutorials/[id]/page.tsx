import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock3, Eye } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { VideoEmbed } from "@/components/video-embed";
import { ViewTracker } from "@/components/view-tracker";
import { APP_URL, formatDuration, getMyCertificates, getTutorial } from "@/lib/api";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function TutorialDetailPage({ params }: Props) {
  const { id } = await params;
  const [tutorial, certificates] = await Promise.all([getTutorial(id), getMyCertificates()]);
  if (!tutorial) notFound();

  return (
    <div className="min-h-screen bg-[#070b16]">
      <SiteHeader loggedIn={certificates !== null} />
      <main className="mx-auto max-w-4xl px-4 pb-20 pt-28 sm:px-6 sm:pt-32">
        <Link
          href="/tutorials"
          className="inline-flex items-center gap-1.5 text-sm text-slate-400 hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" /> Tutoriais
        </Link>

        <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
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
            <h1 className="mt-4 text-2xl font-black text-white sm:text-3xl">{tutorial.title}</h1>
            {tutorial.description && (
              <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-slate-300">
                {tutorial.description}
              </p>
            )}

            <div className="mt-6 flex flex-wrap items-center gap-5 border-t border-white/10 pt-5 text-sm text-slate-400">
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
                  <span key={t} className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-slate-400">
                    {t}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-8">
              <a href={`${APP_URL}/register`} className="hx-btn-primary">
                Ver mais conteúdo no app
              </a>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
      <ViewTracker tutorialId={tutorial.id} />
    </div>
  );
}
