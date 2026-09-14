import Link from "next/link";
import { BookOpen, Clock3, Crown, FileText, GraduationCap, Play, Target, Users } from "lucide-react";
import {
  EXAM_TYPE_LABELS,
  LEVEL_LABELS,
  formatDuration,
  type Certificate,
  type Course,
  type Exam,
  type Tutorial,
} from "@/lib/api";

function Thumb({
  src,
  alt,
  icon,
  gradient,
}: {
  src: string | null;
  alt: string;
  icon: React.ReactNode;
  gradient: string;
}) {
  return (
    <div className={`relative aspect-video overflow-hidden bg-gradient-to-br ${gradient}`}>
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" />
      ) : (
        <div className="flex h-full items-center justify-center text-white/20">{icon}</div>
      )}
    </div>
  );
}

export function CourseCard({ course }: { course: Course }) {
  return (
    <Link href={`/cursos/${course.slug}`} className="hx-card group block">
      <Thumb
        src={course.thumbnailUrl}
        alt={course.title}
        gradient="from-cyan-500/20 to-violet-500/15"
        icon={<BookOpen className="h-10 w-10" />}
      />
      <div className="p-5">
        <div className="flex flex-wrap gap-2">
          <span className="hx-chip !text-[10px]">{LEVEL_LABELS[course.level] ?? course.level}</span>
          {course.courseType !== "FREE" && (
            <span className="hx-chip !border-amber-400/30 !bg-amber-400/10 !text-amber-300 !text-[10px]">
              <Crown className="h-3 w-3" />
              {course.courseType}
            </span>
          )}
        </div>
        <h3 className="mt-3 line-clamp-2 text-sm font-bold text-white group-hover:text-cyan-300">
          {course.title}
        </h3>
        {course.shortDescription && (
          <p className="mt-2 line-clamp-2 text-xs text-slate-400">{course.shortDescription}</p>
        )}
        <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Play className="h-3 w-3" /> {course.totalModules} módulos
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="h-3 w-3" /> {course.totalLessons} aulas
          </span>
        </div>
        <p className="mt-3 flex items-center gap-1.5 truncate text-xs text-slate-500">
          <Users className="h-3 w-3" /> {course.instructorName}
        </p>
      </div>
    </Link>
  );
}

export function TutorialCard({ tutorial }: { tutorial: Tutorial }) {
  return (
    <Link href={`/tutorials/${tutorial.slug}`} className="hx-card group block">
      <Thumb
        src={tutorial.thumbnailUrl}
        alt={tutorial.title}
        gradient="from-blue-500/20 to-emerald-500/15"
        icon={<FileText className="h-10 w-10" />}
      />
      <div className="p-5">
        {tutorial.categoryName && (
          <span className="hx-chip !text-[10px]">{tutorial.categoryName}</span>
        )}
        <h3 className="mt-3 line-clamp-2 text-sm font-bold text-white group-hover:text-cyan-300">
          {tutorial.title}
        </h3>
        {tutorial.description && (
          <p className="mt-2 line-clamp-2 text-xs text-slate-400">{tutorial.description}</p>
        )}
        <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
          <span className="flex items-center gap-1">
            <Clock3 className="h-3 w-3" /> {formatDuration(tutorial.duration)}
          </span>
          <span>{tutorial.viewCount} views</span>
        </div>
        <p className="mt-3 truncate text-xs text-slate-500">por {tutorial.authorName}</p>
      </div>
    </Link>
  );
}

export function ExamCard({ exam }: { exam: Exam }) {
  return (
    <Link href={`/simulados/${exam.slug}`} className="hx-card group block">
      <Thumb
        src={exam.coverImage}
        alt={exam.title}
        gradient="from-rose-500/20 to-amber-500/15"
        icon={<Target className="h-10 w-10" />}
      />
      <div className="p-5">
        <div className="flex flex-wrap gap-2">
          <span className="hx-chip !text-[10px]">
            <Target className="h-3 w-3" />
            {EXAM_TYPE_LABELS[exam.examType] ?? exam.examType}
          </span>
          {exam.isPremiumOnly && (
            <span className="hx-chip !border-amber-400/30 !bg-amber-400/10 !text-amber-300 !text-[10px]">
              <Crown className="h-3 w-3" /> Premium
            </span>
          )}
        </div>
        <h3 className="mt-3 line-clamp-2 text-sm font-bold text-white group-hover:text-cyan-300">
          {exam.title}
        </h3>
        {exam.description && (
          <p className="mt-2 line-clamp-2 text-xs text-slate-400">{exam.description}</p>
        )}
        <div className="mt-4 flex items-center gap-4 text-xs text-slate-500">
          <span>{exam.questionCount} questões</span>
          {exam.timeLimit && <span>{exam.timeLimit} min</span>}
        </div>
      </div>
    </Link>
  );
}

export function CertificateCard({ certificate }: { certificate: Certificate }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-amber-400/15 text-amber-300">
        <GraduationCap className="h-6 w-6" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-bold text-white">{certificate.course.title}</p>
        <p className="text-xs text-slate-500">
          {certificate.course.categoryName} ·{" "}
          {new Date(certificate.issuedAt).toLocaleDateString("pt-BR")}
        </p>
      </div>
    </div>
  );
}

export function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-16 text-center">
      <p className="text-sm text-slate-400">{message}</p>
    </div>
  );
}
