import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';
import { LjLogo } from '@/components/lj-logo';

export const metadata: Metadata = {
  title: 'Our Story — LJ Fashion',
  description:
    'Where soft meets statement. LJ Fashion was founded by Linda Joweigha as an antidote to the noise — a sanctuary for modern elegance, designed beyond the trend.',
  openGraph: {
    title: 'Our Story — LJ Fashion',
    description:
      'Where soft meets statement. Founded by Linda Joweigha as an antidote to the noise.',
    type: 'website',
  },
};

export default function OurStoryPage() {
  return (
    <main className="bg-background text-foreground min-h-screen relative overflow-hidden">
      {/* Simple sticky nav (matches product page) */}
      <nav className="border-b border-[var(--line)] sticky top-0 z-50 bg-[var(--cream)]/95 backdrop-blur-sm">
        <div className="flex items-center justify-between px-[5vw] py-4">
          <Link
            href="/"
            className="flex items-center gap-3 text-[13px] sm:text-[15px] tracking-[0.3em] sm:tracking-[0.35em] text-[var(--ink)]"
            style={{ fontFamily: 'var(--font-jost)' }}
          >
            <LjLogo variant="dark" size={32} alt="LJ Fashion" />
            <span>LJ&nbsp;FASHION</span>
          </Link>
          <Link
            href="/#story"
            className="text-[11px] tracking-[0.24em] uppercase text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors border-b border-current pb-0.5"
          >
            ← Back to Home
          </Link>
        </div>
      </nav>

      {/* ====================================================================
          SILHOUETTE LAYER — all 3 model silhouettes float throughout the
          page, positioned absolutely and pinned to the viewport so they
          create a sense of movement and life as the user scrolls. Each
          has an independent float animation (defined in globals.css) for
          an organic, breathing quality. mix-blend-mode: multiply blends
          them with the cream background for an integrated editorial look.
          Hidden on mobile to keep the small viewport readable.
          ==================================================================== */}
      <div
        className="hidden md:block fixed inset-0 z-0 pointer-events-none"
        aria-hidden="true"
      >
        {/* Silhouette 1 — left side, upper area */}
        <div
          className="lj-silhouette-float absolute"
          style={{
            left: '3%',
            top: '8%',
            opacity: 0.10,
            mixBlendMode: 'multiply' as const,
          }}
        >
          <Image
            src="/silhouette-1.png"
            alt=""
            width={320}
            height={570}
            className="h-[70vh] w-auto"
          />
        </div>
        {/* Silhouette 2 — right side, mid page */}
        <div
          className="lj-silhouette-float-2 absolute"
          style={{
            right: '4%',
            top: '28%',
            opacity: 0.09,
            mixBlendMode: 'multiply' as const,
          }}
        >
          <Image
            src="/silhouette-2.png"
            alt=""
            width={320}
            height={570}
            className="h-[68vh] w-auto"
          />
        </div>
        {/* Silhouette 3 — left side, lower area */}
        <div
          className="lj-silhouette-float-3 absolute"
          style={{
            left: '5%',
            bottom: '5%',
            opacity: 0.10,
            mixBlendMode: 'multiply' as const,
          }}
        >
          <Image
            src="/silhouette-3.png"
            alt=""
            width={320}
            height={570}
            className="h-[72vh] w-auto"
          />
        </div>
      </div>

      {/* ====================================================================
          CONTENT — sits above the silhouette layer (z-10)
          ==================================================================== */}
      <div className="relative z-10">

        {/* HERO — title */}
        <section className="py-[80px] sm:py-[140px] px-[6vw] text-center max-w-[900px] mx-auto">
          <span className="lj-eyebrow block mb-5">Our Story</span>
          <h1 className="lj-heading text-[clamp(40px,7vw,88px)] leading-[1.02] mb-6 font-normal">
            Where soft
            <br />
            meets statement.
          </h1>
          <p
            className="lj-heading italic text-[clamp(18px,2.4vw,26px)] leading-[1.5] max-w-[560px] mx-auto"
            style={{ color: 'var(--ink-soft)' }}
          >
            Designed beyond the trend — a sanctuary for modern elegance.
          </p>
        </section>

        {/* THE ORIGIN */}
        <section className="py-[60px] sm:py-[80px] px-[6vw] max-w-[720px] mx-auto">
          <span className="lj-eyebrow block mb-4">The Origin</span>
          <h2 className="lj-heading text-[clamp(28px,3.6vw,44px)] leading-[1.15] mb-6 font-normal">
            An Antidote to the Noise
          </h2>
          <div className="space-y-5">
            <p className="text-[15px] sm:text-[16px] leading-[1.9]" style={{ color: 'var(--ink-soft)' }}>
              We live in a world that moves relentlessly fast. Trends cycle overnight,
              wardrobes clutter with impulse, and getting dressed — something that should
              feel like an empowering, morning ritual — often turns into a daily
              compromise. You are too frequently forced to choose: comfort or presence?
              Simplicity or style? Loud statements or quiet confidence?
            </p>
            <p className="text-[15px] sm:text-[16px] leading-[1.9]" style={{ color: 'var(--ink-soft)' }}>
              LJ Fashion was founded to end that compromise.
            </p>
            <p className="text-[15px] sm:text-[16px] leading-[1.9]" style={{ color: 'var(--ink-soft)' }}>
              Born out of a desire for intentionality, LJ was created as a sanctuary for
              those who value modern elegance without the noise. We believe that true
              style isn&apos;t about doing too much; it&apos;s about the effortless
              confidence that comes when your clothing simply works.
            </p>
          </div>
        </section>

        {/* THE VISION */}
        <section className="py-[60px] sm:py-[80px] px-[6vw] max-w-[720px] mx-auto">
          <span className="lj-eyebrow block mb-4">The Vision</span>
          <h2 className="lj-heading text-[clamp(28px,3.6vw,44px)] leading-[1.15] mb-6 font-normal">
            Designed Beyond the Trend
          </h2>
          <div className="space-y-5">
            <p className="text-[15px] sm:text-[16px] leading-[1.9]" style={{ color: 'var(--ink-soft)' }}>
              From our very first sketch, our philosophy has remained unchanged: your
              wardrobe should serve you, not the other way around.
            </p>
            <p className="text-[15px] sm:text-[16px] leading-[1.9]" style={{ color: 'var(--ink-soft)' }}>
              We don&apos;t design for fleeting seasons or viral micro-trends. We design
              for real life — for the quiet morning coffees, the high-stakes boardroom
              meetings, the spontaneous weekend travel, and the cherished family
              gatherings.
            </p>
            <p className="text-[15px] sm:text-[16px] leading-[1.9]" style={{ color: 'var(--ink-soft)' }}>
              Every silhouette, seam, and fabric in the LJ collection is selected with
              deep intention. Across our Women&apos;s, Dresses, Modest Wear, and Occasion
              Wear collections, we unite tactile comfort with timeless structure. The
              result is a fluid, versatile ecosystem of clothing that transitions
              seamlessly across the moments that define your day.
            </p>
            <p className="text-[15px] sm:text-[16px] leading-[1.9]" style={{ color: 'var(--ink-soft)' }}>
              Whether it is the draped sophistication of our modest pieces or the
              tailored ease of our everyday essentials, LJ brings together Softness and
              Statement — proving that understated design often speaks the loudest.
            </p>
          </div>
        </section>

        {/* PULL QUOTE — visual break between vision and founder */}
        <section className="py-[80px] sm:py-[120px] px-[6vw] text-center max-w-[800px] mx-auto">
          <p
            className="lj-heading italic text-[clamp(24px,3.2vw,40px)] leading-[1.4]"
            style={{ color: 'var(--ink)' }}
          >
            &ldquo;True style isn&apos;t about doing too much. It&apos;s about the
            effortless confidence that comes when your clothing simply works.&rdquo;
          </p>
        </section>

        {/* MEET THE FOUNDER */}
        <section className="py-[60px] sm:py-[80px] px-[6vw] max-w-[720px] mx-auto">
          <span className="lj-eyebrow block mb-4">Meet the Founder</span>
          <h2 className="lj-heading text-[clamp(28px,3.6vw,44px)] leading-[1.15] mb-8 font-normal">
            Linda Joweigha
          </h2>

          {/* Founder quote — emphasized */}
          <blockquote
            className="border-l-2 pl-6 mb-10"
            style={{ borderColor: 'var(--taupe)' }}
          >
            <p
              className="lj-heading italic text-[clamp(20px,2.6vw,28px)] leading-[1.5] mb-3"
              style={{ color: 'var(--ink)' }}
            >
              &ldquo;Getting dressed should never feel like a performance. It should feel
              like coming home to yourself.&rdquo;
            </p>
            <footer className="text-[12px] tracking-[0.22em] uppercase" style={{ color: 'var(--taupe)' }}>
              — Linda Joweigha, Founder &amp; Creative Director
            </footer>
          </blockquote>

          <div className="space-y-5">
            <p className="text-[15px] sm:text-[16px] leading-[1.9]" style={{ color: 'var(--ink-soft)' }}>
              For Linda Joweigha, fashion has never been merely about garments; it has
              always been about how clothing makes you inhabit your space.
            </p>
            <p className="text-[15px] sm:text-[16px] leading-[1.9]" style={{ color: 'var(--ink-soft)' }}>
              Growing up with a sharp eye for clean lines, tactile textiles, and
              functional design, Linda watched how people&apos;s posture and presence
              shifted when they wore something that truly fit their lives. Yet, she saw a
              gap in the modern landscape: a lack of versatile, high-quality wardrobes
              that honored diverse lifestyle needs — from family life and professional
              demands to refined modest aesthetics — without sacrificing contemporary
              taste.
            </p>
            <p className="text-[15px] sm:text-[16px] leading-[1.9]" style={{ color: 'var(--ink-soft)' }}>
              Driven by a passion to simplify elegance, Linda built LJ Fashion from the
              ground up. As Creative Director, she oversees every design decision with a
              clear mandate: prioritize how it feels, respect how it wears, and ensure it
              lasts.
            </p>
            <p className="text-[15px] sm:text-[16px] leading-[1.9]" style={{ color: 'var(--ink-soft)' }}>
              For Linda, LJ isn&apos;t just a label — it is an invitation to slow down,
              curate with purpose, and embrace a lifestyle of effortless grace.
            </p>
          </div>
        </section>

        {/* CLOSING CTA */}
        <section className="py-[80px] sm:py-[120px] px-[6vw] text-center">
          <span className="lj-script block mb-3 text-[clamp(32px,5vw,56px)]" style={{ color: 'var(--ink)' }}>
            Timeless. Effortless. Intentional.
          </span>
          <h2
            className="text-[clamp(18px,2.4vw,26px)] tracking-[0.14em] font-normal mb-6 uppercase"
            style={{ fontFamily: 'var(--font-jost)' }}
          >
            That&apos;s LJ.
          </h2>
          <Link
            href="/#bestsellers"
            className="inline-block px-[36px] sm:px-[42px] py-4 border border-current text-[11px] tracking-[0.24em] sm:tracking-[0.26em] uppercase hover:bg-[var(--ink)] hover:text-[var(--cream)] transition-all"
            style={{ color: 'var(--ink)' }}
          >
            Explore the Collection
          </Link>
        </section>
      </div>

      {/* FOOTER */}
      <footer
        className="relative z-10 text-center pt-[48px] pb-[30px] px-[6vw]"
        style={{ background: 'var(--ink)', color: '#DCD3C2' }}
      >
        <div className="mx-auto mb-5 flex items-center justify-center">
          <LjLogo variant="light" size={44} alt="LJ Fashion" />
        </div>
        <div className="text-[11px] tracking-[0.08em]" style={{ color: '#8A8072' }}>
          © 2026 LJ Fashion. Designed beyond the trend.
        </div>
      </footer>
    </main>
  );
}
