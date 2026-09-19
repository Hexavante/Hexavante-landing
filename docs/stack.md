# Stack técnica — Hexavante Landing

Documento de referência da arquitetura **implementada** no repositório.

---

## Visão geral

| Camada | Tecnologia | Versão (referência) |
|--------|------------|---------------------|
| Framework | Next.js standalone (App Router) | 16.x |
| Linguagem | TypeScript | 5.x |
| UI | React | 19.x |
| Estilização | Tailwind CSS | 4.x |
| Ícones | lucide-react | 1.x |
| Fonte | Space Grotesk (`--font-display`) | Google Fonts |
| Dados | Fetch HTTP na API pública | Revalidação 60s |

---

## Arquitetura em camadas

```
┌─────────────────────────────────────────┐
│  Nginx :443 → landing :3001             │
│  ┌────────────┐  ┌──────────────────┐   │
│  │ RSC/Pages  │  │ lib/api.ts       │   │
│  │ + Client   │  │ (tipos+fetchers) │   │
│  └────────────┘  └──────────────────┘   │
└────────────────────────────┬────────────┘
                             │ HTTPS
┌────────────────────────────▼────────────┐
│        api.hexavante.com.br             │
└─────────────────────────────────────────┘
```

### Responsabilidades por pasta

| Pasta | Responsabilidade |
|-------|------------------|
| `src/app/` | Rotas e páginas (listas, detalhes, competir, plataforma, sobre) |
| `src/components/` | Header, footer, cards, filtros, decoração e interações |
| `src/lib/api.ts` | Tipos e fetchers — único ponto de contato com dados |
| `src/styles/` | Temas, componentes (`hx-*`), animações |
| `public/brand/` | Logo e mascote |
