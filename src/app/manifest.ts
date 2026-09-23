import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'PathTry',
    short_name: 'PathTry',
    description: 'Try a profession in 10 minutes before you choose it.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f7f8f3',
    theme_color: '#f16d59',
    icons: [
      { src: '/icon-192.png', sizes: '192x192', type: 'image/png', purpose: 'any' },
      { src: '/icon-512.png', sizes: '512x512', type: 'image/png', purpose: 'any' },
      { src: '/icon-maskable-512.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }
    ]
  };
}
