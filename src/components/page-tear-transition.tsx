'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';

/**
 * PageTearTransition — renders a "page tearing" overlay animation.
 *
 * The effect splits the viewport into two halves (left + right). The left
 * half tears away to the left, the right half tears away to the right,
 * revealing the next page beneath. A thin cream-colored "torn edge" with
 * a jagged clip-path sells the paper-tear metaphor.
 *
 * The component is controlled: pass `active={true}` to trigger the tear,
 * and `onComplete` is called when the animation finishes (the parent uses
 * this to navigate to the next page).
 *
 * Timing: 700ms total — fast enough to feel like a click-time transition
 * but slow enough to read as a deliberate "tear" rather than a flash.
 */
interface PageTearTransitionProps {
  active: boolean;
  onComplete: () => void;
}

export function PageTearTransition({ active, onComplete }: PageTearTransitionProps) {
  // Lock body scroll while the tear is active
  useEffect(() => {
    if (active) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [active]);

  return (
    <AnimatePresence>
      {active && (
        <>
          {/* Left half — tears away to the left */}
          <motion.div
            key="tear-left"
            className="fixed inset-y-0 left-0 z-[200] w-1/2 origin-left"
            style={{
              background: 'linear-gradient(90deg, var(--cream) 0%, var(--cream-deep) 100%)',
              boxShadow: 'inset -12px 0 24px -8px rgba(20,16,12,0.15)',
            }}
            initial={{ x: 0, rotateY: 0, skewX: 0 }}
            animate={{
              x: '-110%',
              rotateY: -25,
              skewX: -8,
            }}
            transition={{
              duration: 0.7,
              ease: [0.4, 0.0, 0.2, 1],
            }}
            onAnimationComplete={onComplete}
          >
            {/* Torn edge — a jagged cream strip on the right side of the left panel */}
            <div
              className="absolute right-0 top-0 bottom-0 w-3"
              style={{
                background: 'var(--cream)',
                clipPath: 'polygon(0% 0%, 100% 5%, 80% 12%, 100% 20%, 75% 28%, 95% 36%, 70% 44%, 90% 52%, 72% 60%, 95% 68%, 68% 76%, 92% 84%, 75% 92%, 100% 100%, 0% 100%)',
                filter: 'drop-shadow(2px 0 2px rgba(20,16,12,0.1))',
              }}
            />
          </motion.div>

          {/* Right half — tears away to the right */}
          <motion.div
            key="tear-right"
            className="fixed inset-y-0 right-0 z-[200] w-1/2 origin-right"
            style={{
              background: 'linear-gradient(270deg, var(--cream) 0%, var(--cream-deep) 100%)',
              boxShadow: 'inset 12px 0 24px -8px rgba(20,16,12,0.15)',
            }}
            initial={{ x: 0, rotateY: 0, skewX: 0 }}
            animate={{
              x: '110%',
              rotateY: 25,
              skewX: 8,
            }}
            transition={{
              duration: 0.7,
              ease: [0.4, 0.0, 0.2, 1],
            }}
          >
            {/* Torn edge — mirror of the left panel's edge */}
            <div
              className="absolute left-0 top-0 bottom-0 w-3"
              style={{
                background: 'var(--cream)',
                clipPath: 'polygon(100% 0%, 0% 5%, 20% 12%, 0% 20%, 25% 28%, 5% 36%, 30% 44%, 10% 52%, 28% 60%, 5% 68%, 32% 76%, 8% 84%, 25% 92%, 0% 100%, 100% 100%)',
                filter: 'drop-shadow(-2px 0 2px rgba(20,16,12,0.1))',
              }}
            />
          </motion.div>

          {/* Center seam shadow — a brief dark line that appears as the
              page tears apart, enhancing the 3D depth of the effect */}
          <motion.div
            key="tear-seam"
            className="fixed inset-y-0 left-1/2 z-[201] w-px -translate-x-1/2"
            style={{
              background: 'linear-gradient(180deg, transparent 0%, rgba(20,16,12,0.25) 20%, rgba(20,16,12,0.25) 80%, transparent 100%)',
            }}
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: [0, 1, 0], scaleY: [0, 1, 1] }}
            transition={{
              duration: 0.5,
              ease: 'easeOut',
            }}
          />
        </>
      )}
    </AnimatePresence>
  );
}

