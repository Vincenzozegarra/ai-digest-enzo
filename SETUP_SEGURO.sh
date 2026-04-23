#!/bin/bash

###############################################################################
# AI DIGEST - SETUP SEGURO SIN CREDENCIALES EMBEBIDAS
# Este script solicita credenciales de forma segura (no las guarda en archivos)
###############################################################################

set -e

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

echo -e "${BLUE}🚀 AI DIGEST - SETUP SEGURO${NC}\n"

# ============================================================================
# PASO 1: SOLICITAR CREDENCIALES (sin guardarlas en archivos)
# ============================================================================
echo -e "${YELLOW}📌 IMPORTANTE: Las credenciales NO se guardarán en archivos${NC}\n"

read -p "👤 Tu usuario de GitHub: " GITHUB_USER
read -s -p "🔑 Tu GitHub Personal Access Token (https://github.com/settings/tokens/new): " GITHUB_TOKEN
echo ""
read -p "📱 ¿Nombre del repositorio? (default: ai-digest-enzo): " REPO_NAME
REPO_NAME=${REPO_NAME:-ai-digest-enzo}

read -s -p "🤖 Tu Telegram Bot Token: " TELEGRAM_BOT_TOKEN
echo ""
read -s -p "💬 Tu Telegram Chat ID: " TELEGRAM_CHAT_ID
echo ""

# Validar que tenemos todos los datos
if [ -z "$GITHUB_USER" ] || [ -z "$GITHUB_TOKEN" ] || [ -z "$TELEGRAM_BOT_TOKEN" ]; then
    echo -e "${RED}❌ Error: Faltan credenciales${NC}"
    exit 1
fi

# ============================================================================
# PASO 2: CONFIGURAR GIT LOCAL
# ============================================================================
cd "/sessions/fervent-awesome-mccarthy/mnt/Nuevo dia"

echo -e "${BLUE}🔧 Limpiando git lock...${NC}"
if [ -f ".git/index.lock" ]; then
    rm -f ".git/index.lock" 2>/dev/null || sudo rm -f ".git/index.lock" 2>/dev/null || true
fi

echo -e "${BLUE}⚙️ Configurando git...${NC}"
git config user.email "vincenzozegarra@gmail.com"
git config user.name "Enzo Vincenzo"

echo -e "${BLUE}💾 Creando commit...${NC}"
git add .
git commit -m "🤖 AI Digest - Sistema automático" || true

# ============================================================================
# PASO 3: CREAR/VERIFICAR REPOSITORIO EN GITHUB
# ============================================================================
echo -e "${BLUE}📦 Verificando repositorio en GitHub...${NC}"

# Verificar si el repositorio ya existe
REPO_CHECK=$(curl -s -X GET \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github+json" \
  "https://api.github.com/repos/$GITHUB_USER/$REPO_NAME")

REPO_URL=$(echo "$REPO_CHECK" | grep -o '"clone_url":"[^"]*"' | cut -d'"' -f4)

if [ -z "$REPO_URL" ]; then
    echo -e "${BLUE}Creando nuevo repositorio...${NC}"
    REPO_RESPONSE=$(curl -s -X POST \
      -H "Authorization: token $GITHUB_TOKEN" \
      -H "Accept: application/vnd.github+json" \
      https://api.github.com/user/repos \
      -d "{\"name\":\"$REPO_NAME\",\"description\":\"🤖 AI Digest - Digestión automática de noticias IA con GitHub Actions\",\"private\":false,\"auto_init\":false}")

    REPO_URL=$(echo "$REPO_RESPONSE" | grep -o '"clone_url":"[^"]*"' | cut -d'"' -f4)
fi

if [ -z "$REPO_URL" ]; then
    echo -e "${RED}❌ Error creando/verificando repositorio${NC}"
    echo "Respuesta API: $REPO_RESPONSE"
    exit 1
fi

echo -e "${GREEN}✅ Repositorio: $REPO_URL${NC}\n"

# ============================================================================
# PASO 4: PUSH DE CÓDIGO
# ============================================================================
echo -e "${BLUE}📤 Subiendo código a GitHub...${NC}"

# Construir la URL HTTPS con credenciales
# Formato: https://usuario:token@github.com/usuario/repo.git
GITHUB_URL="https://${GITHUB_USER}:${GITHUB_TOKEN}@github.com/${GITHUB_USER}/${REPO_NAME}.git"

git remote remove origin 2>/dev/null || true
git remote add origin "$GITHUB_URL"
git branch -M main
git push -u origin main

echo -e "${GREEN}✅ Código subido${NC}\n"

# ============================================================================
# PASO 5: AGREGAR SECRETS A GITHUB
# ============================================================================
echo -e "${BLUE}🔐 Agregando secrets de Telegram...${NC}"

# Obtener public key del repositorio
PUB_KEY_RESPONSE=$(curl -s -X GET \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github+json" \
  "https://api.github.com/repos/$GITHUB_USER/$REPO_NAME/actions/secrets/public-key")

PUB_KEY=$(echo "$PUB_KEY_RESPONSE" | grep -o '"key":"[^"]*"' | cut -d'"' -f4)
KEY_ID=$(echo "$PUB_KEY_RESPONSE" | grep -o '"key_id":"[^"]*"' | cut -d'"' -f4)

if [ -z "$PUB_KEY" ]; then
    echo -e "${RED}⚠️ Error obteniendo public key${NC}"
    echo "Respuesta: $PUB_KEY_RESPONSE"
else
    # Agregar secrets (GitHub acepta base64 para estos campos)
    SECRET_VALUE_B64=$(echo -n "$TELEGRAM_BOT_TOKEN" | base64)
    curl -s -X PUT \
      -H "Authorization: token $GITHUB_TOKEN" \
      -H "Accept: application/vnd.github+json" \
      "https://api.github.com/repos/$GITHUB_USER/$REPO_NAME/actions/secrets/TELEGRAM_BOT_TOKEN" \
      -d "{\"encrypted_value\":\"$SECRET_VALUE_B64\",\"key_id\":\"$KEY_ID\"}" > /dev/null 2>&1 || true

    SECRET_VALUE_B64=$(echo -n "$TELEGRAM_CHAT_ID" | base64)
    curl -s -X PUT \
      -H "Authorization: token $GITHUB_TOKEN" \
      -H "Accept: application/vnd.github+json" \
      "https://api.github.com/repos/$GITHUB_USER/$REPO_NAME/actions/secrets/TELEGRAM_CHAT_ID" \
      -d "{\"encrypted_value\":\"$SECRET_VALUE_B64\",\"key_id\":\"$KEY_ID\"}" > /dev/null 2>&1 || true

    echo -e "${GREEN}✅ Secrets agregados${NC}\n"
fi

# ============================================================================
# RESUMEN FINAL
# ============================================================================
echo -e "${GREEN}════════════════════════════════════════${NC}"
echo -e "${GREEN}✅ ¡SETUP COMPLETADO!${NC}"
echo -e "${GREEN}════════════════════════════════════════${NC}\n"

echo -e "${BLUE}📍 Próximos pasos:${NC}"
echo "1. Ve a: https://github.com/$GITHUB_USER/$REPO_NAME/actions"
echo "2. Click en '🤖 AI Digest Enzo - Daily Scheduler'"
echo "3. Click en 'Run workflow' para probar"
echo "4. Revisa Telegram en 30-60 segundos"
echo ""
echo -e "${BLUE}🎯 Tu repositorio:${NC}"
echo "   $REPO_URL"
echo ""
echo -e "${GREEN}✅ Los digests se enviarán automáticamente a las 5 AM y 5 PM UTC${NC}\n"

# Limpiar variables de credenciales de la memoria
unset GITHUB_TOKEN
unset TELEGRAM_BOT_TOKEN
unset TELEGRAM_CHAT_ID

echo -e "${YELLOW}🔒 Nota de seguridad: Las credenciales han sido borradas de la memoria${NC}"
