'use client';

import { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  /** Numeric target (e.g. 3) or string like "3+" where we parse the number */
  to: number | string;
  /** Optional suffix displayed after the number (e.g. "+") */
  suffix?: string;
  className?: string;
  duration?: number;
}

export default function CountUp({ to, suffix = '', className = '', duration = 1400 }: CountUpProps) {
  const target = typeof to === 'number' ? to : parseFloat(String(to)) || 0;
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const startTime = performance.now();
          const tick = (now: number) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // ease-out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(target * eased));
            if (progress < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.6 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target, duration]);

  return (
    <span ref={ref} className={className}>
      {count}{suffix}
    </span>
  );
}
