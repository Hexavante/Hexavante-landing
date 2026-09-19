# Sprint 1 — Fundação (Landing)

## Princípio

Projeto, repo e deploy **independentes** do app e da API. Porta 3001 (`hexavante.com.br`, container `hexavante-landing`, Next.js standalone).

## Regra dura

Tudo via **API pública** (`API_URL` no server, `NEXT_PUBLIC_API_URL` no browser). Sem Prisma, sem sessão própria, sem importar código de `Hexavante/`. Faltou dado? Pedir endpoint novo à API.

## Estrutura (`src/`)

```
app/            # / /cursos /tutorials /simulados (+/[id]) /competir /plataforma /sobre
components/     # site-header (mega-menu), site-footer, cards, filters, badge,
                # feature-cards, floating-decor, scroll-reveal, background-music,
                # video-embed, team-dice (3D), faq-accordion, view-tracker...
lib/api.ts      # Tipos + fetchers (cursos, tutoriais, simulados, certificados,
                # sessão, ranking, conquistas, salas) com revalidação de 60s
styles/         # themes, components, animations (design próprio)
```

## Setup

```bash
npm install
cp .env.example .env   # API_URL, NEXT_PUBLIC_API_URL, NEXT_PUBLIC_APP_URL
npm run dev            # :3001
```

## Sessão (somente leitura)

Cookie compartilhado `.hexavante.com.br` encaminhado à API (`/auth/session`, `/certificates`). Logado vê dados pessoais (certificados, menu do usuário); deslogado sempre vê CTA — nunca quebra.
