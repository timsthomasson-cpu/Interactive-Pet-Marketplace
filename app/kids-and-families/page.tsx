import Link from "next/link";
import { PageShell } from "@/components/layout";
import { products } from "@/components/site-data";
import { CompareTable, GroupedProducts, TrustBoxesRow } from "@/components/sections";
import { CategoryIntro } from "@/components/category-intro";

export const metadata = {
  title: "Best Interactive Pets for Kids and Families",
  description: "Playful, kid-friendly interactive pets and AI companions for novelty, learning, and family fun. Compare ratings, features, and prices."
};

export default function FamiliesPage() {
  const picks = products.filter((p) =>
    p.bestFor.some((tag) => ["Children", "Families"].includes(tag))
  );
  return (
    <PageShell>
      <section className="pt-14 pb-6 sm:pt-16 sm:pb-7 lg:pt-20 lg:pb-10">
        <div className="container-shell">
          <div className="max-w-3xl">
            <p className="eyebrow">For kids and families</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
              Playful interactive pets for novelty and everyday fun.
            </h1>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Engaging companions designed to entertain children and bring families together.
            </p>
          </div>
        </div>
      </section>

      <CategoryIntro
        body={[
          <>
            Research has shown that interactive pets can improve the lives of children by supporting interactive learning, personalized engagement, empathy, and technology skills. (
            <Link href="/kids-research" className="underline text-trust-700 hover:text-trust-900">
              See a list of articles
            </Link>
            .)
          </>,
          <>
            <strong className="text-slate-900">Why families choose interactive pets.</strong>{" "}
            For many families, an interactive pet is the bridge between &ldquo;wanting a pet&rdquo; and &ldquo;being ready for one.&rdquo; The research on children and AI companions suggests they can support empathy, nurturing behavior, and basic technology fluency — especially with models that respond when cared for. Parents also gravitate toward this category for practical reasons: no shedding, no allergies, no training, and no veterinary bills. Younger children get a companion they can talk to and look after; older children with an interest in technology get an introduction to robotics that&rsquo;s more engaging than a static toy.
          </>
        ]}
        checklist={{
          title: "What to look for when choosing for kids or families",
          items: [
            ["Age appropriateness", "Some models are sturdy enough for toddlers; others have small parts or fragile mechanisms better suited to older children."],
            ["Durability", "Look for washable fabrics, replaceable batteries, and warranties that cover normal wear and tear."],
            ["Educational depth", "Some interactive pets include programmable behavior or coding features that scale with the child's curiosity over time."],
            ["Screen-free vs. app-required", "Many parents prefer screen-free models for younger children; older kids may enjoy companion apps that extend play."],
            ["Voice and conversation", "AI-powered talking pets are engaging but can be repetitive; check reviews for whether the conversation depth holds attention beyond the first few weeks."]
          ]
        }}
      />

      <TrustBoxesRow variant="families" />
      <GroupedProducts items={picks} pageName="Kids & Families" />
      <CompareTable items={picks} title="Kids & Family picks at a glance" text="Quickly scan type, audience, highlight, rating, and price." />
    </PageShell>
  );
}
