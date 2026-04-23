#!/usr/bin/env python3
"""
AI Digest Enzo - Generate & Send via Telegram
Complete workflow: Search → HTML → Telegram
"""

import requests
import json
from datetime import datetime
from pathlib import Path

# ============= CONFIG =============
TELEGRAM_BOT_TOKEN = "8639383277:AAHoipnCTWYTzB8ZFS7hoVBROlqwU6qLRYc"
TELEGRAM_CHAT_ID = "6414365556"
TELEGRAM_API = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}"

# ============= HTML TEMPLATE =============
def generate_digest_html(news_items):
    """Generate Apple-light minimalista HTML digest"""

    items_html = ""
    colors = ["strip-blue", "strip-green", "strip-purple", "strip-orange", "strip-red", "strip-teal"]

    for idx, item in enumerate(news_items):
        color = colors[idx % len(colors)]
        items_html += f"""
    <div class="card {color}">
        <div class="card-header">
            <span class="pill {color}">{item['category']}</span>
            <span class="card-date">{item['date']}</span>
        </div>
        <h3>{item['title']}</h3>
        <p class="card-desc">{item['description']}</p>
        <a href="{item['link']}" class="card-link">Read More →</a>
    </div>
"""

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AI Digest - {datetime.now().strftime('%B %d, %Y')}</title>
    <style>
        :root {{
            --bg: #F2F2F7;
            --card: #FFFFFF;
            --text: #000000;
            --gray: #6E6E73;
            --strip-blue: #007AFF;
            --strip-green: #34C759;
            --strip-purple: #AF52DE;
            --strip-orange: #FF9500;
            --strip-red: #FF3B30;
            --strip-teal: #00C7BE;
        }}

        * {{ margin: 0; padding: 0; box-sizing: border-box; }}

        body {{
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: var(--bg);
            color: var(--text);
            padding: 32px 20px;
        }}

        .container {{ max-width: 800px; margin: 0 auto; }}

        .hero {{
            background: linear-gradient(145deg, #E8F2FF 0%, #EFF5FF 45%, #F2F2F7 100%);
            border-radius: 20px;
            padding: 48px 32px;
            margin-bottom: 40px;
            text-align: center;
        }}

        .hero-eyebrow {{
            font-size: 13px;
            font-weight: 600;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: var(--gray);
            margin-bottom: 12px;
        }}

        .hero h1 {{
            font-size: 56px;
            font-weight: 800;
            margin-bottom: 8px;
            line-height: 1.2;
        }}

        .hero p {{
            font-size: 16px;
            color: var(--gray);
            margin-bottom: 24px;
        }}

        .hero-meta {{
            font-size: 13px;
            color: var(--gray);
        }}

        .section-title {{
            font-size: 30px;
            font-weight: 700;
            margin-bottom: 24px;
            margin-top: 40px;
        }}

        .grid {{
            display: grid;
            grid-template-columns: 1fr;
            gap: 16px;
        }}

        .card {{
            background: var(--card);
            border-radius: 12px;
            padding: 24px;
            border-left: 4px solid transparent;
            box-shadow: 0 2px 8px rgba(0,0,0,.07), 0 12px 32px rgba(0,0,0,.09);
            transition: transform 0.2s;
        }}

        .card.strip-blue {{ border-left-color: var(--strip-blue); }}
        .card.strip-green {{ border-left-color: var(--strip-green); }}
        .card.strip-purple {{ border-left-color: var(--strip-purple); }}
        .card.strip-orange {{ border-left-color: var(--strip-orange); }}
        .card.strip-red {{ border-left-color: var(--strip-red); }}
        .card.strip-teal {{ border-left-color: var(--strip-teal); }}

        .card:hover {{ transform: translateY(-2px); }}

        .card-header {{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 12px;
        }}

        .pill {{
            font-size: 11px;
            font-weight: 600;
            padding: 6px 12px;
            border-radius: 20px;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            color: white;
        }}

        .pill.strip-blue {{ background: rgba(0, 122, 255, 0.15); color: var(--strip-blue); }}
        .pill.strip-green {{ background: rgba(52, 199, 89, 0.15); color: var(--strip-green); }}
        .pill.strip-purple {{ background: rgba(175, 82, 222, 0.15); color: var(--strip-purple); }}
        .pill.strip-orange {{ background: rgba(255, 149, 0, 0.15); color: var(--strip-orange); }}
        .pill.strip-red {{ background: rgba(255, 59, 48, 0.15); color: var(--strip-red); }}
        .pill.strip-teal {{ background: rgba(0, 199, 190, 0.15); color: var(--strip-teal); }}

        .card-date {{
            font-size: 12px;
            color: var(--gray);
        }}

        .card h3 {{
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 12px;
            line-height: 1.3;
        }}

        .card-desc {{
            font-size: 14px;
            color: var(--gray);
            margin-bottom: 16px;
            line-height: 1.6;
        }}

        .card-link {{
            display: inline-block;
            font-size: 13px;
            font-weight: 600;
            color: var(--strip-blue);
            text-decoration: none;
            padding: 6px 14px;
            border-radius: 20px;
            background: rgba(0, 122, 255, 0.1);
            transition: all 0.2s;
        }}

        .card-link:hover {{
            background: rgba(0, 122, 255, 0.2);
        }}

        .footer {{
            text-align: center;
            margin-top: 60px;
            padding-top: 24px;
            border-top: 1px solid rgba(0,0,0,.1);
            font-size: 12px;
            color: var(--gray);
        }}

        @media (prefers-color-scheme: dark) {{
            :root {{
                --bg: #000000;
                --card: #1C1C1E;
                --text: #FFFFFF;
                --gray: #8E8E93;
            }}
        }}
    </style>
</head>
<body>
    <div class="container">
        <div class="hero">
            <div class="hero-eyebrow">Latest AI News & Research</div>
            <h1>AI Digest</h1>
            <p>Today's most important developments in AI</p>
            <div class="hero-meta">{datetime.now().strftime('%B %d, %Y at %H:%M UTC')}</div>
        </div>

        <div class="section-title">Today's Updates</div>
        <div class="grid">
            {items_html}
        </div>

        <div class="footer">
            <p>🤖 AI Digest Enzo • Generated daily via Telegram</p>
            <p>Follow @aiDigestEnzo2_bot on Telegram</p>
        </div>
    </div>
</body>
</html>"""

    return html


def send_to_telegram(html_content, title="📊 AI Digest"):
    """Send digest to Telegram"""

    try:
        # Save HTML temporarily
        html_file = Path("/tmp/digest_telegram.html")
        html_file.write_text(html_content)

        # Send text notification
        message = f"<b>{title}</b>\n{datetime.now().strftime('%Y-%m-%d %H:%M UTC')}\n\n✅ Ver el digest en el documento adjunto."

        text_payload = {
            "chat_id": TELEGRAM_CHAT_ID,
            "text": message,
            "parse_mode": "HTML",
        }

        text_response = requests.post(
            f"{TELEGRAM_API}/sendMessage",
            json=text_payload,
            timeout=10
        )

        if text_response.status_code == 200:
            print(f"✅ Notificación enviada a Telegram")
        else:
            print(f"⚠️  Error enviando notificación: {text_response.text}")

        # Send HTML as document
        with open(html_file, "rb") as f:
            files = {"document": f}
            doc_payload = {
                "chat_id": TELEGRAM_CHAT_ID,
                "caption": f"<b>{title}</b>\n{datetime.now().strftime('%Y-%m-%d')}",
                "parse_mode": "HTML",
            }

            doc_response = requests.post(
                f"{TELEGRAM_API}/sendDocument",
                data=doc_payload,
                files=files,
                timeout=10
            )

            if doc_response.status_code == 200:
                print(f"✅ Digest HTML enviado exitosamente")
                return True
            else:
                print(f"❌ Error enviando HTML: {doc_response.text}")
                return False

    except Exception as e:
        print(f"❌ Error: {e}")
        return False


def main():
    """Main workflow"""

    print("🤖 AI Digest Enzo - Telegram Edition")
    print("=" * 50)

    # Sample news items (in real scenario, these come from WebSearch)
    sample_items = [
        {
            "category": "Models",
            "title": "OpenAI Launches GPT-4 Turbo",
            "description": "New capabilities in code generation and reasoning",
            "date": "Today",
            "link": "https://openai.com/blog/gpt-4-turbo"
        },
        {
            "category": "Research",
            "title": "Anthropic's Constitutional AI Paper",
            "description": "Novel approach to AI safety using constitutional methods",
            "date": "Yesterday",
            "link": "https://arxiv.org/abs/2212.08073"
        },
        {
            "category": "Open Source",
            "title": "Claude Code Integration Released",
            "description": "New agentic coding capabilities for developers",
            "date": "2 days ago",
            "link": "https://github.com/Doriandarko/claude-engineer"
        },
    ]

    # Generate HTML
    print("\n📝 Generando HTML...")
    html = generate_digest_html(sample_items)

    # Send via Telegram
    print("\n📤 Enviando a Telegram...")
    success = send_to_telegram(html)

    if success:
        print("\n✅ ¡Digest enviado exitosamente!")
        print(f"   Chat ID: {TELEGRAM_CHAT_ID}")
        print(f"   Revisa tu Telegram: @aiDigestEnzo2_bot")
    else:
        print("\n❌ Error enviando digest")

    return success


if __name__ == "__main__":
    exit(0 if main() else 1)
