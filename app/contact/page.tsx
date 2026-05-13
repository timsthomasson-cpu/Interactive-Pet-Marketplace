import { PageShell } from "@/components/layout";
import { SectionHeading } from "@/components/ui";
import { ContactForm } from "@/components/contact-form";

export const metadata = {
  title: "Contact — Smart Pets Marketplace",
  description: "Get in touch with the team behind Smart Pets Marketplace. Send corrections, feedback, or partnership inquiries."
};

export default function ContactPage() {
  return (
    <PageShell>
      <section className="pt-14 pb-6 sm:pt-16 sm:pb-7 lg:pt-20 lg:pb-10">
        <div className="container-shell">
          <SectionHeading
            eyebrow="Get in touch"
            title="Contact Smart Pets Marketplace"
            text="Spotted an inaccurate price or feature? Have a suggestion, partnership idea, or a product we should review? We'd like to hear from you."
          />
        </div>
      </section>

      <section className="pb-16 sm:pb-20">
        <div className="container-shell">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div className="card p-6 sm:p-8">
              <ContactForm />
            </div>

            <aside className="space-y-6">
              <div className="rounded-3xl border border-trust-200 bg-trust-50 p-6">
                <h3 className="text-lg font-semibold text-trust-900">Response time</h3>
                <p className="mt-2 text-sm leading-7 text-slate-700">
                  We read every message and aim to reply within a few business days.
                  Complex questions or partnership discussions may take longer.
                </p>
              </div>

              <div className="rounded-3xl border border-coral-200 bg-white p-6 shadow-soft">
                <h3 className="text-lg font-semibold text-slate-900">Helpful before you write</h3>
                <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600">
                  <li>
                    Looking for a particular product? Try the <a href="/compare" className="underline text-trust-700 hover:text-trust-900">compare page</a>.
                  </li>
                  <li>
                    Common questions are answered on the <a href="/questions" className="underline text-trust-700 hover:text-trust-900">questions page</a>.
                  </li>
                  <li>
                    For product corrections, please include the product name and what looks off — it speeds up our review.
                  </li>
                </ul>
              </div>

              <div className="rounded-3xl border border-coral-200 bg-white p-6 shadow-soft">
                <h3 className="text-lg font-semibold text-slate-900">What we can't help with</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600">
                  We're not the manufacturer or seller of any product listed.
                  For order status, returns, or warranty questions, please contact
                  the retailer or manufacturer directly through their product page.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
