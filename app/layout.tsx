import type { Metadata } from "next";
import "./globals.css";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import FacebookPixel from "@/components/FacebookPixel";

// Update this once you have a live domain so OG/Twitter previews resolve to
// absolute URLs. Until then, social platforms still render the preview but
// will fall back to whatever host they're crawling.
const SITE_URL = "https://interactivepetmarketplace.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Interactive Pet Marketplace — Compare interactive pets and AI & robotic pets",
    template: "%s | Interactive Pet Marketplace"
  },
  description:
    "Compare interactive pets, plushy companions, and AI & robotic pets for seniors, families, and gift buyers. Honest comparisons, verified product data.",
  // Favicons / app icons
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/logo-mark.svg", type: "image/svg+xml" }
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }]
  },
  // Open Graph (Facebook, LinkedIn, Slack, iMessage, etc.)
  openGraph: {
    type: "website",
    siteName: "Interactive Pet Marketplace",
    url: SITE_URL,
    title: "Interactive Pet Marketplace — Compare interactive pets and AI & robotic pets",
    description:
      "Honest comparisons of interactive pets, plushy companions, and AI & robotic pets for seniors, families, and gift buyers.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Interactive Pet Marketplace — Compare interactive pets and AI & robotic pets"
      }
    ]
  },
  // Twitter / X
  twitter: {
    card: "summary_large_image",
    title: "Interactive Pet Marketplace",
    description:
      "Honest comparisons of interactive pets, plushy companions, and AI & robotic pets for seniors, families, and gift buyers.",
    images: ["/og-image.png"]
  }
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {children}
        <GoogleAnalytics />
        <FacebookPixel />
      </body>
    </html>
  );
}
