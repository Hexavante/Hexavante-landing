# Sprint 5 — Deploy (Landing)

## Dockerfile

Multi-stage `node:22-alpine`: `deps` → `builder` (`NEXT_PUBLIC_*` via `ARG`, `npm run build`) → `runner` standalone na porta 3001 (`node server.js`, usuário `nextjs`).

## Deploy

1. `git pull` em `/opt/hexavante-landing`
2. `docker build --no-cache --build-arg NEXT_PUBLIC_API_URL=https://api.hexavante.com.br --build-arg NEXT_PUBLIC_APP_URL=https://app.hexavante.com.br -t hexavante-landing .`
3. `stop/rm/run` em `127.0.0.1:3001` com `API_URL=http://hexavante-api:3045` (interno), `NEXT_PUBLIC_*` públicos, `--restart unless-stopped`
4. Nginx já roteia `hexavante.com.br` → `:3001` (sem mudança necessária salvo nova rota de domínio)

## `docker-compose.prod.yml` (raiz)

Serviço `landing` com mesmo build/args/envs para deploys via compose (`deploy/deploy.sh` usa este arquivo).

## Verificação

`curl` em `/`, `/cursos`, `/tutorials`, `/simulados`, `/sobre` (200), stats com números reais da API, `docker logs` sem erro. Se uma seção aparece zerada, conferir o endpoint da API antes de mexer na landing.
