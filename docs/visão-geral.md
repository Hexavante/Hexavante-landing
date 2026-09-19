# Hexavante Landing — visão geral

Documento de referência da arquitetura **implementada** no repositório.

---

## Descrição

A landing Hexavante é o site público e independente da plataforma (`https://hexavante.com.br`): vitrine do catálogo, páginas próprias e design exclusivo — sem banco, sem sessão própria e sem importar código do app ou da API.

**Stack atual:** Next.js 16, React 19, Tailwind, `lucide-react`. Ver [stack.md](stack.md) e [instalacao-e-desenvolvimento.md](instalacao-e-desenvolvimento.md).

---

## Papel no ecossistema

| Papel | Detalhe |
|-------|---------|
| Aquisição | Primeira impressão: hero, features, CTAs para criar conta |
| Catálogo | Cursos, tutoriais e simulados completos com filtros (mesmos dados do app) |
| Prova social | Stats reais, certificados (logado), ranking e conquistas |
| Conversão | Todo CTA leva ao app (`APP_URL`) para matrícula, prova e compra |

## Princípios

1. **Independência total**: repo, build e deploy próprios; só HTTP na API pública.
2. **Degradação graciosa**: API fora/lenta → seções vazias amigáveis, nunca erro.
3. **Sessão só-leitura**: detecta login via cookie compartilhado; deslogado vê CTA.
4. **Performance**: revalidação de 60s, thumbnails com lazy, filtros sem JS obrigatório.
