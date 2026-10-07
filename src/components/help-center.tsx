"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  BookOpen,
  ChevronDown,
  CreditCard,
  Search,
  Settings,
  Target,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/cn";
import { appUrl } from "@/lib/urls";

/**
 * Central de ajuda (`/ajuda`).
 *
 * Conteúdo portado de `Hexavante/src/app/(landing)/ajuda/page.tsx`, adaptado
 * para a landing: sem sessão própria, sem banco e sem chamada de API — tudo é
 * estático e renderizado no servidor (o filtro/busca só refina no cliente).
 *
 * Cada resposta é uma lista de partes: texto puro ou link. Isso mantém o texto
 * pesquisável sem duplicar conteúdo.
 */
type Part = string | { label: string; href: string };

type Article = {
  q: string;
  a: Part[];
};

type Category = {
  icon: LucideIcon;
  title: string;
  articles: Article[];
};

const SUPPORT_EMAIL = "suporte@hexavante.com.br";

const toText = (parts: Part[]): string =>
  parts.map((part) => (typeof part === "string" ? part : part.label)).join(" ");

const CATEGORIES: Category[] = [
  {
    icon: BookOpen,
    title: "Cursos",
    articles: [
      {
        q: "Como acessar meus cursos?",
        a: [
          'No app, vá até "Cursos" no menu lateral. Lá você encontra todos os cursos em que está matriculado, além do catálogo completo para se inscrever em novos cursos. A vitrine pública está em ',
          { label: "Cursos", href: "/cursos" },
          ".",
        ],
      },
      {
        q: "Como concluir uma aula?",
        a: [
          "Ao finalizar uma aula, marque ela como concluída clicando no botão de check. O progresso do curso será atualizado automaticamente.",
        ],
      },
      {
        q: "Posso baixar material para offline?",
        a: [
          "Sim! No aplicativo móvel (Capacitor), você pode baixar aulas e materiais para estudar sem conexão.",
        ],
      },
    ],
  },
  {
    icon: Target,
    title: "Simulados",
    articles: [
      {
        q: "Como funciona o simulado ao vivo?",
        a: [
          "Os simulados ao vivo têm horário marcado. Ao iniciar, você terá um tempo limitado para responder todas as questões. O gabarito é liberado ao final. Confira a lista pública em ",
          { label: "Simulados", href: "/simulados" },
          ".",
        ],
      },
      {
        q: "Posso refazer um simulado?",
        a: [
          "Sim. Você pode refazer simulados quantas vezes quiser. Apenas a última tentativa contará para o ranking.",
        ],
      },
      {
        q: "Como é feita a correção?",
        a: [
          "Questões objetivas são corrigidas automaticamente. Questões discursivas são corrigidas por instrutores com prazo de até 48h.",
        ],
      },
    ],
  },
  {
    icon: Settings,
    title: "Conta e configurações",
    articles: [
      {
        q: "Como altero minha foto de perfil?",
        a: [
          "No app, vá até ",
          { label: "Configurações → Perfil", href: appUrl("/configuracoes") },
          " e faça upload de uma nova imagem. Você também pode personalizar com itens da loja.",
        ],
      },
      {
        q: "Esqueci minha senha",
        a: [
          "Na ",
          { label: "página de login", href: appUrl("/login") },
          ', clique em "Esqueci minha senha" e siga as instruções enviadas por e-mail.',
        ],
      },
      {
        q: "Como excluo minha conta?",
        a: [
          "Entre em contato com nosso suporte pelo e-mail ",
          { label: SUPPORT_EMAIL, href: `mailto:${SUPPORT_EMAIL}` },
          ". A exclusão é processada em até 7 dias.",
        ],
      },
    ],
  },
  {
    icon: CreditCard,
    title: "Hexa (assinatura)",
    articles: [
      {
        q: "O que é o Hexa?",
        a: [
          "O Hexa é nosso plano premium que desbloqueia todo o conteúdo, cosméticos exclusivos e recursos avançados. Veja os benefícios em ",
          { label: "Moedas e premium", href: "/moedas" },
          ".",
        ],
      },
      {
        q: "Como assino o Hexa?",
        a: [
          "Acesse ",
          { label: "a vitrine de moedas e premium", href: "/moedas" },
          " e escolha o plano — ou abra a ",
          { label: "loja dentro do app", href: appUrl("/shop") },
          ". O pagamento é processado de forma segura via gateway.",
        ],
      },
      {
        q: "Posso cancelar a qualquer momento?",
        a: [
          "Sim. No app, acesse ",
          { label: "Configurações → Assinatura", href: appUrl("/configuracoes") },
          " e clique em Cancelar. O acesso continua até o fim do período pago.",
        ],
      },
    ],
  },
];

function Answer({ parts }: { parts: Part[] }) {
  return (
    <p className="text-sm leading-relaxed text-[hsl(var(--sidebar-foreground)/0.6)]">
      {parts.map((part, i) => {
        if (typeof part === "string") {
          return <span key={i}>{part}</span>;
        }
        const className =
          "font-medium text-[hsl(var(--sidebar-highlight))] underline underline-offset-2 transition hover:brightness-110";
        return part.href.startsWith("/") && !part.href.startsWith("//") ? (
          <Link key={i} href={part.href} className={className}>
            {part.label}
          </Link>
        ) : (
          <a key={i} href={part.href} className={className}>
            {part.label}
          </a>
        );
      })}
    </p>
  );
}

export function HelpCenter() {
  const [search, setSearch] = useState("");
  const [openKey, setOpenKey] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    return CATEGORIES.map((cat) => ({
      ...cat,
      articles: cat.articles.filter(
        (article) =>
          !term ||
          article.q.toLowerCase().includes(term) ||
          toText(article.a).toLowerCase().includes(term),
      ),
    })).filter((cat) => cat.articles.length > 0);
  }, [search]);

  return (
    <div>
      {/* Busca */}
      <div className="mx-auto max-w-lg">
        <label htmlFor="ajuda-busca" className="sr-only">
          Buscar artigos
        </label>
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[hsl(var(--sidebar-foreground)/0.36)]" />
          <input
            id="ajuda-busca"
            type="search"
            placeholder="Buscar artigos..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-3 pl-11 pr-4 text-sm text-[hsl(var(--sidebar-foreground))] outline-none transition placeholder:text-[hsl(var(--sidebar-foreground)/0.4)] focus:border-[hsl(var(--sidebar-highlight)/0.5)] focus:ring-1 focus:ring-[hsl(var(--sidebar-highlight)/0.3)]"
          />
        </div>
      </div>

      {/* Categorias + artigos */}
      {filtered.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-sm text-[hsl(var(--sidebar-foreground)/0.5)]">
            Nenhum artigo encontrado para &quot;{search.trim()}&quot;. Tente
            outra palavra ou fale com o suporte pelo e-mail{" "}
            <a
              href={`mailto:${SUPPORT_EMAIL}`}
              className="font-medium text-[hsl(var(--sidebar-highlight))] underline underline-offset-2"
            >
              {SUPPORT_EMAIL}
            </a>
            .
          </p>
        </div>
      ) : (
        <div className="mt-10 space-y-10">
          {filtered.map((cat) => {
            const Icon = cat.icon;
            return (
              <div key={cat.title}>
                <div className="mb-4 flex items-center gap-3">
                  <Icon className="hx-accent-text h-5 w-5" />
                  <h2 className="text-lg font-bold text-[hsl(var(--sidebar-foreground))]">
                    {cat.title}
                  </h2>
                </div>
                <div className="space-y-2">
                  {cat.articles.map((article) => {
                    const key = `${cat.title}-${article.q}`;
                    const isOpen = openKey === key;
                    return (
                      <div
                        key={key}
                        className={cn(
                          "overflow-hidden rounded-xl border bg-white/[0.03] transition-colors",
                          isOpen
                            ? "border-[hsl(var(--sidebar-highlight)/0.35)]"
                            : "border-white/10",
                        )}
                      >
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          onClick={() => setOpenKey(isOpen ? null : key)}
                          className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                        >
                          <span className="text-sm font-medium text-[hsl(var(--sidebar-foreground))]">
                            {article.q}
                          </span>
                          <ChevronDown
                            className={cn(
                              "h-4 w-4 shrink-0 text-[hsl(var(--sidebar-foreground)/0.4)] transition-transform duration-300",
                              isOpen && "rotate-180",
                            )}
                          />
                        </button>
                        <div
                          className={cn(
                            "grid transition-all duration-300 ease-in-out",
                            isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                          )}
                        >
                          <div className="overflow-hidden">
                            <div className="border-t border-white/[0.06] px-5 py-4">
                              <Answer parts={article.a} />
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
