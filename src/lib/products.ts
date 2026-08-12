/**
 * Product catalog for LJ Fashion.
 * Each product maps to a bestseller image and has a dedicated detail page
 * at /products/[slug].
 */

export interface ProductDetail {
  slug: string;
  name: string;
  eyebrow: string;
  price: string;
  currency: string;
  image: string;
  imageAlt: string;
  tagline: string;
  description: string[];
  details: string[];
  fabric: string;
  care: string[];
  sizing: string;
  styling: string;
  collection: string;
}

export const products: ProductDetail[] = [
  {
    slug: 'layered-asymmetrical-top',
    name: 'The Layered Asymmetrical Top',
    eyebrow: 'Bestseller · Editorial',
    price: '42,000',
    currency: 'NGN',
    image: '/bestseller-1.jpg',
    imageAlt:
      'Model wearing the LJ layered asymmetrical top over a blue-and-white striped shirt with pleated shorts',
    tagline: 'Architectural layering for the modern wardrobe.',
    description: [
      'A study in architectural layering, this sleeveless top is cut from a structured black fabric with an angular, extended hemline that creates a geometric overlay effect. Beneath it, a blue-and-white vertically striped shirt peeks through at the collar and cascades into an asymmetrical skirt panel — a single piece that reads as a complete, considered outfit.',
      'Designed for the woman who dresses with intention, the layered silhouette moves between boardroom and gallery opening with quiet confidence. The pleated shorts underneath provide coverage without bulk, while the extended hemline creates a dramatic line that elongates the frame.',
      'Each piece is finished by hand in our Lagos atelier, with a focus on clean seaming and fabric integrity that ensures the garment holds its shape through countless wears.',
    ],
    details: [
      'Sleeveless structured top with angular extended hemline',
      'Integrated blue-and-white striped shirt overlay',
      'Built-in pleated shorts for coverage',
      'Concealed side zip closure',
      'Fully finished seams throughout',
      'Designed and made in Lagos, Nigeria',
    ],
    fabric:
      'Top: 100% mid-weight cotton twill. Overlay: striped cotton shirting. Shorts: pleated crepe.',
    care: [
      'Dry clean recommended to preserve the structured silhouette',
      'Alternatively, hand wash cold with mild detergent',
      'Do not bleach',
      'Hang dry in shade — avoid direct sunlight',
      'Cool iron on reverse if needed',
    ],
    sizing:
      'Relaxed, oversized fit through the body. Model is 175cm and wears a size M. For a more fitted silhouette, size down.',
    styling:
      'Pair with barely-there heels and minimal gold jewellery for an editorial evening look, or layer over slim trousers and flats for a refined daytime outfit.',
    collection: 'Bestsellers',
  },
  {
    slug: 'black-shirt-dress',
    name: 'The Black Shirt Dress',
    eyebrow: 'Bestseller · Modest Wear',
    price: '38,500',
    currency: 'NGN',
    image: '/bestseller-2.jpg',
    imageAlt:
      'Model wearing the LJ long black button-up shirt dress with matching wide-leg trousers',
    tagline: 'Effortless elegance, head to toe.',
    description: [
      'A long, button-up shirt dress cut from flowing black fabric that skims the body without clinging. Paired with matching wide-leg trousers underneath, this monochromatic ensemble creates a single, unbroken line that elongates and flatters — the very definition of effortless elegance.',
      'The shirt dress features a full-length button placket that allows you to adjust the neckline from demure to relaxed, while the wide-leg trousers move with graceful volume. Together, they form a versatile foundation piece that transitions seamlessly from a formal event to a quiet dinner.',
      'The fabric is chosen for its fluid drape and soft hand — it moves when you move, catches light beautifully, and resists wrinkling through a long day of wear.',
    ],
    details: [
      'Long-sleeve button-up shirt dress, ankle-length',
      'Coordinating wide-leg trousers with elasticated waist',
      'Full-length centre-front button placket',
      'Mandarin collar with clean finish',
      'Side pockets on trousers',
      'Designed and made in Lagos, Nigeria',
    ],
    fabric:
      'Both pieces: flowing crepe with a soft matte finish — 95% polyester, 5% elastane for subtle stretch and recovery.',
    care: [
      'Machine wash cold on a gentle cycle',
      'Wash with similar colours',
      'Do not bleach',
      'Hang dry or tumble dry on low',
      'Warm iron on reverse if needed',
    ],
    sizing:
      'True to size with a relaxed fit. Model is 175cm and wears a size M. The wide-leg trousers sit high on the waist — if you are between sizes, size up for comfort.',
    styling:
      'Wear the pieces together for a monochromatic statement, or style the shirt dress alone over slim pants. Add transparent heels and statement sunglasses for a polished, editorial finish.',
    collection: 'Bestsellers',
  },
  {
    slug: 'pink-striped-kaftan',
    name: 'The Pink Striped Kaftan',
    eyebrow: 'Bestseller · Modest Wear',
    price: '36,000',
    currency: 'NGN',
    image: '/bestseller-3.jpg',
    imageAlt:
      'Model wearing the LJ pink striped kaftan maxi dress with vertical multi-colour stripe panel',
    tagline: 'Soft colour, quiet statement.',
    description: [
      'A flowing kaftan-style maxi dress in a soft pink-coral base, distinguished by a vertical multi-colour stripe panel that runs down one side. The stripe — in brown, beige, cream, and muted green — adds a quiet visual rhythm that elevates the piece beyond a simple silhouette.',
      'Cut with a relaxed, oversized body and short wide sleeves with rolled cuffs, this kaftan moves with the air. The V-neckline frames the face, while side slits at the hem allow for easy movement and a glimpse of leg when you walk. It is the kind of piece that feels as good as it looks — loose, breathable, and unfussy.',
      'The fabric is a lightweight cotton-linen blend that breathes in warm weather and drapes with a soft, lived-in quality that only improves with washing.',
    ],
    details: [
      'Kaftan-style maxi dress, ankle-length',
      'V-neckline with short wide sleeves and rolled cuffs',
      'Vertical multi-colour stripe panel on one side',
      'Side slits at the hem for movement',
      'Relaxed, oversized cut through the body',
      'Designed and made in Lagos, Nigeria',
    ],
    fabric:
      '55% cotton, 45% linen — lightweight, breathable, and soft to the touch.',
    care: [
      'Machine wash cold on a gentle cycle',
      'Wash with similar colours',
      'Do not bleach',
      'Hang dry in shade',
      'Cool iron while slightly damp for best results',
    ],
    sizing:
      'Relaxed, oversized fit — designed to drape loosely. Model is 175cm and wears a size M. The kaftan is intended to be loose; if you prefer a closer fit, size down.',
    styling:
      'Wear barefoot on the beach with stacked bangles, or dress it up with wedge sandals and a statement tote for a summer lunch. The side slits layer beautifully over slim pants.',
    collection: 'Bestsellers',
  },
];

export function getProductBySlug(slug: string): ProductDetail | undefined {
  return products.find((p) => p.slug === slug);
}

export function getAllProductSlugs(): string[] {
  return products.map((p) => p.slug);
}
