import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { getProductBySlug, getAllProductSlugs, products } from '@/lib/products';
import { LjLogo } from '@/components/lj-logo';
import { ProductImageZoom } from '@/components/product-image-zoom';

export async function generateStaticParams() {
  return getAllProductSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: 'Product not found — LJ Fashion' };
  return {
    title: `${product.name} — LJ Fashion | Bespoke Women's Fashion Abuja`,
    description: `${product.tagline} Bespoke, made to order in Abuja, Nigeria.`,
    openGraph: {
      title: `${product.name} — LJ Fashion | Bespoke Women's Fashion Abuja`,
      description: `${product.tagline} Bespoke, made to order in Abuja, Nigeria.`,
      type: 'website',
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  // Find next product for "next piece" navigation
  const currentIndex = products.findIndex((p) => p.slug === slug);
  const nextProduct = products[(currentIndex + 1) % products.length];

  return (
    <main className="bg-background text-foreground min-h-screen">
      {/* Simple nav for product page */}
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
            href="/#bestsellers"
            className="text-[11px] tracking-[0.24em] uppercase text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors border-b border-current pb-0.5"
          >
            ← Back to Bestsellers
          </Link>
        </div>
      </nav>

      {/* Product detail */}
      <section className="grid grid-cols-1 md:grid-cols-2 min-h-[80vh]">
        {/* Image — left on desktop, top on mobile. Uses the ProductImageZoom
            client component which opens a full-screen zoom modal on click.
            Inside the modal: click toggles fit/100% zoom, drag to pan when
            zoomed, mouse wheel adjusts zoom, Escape closes. */}
        <div className="relative min-h-[60vh] md:min-h-[80vh] overflow-hidden order-1 flex items-center justify-center p-6 sm:p-10 md:p-14" style={{ background: 'var(--cream-deep)' }}>
          <ProductImageZoom src={product.image} alt={product.imageAlt} />
        </div>

        {/* Details — right on desktop, below image on mobile */}
        <div className="flex flex-col justify-start gap-6 py-[48px] sm:py-[64px] px-[8%] order-2">
          <div>
            <span className="lj-eyebrow block mb-3">{product.eyebrow}</span>
            <h1 className="lj-heading text-[clamp(28px,3.6vw,44px)] leading-[1.1] mb-3">
              {product.name}
            </h1>
            <p className="lj-heading italic text-[18px] sm:text-[20px] leading-[1.5]" style={{ color: 'var(--ink-soft)' }}>
              {product.tagline}
            </p>
            <p className="mt-5 text-[15px] tracking-[0.05em]" style={{ color: 'var(--ink)' }}>
              <span style={{ fontFamily: 'var(--font-jost)' }}>{product.currency}</span> {product.price}
            </p>
          </div>

          {/* Description */}
          <div className="space-y-4">
            {product.description.map((para, i) => (
              <p key={i} className="text-[14px] sm:text-[14.5px] leading-[1.85]" style={{ color: 'var(--ink-soft)' }}>
                {para}
              </p>
            ))}
          </div>

          {/* Details list */}
          <div>
            <h2 className="text-[11px] tracking-[0.28em] uppercase mb-3" style={{ color: 'var(--taupe)' }}>
              The Details
            </h2>
            <ul className="space-y-2">
              {product.details.map((detail, i) => (
                <li key={i} className="text-[13.5px] leading-[1.7] flex gap-3" style={{ color: 'var(--ink-soft)' }}>
                  <span className="mt-[7px] block w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'var(--taupe)' }} />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Fabric */}
          <div>
            <h2 className="text-[11px] tracking-[0.28em] uppercase mb-2" style={{ color: 'var(--taupe)' }}>
              Fabric
            </h2>
            <p className="text-[13.5px] leading-[1.8]" style={{ color: 'var(--ink-soft)' }}>
              {product.fabric}
            </p>
          </div>

          {/* Care */}
          <div>
            <h2 className="text-[11px] tracking-[0.28em] uppercase mb-3" style={{ color: 'var(--taupe)' }}>
              Care
            </h2>
            <ul className="space-y-1.5">
              {product.care.map((item, i) => (
                <li key={i} className="text-[13.5px] leading-[1.7] flex gap-3" style={{ color: 'var(--ink-soft)' }}>
                  <span className="mt-[7px] block w-1 h-1 rounded-full flex-shrink-0" style={{ background: 'var(--taupe)' }} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Sizing */}
          <div>
            <h2 className="text-[11px] tracking-[0.28em] uppercase mb-2" style={{ color: 'var(--taupe)' }}>
              Sizing &amp; Fit
            </h2>
            <p className="text-[13.5px] leading-[1.8]" style={{ color: 'var(--ink-soft)' }}>
              {product.sizing}
            </p>
          </div>

          {/* Styling */}
          <div>
            <h2 className="text-[11px] tracking-[0.28em] uppercase mb-2" style={{ color: 'var(--taupe)' }}>
              Styling Notes
            </h2>
            <p className="text-[13.5px] leading-[1.8]" style={{ color: 'var(--ink-soft)' }}>
              {product.styling}
            </p>
          </div>

          {/* CTA */}
          <div className="pt-4 border-t border-[var(--line)]">
            <a
              href={`https://wa.me/2348131148006?text=${encodeURIComponent(`Hi LJ Fashion, I'd like to enquire about "${product.name}".`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 text-[11px] tracking-[0.28em] uppercase border border-current transition-all hover:bg-[var(--ink)] hover:text-[var(--cream)]"
              style={{ color: 'var(--ink)' }}
            >
              Enquire to Purchase
              <span>→</span>
            </a>
            <p className="mt-4 text-[12px] leading-[1.7]" style={{ color: 'var(--taupe)' }}>
              Each LJ piece is bespoke, made to order in our Abuja atelier. Tap to chat with us on WhatsApp — please allow 7–10 business days for production and shipping within Nigeria (Abuja, FCT, and nationwide).
            </p>
          </div>
        </div>
      </section>

      {/* Next piece navigation */}
      <section className="border-t border-[var(--line)] py-16 px-[8%] text-center">
        <span className="lj-eyebrow block mb-4">Continue Exploring</span>
        <Link
          href={`/products/${nextProduct.slug}`}
          className="group inline-flex flex-col items-center gap-2"
        >
          <span className="lj-heading text-[clamp(24px,3vw,36px)] transition-colors group-hover:text-[var(--taupe)]">
            Next: {nextProduct.name}
          </span>
          <span className="text-[11px] tracking-[0.28em] uppercase opacity-60 group-hover:opacity-100 transition-opacity">
            →
          </span>
        </Link>
      </section>

      {/* Footer (minimal, matching homepage footer) */}
      <footer
        className="text-center pt-[48px] pb-[30px] px-[6vw]"
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
