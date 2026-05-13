import type { MetadataRoute } from "next";

// Generates /sitemap.xml at build time.
// Update the host once you have a live domain.
const SITE_URL = "https://interactivepetmarketplace.com";

// Static pages on the site. When adding new routes, add them here too.
// changeFreq is a hint to crawlers; priority is relative weighting (1.0 = most
// important page on the site, 0.5 = average).
const ROUTES: { path: string; changeFreq: MetadataRoute.Sitemap[number]["changeFrequency"]; priority: number }[] = [
  { path: "/", changeFreq: "weekly", priority: 1.0 },
  { path: "/plushy-companions", changeFreq: "weekly", priority: 0.9 },
  { path: "/ai-robotic-pets", changeFreq: "weekly", priority: 0.9 },
  { path: "/best-for-seniors", changeFreq: "weekly", priority: 0.9 },
  { path: "/kids-and-families", changeFreq: "weekly", priority: 0.8 },
  { path: "/best-for-gifts", changeFreq: "weekly", priority: 0.8 },
  { path: "/premium-picks", changeFreq: "weekly", priority: 0.8 },
  { path: "/top-picks", changeFreq: "weekly", priority: 0.9 },
  { path: "/compare", changeFreq: "weekly", priority: 0.7 },
  { path: "/questions", changeFreq: "monthly", priority: 0.6 },
  { path: "/senior-research", changeFreq: "monthly", priority: 0.7 },
  { path: "/senior-research/summaries", changeFreq: "monthly", priority: 0.6 },
  { path: "/kids-research", changeFreq: "monthly", priority: 0.7 },
  { path: "/kids-research/summaries", changeFreq: "monthly", priority: 0.6 },
  { path: "/about", changeFreq: "monthly", priority: 0.5 },
  { path: "/contact", changeFreq: "yearly", priority: 0.4 }
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return ROUTES.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFreq,
    priority: r.priority
  }));
}
