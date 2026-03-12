'use client';

import { useRef, type ReactNode } from 'react';

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Tilt intensity in degrees (default: 10) */
  intensity?: number;
}

export default function TiltCard({ children, className = '', intensity = 10 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * intensity}deg) rotateX(${-y * intensity}deg) translateZ(10px)`;
  };

  const handleMouseLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) translateZ(0px)';
  };

  return (
    <div
      ref={ref}
      className={`tilt-3d ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transition: 'transform 0.18s ease-out' }}
    >
      {children}
    </div>
  );
}
