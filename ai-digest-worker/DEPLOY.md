# Desplegar AI Digest Worker

## 1. Obtén tu API key de Resend (gratis, 2 minutos)
→ https://resend.com  
→ Sign up → API Keys → Create API Key  
→ Copia el key (empieza con `re_...`)

## 2. Instala wrangler (una sola vez)
```bash
npm install -g wrangler
wrangler login
```

## 3. Configura las variables secretas
```bash
wrangler secret put RESEND_API_KEY
# pega tu key de Resend cuando lo pida

wrangler secret put TO_EMAIL
# escribe: vincenzozegarra@gmail.com
```

## 4. Despliega
```bash
cd ai-digest-worker
wrangler deploy
```

## Listo ✅
- El digest llega a tu Gmail **directamente** cada día a las 9am
- Sin depender de Cowork, sin sockets, sin errores
- Para probar manualmente: https://ai-digest-enzo.[tu-subdominio].workers.dev/run?secret=digest2026

## Cambiar el horario
Edita `wrangler.toml` → `crons = ["0 14 * * *"]`  
(14:00 UTC = 9:00am Lima/Perú UTC-5)
