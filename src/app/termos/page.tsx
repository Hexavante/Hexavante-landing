import type { Metadata } from "next";
import { FileText } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { FloatingDecor } from "@/components/floating-decor";
import { ScrollReveal } from "@/components/scroll-reveal";
import { getSession } from "@/lib/api";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Termos de Uso | Hexavante",
  description:
    "Termos de uso da plataforma educacional Hexavante: cadastro, conteúdo, gamificação, certificados, conduta da comunidade, propriedade intelectual e condições gerais.",
};

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://app.hexavante.com.br";

const sections = [
  {
    title: "1. Aceitação dos termos",
    body: [
      "Ao acessar ou utilizar a plataforma Hexavante, você concorda com estes Termos de Uso e com a Política de Privacidade. Caso não concorde com alguma condição, não utilize os serviços.",
      "Estes termos aplicam-se ao site institucional e aos aplicativos da plataforma, incluindo cursos, tutoriais, simulados, ranking, loja de itens virtuais e emissão de certificados.",
    ],
  },
  {
    title: "2. Cadastro e conta",
    body: [
      "Para utilizar recursos que dependem de identificação (progresso, XP, ranking, certificados), é necessário criar uma conta com informações verdadeiras. Você é responsável por manter seus dados atualizados.",
      "A conta é pessoal e intransferível. Não compartilhe sua senha ou códigos de verificação: qualquer atividade realizada a partir da sua conta será considerada sua.",
      "Podemos suspender ou encerrar contas que violem estes termos, que permaneçam inativas por período prolongado ou que apresentem indícios de fraude, sempre que possível com aviso prévio.",
    ],
  },
  {
    title: "3. Uso da plataforma",
    body: [
      "Você se compromete a utilizar a plataforma apenas para fins lícitos e educacionais, sem interferir no funcionamento do serviço, sem tentar obter acesso não autorizado a dados de terceiros e sem utilizar robôs, scripts ou mecanismos de exploração automática fora dos recursos públicos previstos.",
      "É vedado publicar conteúdo que viole direitos de terceiros, incite ódio, discriminação ou violência, divulgue informações pessoais de outras pessoas ou promova golpes, spam ou fraudes.",
    ],
  },
  {
    title: "4. Conteúdo educacional",
    body: [
      "Cursos, tutoriais e simulados são elaborados com fins educacionais e informativos. Eles não substituem materiais oficiais, normas regulamentares, bibliografias obrigatórias nem aconselhamento profissional ou acadêmico.",
      "O conteúdo é atualizado periodicamente e pode ser revisado, ampliado ou removido. A disponibilidade de um curso, tutorial ou simulado em determinado momento não constitui promessa de manutenção permanente.",
    ],
  },
  {
    title: "5. Gamificação: XP, moedas, ranking e loja",
    body: [
      "A plataforma utiliza elementos de gamificação — pontos de experiência (XP), moedas virtuais, ranking sazonal, conquistas e itens de personalização — exclusivamente para incentivar o aprendizado.",
      "XP, moedas e itens virtuais não possuem valor monetário, não podem ser trocados por dinheiro, bens ou serviços e não constituem direito de crédito em relação à Hexavante. Podem ser ajustados em caso de erro técnico ou uso indevido.",
      "Posições em ranking dependem da atividade de todos os participantes e podem mudar a qualquer momento.",
    ],
  },
  {
    title: "6. Certificados",
    body: [
      "Certificados são emitidos automaticamente após a conclusão dos requisitos do curso (aulas, atividades e avaliações), conforme as regras exibidas em cada curso.",
      "O certificado atesta a realização do percurso formativo na plataforma e não substitui diplomas, registros acadêmicos ou certificados profissionais exigidos por conselhos, instituições ou órgãos públicos.",
      "Certificados possuem código de verificação público, permitindo a qualquer pessoa confirmar sua autenticidade.",
    ],
  },
  {
    title: "7. Moderação e segurança",
    body: [
      "A plataforma pode contar com recursos de denúncia, filtro de conteúdo e moderação humana. Medidas incluem avisos, silenciamento temporário, remoção de conteúdo e bloqueio definitivo da conta.",
      "Denúncias e ações de moderação são tratadas com registro interno, permitindo revisão e prevenção de abusos.",
    ],
  },
  {
    title: "8. Propriedade intelectual",
    body: [
      "Marcas, logotipos, textos, imagens, vídeos, questões, layout e código da plataforma pertencem à Hexavante ou a seus licenciantes e são protegidos pela legislação aplicável.",
      "Você pode consumir o conteúdo para fins pessoais e de estudo, mas é vedada a redistribuição, revenda, reprodução integral ou exploração comercial do material sem autorização escrita.",
      "Sugestões, ideias e feedbacks enviados por você podem ser utilizados para melhorar a plataforma, sem obrigação de remuneração.",
    ],
  },
  {
    title: "9. Serviços e links de terceiros",
    body: [
      "A plataforma pode exibir links, vídeos ou integrações de terceiros (por exemplo, repositórios de vídeo e redes sociais). Esses serviços têm políticas próprias, pelas quais não respondemos.",
      "Anúncios, patrocínios ou materiais promocionais, quando presentes, serão identificados como tal.",
    ],
  },
  {
    title: "10. Disponibilidade e responsabilidade",
    body: [
      "Trabalhamos para manter a plataforma disponível e segura, mas podemos realizar manutenções, interrupções ou alterações sem aviso prévio.",
      "Na máxima extensão permitida pela lei, a Hexavante não responde por lucros cessantes, perda de dados decorrente de uso indevido da conta ou danos indiretos decorrentes da indisponibilidade temporária do serviço.",
      "Nada nestes termos limita direitos que não possam ser limitados pela legislação brasileira, em especial os direitos do consumidor previstos no Código de Defesa do Consumidor.",
    ],
  },
  {
    title: "11. Alterações destes termos",
    body: [
      "Estes termos podem ser atualizados para refletir mudanças na plataforma, na legislação ou nas práticas de segurança. A versão vigente estará sempre disponível nesta página, com a data de vigência.",
      "Alterações relevantes serão comunicadas por aviso na plataforma ou por e-mail. O uso continuado após a vigência implica aceitação da nova versão.",
    ],
  },
  {
    title: "12. Lei aplicável e foro",
    body: [
      "Estes termos são regidos pelas leis da República Federativa do Brasil. Eventuais controvérsias serão resolvidas no foro do domicílio do consumidor, observadas as regras de competência legal e o Sistema Nacional de Defesa do Consumidor.",
    ],
  },
  {
    title: "13. Contato",
    body: [
      "Dúvidas sobre estes Termos de Uso podem ser enviadas pelo e-mail suporte@hexavante.com.br ou pelos canais oficiais da plataforma.",
    ],
  },
];

export default async function TermosPage() {
  const session = await getSession();
  const user = session
    ? { name: session.name, username: session.username, avatarUrl: session.avatarUrl }
    : null;

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
                  <FileText className="h-3.5 w-3.5" />
                  Termos de uso
                </div>
                <h1 className="text-4xl font-black tracking-tight text-[hsl(var(--sidebar-foreground))] sm:text-5xl">
                  Termos de <span className="hx-accent-text">Uso</span>
                </h1>
                <p className="mt-5 text-base leading-relaxed text-[hsl(var(--sidebar-foreground)/0.56)] sm:text-lg">
                  As condições que regem o acesso aos cursos, simulados,
                  gamificação, certificados e demais recursos do Hexavante.
                </p>
                <p className="mt-4 text-xs text-[hsl(var(--sidebar-foreground)/0.5)]">
                  Vigência a partir de 30/09/2026 · Antes de continuar, leia
                  também a nossa{" "}
                  <a href="/privacidade" className="underline hover:text-[hsl(var(--sidebar-highlight))]">
                    Política de Privacidade
                  </a>
                  .
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

            <ScrollReveal>
              <div className="hx-panel mt-12 rounded-2xl p-6 text-center">
                <p className="text-sm text-[hsl(var(--sidebar-foreground)/0.6)]">
                  Precisa de ajuda com a sua conta?
                </p>
                <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
                  <a
                    href={`${APP_URL}/ajuda`}
                    className="hx-btn-primary px-5 py-2.5 text-sm"
                  >
                    Central de ajuda
                  </a>
                  <a
                    href="mailto:suporte@hexavante.com.br"
                    className="hx-btn-secondary px-5 py-2.5 text-sm"
                  >
                    suporte@hexavante.com.br
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
