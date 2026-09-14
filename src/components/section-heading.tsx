import Link from "next/link";

export function SectionHeading({
  eyebrow,
  title,
  description,
  moreHref,
  moreLabel,
}: {
  eyebrow: string;
  title: string;
  description: string;
  moreHref: string;
  moreLabel: string;
}) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-2xl">
        <span className="hx-chip">{eyebrow}</span>
        <h2 className="mt-4 text-3xl font-black tracking-tight text-white sm:text-4xl">{title}</h2>
        <p className="mt-3 text-sm text-slate-400">{description}</p>
      </div>
      <Link href={moreHref} className="text-sm font-semibold text-cyan-300 hover:underline">
        {moreLabel} →
      </Link>
    </div>
  );
}
