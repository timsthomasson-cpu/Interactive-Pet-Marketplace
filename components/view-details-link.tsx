"use client";

import Link from "next/link";
import { PRODUCT_LINK_REL } from "./link-rel";
import { trackViewContent, type TrackableProduct } from "./meta-pixel";
import { trackOutboundClick } from "./click-tracking";

// Isolated as its own client component so that ProductCard / BestForCard
// (which render lots of static, server-rendered content) don't have to
// become client components just to attach one onClick handler.
export function ViewDetailsLink({
  product,
  className,
  children,
}: {
  product: TrackableProduct;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={product.productUrl ?? "#"}
      target="_blank"
      rel={PRODUCT_LINK_REL}
      onClick={() => {
        trackViewContent(product);
        trackOutboundClick(product.slug, product.productUrl ?? "#");
      }}
      className={className}
    >
      {children}
    </Link>
  );
}
