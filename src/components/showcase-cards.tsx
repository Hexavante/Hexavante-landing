import { BarChart3, Crown, HelpCircle, Hexagon, Radio, ShoppingBag, Trophy, Users, Lock } from "lucide-react";
import { FaqAccordion } from "@/components/faq-accordion";

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://app.hexavante.com.br";

function CardShell({
  id,
  href,
  children,
}: {
  id: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      id={id}
      href={href}
      className="group block scroll-mt-28 overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/25 hover:bg-white/[0.05] hover:shadow-[0_20px_60px_-15px_rgba(34,211,238,0.3)]"
    >
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
          <span className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] font-semibold text-[hsl(var(--sidebar-foreground)/0.45)]">
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

export function CompeteCards() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <CardShell id="competir-ranking" href={`${APP_URL}/ranking`}>
        <CardHead
          icon={<Trophy className="h-5 w-5" />}
          iconClass="text-amber-400"
          title="Ranking"
          description="Suba no ranking e compita com outros estudantes."
        />
        <div className="mt-5 space-y-2">
          {[
            { pos: "#1", name: "Você", xp: "2.450 XP", hot: true },
            { pos: "#2", name: "Maria S.", xp: "2.100 XP", hot: false },
            { pos: "#3", name: "João P.", xp: "1.980 XP", hot: false },
          ].map((r) => (
            <div key={r.pos} className={`flex items-center gap-3 rounded-lg p-2.5 ${r.hot ? "bg-amber-400/10" : "bg-white/[0.03]"}`}>
              <span className={`text-xs font-black ${r.hot ? "text-amber-300" : "text-white/40"}`}>{r.pos}</span>
              <span className={`flex-1 text-xs font-semibold ${r.hot ? "text-white" : "text-white/60"}`}>{r.name}</span>
              <span className={`text-xs font-bold ${r.hot ? "text-amber-300" : "text-white/35"}`}>{r.xp}</span>
            </div>
          ))}
        </div>
      </CardShell>

      <CardShell id="competir-loja" href={`${APP_URL}/shop`}>
        <CardHead
          icon={<ShoppingBag className="h-5 w-5" />}
          iconClass="text-violet-400"
          title="Loja"
          description="Personalize seu perfil com itens e cosméticos."
        />
        <div className="mt-5 grid grid-cols-4 gap-2">
          {["from-cyan-500/30 to-blue-500/20", "from-violet-500/30 to-fuchsia-500/20", "from-amber-500/30 to-orange-500/20", "from-emerald-500/30 to-teal-500/20"].map((g, i) => (
            <div key={i} className={`aspect-square rounded-xl bg-gradient-to-br ${g} border border-white/10`} />
          ))}
        </div>
      </CardShell>

      <CardShell id="competir-ao-vivo" href={`${APP_URL}/live-rooms`}>
        <CardHead
          icon={<Radio className="h-5 w-5" />}
          iconClass="text-rose-400"
          title="Salas ao vivo"
          description="Estude em grupo com aulas ao vivo e interação."
        />
        <div className="mt-5 flex items-center gap-3 rounded-lg bg-white/[0.03] p-3">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-rose-400" />
          </span>
          <div className="flex-1">
            <div className="h-2 w-32 rounded bg-white/20" />
            <div className="mt-1.5 h-1.5 w-20 rounded bg-white/10" />
          </div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-300">ao vivo</span>
        </div>
      </CardShell>

      <CardShell id="competir-conquistas" href={`${APP_URL}/conquistas`}>
        <CardHead
          icon={<Crown className="h-5 w-5" />}
          iconClass="text-yellow-400"
          title="Conquistas"
          description="Desbloqueie emblemas e recompensas."
        />
        <div className="mt-5 flex gap-2">
          {["bg-amber-400/25 text-amber-300", "bg-white/[0.05] text-white/30", "bg-white/[0.05] text-white/30", "bg-cyan-400/20 text-cyan-300"].map((c, i) => (
            <div key={i} className={`grid h-12 w-12 place-items-center rounded-full ${c}`}>
              <Crown className="h-5 w-5" />
            </div>
          ))}
        </div>
      </CardShell>
    </div>
  );
}

export function PlatformCards() {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      <CardShell id="plataforma-estatisticas" href={`${APP_URL}/estatisticas`}>
        <CardHead
          icon={<BarChart3 className="h-5 w-5" />}
          iconClass="text-teal-400"
          title="Estatísticas"
          description="Acompanhe seu desempenho com gráficos detalhados."
        />
        <div className="mt-5 rounded-lg bg-white/[0.03] p-3">
          <div className="flex h-16 items-end justify-between gap-1">
            {[40, 65, 50, 80, 70, 90, 85].map((h, i) => (
              <div
                key={i}
                className="animate-fade-in-up flex-1 rounded-t bg-gradient-to-t from-teal-400/40 to-teal-400/10"
                style={{ height: `${h}%`, animationDelay: `${i * 90}ms` }}
              />
            ))}
          </div>
        </div>
      </CardShell>

      <CardShell id="plataforma-hexa" href={`${APP_URL}/hexa`}>
        <CardHead
          icon={<Hexagon className="h-5 w-5" />}
          iconClass="text-amber-400"
          title="Hexa"
          description="O sistema de evolução e progressão do Hexavante."
        />
        <div className="mt-5 rounded-lg bg-white/[0.03] p-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-white">Nível 12</span>
            <span className="animate-pulse-glow text-amber-300">Hexa ✦</span>
          </div>
          <div className="relative mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[68%] rounded-full bg-gradient-to-r from-amber-400 to-orange-500" />
            <div className="animate-shimmer absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
          </div>
        </div>
      </CardShell>

      <CardShell id="plataforma-ajuda" href={`${APP_URL}/ajuda`}>
        <CardHead
          icon={<HelpCircle className="h-5 w-5" />}
          iconClass="text-sky-400"
          title="Ajuda"
          description="Dúvidas frequentes e suporte. Toque para expandir:"
        />
        <FaqAccordion />
      </CardShell>

      <CardShell id="plataforma-sobre" href="/sobre">
        <CardHead
          icon={<Users className="h-5 w-5" />}
          iconClass="text-pink-400"
          title="Sobre"
          description="Conheça a equipe do TCC por trás do Hexavante."
        />
        <div className="mt-5 flex items-center gap-2">
          {["H", "E", "X"].map((l, i) => (
            <span
              key={l}
              className="animate-float grid h-10 w-10 place-items-center rounded-full bg-white/[0.05] text-xs font-black text-white/60 transition-transform duration-300 hover:scale-110 hover:bg-cyan-400/20 hover:text-cyan-300"
              style={{ animationDelay: `${i * 400}ms` }}
            >
              {l}
            </span>
          ))}
          <span className="ml-1 text-xs text-white/40">+ você</span>
        </div>
      </CardShell>
    </div>
  );
}
