import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  // Default title template — per-page `metadata.title` exports override the
  // `default` and slot into `template` automatically.
  title: {
    default: "Interactive Pet Marketplace — Compare interactive pets and AI & robotic pets",
    template: "%s | Interactive Pet Marketplace"
  },
  description: "Compare interactive pets, plushy companions, and AI & robotic pets for seniors, families, and gift buyers. Honest comparisons, verified product data."
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
