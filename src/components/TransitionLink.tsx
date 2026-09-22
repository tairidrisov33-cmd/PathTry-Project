'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import type { CSSProperties, MouseEvent, ReactNode } from 'react';

export default function TransitionLink({ href, className, style, children }: { href: string; className?: string; style?: CSSProperties; children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    document.body.classList.remove('page-exit');
  }, [pathname]);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith('#') || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    document.body.classList.add('page-exit');
    window.setTimeout(() => router.push(href), 260);
  };

  return <a className={className} style={style} href={href} onClick={handleClick}>{children}</a>;
}
