import { PageShell } from "@/components/layout";
import { SectionHeading } from "@/components/ui";
import Link from "next/link";
import { JsonLd, breadcrumbListSchema } from "@/components/json-ld";
import { PageUpdated } from "@/components/page-updated";

export const metadata = {
  title: "About",
  description: "Who we are, how we choose products, and our affiliate disclosure."
};

export default function AboutPage() {
  return (
    <PageShell>
      <JsonLd
        schema={[
          breadcrumbListSchema([
            { name: "Home", path: "/" },
            { name: "About", path: "/about" }
          ]),
          {
            "@context": "https://schema.org/",
            "@type": "AboutPage",
            "name": "About Interactive Pet Marketplace",
            "url": "https://interactivepetmarketplace.com/about",
            "author": {
              "@type": "Person",
              "name": "Tim Thomasson",
              "jobTitle": "Curator and researcher",
              "worksFor": {
                "@type": "Organization",
                "name": "Interactive Pet Marketplace",
                "url": "https://interactivepetmarketplace.com"
              }
            }
          }
        ]}
      />
      <section className="pt-14 pb-6 sm:pt-16 sm:pb-7 lg:pt-20 lg:pb-10">
        <div className="container-shell">
          <SectionHeading
            as="h1"
            eyebrow="About"
            title="A cleaner way to compare interactive pets."
            text="Interactive Pet Marketplace exists to make it easier to find the right interactive pet, AI & robotic pet, or plushy companion — without wading through cluttered review sites."
          />
        </div>
      </section>

      {/* Mission */}
      <section className="pb-12">
        <div className="container-shell">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <p className="eyebrow">What we do</p>
              <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Honest comparisons, organized by who you're shopping for.
              </h2>
            </div>
            <div className="space-y-4 text-base leading-7 text-slate-700">
              <p>
                There are a lot of interactive pets on the market, and they get
                marketed as the answer to very different needs — companionship
                for a parent living alone, a calming presence for someone with
                dementia, a novelty gift, or a kid's first taste of a "pet."
                Lumping them all together makes choosing harder, not easier.
              </p>
              <p>
                The team behind Interactive Pet Marketplace organizes products by who
                they're best for and what they actually do, so you can narrow
                things down quickly. We focus on plushy companions, AI &amp; robotic
                pets, and senior-friendly options — the categories where buyers
                most often tell us they feel overwhelmed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How we choose */}
      <section className="pb-12">
        <div className="container-shell">
          <div className="card p-6 sm:p-10">
            <p className="eyebrow">How we choose what to list</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Our standards for product information.
            </h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Verified data only</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Specs, ratings, review counts, and prices come from manufacturer
                  pages or major retailers and are checked manually. If we can't
                  verify a number, it doesn't go on the site.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Refreshed regularly</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Prices and ratings drift over time. Higher-priced and popular
                  products get checked more often than long-tail listings, and
                  every product card reflects when the data was last verified.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">No copied reviews</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  We never reproduce customer review text from Amazon, the
                  manufacturer, or anywhere else. Reviews belong to the people
                  who wrote them. We link out instead.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900">Editorial highlights are ours</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  Where we add a short "what makes this stand out" note, that's
                  our editorial voice — not a manufacturer claim. We try to be
                  clear about which is which.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="pb-12">
        <div className="container-shell">
          <p className="eyebrow">Who this site is for</p>
          <h2 className="mt-3 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            We organize the site around shoppers, not categories.
          </h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              ["Seniors and their families", "Calmer choices with simple interaction, designed for comfort over complexity."],
              ["Kids and families", "Playful options built for novelty, learning, and everyday entertainment."],
              ["Gift buyers", "Friendly picks with broad appeal that don't require setup expertise."],
              ["Premium shoppers", "Higher-end robotic pets with more advanced sensors and movement."]
            ].map(([title, text]) => (
              <div key={title} className="rounded-3xl border border-trust-200 bg-trust-50 p-6">
                <h3 className="text-lg font-semibold text-trust-900">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Affiliate disclosure */}
      <section className="pb-12">
        <div className="container-shell">
          <div id="affiliate-disclosure" className="rounded-3xl border-2 border-trust-300 bg-trust-50 p-6 sm:p-10">
            <p className="eyebrow">Affiliate disclosure</p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-trust-900 sm:text-3xl">
              How we make money — in plain language.
            </h2>
            <div className="mt-5 space-y-4 text-base leading-7 text-slate-700">
              <p>
                Interactive Pet Marketplace may participate in affiliate programs.
                If you click a "View Details" or product link on this site and
                go on to buy, we may earn a small commission at no extra cost
                to you. Any commissions help fund the time it takes to research
                products, verify prices, and keep the site running. Specific
                affiliate programs we participate in will be listed here once
                they are active.
              </p>
              <p>
                Earning a commission does not change which products appear on
                this site or where they rank. We list products based on what
                we think fits a given shopper, not based on which one pays us
                more. If a product is a poor fit for a category, we don't
                include it just because the affiliate payout would be higher.
              </p>
              <p>
                We are not the manufacturer or seller of any product listed.
                For order questions, returns, or warranty support, please go
                directly to the retailer where you purchased.
              </p>
              <p className="text-sm text-slate-600">
                This disclosure is provided in accordance with the U.S.
                Federal Trade Commission's guidance on endorsements and
                testimonials.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who runs this site */}
      <section className="pb-12">
        <div className="container-shell">
          <div className="card p-6 sm:p-10">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Who runs this site
            </h2>
            <div className="mt-4 space-y-4 text-base leading-8 text-slate-700">
              <p>
                Interactive Pet Marketplace is curated and researched by{" "}
                <span className="font-semibold text-slate-900">Tim Thomasson</span>.
                Product research, privacy reviews, and editorial decisions are
                made by a single person — not an anonymous team or an AI content
                pipeline. Every product on this site has been chosen, reviewed,
                and written about by hand.
              </p>
              {/*
                TIM: If you'd like to expand this with a short bio
                (background, why you started the site, etc.), edit the
                paragraph below. Keep it factual — don't claim credentials
                you don't have. AI search engines reward attributable authors,
                not invented expertise.

                Example:
                <p>
                  Tim started Interactive Pet Marketplace after [reason]. He
                  has [background, if relevant to the topic]. He can be
                  reached at <a href="/contact">/contact</a>.
                </p>
              */}
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="pb-16 sm:pb-20">
        <div className="container-shell">
          <div className="card p-6 sm:p-10 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Have any questions or suggestions?
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-700">
              Whether you're trying to decide between two products, want to
              suggest a pet we should review, or noticed something on the site
              that doesn't look right — we'd like to hear from you.
            </p>
            <Link
              href="/contact"
              className="btn-primary mt-6 inline-flex"
            >
              Contact us
            </Link>
          </div>
          <div className="mt-8 text-center">
            <PageUpdated date="2026-05-17" />
          </div>
        </div>
      </section>
    </PageShell>
  );
}
