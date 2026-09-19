# DER conceitual — Hexavante Landing

Documento de referência das entidades **consumidas** (a landing não tem banco).

---

```
CURSO_PUBLICO (id, slug, título, descrição, thumbnail, nível, tipo, módulos, aulas, instrutor)
TUTORIAL_PUBLICO (id, slug, título, descrição, thumbnail, vídeo, duração, views, categoria, autor, tags)
SIMULADO_PUBLICO (id, slug, título, descrição, capa, tipo, questões, tempo, premium)
CERTIFICADO_VIEW (id, código, emitidoEm, curso, categoria) — só com sessão
RANKING_VIEW (posição, nome, nível, XP, liga)
CONQUISTA_VIEW (chave, nome, descrição)
SALA_DESTAQUE (id, título, status, lotação, instrutor, horário)
PLATFORM_STATS (usuários, cursos, tutoriais, simulados, aulas)
```

Tudo deriva dos endpoints públicos; nada é persistido localmente. Ver o lógico em [der-logico.md](der-logico.md).
