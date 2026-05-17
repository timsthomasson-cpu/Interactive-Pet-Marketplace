import Link from "next/link";
import { FAQSection } from "@/components/faq";
import { InteractivePetsInfo } from "@/components/interactive-pets-info";
import { PrivacySecuritySection } from "@/components/privacy-security-section";
import { PageShell } from "@/components/layout";
import { PageUpdated } from "@/components/page-updated";
import { faqs } from "@/components/site-data";
import { PRIVACY_FAQ_FOR_SCHEMA } from "@/components/privacy-faq-data";
import { JsonLd, faqPageSchema, breadcrumbListSchema } from "@/components/json-ld";

export const metadata = {
  title: "Questions about Interactive Pets — FAQ and buyer's guide",
  description: "Plain-English answers about interactive pets and AI companions: who they help, what they offer, how to choose, and how to think about camera privacy."
};

export default function QuestionsPage() {
  // Combine the existing FAQ entries (from site-data) with the privacy
  // section's Q&A (from privacy-faq-data) into a single FAQPage schema.
  // Search engines treat the whole page as one FAQ document.
  const faqItems = [
    ...faqs.map((f) => ({ question: f.q, answer: f.a })),
    ...PRIVACY_FAQ_FOR_SCHEMA
  ];

  return (
    <PageShell>
      <JsonLd
        schema={[
          breadcrumbListSchema([
            { name: "Home", path: "/" },
            { name: "Questions", path: "/questions" }
          ]),
          faqPageSchema(faqItems)
        ]}
      />
      <section className="pt-10 pb-2 sm:pt-12 sm:pb-3 lg:pt-14 lg:pb-3">
        <div className="container-shell max-w-4xl">
          <div className="rounded-2xl border border-trust-200 bg-trust-50 p-5 sm:p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-trust-700">
              Quick answer
            </p>
            <p className="mt-2 text-base leading-7 text-slate-800 sm:text-lg sm:leading-8">
              Interactive pets are companion devices that respond to touch, sound, or movement
              without the demands of a live pet. They&rsquo;re most often chosen for older adults
              facing loneliness, children not ready for a real pet, or adults who can&rsquo;t have one.
              Research suggests they can reduce loneliness, agitation, and depression in older adults,
              and support empathy and engagement in children. Camera-equipped models add privacy
              considerations covered below.
            </p>
          </div>
        </div>
      </section>
      <InteractivePetsInfo />
      <PrivacySecuritySection />
      <FAQSection />
      <section className="pb-16 sm:pb-20">
        <div className="container-shell">
          <div className="card p-6 sm:p-10 text-center">
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              Didn't find your answer?
            </h2>
            <p className="mt-3 text-base leading-7 text-slate-700">
              If your question isn't covered above, send us a note and we'll
              get back to you.
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
