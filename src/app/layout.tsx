import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ImageProtection } from "@/components/image-protection";

// Self-hosted fonts — loaded from /public/fonts/ so the browser never
// contacts Google Fonts (or any other CDN) at runtime. This is both a
// performance win (no third-party connection) and a security win (no
// external asset dependency).
const cormorant = localFont({
  src: [
    { path: "../../public/fonts/cormorant-garamond-300.woff2", weight: "300", style: "normal" },
    { path: "../../public/fonts/cormorant-garamond-400.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/cormorant-garamond-500.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/cormorant-garamond-400-italic.woff2", weight: "400", style: "italic" },
  ],
  variable: "--font-cormorant",
  display: "swap",
});

const jost = localFont({
  src: [
    { path: "../../public/fonts/jost-300.woff2", weight: "300", style: "normal" },
    { path: "../../public/fonts/jost-400.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/jost-500.woff2", weight: "500", style: "normal" },
  ],
  variable: "--font-jost",
  display: "swap",
});

const alexBrush = localFont({
  src: [{ path: "../../public/fonts/alex-brush-400.woff2", weight: "400", style: "normal" }],
  variable: "--font-alex-brush",
  display: "swap",
});

export const metadata: Metadata = {
  title: "LJ Fashion — Designed Beyond the Trend",
  description:
    "LJ Fashion is a women's wear brand founded by Linda Joweigha. Versatile, comfortable, timeless pieces designed beyond the trend.",
  keywords: [
    "LJ Fashion",
    "women's wear",
    "modest wear",
    "dresses",
    "accessories",
    "timeless fashion",
    "Linda Joweigha",
  ],
  authors: [{ name: "LJ Fashion" }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32.png", type: "image/png", sizes: "32x32" },
      { url: "/lj-logo-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "LJ Fashion — Designed Beyond the Trend",
    description:
      "Versatile, comfortable, timeless — pieces you'll return to season after season.",
    siteName: "LJ Fashion",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "LJ Fashion — Designed Beyond the Trend",
    description:
      "Versatile, comfortable, timeless — pieces you'll return to season after season.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preload the main hero silhouette for fast LCP — this is the
            tallest, most visible image in the above-the-fold hero area. */}
        <link rel="preload" as="image" href="/silhouette-1.png" fetchPriority="high" />

        {/* Link to llms.txt — helps AI crawlers discover the AI-friendly
            context file at /llms.txt */}
        <link rel="llms-txt" href="/llms.txt" type="text/plain" />

        {/* JSON-LD structured data — helps Google and other search engines
            understand the organization, its products, and contact points */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "LJ Fashion",
              alternateName: "LJ Fashion — Designed Beyond the Trend",
              url: "https://ljfashion.cv",
              description:
                "A women's wear fashion brand founded by Linda Joweigha, specializing in timeless, versatile, and effortlessly elegant pieces.",
              founder: {
                "@type": "Person",
                name: "Linda Joweigha",
                jobTitle: "Founder & Creative Director",
              },
              foundingLocation: {
                "@type": "Place",
                name: "Lagos, Nigeria",
              },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Lagos",
                addressCountry: "NG",
              },
              sameAs: [
                "https://www.instagram.com/lindajoweigha",
                "https://www.tiktok.com/@lindajoweigha",
              ],
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  contactType: "sales",
                  telephone: "+2348131148006",
                  availableLanguage: ["English"],
                },
              ],
              makesOffer: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Product",
                    name: "The Layered Asymmetrical Top",
                    category: "Women's Clothing",
                  },
                  price: "42000",
                  priceCurrency: "NGN",
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Product",
                    name: "The Black Shirt Dress",
                    category: "Women's Clothing",
                  },
                  price: "38500",
                  priceCurrency: "NGN",
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Product",
                    name: "The Pink Striped Kaftan",
                    category: "Women's Clothing",
                  },
                  price: "36000",
                  priceCurrency: "NGN",
                },
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${cormorant.variable} ${jost.variable} ${alexBrush.variable} antialiased`}
      >
        {/* Image download protection — blocks right-click on images, drag-to-
            desktop, and common save/devtools shortcuts site-wide. */}
        <ImageProtection />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
