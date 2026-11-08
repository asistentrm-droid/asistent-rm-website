// Vercel funkcija: POST /api/chat  { message, history: [{role, content}] }  ->  { answer, source }
// Jezikovni model: nastavite ENEGA od ključev v Vercel → Settings → Environment Variables:
//   OPENAI_API_KEY     -> OpenAI (model v OPENAI_MODEL, privzeto gpt-4o-mini)
//   ANTHROPIC_API_KEY  -> Claude (model v CHAT_MODEL)
// Če sta nastavljena oba, se uporabi OpenAI. Brez ključa funkcija odgovori iz rezervnih odgovorov.

const AnthropicModule = require('@anthropic-ai/sdk');
const { SYSTEM_PROMPT, fallbackAnswer } = require('./_knowledge');

const Anthropic = AnthropicModule.default || AnthropicModule;

const MODEL = process.env.CHAT_MODEL || 'claude-opus-5-5';
const OPENAI_MODEL = process.env.OPENAI_MODEL || 'gpt-4o-mini';
const MAX_MESSAGE = 2000;
const MAX_HISTORY = 10;

let client = null;
const getClient = () => {
  if (!process.env.ANTHROPIC_API_KEY) return null;
  if (!client) client = new Anthropic({ timeout: 25_000, maxRetries: 1 });
  return client;
};

function cleanHistory(history) {
  if (!Array.isArray(history)) return [];
  const items = history
    .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string' && m.content.trim())
    .slice(-MAX_HISTORY)
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_MESSAGE) }));
  // Pogovor mora začeti uporabnik.
  while (items.length && items[0].role !== 'user') items.shift();
  return items;
}

async function askClaude(anthropic, history, message) {
  const messages = [...history, { role: 'user', content: message }];
  // Zaporedni sporočili iste vloge združimo (API zahteva izmenjavo).
  const merged = [];
  for (const m of messages) {
    const last = merged[merged.length - 1];
    if (last && last.role === m.role) last.content += `\n\n${m.content}`;
    else merged.push({ ...m });
  }

  const response = await anthropic.beta.messages.create({
    model: MODEL,
    max_tokens: 400,
    system: [{ type: 'text', text: SYSTEM_PROMPT, cache_control: { type: 'ephemeral' } }],
    output_config: { effort: 'low' },
    betas: ['server-side-fallback-2026-07-01'],
    fallbacks: 'default',
    messages: merged,
  });

  if (response.stop_reason === 'refusal') return null;
  const text = response.content
    .filter((b) => b.type === 'text')
    .map((b) => b.text)
    .join('')
    .trim();
  return text || null;
}

async function askOpenAI(history, message) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 25_000);
  try {
    const r = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        max_tokens: 300,
        temperature: 0.3,
        messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...history, { role: 'user', content: message }],
      }),
      signal: controller.signal,
    });
    if (!r.ok) {
      console.error('OpenAI napaka', r.status, (await r.text()).slice(0, 300));
      return null;
    }
    const data = await r.json();
    const text = data?.choices?.[0]?.message?.content;
    return typeof text === 'string' && text.trim() ? text.trim() : null;
  } finally {
    clearTimeout(timer);
  }
}

const provider = () => (process.env.OPENAI_API_KEY ? 'openai' : process.env.ANTHROPIC_API_KEY ? 'anthropic' : null);

module.exports = async function handler(req, res) {
  // Preverjanje v brskalniku: odprite /api/chat in poglejte, ali je AI vključen.
  if (req.method === 'GET') {
    const p = provider();
    return res.status(200).json({
      status: 'ok',
      ai: Boolean(p),
      provider: p,
      model: p === 'openai' ? OPENAI_MODEL : p === 'anthropic' ? MODEL : null,
      note: p
        ? 'AI je vključen.'
        : 'Ključ ni nastavljen (OPENAI_API_KEY ali ANTHROPIC_API_KEY) — chatbot uporablja vnaprej pripravljene odgovore.',
    });
  }
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Dovoljena sta GET in POST.' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try { body = JSON.parse(body); } catch { body = {}; }
  }
  const message = typeof body?.message === 'string' ? body.message.trim().slice(0, MAX_MESSAGE) : '';
  if (!message) return res.status(422).json({ error: 'Prazno sporočilo.' });
  const history = cleanHistory(body.history);

  if (provider() === 'openai') {
    try {
      const answer = await askOpenAI(history, message);
      if (answer) return res.status(200).json({ answer, source: 'ai' });
    } catch (err) {
      console.error('Napaka chatbota (OpenAI)', err);
    }
    return res.status(200).json({ answer: fallbackAnswer(message), source: 'fallback' });
  }

  const anthropic = getClient();
  if (anthropic) {
    try {
      const answer = await askClaude(anthropic, history, message);
      if (answer) return res.status(200).json({ answer, source: 'ai' });
    } catch (err) {
      if (err instanceof Anthropic.APIError) {
        console.error('Claude API napaka', err.status, err.message);
      } else {
        console.error('Napaka chatbota', err);
      }
    }
  } else {
    console.warn('Ključ za AI ni nastavljen – rezervni odgovor.');
  }

  return res.status(200).json({ answer: fallbackAnswer(message), source: 'fallback' });
};
