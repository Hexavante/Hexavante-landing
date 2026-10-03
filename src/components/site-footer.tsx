import Link from "next/link";
import { HexavanteLogo } from "@/components/brand-logo";

const APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || "https://app.hexavante.com.br";

/** Convite do Discord — fonte única (coluna Comunidade + links sociais). */
const DISCORD_URL = "https://discord.gg/UgNRJYX9e";

const productLinks = [
  { label: "Cursos", href: "/cursos" },
  { label: "Tutoriais", href: "/tutorials" },
  { label: "Simulados", href: "/simulados" },
  { label: "Competir", href: "/competir" },
  { label: "Plataforma", href: "/plataforma" },
];

const companyLinks = [
  { label: "Sobre nós", href: "/sobre" },
  { label: "Blog", href: "/blog" },
  { label: "Carreiras", href: "/carreiras" },
];

const resourceLinks = [
  { label: "Central de ajuda", href: `${APP_URL}/ajuda` },
  { label: "Termos de uso", href: "/termos" },
  { label: "Privacidade", href: "/privacidade" },
];

const socialLinks = [
  { label: "Discord", href: DISCORD_URL },
  { label: "YouTube", href: "https://www.youtube.com/@Hexavante" },
  { label: "Instagram", href: "https://www.instagram.com/hexavante_ofc/" },
];

const columns = [
  { title: "Produto", links: productLinks, internal: true },
  { title: "Empresa", links: companyLinks, internal: true },
  { title: "Recursos", links: resourceLinks, internal: true },
  { title: "Comunidade", links: socialLinks, internal: false },
];

/** Títulos e textos de apoio: alpha 0.5 passa 4.5:1 no escuro e no claro. */
const HEADING_CLASS =
  "text-xs font-bold uppercase tracking-wider text-[hsl(var(--sidebar-foreground)/0.5)]";
const LINK_CLASS =
  "text-sm text-[hsl(var(--sidebar-foreground)/0.6)] transition hover:text-[hsl(var(--sidebar-highlight))]";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.06] bg-[var(--background)]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="grid grid-cols-2 gap-8 py-12 sm:grid-cols-4 lg:grid-cols-5">
          <div className="col-span-2 sm:col-span-4 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2.5" aria-label="Hexavante">
              <HexavanteLogo
                size="md"
                showWordmark={false}
                className="gap-0"
                imageClassName="hx-header-logo-glow h-10 w-10"
              />
              <span className="hx-wordmark text-sm font-extrabold tracking-tight hx-accent-text">
                HEXAVANTE
              </span>
            </Link>
            <p className="mt-3 max-w-xs text-xs leading-5 text-[hsl(var(--sidebar-foreground)/0.5)]">
              A plataforma educacional que combina cursos, simulados e
              gamificação para transformar seu aprendizado.
            </p>
          </div>

          {columns.map((column) => (
            <div key={column.title}>
              <h4 className={HEADING_CLASS}>{column.title}</h4>
              <ul className="mt-3 space-y-2">
                {column.links.map((link) =>
                  column.internal ? (
                    <li key={link.href}>
                      <Link href={link.href} className={LINK_CLASS}>
                        {link.label}
                      </Link>
                    </li>
                  ) : (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={LINK_CLASS}
                      >
                        {link.label}
                      </a>
                    </li>
                  )
                )}
                {column.title === "Produto" && (
                  <li>
                    <a
                      href={`${APP_URL}/hexa`}
                      className="text-sm text-amber-400 transition hover:text-amber-300"
                    >
                      Hexa ✦
                    </a>
                  </li>
                )}
              </ul>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/[0.06] py-6 sm:flex-row">
          <p className="text-xs text-[hsl(var(--sidebar-foreground)/0.5)]">
            © {new Date().getFullYear()} Hexavante. Todos os direitos reservados.
          </p>
          <p className="hx-wordmark hx-wordmark-subtle text-[10px] font-extrabold uppercase tracking-widest">
            HEXAVANTE
          </p>
        </div>
      </div>
    </footer>
  );
}
