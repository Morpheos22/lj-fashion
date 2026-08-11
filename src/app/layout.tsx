import type { Metadata } from "next";
import { Cormorant_Garamond, Jost, Alex_Brush } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  style: ["normal", "italic"],
});

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const alexBrush = Alex_Brush({
  variable: "--font-alex-brush",
  subsets: ["latin"],
  weight: ["400"],
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
      <body
        className={`${cormorant.variable} ${jost.variable} ${alexBrush.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
