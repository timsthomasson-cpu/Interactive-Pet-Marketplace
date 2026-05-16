import Link from "next/link";
import { PageShell } from "@/components/layout";
import { products } from "@/components/site-data";
import { ProductCard } from "@/components/product-card";
import { SectionHeading } from "@/components/ui";
import { CompareTable, TrustBoxesRow } from "@/components/sections";
import { CategoryHeader } from "@/components/category-header";
import { IllustrativeImagesNote } from "@/components/illustrative-images-note";

export const metadata = {
  title: "Premium Picks — High-end AI & robotic pets",
  description: "Higher-end interactive pets and robotic companions over $200. Camera, AI, and app-connected features for buyers seeking the most advanced experience."
};

export default function PremiumPage() {
  const picks = products.filter((p) => p.priceCategory === "Premium");
  const topPicks = picks.filter((p) => p.flags?.topPick && p.imageUrl);
  return (
    <PageShell>
      <section className="pt-14 pb-6 sm:pt-16 sm:pb-7 lg:pt-20 lg:pb-10">
        <div className="container-shell">
          <SectionHeading
            as="h1"
            eyebrow="Premium picks"
            title="Higher-end interactive pets with advanced features."
            text="Products over $200 with more sophisticated cameras, AI, or movement."
          />
        </div>
      </section>

      <CategoryHeader
        topPicks={topPicks}
        rotatorTitle="Our Top Premium Picks"
        body={[
          <>
            <strong className="text-slate-900">What &ldquo;premium&rdquo; means on this site.</strong>{" "}
            Premium interactive pets are the products in our catalog that cross the $200 threshold — typically because they offer something that lower-priced options don&rsquo;t. That might be a more capable AI assistant, a camera-enabled monitoring feature, a more lifelike movement system, an app-connected experience, or higher build quality. Premium models generally sit in the $250&ndash;$800 range, where the differences between products start to matter — not just in what they cost, but in what they actually do day to day.
          </>,
          <>
            <strong className="text-slate-900">Who they&rsquo;re for.</strong>{" "}
            This category suits buyers for whom the experience matters more than the price tag — gift-givers shopping for a significant occasion, adults who want the closest available analog to a live pet, families with strong interest in robotics, or care facilities investing in residents&rsquo; wellbeing. Premium picks are also a good fit for people who tried an entry-level interactive pet and found themselves wanting more — more responsiveness, more presence, more capability.
          </>,
          <>
            <strong className="text-slate-900">A note on cameras and privacy.</strong>{" "}
            Many premium models in this category include cameras — sometimes as a main feature (home monitoring, check-on-pets-from-work) and sometimes for navigation. A camera-equipped robot that moves around the house is a different kind of device than a stationary security camera: it can travel into bedrooms, bathrooms, and other spaces a fixed camera wouldn&rsquo;t see. This isn&rsquo;t a reason to avoid these products, but it is a reason to take the privacy questions seriously before buying. See our{" "}
            <Link href="/questions#privacy" className="underline text-trust-700 hover:text-trust-900">
              buyer&rsquo;s guide to camera and privacy questions
            </Link>{" "}
            for what to ask about any connected pet robot before you bring it home.
          </>
        ]}
        checklist={{
          title: "What to look for when choosing a premium model",
          items: [
            ["Confirm what the premium pays for", "Some products are premium because of advanced AI; others because of cameras; others because of build quality and mechanical sophistication. Match the spend to the feature that matters most to the recipient."],
            ["Privacy controls if it has a camera", "Look for products with a physical privacy shutter (a mechanical cover over the lens, not just a software off-switch), the ability to disable cloud uploads, and clear privacy policies from the manufacturer."],
            ["App and Wi-Fi requirements", "Most premium models require an app and home Wi-Fi. Confirm the recipient is comfortable with both."],
            ["Warranty and support", "Look for at least a one-year warranty and accessible customer service."],
            ["Software updates and longevity", "AI-driven and app-connected pets depend on the manufacturer continuing to support them. Confirm the product line is actively updated rather than abandoned."]
          ]
        }}
      />

      <TrustBoxesRow variant="premium" />
      <section className="section-pad pt-0">
        <IllustrativeImagesNote />
        <div className="container-shell mt-3">
          <div className="grid gap-6 lg:grid-cols-3">
            {picks.map((product) => <ProductCard key={product.slug} product={product} />)}
          </div>
        </div>
      </section>
      <CompareTable items={picks} title="Premium picks at a glance" text="Quickly scan type, audience, highlight, rating, and price." />
    </PageShell>
  );
}
