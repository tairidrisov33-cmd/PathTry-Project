'use client';

import { useEffect, useState } from 'react';

// Animates from 0 to the target, but always lands on the exact target: requestAnimationFrame
// never fires in background tabs, headless screenshots or print, so a timer finishes the job.
export function useCountUp(target: number, duration = 1100, decimals = 0) {
  const [value, setValue] = useState(target);
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.visibilityState !== 'visible') { setValue(target); return; }
    const factor = 10 ** decimals;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      setValue(Math.round(target * (1 - Math.pow(1 - progress, 3)) * factor) / factor);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    setValue(0);
    frame = requestAnimationFrame(tick);
    const finish = window.setTimeout(() => { cancelAnimationFrame(frame); setValue(target); }, duration + 150);
    return () => { cancelAnimationFrame(frame); window.clearTimeout(finish); };
  }, [target, duration, decimals]);
  return value;
}

export default function CountUp({ value, duration, suffix = '', decimals = 0, locale }: { value: number; duration?: number; suffix?: string; decimals?: number; locale?: string }) {
  const current = useCountUp(value, duration, decimals);
  return <>{current.toLocaleString(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })}{suffix}</>;
}
