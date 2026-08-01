import type { MetadataRoute } from "next";

// Generates /robots.txt at build time.
// Update the host once you have a live domain.
const SITE_URL = "https://interactivepetmarketplace.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/admin/*"]
      }
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL
  };
}
