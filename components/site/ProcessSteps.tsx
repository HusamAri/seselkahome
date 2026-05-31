'use client';

import { useState } from 'react';
import { processSteps } from '@/lib/brand';

/**
 * The four-step process. Hover (or focus) raises a step; calm, no bounce.
 * On touch/no-hover everything reads clearly in its resting state.
 */
export function ProcessSteps() {
  const [active, setActive] = useState(0);

  return (
    <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {processSteps.map((step, i) => {
        const on = i === active;
        return (
          <article
            key={step.n}
            onMouseEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            tabIndex={0}
            className={`group rounded-[1.2rem] border p-6 outline-none shadow-[0_30px_52px_-38px_rgba(120,70,25,0.4)] transition-all duration-500 ease-quiet ${
              i % 2 === 1 ? 'lg:translate-y-10' : ''
            } ${on ? 'border-accent/40 bg-card' : 'border-line bg-bg/50'}`}
          >
            <span className={`font-display text-3xl transition-colors duration-500 ${on ? 'text-accent' : 'text-muted'}`}>
              {step.n}
            </span>
            <h3 className="mt-3 font-display text-2xl text-fg">{step.t}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">{step.d}</p>
          </article>
        );
      })}
    </div>
  );
}
