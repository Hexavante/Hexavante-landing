import { ArrowRight, Coins, Crown, Medal, Radio, Trophy, Users } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FloatingDecor } from "@/components/floating-decor";
import { ScrollReveal } from "@/components/scroll-reveal";
import { EmptyState } from "@/components/cards";
import {
  APP_URL,
  getAchievements,
  getLeaderboard,
  getLiveRooms,
  getSession,
} from "@/lib/api";
import { cn } from "@/lib/cn";

export const dynamic = "force-dynamic";

const COIN_PACKS = [
  { coins: 100, bonus: 0, price: "R$ 4,90", tag: null as string | null },
  { coins: 550, bonus: 50, price: "R$ 19,90", tag: "Mais popular" },
  { coins: 1200, bonus: 200, price: "R$ 34,90", tag: null },
  { coins: 3000, bonus: 700, price: "R$ 79,90", tag: "Melhor valor" },
];

const RANK_COLORS = ["text-amber-300", "text-slate-300", "text-amber-600"];

export default async function CompetirPage() {
  const [session, ranking, achievements, rooms] = await Promise.all([
    getSession(),
    getLeaderboard(8),
    getAchievements(),
    getLiveRooms(),
  ]);
  const user = session
    ? { name: session.name, username: session.username, avatarUrl: session.avatarUrl }
    : null;

  const topXp = ranking[0]?.totalXp ?? 1;
  const spotlight =
    rooms.length > 0
      ? [...rooms].sort(
          (a, b) =>
            b.participantCount - a.participantCount ||
            +new Date(b.scheduledAt) - +new Date(a.scheduledAt),
        )[0]
      : null;
  const isLive = spotlight && spotlight.startedAt && !spotlight.endedAt;
  const fillPct = spotlight
    ? Math.min(100, Math.round((spotlight.participantCount / Math.max(1, spotlight.maxParticipants)) * 100))
    : 0;

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
                  <Trophy className="h-3.5 w-3.5" />
                  Competir
                </div>
                <h1 className="text-4xl font-black tracking-tight text-[hsl(var(--sidebar-foreground))] sm:text-5xl">
                  Estudar também é <span className="hx-accent-text">competir</span>
                </h1>
                <p className="mt-5 text-base text-[hsl(var(--sidebar-foreground)/0.56)] sm:text-lg">
                  Ranking ao vivo, loja de moedas, salas ao vivo e conquistas — dados reais do app.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ── RANKING REAL ── */}
        <section id="competir-ranking" className="scroll-mt-24 border-t border-white/[0.06] bg-white/[0.02] py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <ScrollReveal>
              <div className="mb-8 text-center">
                <h2 className="flex items-center justify-center gap-2 text-2xl font-black text-white sm:text-3xl">
                  <Trophy className="h-6 w-6 text-amber-300" /> Ranking da temporada
                </h2>
                <p className="mt-2 text-sm text-slate-400">Os melhores colocados agora mesmo no app.</p>
              </div>
            </ScrollReveal>
            {ranking.length === 0 ? (
              <EmptyState message="Ranking ainda sem participantes nesta temporada." />
            ) : (
              <div className="space-y-2">
                {ranking.map((r, i) => (
                  <div
                    key={r.userId}
                    className="animate-fade-in-up flex items-center gap-3 rounded-xl border border-white/[0.06] bg-white/[0.03] p-3 transition hover:border-amber-400/25"
                    style={{ animationDelay: `${Math.min(i * 70, 400)}ms` }}
                  >
                    <span className={cn("w-8 text-center text-sm font-black", RANK_COLORS[i] ?? "text-white/40")}>
                      #{r.rank}
                    </span>
                    {r.avatarUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={r.avatarUrl} alt={r.fullName} className="h-9 w-9 rounded-full object-cover" />
                    ) : (
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/[0.07] text-xs font-black text-white/60">
                        {(r.fullName?.[0] ?? "?").toUpperCase()}
                      </span>
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-white">
                        {r.fullName}
                        <span className="ml-2 text-[10px] font-semibold text-white/35">Nv. {r.level}</span>
                      </p>
                      <div className="mt-1.5 h-1.5 w-full rounded-full bg-white/10">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500"
                          style={{ width: `${Math.max(4, Math.round((r.totalXp / topXp) * 100))}%` }}
                        />
                      </div>
                    </div>
                    <span className="shrink-0 text-xs font-bold text-amber-300">
                      {r.totalXp.toLocaleString("pt-BR")} XP
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── LOJA DE MOEDAS (pagas) ── */}
        <section id="competir-loja" className="relative scroll-mt-24 overflow-hidden border-t border-white/[0.06] py-16 sm:py-20">
          <div className="animate-bg-breathe pointer-events-none absolute left-1/2 top-0 h-72 w-[36rem] max-w-full -translate-x-1/2 rounded-full bg-violet-500/[0.08] blur-[6rem]" />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
            <ScrollReveal>
              <div className="mx-auto mb-10 max-w-2xl text-center">
                <div className="mb-5 inline-flex items-center gap-2 hx-intro-chip">
                  <Coins className="h-3.5 w-3.5" />
                  Loja de moedas
                </div>
                <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                  Turbinen seu <span className="hx-accent-text">progresso</span>
                </h2>
                <p className="mt-4 text-sm text-slate-400 sm:text-base">
                  Pacotes de moedas com dinheiro real. A compra é finalizada com segurança dentro do app.
                </p>
              </div>
            </ScrollReveal>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {COIN_PACKS.map((p, i) => (
                <ScrollReveal key={p.coins} delay={Math.min(i * 70, 280)}>
                  <div
                    className={cn(
                      "relative flex h-full flex-col rounded-2xl border p-6 text-center transition-all duration-300 hover:-translate-y-1",
                      p.tag === "Mais popular"
                        ? "animate-pulse-glow border-amber-400/40 bg-amber-400/[0.07]"
                        : "border-white/[0.08] bg-white/[0.03] hover:border-white/[0.15]",
                    )}
                  >
                    {p.tag && (
                      <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-amber-400 px-3 py-0.5 text-[10px] font-black uppercase tracking-wider text-black">
                        {p.tag}
                      </span>
                    )}
                    <Coins className="animate-float mx-auto h-10 w-10 text-amber-300" />
                    <p className="mt-4 text-3xl font-black text-white">
                      {p.coins.toLocaleString("pt-BR")}
                    </p>
                    <p className="text-xs text-slate-500">
                      moedas{p.bonus > 0 && <span className="font-bold text-emerald-300"> +{p.bonus} bônus</span>}
                    </p>
                    <p className="mt-4 text-xl font-black text-cyan-300">{p.price}</p>
                    <a href={`${APP_URL}/shop`} className="hx-hero-btn mt-5 w-full !px-4 !py-2.5">
                      Comprar no app
                    </a>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── SALA EM DESTAQUE ── */}
        <section id="competir-ao-vivo" className="scroll-mt-24 border-t border-white/[0.06] bg-white/[0.02] py-16 sm:py-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <ScrollReveal>
              <div className="mb-8 text-center">
                <div className="mb-5 inline-flex items-center gap-2 hx-intro-chip">
                  <Radio className="h-3.5 w-3.5" />
                  Salas ao vivo
                </div>
                <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                  Sala em <span className="hx-accent-text">destaque</span>
                </h2>
              </div>
            </ScrollReveal>
            {!spotlight ? (
              <EmptyState message="Nenhuma sala ao vivo no momento. Volte em breve!" />
            ) : (
              <ScrollReveal delay={100}>
                <div className="overflow-hidden rounded-2xl border border-rose-400/25 bg-gradient-to-br from-rose-500/10 to-transparent p-6 sm:p-8" style={{ boxShadow: "0 25px 50px -12px rgb(0 0 0 / 0.4)" }}>
                  <div className="flex flex-wrap items-center gap-2">
                    {isLive ? (
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-500/15 px-3 py-1 text-xs font-bold text-rose-300">
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-70" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-400" />
                        </span>
                        AO VIVO
                      </span>
                    ) : (
                      <span className="rounded-full bg-white/[0.06] px-3 py-1 text-xs font-bold text-white/60">
                        {spotlight.status}
                      </span>
                    )}
                    <span className="flex items-center gap-1 text-xs text-white/50">
                      <Users className="h-3.5 w-3.5" />
                      {spotlight.participantCount}/{spotlight.maxParticipants} participantes
                    </span>
                  </div>
                  <h3 className="mt-4 text-2xl font-black text-white">{spotlight.title}</h3>
                  {spotlight.description && (
                    <p className="mt-2 line-clamp-2 text-sm text-white/55">{spotlight.description}</p>
                  )}
                  <div className="mt-5 h-2.5 w-full overflow-hidden rounded-full bg-white/10">
                    <div
                      className="animate-pulse-glow h-full rounded-full bg-gradient-to-r from-rose-400 to-amber-400"
                      style={{ width: `${fillPct}%` }}
                    />
                  </div>
                  <p className="mt-3 text-xs text-white/50">
                    por {spotlight.instructor.fullName || `@${spotlight.instructor.username}`} ·{" "}
                    {new Date(spotlight.scheduledAt).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })}
                  </p>
                  <a href={`${APP_URL}/live-rooms`} className="hx-hero-btn mt-6 px-8 py-3.5">
                    Participar no app <ArrowRight className="h-4 w-4" />
                  </a>
                </div>
              </ScrollReveal>
            )}
          </div>
        </section>

        {/* ── CONQUISTAS REAIS ── */}
        <section id="competir-conquistas" className="scroll-mt-24 border-t border-white/[0.06] py-16 sm:py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <ScrollReveal>
              <div className="mx-auto mb-10 max-w-2xl text-center">
                <div className="mb-5 inline-flex items-center gap-2 hx-intro-chip">
                  <Crown className="h-3.5 w-3.5" />
                  Conquistas
                </div>
                <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
                  Desbloqueie <span className="hx-accent-text">conquistas</span>
                </h2>
                <p className="mt-4 text-sm text-slate-400 sm:text-base">
                  As mesmas {achievements.length} conquistas que você pode ganhar no app.
                </p>
              </div>
            </ScrollReveal>
            {achievements.length === 0 ? (
              <EmptyState message="Nenhuma conquista cadastrada no momento." />
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {achievements.map((a, i) => (
                  <div
                    key={a.key}
                    className="animate-fade-in-up group flex items-center gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4 transition-all duration-300 hover:-translate-y-1 hover:border-amber-400/30 hover:shadow-[0_16px_40px_-12px_rgba(251,191,36,0.3)]"
                    style={{ animationDelay: `${Math.min(i * 50, 400)}ms` }}
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-amber-400/15 text-amber-300 transition-transform duration-300 group-hover:scale-110">
                      {i % 2 === 0 ? <Crown className="h-5 w-5" /> : <Medal className="h-5 w-5" />}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-white">{a.name}</p>
                      <p className="mt-0.5 line-clamp-2 text-xs text-white/45">{a.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
