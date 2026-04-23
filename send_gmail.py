#!/usr/bin/env python3
"""
send_gmail.py — Envía emails via Gmail API usando OAuth2 refresh token.
Uso: python3 send_gmail.py --to EMAIL --subject "Asunto" --html "<h1>Cuerpo</h1>"
"""

import argparse, base64, json, sys
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText
import urllib.request, urllib.parse

TOKEN_FILE = "/sessions/sweet-adoring-cannon/mnt/Nuevo dia/.gmail_token.json"

def get_access_token(token_data):
    params = urllib.parse.urlencode({
        "client_id": token_data["client_id"],
        "client_secret": token_data["client_secret"],
        "refresh_token": token_data["refresh_token"],
        "grant_type": "refresh_token"
    }).encode()
    req = urllib.request.Request("https://oauth2.googleapis.com/token", data=params, method="POST")
    with urllib.request.urlopen(req) as resp:
        return json.loads(resp.read())["access_token"]

def send_email(to, subject, html_body, text_body=""):
    with open(TOKEN_FILE) as f:
        token_data = json.load(f)

    access_token = get_access_token(token_data)

    msg = MIMEMultipart("alternative")
    msg["To"] = to
    msg["From"] = "vincenzozegarra@gmail.com"
    msg["Subject"] = subject
    if text_body:
        msg.attach(MIMEText(text_body, "plain"))
    msg.attach(MIMEText(html_body, "html"))

    raw = base64.urlsafe_b64encode(msg.as_bytes()).decode()
    body = json.dumps({"raw": raw}).encode()

    req = urllib.request.Request(
        "https://gmail.googleapis.com/gmail/v1/users/me/messages/send",
        data=body,
        headers={
            "Authorization": f"Bearer {access_token}",
            "Content-Type": "application/json"
        },
        method="POST"
    )
    with urllib.request.urlopen(req) as resp:
        result = json.loads(resp.read())
        print(f"✅ Email enviado. Message ID: {result.get('id')}")
        return result

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--to", required=True)
    parser.add_argument("--subject", required=True)
    parser.add_argument("--html", required=True)
    args = parser.parse_args()
    send_email(args.to, args.subject, args.html)
