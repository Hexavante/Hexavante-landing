# DER lógico — Hexavante Landing

Documento de referência do mapeamento **implementado** em `src/lib/api.ts`: cada visão conceitual vem de um endpoint (ver [der-conceitual.md](der-conceitual.md)).

---

| Visão (tipo TS) | Endpoint | Formato |
|-----------------|----------|---------|
| `Course` / `CourseDetail` | `GET /api/v1/courses`, `GET /api/v1/courses/:id` | `{ data, pagination }` / `{ course }` |
| `Tutorial` | `GET /api/v1/tutorials`, `GET /api/v1/tutorials/:id` | `{ data, pagination }` / `{ tutorial }` |
| `Exam` | `GET /api/v1/exams`, `GET /api/v1/exams/:id` | array / `{ exam }` |
| `Certificate[]` | `GET /api/v1/certificates` (cookie encaminhado) | `{ certificates }` |
| `RankEntry[]` | `GET /api/v1/rankings` | `{ data }` |
| `Achievement[]` | `GET /api/v1/achievements` | `{ achievements }` |
| `LiveRoom[]` | `GET /api/v1/live-rooms` | `{ rooms }` |
| `PlatformStats` | `GET /api/v1/platform/stats` | objeto direto |
| `Category[]` | `GET /api/v1/courses/categories` | `{ categories }` |
| `SessionUser` | `GET /api/v1/auth/session` (cookie) | `{ user }` |

## Convenções

- Revalidação de 60s nos fetchers públicos; `no-store` em sessão/certificados.
- Detalhes aceitam `slug` ou `id`; ausente → `notFound()`.
