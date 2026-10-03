import type { Metadata } from "next";
import { Coins, ShieldCheck, Zap } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FloatingDecor } from "@/components/floating-decor";
import { ScrollReveal } from "@/components/scroll-reveal";
import { CoinShop } from "@/components/coin-shop";
import { API_BASE, APP_URL, getPaymentCatalog, getSession } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Compre moedas",
  description:
    "Compre moedas Hexavante com pagamento seguro via Mercado Pago e desbloqueie cosméticos, itens e vantagens na plataforma.",
};

export default async function CoinsPage() {
  const [session, catalog] = await Promise.all([getSession(), getPaymentCatalog()]);

  const user = session
    ? { name: session.name, username: session.username, avatarUrl: session.avatarUrl }
    : null;

  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--background)]">
      <SiteHeader user={user} />
      <main>
        {/* ───── HERO ───── */}
        <section className="relative overflow-hidden pb-12 pt-32 sm:pb-16 sm:pt-40">
          <FloatingDecor />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
            <ScrollReveal>
              <div className="mx-auto max-w-2xl text-center">
                <div className="mb-5 inline-flex items-center gap-2 hx-intro-chip">
                  <Coins className="h-3.5 w-3.5" />
                  Loja
                </div>
                <h1 className="text-4xl font-black tracking-tight text-[hsl(var(--sidebar-foreground))] sm:text-5xl">
                  Compre <span className="hx-accent-text">moedas</span> Hexavante
                </h1>
                <p className="mt-5 text-base text-[hsl(var(--sidebar-foreground)/0.56)] sm:text-lg">
                  Escolha um pacote, pague com Pix ou cartão e desbloqueie cosméticos, itens e
                  vantagens na plataforma.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        {/* ───── PACOTES ───── */}
        <section className="border-t border-white/[0.06] py-12 sm:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <ScrollReveal>
              {catalog ? (
                <CoinShop
                  packs={catalog.packs}
                  premium={catalog.premium}
                  apiBase={API_BASE}
                  appUrl={APP_URL}
                />
              ) : (
                <div className="hx-empty mx-auto max-w-xl">
                  <div className="hx-icon-box mx-auto mb-4 h-12 w-12 rounded-xl">
                    <Coins className="h-6 w-6" />
                  </div>
                  <p className="text-sm text-[hsl(var(--sidebar-foreground)/0.6)]">
                    O catálogo de moedas está indisponível no momento. Tente novamente em
                    instantes.
                  </p>
                  <a href={APP_URL} className="hx-btn-secondary mt-5 inline-flex px-5 py-2.5">
                    Ir para a plataforma
                  </a>
                </div>
              )}
            </ScrollReveal>

            <div className="mx-auto mt-12 grid max-w-3xl gap-4 sm:grid-cols-2">
              <div className="hx-card flex items-start gap-3">
                <div className="hx-icon-box h-9 w-9 shrink-0 rounded-lg">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[hsl(var(--sidebar-foreground))]">
                    Pagamento seguro
                  </p>
                  <p className="mt-1 text-xs text-[hsl(var(--sidebar-foreground)/0.5)]">
                    Processado pelo Mercado Pago, com Pix ou cartão de crédito.
                  </p>
                </div>
              </div>
              <div className="hx-card flex items-start gap-3">
                <div className="hx-icon-box h-9 w-9 shrink-0 rounded-lg">
                  <Zap className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[hsl(var(--sidebar-foreground))]">
                    Crédito automático
                  </p>
                  <p className="mt-1 text-xs text-[hsl(var(--sidebar-foreground)/0.5)]">
                    As moedas entram na sua conta logo após a confirmação.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
