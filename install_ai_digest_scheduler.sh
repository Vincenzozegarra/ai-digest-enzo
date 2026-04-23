#!/bin/bash
# AI Digest Enzo - Instalador de Scheduler (launchd)
# Este script instala los trabajos programados para ejecutar el digest a las 5 AM y 5 PM

set -e

PLIST_DIR="$HOME/Library/LaunchAgents"
SCRIPT_DIR="/Users/carlosvincenzozegarracespedes/Documents/Claude/Nuevo dia"

echo "🤖 AI Digest Enzo - Instalando Scheduler..."
echo "=================================================="

# Verificar que los archivos plist existen
if [ ! -f "$SCRIPT_DIR/com.enzo.aiDigestMorning.plist" ]; then
    echo "❌ Error: com.enzo.aiDigestMorning.plist no encontrado"
    exit 1
fi

if [ ! -f "$SCRIPT_DIR/com.enzo.aiDigestEvening.plist" ]; then
    echo "❌ Error: com.enzo.aiDigestEvening.plist no encontrado"
    exit 1
fi

# Crear directorio si no existe
if [ ! -d "$PLIST_DIR" ]; then
    echo "📁 Creando directorio $PLIST_DIR..."
    mkdir -p "$PLIST_DIR"
fi

# Copiar archivos plist
echo "📋 Copiando archivos de configuración..."
cp "$SCRIPT_DIR/com.enzo.aiDigestMorning.plist" "$PLIST_DIR/"
cp "$SCRIPT_DIR/com.enzo.aiDigestEvening.plist" "$PLIST_DIR/"

# Cargar launchd jobs
echo "⚙️  Registrando tareas con launchd..."
launchctl load "$PLIST_DIR/com.enzo.aiDigestMorning.plist"
launchctl load "$PLIST_DIR/com.enzo.aiDigestEvening.plist"

echo ""
echo "✅ ¡Instalación completada!"
echo "=================================================="
echo ""
echo "📅 Tareas programadas:"
echo "  🌅 5:00 AM - AI Digest búsqueda y envío"
echo "  🌆 5:00 PM - AI Digest búsqueda y envío"
echo ""
echo "📊 Ver estado de las tareas:"
echo "  launchctl list | grep com.enzo.aiDigest"
echo ""
echo "🔍 Ver logs:"
echo "  tail -f /var/log/ai_digest_morning.log"
echo "  tail -f /var/log/ai_digest_evening.log"
echo ""
echo "❌ Para desinstalar:"
echo "  launchctl unload ~/Library/LaunchAgents/com.enzo.aiDigestMorning.plist"
echo "  launchctl unload ~/Library/LaunchAgents/com.enzo.aiDigestEvening.plist"
echo ""
