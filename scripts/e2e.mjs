// End-to-end check: plays every profession in headless Chrome and reports broken steps,
// console errors, horizontal overflow, and untranslated English text in Russian mode.
//
//   npm run dev                        # in another terminal
//   npm run test:e2e                   # all professions, Russian, phone width
//   LANG_UI=en WIDTH=1280 npm run test:e2e
//   BASE_URL=https://your-site.vercel.app SLUGS=doctor,nurse npm run test:e2e
//
// Requires Node.js 22+ (built-in WebSocket) and Google Chrome or Chromium.
import { spawn } from 'node:child_process';
import { existsSync, mkdtempSync, readdirSync, readFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const BASE = (process.env.BASE_URL || 'http://localhost:3000').replace(/\/$/, '');
const lang = process.env.LANG_UI === 'en' ? 'en' : 'ru';
const width = Number(process.env.WIDTH || 390);
const chromePath = process.env.CHROME_PATH || [
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'
].find((path) => existsSync(path));
if (!chromePath) { console.error('Chrome not found. Set CHROME_PATH.'); process.exit(1); }

const catalogDir = new URL('../src/data/catalog/', import.meta.url);
const slugs = process.env.SLUGS ? process.env.SLUGS.split(',') : readdirSync(catalogDir).filter((file) => !['types.ts', 'helpers.ts'].includes(file)).flatMap((file) => [...readFileSync(new URL(file, catalogDir), 'utf8').matchAll(/slug: '([a-z-]+)'/g)].map((match) => match[1]));

const port = 9300 + Math.floor(Math.random() * 400);
const chrome = spawn(chromePath, ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${mkdtempSync(join(tmpdir(), 'pathtry-e2e-'))}`, 'about:blank'], { stdio: 'ignore' });
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
let targets; for (let i = 0; i < 50 && !targets; i++) { try { targets = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); } catch { await sleep(200); } }
const ws = new WebSocket(targets.find((target) => target.type === 'page').webSocketDebuggerUrl);
await new Promise((resolve) => ws.addEventListener('open', resolve));

let id = 0; const pending = new Map(); const errors = [];
ws.addEventListener('message', (event) => {
  const message = JSON.parse(event.data);
  if (pending.has(message.id)) { pending.get(message.id)(message.result); pending.delete(message.id); }
  if (message.method === 'Runtime.exceptionThrown') errors.push(`exception: ${(message.params.exceptionDetails.exception?.description || message.params.exceptionDetails.text).slice(0, 160)}`);
  if (message.method === 'Runtime.consoleAPICalled' && message.params.type === 'error') errors.push(`console.error: ${message.params.args.map((arg) => arg.value ?? arg.description ?? '').join(' ').slice(0, 160)}`);
});
const send = (method, params = {}) => new Promise((resolve) => { const callId = ++id; pending.set(callId, resolve); ws.send(JSON.stringify({ id: callId, method, params })); });
const run = async (expression) => (await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true })).result?.value;

await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride', { width, height: 850, deviceScaleFactor: 1, mobile: width < 600 });
await send('Page.navigate', { url: `${BASE}/` }); await sleep(2500);
await run(`document.cookie = 'pathtry-language=${lang}; path=/'; localStorage.clear(); localStorage.setItem('pathtry-language', '${lang}')`);

const answer = lang === 'ru'
  ? 'Сначала я бы выяснил, что именно произошло и кому это важно, потому что без фактов решение будет случайным. Затем проверил бы один конкретный шаг.'
  : 'First I would find out exactly what happened and who it affects, because without facts the decision is random. Then I would test one concrete step.';
const englishScan = `(() => { const found = []; const walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let node; while ((node = walk.nextNode())) { const el = node.parentElement; if (!el || el.closest('script,style,svg,[aria-hidden=true]')) continue; const text = node.textContent.trim(); if (text && /[A-Za-z]{3,}/.test(text) && !/[А-Яа-яЁё]/.test(text) && !/^(PathTry|PathFinder|pathtry|path|try|O\\*NET.*|ESCO|AI|EN|RU|IELTS.*|SAT.*|IB.*|A-Levels.*|MCAT.*|LSAT.*|GRE.*|NCLEX.*|UX.*|CompTIA.*|Enter|Ctrl.*|Model United Nations|Godot|Unity|CTF|PATHFINDER.*|GitHub)$/.test(text)) found.push(text); } return found; })()`;

let failed = 0;
for (const slug of slugs) {
  errors.length = 0;
  const issues = new Set();
  await send('Page.navigate', { url: `${BASE}/try/${slug}` }); await sleep(3000);
  for (let step = 0; step < 10; step++) {
    const kind = await run(`!document.querySelector('.task-box') ? 'none' : document.querySelector('textarea') ? 'text' : 'choice'`);
    if (kind === 'none') { issues.add(`step ${step + 1}: task not rendered`); break; }
    if (kind === 'choice') {
      const count = await run(`document.querySelectorAll('.option').length`);
      if (count !== 5) issues.add(`step ${step + 1}: ${count} options instead of 5`);
      await run(`document.querySelectorAll('.option')[${step % 5}].click()`); await sleep(150);
      await run(`document.querySelector('.task-actions .btn-primary').click()`); await sleep(500);
      if (!(await run(`Boolean(document.querySelector('.feedback p')?.textContent.trim())`))) issues.add(`step ${step + 1}: no pro insight`);
    } else {
      await run(`(() => { const area = document.querySelector('textarea'); Object.getOwnPropertyDescriptor(HTMLTextAreaElement.prototype, 'value').set.call(area, ${JSON.stringify(answer)}); area.dispatchEvent(new Event('input', { bubbles: true })); })()`); await sleep(150);
      await run(`document.querySelector('.task-actions .btn-primary').click()`);
      let reviewed = false;
      for (let tick = 0; tick < 60 && !reviewed; tick++) { await sleep(250); reviewed = await run(`Boolean(document.querySelector('.review-feedback'))`); }
      if (!reviewed) issues.add(`step ${step + 1}: no PathFinder review`);
    }
    if (lang === 'ru') for (const text of await run(englishScan)) issues.add(`English text: ${text.slice(0, 60)}`);
    if ((await run(`document.documentElement.scrollWidth - innerWidth`)) > 0) issues.add(`step ${step + 1}: horizontal overflow`);
    await run(`document.querySelectorAll('.enjoy-options button')[${step % 3}]?.click()`); await sleep(100);
    await run(`[...document.querySelectorAll('.task-actions .btn-primary')].at(-1).click()`); await sleep(step === 9 ? 3500 : 700);
  }
  const result = await run(`({ path: location.pathname, score: document.querySelector('.score')?.textContent })`);
  if (result.path !== `/result/${slug}`) issues.add(`did not reach the result page (ended at ${result.path})`);
  if (lang === 'ru') for (const text of await run(englishScan)) issues.add(`English text on result: ${text.slice(0, 60)}`);
  if ((await run(`document.documentElement.scrollWidth - innerWidth`)) > 0) issues.add('result: horizontal overflow');
  errors.forEach((error) => issues.add(error));
  if (issues.size) failed++;
  console.log(`${issues.size ? '✗' : '✓'} ${slug.padEnd(26)} score ${result.score ?? '-'}${issues.size ? `\n    ${[...issues].join('\n    ')}` : ''}`);
}

ws.close(); chrome.kill();
console.log(`\n${slugs.length - failed}/${slugs.length} professions passed (${lang}, ${width}px, ${BASE})`);
process.exit(failed ? 1 : 0);
