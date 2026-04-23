/**
 * Cloudflare Worker - Telegram Bot Webhook
 * Captures user Chat ID and forwards digest messages
 *
 * Deploy to: https://telegram-digest.enzo-ai.workers.dev
 * Then set webhook in Telegram: /setwebhook https://telegram-digest.enzo-ai.workers.dev
 */

const BOT_TOKEN = "8643748727:AAHH-qNVi3iiHGCq28avldtRvj3shCPHjsQ";
const API_URL = `https://api.telegram.org/bot${BOT_TOKEN}`;

// KV namespace to store user Chat IDs
const CHAT_IDS = "telegram_chat_ids";

export default {
  async fetch(request, env, ctx) {
    // Only accept POST requests
    if (request.method !== "POST") {
      return new Response(JSON.stringify({ ok: false, error: "Method not allowed" }), {
        status: 405,
      });
    }

    try {
      const update = await request.json();

      // Extract Chat ID from message
      if (update.message) {
        const chat_id = update.message.chat.id.toString();
        const user_id = update.message.from.id.toString();
        const username = update.message.from.username || "unknown";
        const first_name = update.message.from.first_name || "";

        // Store Chat ID in KV
        await env[CHAT_IDS].put(
          `user_${user_id}`,
          JSON.stringify({
            chat_id,
            user_id,
            username,
            first_name,
            timestamp: new Date().toISOString(),
          }),
          { expirationTtl: 86400 * 365 } // 1 year
        );

        // Send welcome response
        const text = update.message.text || "";

        if (text === "/start") {
          await sendMessage(
            chat_id,
            `🤖 <b>AI Digest Enzo Setup</b>\n\n✅ Tu Chat ID ha sido registrado: <code>${chat_id}</code>\n\nAhora puedo enviarte el digest diario automáticamente.`
          );
        } else if (text === "/chatid") {
          await sendMessage(chat_id, `Tu Chat ID es: <code>${chat_id}</code>`);
        } else if (text === "/help") {
          await sendMessage(
            chat_id,
            `<b>Comandos disponibles:</b>\n/start - Inicializar\n/chatid - Ver tu Chat ID\n/help - Esta ayuda`
          );
        }

        // Log the interaction
        console.log(`📨 Message from @${username} (${chat_id}): ${text}`);
      }

      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    } catch (error) {
      console.error("Error handling webhook:", error);
      return new Response(
        JSON.stringify({ ok: false, error: error.message }),
        { status: 500 }
      );
    }
  },

  // Endpoint to retrieve Chat ID
  async chatId(request, env) {
    const url = new URL(request.url);
    const user_id = url.searchParams.get("user_id");

    if (!user_id) {
      return new Response(
        JSON.stringify({ error: "user_id parameter required" }),
        { status: 400 }
      );
    }

    const data = await env[CHAT_IDS].get(`user_${user_id}`);
    if (!data) {
      return new Response(
        JSON.stringify({ error: "Chat ID not found. Send /start to the bot first." }),
        { status: 404 }
      );
    }

    return new Response(data, {
      headers: { "Content-Type": "application/json" },
    });
  },
};

async function sendMessage(chat_id, text) {
  try {
    const response = await fetch(`${API_URL}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id,
        text,
        parse_mode: "HTML",
      }),
    });
    return await response.json();
  } catch (error) {
    console.error("Error sending message:", error);
  }
}
