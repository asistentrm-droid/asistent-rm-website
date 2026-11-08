// Vercel funkcija: POST /api/chat  { message, history: [{role, content}] }  ->  { answer, source }
// Jezikovni model: Claude (Anthropic). Ključ nastavite v Vercel → Settings → Environment Variables
// kot ANTHROPIC_API_KEY. Brez ključa funkcija odgovori iz rezervnih odgovorov (cenik, kontakt ...).

const AnthropicModule = require('@anthropic-ai/sdk');
const { SYSTEM_PROMPT, fallbackAnswer } = require('./_knowledge');

const Anthropic = AnthropicModule.default || AnthropicModule;

const MODEL = process.env.CHAT_MODEL || 'claude-opus-5-5';
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

module.exports = async function handler(req, res) {
  // Preverjanje v brskalniku: odprite /api/chat in poglejte, ali je AI vključen.
  if (req.method === 'GET') {
    return res.status(200).json({
      status: 'ok',
      ai: Boolean(process.env.ANTHROPIC_API_KEY),
      model: MODEL,
      note: process.env.ANTHROPIC_API_KEY
        ? 'AI je vključen.'
        : 'ANTHROPIC_API_KEY ni nastavljen — chatbot uporablja rezervne odgovore.',
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
    console.warn('ANTHROPIC_API_KEY ni nastavljen – rezervni odgovor.');
  }

  return res.status(200).json({ answer: fallbackAnswer(message), source: 'fallback' });
};
