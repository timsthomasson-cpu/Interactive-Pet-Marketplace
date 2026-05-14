import Link from "next/link";
import { FAQSection } from "@/components/faq";
import { InteractivePetsInfo } from "@/components/interactive-pets-info";
import { PrivacySecuritySection } from "@/components/privacy-security-section";
import { PageShell } from "@/components/layout";

export const metadata = {
  title: "Questions about Interactive Pets — FAQ and buyer's guide",
  description: "Plain-English answers about interactive pets and AI companions: who they help, what they offer, how to choose, and how to think about camera privacy."
};

export default function QuestionsPage() {
  return (
    <PageShell>
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
        </div>
      </section>
    </PageShell>
  );
}
