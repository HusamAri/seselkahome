'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';
import { withBase } from '@/lib/basePath';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

type Props = {
  src: string;
  alt: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
  /** Drift amount as a fraction of height. Kept small/tasteful. 0.12 default. */
  strength?: number;
};

/**
 * Subtle scroll-linked vertical drift for hero/product shots.
 * The inner image is oversized so the drift never reveals an edge.
 * Reduced motion pins the image (no transform).
 */
export function ParallaxImage({
  src,
  alt,
  priority = false,
  className = '',
  sizes = '100vw',
  strength = 0.12,
}: Props) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });

  const pct = Math.max(0, Math.min(0.25, strength)) * 100;
  const y = useTransform(scrollYProgress, [0, 1], [`-${pct}%`, `${pct}%`]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div className="absolute inset-0 will-change-transform" style={reduced ? undefined : { y }}>
        <div className="absolute -top-[14%] h-[128%] w-full">
          <Image src={withBase(src)} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />
        </div>
      </motion.div>
    </div>
  );
}
