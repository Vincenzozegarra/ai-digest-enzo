# 🚀 AI Digest - Setup Automático

Para completar el setup del AI Digest, ejecuta:

```bash
bash SETUP_SEGURO.sh
```

Este script solicita tus credenciales de forma segura (sin guardarlas en archivos):
- GitHub username
- GitHub Personal Access Token (PAT)
- Telegram Bot Token
- Telegram Chat ID

**Las credenciales NO se guardan en archivos** - se solicitan interactivamente y se limpian de memoria después.

## Opción Alternativa (si ejecutas localmente en tu Mac)

```bash
# En tu Mac:
bash SETUP_SEGURO.sh
```

El script:
1. ✅ Limpia git locks
2. ✅ Configura git
3. ✅ Crea/verifica repo en GitHub
4. ✅ Sube el código
5. ✅ Configura secrets de Telegram
6. ✅ Limpia credenciales de memoria

## Resultado Final

- GitHub Actions programados para 5 AM y 5 PM UTC
- Telegram Bot: t.me/aiDigestEnzo2_bot
- Digests automáticos cada día
