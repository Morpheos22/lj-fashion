'use client';

import { useEffect } from 'react';
import { LjLogo } from '@/components/lj-logo';

export default function Home() {
  // IntersectionObserver for fade-up scroll animations (matches original design behaviour)
  useEffect(() => {
    const els = document.querySelectorAll('.lj-fade-up');
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-visible');
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const categories = [
    {
      label: 'Women',
      bg: 'radial-gradient(circle at 35% 30%,#EFE6D5,#CBB794 65%,#9A8567)',
    },
    {
      label: 'Dresses',
      bg: 'radial-gradient(circle at 65% 30%,#E9DCC5,#B49C7A 65%,#77644E)',
    },
    {
      label: 'Modest Wear',
      bg: 'radial-gradient(circle at 40% 60%,#F1E7D6,#D3C1A4 65%,#A18C6C)',
    },
    {
      label: 'Accessories',
      bg: 'radial-gradient(circle at 55% 40%,#EBDFC9,#C6B08D 65%,#8B7659)',
    },
  ];

  return (
    <main className="bg-background text-foreground min-h-screen">
      {/* NAV — overlays hero (dark image) so use the LIGHT logo variant.
          mix-blend-difference keeps it readable on any backdrop. */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[5vw] py-[26px] text-white mix-blend-difference">
        <div
          className="flex items-center gap-3 text-[15px] tracking-[0.35em]"
          style={{ fontFamily: 'var(--font-jost)' }}
        >
          <LjLogo variant="light" size={36} alt="LJ Fashion" />
          <span>LJ&nbsp;FASHION</span>
        </div>
        <div className="hidden md:flex gap-9 text-xs tracking-[0.18em] uppercase">
          <a href="#new" className="opacity-85 hover:opacity-100 transition-opacity">
            New In
          </a>
          <a href="#shop" className="opacity-85 hover:opacity-100 transition-opacity">
            Shop
          </a>
          <a href="#story" className="opacity-85 hover:opacity-100 transition-opacity">
            Our Story
          </a>
          <a href="#contact" className="opacity-85 hover:opacity-100 transition-opacity">
            Contact
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative h-screen min-h-[640px] flex items-end overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(120% 90% at 30% 10%, #EDE3D2 0%, transparent 55%), linear-gradient(160deg, #DED0B8 0%, #C7B79C 38%, #9C8A72 70%, #6E5F4E 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(0deg, rgba(20,16,12,0.55) 0%, rgba(20,16,12,0.08) 42%, transparent 70%)',
          }}
        />

        {/* BOLD LJ LOGO WATERMARK — large, right-side, with a dark radial glow
            backdrop and double drop-shadow for maximum contrast against both
            the lighter top gradient and the darker bottom overlay. The radial
            backdrop acts as a "spotlight" that makes the thin-line monogram
            read as bold and intentional. Light ink variant used because the
            hero's mid-section sits on a medium-to-dark tone. */}
        <div
          className="absolute z-[1] pointer-events-none flex items-center justify-center"
          style={{
            top: '50%',
            right: '5vw',
            transform: 'translateY(-50%)',
          }}
          aria-hidden="true"
        >
          {/* Soft dark radial backdrop — creates contrast behind the thin-line logo */}
          <div
            className="absolute"
            style={{
              width: 'clamp(220px,32vw,460px)',
              height: 'clamp(220px,32vw,460px)',
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(20,16,12,0.55) 0%, rgba(20,16,12,0.32) 45%, rgba(20,16,12,0) 72%)',
            }}
          />
          {/* The logo itself — light ink with strong drop-shadow for boldness.
              Filter is applied to the wrapper div so the shadow renders on the
              logo's actual stroke pixels (not the bounding box). */}
          <div
            style={{
              filter:
                'drop-shadow(0 4px 18px rgba(0,0,0,0.55)) drop-shadow(0 1px 4px rgba(0,0,0,0.45))',
            }}
            className="relative flex items-center justify-center"
          >
            <LjLogo
              variant="light"
              size={280}
              alt=""
              className="w-[clamp(160px,24vw,340px)] h-[clamp(160px,24vw,340px)] max-w-[40vw] max-h-[60vh]"
            />
          </div>
        </div>

        <div className="relative z-[2] w-full px-[5vw] pb-[68px] text-white flex flex-col items-start gap-[18px]">
          <span className="lj-eyebrow" style={{ color: '#EFE6D4' }}>
            Designed Beyond the Trend
          </span>
          <h1
            className="lj-heading text-[clamp(40px,7vw,84px)] leading-[1.02] max-w-[900px] font-normal"
          >
            Your wardrobe,
            <br />
            working for you.
          </h1>
          <p
            className="text-[15px] leading-[1.7] max-w-[420px] font-light"
            style={{ color: '#F2EBDD' }}
          >
            Versatile, comfortable, timeless — pieces you&apos;ll return to season after
            season.
          </p>
        </div>
        <div
          className="absolute bottom-[26px] right-[5vw] z-[2] text-white text-[11px] tracking-[0.25em] uppercase flex items-center gap-3 opacity-75"
          style={{ writingMode: 'vertical-rl' }}
        >
          Scroll
          <span className="block w-px h-[46px] bg-white opacity-60" />
        </div>
      </section>

      {/* INTRO */}
      <section className="lj-fade-up py-[120px] px-[5vw] pb-[100px] grid gap-9 max-w-[760px] mx-auto text-center">
        <h2
          className="text-[clamp(26px,3.4vw,40px)] leading-[1.35] font-normal italic"
          style={{ fontFamily: 'var(--font-cormorant)', color: 'var(--ink-soft)' }}
        >
          &ldquo;We believe getting dressed should feel effortless — never a compromise
          between comfort and style.&rdquo;
        </h2>
        <div
          className="flex justify-center items-center gap-[22px] text-[11px] tracking-[0.28em] uppercase flex-wrap"
          style={{ color: 'var(--taupe)' }}
        >
          <span>Quality</span>
          <span style={{ color: 'var(--line)' }}>•</span>
          <span>Comfort</span>
          <span style={{ color: 'var(--line)' }}>•</span>
          <span>Timeless Design</span>
        </div>
      </section>

      {/* NEW ARRIVALS */}
      <section
        id="new"
        className="lj-fade-up relative grid grid-cols-1 min-h-[78vh] md:grid-cols-[1.15fr_0.85fr]"
      >
        <div className="min-h-[420px] relative overflow-hidden">
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(150deg,#EFE6D5,#D8C6A9 45%,#B49E7E 100%)' }}
            role="img"
            aria-label="New arrivals editorial image"
          />
        </div>
        <div
          className="flex flex-col justify-center gap-5 py-[64px] px-[8%]"
          style={{ background: 'var(--cream-deep)' }}
        >
          <span className="lj-eyebrow">New In</span>
          <h2 className="lj-heading text-[clamp(30px,3.6vw,48px)]">New Arrivals</h2>
          <p className="text-[14.5px] leading-[1.8] max-w-[340px]" style={{ color: 'var(--ink-soft)' }}>
            The latest pieces to enter the LJ wardrobe — fresh silhouettes, soft fabrics,
            and refined details designed to feel as good as they look.
          </p>
          <a
            href="#shop"
            className="group mt-2.5 inline-flex items-center gap-3 text-[11px] tracking-[0.24em] uppercase border-b border-current pb-1.5 w-fit hover:tracking-[0.32em] hover:gap-4 hover:opacity-70 transition-all"
          >
            Shop New Arrivals
            <span className="inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </section>

      {/* BESTSELLERS */}
      <section className="lj-fade-up relative grid grid-cols-1 min-h-[78vh] md:grid-cols-[0.85fr_1.15fr]">
        <div
          className="flex flex-col justify-center gap-5 py-[64px] px-[8%] order-2 md:order-1"
          style={{ background: 'var(--cream-deep)' }}
        >
          <span className="lj-eyebrow">Fan Favorites</span>
          <h2 className="lj-heading text-[clamp(30px,3.6vw,48px)]">Bestsellers</h2>
          <p className="text-[14.5px] leading-[1.8] max-w-[340px]" style={{ color: 'var(--ink-soft)' }}>
            The pieces our customers keep coming back for — loved for their flattering fit,
            considered fabrics, and quiet, timeless style.
          </p>
          <a
            href="#shop"
            className="group mt-2.5 inline-flex items-center gap-3 text-[11px] tracking-[0.24em] uppercase border-b border-current pb-1.5 w-fit hover:tracking-[0.32em] hover:gap-4 hover:opacity-70 transition-all"
          >
            Shop Bestsellers
            <span className="inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
        <div className="min-h-[420px] relative overflow-hidden order-1 md:order-2">
          <div
            className="absolute inset-0"
            style={{ background: 'linear-gradient(200deg,#E7DAC4,#C3AF8F 50%,#8E7A61 100%)' }}
            role="img"
            aria-label="Bestsellers editorial image"
          />
        </div>
      </section>

      {/* FIND YOUR SIGNATURE */}
      <section id="shop" className="lj-fade-up py-[120px] px-[5vw] text-center">
        <span className="lj-eyebrow block mb-3.5">Shop LJ</span>
        <h2 className="lj-heading text-[clamp(30px,4vw,52px)] mb-4">Find Your Signature.</h2>
        <p
          className="max-w-[480px] mx-auto mb-16 text-[14.5px] leading-[1.8]"
          style={{ color: 'var(--ink-soft)' }}
        >
          Explore our collection of thoughtfully selected pieces, designed for effortless
          everyday style.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-7 max-w-[920px] mx-auto">
          {categories.map((cat) => (
            <a key={cat.label} href="#" className="flex flex-col items-center gap-5 group">
              <div
                className="w-full aspect-square rounded-full relative overflow-hidden border transition-all duration-500 group-hover:scale-[1.04]"
                style={{ background: cat.bg, borderColor: 'var(--line)' }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--taupe)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--line)')}
                role="img"
                aria-label={`${cat.label} collection`}
              />
              <span
                className="text-xs tracking-[0.22em] uppercase"
                style={{ color: 'var(--ink-soft)' }}
              >
                {cat.label}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* OUR PROMISE */}
      <section className="lj-fade-up relative min-h-[64vh] flex items-center justify-center text-center text-white py-[100px] px-[6vw]">
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(180deg,#3A342B,#1C1815 70%)' }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(60% 60% at 50% 20%, rgba(230,214,182,0.16), transparent 70%)',
          }}
        />
        <div className="relative z-[2] max-w-[600px]">
          <span className="lj-eyebrow" style={{ color: '#C9B896' }}>
            Our Promise
          </span>
          <h2 className="lj-heading text-[clamp(28px,3.8vw,46px)] my-[18px] mx-0 font-normal">
            Every LJ piece is selected or designed with intention.
          </h2>
          <p className="text-[14.5px] leading-[1.85] mb-7" style={{ color: '#EAE1CF' }}>
            We care about how it looks, how it feels, and how easily it becomes part of
            your wardrobe.
          </p>
          <p className="lj-heading italic text-[19px] leading-[1.7]">
            <b className="font-medium not-italic">Timeless. Effortless. Intentional.</b>
            <br />
            That&apos;s LJ.
          </p>
        </div>
      </section>

      {/* STORY TEASER */}
      <section
        id="story"
        className="lj-fade-up grid grid-cols-1 min-h-[70vh] md:grid-cols-2"
      >
        <div
          className="min-h-[380px]"
          style={{ background: 'linear-gradient(135deg,#E3D6BE,#B7A180 55%,#75634B)' }}
          role="img"
          aria-label="Founder portrait, editorial style"
        />
        <div
          className="flex flex-col justify-center gap-[18px] py-[70px] px-[8%]"
          style={{ background: 'var(--cream)' }}
        >
          <span className="lj-eyebrow">Our Story</span>
          <h2 className="lj-heading text-[clamp(28px,3.4vw,44px)] leading-[1.15]">
            Where soft meets statement.
          </h2>
          <p className="text-[14.5px] leading-[1.85] max-w-[420px]" style={{ color: 'var(--ink-soft)' }}>
            Founded by Linda Joweigha, LJ was created from a love for clean design,
            effortless elegance, and clothing that feels as good as it looks. Fashion should
            complement who you are — not overwhelm it.
          </p>
          <a
            href="#contact"
            className="group mt-2.5 inline-flex items-center gap-3 text-[11px] tracking-[0.24em] uppercase border-b border-current pb-1.5 w-fit hover:tracking-[0.32em] hover:gap-4 hover:opacity-70 transition-all"
          >
            Read Our Story
            <span className="inline-block transition-transform group-hover:translate-x-1">
              →
            </span>
          </a>
        </div>
      </section>

      {/* CLOSING */}
      <section className="lj-fade-up relative min-h-[88vh] flex items-center justify-center text-center overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(90% 70% at 50% 100%, rgba(255,255,255,0.12), transparent 60%), linear-gradient(160deg,#DACBAA,#B39D7A 45%,#6F5D48 90%)',
          }}
          role="img"
          aria-label="Closing full-width lifestyle image"
        />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(0deg, rgba(15,12,9,0.55), transparent 55%)' }}
        />
        <div className="relative z-[2] text-white px-[6vw]">
          <span className="lj-script block mb-1.5 text-[clamp(38px,6vw,68px)]">
            Your style. Your story.
          </span>
          <h2
            className="text-[clamp(20px,2.6vw,28px)] tracking-[0.14em] font-normal mb-[18px] uppercase"
            style={{ fontFamily: 'var(--font-jost)' }}
          >
            Your LJ.
          </h2>
          <p className="text-[14.5px] mb-[34px]" style={{ color: '#F2EADA' }}>
            Discover pieces made to become part of your everyday story.
          </p>
          <a
            href="#shop"
            className="inline-block px-[42px] py-4 border border-white text-[11px] tracking-[0.26em] uppercase hover:bg-white hover:text-[var(--ink)] transition-all"
          >
            Shop LJ Fashion
          </a>
        </div>
      </section>

      {/* FOOTER — dark ink background → use the LIGHT logo variant */}
      <footer
        id="contact"
        className="text-center pt-[60px] pb-[30px] px-[6vw]"
        style={{ background: 'var(--ink)', color: '#DCD3C2' }}
      >
        <div className="mx-auto mb-5 flex items-center justify-center">
          <LjLogo variant="light" size={48} alt="LJ Fashion" />
        </div>
        <div
          className="flex justify-center gap-8 flex-wrap text-[11px] tracking-[0.2em] uppercase mb-[26px]"
          style={{ color: '#B8AD97' }}
        >
          <a href="#shop" className="hover:text-white transition-colors">Women</a>
          <a href="#shop" className="hover:text-white transition-colors">Dresses</a>
          <a href="#shop" className="hover:text-white transition-colors">Modest Wear</a>
          <a href="#shop" className="hover:text-white transition-colors">Accessories</a>
          <a href="#story" className="hover:text-white transition-colors">Our Story</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
        <div className="text-[11px] tracking-[0.08em]" style={{ color: '#8A8072' }}>
          © 2026 LJ Fashion. Designed beyond the trend.
        </div>
      </footer>
    </main>
  );
}
