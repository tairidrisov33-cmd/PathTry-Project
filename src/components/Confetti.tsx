'use client';

import { useEffect, useState } from 'react';

const colors = ['#f16d59', '#f8c66e', '#2a9d8f', '#9b82c8', '#3867db', '#ff9a87'];

// A one-shot CSS confetti burst; pieces are placed deterministically so render is stable.
export default function Confetti({ pieces = 42 }: { pieces?: number }) {
  const [visible, setVisible] = useState(true);
  useEffect(() => { const timer = window.setTimeout(() => setVisible(false), 3600); return () => window.clearTimeout(timer); }, []);
  if (!visible) return null;
  return <div className="confetti" aria-hidden="true">{Array.from({ length: pieces }, (_, index) => {
    const seed = (index * 37) % 100;
    return <i key={index} style={{ left: `${(index * 97) % 100}%`, background: colors[index % colors.length], animationDelay: `${(seed % 12) * 45}ms`, animationDuration: `${2200 + (seed % 7) * 180}ms`, '--drift': `${((index * 53) % 120) - 60}px`, '--spin': `${360 + (seed % 5) * 180}deg`, width: index % 3 ? 8 : 6, height: index % 3 ? 12 : 6, borderRadius: index % 4 === 0 ? '50%' : 2 } as React.CSSProperties} />;
  })}</div>;
}
