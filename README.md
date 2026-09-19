<p align="center">
  <img src="https://img.shields.io/badge/HEXAVANTE-Landing-0ea5e9?style=for-the-badge&labelColor=0f172a" alt="Hexavante Landing" />
</p>

<p align="center">
  <strong>Site público e independente da Hexavante.</strong><br/>
  <em>Independent public catalog: courses, tutorials, exams and certificates.</em>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16-black?logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/API_only-API-811616?logo=fastify&logoColor=white" alt="API only" />
</p>

---

## Português

Site servido em `hexavante.com.br` (porta 3001, container `hexavante-landing`, Next.js standalone). Projeto, repo e deploy **independentes** do app e da API.

### Regra dura de independência

Tudo vem da **API pública** (`API_URL`, ex. `/api/v1/courses`, `/api/v1/tutorials`, `/api/v1/exams`, `/api/v1/platform/stats`). Sem Prisma, sem sessão própria, sem importar código do app. Faltou dado na API? Peça endpoint novo em vez de furar a regra.

### Estrutura

```
src/
├── app/                  # / (vitrine), /cursos, /tutorials, /simulados (+/[id]),
│                         # /competir, /plataforma, /sobre (time + dado 3D)
├── components/           # header mega-menu, footer, cards, filtros, feature-cards,
│                         # floating-decor, scroll-reveal, background-music, team-dice...
├── lib/api.ts            # Tipos + fetchers da API pública (revalidação 60s)
└── styles/               # themes, components, animations (design próprio)
```

### Páginas

Home (hero + mascote, stats, features, prévias, certificados, CTA), catálogos com filtros/busca/paginação, detalhes como **prévia pública** (matrícula, prova e compra acontecem no app via `APP_URL`). Certificados: logado vê os seus (cookie compartilhado `.hexavante.com.br` encaminhado à API); deslogado vê CTA.

### Setup

```bash
npm install
cp .env.example .env   # API_URL, NEXT_PUBLIC_API_URL, NEXT_PUBLIC_APP_URL
npm run dev            # http://localhost:3001
```

### Scripts

| Comando | Para que |
|---|---|
| `npm run dev` | Desenvolvimento (porta 3001) |
| `npm run build` | Build de produção (obrigatório) |
| `npm start` | Produção |
| `npm run typecheck` | `tsc --noEmit` |

### Deploy

Container `hexavante-landing` na VPS (`/opt/hexavante-landing`): `git pull` → `docker build --no-cache` (com `--build-arg NEXT_PUBLIC_*`) → `stop/rm/run` na porta 3001. Nginx roteia `hexavante.com.br` para cá. Verificação: `curl` nas páginas.

### Documentação técnica

Guias por sprint em [`docs/sprints/`](docs/sprints/) (fundação → páginas → design → deploy).

---

## English (summary)

Independent Hexavante public site (standalone Next.js, port 3001, `hexavante.com.br`). API-driven only — no database, no code imports from the app. Build with `npm run build`; deploys to the VPS (`hexavante-landing` container). See `docs/sprints/` for technical guides (in Portuguese).
