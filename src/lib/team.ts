export type TeamMember = {
  name: string;
  role: string;
};

export const TEAM: TeamMember[] = [
  { name: "Nicolas Kirsch Mazzini", role: "CEO / Desenvolvedor Full-Stack e Coordenador Geral" },
  { name: "Nicolas das Virgens Souza", role: "CEO / Pesquisa e Planejamento Estratégico" },
  { name: "Gabriella Bittencourt", role: "Redação Técnica e Documentação (ABNT)" },
  { name: "Ítalo Tavaroni", role: "Desenvolvedor Backend e Banco de Dados" },
  { name: "João Otávio Lima de Melo", role: "Modelo de Negócios e Marketing" },
  { name: "Renato Serrano", role: "Desenvolvedor Frontend e Site Institucional" },
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
