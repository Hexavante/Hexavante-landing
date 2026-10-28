import { BarChart3, HelpCircle, Hexagon, type LucideIcon } from "lucide-react";
import { APP_URL } from "@/lib/urls";

/**
 * As três áreas da página /plataforma.
 *
 * Fonte única usada por:
 * - `components/showcase-cards.tsx` (cards do showcase)
 * - `app/plataforma/page.tsx` (indicadores do hero)
 * - `components/site-header.tsx` (mega-menu "Plataforma")
 *
 * `description` fica sem ponto final: o mega-menu usa a frase solta e os
 * cards acrescentam a pontuação.
 */
export type PlatformArea = {
  /** id lógico (âncora interna é `${PLATFORM_ANCHOR_PREFIX}${id}`) */
  id: string;
  label: string;
  description: string;
  icon: LucideIcon;
  /** cor do ícone — mesma paleta dos demais menus do header */
  iconColor: string;
  /** fundo suave do chip/indicador */
  iconBg: string;
  /** destino final (app ou página interna da landing) */
  href: string;
};

export const PLATFORM_ANCHOR_PREFIX = "plataforma-";

export const PLATFORM_AREAS: PlatformArea[] = [
  {
    id: "estatisticas",
    label: "Estatísticas",
    description: "Acompanhe seu desempenho com gráficos detalhados",
    icon: BarChart3,
    iconColor: "text-teal-400",
    iconBg: "bg-teal-400/15",
    href: `${APP_URL}/estatisticas`,
  },
  {
    id: "hexa",
    label: "Hexa",
    description: "O sistema de evolução e progressão do Hexavante",
    icon: Hexagon,
    iconColor: "text-amber-400",
    iconBg: "bg-amber-400/15",
    // Hexa é o plano premium/centro de moedas da própria landing.
    href: "/moedas",
  },
  {
    id: "ajuda",
    label: "Ajuda",
    description: "Dúvidas frequentes e suporte",
    icon: HelpCircle,
    iconColor: "text-sky-400",
    iconBg: "bg-sky-400/15",
    // Central de ajuda é página pública da própria landing.
    href: "/ajuda",
  },
];

export function platformAnchor(id: string): string {
  return `${PLATFORM_ANCHOR_PREFIX}${id}`;
}
