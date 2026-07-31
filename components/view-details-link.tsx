"use client";

import Link from "next/link";
import type { Product } from "./site-data";
import { PRODUCT_LINK_REL } from "./link-rel";
import { trackViewContent } from "./meta-pixel";

// Isolated as its own client component so that ProductCard / BestForCard
// (which render lots of static, server-rendered content) don't have to
// become client components just to attach one onClick handler.
export function ViewDetailsLink({
  product,
  className,
  children,
}: {
  product: Product;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={product.productUrl}
      target="_blank"
      rel={PRODUCT_LINK_REL}
      onClick={() => trackViewContent(product)}
      className={className}
    >
      {children}
    </Link>
  );
}
