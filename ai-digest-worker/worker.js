/**
 * AI Digest Worker — ai-digest-enzo
 * Cron: diario 9am Lima (14:00 UTC)
 * Email via Resend API (gratis hasta 100 emails/día)
 *
 * Variables de entorno requeridas (en Cloudflare Dashboard > Worker > Settings > Variables):
 *   RESEND_API_KEY  →  tu API key de resend.com (gratis)
 *   TO_EMAIL        →  vincenzozegarra@gmail.com
 */

const SOURCES = {
  hn: 'https://hacker-news.firebaseio.com/v0/topstories.json',
  hnItem: id => `https://hacker-news.firebaseio.com/v0/item/${id}.json`,
  arxiv: 'https://export.arxiv.org/api/query?search_query=cat:cs.AI+OR+cat:cs.LG&sortBy=submittedDate&sortOrder=descending&max_results=8',
  github: 'https://api.github.com/search/repositories?q=claude+OR+aider+OR+cline+created:>2024-01-01&sort=stars&order=desc&per_page=6',
};

const FIXED_REPOS = [
  { name: 'claude-engineer',        owner: 'Doriandarko',       url: 'https://github.com/Doriandarko/claude-engineer',       desc: 'Agente autónomo de ingeniería de software con Claude.' },
  { name: 'aider',                  owner: 'Aider-AI',          url: 'https://github.com/Aider-AI/aider',                   desc: 'Pair-programming en terminal con edición directa de archivos.' },
  { name: 'open-interpreter',       owner: 'OpenInterpreter',   url: 'https://github.com/OpenInterpreter/open-interpreter',  desc: 'Ejecuta código Python, JS y Shell con lenguaje natural.' },
  { name: 'SWE-agent',              owner: 'princeton-nlp',     url: 'https://github.com/princeton-nlp/SWE-agent',           desc: 'Resuelve issues reales de GitHub de forma autónoma.' },
  { name: 'cline',                  owner: 'cline',             url: 'https://github.com/cline/cline',                       desc: 'Agente model-agnostic para VS Code con browser use.' },
  { name: 'servers (MCP)',          owner: 'modelcontextprotocol', url: 'https://github.com/modelcontextprotocol/servers',   desc: 'Servidores MCP oficiales de Anthropic.' },
];

const FIXED_PAPERS = [
  { title: 'Kimi k1.5: Scaling Reinforcement Learning with LLMs', authors: 'Moonshot AI', url: 'https://arxiv.org/abs/2501.12599', cat: 'Kimi · RL Scaling', color: 'teal' },
  { title: 'SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering', authors: 'Princeton NLP', url: 'https://arxiv.org/abs/2405.15793', cat: 'Agentes de Código', color: 'green' },
  { title: 'Mamba-2: Structured State Space Duality', authors: 'Dao & Gu', url: 'https://arxiv.org/abs/2405.21060', cat: 'Arquitectura', color: 'blue' },
  { title: 'Chain-of-Thought Prompting Elicits Reasoning in LLMs', authors: 'Google Brain', url: 'https://arxiv.org/abs/2201.11903', cat: 'Razonamiento', color: 'purple' },
];

// ─── FETCH HELPERS ────────────────────────────────────────────────────────────

async function fetchHNAIStories() {
  try {
    const ids = await fetch(SOURCES.hn).then(r => r.json());
    const top = ids.slice(0, 40);
    const items = await Promise.all(top.map(id => fetch(SOURCES.hnItem(id)).then(r => r.json()).catch(() => null)));
    return items
      .filter(i => i && i.title && /\b(AI|LLM|GPT|Claude|Gemini|llama|agent|model|anthropic|openai|deepmind|kimi)\b/i.test(i.title))
      .slice(0, 6)
      .map(i => ({ title: i.title, url: i.url || `https://news.ycombinator.com/item?id=${i.id}`, score: i.score }));
  } catch { return []; }
}

async function fetchArxivPapers() {
  try {
    const xml = await fetch(SOURCES.arxiv).then(r => r.text());
    const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].slice(0, 4);
    return entries.map(([, e]) => ({
      title:   (e.match(/<title>([\s\S]*?)<\/title>/)?.[1] || '').trim().replace(/\s+/g, ' '),
      authors: (e.match(/<name>([\s\S]*?)<\/name>/)?.[1] || '').trim(),
      url:     (e.match(/<id>([\s\S]*?)<\/id>/)?.[1] || '').trim(),
      summary: (e.match(/<summary>([\s\S]*?)<\/summary>/)?.[1] || '').trim().slice(0, 200) + '…',
    }));
  } catch { return []; }
}

// ─── HTML BUILDER ─────────────────────────────────────────────────────────────

const CSS = `
*{margin:0;padding:0;box-sizing:border-box}
body{background:#F2F2F7;font-family:-apple-system,BlinkMacSystemFont,'SF Pro Display','Helvetica Neue',Arial,sans-serif;color:#1C1C1E}
.wrap{max-width:680px;margin:0 auto;padding:32px 16px 48px}
.hero{background:linear-gradient(145deg,#E8F2FF 0%,#EFF5FF 45%,#F2F2F7 100%);border-radius:20px;padding:48px 40px 40px;margin-bottom:32px}
.eyebrow{font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:.08em;color:#6E6E73;margin-bottom:12px}
.hero h1{font-size:48px;font-weight:800;line-height:1.05;color:#1C1C1E;margin-bottom:12px}
.hero-sub{font-size:16px;color:#6E6E73;line-height:1.5}
.hero-date{display:inline-block;margin-top:16px;font-size:13px;font-weight:600;color:#3A7AFF;background:rgba(58,122,255,0.1);padding:5px 12px;border-radius:20px}
.sec{font-size:30px;font-weight:700;color:#1C1C1E;margin:36px 0 16px}
.card{background:#fff;border-radius:16px;padding:0;margin-bottom:14px;box-shadow:0 2px 8px rgba(0,0,0,.07),0 12px 32px rgba(0,0,0,.09);display:flex;overflow:hidden}
.strip{width:4px;flex-shrink:0}
.s-blue{background:#3A7AFF}.s-green{background:#30D158}.s-purple{background:#BF5AF2}
.s-orange{background:#FF9F0A}.s-red{background:#FF453A}.s-teal{background:#5AC8FA}
.card-body{flex:1;padding:22px 22px 18px}
.pill{display:inline-block;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;padding:3px 9px;border-radius:20px;margin-bottom:8px}
.p-blue{background:rgba(58,122,255,0.1);color:#3A7AFF}
.p-green{background:rgba(48,209,88,0.12);color:#248A3D}
.p-purple{background:rgba(191,90,242,0.12);color:#9A3DBF}
.p-orange{background:rgba(255,159,10,0.12);color:#C77900}
.p-red{background:rgba(255,69,58,0.12);color:#C0392B}
.p-teal{background:rgba(90,200,250,0.15);color:#1A7A9A}
.card-title{font-size:18px;font-weight:700;color:#1C1C1E;margin-bottom:6px;line-height:1.25}
.card-desc{font-size:14px;color:#6E6E73;line-height:1.55;margin-bottom:10px}
.card-link{display:inline-block;font-size:13px;font-weight:600;padding:6px 14px;border-radius:20px;text-decoration:none;background:rgba(58,122,255,0.1);color:#3A7AFF}
.card-link.teal{background:rgba(90,200,250,0.15);color:#1A7A9A}
.hn-item{background:#fff;border-radius:12px;padding:14px 18px;margin-bottom:10px;box-shadow:0 2px 8px rgba(0,0,0,.07),0 12px 32px rgba(0,0,0,.09);display:flex;align-items:flex-start;gap:12px}
.hn-score{font-size:13px;font-weight:700;color:#FF9F0A;min-width:36px}
.hn-title{font-size:15px;font-weight:600;color:#1C1C1E}
.hn-title a{color:#1C1C1E;text-decoration:none}
.footer{text-align:center;margin-top:40px;font-size:12px;color:#AEAEB2;line-height:1.6}
@media(max-width:600px){.hero{padding:32px 20px}.hero h1{font-size:36px}}
`;

function colorClass(c) {
  const map = { blue: ['s-blue','p-blue'], green: ['s-green','p-green'], purple: ['s-purple','p-purple'], orange: ['s-orange','p-orange'], red: ['s-red','p-red'], teal: ['s-teal','p-teal'] };
  return map[c] || map.blue;
}

function buildHTML({ date, hnStories, arxivPapers }) {
  const colors = ['blue','green','purple','orange','teal','red'];

  const repoCards = FIXED_REPOS.map((r, i) => {
    const [s, p] = colorClass(colors[i % colors.length]);
    return `<div class="card"><div class="strip ${s}"></div><div class="card-body">
      <span class="pill ${p}">GitHub</span>
      <div class="card-title">${r.name}</div>
      <div class="card-desc">${r.desc}</div>
      <a class="card-link" href="${r.url}">Ver repo →</a>
    </div></div>`;
  }).join('');

  const paperCards = [...FIXED_PAPERS, ...arxivPapers.map(p => ({
    title: p.title, authors: p.authors, url: p.url, cat: 'arXiv · IA', color: 'purple'
  }))].map((p, i) => {
    const [s, pil] = colorClass(p.color || colors[i % colors.length]);
    return `<div class="card"><div class="strip ${s}"></div><div class="card-body">
      <span class="pill ${pil}">${p.cat}</span>
      <div class="card-title">${p.title}</div>
      <div class="card-desc">${p.authors}${p.summary ? ' — ' + p.summary : ''}</div>
      <a class="card-link${p.color==='teal'?' teal':''}" href="${p.url}">Leer paper →</a>
    </div></div>`;
  }).join('');

  const hnItems = hnStories.length ? hnStories.map(s => `
    <div class="hn-item">
      <span class="hn-score">▲${s.score||'?'}</span>
      <div class="hn-title"><a href="${s.url}">${s.title}</a></div>
    </div>`).join('') : '<p style="color:#6E6E73;font-size:14px">Sin noticias destacadas hoy.</p>';

  return `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>AI Digest — ${date}</title>
<style>${CSS}</style></head><body>
<div class="wrap">
  <div class="hero">
    <div class="eyebrow">Digest de Inteligencia Artificial</div>
    <h1>Lo mejor de<br>la IA hoy</h1>
    <p class="hero-sub">Google · Meta · OpenAI · Anthropic · xAI · Kimi — Papers, modelos y proyectos</p>
    <span class="hero-date">${date}</span>
  </div>

  <div class="sec">🔥 Hacker News — IA Trending</div>
  ${hnItems}

  <div class="sec">📄 Papers Destacados</div>
  ${paperCards}

  <div class="sec">⚙️ GitHub — Claude Code Ecosystem</div>
  ${repoCards}

  <div class="footer">
    <p>🤖 AI Digest — generado automáticamente cada mañana</p>
    <p style="margin-top:4px">Cloudflare Worker · ai-digest-enzo · ${date}</p>
  </div>
</div></body></html>`;
}

// ─── EMAIL VIA RESEND ─────────────────────────────────────────────────────────

async function sendEmail(env, subject, html) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'AI Digest <digest@resend.dev>',
      to: [env.TO_EMAIL || 'vincenzozegarra@gmail.com'],
      subject,
      html,
    }),
  });
  if (!res.ok) throw new Error(`Resend error ${res.status}: ${await res.text()}`);
  return res.json();
}

// ─── MAIN HANDLER ─────────────────────────────────────────────────────────────

async function runDigest(env) {
  const now = new Date();
  const date = now.toLocaleDateString('es-PE', { weekday:'long', year:'numeric', month:'long', day:'numeric', timeZone:'America/Lima' });
  const dateShort = now.toLocaleDateString('es-PE', { day:'2-digit', month:'long', year:'numeric' });

  const [hnStories, arxivPapers] = await Promise.all([fetchHNAIStories(), fetchArxivPapers()]);
  const html = buildHTML({ date: dateShort, hnStories, arxivPapers });
  await sendEmail(env, `🧠 AI Digest — ${dateShort}`, html);
  return { ok: true, date: dateShort, hn: hnStories.length, arxiv: arxivPapers.length };
}

export default {
  // Trigger manual via GET /run?secret=TU_SECRET
  async fetch(req, env) {
    const url = new URL(req.url);
    if (url.pathname === '/run' && url.searchParams.get('secret') === (env.SECRET || 'digest2026')) {
      try {
        const result = await runDigest(env);
        return new Response(JSON.stringify(result), { headers: { 'Content-Type': 'application/json' } });
      } catch (e) {
        return new Response(JSON.stringify({ ok: false, error: e.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
      }
    }
    return new Response('AI Digest Worker · activo ✅', { headers: { 'Content-Type': 'text/plain' } });
  },

  // Cron automático: 9am Lima = 14:00 UTC
  async scheduled(event, env, ctx) {
    ctx.waitUntil(runDigest(env));
  },
};
