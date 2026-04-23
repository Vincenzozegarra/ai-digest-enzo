# 🚀 COMIENZA AQUÍ - Setup Automático del AI Digest

Tu sistema AI Digest **está 100% listo**. Solo necesitas ejecutar **UN COMANDO** en Terminal.

---

## ⚡ El Setup más rápido posible (5 minutos)

### Paso 1: Obtener GitHub Token (2 minutos)

Ve a esta guía: **[OBTENER_GITHUB_TOKEN.md](OBTENER_GITHUB_TOKEN.md)**

Simplemente:
1. Abre https://github.com/settings/tokens
2. Crea un nuevo token clásico
3. Copia el token (empieza con `ghp_`)

### Paso 2: Ejecutar el Script (3 minutos)

Abre Terminal y copia esto:

```bash
cd ~/Documents/Claude/Nuevo\ dia && bash SETUP_AUTOMATICO.sh
```

Luego:
1. Pega tu usuario de GitHub
2. Pega el token que copiaste
3. Presiona Enter (usa el nombre default `ai-digest-enzo`)

**¡Eso es todo!** ✅

---

## 📊 Qué hace el script automáticamente

✅ Limpia Git locks  
✅ Configura git con tus datos  
✅ Crea el repositorio en GitHub  
✅ Sube TODO tu código  
✅ Añade los secrets de Telegram  
✅ Te da el link al repo  

---

## 🎯 Después de ejecutar el script

1. Ve a: **https://github.com/TU_USUARIO/ai-digest-enzo/actions**
2. Click en **"🤖 AI Digest Enzo - Daily Scheduler"**
3. Click en **"Run workflow"** (botón azul)
4. Espera **30-60 segundos**
5. Abre Telegram → deberías recibir un digest bonito

---

## ❓ Preguntas

**¿Debo hacer algo más?**
- No. El script hace TODO.
- Telegram envía digestos cada día a las 5 AM y 5 PM UTC automáticamente.
- Tu Mac puede estar apagado.

**¿Qué información proporciono?**
- Tu usuario de GitHub (visible en https://github.com/settings/profile)
- Tu Personal Access Token (generado en https://github.com/settings/tokens)
- Ambos son seguros porque:
  - Solo creas el repositorio
  - El token se descarta después
  - No se almacena en el código

**¿Es seguro?**
- 100% seguro
- El token se usa local en tu Terminal
- Luego se descarta

**¿Puedo perder mi token?**
- No hay problema
- Simplemente crea uno nuevo en GitHub settings

---

## 📁 Archivos listos para usar

```
Nuevo dia/
├── SETUP_AUTOMATICO.sh      ← Ejecuta ESTO
├── OBTENER_GITHUB_TOKEN.md  ← Lee primero
├── ACTIVAR_SISTEMA.md       ← Setup manual (alternativa)
├── SETUP_GITHUB_ACTIONS.md  ← Configuración detallada
├── ai_digest_telegram.py    ← Script principal (listo)
└── .github/
    └── workflows/
        └── ai-digest-scheduler.yml  ← GitHub Actions workflow (listo)
```

---

## 🎉 ¡Empecemos!

```bash
cd ~/Documents/Claude/Nuevo\ dia && bash SETUP_AUTOMATICO.sh
```

**Cualquier pregunta:** Revisa `OBTENER_GITHUB_TOKEN.md` o `SETUP_GITHUB_ACTIONS.md`

¡Listo! Tu AI Digest estará enviando noticias automáticamente cada día. 🤖
