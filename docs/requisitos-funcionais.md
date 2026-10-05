# Requisitos funcionais — Hexavante Landing

Documento de referência do comportamento **implementado** nas páginas.

---

## Vitrine

| ID | Requisito |
|----|-----------|
| RF-01 | Home com hero, mascote, stats reais, features, prévias e CTA final |
| RF-02 | Certificados exibidos somente para visitante logado; deslogado vê CTA |

## Catálogo

| ID | Requisito |
|----|-----------|
| RF-03 | `/cursos` com busca, categoria, nível, ordenação e paginação |
| RF-04 | `/tutorials` com busca, categoria e recentes/mais vistos |
| RF-05 | `/simulados` com busca, tipo, ordenação e pills por tipo |
| RF-06 | Detalhes como prévia pública (programa, autor, stats) + CTA para o app |

## Páginas próprias

| ID | Requisito |
|----|-----------|
| RF-07 | `/competir` com ranking real, loja de moedas, sala em destaque e conquistas reais |
| RF-08 | `/plataforma` com estatísticas, Hexa, ajuda interativa e sobre |
| RF-09 | `/sobre` com história do TCC, dado 3D interativo e equipe completa |

## Design e plataforma

| ID | Requisito |
|----|-----------|
| RF-10 | Header com mega-menu, rodapé com as três redes oficiais (YouTube, Instagram, Discord) |
| RF-11 | Animações de scroll e decoração sem travar mobile |
| RF-12 | Contagem de views de tutorial (`POST /tutorials/:id/view`) ao abrir o detalhe |

## Páginas novas

| ID | Requisito |
|----|-----------|
| RF-13 | `/blog` exibe **Conteúdos** (tutoriais e cursos recentes) + canais oficiais |
| RF-14 | `/moedas` exibe o catálogo de pacotes (Mercado Pago) e leva ao app para concluir |
| RF-15 | `/carreiras`, `/termos` e `/privacidade` publicadas (`force-static` nas jurídicas) |
| RF-16 | `/certificados/c/[código]` valida certificado publicamente (QR antigos preservados) |
| RF-17 | Tema sincronizado com a conta (`app/api/account/themes`): equipado via inventário, não equipado bloqueado |
