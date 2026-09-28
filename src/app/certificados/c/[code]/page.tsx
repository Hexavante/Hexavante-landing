import { Award, BadgeCheck, CalendarDays, ShieldAlert, User } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FloatingDecor } from "@/components/floating-decor";
import { ScrollReveal } from "@/components/scroll-reveal";
import { API_BASE, APP_URL, getSession } from "@/lib/api";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ code: string }>;
};

type VerifiedCertificate = {
  success: boolean;
  title?: string | null;
  fullName?: string | null;
  certificate?: {
    code: string;
    issuedAt?: string | null;
    user?: { fullName?: string | null };
    course?: { title?: string | null };
  } | null;
};

async function verifyCode(code: string): Promise<VerifiedCertificate | null> {
  try {
    const res = await fetch(
      `${API_BASE}/api/v1/certificates/verify/${encodeURIComponent(code)}`,
      { cache: "no-store" },
    );
    if (!res.ok) return null;
    return (await res.json()) as VerifiedCertificate;
  } catch {
    return null;
  }
}

function formatDate(iso: string | null | undefined): string {
  if (!iso) return "—";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "—";
  return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
}

export default async function VerifyCertificatePage({ params }: Props) {
  const { code: raw } = await params;
  const code = decodeURIComponent(raw ?? "").trim();
  const [session, result] = await Promise.all([
    getSession(),
    code ? verifyCode(code) : Promise.resolve(null),
  ]);
  const user = session
    ? { name: session.name, username: session.username, avatarUrl: session.avatarUrl }
    : null;

  const cert = result?.certificate ?? null;
  const title = result?.title ?? cert?.course?.title ?? null;
  const fullName = result?.fullName ?? cert?.user?.fullName ?? null;
  const valid = Boolean(result?.success && cert);

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
                  <Award className="h-3.5 w-3.5" />
                  Verificação
                </div>
                <h1 className="text-4xl font-black tracking-tight text-[hsl(var(--sidebar-foreground))] sm:text-5xl">
                  Certificado <span className="hx-accent-text">{valid ? "válido" : "não encontrado"}</span>
                </h1>
                <p className="mt-5 text-base text-[hsl(var(--sidebar-foreground)/0.56)] sm:text-lg">
                  Código <span className="font-mono font-bold">{code || "—"}</span>
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <div className="mx-auto mt-10 max-w-2xl">
                {valid && cert ? (
                  <div className="rounded-2xl border border-emerald-400/25 bg-emerald-400/[0.06] p-8 text-center">
                    <BadgeCheck className="mx-auto h-12 w-12 text-emerald-400" />
                    <p className="mt-4 text-2xl font-black text-[hsl(var(--sidebar-foreground))]">
                      {title ?? "Certificado Hexavante"}
                    </p>
                    <p className="mt-2 flex items-center justify-center gap-2 text-[hsl(var(--sidebar-foreground)/0.7)]">
                      <User className="h-4 w-4" />
                      {fullName ?? "—"}
                    </p>
                    <p className="mt-2 flex items-center justify-center gap-2 text-sm text-[hsl(var(--sidebar-foreground)/0.55)]">
                      <CalendarDays className="h-4 w-4" />
                      Emitido em {formatDate(cert.issuedAt)}
                    </p>
                    <a
                      href={`${APP_URL}/certificados/c/${encodeURIComponent(cert.code)}`}
                      className="hx-btn-primary mt-6 inline-flex px-6 py-3"
                    >
                      Ver no app
                    </a>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-red-400/25 bg-red-400/[0.06] p-8 text-center">
                    <ShieldAlert className="mx-auto h-12 w-12 text-red-400" />
                    <p className="mt-4 text-xl font-black text-[hsl(var(--sidebar-foreground))]">
                      Código inválido ou não encontrado
                    </p>
                    <p className="mt-2 text-sm text-[hsl(var(--sidebar-foreground)/0.6)]">
                      Confira o código no certificado e tente novamente.
                    </p>
                  </div>
                )}
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
