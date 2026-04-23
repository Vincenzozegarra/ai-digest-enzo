# 🚀 Configuración de GitHub Actions - AI Digest Automático

Este documento contiene los pasos para activar tu AI Digest con GitHub Actions. El sistema se ejecutará automáticamente cada día a las 5 AM y 5 PM (UTC) sin importar si tu Mac está encendido.

## ⚠️ IMPORTANTE
Una vez configurado aquí, **tu Mac NO necesita estar encendido** para recibir los digests. El envío ocurre en los servidores de GitHub.

---

## Opción A: Crear un nuevo repositorio en GitHub (Recomendado)

### Paso 1: Crear el repositorio en GitHub.com

1. Ve a [github.com/new](https://github.com/new)
2. **Repository name:** `ai-digest-enzo` (o el nombre que prefieras)
3. **Description:** "🤖 AI Digest - Digestión automática de noticias IA"
4. **Visibility:** Public (para que GitHub Actions funcione gratis)
5. **Inicializar con README:** Deja sin marcar
6. Click en **Create repository**

### Paso 2: Clonar y subir los archivos

Copia y pega esto en Terminal (desde la carpeta `Nuevo dia`):

```bash
cd ~/Documents/Claude/Nuevo\ dia

# Inicializar git (si no está ya inicializado)
git init
git config user.email "vincenzozegarra@gmail.com"
git config user.name "Enzo Vincenzo"

# Agregar todos los archivos
git add -A

# Crear commit inicial
git commit -m "🤖 AI Digest Telegram - Sistema automático de digestión de noticias IA"

# Conectar con tu repositorio en GitHub
# REEMPLAZA USERNAME con tu usuario de GitHub
git remote add origin https://github.com/USERNAME/ai-digest-enzo.git
git branch -M main
git push -u origin main
```

---

## Opción B: Usar un repositorio existente

Si ya tienes un repositorio en GitHub, agrega los archivos a la carpeta `.github/workflows/` usando Git o directamente en GitHub.com:

1. Ve a tu repositorio en GitHub
2. Click en **Add file → Upload files**
3. Sube la carpeta `.github/workflows/ai-digest-scheduler.yml`
4. Commit con mensaje: "Add AI Digest GitHub Actions workflow"

---

## Paso 3: Configurar GitHub Secrets (CRÍTICO)

Sin esto, el workflow no podrá enviar mensajes a Telegram.

### En tu repositorio de GitHub:

1. Click en **Settings** (engranaje arriba a la derecha)
2. En el menú izquierdo: **Secrets and variables** → **Actions**
3. Click en **New repository secret**

**Agregar 2 secrets:**

#### Secret 1: TELEGRAM_BOT_TOKEN
- **Name:** `TELEGRAM_BOT_TOKEN`
- **Value:** `8639383277:AAHoipnCTWYTzB8ZFS7hoVBROlqwU6qLRYc`
- Click **Add secret**

#### Secret 2: TELEGRAM_CHAT_ID
- **Name:** `TELEGRAM_CHAT_ID`
- **Value:** `6414365556`
- Click **Add secret**

✅ Después de esto, deberías ver ambos secrets listados (enmascarados).

---

## Paso 4: Verificar que el Workflow está activo

1. En tu repositorio, click en la pestaña **Actions**
2. Deberías ver **🤖 AI Digest Enzo - Daily Scheduler** en la lista de workflows
3. Si aparece en gris, click en él y luego **Enable workflow**

---

## Paso 5: Probar el Workflow manualmente

1. En la pestaña **Actions**, click en **🤖 AI Digest Enzo - Daily Scheduler**
2. Click en **Run workflow** → **Run workflow** (azul)
3. Espera 30-60 segundos
4. Deberías recibir un mensaje en Telegram de @aiDigestEnzo2_bot

Si recibiste el mensaje: ✅ **¡Sistema activo!**

Si NO recibiste nada:
- Ve a **Actions** → último workflow run (abajo)
- Click en **send-digest** 
- Mira los logs para ver si hay errores
- Los errores más comunes son:
  - Token de Telegram incorrecto
  - Chat ID incorrecto
  - Secrets no guardados correctamente

---

## Paso 6: Ajustar la zona horaria (Opcional)

El workflow actualmente usa **UTC**:
- 5 AM UTC
- 5 PM UTC

Si quieres cambiar la hora:

1. Ve a tu repositorio
2. Abre `.github/workflows/ai-digest-scheduler.yml`
3. Click en el lápiz ✏️ (editar)
4. Busca estas líneas:
   ```yaml
   schedule:
     - cron: '0 5 * * *'    # 5 AM UTC
     - cron: '0 17 * * *'   # 5 PM UTC
   ```

**Conversiones de zona horaria (a UTC):**
- 5 AM GMT-5 (EST) → cambiar a `'0 10 * * *'` (5 AM tu hora)
- 5 AM GMT-6 (CST) → cambiar a `'0 11 * * *'` (5 AM tu hora)
- 5 AM CET (UTC+1) → cambiar a `'0 4 * * *'` (5 AM tu hora)
- Etc.

5. Click en **Commit changes** → **Commit directly**

---

## Próximas mejoras (Cuando quieras)

- [ ] Integrar WebSearch real para buscar noticias en vivo
- [ ] Agregar Gmail API como fallback
- [ ] Personalizar categorías de noticias
- [ ] Agregar filtros por tema/tecnología

---

## Troubleshooting

### El workflow no se ejecuta a la hora programada
- GitHub Actions puede tener un retraso de 5-10 minutos
- Verifica que el repositorio es **Public** (las acciones gratis solo funcionan en repos públicos)
- En **Settings → Actions**, asegúrate que GitHub Actions está **habilitado**

### Recibo error "401 Unauthorized" en los logs
- Verifica que los secrets TELEGRAM_BOT_TOKEN y TELEGRAM_CHAT_ID están correctos
- En GitHub, ve a **Settings → Secrets** y revisa que están ahí

### Los digests llegan a Telegram pero sin contenido HTML
- El script está generando contenido de prueba
- Próximamente integraremos búsqueda real de noticias con WebSearch

---

**¡Tu sistema AI Digest está listo! 🎉**

Ahora recibirás análisis automáticos de noticias IA cada día a las 5 AM y 5 PM sin que tengas que hacer nada.
