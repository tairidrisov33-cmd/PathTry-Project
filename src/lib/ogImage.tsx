import { ImageResponse } from 'next/og';

export const OG_SIZE = { width: 1200, height: 630 };

// Social preview card (Telegram, WhatsApp, X, LinkedIn…): logo, headline and a short tagline.
export function renderOgImage(headline: string, tagline: string) {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '72px 80px', background: 'linear-gradient(135deg, #17211f 0%, #263f38 60%, #3e665a 100%)', color: '#f1f4ed', fontFamily: 'sans-serif' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
        <div style={{ width: 88, height: 88, borderRadius: 24, background: '#f16d59', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><circle cx="6" cy="18" r="2" /><path d="M8 18h7a3.5 3.5 0 0 0 0-7H9a3.5 3.5 0 0 1 0-7h7" /><path d="m15 1.5 2.5 2.5L15 6.5" /></svg>
        </div>
        <div style={{ display: 'flex', fontSize: 64, fontWeight: 800, letterSpacing: -2 }}>Path<span style={{ color: '#f16d59' }}>Try</span></div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
        <div style={{ fontSize: 72, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2, maxWidth: 1000 }}>{headline}</div>
        <div style={{ display: 'flex', fontSize: 28, color: '#f8c66e' }}>{tagline}</div>
      </div>
      <div style={{ display: 'flex', fontSize: 26, color: '#b4c9bf' }}>pathtry.site</div>
    </div>,
    OG_SIZE
  );
}
