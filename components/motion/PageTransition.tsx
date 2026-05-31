'use client';

import { motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

/**
 * Signature route transition (App Router, via app/template.tsx which remounts
 * on navigation). A soft content fade-up plus a single fig-plum color wipe that
 * lifts away to reveal the page — under 600ms. Reduced motion shows content flat.
 *
 * Fig plum is the founder accent; using it only for this brief, deliberate wipe
 * honors the board rule that plum appears solely as a sparing accent.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduced = usePrefersReducedMotion();

  if (reduced) return <>{children}</>;

  return (
    <>
      <motion.div
        key={`view-${pathname}`}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.16 }}
      >
        {children}
      </motion.div>

      <motion.div
        key={`wipe-${pathname}`}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-[90] bg-[var(--wipe)]"
        style={{ transformOrigin: 'top' }}
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      />
    </>
  );
}
