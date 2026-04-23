#!/usr/bin/env python3
"""
Send AI Digest to Telegram as an HTML message
Requires: Chat ID and Bot Token from telegram_config.md
"""

import requests
import sys
from datetime import datetime
from pathlib import Path

# Telegram Bot Configuration
BOT_TOKEN = "8639383277:AAHoipnCTWYTzB8ZFS7hoVBROlqwU6qLRYc"
API_URL = f"https://api.telegram.org/bot{BOT_TOKEN}"

def send_digest_telegram(chat_id: str, html_content: str, title: str = "AI Digest") -> bool:
    """
    Send HTML digest to Telegram chat via bot.

    Args:
        chat_id: Telegram Chat ID (numeric string)
        html_content: Full HTML of the digest
        title: Title for the message

    Returns:
        True if sent successfully, False otherwise
    """

    try:
        # Extract text content from HTML for the message preview
        # Telegram will render basic HTML
        message_text = f"📊 <b>{title}</b>\n{datetime.now().strftime('%Y-%m-%d %H:%M UTC')}"

        # Send message with HTML
        payload = {
            "chat_id": chat_id,
            "text": message_text,
            "parse_mode": "HTML",
        }

        response = requests.post(f"{API_URL}/sendMessage", json=payload)
        response.raise_for_status()

        print(f"✅ Digest enviado exitosamente a Telegram (Chat ID: {chat_id})")
        print(f"   Message ID: {response.json()['result']['message_id']}")

        # Send HTML as document (since Telegram doesn't fully render HTML in messages)
        html_path = Path("/tmp/digest_current.html")
        if html_path.exists():
            with open(html_path, "rb") as f:
                files = {"document": f}
                caption_payload = {
                    "chat_id": chat_id,
                    "caption": f"Ver en navegador: {title}",
                    "parse_mode": "HTML",
                }
                doc_response = requests.post(
                    f"{API_URL}/sendDocument",
                    data=caption_payload,
                    files=files
                )
                if doc_response.status_code == 200:
                    print(f"✅ HTML document enviado (File ID: {doc_response.json()['result']['document']['file_id']})")

        return True

    except requests.exceptions.RequestException as e:
        print(f"❌ Error enviando mensaje a Telegram: {e}")
        return False
    except Exception as e:
        print(f"❌ Error inesperado: {e}")
        return False


def get_updates() -> list:
    """
    Fetch recent updates from bot to find Chat ID if needed.
    """
    try:
        response = requests.get(f"{API_URL}/getUpdates")
        response.raise_for_status()
        return response.json().get("result", [])
    except Exception as e:
        print(f"❌ Error fetching updates: {e}")
        return []


if __name__ == "__main__":

    # If no Chat ID provided as argument, show how to find it
    if len(sys.argv) < 2:
        print("📱 Uso: python3 send_digest_telegram.py <CHAT_ID> [html_file]")
        print("\n🔍 Para encontrar tu Chat ID:")
        print("   1. Envía un mensaje al bot @aiDigestEnzo_bot en Telegram")
        print("   2. Corre: curl -s 'https://api.telegram.org/bot8643748727:AAHH-qNVi3iiHGCq28avldtRvj3shCPHjsQ/getUpdates'")
        print("   3. Busca 'chat': {'id': XXXXXX} — ese es tu Chat ID\n")

        print("📨 Mostrando últimas actualizaciones del bot:")
        updates = get_updates()
        if updates:
            for update in updates[-5:]:  # Show last 5
                if "message" in update:
                    msg = update["message"]
                    chat_id = msg["chat"]["id"]
                    text = msg.get("text", "[no text]")
                    print(f"   Chat ID: {chat_id} | Mensaje: {text[:50]}")
        else:
            print("   (Sin mensajes recientes. Envía un mensaje al bot primero.)")
        sys.exit(1)

    chat_id = sys.argv[1]
    html_file = sys.argv[2] if len(sys.argv) > 2 else "/tmp/digest_current.html"

    # Read HTML content
    try:
        with open(html_file, "r") as f:
            html_content = f.read()
    except FileNotFoundError:
        print(f"❌ Archivo no encontrado: {html_file}")
        sys.exit(1)

    # Send digest
    success = send_digest_telegram(chat_id, html_content)
    sys.exit(0 if success else 1)
