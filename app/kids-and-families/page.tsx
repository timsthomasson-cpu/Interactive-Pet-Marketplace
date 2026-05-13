import { PageShell } from "@/components/layout";
import { products } from "@/components/site-data";
import { CompareTable, GroupedProducts, TrustBoxesRow } from "@/components/sections";
import Link from "next/link";

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
            <p className="mt-4 text-lg leading-8 text-slate-600">
              Research has shown that Interactive Pets can improve the lives of children by improving Interactive Learning, Personalized Engagement, Empathy, Technology Skills, and many other areas. (<Link href="/kids-research" className="underline text-trust-700 hover:text-trust-900">See a list of articles.</Link>)
            </p>
          </div>
        </div>
      </section>
      <TrustBoxesRow />
      <GroupedProducts items={picks} pageName="Kids & Families" />
      <CompareTable items={picks} title="Kids & Family picks at a glance" text="Quickly scan type, audience, highlight, rating, and price." />
    </PageShell>
  );
}
