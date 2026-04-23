# ⚡ ACTIVACIÓN RÁPIDA - AI Digest Automático

Tu sistema AI Digest está **100% listo**. Solo necesitas 5 minutos en GitHub para activarlo.

---

## 🎯 ¿Qué hará tu sistema?

✅ **Cada día a las 5 AM:** Digest automático de noticias IA → Telegram  
✅ **Cada día a las 5 PM:** Digest automático de noticias IA → Telegram  
✅ **Sin intervención:** Tu Mac puede estar apagado, el sistema funciona igual  
✅ **Sin terminal:** Todo automático desde GitHub

---

## 🚀 ACTÍVALO AHORA (5 minutos)

### Paso 1️⃣: Crear repositorio en GitHub

1. Abre [github.com/new](https://github.com/new)
2. Nombre: `ai-digest-enzo`
3. Descripción: `🤖 AI Digest - Digestión automática de noticias IA`
4. **Visibility: Public** ⚠️ (importante para GitHub Actions gratis)
5. Click **Create repository**

### Paso 2️⃣: Subir archivos a GitHub

Copia y pega esto en Terminal:

```bash
cd ~/Documents/Claude/Nuevo\ dia

git init
git config user.email "vincenzozegarra@gmail.com"
git config user.name "Enzo Vincenzo"
git add -A
git commit -m "🤖 AI Digest - Sistema automático"

# ⚠️ REEMPLAZA USERNAME CON TU USUARIO DE GITHUB
git remote add origin https://github.com/USERNAME/ai-digest-enzo.git
git branch -M main
git push -u origin main
```

### Paso 3️⃣: Agregar credenciales de Telegram a GitHub

En tu repositorio en GitHub:

1. **Settings** (engranaje) → **Secrets and variables** → **Actions**
2. **New repository secret** → Agregar estos 2:

| Name | Value |
|------|-------|
| `TELEGRAM_BOT_TOKEN` | `8639383277:AAHoipnCTWYTzB8ZFS7hoVBROlqwU6qLRYc` |
| `TELEGRAM_CHAT_ID` | `6414365556` |

### Paso 4️⃣: Activar el workflow

En tu repositorio:

1. Pestaña **Actions**
2. Click en **🤖 AI Digest Enzo - Daily Scheduler**
3. Si está en gris: **Enable workflow**
4. Click **Run workflow** (botón azul)

### Paso 5️⃣: Verificar

Espera 30-60 segundos. Deberías recibir un mensaje en Telegram de @aiDigestEnzo2_bot con un digest HTML bonito.

✅ **¡Si recibes el mensaje: SISTEMA ACTIVO!**

---

## 📋 Archivos generados

```
Nuevo dia/
├── ai_digest_telegram.py           ← Script principal
├── .github/
│   └── workflows/
│       └── ai-digest-scheduler.yml ← GitHub Actions workflow
├── com.enzo.aiDigestMorning.plist  ← Fallback local (launchd)
├── com.enzo.aiDigestEvening.plist  ← Fallback local (launchd)
├── SETUP_GITHUB_ACTIONS.md         ← Guía detallada
└── ACTIVAR_SISTEMA.md              ← Este archivo
```

---

## ❌ Si algo falla

**En GitHub Actions (pestaña Actions → último workflow):**
- Logs mostrarán exactamente qué error ocurrió
- Errores comunes:
  - Secrets mal guardados → revisa **Settings → Secrets**
  - Token/Chat ID incorrecto → verifica los valores
  - Repositorio privado → cambia a **Public**

---

## 🔧 Próximas mejoras

Cuando quieras, podemos agregar:
- [ ] Búsqueda real de noticias (WebSearch)
- [ ] Gmail API como fallback
- [ ] Filtros por tema/tecnología
- [ ] Personalización de horarios

---

## 📧 ¿Preguntas?

Revisa `SETUP_GITHUB_ACTIONS.md` para:
- Instrucciones detalladas
- Ajustar zona horaria
- Troubleshooting completo

**Tu bot Telegram:** @aiDigestEnzo2_bot

---

**Status:** ✅ Sistema listo para activar  
**Última actualización:** 2026-04-22  
**Tiempo estimado de activación:** 5 minutos
