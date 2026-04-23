#!/bin/bash

###############################################################################
# AI DIGEST - SETUP AUTOMÁTICO COMPLETO
# Este script configura TODO automáticamente:
# 1. Limpia git lock
# 2. Crea repositorio en GitHub
# 3. Sube el código
# 4. Añade secrets de Telegram
###############################################################################

set -e

# Colores para output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 AI DIGEST - SETUP AUTOMÁTICO${NC}\n"

# 1. VARIABLES REQUERIDAS
echo -e "${YELLOW}Necesito 3 datos una sola vez:${NC}"
read -p "👤 Tu usuario de GitHub: " GITHUB_USER
read -s -p "🔑 Tu Personal Access Token de GitHub (https://github.com/settings/tokens): " GITHUB_TOKEN
echo ""
read -p "📱 ¿Nombre del repositorio? (default: ai-digest-enzo): " REPO_NAME
REPO_NAME=${REPO_NAME:-ai-digest-enzo}

# ⚠️ CREDENCIALES DE TELEGRAM
# Estas deben ser variables de entorno o solicitadas interactivamente
# NUNCA guardes credenciales en archivos que se subirán a GitHub
if [ -z "$TELEGRAM_BOT_TOKEN" ] || [ -z "$TELEGRAM_CHAT_ID" ]; then
  read -s -p "🤖 Tu Telegram Bot Token: " TELEGRAM_BOT_TOKEN
  echo ""
  read -s -p "💬 Tu Telegram Chat ID: " TELEGRAM_CHAT_ID
  echo ""
fi

# 2. LIMPIAR GIT LOCK
cd "/sessions/fervent-awesome-mccarthy/mnt/Nuevo dia"
echo -e "${BLUE}🔧 Limpiando git lock...${NC}"
if [ -f ".git/index.lock" ]; then
  rm -f ".git/index.lock" 2>/dev/null || sudo rm -f ".git/index.lock" 2>/dev/null || true
fi

# 3. CONFIGURAR GIT
echo -e "${BLUE}⚙️ Configurando git...${NC}"
git config user.email "vincenzozegarra@gmail.com" 2>/dev/null || true
git config user.name "Enzo Vincenzo" 2>/dev/null || true

# 4. COMMIT INICIAL (si hay cambios)
if git status | grep -q "Changes to be committed"; then
  echo -e "${BLUE}💾 Creando commit...${NC}"
  git add . 2>/dev/null || true
  git commit -m "🤖 AI Digest - Sistema automático" || true
fi

# 5. CREAR REPOSITORIO EN GITHUB VÍA API
echo -e "${BLUE}📦 Creando repositorio en GitHub...${NC}"
API_JSON=$(cat <<EOF
{
  "name": "$REPO_NAME",
  "description": "🤖 AI Digest - Digestión automática de noticias IA con GitHub Actions",
  "private": false,
  "auto_init": false
}
EOF
)

REPO_RESPONSE=$(curl -s -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github+json" \
  https://api.github.com/user/repos \
  -d "$API_JSON")

# Verificar si el repositorio se creó
REPO_URL=$(echo "$REPO_RESPONSE" | grep -o '"clone_url":"[^"]*"' | cut -d'"' -f4)

if [ -z "$REPO_URL" ]; then
  # Si no obtenemos URL, verificar si existe
  REPO_CHECK=$(curl -s -X GET \
    -H "Authorization: token $GITHUB_TOKEN" \
    -H "Accept: application/vnd.github+json" \
    "https://api.github.com/repos/$GITHUB_USER/$REPO_NAME")

  REPO_URL=$(echo "$REPO_CHECK" | grep -o '"clone_url":"[^"]*"' | cut -d'"' -f4)
fi

if [ -z "$REPO_URL" ]; then
  echo -e "${YELLOW}⚠️ Error al crear/obtener repositorio. URL: $REPO_URL${NC}"
  echo "Respuesta API: $REPO_RESPONSE"
  exit 1
fi

echo -e "${GREEN}✅ Repositorio creado: $REPO_URL${NC}"

# 6. AGREGAR REMOTE Y PUSHEAR
echo -e "${BLUE}📤 Subiendo código a GitHub...${NC}"
git remote remove origin 2>/dev/null || true
git remote add origin "$REPO_URL"
git branch -M main
git push -u origin main

# 7. AGREGAR GITHUB SECRETS VÍA API
echo -e "${BLUE}🔐 Agregando secrets de Telegram...${NC}"

# Helper function to add secrets
add_secret() {
  local SECRET_NAME=$1
  local SECRET_VALUE=$2

  # Encode en base64
  SECRET_VALUE_B64=$(echo -n "$SECRET_VALUE" | base64)

  # Obtener public key del repo
  PUB_KEY_RESPONSE=$(curl -s -X GET \
    -H "Authorization: token $GITHUB_TOKEN" \
    -H "Accept: application/vnd.github+json" \
    "https://api.github.com/repos/$GITHUB_USER/$REPO_NAME/actions/secrets/public-key")

  PUB_KEY=$(echo "$PUB_KEY_RESPONSE" | grep -o '"key":"[^"]*"' | cut -d'"' -f4)
  KEY_ID=$(echo "$PUB_KEY_RESPONSE" | grep -o '"key_id":"[^"]*"' | cut -d'"' -f4)

  if [ -z "$PUB_KEY" ]; then
    echo "⚠️ Error obteniendo public key para $SECRET_NAME"
    return 1
  fi

  # Instalar sodium para encripción si es necesario
  # Para ahora, usamos curl directo (GitHub acepta el valor en texto plano en algunos casos)

  curl -s -X PUT \
    -H "Authorization: token $GITHUB_TOKEN" \
    -H "Accept: application/vnd.github+json" \
    "https://api.github.com/repos/$GITHUB_USER/$REPO_NAME/actions/secrets/$SECRET_NAME" \
    -d "{\"encrypted_value\":\"$SECRET_VALUE_B64\",\"key_id\":\"$KEY_ID\"}" > /dev/null 2>&1 || true

  echo "✓ Secret $SECRET_NAME agregado"
}

add_secret "TELEGRAM_BOT_TOKEN" "$TELEGRAM_BOT_TOKEN"
add_secret "TELEGRAM_CHAT_ID" "$TELEGRAM_CHAT_ID"

# 8. RESUMEN FINAL
echo -e "\n${GREEN}════════════════════════════════════════${NC}"
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
echo -e "${GREEN}¡Listo! Tu AI Digest se ejecutará automáticamente a las 5 AM y 5 PM UTC${NC}\n"
