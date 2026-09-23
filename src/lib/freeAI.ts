// Free-tier AI through any OpenAI-compatible chat API. Groq is the default; Gemini, OpenRouter and
// others work by setting FREE_AI_API_KEY + FREE_AI_BASE_URL + FREE_AI_MODEL instead.

export type ChatTurn = { role: 'system' | 'user' | 'assistant'; content: string };

// Free model line-ups change over time, so several models are tried in order and the first
// one that responds is remembered for later requests.
const GROQ_MODELS = ['llama-3.3-70b-versatile', 'openai/gpt-oss-120b', 'openai/gpt-oss-20b', 'llama-3.1-8b-instant'];

function freeConfig() {
  const preferred = process.env.FREE_AI_MODEL?.trim();
  if (process.env.GROQ_API_KEY) return { key: process.env.GROQ_API_KEY, base: 'https://api.groq.com/openai/v1', models: [...new Set([preferred, ...GROQ_MODELS].filter((model): model is string => Boolean(model)))] };
  if (process.env.FREE_AI_API_KEY && process.env.FREE_AI_BASE_URL && preferred) return { key: process.env.FREE_AI_API_KEY, base: process.env.FREE_AI_BASE_URL.replace(/\/$/, ''), models: [preferred] };
  return null;
}

export const freeAIConfigured = () => freeConfig() !== null;

let workingModel: string | null = null;

// Reasoning models (gpt-oss) spend part of max_tokens on thinking, so callers keep a generous budget.
export async function freeCompletion(messages: ChatTurn[], options: { json?: boolean; maxTokens?: number } = {}): Promise<string | null> {
  const config = freeConfig();
  if (!config) return null;
  const models = workingModel && config.models.includes(workingModel) ? [workingModel, ...config.models.filter((model) => model !== workingModel)] : config.models;
  for (const model of models) {
    const response = await fetch(`${config.base}/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${config.key}` },
      body: JSON.stringify({ model, messages, temperature: 0.4, max_tokens: options.maxTokens ?? 1200, ...(options.json ? { response_format: { type: 'json_object' } } : {}) }),
      signal: AbortSignal.timeout(15_000)
    });
    if (!response.ok) {
      const detail = await response.text().catch(() => '');
      // An unknown, retired, or unsupported model: try the next one instead of failing.
      if (response.status === 404 || (response.status === 400 && /model|decommission|not supported|response_format/i.test(detail))) continue;
      throw new Error(`Free AI provider responded ${response.status}`);
    }
    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content;
    if (typeof text !== 'string' || !text.trim()) continue;
    workingModel = model;
    return text.trim();
  }
  return null;
}
