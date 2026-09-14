import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black/30">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div>
          <p className="text-sm font-black uppercase tracking-[0.2em] text-white">Hexavante</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            Catálogo público: cursos, tutoriais, simulados e certificados. Aprenda, pratique e
            evolua em um só lugar.
          </p>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Explorar</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/cursos" className="text-slate-300 hover:text-white">
                Cursos
              </Link>
            </li>
            <li>
              <Link href="/tutorials" className="text-slate-300 hover:text-white">
                Tutoriais
              </Link>
            </li>
            <li>
              <Link href="/simulados" className="text-slate-300 hover:text-white">
                Simulados
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Plataforma</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <a href="https://app.hexavante.com.br/login" className="text-slate-300 hover:text-white">
                Entrar
              </a>
            </li>
            <li>
              <a href="https://app.hexavante.com.br/register" className="text-slate-300 hover:text-white">
                Criar conta grátis
              </a>
            </li>
            <li>
              <a href="https://app.hexavante.com.br/app" className="text-slate-300 hover:text-white">
                Ir para o app
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-500">Sobre</p>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            Conteúdo exibido aqui é o mesmo do app, servido pela API pública da Hexavante.
          </p>
        </div>
      </div>
      <div className="border-t border-white/5">
        <p className="mx-auto max-w-7xl px-4 py-5 text-xs text-slate-500 sm:px-6">
          © {new Date().getFullYear()} Hexavante. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
