#!/usr/bin/env python3
"""
AI Digest Local Server — corre en http://localhost:9090
Se inicia automáticamente al encender el Mac.
"""
import http.server
import socketserver
import os

PORT = 9090
ARTICLES_DIR = os.path.dirname(os.path.abspath(__file__))

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=ARTICLES_DIR, **kwargs)

    def translate_path(self, path):
        # Rutas limpias sin .html
        clean = {'/': '/index.html', '/papers': '/papers.html', '/big5': '/big5.html'}
        path = clean.get(path, path)
        return super().translate_path(path)

    def log_message(self, format, *args):
        pass  # silencioso

with socketserver.TCPServer(("localhost", PORT), Handler) as httpd:
    httpd.serve_forever()
