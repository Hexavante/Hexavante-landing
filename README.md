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

<p align="center">
  <a href="#português">🇧🇷 Português</a> · <a href="#english">🇺🇸 English</a> · <a href="docs/visao-geral.md">Docs</a>
</p>

---

<a id="português"></a>

## Português

### Índice

- [Sobre](#sobre)
- [Arquitetura e independência](#arquitetura-e-independência)
- [Estrutura de pastas](#estrutura-de-pastas)
- [Páginas](#páginas)
- [Setup](#setup)
- [Variáveis de ambiente](#variáveis-de-ambiente)
- [Scripts](#scripts)
- [Design](#design)
- [Deploy](#deploy)
- [Solução de problemas](#solução-de-problemas)
- [Como contribuir](#como-contribuir)

### Sobre

Site servido em `hexavante.com.br` (porta 3001, container `hexavante-landing`, Next.js standalone). Projeto, repo e deploy **independentes** do app e da API: a vitrine pública da plataforma.

### Arquitetura e independência

```
Navegador ──HTTPS──▶ Nginx ──▶ hexavante-landing:3001 ──fetch──▶ api.hexavante.com.br
```

**Regra dura**: tudo via API pública (`API_URL` no server, `NEXT_PUBLIC_API_URL` no browser). Sem Prisma, sem sessão própria, sem importar código de `Hexavante/`. Faltou dado? Peça endpoint novo à API.

### Estrutura de pastas

```
src/
├── app/                  # / (vitrine), /cursos, /tutorials, /simulados (+/[id]),
│                         # /competir, /plataforma, /sobre (time + dado 3D)
├── components/           # site-header (mega-menu), site-footer, cards, filters,
│                         # badge, feature-cards, floating-decor, scroll-reveal,
│                         # background-music, video-embed, team-dice, faq-accordion...
├── lib/api.ts            # Tipos + fetchers (revalidação 60s)
└── styles/               # themes, components, animations (design próprio)
public/brand/             # logo + mascote
```

### Páginas

| Página | Conteúdo |
|---|---|
| `/` | Hero + mascote, stats, features, prévias, certificados (só logado), CTA |
| `/cursos`, `/tutorials`, `/simulados` | Catálogos com busca, filtros e paginação |
| `/cursos/[id]`, `/tutorials/[id]`, `/simulados/[id]` | Prévia pública + CTA para o app (matrícula/prova/compra só no app) |
| `/competir` | Ranking real, loja de moedas, sala em destaque, conquistas |
| `/plataforma` | Estatísticas, Hexa, ajuda (sanfona), sobre |
| `/sobre` | Time do TCC + dado 3D interativo |

Login é detectado via cookie compartilhado `.hexavante.com.br` encaminhado à API. Deslogado sempre vê CTA — nunca quebra.

### Setup

```bash
npm install
cp .env.example .env   # API_URL, NEXT_PUBLIC_API_URL, NEXT_PUBLIC_APP_URL
npm run dev            # http://localhost:3001
```

### Variáveis de ambiente

| Variável | Para que |
|---|---|
| `API_URL` | API no server-side (em produção pode ser interna, ex. `http://hexavante-api:3045`) |
| `NEXT_PUBLIC_API_URL` | API no browser (`https://api.hexavante.com.br`) |
| `NEXT_PUBLIC_APP_URL` | CTAs para o app (`https://app.hexavante.com.br`) |

### Scripts

| Comando | Para que |
|---|---|
| `npm run dev` | Desenvolvimento (porta 3001) |
| `npm run build` | Build de produção (**obrigatório**) |
| `npm start` | Produção |
| `npm run typecheck` | `tsc --noEmit` |

### Design

Fonte Space Grotesk global; header com mega-menu, `FloatingDecor`, `ScrollReveal`, `BackgroundMusic`, chips `hx-intro-chip`, acento `hx-accent-text`. Vídeos: YouTube/Vimeo/mp4 embedados, resto abre no provedor.

### Deploy

```bash
git pull                          # em /opt/hexavante-landing
docker build --no-cache \
  --build-arg NEXT_PUBLIC_API_URL=https://api.hexavante.com.br \
  --build-arg NEXT_PUBLIC_APP_URL=https://app.hexavante.com.br \
  -t hexavante-landing .
docker stop hexavante-landing && docker rm hexavante-landing
docker run -d --name hexavante-landing --network hexavante_default -p 127.0.0.1:3001:3001 \
  -e NODE_ENV=production -e API_URL='http://hexavante-api:3045' \
  -e NEXT_PUBLIC_API_URL='https://api.hexavante.com.br' \
  -e NEXT_PUBLIC_APP_URL='https://app.hexavante.com.br' \
  --restart unless-stopped hexavante-landing
```

Nginx já roteia `hexavante.com.br` → `:3001`.

### Solução de problemas

| Sintoma | Causa provável | Ação |
|---|---|---|
| Seção zerada | Endpoint da API vazio/fora | Checar a API antes de mexer na landing |
| Certificados sumiram p/ logado | Cookie não encaminhado | Ver `lib/api.ts` (`getMyCertificates` com `headers()`) |
| Build ok mas visual antigo | Container/JS em cache | Rebuild `--no-cache` + `Ctrl+Shift+R` |

### Como contribuir

1. Branch de `main`, commits curtos em português.
2. `npm run build` verde; nova página precisa de loading/empty states.
3. Nunca furar a independência (sem Prisma, sem import do app).

### Documentação técnica (`docs/`)

`visao-geral`, `requisitos-funcionais`, `regras-de-negocio`, `casos-de-uso`, `der-conceitual`, `der-logico`, `glossario`, `stack`, `permissoes`, `instalacao-e-desenvolvimento`, `deploy-producao`, `escopo-mvp`.

---

<a id="english"></a>

## English (summary)

Independent Hexavante public site (standalone Next.js, port 3001, `hexavante.com.br`). API-driven only — no database, no code imports from the app. Build with `npm run build`; deploys to the VPS (`hexavante-landing` container). See `docs/` (in Portuguese) for full technical documentation.
