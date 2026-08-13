import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
  images: {
    // Allow optimization of all image formats
    formats: ["image/avif", "image/webp"],
    // Device sizes used by next/image — these are the breakpoints at which
    // images are generated. Higher values = sharper images on large screens.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    // Image sizes (smaller breakpoints)
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    // Allowed quality values used by next/image components
    qualities: [75, 90, 100],
    // Minimum cache TTL in seconds (60 days)
    minimumCacheTTL: 5184000,
  },
  // Security headers — enforce that NO external assets are loaded by the
  // browser. Everything (fonts, images, scripts, styles) must come from
  // the same origin. External links (Instagram, TikTok, WhatsApp) still
  // work because they navigate the user away (target=_blank), they don't
  // load resources into our page.
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // Content-Security-Policy — the core rule.
          // - default-src 'self': only load anything from our own origin
          // - script-src 'self': no third-party scripts
          // - style-src 'self' 'unsafe-inline': our own CSS + inline styles
          //   (Tailwind/CSS-in-JS needs unsafe-inline)
          // - img-src 'self' data:: only our images + data: URIs (next/image uses these)
          // - font-src 'self': only our self-hosted fonts in /fonts/
          // - connect-src 'self': no third-party API calls from the client
          // - media-src 'self': no third-party audio/video
          // - frame-src 'none': no iframes
          // - object-src 'none': no Flash/plugins
          // - base-uri 'self': no <base> tag hijack
          // - form-action 'self': forms can only submit to our origin
          // - navigate-to 'self' https: https://www.instagram.com https://www.tiktok.com https://wa.me:
          //   allow navigation (link clicks) to socials but block others
          //   Note: navigate-to is not yet widely supported, so social
          //   links work via target=_blank regardless.
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data:",
              "font-src 'self'",
              "connect-src 'self'",
              "media-src 'self'",
              "frame-src 'none'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
              "frame-ancestors 'none'",
              "upgrade-insecure-requests",
            ].join("; "),
          },
          // X-Content-Type-Options — prevent MIME sniffing
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          // X-Frame-Options — prevent clickjacking (also enforced by frame-ancestors)
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          // Referrer-Policy — only send origin to same-origin, strip for cross-origin
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          // Permissions-Policy — disable browser features we don't use
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=(), usb=(), magnetometer=(), gyroscope=(), accelerometer=()",
          },
          // Strict-Transport-Security — force HTTPS for 2 years (Vercel already does this)
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
