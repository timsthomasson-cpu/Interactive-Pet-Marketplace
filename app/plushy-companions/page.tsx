import { PageShell } from "@/components/layout";
import { CompareTable, GroupedProducts, TrustBoxesRow } from "@/components/sections";
import { products } from "@/components/site-data";
import { SectionHeading } from "@/components/ui";
import { CategoryIntro } from "@/components/category-intro";

export const metadata = {
  title: "Plushy Companions — Comfort-first interactive pets",
  description: "Companion-style plushy pets designed for touch response, simple engagement, and lower maintenance. Compare ratings, features, and prices."
};

export default function Page() {
  const items = products.filter((p) => p.type === "Interactive");
  return (
    <PageShell>
      <section className="section-pad pb-2 sm:pb-3">
        <div className="container-shell">
          <SectionHeading
            as="h1"
            eyebrow="Comfort-first options"
            title="Plushy Companions"
            text="Soft, lifelike pets designed for tactile comfort and gentle interaction."
          />
        </div>
      </section>

      <CategoryIntro
        body={[
          <>
            <strong className="text-slate-900">What plushy companions are.</strong>{" "}
            Plushy companions are soft, lifelike pets designed for tactile comfort and gentle interaction rather than complex play. Most respond to touch, sound, or movement with small actions — a purr, a heartbeat, a slow blink, a head turn — that create a sense of presence without the demands of a live pet. They sit somewhere between a stuffed animal and a robotic pet: more responsive than the former, simpler and more approachable than the latter.
          </>,
          <>
            <strong className="text-slate-900">Who they&rsquo;re for.</strong>{" "}
            The category is most often chosen for three situations: an older adult living alone or in memory care who would benefit from quiet companionship, a child who isn&rsquo;t ready for the responsibility of a live pet, and an adult who wants the comfort of a pet but can&rsquo;t accommodate one (allergies, lease restrictions, travel, or grief after losing a pet). Plushy companions are also a common gift for these audiences because they require no setup, no app, and no learning curve.
          </>
        ]}
        checklist={{
          title: "What to look for when choosing",
          items: [
            ["Realism vs. price", "Higher-end plushy companions use more sophisticated mechanics for breathing and movement; budget models are simpler but still effective."],
            ["Battery vs. plug-in", "Most run on standard batteries; some premium models charge via dock."],
            ["Care and cleaning", "Look for products with removable, washable fur covers if the recipient is in a care setting."],
            ["Noise level", "Some models include audio (purring, panting, soft sounds). Quieter models are usually preferred for memory care."],
            ["Weight and size", "Heavier, lap-sized companions feel more present; smaller ones travel easily."]
          ]
        }}
      />

      <TrustBoxesRow variant="plushy" />
      <GroupedProducts items={items} pageName="Plushy Companions" />
      <CompareTable items={items} title="Plushy Companions at a glance" text="Quickly scan type, audience, highlight, rating, and price." />
    </PageShell>
  );
}
