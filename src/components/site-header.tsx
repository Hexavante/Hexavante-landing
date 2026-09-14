"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  ChevronDown,
  BarChart3,
  Hexagon,
  X,
  BookOpen,
  Target,
  Award,
  Trophy,
  ShoppingBag,
  Radio,
  FileText,
  Crown,
  Menu,
  Settings,
  Sparkles,
  HelpCircle,
  Users,
} from "lucide-react";
import { HexavanteLogo } from "@/components/brand-logo";
import { SignOutButton } from "@/components/sign-out-button";

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://app.hexavante.com.br";

export type LandingUser = {
  name?: string | null;
  username?: string | null;
  avatarUrl?: string | null;
};

type MegaMenuItem = {
  href: string;
  label: string;
  description: string;
  icon: React.ElementType;
  iconColor: string;
};

type MegaMenuCategory = {
  title: string;
  items: MegaMenuItem[];
};

const megaMenus: Record<string, MegaMenuCategory> = {
  estudar: {
    title: "Estudar",
    items: [
      { href: "/cursos", label: "Cursos", description: "Videoaulas e materiais organizados por disciplina", icon: BookOpen, iconColor: "text-cyan-400" },
      { href: "/tutorials", label: "Tutoriais", description: "Guias práticos criados pela comunidade", icon: FileText, iconColor: "text-blue-400" },
      { href: "/simulados", label: "Simulados", description: "Provas simuladas com correção automática", icon: Target, iconColor: "text-rose-400" },
      { href: "/#certificados", label: "Certificados", description: "Certifique seu conhecimento e destaque seu currículo", icon: Award, iconColor: "text-emerald-400" },
    ],
  },
  competir: {
    title: "Competir",
    items: [
      { href: "/competir#competir-ranking", label: "Ranking", description: "Suba no ranking e compita com outros estudantes", icon: Trophy, iconColor: "text-amber-400" },
      { href: "/competir#competir-loja", label: "Loja", description: "Personalize seu perfil com itens e cosméticos", icon: ShoppingBag, iconColor: "text-violet-400" },
      { href: "/competir#competir-ao-vivo", label: "Salas ao vivo", description: "Estude em grupo com aulas ao vivo e interação", icon: Radio, iconColor: "text-rose-400" },
      { href: "/competir#competir-conquistas", label: "Conquistas", description: "Desbloqueie emblemas e recompensas", icon: Crown, iconColor: "text-yellow-400" },
    ],
  },
  plataforma: {
    title: "Plataforma",
    items: [
      { href: "/plataforma#plataforma-estatisticas", label: "Estatísticas", description: "Acompanhe seu desempenho com gráficos detalhados", icon: BarChart3, iconColor: "text-teal-400" },
      { href: "/plataforma#plataforma-hexa", label: "Hexa", description: "O sistema de evolução e progressão do Hexavante", icon: Hexagon, iconColor: "text-amber-400" },
      { href: "/plataforma#plataforma-ajuda", label: "Ajuda", description: "Dúvidas frequentes e suporte", icon: HelpCircle, iconColor: "text-sky-400" },
      { href: "/plataforma#plataforma-sobre", label: "Sobre", description: "Conheça a equipe do TCC por trás do Hexavante", icon: Users, iconColor: "text-pink-400" },
    ],
  },
};

const navOrder = ["estudar", "competir", "plataforma"];

function AvatarCircle({ user }: { user: LandingUser }) {
  const initial = (user.name?.[0] ?? user.username?.[0] ?? "H").toUpperCase();
  if (user.avatarUrl) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={user.avatarUrl} alt={user.username ?? ""} className="h-8 w-8 rounded-full object-cover" />
    );
  }
  return (
    <span className="grid h-8 w-8 place-items-center rounded-full bg-cyan-400/20 text-sm font-bold text-cyan-300">
      {initial}
    </span>
  );
}

export function SiteHeader({ user }: { user: LandingUser | null }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [activeMega, setActiveMega] = useState<string | null>(null);
  const megaTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMega = useCallback((key: string) => {
    if (megaTimeout.current) clearTimeout(megaTimeout.current);
    setActiveMega(key);
  }, []);

  const closeMega = useCallback(() => {
    megaTimeout.current = setTimeout(() => setActiveMega(null), 150);
  }, []);

  useEffect(() => {
    return () => {
      if (megaTimeout.current) clearTimeout(megaTimeout.current);
    };
  }, []);

  return (
    <header className="fixed top-0 z-50 w-full border-b border-white/[0.06] bg-[var(--background)]/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3" aria-label="Hexavante">
          <HexavanteLogo
            size="lg"
            showWordmark={false}
            className="gap-0"
            imageClassName="hx-header-logo-glow h-12 w-12"
          />
          <span
            className="text-xl font-black uppercase tracking-[0.25em] hx-accent-text"
            style={{ textShadow: "0 0 20px hsl(var(--sidebar-highlight) / 0.4)" }}
          >
            HEXAVANTE
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" onMouseLeave={closeMega}>
          {navOrder.map((key) => {
            const cat = megaMenus[key];
            const isOpen = activeMega === key;
            return (
              <div key={key} className="relative">
                <button
                  type="button"
                  onMouseEnter={() => openMega(key)}
                  onClick={() => setActiveMega(isOpen ? null : key)}
                  className={`flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-200 ${
                    isOpen
                      ? "bg-white text-black"
                      : "text-[hsl(var(--sidebar-foreground)/0.72)] hover:bg-white/10 hover:text-[hsl(var(--sidebar-foreground))]"
                  }`}
                >
                  {cat.title}
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                </button>

                {isOpen && (
                  <div
                    className="absolute left-1/2 top-full z-50 mt-2 w-[520px] -translate-x-1/2 overflow-hidden rounded-2xl border border-white/[0.08] bg-[hsl(var(--sidebar-background))] shadow-2xl shadow-black/50"
                    onMouseEnter={() => openMega(key)}
                    onMouseLeave={closeMega}
                  >
                    <div className="p-2">
                      {cat.items.map((item) => {
                        const Icon = item.icon;
                        const external = item.href.startsWith("http");
                        return (
                          <Link
                            key={item.href}
                            href={item.href}
                            className="group flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-150 hover:bg-white/[0.06]"
                          >
                            <div className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/[0.06] transition-colors duration-150 group-hover:bg-white/[0.12] ${item.iconColor}`}>
                              <Icon className="h-5 w-5" />
                            </div>
                            <div className="min-w-0">
                              <div className="text-sm font-semibold text-[hsl(var(--sidebar-foreground))]">
                                {item.label}
                                {external && <span className="ml-1.5 text-[10px] text-[hsl(var(--sidebar-foreground)/0.35)]">app ↗</span>}
                              </div>
                              <div className="mt-0.5 text-xs text-[hsl(var(--sidebar-foreground)/0.5)]">
                                {item.description}
                              </div>
                            </div>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button
                type="button"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.04] px-2 py-1.5 transition hover:bg-white/[0.08]"
              >
                <AvatarCircle user={user} />
                <span className="hidden text-sm font-medium text-[hsl(var(--sidebar-foreground))] sm:block">
                  {user.name?.split(" ")[0] ?? user.username}
                </span>
                <ChevronDown className="h-3.5 w-3.5 text-[hsl(var(--sidebar-foreground)/0.5)]" />
              </button>

              {userMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setUserMenuOpen(false)} />
                  <div className="absolute right-0 top-full z-50 mt-2 w-64 overflow-hidden rounded-xl border border-white/[0.08] bg-[hsl(var(--sidebar-background))] shadow-2xl shadow-black/50">
                    <div className="border-b border-white/[0.06] px-4 py-3">
                      <p className="text-sm font-semibold text-[hsl(var(--sidebar-foreground))]">
                        {user.name}
                      </p>
                      <p className="text-xs text-[hsl(var(--sidebar-foreground)/0.5)]">
                        @{user.username}
                      </p>
                    </div>
                    <div className="p-1.5">
                      {[
                        { href: `${APP_URL}/app`, icon: BarChart3, label: "Meu painel" },
                        { href: `${APP_URL}/estatisticas`, icon: Sparkles, label: "Estatísticas" },
                        { href: `${APP_URL}/configuracoes`, icon: Settings, label: "Configurações" },
                        { href: `${APP_URL}/hexa`, icon: Hexagon, label: "Hexa", iconClassName: "text-amber-400" },
                        { href: `${APP_URL}/ajuda`, icon: HelpCircle, label: "Ajuda" },
                      ].map((item) => (
                        <a
                          key={item.href}
                          href={item.href}
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-[hsl(var(--sidebar-foreground)/0.78)] transition hover:bg-white/[0.06] hover:text-[hsl(var(--sidebar-foreground))]"
                        >
                          <item.icon className={`h-4 w-4 ${item.iconClassName ?? ""}`} />
                          {item.label}
                        </a>
                      ))}
                    </div>
                    <div className="border-t border-white/[0.06] p-1.5">
                      <SignOutButton />
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <a
                href={`${APP_URL}/login`}
                className="rounded-lg px-4 py-2 text-sm font-medium text-[hsl(var(--sidebar-foreground)/0.72)] transition hover:bg-white/10 hover:text-[hsl(var(--sidebar-foreground))]"
              >
                Entrar
              </a>
              <a href={`${APP_URL}/register`} className="hx-btn-primary !px-5 !py-2">
                Criar conta
              </a>
            </div>
          )}

          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-[hsl(var(--sidebar-foreground)/0.6)] transition hover:bg-white/[0.06] hover:text-[hsl(var(--sidebar-foreground))] md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/[0.06] bg-[var(--background)]/95 backdrop-blur-xl md:hidden">
          <div className="space-y-4 px-4 py-4">
            {navOrder.map((key) => {
              const cat = megaMenus[key];
              return (
                <div key={key}>
                  <div className="mb-1 px-1 text-[10px] font-bold uppercase tracking-widest text-[hsl(var(--sidebar-foreground)/0.35)]">
                    {cat.title}
                  </div>
                  {cat.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[hsl(var(--sidebar-foreground)/0.78)] transition hover:bg-white/[0.06]"
                      >
                        <Icon className={`h-4 w-4 ${item.iconColor}`} />
                        {item.label}
                      </Link>
                    );
                  })}
                </div>
              );
            })}
            {!user && (
              <div className="mt-3 flex flex-col gap-2 border-t border-white/[0.06] pt-3">
                <a
                  href={`${APP_URL}/login`}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-4 py-2.5 text-center text-sm font-medium text-[hsl(var(--sidebar-foreground)/0.72)] transition hover:bg-white/10"
                >
                  Entrar
                </a>
                <a
                  href={`${APP_URL}/register`}
                  onClick={() => setMobileOpen(false)}
                  className="hx-btn-primary w-full"
                >
                  Criar conta
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
