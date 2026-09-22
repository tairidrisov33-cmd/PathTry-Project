'use client';

import { useRouter } from 'next/navigation';
import type { MouseEvent, ReactNode } from 'react';

export default function TransitionLink({ href, className, children }: { href: string; className?: string; children: ReactNode }) {
  const router = useRouter();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith('#') || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    document.body.classList.add('page-exit');
    window.setTimeout(() => router.push(href), 260);
  };

  return <a className={className} href={href} onClick={handleClick}>{children}</a>;
}
