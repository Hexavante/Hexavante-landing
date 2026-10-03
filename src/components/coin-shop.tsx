"use client";

import { useState } from "react";
import {
  ArrowRight,
  Coins,
  CreditCard,
  Crown,
  Loader2,
  LogIn,
  ShieldCheck,
  TriangleAlert,
} from "lucide-react";
import type { CoinPack, PremiumOffer } from "@/lib/api";

type Notice = { kind: "login" | "error"; message: string };

type Props = {
  packs: CoinPack[];
  premium: PremiumOffer | null;
  /** Base da API em runtime (env `API_URL`), repassada pelo server component. */
  apiBase: string;
  /** URL do app (login/painel). */
  appUrl: string;
};

const brl = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

/** Formata a quantidade de moedas vinda da API (defesa contra string/NaN). */
function fmtCoins(value: number | string): string {
  const n = Number(value);
  return Number.isFinite(n) ? n.toLocaleString("pt-BR") : String(value ?? "");
}

/** Formata o preço vindo da API (nunca valor hardcoded na landing). */
function fmtBrl(value: number | string): string {
  const n = Number(value);
  return brl.format(Number.isFinite(n) ? n : 0);
}

function BuyButton({
  productId,
  label,
  pendingId,
  disabled,
  onBuy,
  className = "",
}: {
  productId: string;
  label: string;
  pendingId: string | null;
  disabled: boolean;
  onBuy: (productId: string) => void;
  className?: string;
}) {
  const isLoading = pendingId === productId;
  return (
    <button
      type="button"
      onClick={() => onBuy(productId)}
      disabled={disabled}
      className={`hx-hero-btn w-full px-4 py-3 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
      aria-busy={isLoading}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" /> Iniciando...
        </>
      ) : (
        <>
          {label} <ArrowRight className="h-4 w-4" />
        </>
      )}
    </button>
  );
}

export function CoinShop({ packs, premium, apiBase, appUrl }: Props) {
  const [pending, setPending] = useState<string | null>(null);
  const [notice, setNotice] = useState<Notice | null>(null);

  const loading = pending !== null;
  const loginUrl = `${appUrl.replace(/\/$/, "")}/login`;

  async function startCheckout(productId: string) {
    if (loading) return;
    setNotice(null);
    setPending(productId);

    try {
      // 1) Sessão (cookie compartilhado .hexavante.com.br, enviado à API)
      let loggedIn = false;
      try {
        const sessionRes = await fetch(`${apiBase}/api/v1/auth/session`, {
          credentials: "include",
          cache: "no-store",
        });
        if (sessionRes.ok) {
          const data = (await sessionRes.json()) as { user?: { id?: string } | null };
          loggedIn = Boolean(data?.user?.id);
        }
      } catch {
        // rede fora do ar — tratado no catch externo abaixo
        throw new Error("network");
      }

      if (!loggedIn) {
        setNotice({
          kind: "login",
          message: "Faça login na plataforma para comprar moedas.",
        });
        return;
      }

      // 2) Checkout (redireciona pro Mercado Pago)
      const res = await fetch(`${apiBase}/api/v1/payments/checkout`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });

      if (res.status === 401) {
        setNotice({
          kind: "login",
          message: "Sua sessão expirou. Faça login na plataforma para continuar.",
        });
        return;
      }

      let data: { checkoutUrl?: string; error?: string; message?: string } | null = null;
      try {
        data = await res.json();
      } catch {
        data = null;
      }

      if (!res.ok) {
        setNotice({
          kind: "error",
          message:
            data?.error ||
            data?.message ||
            "Não foi possível iniciar o pagamento. Tente novamente em instantes.",
        });
        return;
      }

      const checkoutUrl = data?.checkoutUrl;
      if (!checkoutUrl || typeof checkoutUrl !== "string") {
        setNotice({
          kind: "error",
          message: "A plataforma não retornou o link de pagamento. Tente novamente.",
        });
        return;
      }

      window.location.href = checkoutUrl;
    } catch {
      setNotice({
        kind: "error",
        message: "Não foi possível conectar à plataforma. Verifique sua conexão e tente novamente.",
      });
    } finally {
      setPending(null);
    }
  }

  return (
    <div className="mx-auto max-w-5xl">
      {notice && (
        <div
          role={notice.kind === "login" ? "status" : "alert"}
          className={`mb-8 flex flex-wrap items-center gap-3 rounded-xl border px-4 py-3.5 text-sm ${
            notice.kind === "login"
              ? "border-amber-400/30 bg-amber-400/10 text-amber-200"
              : "border-red-400/30 bg-red-500/10 text-red-300"
          }`}
        >
          {notice.kind === "login" ? (
            <LogIn className="h-4 w-4 shrink-0" />
          ) : (
            <TriangleAlert className="h-4 w-4 shrink-0" />
          )}
          <span className="flex-1">{notice.message}</span>
          {notice.kind === "login" && (
            <a href={loginUrl} className="hx-hero-btn shrink-0 px-4 py-2">
              Entrar na plataforma <ArrowRight className="h-4 w-4" />
            </a>
          )}
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {packs.map((pack) => (
          <article
            key={pack.id}
            className="hx-card group flex flex-col transition hover:border-white/20 hover:bg-white/[0.05]"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="hx-icon-box h-11 w-11 rounded-xl">
                <Coins className="h-5 w-5" />
              </div>
              <span className="hx-badge-muted !px-2.5 !py-1 !text-[11px] font-semibold">
                {fmtCoins(pack.coins)} moedas
              </span>
            </div>
            <h3 className="mt-4 text-base font-bold text-[hsl(var(--sidebar-foreground))]">
              {pack.label}
            </h3>
            <p className="mt-1 flex items-center gap-1.5 text-xs text-[hsl(var(--sidebar-foreground)/0.5)]">
              <Coins className="h-3.5 w-3.5" />
              {fmtCoins(pack.coins)} moedas Hexavante
            </p>
            <p className="mt-4 text-3xl font-black tracking-tight text-[hsl(var(--sidebar-foreground))]">
              {fmtBrl(pack.priceBrl)}
            </p>
            <div className="mt-auto pt-5">
              <BuyButton
                productId={pack.id}
                label="Comprar"
                pendingId={pending}
                disabled={loading}
                onBuy={startCheckout}
              />
            </div>
          </article>
        ))}
      </div>

      {premium && (
        <article className="hx-card-accent mt-6 flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-4">
            <div className="hx-icon-box h-12 w-12 shrink-0 rounded-xl">
              <Crown className="h-6 w-6" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-base font-bold text-[hsl(var(--sidebar-foreground))]">
                  {premium.label}
                </h3>
                <span className="hx-badge-muted !px-2 !py-0.5 !text-[11px]">
                  {premium.days} dias
                </span>
              </div>
              <p className="mt-1 text-sm text-[hsl(var(--sidebar-foreground)/0.56)]">
                Assinatura premium da plataforma por {premium.days} dias.
              </p>
              <p className="mt-3 text-2xl font-black text-[hsl(var(--sidebar-foreground))]">
                {fmtBrl(premium.priceBrl)}
              </p>
            </div>
          </div>
          <div className="sm:w-56">
            <BuyButton
              productId={premium.id}
              label="Assinar premium"
              pendingId={pending}
              disabled={loading}
              onBuy={startCheckout}
            />
          </div>
        </article>
      )}

      <p className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center text-xs text-[hsl(var(--sidebar-foreground)/0.5)]">
        <span className="inline-flex items-center gap-1.5">
          <ShieldCheck className="h-3.5 w-3.5" /> Pagamento seguro via Mercado Pago
        </span>
        <span className="inline-flex items-center gap-1.5">
          <CreditCard className="h-3.5 w-3.5" /> Pix ou cartão de crédito
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Coins className="h-3.5 w-3.5" /> Crédito aplicado na sua conta
        </span>
      </p>
    </div>
  );
}
