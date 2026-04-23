#!/bin/bash
# 🤖 AI Digest Enzo - Instalador de Scheduler
# Copia y pega esto en tu Terminal (desde la carpeta Nuevo dia)

set -e

PLIST_DIR="$HOME/Library/LaunchAgents"
MORNING_PLIST="$PLIST_DIR/com.enzo.aiDigestMorning.plist"
EVENING_PLIST="$PLIST_DIR/com.enzo.aiDigestEvening.plist"

echo "🤖 AI Digest Enzo - Instalando Scheduler (launchd)"
echo "=================================================="
echo ""

# Crear directorio si no existe
mkdir -p "$PLIST_DIR"

# Copiar archivos plist desde la carpeta actual
echo "📋 Copiando archivos de configuración..."
cp ./com.enzo.aiDigestMorning.plist "$MORNING_PLIST"
cp ./com.enzo.aiDigestEvening.plist "$EVENING_PLIST"

# Cargar los trabajos
echo "⚙️  Registrando tareas en launchd..."
launchctl load "$MORNING_PLIST"
launchctl load "$EVENING_PLIST"

echo ""
echo "✅ ¡Instalación completada!"
echo "=================================================="
echo ""
echo "📅 Tareas programadas:"
echo "  🌅 5:00 AM - AI Digest búsqueda y envío a Telegram"
echo "  🌆 5:00 PM - AI Digest búsqueda y envío a Telegram"
echo ""
echo "📊 Ver estado:"
echo "  launchctl list | grep com.enzo"
echo ""
echo "🔍 Ver logs:"
echo "  tail -f /var/log/ai_digest_morning.log"
echo "  tail -f /var/log/ai_digest_evening.log"
echo ""
echo "❌ Para desinstalar después:"
echo "  launchctl unload ~/Library/LaunchAgents/com.enzo.aiDigestMorning.plist"
echo "  launchctl unload ~/Library/LaunchAgents/com.enzo.aiDigestEvening.plist"
echo ""
