# Configuración del Enviador Automático de AI Digest

## ¿Qué hace esto?
Claude crea el borrador cada día a las 9:00 AM.
Este script lo envía automáticamente 10 minutos después (9:10 AM).

## Instalación (una sola vez)

### 1. Instalar dependencias
Abre Terminal y ejecuta:
```bash
pip3 install google-auth google-auth-oauthlib google-auth-httplib2 google-api-python-client
```

### 2. Autorizar acceso a Gmail (una sola vez)
```bash
cd ~/Documents/Claude/Nuevo\ dia/gmail-sender
python3 1_setup_auth.py
```
Se abrirá el navegador → inicia sesión con vincenzozegarra@gmail.com → autoriza el acceso.

### 3. Probar envío manual
```bash
python3 2_send_draft.py
```

### 4. Configurar envío automático diario a las 9:10 AM
Ejecuta este comando en Terminal para crear la tarea automática:
```bash
(crontab -l 2>/dev/null; echo "10 9 * * * /usr/bin/python3 $HOME/Documents/Claude/Nuevo\ dia/gmail-sender/2_send_draft.py >> $HOME/Documents/Claude/Nuevo\ dia/gmail-sender/send_log.txt 2>&1") | crontab -
```

Para verificar que quedó guardado:
```bash
crontab -l
```

## Flujo completo del sistema
- **9:00 AM** → Claude busca papers y repos, crea el borrador en Gmail
- **9:10 AM** → Este script encuentra el borrador y lo envía automáticamente
- **Resultado** → El correo llega a vincenzozegarra@gmail.com sin intervención manual

## Ver el log de envíos
```bash
cat ~/Documents/Claude/Nuevo\ dia/gmail-sender/send_log.txt
```
