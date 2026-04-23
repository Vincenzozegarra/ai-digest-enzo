#!/usr/bin/env python3
"""
PASO 2 — Enviar el borrador más reciente de AI Digest
Se ejecuta automáticamente cada día después de que Claude crea el borrador.
"""

import os
import sys
from google.oauth2.credentials import Credentials
from google.auth.transport.requests import Request
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from datetime import datetime

SCOPES = ['https://www.googleapis.com/auth/gmail.send',
          'https://www.googleapis.com/auth/gmail.readonly']

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
TOKEN_FILE = os.path.join(SCRIPT_DIR, 'token.json')
LOG_FILE = os.path.join(SCRIPT_DIR, 'send_log.txt')

SUBJECT_KEYWORDS = ['AI Digest', 'Resumen Diario IA', 'Resumen Semanal IA', '🧠', '🤖']

def log(msg):
    timestamp = datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    line = f"[{timestamp}] {msg}"
    print(line)
    with open(LOG_FILE, 'a') as f:
        f.write(line + '\n')

def get_credentials():
    if not os.path.exists(TOKEN_FILE):
        log("❌ ERROR: No se encontró token.json. Ejecuta primero 1_setup_auth.py")
        sys.exit(1)

    creds = Credentials.from_authorized_user_file(TOKEN_FILE, SCOPES)

    if not creds.valid:
        if creds.expired and creds.refresh_token:
            creds.refresh(Request())
            with open(TOKEN_FILE, 'w') as token:
                token.write(creds.to_json())
        else:
            log("❌ ERROR: Token inválido. Ejecuta nuevamente 1_setup_auth.py")
            sys.exit(1)

    return creds

def find_ai_digest_draft(service):
    """Busca el borrador más reciente de AI Digest."""
    result = service.users().drafts().list(userId='me', maxResults=20).execute()
    drafts = result.get('drafts', [])

    if not drafts:
        log("⚠️  No hay borradores en Gmail.")
        return None

    for draft in drafts:
        draft_detail = service.users().drafts().get(
            userId='me', id=draft['id'], format='metadata'
        ).execute()

        headers = draft_detail.get('message', {}).get('payload', {}).get('headers', [])
        subject = next((h['value'] for h in headers if h['name'] == 'Subject'), '')

        if any(kw in subject for kw in SUBJECT_KEYWORDS):
            log(f"📧 Borrador encontrado: {subject}")
            return draft['id']

    log("⚠️  No se encontró borrador de AI Digest. Verifica que Claude haya creado el borrador.")
    return None

def send_draft(service, draft_id):
    """Envía el borrador."""
    result = service.users().drafts().send(
        userId='me',
        body={'id': draft_id}
    ).execute()
    return result

def main():
    log("🚀 Iniciando envío de AI Digest...")

    creds = get_credentials()
    service = build('gmail', 'v1', credentials=creds)

    draft_id = find_ai_digest_draft(service)

    if not draft_id:
        log("❌ No se pudo enviar: no se encontró el borrador.")
        sys.exit(1)

    try:
        result = send_draft(service, draft_id)
        log(f"✅ Correo enviado exitosamente. Message ID: {result.get('id')}")
    except HttpError as e:
        log(f"❌ Error al enviar: {e}")
        sys.exit(1)

if __name__ == '__main__':
    main()
