# Deploy em produção — Hexavante Landing

Documento de referência do deploy **implementado** na VPS.

---

## Topologia

```
Internet ──HTTPS──▶ Nginx ──▶ 127.0.0.1:3001 ──▶ hexavante-landing (node server.js)
                                                    └─fetch──▶ api.hexavante.com.br
```

## Passo a passo (`/opt/hexavante-landing`)

```bash
git fetch origin && git reset --hard origin/main
docker build --no-cache \
  --build-arg NEXT_PUBLIC_API_URL=https://api.hexavante.com.br \
  --build-arg NEXT_PUBLIC_APP_URL=https://app.hexavante.com.br \
  -t hexavante-landing .
docker stop hexavante-landing && docker rm hexavante-landing
docker run -d --name hexavante-landing --network hexavante_default -p 127.0.0.1:3001:3001 \
  -e NODE_ENV=production -e API_URL='http://hexavante-api:3045' \
  -e NEXT_PUBLIC_API_URL='https://api.hexavante.com.br' \
  -e NEXT_PUBLIC_APP_URL='https://app.hexavante.com.br' \
  --restart unless-stopped hexavante-landing
```

Nginx já roteia `hexavante.com.br` → `:3001` (sem mudança necessária salvo novo domínio).

## Verificação

```bash
curl http://localhost:3001/          # 200
curl http://localhost:3001/sobre     # 200
docker logs hexavante-landing        # sem erro
```

Seção zerada? Conferir o endpoint da API antes de mexer na landing. Ver [der-logico.md](der-logico.md).
