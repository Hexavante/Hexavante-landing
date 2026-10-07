export type TeamMember = {
  name: string;
  role: string;
  /**
   * Foto do membro em `/public/team/`. Opcional: enquanto o arquivo não
   * existir, a UI mostra as iniciais (fallback) sem quebrar.
   * Ex.: "/team/nicolas-kirsch.webp"
   */
  image?: string;
};

export const TEAM: TeamMember[] = [
  {
    name: "Nicolas Kirsch Mazzini",
    role: "CEO / Desenvolvedor Full-Stack e Coordenador Geral",
    image: "/team/nicolas-kirsch.webp",
  },
  {
    name: "Nicolas das Virgens Souza",
    role: "CEO / Pesquisa e Planejamento Estratégico",
    image: "/team/nicolas-virgens.webp",
  },
  {
    name: "Gabriella Bittencourt",
    role: "Redação Técnica e Documentação (ABNT)",
    image: "/team/gabriella-bittencourt.webp",
  },
  {
    name: "Ítalo Tavaroni",
    role: "Desenvolvedor Backend e Banco de Dados",
    image: "/team/italo-tavaroni.webp",
  },
  {
    name: "João Otávio Lima de Melo",
    role: "Modelo de Negócios e Marketing",
    image: "/team/joao-otavio.webp",
  },
  {
    name: "Renato Serrano",
    role: "Desenvolvedor Frontend e Site Institucional",
    image: "/team/renato-serrano.webp",
  },
];

export function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}
