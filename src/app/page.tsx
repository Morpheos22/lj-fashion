'use client';

import { LjLogo } from '@/components/lj-logo';

export default function MaintenancePage() {
  return (
    <main className="min-h-screen flex items-center justify-center" style={{ background: 'var(--cream)', color: 'var(--ink)' }}>
      <div className="text-center px-6 max-w-md">
        <div className="mx-auto mb-8 flex items-center justify-center">
          <LjLogo variant="dark" size={60} alt="LJ Fashion" />
        </div>
        <span className="lj-eyebrow block mb-4" style={{ color: 'var(--taupe)' }}>
          LJ Fashion
        </span>
        <h1 className="lj-heading text-[clamp(28px,5vw,44px)] leading-[1.15] mb-4 font-normal">
          We&apos;ll be back soon.
        </h1>
        <p className="text-[15px] leading-[1.85] mb-6" style={{ color: 'var(--ink-soft)' }}>
          Our boutique is being restyled. We&apos;re preparing something beautiful
          and will return shortly.
        </p>
        <p className="text-[13px] leading-[1.7]" style={{ color: 'var(--taupe)' }}>
          For enquiries, please message us on WhatsApp:
          <br />
          <a
            href="https://wa.me/2348131148006"
            className="inline-block mt-2 border-b border-current pb-0.5 hover:opacity-70 transition-opacity"
            style={{ color: 'var(--ink)' }}
          >
            +234 813 114 8006
          </a>
        </p>
        <p className="mt-8 text-[11px] tracking-[0.18em] uppercase" style={{ color: 'var(--taupe)' }}>
          Designed beyond the trend
        </p>
      </div>
    </main>
  );
}
