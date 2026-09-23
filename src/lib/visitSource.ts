// Where a visit came from: ?ref=school-17, ?ref=share, ?ref=card… Remembered for the session so a
// class pilot can be measured in analytics and in lead emails. Only short slugs are accepted.
const KEY = 'pathtry-ref';
const VALID = /^[a-z0-9-]{1,40}$/;

export function visitSource(): string | undefined {
  if (typeof window === 'undefined') return undefined;
  try {
    const fromUrl = new URLSearchParams(window.location.search).get('ref')?.toLowerCase();
    if (fromUrl && VALID.test(fromUrl)) { sessionStorage.setItem(KEY, fromUrl); return fromUrl; }
    const saved = sessionStorage.getItem(KEY);
    return saved && VALID.test(saved) ? saved : undefined;
  } catch { return undefined; }
}

export const isVisitSource = (value: unknown): value is string => typeof value === 'string' && VALID.test(value);

const CYRILLIC: Record<string, string> = { а: 'a', ә: 'a', б: 'b', в: 'v', г: 'g', ғ: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh', з: 'z', и: 'i', й: 'i', к: 'k', қ: 'q', л: 'l', м: 'm', н: 'n', ң: 'n', о: 'o', ө: 'o', п: 'p', р: 'r', с: 's', т: 't', у: 'u', ұ: 'u', ү: 'u', ф: 'f', х: 'h', һ: 'h', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'sch', ъ: '', ы: 'y', і: 'i', ь: '', э: 'e', ю: 'yu', я: 'ya' };

// "Школа 17, 10А" → "shkola-17-10a": a class name turned into a slug that isVisitSource() accepts.
export function classSlug(value: string) {
  return value.toLowerCase().split('').map((character) => CYRILLIC[character] ?? character).join('').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40).replace(/-+$/g, '');
}
