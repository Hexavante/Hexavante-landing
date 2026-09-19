# Instalação e desenvolvimento — Hexavante Landing

Documento de referência do setup **implementado** neste repositório.

---

## Pré-requisitos

Node.js 22+. API acessível (local `:3045` ou produção).

## Passo a passo

```bash
git clone https://github.com/Hexavante/Hexavante-landing.git
cd Hexavante-landing
npm install
cp .env.example .env
# API_URL=http://localhost:3045
# NEXT_PUBLIC_API_URL=http://localhost:3045
# NEXT_PUBLIC_APP_URL=http://localhost:3000
npm run dev
```

## Nova página (checklist)

1. Rota em `src/app/<rota>/page.tsx` (`force-dynamic` se depender da API).
2. Dados só via `src/lib/api.ts` (criar tipo + fetcher se for endpoint novo).
3. Header/footer padrão, loading/empty states, CTA para `APP_URL` em ações reais.
4. `npm run build` + `npm run typecheck` verdes.

## Comandos úteis

`npm run dev` · `npm run build` · `npm start` · `npm run typecheck` · `npm run lint`.
