# Sprint 4 — Design (Landing)

## Sistema visual (`src/styles/`)

`themes.css` (variáveis `:root`), `components.css` (botões `hx-hero-btn`/`hx-btn-*`, `hx-card`, `hx-chip`, `hx-pill`, `hx-intro-chip`, `hx-icon-box`, logo glow), `animations.css` (fade, scale, float, shimmer, pulse-glow). Fonte Space Grotesk (`--font-display` → `--font-sans`).

## Componentes de ambiente

- `FloatingDecor`: glows + partículas + formas geométricas por seção.
- `ScrollReveal`: IntersectionObserver (fade + slide, com delay).
- `BackgroundMusic`: player YouTube embutido com controle flutuante (inicia mudo, respeita `localStorage`).
- `ViewTracker`: conta view do tutorial (`POST /tutorials/:id/view`) no detalhe.

## Assets (`public/brand/`)

`hexavante-logo.png` (header/footer com glow) e `mascote-hero.png` (hero). Imagens de conteúdo vêm da API (thumbnails/capas); fallback em gradiente + ícone.

## Regras

- Contraste AA nos textos sobre gradientes; `line-clamp` em títulos/descrições; `loading="lazy"` fora do hero.
- Nada de `(landing)` do app aqui — design 100% próprio (pode inspirar, nunca importar).
