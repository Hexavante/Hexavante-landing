import Link from "next/link";
import { APP_URL } from "@/lib/api";

const NAV = [
  { href: "/cursos", label: "Cursos" },
  { href: "/tutorials", label: "Tutoriais" },
  { href: "/simulados", label: "Simulados" },
];

export function SiteHeader({ loggedIn }: { loggedIn: boolean }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#070b16]/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-cyan-400 font-black text-[#06202a]">
            H
          </span>
          <span className="text-sm font-black uppercase tracking-[0.2em] text-white">
            Hexavante
          </span>
        </Link>

        <nav className="ml-6 hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {loggedIn ? (
            <a href={APP_URL} className="hx-btn-primary !px-5 !py-2.5">
              Ir para o app
            </a>
          ) : (
            <>
              <a
                href={`${APP_URL}/login`}
                className="hidden rounded-lg px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:text-white sm:block"
              >
                Entrar
              </a>
              <a href={`${APP_URL}/register`} className="hx-btn-primary !px-5 !py-2.5">
                Criar conta grátis
              </a>
            </>
          )}
        </div>
      </div>

      <nav className="flex items-center gap-1 overflow-x-auto border-t border-white/5 px-4 py-2 md:hidden">
        {NAV.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-lg px-3 py-1.5 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
