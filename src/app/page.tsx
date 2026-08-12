'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { LjLogo } from '@/components/lj-logo';

export default function Home() {
  // Mobile nav toggle
  const [menuOpen, setMenuOpen] = useState(false);

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
      label: 'Dresses',
      img: '/cat-dresses.jpg',
      alt: 'Pink maxi dresses and kaftans on hangers',
    },
    {
      label: 'Modest Wear',
      img: '/cat-modest-wear.jpg',
      alt: 'Model in powder blue kaftan with white wide-leg trousers',
    },
    {
      label: 'Occasion Wear',
      img: '/cat-occasion-wear.jpg',
      alt: 'Yellow eyelet lace dress with rhinestone detailing on hanger',
    },
    {
      label: 'Bottoms',
      img: '/cat-bottoms.jpg',
      alt: 'Wide-leg trousers in burgundy, white, and patterned blue on hangers',
    },
  ];

  return (
    <main className="bg-background text-foreground min-h-screen">
      {/* NAV — overlays hero (dark image) so use the LIGHT logo variant.
          mix-blend-difference keeps it readable on any backdrop.
          Mobile: hamburger toggles a dropdown panel. */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-[5vw] py-[18px] sm:py-[26px] text-white mix-blend-difference">
        <div
          className="flex items-center gap-2 sm:gap-3 text-[13px] sm:text-[15px] tracking-[0.3em] sm:tracking-[0.35em]"
          style={{ fontFamily: 'var(--font-jost)' }}
        >
          <LjLogo variant="light" size={32} alt="LJ Fashion" />
          <span>LJ&nbsp;FASHION</span>
        </div>
        {/* Desktop nav */}
        <div className="hidden md:flex gap-9 text-xs tracking-[0.18em] uppercase">
          <a href="#bestsellers" className="opacity-85 hover:opacity-100 transition-opacity">
            Bestsellers
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
        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden flex flex-col justify-center items-end gap-[5px] p-2 -mr-2"
        >
          <span
            className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? 'translate-y-[6px] rotate-45' : ''}`}
          />
          <span
            className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block w-6 h-px bg-white transition-all duration-300 ${menuOpen ? '-translate-y-[6px] -rotate-45' : ''}`}
          />
        </button>
      </nav>
      {/* Mobile dropdown panel */}
      {menuOpen && (
        <div
          className="md:hidden fixed top-[60px] left-0 right-0 z-40 bg-[var(--ink)]/95 backdrop-blur-sm text-white py-6 px-[5vw]"
          style={{ background: 'rgba(28,25,23,0.96)' }}
        >
          <div className="flex flex-col gap-5 text-sm tracking-[0.18em] uppercase">
            <a href="#bestsellers" onClick={() => setMenuOpen(false)} className="opacity-85 hover:opacity-100">Bestsellers</a>
            <a href="#shop" onClick={() => setMenuOpen(false)} className="opacity-85 hover:opacity-100">Shop</a>
            <a href="#story" onClick={() => setMenuOpen(false)} className="opacity-85 hover:opacity-100">Our Story</a>
            <a href="#contact" onClick={() => setMenuOpen(false)} className="opacity-85 hover:opacity-100">Contact</a>
          </div>
        </div>
      )}

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

        {/* BOLD LJ LOGO WATERMARK — large, right-side on desktop; smaller
            and centered behind the hero text on mobile so it doesn't crowd
            the headline. Dark radial backdrop + double drop-shadow make the
            thin-line monogram read as bold. */}
        <div
          className="absolute z-[1] pointer-events-none flex items-center justify-center
                     right-[5vw] top-1/2 -translate-y-1/2
                     max-md:right-auto max-md:top-[42%] max-md:left-1/2 max-md:-translate-x-1/2 max-md:-translate-y-1/2"
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
              logo's actual stroke pixels (not the bounding box).
              Mobile: smaller and lower opacity so it sits as a watermark behind
              the hero text without competing for attention. */}
          <div
            style={{
              filter:
                'drop-shadow(0 4px 18px rgba(0,0,0,0.55)) drop-shadow(0 1px 4px rgba(0,0,0,0.45))',
            }}
            className="relative flex items-center justify-center max-md:opacity-60"
          >
            <LjLogo
              variant="light"
              size={280}
              alt=""
              className="w-[clamp(140px,22vw,340px)] h-[clamp(140px,22vw,340px)] max-md:w-[clamp(180px,55vw,260px)] max-md:h-[clamp(180px,55vw,260px)]"
            />
          </div>
        </div>

        {/* Hero text — z-[3] so it sits above the watermark on mobile */}
        <div className="relative z-[3] w-full px-[5vw] pb-[60px] sm:pb-[68px] text-white flex flex-col items-start gap-[14px] sm:gap-[18px] max-w-[640px]">
          <span className="lj-eyebrow" style={{ color: '#EFE6D4' }}>
            Designed Beyond the Trend
          </span>
          <h1
            className="lj-heading text-[clamp(34px,7vw,84px)] leading-[1.05] max-w-[900px] font-normal"
          >
            Your wardrobe,
            <br />
            working for you.
          </h1>
          <p
            className="text-[14px] sm:text-[15px] leading-[1.7] max-w-[420px] font-light"
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
      <section className="lj-fade-up py-[80px] sm:py-[120px] px-[5vw] pb-[70px] sm:pb-[100px] grid gap-7 sm:gap-9 max-w-[760px] mx-auto text-center">
        <h2
          className="text-[clamp(26px,3.4vw,40px)] leading-[1.35] font-normal italic"
          style={{ fontFamily: 'var(--font-cormorant)', color: 'var(--ink-soft)' }}
        >
          &ldquo;We believe getting dressed should feel effortless — never a compromise
          between comfort and style.&rdquo;
        </h2>
        <div
          className="flex justify-center items-center gap-[14px] sm:gap-[22px] text-[10px] sm:text-[11px] tracking-[0.24em] sm:tracking-[0.28em] uppercase flex-wrap"
          style={{ color: 'var(--taupe)' }}
        >
          <span>Quality</span>
          <span style={{ color: 'var(--line)' }}>•</span>
          <span>Comfort</span>
          <span style={{ color: 'var(--line)' }}>•</span>
          <span>Timeless Design</span>
        </div>
      </section>

      {/* BESTSELLERS — editorial 2-image layout with real product photography.
          Both images have been pre-treated with a warm cream edge blend so
          their white studio backgrounds harmonize with the cream theme.
          Layout: text left, 2-image grid right (stacked on mobile). */}
      <section
        id="bestsellers"
        className="lj-fade-up relative grid grid-cols-1 min-h-[78vh] md:grid-cols-[0.85fr_1.15fr]"
      >
        <div
          className="flex flex-col justify-center gap-5 py-[48px] sm:py-[64px] px-[8%] order-2 md:order-1"
          style={{ background: 'var(--cream-deep)' }}
        >
          <span className="lj-eyebrow">Fan Favorites</span>
          <h2 className="lj-heading text-[clamp(28px,3.6vw,48px)]">Bestsellers</h2>
          <p className="text-[14px] sm:text-[14.5px] leading-[1.8] max-w-[340px]" style={{ color: 'var(--ink-soft)' }}>
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
        {/* 3-image editorial grid — each tile is a hover group with
            a slow scale zoom + cream gradient overlays (top & bottom)
            for a magazine-print finish. Desktop: 3 equal columns.
            Mobile: 2 columns with the 3rd image spanning full width
            below for an editorial asymmetric feel. */}
        <div className="relative order-1 md:order-2 grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-3 p-4 sm:p-6 md:p-8" style={{ background: 'var(--cream)' }}>
          {/* Image 1 */}
          <a
            href="#shop"
            className="group relative overflow-hidden col-span-1 min-h-[340px] sm:min-h-[480px] md:min-h-[560px] block"
            aria-label="View bestseller — layered asymmetrical top with striped shirt"
          >
            <Image
              src="/bestseller-1.jpg"
              alt="LJ bestseller — layered asymmetrical top with striped shirt"
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover object-center transition-transform duration-[900ms] ease-out group-hover:scale-105"
              priority={false}
            />
            {/* Top cream fade — magazine-print effect, intensifies on hover */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-[22%] opacity-70 transition-opacity duration-500 group-hover:opacity-90"
              style={{ background: 'linear-gradient(180deg, var(--cream) 0%, rgba(248,243,234,0) 100%)' }}
              aria-hidden="true"
            />
            {/* Bottom cream-deep fade — grounds the image, intensifies on hover */}
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[28%] opacity-60 transition-opacity duration-500 group-hover:opacity-85"
              style={{ background: 'linear-gradient(0deg, var(--cream-deep) 0%, rgba(241,233,219,0) 100%)' }}
              aria-hidden="true"
            />
            {/* Hover "View" affordance — fades + lifts in on hover */}
            <div className="pointer-events-none absolute inset-0 flex items-end justify-center pb-6 opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
              <span className="text-[10px] tracking-[0.32em] uppercase text-[var(--ink)] bg-[var(--cream)]/85 px-4 py-2 backdrop-blur-sm" style={{ background: 'rgba(248,243,234,0.88)' }}>
                View Piece
              </span>
            </div>
          </a>
          {/* Image 2 */}
          <a
            href="#shop"
            className="group relative overflow-hidden col-span-1 min-h-[340px] sm:min-h-[480px] md:min-h-[560px] block"
            aria-label="View bestseller — long black button-up shirt dress with wide-leg trousers"
          >
            <Image
              src="/bestseller-2.jpg"
              alt="LJ bestseller — long black button-up shirt dress with wide-leg trousers"
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover object-center transition-transform duration-[900ms] ease-out group-hover:scale-105"
              priority={false}
            />
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-[22%] opacity-70 transition-opacity duration-500 group-hover:opacity-90"
              style={{ background: 'linear-gradient(180deg, var(--cream) 0%, rgba(248,243,234,0) 100%)' }}
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[28%] opacity-60 transition-opacity duration-500 group-hover:opacity-85"
              style={{ background: 'linear-gradient(0deg, var(--cream-deep) 0%, rgba(241,233,219,0) 100%)' }}
              aria-hidden="true"
            />
            <div className="pointer-events-none absolute inset-0 flex items-end justify-center pb-6 opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
              <span className="text-[10px] tracking-[0.32em] uppercase text-[var(--ink)] bg-[var(--cream)]/85 px-4 py-2 backdrop-blur-sm" style={{ background: 'rgba(248,243,234,0.88)' }}>
                View Piece
              </span>
            </div>
          </a>
          {/* Image 3 — spans full width on mobile (col-span-2) for editorial
              asymmetry; single column on desktop like the others */}
          <a
            href="#shop"
            className="group relative overflow-hidden col-span-2 md:col-span-1 min-h-[340px] sm:min-h-[400px] md:min-h-[560px] block"
            aria-label="View bestseller — pink striped kaftan maxi dress"
          >
            <Image
              src="/bestseller-3.jpg"
              alt="LJ bestseller — pink striped kaftan maxi dress with side slits"
              fill
              sizes="(max-width: 768px) 100vw, 25vw"
              className="object-cover object-center transition-transform duration-[900ms] ease-out group-hover:scale-105"
              priority={false}
            />
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-[22%] opacity-70 transition-opacity duration-500 group-hover:opacity-90"
              style={{ background: 'linear-gradient(180deg, var(--cream) 0%, rgba(248,243,234,0) 100%)' }}
              aria-hidden="true"
            />
            <div
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[28%] opacity-60 transition-opacity duration-500 group-hover:opacity-85"
              style={{ background: 'linear-gradient(0deg, var(--cream-deep) 0%, rgba(241,233,219,0) 100%)' }}
              aria-hidden="true"
            />
            <div className="pointer-events-none absolute inset-0 flex items-end justify-center pb-6 opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
              <span className="text-[10px] tracking-[0.32em] uppercase text-[var(--ink)] bg-[var(--cream)]/85 px-4 py-2 backdrop-blur-sm" style={{ background: 'rgba(248,243,234,0.88)' }}>
                View Piece
              </span>
            </div>
          </a>
        </div>
      </section>

      {/* FIND YOUR SIGNATURE */}
      <section id="shop" className="lj-fade-up py-[80px] sm:py-[120px] px-[5vw] text-center">
        <span className="lj-eyebrow block mb-3.5">Shop LJ</span>
        <h2 className="lj-heading text-[clamp(28px,4vw,52px)] mb-4">Find Your Signature.</h2>
        <p
          className="max-w-[480px] mx-auto mb-10 sm:mb-16 text-[14px] sm:text-[14.5px] leading-[1.8] px-2"
          style={{ color: 'var(--ink-soft)' }}
        >
          Explore our collection of thoughtfully selected pieces, designed for effortless
          everyday style.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-7 max-w-[920px] mx-auto">
          {categories.map((cat) => (
            <a key={cat.label} href="#bestsellers" className="flex flex-col items-center gap-5 group">
              {/* Circular image tile — real product photo with object-cover.
                  Subtle inner ring + slow scale zoom on hover for editorial feel.
                  A soft cream edge vignette is baked into the image so the
                  photo blends into any background. */}
              <div
                className="w-full aspect-square rounded-full relative overflow-hidden border transition-all duration-500 group-hover:scale-[1.04] shadow-[0_2px_18px_rgba(28,25,23,0.06)]"
                style={{ borderColor: 'var(--line)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--taupe)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--line)';
                }}
              >
                <Image
                  src={cat.img}
                  alt={cat.alt}
                  fill
                  sizes="(max-width: 768px) 45vw, 22vw"
                  className="object-cover object-center transition-transform duration-[900ms] ease-out group-hover:scale-[1.08]"
                  priority={false}
                />
                {/* Inner cream ring — keeps the circular edge crisp against the photo */}
                <div
                  className="pointer-events-none absolute inset-0 rounded-full"
                  style={{ boxShadow: 'inset 0 0 0 1px rgba(248,243,234,0.4)' }}
                  aria-hidden="true"
                />
              </div>
              <span
                className="text-[11px] sm:text-xs tracking-[0.2em] sm:tracking-[0.22em] uppercase transition-colors duration-300 group-hover:text-[var(--ink)]"
                style={{ color: 'var(--ink-soft)' }}
              >
                {cat.label}
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* OUR PROMISE — dark interstitial with subtle embossed LJ watermark
          behind the content. Watermark is large, low-opacity, and centered
          so it reads as a textured brand mark rather than a focal element. */}
      <section className="lj-fade-up relative min-h-[64vh] flex items-center justify-center text-center text-white py-[80px] sm:py-[100px] px-[6vw] overflow-hidden">
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
        {/* Subtle embossed LJ watermark — large, behind content, very low opacity */}
        <div
          className="absolute z-[1] pointer-events-none flex items-center justify-center inset-0"
          aria-hidden="true"
        >
          <div
            style={{
              filter:
                'drop-shadow(0 2px 12px rgba(0,0,0,0.4))',
            }}
            className="relative flex items-center justify-center opacity-[0.10]"
          >
            <LjLogo
              variant="light"
              size={420}
              alt=""
              className="w-[clamp(280px,40vw,520px)] h-[clamp(280px,40vw,520px)] max-w-[80vw] max-h-[80vh]"
            />
          </div>
        </div>
        <div className="relative z-[2] max-w-[600px] px-2">
          <span className="lj-eyebrow" style={{ color: '#C9B896' }}>
            Our Promise
          </span>
          <h2 className="lj-heading text-[clamp(26px,3.8vw,46px)] my-[16px] sm:my-[18px] mx-0 font-normal leading-[1.15]">
            Every LJ piece is selected or designed with intention.
          </h2>
          <p className="text-[14px] sm:text-[14.5px] leading-[1.85] mb-7 px-2" style={{ color: '#EAE1CF' }}>
            We care about how it looks, how it feels, and how easily it becomes part of
            your wardrobe.
          </p>
          <p className="lj-heading italic text-[18px] sm:text-[19px] leading-[1.7]">
            <b className="font-medium not-italic">Timeless. Effortless. Intentional.</b>
            <br />
            That&apos;s LJ.
          </p>
        </div>
      </section>

      {/* STORY TEASER */}
      <section
        id="story"
        className="lj-fade-up grid grid-cols-1 min-h-[60vh] sm:min-h-[70vh] md:grid-cols-2"
      >
        <div
          className="min-h-[300px] sm:min-h-[380px]"
          style={{ background: 'linear-gradient(135deg,#E3D6BE,#B7A180 55%,#75634B)' }}
          role="img"
          aria-label="Founder portrait, editorial style"
        />
        <div
          className="flex flex-col justify-center gap-[16px] sm:gap-[18px] py-[56px] sm:py-[70px] px-[8%]"
          style={{ background: 'var(--cream)' }}
        >
          <span className="lj-eyebrow">Our Story</span>
          <h2 className="lj-heading text-[clamp(26px,3.4vw,44px)] leading-[1.15]">
            Where soft meets statement.
          </h2>
          <p className="text-[14px] sm:text-[14.5px] leading-[1.85] max-w-[420px]" style={{ color: 'var(--ink-soft)' }}>
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

      {/* CLOSING — bold LJ watermark behind the call-to-action, matching
          the hero treatment. Watermark sits behind the text content with a
          dark radial spotlight for contrast. */}
      <section className="lj-fade-up relative min-h-[78vh] sm:min-h-[88vh] flex items-center justify-center text-center overflow-hidden">
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
        {/* Bold LJ watermark — centered, with dark radial backdrop */}
        <div
          className="absolute z-[1] pointer-events-none flex items-center justify-center inset-0"
          aria-hidden="true"
        >
          <div
            className="absolute"
            style={{
              width: 'clamp(260px,42vw,560px)',
              height: 'clamp(260px,42vw,560px)',
              borderRadius: '50%',
              background:
                'radial-gradient(circle, rgba(20,16,12,0.45) 0%, rgba(20,16,12,0.22) 50%, rgba(20,16,12,0) 72%)',
            }}
          />
          <div
            style={{
              filter:
                'drop-shadow(0 4px 18px rgba(0,0,0,0.55)) drop-shadow(0 1px 4px rgba(0,0,0,0.45))',
            }}
            className="relative flex items-center justify-center opacity-90"
          >
            <LjLogo
              variant="light"
              size={320}
              alt=""
              className="w-[clamp(180px,30vw,400px)] h-[clamp(180px,30vw,400px)] max-w-[70vw] max-h-[60vh]"
            />
          </div>
        </div>
        <div className="relative z-[2] text-white px-[6vw]">
          <span className="lj-script block mb-1.5 text-[clamp(32px,6vw,68px)]">
            Your style. Your story.
          </span>
          <h2
            className="text-[clamp(18px,2.6vw,28px)] tracking-[0.14em] font-normal mb-[18px] uppercase"
            style={{ fontFamily: 'var(--font-jost)' }}
          >
            Your LJ.
          </h2>
          <p className="text-[14px] sm:text-[14.5px] mb-[30px] sm:mb-[34px]" style={{ color: '#F2EADA' }}>
            Discover pieces made to become part of your everyday story.
          </p>
          <a
            href="#shop"
            className="inline-block px-[36px] sm:px-[42px] py-4 border border-white text-[11px] tracking-[0.24em] sm:tracking-[0.26em] uppercase hover:bg-white hover:text-[var(--ink)] transition-all"
          >
            Shop LJ Fashion
          </a>
        </div>
      </section>

      {/* FOOTER — dark ink background → use the LIGHT logo variant */}
      <footer
        id="contact"
        className="text-center pt-[48px] sm:pt-[60px] pb-[30px] px-[6vw]"
        style={{ background: 'var(--ink)', color: '#DCD3C2' }}
      >
        <div className="mx-auto mb-5 flex items-center justify-center">
          <LjLogo variant="light" size={44} alt="LJ Fashion" />
        </div>
        <div
          className="flex justify-center gap-x-6 gap-y-3 flex-wrap text-[10px] sm:text-[11px] tracking-[0.2em] uppercase mb-[26px] max-w-[600px] mx-auto"
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
