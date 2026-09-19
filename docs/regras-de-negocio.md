# Regras de negócio — Hexavante Landing

Documento de referência das regras **implementadas** no código.

---

| ID | Regra |
|----|-------|
| RN-01 | Nenhuma página lê banco nem importa código do app/API — só HTTP na API pública |
| RN-02 | Só conteúdo publicado aparece (`isPublished`/`APPROVED`); rascunho dá 404 |
| RN-03 | Ações reais (matricular, responder prova, comprar, equipar) **nunca** executam aqui — sempre CTA para `APP_URL` |
| RN-04 | Certificados exigem sessão válida; sem ela, CTA (nunca lista vazia sem contexto) |
| RN-05 | Listas usam paginação da API (`limit` 24, `page`); detalhe usa `slug` com fallback para `id` |
| RN-06 | Cache de 60s nos fetchers; conteúdo novo no app aparece em até ~1 min |
| RN-07 | Filtros funcionam via query string com `<form method="get">` (sem JS) |
| RN-08 | Falha da API resulta em estado vazio amigável, nunca em erro 500 |
| RN-09 | View de tutorial conta uma vez por abertura de detalhe |
| RN-10 | Links sociais do rodapé apontam para os perfis oficiais (YouTube, Instagram, TikTok, LinkedIn) |
