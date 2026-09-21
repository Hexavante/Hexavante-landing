import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FloatingDecor } from "@/components/floating-decor";
import { ScrollReveal } from "@/components/scroll-reveal";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Política de Privacidade | Hexavante",
  description:
    "Política de Privacidade da plataforma educacional Hexavante: dados coletados, finalidade, base legal (LGPD), compartilhamento, segurança e direitos do titular.",
};

const sections = [
  {
    title: "1. Dados que coletamos",
    body: [
      "Dados de conta: nome, e-mail e data de nascimento, informados por você no cadastro e usados para identificar sua conta e personalizar sua experiência.",
      "Dados de uso: progresso nos cursos e simulados, XP, moedas e conquistas, gerados automaticamente conforme você utiliza a plataforma.",
      "Dados de dispositivo: token de notificações push e modelo do dispositivo, utilizados exclusivamente para o envio de notificações (por exemplo, lembretes de estudo e avisos de segurança).",
    ],
  },
  {
    title: "2. Finalidade do tratamento",
    body: [
      "Utilizamos seus dados para criar e manter sua conta, registrar seu progresso educacional, operar a gamificação (XP, moedas e ranking), enviar notificações relevantes, garantir a segurança da plataforma e cumprir obrigações legais.",
    ],
  },
  {
    title: "3. Base legal (LGPD)",
    body: [
      "O tratamento de dados pessoais segue a Lei Geral de Proteção de Dados (Lei nº 13.709/2018). As bases legais aplicáveis incluem a execução de contrato (fornecimento dos serviços educacionais), o consentimento do titular, o legítimo interesse (melhoria da plataforma e segurança) e o cumprimento de obrigação legal ou regulatória.",
    ],
  },
  {
    title: "4. Compartilhamento de dados",
    body: [
      "Utilizamos o Resend como operador para o envio de e-mails transacionais (como verificação de dispositivo e códigos de autenticação em duas etapas). Não vendemos seus dados pessoais nem os compartilhamos com terceiros para fins de marketing. Dados só são divulgados quando exigido por lei ou ordem judicial.",
    ],
  },
  {
    title: "5. Segurança",
    body: [
      "Adotamos medidas técnicas e organizacionais para proteger seus dados: senhas são armazenadas com hash (nunca em texto claro), sessões possuem expiração e validação no servidor, e o acesso administrativo é restrito. Nenhum método de transmissão pela internet é 100% seguro, mas trabalhamos continuamente para reduzir riscos.",
    ],
  },
  {
    title: "6. Direitos do titular",
    body: [
      "Nos termos da LGPD, você tem direito à confirmação de tratamento, acesso, correção, anonimização, bloqueio ou eliminação de dados desnecessários ou tratados em desconformidade, portabilidade e revogação do consentimento. Para exercer esses direitos, entre em contato pelo e-mail suporte@hexavante.com.br.",
    ],
  },
  {
    title: "7. Retenção de dados",
    body: [
      "Mantemos seus dados pessoais apenas pelo tempo necessário para cumprir as finalidades descritas nesta política, respeitar obrigações legais e resolver disputas. Você pode solicitar a exclusão da sua conta e dos dados associados a qualquer momento pelo e-mail suporte@hexavante.com.br, ressalvadas as hipóteses de guarda obrigatória previstas em lei.",
    ],
  },
  {
    title: "8. Menores de idade",
    body: [
      "Os serviços do Hexavante podem ser utilizados por menores de idade mediante consentimento parental ou do responsável legal, conforme exigido pela LGPD. Caso identifiquemos o cadastro de menor sem o devido consentimento, poderemos suspender a conta até a regularização.",
    ],
  },
  {
    title: "9. Contato do encarregado",
    body: [
      "Para dúvidas sobre esta Política de Privacidade ou sobre o tratamento de seus dados pessoais, entre em contato com o encarregado pelo e-mail suporte@hexavante.com.br.",
    ],
  },
];

export default function PrivacidadePage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[var(--background)]">
      <SiteHeader user={null} />
      <main>
        <section className="relative overflow-hidden pb-12 pt-32 sm:pb-16 sm:pt-40">
          <FloatingDecor />
          <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
            <ScrollReveal>
              <div className="mx-auto max-w-2xl text-center">
                <div className="mb-5 inline-flex items-center gap-2 hx-intro-chip">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Privacidade
                </div>
                <h1 className="text-4xl font-black tracking-tight text-[hsl(var(--sidebar-foreground))] sm:text-5xl">
                  Política de <span className="hx-accent-text">Privacidade</span>
                </h1>
                <p className="mt-5 text-base leading-relaxed text-[hsl(var(--sidebar-foreground)/0.56)] sm:text-lg">
                  Como coletamos, usamos e protegemos seus dados na plataforma
                  educacional Hexavante, em conformidade com a LGPD.
                </p>
                <p className="mt-4 text-xs text-[hsl(var(--sidebar-foreground)/0.45)]">
                  Vigência a partir de 21/09/2026.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="border-t border-white/[0.06] py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6">
            <div className="space-y-10">
              {sections.map((s) => (
                <ScrollReveal key={s.title}>
                  <div>
                    <h2 className="text-xl font-black tracking-tight text-[hsl(var(--sidebar-foreground))] sm:text-2xl">
                      {s.title}
                    </h2>
                    {s.body.map((p, i) => (
                      <p
                        key={i}
                        className="mt-3 text-sm leading-relaxed text-[hsl(var(--sidebar-foreground)/0.6)] sm:text-base"
                      >
                        {p}
                      </p>
                    ))}
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
