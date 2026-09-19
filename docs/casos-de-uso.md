# Casos de uso — Hexavante Landing

Documento de referência dos fluxos **implementados**, com rotas reais.

---

## UC-01 — Visitante descobre um curso

1. Abre `/` → vê prévias e stats.
2. Vai a `/cursos`, filtra por nível/categoria → abre `/cursos/[id]`.
3. Lê programa e clica "Começar curso no app" → `APP_URL/login?callbackUrl=/courses/[slug]`.

## UC-02 — Aluno logado vê certificados

1. Abre `/` logado → seção mostra seus certificados (via cookie → API).
2. Deslogado no mesmo lugar vê CTA "Criar conta grátis".

## UC-03 — Explorar simulados

1. `/simulados` → filtra por tipo (ENEM/Vestibular/Tecnologia) → abre prévia.
2. "Fazer simulado no app" → login/cadastro e prova no app.

## UC-04 — Conhecer o time

1. `/sobre` → rola o dado 3D, revela um membro por rolagem.
2. Grade completa + CTA para o catálogo.

## UC-05 — Competir (vitrine)

1. `/competir` → ranking real, pacotes de moedas (compra no app), sala em destaque, conquistas.
