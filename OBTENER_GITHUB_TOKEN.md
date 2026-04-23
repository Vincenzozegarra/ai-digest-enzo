# 🔑 Cómo obtener tu GitHub Personal Access Token

Este es un **paso de una sola vez** que toma **2 minutos**.

## Paso 1: Ir a Configuración de GitHub

1. Abre: [https://github.com/settings/tokens](https://github.com/settings/tokens)
2. O manualmente: GitHub → Settings (arriba a la derecha) → Developer settings (izquierda) → Personal access tokens → Tokens (classic)

## Paso 2: Crear nuevo token

1. Click **"Generate new token"** → **"Generate new token (classic)"**
2. **Token name:** `ai-digest-enzo`
3. **Expiration:** `No expiration` (o selecciona 90 días)

## Paso 3: Selecciona permisos

☑️ **repo** (acceso completo a repositorios)
- ☑️ repo:status
- ☑️ repo_deployment
- ☑️ public_repo
- ☑️ repo:invite
- ☑️ security_events

☑️ **admin:repo_hook** (para webhooks)

☑️ **delete_repo** (opcional, si quieres poder borrar después)

## Paso 4: Generar

Click en **"Generate token"** (botón verde abajo)

## Paso 5: COPIAR INMEDIATAMENTE

⚠️ **IMPORTANTE:** El token solo se muestra UNA VEZ.

Copia el token (empieza con `ghp_` o similar):
```
ghp_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

## Paso 6: Ejecutar el script

En Terminal:

```bash
cd ~/Documents/Claude/Nuevo\ dia
bash SETUP_AUTOMATICO.sh
```

Cuando te pida:
- Usuario GitHub: `tu_usuario`
- Token: **Pega el token que copiaste**
- Nombre del repositorio: `ai-digest-enzo` (enter para default)

¡Y listo! 🎉

---

## ❓ Preguntas frecuentes

**¿Es seguro pegar el token?**
- Sí, en tu terminal local es seguro
- El token se usa solo para crear el repo y luego se descarta
- GitHub no lo almacena en el repositorio

**¿Puedo reutilizar el token después?**
- Sí, puedes guardarlo para futuras configuraciones
- O créalo nuevamente si lo pierdes

**¿Qué pasa si pierdo el token?**
- No hay problema, simplemente crea uno nuevo en [GitHub Settings](https://github.com/settings/tokens)
