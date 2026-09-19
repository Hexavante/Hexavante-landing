# Sprint 2 — Catálogo (Landing)

## Home (`/`)

Hero com mascote + stats da plataforma (`/platform/stats`), `FeatureCards`, prévias de cursos/tutoriais/simulados, certificados (só logado), CTA final. Tudo `force-dynamic` com revalidação de 60s nos fetchers.

## Listas (`/cursos`, `/tutorials`, `/simulados`)

- Filtros via query string com `<form method="get">` (sem JS obrigatório): busca, categoria, nível, tipo, ordenação, paginação.
- Cards com thumbnail real da API (fallback em gradiente), badges, metadados (módulos, views, questões, tempo).
- Estados vazios amigáveis (`EmptyState`).

## Detalhes (`/cursos/[id]`, `/tutorials/[id]`, `/simulados/[id]`)

Prévia pública: descrição, conteúdo programático, autor/instrutor, stats. Ações reais (matrícula, prova, compra) **sempre** via CTA para `APP_URL` (`app.hexavante.com.br`). Vídeos: YouTube/Vimeo/mp4 embedados (`video-embed`) ou link externo (TeraBox).
