'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

type Props = {
  src: string;
  alt: string;
  priority?: boolean;
  /** Sizing/aspect classes for the wrapper, e.g. "aspect-[4/5] w-full". */
  className?: string;
  sizes?: string;
};

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Slow scale + fade image reveal (scale 1.04 -> 1) on viewport enter.
 * The wrapper clips the scale so there is no layout shift.
 * Reduced motion renders the image statically.
 */
export function RevealImage({ src, alt, priority = false, className = '', sizes = '100vw' }: Props) {
  const reduced = usePrefersReducedMotion();

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        className="relative h-full w-full will-change-transform"
        initial={reduced ? false : { opacity: 0, scale: 1.04 }}
        whileInView={reduced ? undefined : { opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: '0px 0px -10% 0px' }}
        transition={{ duration: 1.1, ease: EASE }}
      >
        <Image src={src} alt={alt} fill priority={priority} sizes={sizes} className="object-cover" />
      </motion.div>
    </div>
  );
}
