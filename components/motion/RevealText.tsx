'use client';

import { motion } from 'framer-motion';
import type { ElementType } from 'react';
import { useReveal } from './useReveal';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

type Props = {
  /** A string (split on "\n") or an array of pre-split lines. */
  text: string | string[];
  /** Semantic element to render (h1, h2, p, span...). Default h2. */
  as?: keyof JSX.IntrinsicElements;
  className?: string;
  /** Class applied to each animated line (for display font / size). */
  lineClassName?: string;
  /** Stagger start delay in seconds. */
  delay?: number;
};

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Line-based masked reveal. Each line sits in an overflow-hidden mask and
 * slides up into view with a slow stagger, triggered by a real
 * IntersectionObserver. Reduced motion renders statically.
 */
export function RevealText({ text, as = 'h2', className = '', lineClassName = '', delay = 0 }: Props) {
  const reduced = usePrefersReducedMotion();
  const { ref, inView } = useReveal<HTMLElement>();
  const lines = Array.isArray(text) ? text : String(text).split('\n');
  const Tag = as as ElementType;

  if (reduced) {
    return (
      <Tag ref={ref as never} className={className}>
        {lines.map((line, i) => (
          <span key={i} className={`block ${lineClassName}`}>
            {line}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag ref={ref as never} className={className} aria-label={lines.join(' ')}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.05em]" aria-hidden="true">
          <motion.span
            className={`block will-change-transform ${lineClassName}`}
            initial={{ y: '115%' }}
            animate={{ y: inView ? '0%' : '115%' }}
            transition={{ duration: 0.8, ease: EASE, delay: delay + i * 0.09 }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
