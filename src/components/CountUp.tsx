'use client';

import { useEffect, useState } from 'react';

export function useCountUp(target: number, duration = 1100, decimals = 0) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setValue(target); return; }
    const factor = 10 ** decimals;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      setValue(Math.round(target * (1 - Math.pow(1 - progress, 3)) * factor) / factor);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration, decimals]);
  return value;
}

export default function CountUp({ value, duration, suffix = '', decimals = 0, locale }: { value: number; duration?: number; suffix?: string; decimals?: number; locale?: string }) {
  const current = useCountUp(value, duration, decimals);
  return <>{current.toLocaleString(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}</>;
}
