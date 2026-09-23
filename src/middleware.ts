import { NextResponse, type NextRequest } from 'next/server';

// Same cookie as serverLanguage.ts, repeated here so the edge bundle stays free of next/headers.
const LANGUAGE_COOKIE = 'pathtry-language';

// ?lang=en|ru (used by hreflang links and shared URLs) renders that language on this very request
// and remembers it in the language cookie for the next pages.
export function middleware(request: NextRequest) {
  const lang = request.nextUrl.searchParams.get('lang');
  if (lang !== 'en' && lang !== 'ru') return NextResponse.next();
  const headers = new Headers(request.headers);
  const others = (request.headers.get('cookie') ?? '').split(';').map((part) => part.trim()).filter((part) => part && !part.startsWith(`${LANGUAGE_COOKIE}=`));
  headers.set('cookie', [...others, `${LANGUAGE_COOKIE}=${lang}`].join('; '));
  const response = NextResponse.next({ request: { headers } });
  response.cookies.set(LANGUAGE_COOKIE, lang, { path: '/', maxAge: 31_536_000, sameSite: 'lax' });
  return response;
}

// Pages only: API routes, build assets and metadata files never need a language.
export const config = { matcher: ['/((?!api|_next|_vercel|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest|opengraph-image|twitter-image|apple-icon|icon).*)'] };
