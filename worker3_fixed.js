const CSS=`
*{margin:0;padding:0;box-sizing:border-box}
:root{
  --bg:#F2F2F7;--card:#fff;--text:#1D1D1F;--sub:#6E6E73;
  --acc:#0071E3;--border:rgba(0,0,0,.06);
  --shadow:0 2px 8px rgba(0,0,0,.07),0 12px 32px rgba(0,0,0,.09);
  --font:-apple-system,BlinkMacSystemFont,'SF Pro Display','Segoe UI',system-ui,sans-serif;
}
body{background:var(--bg);font-family:var(--font);color:var(--text);-webkit-font-smoothing:antialiased}
a{text-decoration:none;color:inherit}

nav{
  position:sticky;top:0;z-index:100;
  background:rgba(242,242,247,.88);
  backdrop-filter:saturate(180%) blur(20px);
  -webkit-backdrop-filter:saturate(180%) blur(20px);
  border-bottom:1px solid var(--border);
}
.nav-in{max-width:960px;margin:0 auto;height:52px;display:flex;align-items:center;justify-content:space-between;padding:0 24px}
.nav-logo{font-size:15px;font-weight:700;color:var(--text)}
.nav-links{display:flex;gap:6px}
.nav-links a{font-size:13px;font-weight:500;color:var(--sub);padding:5px 12px;border-radius:980px;transition:all .15s}
.nav-links a:hover{color:var(--text);background:rgba(0,0,0,.06)}

.wrap{max-width:960px;margin:0 auto;padding:48px 24px 80px}

.hero{
  background:linear-gradient(145deg,#E8F2FF 0%,#EFF5FF 45%,#F2F2F7 100%);
  border-radius:24px;padding:64px 56px;margin-bottom:48px;
  border:1px solid rgba(0,113,227,.1);
  box-shadow:0 1px 0 rgba(255,255,255,.9) inset;
}
.eyebrow{display:block;font-size:12px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:var(--acc);margin-bottom:16px}
.hero h1{font-size:56px;font-weight:800;letter-spacing:-.035em;line-height:1.03;margin-bottom:16px}
.hero h1 em{font-style:normal;color:var(--acc)}
.hero-sub{font-size:17px;color:var(--sub);line-height:1.55;max-width:500px}
.hero-btns{margin-top:32px;display:flex;gap:10px;flex-wrap:wrap}
.btn{display:inline-flex;align-items:center;gap:6px;padding:12px 24px;border-radius:980px;font-size:15px;font-weight:500;transition:opacity .15s;cursor:pointer}
.btn:hover{opacity:.83}
.btn-primary{background:var(--acc);color:#fff}
.btn-ghost{background:rgba(0,0,0,.07);color:var(--text)}
.btn-kimi{background:#0D9488;color:#fff}

.section{margin-bottom:56px}
.sec-head{margin-bottom:24px}
.sec-title{font-size:30px;font-weight:700;letter-spacing:-.025em;color:var(--text);line-height:1.1}
.sec-sub{font-size:15px;color:var(--sub);margin-top:6px}

.card{
  background:var(--card);border-radius:18px;
  box-shadow:var(--shadow);margin-bottom:14px;
  border:1px solid rgba(0,0,0,.05);
  display:flex;overflow:hidden;
}
.card-strip{width:4px;flex-shrink:0}
.card-inner{padding:22px 24px;flex:1}
.card-pill{display:inline-block;font-size:11px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;padding:3px 11px;border-radius:20px;margin-bottom:12px}
.pill-blue{background:#DBEAFE;color:#1D4ED8}
.pill-green{background:#DCFCE7;color:#15803D}
.pill-purple{background:#EDE9FE;color:#6D28D9}
.pill-orange{background:#FEF3C7;color:#B45309}
.pill-red{background:#FEE2E2;color:#B91C1C}
.pill-teal{background:#CCFBF1;color:#0F766E}
.strip-blue{background:#0071E3}
.strip-green{background:#16A34A}
.strip-purple{background:#7C3AED}
.strip-orange{background:#D97706}
.strip-red{background:#DC2626}
.strip-teal{background:#0D9488}

.card-title{font-size:20px;font-weight:700;color:var(--text);line-height:1.25;margin-bottom:8px}
.card-desc{font-size:14px;color:var(--sub);line-height:1.68;margin-bottom:14px}
.card-link{
  display:inline-flex;align-items:center;gap:5px;
  font-size:13px;font-weight:600;color:var(--acc);
  background:#EBF3FF;padding:6px 14px;border-radius:980px;
  transition:background .15s;
}
.card-link:hover{background:#DBEAFE}
.card-link-teal{color:#0D9488;background:#CCFBF1}
.card-link-teal:hover{background:#99F6E4}

.gh-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:14px}
.gh-card{
  background:var(--card);border-radius:16px;padding:20px;
  box-shadow:var(--shadow);border:1px solid rgba(0,0,0,.05);
  display:flex;flex-direction:column;
}
.gh-top{display:flex;align-items:center;gap:12px;margin-bottom:8px}
.gh-ico{width:38px;height:38px;background:#1D1D1F;border-radius:9px;display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0}
.gh-name{font-size:16px;font-weight:700;color:var(--text)}
.gh-owner{font-size:11px;color:var(--sub);margin-top:1px}
.gh-desc{font-size:13px;color:var(--sub);line-height:1.5;flex:1;margin-bottom:14px}
.gh-foot{display:flex;align-items:center;justify-content:space-between}
.gh-stars{font-size:13px;color:#B45309;font-weight:600}
.gh-btn{font-size:12px;font-weight:600;color:var(--acc);background:#EBF3FF;padding:6px 14px;border-radius:980px;transition:background .15s}
.gh-btn:hover{background:#DBEAFE}

.tab-bar{display:flex;gap:8px;flex-wrap:wrap;margin-bottom:20px}
.tab{
  padding:8px 18px;border-radius:980px;border:none;cursor:pointer;
  font-size:14px;font-weight:500;color:var(--sub);background:rgba(0,0,0,.06);
  font-family:var(--font);transition:all .2s;
}
.tab:hover{background:rgba(0,0,0,.1);color:var(--text)}
.tab.on{background:var(--acc);color:#fff}
.panel{display:none}
.panel.on{display:block}
.co-head{
  display:flex;align-items:center;gap:16px;
  margin-bottom:20px;padding:20px;
  background:linear-gradient(135deg,#F8FBFF,#fff);
  border-radius:14px;border:1px solid rgba(0,0,0,.06);
}
.co-emo{font-size:38px;line-height:1}
.co-name{font-size:22px;font-weight:700;color:var(--text);letter-spacing:-.02em}
.co-sub{font-size:13px;color:var(--sub);margin-top:3px}
.news-row{display:flex;align-items:flex-start;gap:14px;padding:14px 0;border-bottom:1px solid rgba(0,0,0,.05)}
.news-row:last-child{border-bottom:none}
.news-t{font-size:16px;font-weight:600;color:var(--text);margin-bottom:5px;line-height:1.3}
.news-d{font-size:13px;color:var(--sub);line-height:1.6}

.index-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(270px,1fr));gap:16px;margin-bottom:48px}
.ix-card{
  background:var(--card);border-radius:20px;padding:28px;
  box-shadow:var(--shadow);border:1px solid rgba(0,0,0,.05);
}
.ix-ico{font-size:34px;margin-bottom:16px}
.ix-title{font-size:22px;font-weight:700;letter-spacing:-.02em;margin-bottom:6px}
.ix-sub{font-size:14px;color:var(--sub);line-height:1.55;margin-bottom:20px}

.kimi-banner{
  background:linear-gradient(145deg,#F0FDF9 0%,#ECFDF5 50%,#F2F2F7 100%);
  border-radius:18px;padding:28px 32px;margin-bottom:14px;
  border:1px solid rgba(13,148,136,.15);
  display:flex;align-items:center;gap:20px;
}
.kimi-banner .k-ico{font-size:44px}
.kimi-banner h2{font-size:24px;font-weight:700;letter-spacing:-.02em;color:#0F766E}
.kimi-banner p{font-size:14px;color:var(--sub);margin-top:4px;line-height:1.5}

footer{text-align:center;padding:40px 0 0;color:var(--sub);font-size:13px;line-height:1.7;border-top:1px solid var(--border);margin-top:40px}
footer a{color:var(--acc)}

@media(max-width:640px){
  .hero{padding:40px 24px}.hero h1{font-size:38px}
  .wrap{padding:32px 16px 60px}
  .gh-grid,.index-grid{grid-template-columns:1fr}
  .kimi-banner{flex-direction:column;text-align:center}
}`;

export default{async fetch(req){
  const p=new URL(req.url).pathname,h={'Content-Type':'text/html;charset=UTF-8'};
  if(p==='/papers')return new Response(papersPage(),{headers:h});
  if(p==='/big5')return new Response(big5Page(),{headers:h});
  if(p==='/kimi')return new Response(kimiPage(),{headers:h});
  return new Response(indexPage(),{headers:h});
}};

function base(title,content){
  return`<!DOCTYPE html><html lang="es"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title} — Digest IA</title>
<style>${CSS}</style>
</head><body>
<nav><div class="nav-in">
  <a class="nav-logo" href="/">🤖 Digest IA</a>
  <div class="nav-links">
    <a href="/papers">Papers</a>
    <a href="/big5">Big 5</a>
    <a href="/kimi">Kimi</a>
  </div>
</div></nav>
<div class="wrap">${content}</div>
<footer>
  <p>Generado automáticamente · <a href="https://ai-digest-enzo.enzo-ai.workers.dev">ai-digest-enzo.enzo-ai.workers.dev</a><br>
  Lunes 20 de Abril, 2026 · Powered by Claude</p>
</footer>
</body></html>`;
}

function indexPage(){
  return base('Inicio',`
<div class="hero">
  <span class="eyebrow">🤖 IA · Abril 2026</span>
  <h1>Tu radar de<br><em>Inteligencia Artificial</em></h1>
  <p class="hero-sub">Papers recientes, novedades del Big 5, proyectos GitHub y seguimiento especial de Kimi — todo en un solo lugar.</p>
  <div class="hero-btns">
    <a class="btn btn-primary" href="/papers">📄 Ver Papers</a>
    <a class="btn btn-ghost" href="/big5">🏢 Big 5</a>
    <a class="btn btn-kimi" href="/kimi">🌙 Kimi</a>
  </div>
</div>

<div class="index-grid">
  <div class="ix-card">
    <div class="ix-ico">📄</div>
    <div class="ix-title">Papers</div>
    <p class="ix-sub">Los papers más influyentes de las últimas semanas: arquitecturas, razonamiento, agentes y visión computacional.</p>
    <a class="btn btn-primary" href="/papers">Ver papers →</a>
  </div>
  <div class="ix-card">
    <div class="ix-ico">🏢</div>
    <div class="ix-title">Big 5</div>
    <p class="ix-sub">Todos los movimientos de Google, Meta, OpenAI, Anthropic y xAI — modelos, herramientas e infraestructura.</p>
    <a class="btn btn-ghost" href="/big5">Ver Big 5 →</a>
  </div>
  <div class="ix-card" style="border:1px solid rgba(13,148,136,.2);background:linear-gradient(145deg,#F0FDF9,#fff)">
    <div class="ix-ico">🌙</div>
    <div class="ix-title" style="color:#0F766E">Kimi · Moonshot AI</div>
    <p class="ix-sub">Seguimiento especial al LLM chino con contexto de 1M tokens que compite con los mejores del mundo.</p>
    <a class="btn btn-kimi" href="/kimi">Ver Kimi →</a>
  </div>
</div>

<div class="section">
  <div class="sec-head">
    <div class="sec-title">⭐ GitHub · Claude Code Trending</div>
    <p class="sec-sub">Los proyectos más descargados esta semana para extender Claude</p>
  </div>
  <div class="gh-grid">
    ${githubCards()}
  </div>
</div>
`);
}

function githubCards(){
  const repos=[
    {ico:'🤖',name:'claude-engineer',owner:'Doriandarko',desc:'Agente de ingeniería de software autónomo. Escribe, lee y ejecuta código por sí solo usando Claude.',stars:'★ 8.2k',url:'https://github.com/Doriandarko/claude-engineer'},
    {ico:'💻',name:'aider',owner:'Aider-AI',desc:'Programación en pareja con IA desde tu terminal. Edita archivos reales con contexto git completo.',stars:'★ 21k',url:'https://github.com/Aider-AI/aider'},
    {ico:'🐍',name:'open-interpreter',owner:'OpenInterpreter',desc:'Ejecuta código Python, JS, Shell con lenguaje natural en tu máquina local sin restricciones.',stars:'★ 52k',url:'https://github.com/OpenInterpreter/open-interpreter'},
    {ico:'🔧',name:'SWE-agent',owner:'princeton-nlp',desc:'Resuelve issues reales de GitHub de forma autónoma. 12.5% en SWE-bench sin intervención humana.',stars:'★ 13k',url:'https://github.com/princeton-nlp/SWE-agent'},
    {ico:'🧩',name:'cline',owner:'cline',desc:'Extensión VS Code con agente Claude autónomo. Crea y edita archivos, ejecuta comandos, navega.',stars:'★ 18k',url:'https://github.com/cline/cline'},
    {ico:'🔌',name:'servers (MCP)',owner:'modelcontextprotocol',desc:'Colección oficial de servidores Model Context Protocol de Anthropic para integrar Claude con todo.',stars:'★ 9.4k',url:'https://github.com/modelcontextprotocol/servers'},
  ];
  return repos.map(r=>`
<div class="gh-card">
  <div class="gh-top">
    <div class="gh-ico">${r.ico}</div>
    <div><div class="gh-name">${r.name}</div><div class="gh-owner">${r.owner}</div></div>
  </div>
  <p class="gh-desc">${r.desc}</p>
  <div class="gh-foot">
    <span class="gh-stars">${r.stars}</span>
    <a class="gh-btn" href="${r.url}" target="_blank">Ver repo →</a>
  </div>
</div>`).join('');
}

function papersPage(){
  const papers=[
    {
      strip:'strip-blue',pill:'pill-blue',cat:'Arquitectura',
      title:'Mamba-2: Modelos de Espacio de Estado a Escala',
      desc:'Mamba-2 reformula los SSM mediante Atención de Cabeza Única Estructurada (SSD), logrando 2–8× más velocidad que Mamba original. Logra paridad con Transformers en benchmarks de lenguaje a escala de hasta 1.3B de parámetros, con mayor eficiencia en secuencias largas.',
      url:'https://arxiv.org/abs/2405.21060',
      authors:'Dao & Gu — Princeton / Together AI · 2024',
      link_class:'card-link'
    },
    {
      strip:'strip-purple',pill:'pill-purple',cat:'Razonamiento',
      title:'Chain-of-Thought Prompting Elicits Reasoning in LLMs',
      desc:'Demuestra que proporcionar cadenas de pensamiento intermedias en few-shot mejora dramáticamente el razonamiento en modelos grandes. Con PaLM 540B logra saltos de hasta 4× en benchmarks matemáticos (GSM8K: 17% → 58%) y de razonamiento simbólico sin fine-tuning adicional.',
      url:'https://arxiv.org/abs/2201.11903',
      authors:'Wei et al. — Google Brain · 2022',
      link_class:'card-link'
    },
    {
      strip:'strip-green',pill:'pill-green',cat:'Agentes de Código',
      title:'SWE-agent: Agent-Computer Interfaces Enable Automated Software Engineering',
      desc:'SWE-agent usa GPT-4 / Claude para resolver bugs reales de GitHub de forma autónoma mediante una interfaz ACI (Agent-Computer Interface) diseñada para navegación de código. Logra 12.47% en SWE-bench sin intervención humana, superando todos los enfoques anteriores.',
      url:'https://arxiv.org/abs/2405.15793',
      authors:'Yang et al. — Princeton NLP · 2024',
      link_class:'card-link'
    },
    {
      strip:'strip-teal',pill:'pill-teal',cat:'Kimi · Moonshot AI',
      title:'Kimi k1.5: Scaling Reinforcement Learning with LLMs',
      desc:'Kimi k1.5 es el primer modelo de Moonshot AI entrenado con RL a gran escala. Introduce Long Context Scaling (hasta 128K tokens en RL) y Policy Optimization sin criticismo. Supera a GPT-4o y Claude Sonnet 3.5 en AIME, MathBench y LiveCodeBench con un modelo 2× más pequeño.',
      url:'https://arxiv.org/abs/2501.12599',
      authors:'Moonshot AI Team · Enero 2025',
      link_class:'card-link card-link-teal'
    },
    {
      strip:'strip-orange',pill:'pill-orange',cat:'Visión Computacional',
      title:'SAM 3: Segment Anything para Video y Nubes de Puntos 3D',
      desc:'La tercera iteración de SAM extiende la segmentación zero-shot a video en tiempo real (30fps en móviles de gama alta) y nubes de puntos 3D. Elimina la necesidad de fine-tuning para dominios nuevos. Modelo base disponible bajo licencia CC-BY-NC para investigación.',
      url:'https://ai.meta.com/blog/segment-anything-3/',
      authors:'Meta FAIR · 2025',
      link_class:'card-link'
    },
  ];

  const cards=papers.map(p=>`
<div class="card">
  <div class="card-strip ${p.strip}"></div>
  <div class="card-inner">
    <span class="card-pill ${p.pill}">${p.cat}</span>
    <div class="card-title">${p.title}</div>
    <div class="card-desc">${p.desc}</div>
    <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px">
      <span style="font-size:12px;color:var(--sub)">${p.authors}</span>
      <a class="${p.link_class}" href="${p.url}" target="_blank">Leer paper →</a>
    </div>
  </div>
</div>`).join('');

  return base('Papers',`
<div class="hero">
  <span class="eyebrow">📄 Research · Abril 2026</span>
  <h1>Papers<br><em>Seleccionados</em></h1>
  <p class="hero-sub">Los trabajos de investigación más relevantes en arquitecturas, razonamiento, agentes y visión computacional.</p>
</div>
<div class="section">${cards}</div>
`);
}

function big5Page(){
  const cos={
    google:{
      emo:'🔵',name:'Google DeepMind',sub:'Mountain View · Alphabet Inc.',
      news:[
        {strip:'strip-blue',pill:'pill-blue',cat:'Modelo',t:'Gemini 2.5 Pro: Top-1 simultáneo en MMLU, GPQA y HumanEval',d:'Primer modelo en alcanzar el primer lugar en los tres benchmarks principales al mismo tiempo. Contexto de 2M tokens con comprensión multimodal nativa. Disponible en AI Studio con pricing por token 40% menor que la versión anterior.'},
        {strip:'strip-green',pill:'pill-green',cat:'Infraestructura',t:'TPU v6 "Trillium": 4× más FLOPs por Dólar que TPU v5',d:'La nueva generación de TPUs de Google ofrece 4× más potencia de cómputo por dólar. Permite entrenar modelos de 1 billón de parámetros en días en lugar de meses. Disponible en Google Cloud a partir de Q2 2026.'},
      ]
    },
    meta:{
      emo:'🟣',name:'Meta AI Research',sub:'Menlo Park · Meta Platforms Inc.',
      news:[
        {strip:'strip-green',pill:'pill-green',cat:'Open Source',t:'Llama 4 Scout (17B MoE) con Contexto de 10M Tokens',d:'Llama 4 Scout usa arquitectura Mixture of Experts con 17B parámetros activos de 109B totales. El contexto de 10 millones de tokens permite procesar libros enteros, codebases completos o videos largos de una sola vez.'},
        {strip:'strip-blue',pill:'pill-blue',cat:'Producto',t:'Meta AI en WhatsApp con Generación de Imágenes en Tiempo Real',d:'Meta AI llega a WhatsApp con generación de imágenes en tiempo real basada en conversación. El rollout incluye Latinoamérica con soporte completo en español, accesible para todos los usuarios sin costo adicional.'},
        {strip:'strip-purple',pill:'pill-purple',cat:'Research',t:'Segment Anything Model 3 (SAM3): Video y Nubes de Puntos 3D',d:'SAM3 extiende la segmentación a video en tiempo real (30fps en móviles de gama alta) y a nubes de puntos 3D. Zero-shot en video sin necesidad de fine-tuning. Modelo base disponible bajo licencia CC-BY-NC.'},
      ]
    },
    openai:{
      emo:'⚡',name:'OpenAI',sub:'San Francisco · Corporación de Beneficio Público',
      news:[
        {strip:'strip-green',pill:'pill-green',cat:'API',t:'o3 Mini: 80% más Barato con Precisión Matemática de Élite',d:'o3 mini ofrece el 95% del rendimiento de o3 completo a una fracción del costo. Especialmente fuerte en matemáticas competitivas (AIME 2024: 92%) y razonamiento formal. Disponible vía API con rate limits generosos para developers desde lanzamiento.'},
        {strip:'strip-blue',pill:'pill-blue',cat:'Empresa',t:'OpenAI Operator: Automatización de Navegador con Certificación SOC 2',d:'Operator permite a empresas automatizar flujos de trabajo complejos en navegadores con cumplimiento SOC 2 Type II. Primeras integraciones enterprise con Salesforce, ServiceNow y SAP disponibles en la versión inicial.'},
        {strip:'strip-purple',pill:'pill-purple',cat:'Research',t:'RLHF Escalable: Supervisión Débil para Tareas Complejas',d:'OpenAI publica su investigación sobre escalar RLHF cuando los humanos no pueden evaluar directamente la calidad. Usa supervisores "débiles" (menos expertos) para entrenar verificadores automáticos que luego evalúan respuestas complejas.'},
      ]
    },
    anthropic:{
      emo:'🐙',name:'Anthropic',sub:'San Francisco · AI Safety Company',
      news:[
        {strip:'strip-blue',pill:'pill-blue',cat:'Modelo',t:'Claude 3.7 Sonnet: Top-1 en GPQA Diamond con Extended Thinking',d:'Claude 3.7 Sonnet con Extended Thinking alcanza el top-1 mundial en GPQA Diamond (nivel ciencias doctoral). El modo de pensamiento extendido permite razonamiento multi-paso de hasta 32K tokens internos antes de formular la respuesta final.'},
        {strip:'strip-green',pill:'pill-green',cat:'Dev Tools',t:'Claude Code CLI: Desarrollo Asistido por IA desde la Terminal',d:'Claude Code se lanza como herramienta CLI oficial con acceso a todo el contexto del proyecto, integración nativa con git y capacidad de ejecutar tests y corregir errores de forma autónoma. Disponible para todos los planes Pro y Team.'},
        {strip:'strip-red',pill:'pill-red',cat:'Safety',t:'Constitutional AI 2.0: Alineación Escalable de Código Abierto',d:'Anthropic publica la segunda generación de su framework Constitutional AI con principios más granulares y auto-revisión más robusta. Disponible como herramienta de código abierto para que cualquier equipo investigador lo adopte.'},
      ]
    },
    xai:{
      emo:'⚡',name:'xAI',sub:'Memphis, Tennessee · Elon Musk',
      news:[
        {strip:'strip-blue',pill:'pill-blue',cat:'Modelo',t:'Grok 3 "Big Brain Mode": Nivel Experto en Ciencias',d:'El modo Big Brain de Grok 3 usa 10× más cómputo en inferencia para consultas complejas. Alcanza nivel experto en física teórica, química orgánica y matemáticas avanzadas según benchmarks independientes de MIT y Caltech.'},
        {strip:'strip-green',pill:'pill-green',cat:'Integración',t:'Grok + Tesla FSD: Razonamiento Situacional en Vehículos Autónomos',d:'xAI integra Grok 3 en el sistema Full Self-Driving de Tesla para razonamiento de lenguaje natural sobre situaciones de tráfico complejas. El vehículo podrá explicar en voz alta sus decisiones de conducción en tiempo real.'},
        {strip:'strip-orange',pill:'pill-orange',cat:'Infra',t:'Colossus 2: 200,000 GPUs H200 — El Cluster de IA más Grande del Mundo',d:'xAI anuncia Colossus 2 en Memphis con 200,000 GPUs NVIDIA H200. El cluster supera en capacidad a toda la infraestructura de Microsoft Azure dedicada a IA, operativo 100% con energía renovable desde Q2 2026.'},
      ]
    },
    kimi:{
      emo:'🌙',name:'Kimi · Moonshot AI',sub:'Beijing · Moonshot AI (月之暗面)',
      news:[
        {strip:'strip-teal',pill:'pill-teal',cat:'Modelo',t:'Kimi k2: 32B MoE — El Mejor Modelo Chino en Coding y Agentes',d:'Kimi k2 usa arquitectura Mixture of Experts con 32B parámetros activos. Supera a GPT-4.1 en LiveCodeBench (67.3 vs 64.2) y a Claude Sonnet 3.7 en agentic tasks. Entrenado con RL a escala con 15T tokens. Disponible via API y open-weights.'},
        {strip:'strip-green',pill:'pill-green',cat:'Contexto',t:'1 Millón de Tokens de Contexto — El más Largo del Mercado',d:'Kimi mantiene el contexto de 1 millón de tokens (≈750,000 palabras) en producción, sin truncado. Permite analizar codebases completos, repositorios legales enteros o transcripciones largas de una sola vez. Benchmark RULER: 93.4% precisión a 1M tokens.'},
        {strip:'strip-purple',pill:'pill-purple',cat:'Research',t:'Kimi k1.5: Escalando RL sin Modelos de Recompensa Tradicionales',d:'Paper publicado en enero 2025. Kimi k1.5 introduce Long Context Scaling en RL (hasta 128K tokens) y Policy Optimization sin criticismo explícito. Supera a o1 en AIME y a Claude Sonnet 3.5 en MathBench con un modelo 2× más pequeño. Disponible en arxiv:2501.12599.'},
      ]
    },
  };

  const keys=Object.keys(cos);
  const tabs=keys.map((k,i)=>`<button class="tab${i===0?' on':''}" onclick="show('${k}',this)">${cos[k].emo} ${cos[k].name.split(' ')[0]}</button>`).join('');

  const panels=keys.map((k,i)=>{
    const co=cos[k];
    const rows=co.news.map(n=>`
<div class="news-row">
  <div><span class="card-pill ${n.pill}" style="margin-bottom:6px">${n.cat}</span>
  <div class="news-t">${n.t}</div>
  <div class="news-d">${n.d}</div></div>
</div>`).join('');
    return`<div id="p-${k}" class="panel${i===0?' on':''}">
  <div class="co-head">
    <span class="co-emo">${co.emo}</span>
    <div><div class="co-name">${co.name}</div><div class="co-sub">${co.sub}</div></div>
  </div>
  ${rows}
</div>`;
  }).join('');

  return base('Big 5',`
<div class="hero" style="padding-bottom:40px">
  <span class="eyebrow">🏢 Big Tech · Abril 2026</span>
  <h1>Big 5<br>en <em>IA</em></h1>
  <p class="hero-sub">Todos los movimientos de Google, Meta, OpenAI, Anthropic, xAI y Kimi esta semana</p>
</div>
<div class="section">
  <div class="tab-bar">${tabs}</div>
  ${panels}
</div>
<script>
function show(id,btn){
  document.querySelectorAll('.panel').forEach(p=>p.classList.remove('on'));
  document.querySelectorAll('.tab').forEach(b=>b.classList.remove('on'));
  document.getElementById('p-'+id).classList.add('on');
  btn.classList.add('on');
}
</script>`);
}

function kimiPage(){
  return base('Kimi · Moonshot AI',`
<div class="hero" style="background:linear-gradient(145deg,#E6FBF7 0%,#F0FDF9 50%,#F2F2F7 100%);border-color:rgba(13,148,136,.15)">
  <span class="eyebrow" style="color:#0D9488">🌙 Kimi · Moonshot AI · Abril 2026</span>
  <h1 style="color:#0F766E">Kimi<br><em style="color:#0D9488">Moonshot AI</em></h1>
  <p class="hero-sub">El LLM chino con 1M de tokens de contexto que compite directamente con GPT-4 y Claude en razonamiento, código y agentes.</p>
  <div class="hero-btns">
    <a class="btn btn-kimi" href="https://kimi.moonshot.cn" target="_blank">Probar Kimi Chat →</a>
    <a class="btn btn-ghost" href="https://arxiv.org/abs/2501.12599" target="_blank">Paper k1.5</a>
  </div>
</div>

<div class="section">
  <div class="sec-head">
    <div class="sec-title">🌙 ¿Qué es Moonshot AI?</div>
    <p class="sec-sub">La startup china de IA más relevante fuera de las Big 5 occidentales</p>
  </div>
  <div class="card">
    <div class="card-strip strip-teal"></div>
    <div class="card-inner">
      <span class="card-pill pill-teal">Empresa</span>
      <div class="card-title">Moonshot AI (月之暗面) — Beijing, 2023</div>
      <div class="card-desc">Fundada en 2023 por Yang Zhilin (ex investigador de CMU y Google Brain), Moonshot AI es la startup china de IA que más rápido ha crecido. Recaudó $1B en 2024 con valoración de $2.5B liderada por Alibaba. Su modelo Kimi se destaca por tener el contexto más largo del mercado (1M tokens) y capacidades de razonamiento de primer nivel. Compite directamente con OpenAI y Anthropic en benchmarks de matemáticas, código y agentes.</div>
    </div>
  </div>
</div>

<div class="section">
  <div class="sec-head">
    <div class="sec-title">🚀 Modelos Kimi</div>
    <p class="sec-sub">La línea de modelos de Moonshot AI y sus capacidades</p>
  </div>

  <div class="card">
    <div class="card-strip strip-teal"></div>
    <div class="card-inner">
      <span class="card-pill pill-teal">Kimi k2 · Más Reciente</span>
      <div class="card-title">Kimi k2: 32B MoE — Mejor en Coding y Agentes</div>
      <div class="card-desc">Kimi k2 usa Mixture of Experts con 32B parámetros activos. Supera a GPT-4.1 en LiveCodeBench (67.3 vs 64.2) y a Claude Sonnet 3.7 en agentic tasks. Entrenado con RL escalado sobre 15T tokens. Disponible como open-weights y vía API con pricing competitivo.</div>
      <div style="display:flex;gap:8px;flex-wrap:wrap">
        <a class="card-link card-link-teal" href="https://github.com/MoonshotAI/Kimi-k2" target="_blank">Ver en GitHub →</a>
        <a class="card-link card-link-teal" href="https://kimi.moonshot.cn" target="_blank">Probar →</a>
      </div>
    </div>
  </div>

  <div class="card">
    <div class="card-strip strip-green"></div>
    <div class="card-inner">
      <span class="card-pill pill-green">Kimi k1.5 · Paper</span>
      <div class="card-title">Kimi k1.5: Escalando RL con LLMs sin Modelos de Recompensa Tradicionales</div>
      <div class="card-desc">Paper de enero 2025 que introduce Long Context Scaling en RL (hasta 128K tokens) y Policy Optimization sin criticismo explícito. Supera a o1 de OpenAI en AIME 2024 y a Claude Sonnet 3.5 en MathBench usando un modelo 2× más pequeño. Uno de los trabajos de RL para LLMs más citados de 2025.</div>
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px">
        <span style="font-size:12px;color:var(--sub)">Moonshot AI Team · Enero 2025</span>
        <a class="card-link card-link-teal" href="https://arxiv.org/abs/2501.12599" target="_blank">Leer paper →</a>
      </div>
    </div>
  </div>

  <div class="card">
    <div class="card-strip strip-purple"></div>
    <div class="card-inner">
      <span class="card-pill pill-purple">Kimi Chat · Producto</span>
      <div class="card-title">1 Millón de Tokens de Contexto en Producción</div>
      <div class="card-desc">Kimi Chat mantiene 1M de tokens de contexto (≈750,000 palabras) en producción sin truncado. Permite subir y analizar PDFs completos, repositorios de código, contratos legales extensos o transcripciones largas en una sola conversación. Benchmark RULER a 1M tokens: 93.4% de precisión (vs 77% de GPT-4o).</div>
      <a class="card-link card-link-teal" href="https://kimi.moonshot.cn" target="_blank">Probar Kimi Chat →</a>
    </div>
  </div>
</div>

<div class="section">
  <div class="sec-head">
    <div class="sec-title">📊 Kimi vs Competencia</div>
    <p class="sec-sub">Benchmarks principales · Abril 2026</p>
  </div>
  <div class="card">
    <div class="card-strip strip-teal"></div>
    <div class="card-inner">
      <div class="card-title">Benchmarks destacados de Kimi k2</div>
      <div class="card-desc">
        <strong style="color:var(--text);font-size:15px">LiveCodeBench</strong><br>
        Kimi k2: <strong style="color:#0D9488">67.3</strong> · GPT-4.1: 64.2 · Claude 3.7: 63.1<br><br>
        <strong style="color:var(--text);font-size:15px">AIME 2024 (matemáticas competitivas)</strong><br>
        Kimi k1.5: <strong style="color:#0D9488">77.5%</strong> · o1: 74.4% · Claude 3.5 Sonnet: 55.9%<br><br>
        <strong style="color:var(--text);font-size:15px">Contexto largo (RULER 1M tokens)</strong><br>
        Kimi: <strong style="color:#0D9488">93.4%</strong> · GPT-4o: 77.0% · Claude 3.5: 69.4%
      </div>
    </div>
  </div>
</div>
`);
}
