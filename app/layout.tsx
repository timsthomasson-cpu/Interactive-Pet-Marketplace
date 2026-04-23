import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "Best Smart Pets for Seniors, Families, and Gifts | Interactive Pets Marketplace",
  description: "Compare interactive pets and AI & robotic pets for seniors, families, and gift buyers."
};
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
