# Permissões — Hexavante Landing

Documento de referência do controle de acesso **implementado**.

---

## Modelo

A landing **não tem papéis nem login próprio**. Só existem dois estados:

| Estado | Como detecta | O que muda |
|--------|--------------|------------|
| Visitante | Sem sessão na API | CTAs de criar conta/entrar; certificados viram CTA |
| Logado | `GET /api/v1/auth/session` com cookie | Nome/avatar no header, certificados próprios, links para o app |

## Regras

- Nenhuma rota exige papel; tudo público por leitura.
- Ações sensíveis não existem aqui — qualquer botão de ação leva ao app autenticado.
- Sair e trocar dados de conta acontecem no app, nunca na landing.
