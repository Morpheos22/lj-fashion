import Image from 'next/image';

type LogoVariant = 'dark' | 'light';

interface LjLogoProps {
  /**
   * Which ink color to use.
   * - `dark`  → for light backgrounds (cream hero text overlay, footer-on-cream, etc.)
   * - `light` → for dark backgrounds (nav over hero, dark footer)
   */
  variant?: LogoVariant;
  /** Pixel size for both width and height — logo is square. Default: 30. */
  size?: number;
  /** Optional alt text. Defaults to "LJ Fashion logo". */
  alt?: string;
  /** Optional className for fine-grained layout tweaks. */
  className?: string;
}

/**
 * Single source of truth for the LJ Fashion logo mark.
 * Uses the real LJ circular monogram assets from /public.
 * - `lj-logo-dark.png`  — dark ink, transparent background → use on light/cream surfaces
 * - `lj-logo-light.png` — light ink, transparent background → use on dark surfaces
 */
export function LjLogo({
  variant = 'dark',
  size = 30,
  alt = 'LJ Fashion logo',
  className,
}: LjLogoProps) {
  const src = variant === 'light' ? '/lj-logo-light.png' : '/lj-logo-dark.png';
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={className}
      priority={false}
    />
  );
}
