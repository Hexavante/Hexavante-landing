import Link from "next/link";
import { ArrowRight, Lock } from "lucide-react";
import { FaqAccordion } from "@/components/faq-accordion";
import { TeamAvatar } from "@/components/team-avatar";
import { TEAM } from "@/lib/team";
import { PLATFORM_AREAS, platformAnchor, type PlatformArea } from "@/lib/platform-areas";

function CardShell({
  id,
  href,
  children,
  className = "",
}: {
  id: string;
  /** sem href o card vira um bloco (para previews interativos) */
  href?: string;
  children: React.ReactNode;
  className?: string;
}) {
  const classes = `group flex min-h-[20rem] flex-col scroll-mt-28 overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/25 hover:bg-white/[0.05] hover:shadow-[0_20px_60px_-15px_rgba(34,211,238,0.3)] ${className}`;

  if (!href) {
    return (
      <div id={id} className={classes}>
        {children}
      </div>
    );
  }

  return (
    <a id={id} href={href} className={classes}>
      {children}
    </a>
  );
}

function CardHead({
  icon,
  iconClass,
  title,
  description,
}: {
  icon: React.ReactNode;
  iconClass: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-white/[0.06] ${iconClass}`}>
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h3 className="text-base font-bold text-[hsl(var(--sidebar-foreground))] group-hover:hx-accent-text">
            {title}
          </h3>
          <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] font-semibold text-[hsl(var(--sidebar-foreground)/0.5)]">
            <Lock className="h-2.5 w-2.5" /> no app
          </span>
        </div>
        <p className="mt-1 text-xs leading-relaxed text-[hsl(var(--sidebar-foreground)/0.5)]">
          {description}
        </p>
      </div>
    </div>
  );
}

/** Rodapé padrão dos cards que são um único link. */
function CardCta({ label }: { label: string }) {
  return (
    <div className="mt-5 flex items-center justify-between gap-3 border-t border-white/[0.06] pt-4">
      <span className="text-xs font-semibold text-[hsl(var(--sidebar-foreground)/0.55)]">{label}</span>
      <ArrowRight className="h-3.5 w-3.5 shrink-0 text-cyan-300 transition-transform duration-300 group-hover:translate-x-1" />
    </div>
  );
}

function CardBlock({ children }: { children: React.ReactNode }) {
  return <div className="mt-5 flex-1">{children}</div>;
}

/* ------------------------------------------------------------------ *
 * Previews (apenas visual — nenhum deles executa a função real)
 * ------------------------------------------------------------------ */

function StatsPreview() {
  const bars = [40, 65, 50, 80, 70, 90, 85];
  const summary = [
    { value: "8", label: "Cursos" },
    { value: "12", label: "Simulados" },
    { value: "5", label: "Sequência" },
  ];

  return (
    <div className="flex h-full flex-col rounded-xl border border-white/[0.06] bg-white/[0.03] p-4">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold text-[hsl(var(--sidebar-foreground)/0.5)]">
          XP nos últimos 7 dias
        </span>
        <span className="text-xs font-black text-teal-300">+1.240</span>
      </div>

      <div className="mt-3 flex h-24 items-end justify-between gap-1.5">
        {bars.map((h, i) => (
          <div
            key={i}
            className="animate-fade-in-up flex-1 rounded-t bg-gradient-to-t from-teal-400/40 to-teal-400/10"
            style={{ height: `${h}%`, animationDelay: `${i * 90}ms` }}
          />
        ))}
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 border-t border-white/[0.06] pt-3">
        {summary.map((s) => (
          <div key={s.label}>
            <p className="text-sm font-black text-[hsl(var(--sidebar-foreground))]">{s.value}</p>
            <p className="text-[10px] text-[hsl(var(--sidebar-foreground)/0.5)]">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function HexaPreview() {
  const badges = [
    { label: "Top 5%", className: "bg-amber-400/15 text-amber-300" },
    { label: "7 dias", className: "bg-cyan-400/15 text-cyan-300" },
    { label: "Rubi", className: "bg-rose-400/15 text-rose-300" },
  ];

  return (
    <div className="flex h-full flex-col rounded-xl border border-white/[0.06] bg-white/[0.03] p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-amber-400/15 text-amber-300">
            <span className="text-base leading-none">✦</span>
          </span>
          <div className="min-w-0">
            <p className="text-sm font-black text-[hsl(var(--sidebar-foreground))]">Nível 12</p>
            <p className="truncate text-[11px] text-[hsl(var(--sidebar-foreground)/0.5)]">Explorador Hexa</p>
          </div>
        </div>
        <span className="animate-pulse-glow shrink-0 rounded-full border border-amber-400/25 bg-amber-400/10 px-2 py-0.5 text-[10px] font-black text-amber-300">
          Hexa
        </span>
      </div>

      <div className="mt-4">
        <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-white/10">
          <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-amber-400 to-orange-500" />
          <div className="animate-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
        </div>
        <div className="mt-2 flex justify-between text-[10px] font-semibold text-[hsl(var(--sidebar-foreground)/0.5)]">
          <span>2.040 XP</span>
          <span>3.000 XP</span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-1.5 border-t border-white/[0.06] pt-3">
        {badges.map((b) => (
          <span
            key={b.label}
            className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${b.className}`}
          >
            {b.label}
          </span>
        ))}
      </div>
    </div>
  );
}

function TeamPreview() {
  const shown = TEAM.slice(0, 4);

  return (
    <div className="flex h-full flex-col rounded-xl border border-white/[0.06] bg-white/[0.03] p-4">
      <div className="flex items-center -space-x-2.5">
        {shown.map((m) => (
          <TeamAvatar
            key={m.name}
            name={m.name}
            src={m.image}
            size="md"
            className="ring-2 ring-[hsl(var(--sidebar-background))]"
          />
        ))}
        {TEAM.length > shown.length && (
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-white/[0.06] text-[11px] font-black text-[hsl(var(--sidebar-foreground)/0.6)] ring-2 ring-[hsl(var(--sidebar-background))]">
            +{TEAM.length - shown.length}
          </span>
        )}
      </div>

      <p className="mt-3 text-xs leading-relaxed text-[hsl(var(--sidebar-foreground)/0.55)]">
        {TEAM.length} integrantes do TCC por trás do Hexavante — código, documentação,
        pesquisa, marketing e design.
      </p>

      <div className="mt-4 space-y-2 border-t border-white/[0.06] pt-3">
        {TEAM.slice(0, 2).map((m) => (
          <div key={m.name} className="flex items-center gap-2">
            <TeamAvatar name={m.name} src={m.image} size="sm" />
            <div className="min-w-0">
              <p className="truncate text-[11px] font-bold text-[hsl(var(--sidebar-foreground)/0.8)]">
                {m.name}
              </p>
              <p className="truncate text-[10px] text-[hsl(var(--sidebar-foreground)/0.5)]">{m.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * Cards das quatro áreas da /plataforma
 * ------------------------------------------------------------------ */

const CTA_LABEL: Record<string, string> = {
  estatisticas: "Ver estatísticas no app",
  hexa: "Conhecer o Hexa",
  sobre: "Conhecer a equipe",
};

function Preview({ id }: { id: string }) {
  if (id === "estatisticas") return <StatsPreview />;
  if (id === "hexa") return <HexaPreview />;
  return <TeamPreview />;
}

function PlatformCard({ area }: { area: PlatformArea }) {
  const id = platformAnchor(area.id);

  if (area.id === "ajuda") {
    return (
      <CardShell id={id}>
        <CardHead
          icon={<area.icon className="h-5 w-5" />}
          iconClass={area.iconColor}
          title={area.label}
          description={`${area.description}.`}
        />
        <CardBlock>
          <FaqAccordion className="mt-4 space-y-2" />
        </CardBlock>
        <Link
          href={area.href}
          className="mt-5 inline-flex items-center gap-1.5 self-start border-t border-white/[0.06] pt-4 text-xs font-semibold text-cyan-300 transition hover:text-cyan-200"
        >
          Conhecer a central de ajuda
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </CardShell>
    );
  }

  return (
    <CardShell id={id} href={area.href}>
      <CardHead
        icon={<area.icon className="h-5 w-5" />}
        iconClass={area.iconColor}
        title={area.label}
        description={`${area.description}.`}
      />
      <CardBlock>
        <Preview id={area.id} />
      </CardBlock>
      <CardCta label={CTA_LABEL[area.id] ?? `Abrir ${area.label}`} />
    </CardShell>
  );
}

export function PlatformCards() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {PLATFORM_AREAS.map((area) => (
        <PlatformCard key={area.id} area={area} />
      ))}
    </div>
  );
}
