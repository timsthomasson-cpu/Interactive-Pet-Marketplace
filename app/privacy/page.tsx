import Link from "next/link";
import { PageShell } from "@/components/layout";

export const metadata = {
  title: "Privacy Policy | Interactive Pet Marketplace",
  description: "How Interactive Pet Marketplace collects, uses, and protects your information.",
};

export default function PrivacyPage() {
  return (
    <PageShell>
      <div className="container-shell py-14 sm:py-20">
        <div className="max-w-3xl">

          <p className="eyebrow">Legal</p>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Privacy Policy
          </h1>
          <p className="mt-4 text-sm text-slate-500">Last updated: June 6, 2026</p>

          <div className="mt-10 space-y-10 text-base leading-7 text-slate-700">

            <section>
              <h2 className="text-xl font-bold text-slate-900">1. Who we are</h2>
              <p className="mt-3">
                Interactive Pet Marketplace (<strong>interactivepetmarketplace.com</strong>) is an independent product comparison and affiliate site operated by Tim Thomasson, based in Coppell, Texas, USA. We help seniors, families, and gift buyers find the right companion pet for their needs.
              </p>
              <p className="mt-3">
                Questions about this policy? Contact us at the{" "}
                <Link href="/contact" className="underline text-trust-700 hover:text-trust-900">
                  contact page
                </Link>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900">2. Information we collect</h2>
              <p className="mt-3">We collect information in two ways:</p>

              <h3 className="mt-5 text-base font-semibold text-slate-900">a) Information you give us</h3>
              <ul className="mt-2 list-disc list-inside space-y-1">
                <li>Your email address, if you subscribe to the Senior Companion Digest newsletter</li>
                <li>Any information you voluntarily provide via our contact form</li>
              </ul>

              <h3 className="mt-5 text-base font-semibold text-slate-900">b) Information collected automatically</h3>
              <ul className="mt-2 list-disc list-inside space-y-1">
                <li>Pages visited, time on site, and general location (country/region) via Google Analytics 4</li>
                <li>Clicks on outbound affiliate links, tracked as events in Google Analytics 4</li>
                <li>Ad interaction data via the Facebook/Meta Pixel, if you arrive from or interact with our Facebook ads</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900">3. How we use your information</h2>
              <ul className="mt-3 list-disc list-inside space-y-2">
                <li>To send you the Senior Companion Digest newsletter (email subscribers only)</li>
                <li>To understand which pages and products are most useful to visitors</li>
                <li>To improve the site and its content</li>
                <li>To measure the effectiveness of Facebook advertising campaigns</li>
                <li>We do not sell your personal information to anyone, ever</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900">4. Email and newsletter (Beehiiv)</h2>
              <p className="mt-3">
                Our newsletter is managed by <strong>Beehiiv</strong>. When you subscribe, your email address is stored on Beehiiv's servers. You can unsubscribe at any time using the unsubscribe link in any issue of the digest, or by contacting us directly. Beehiiv's privacy policy is available at{" "}
                <a
                  href="https://www.beehiiv.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-trust-700 hover:text-trust-900"
                >
                  beehiiv.com/privacy
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900">5. Google Analytics</h2>
              <p className="mt-3">
                We use Google Analytics 4 to understand how visitors use this site. Google Analytics collects data such as pages viewed, time spent, and general geographic region. This data is aggregated and anonymized — we cannot identify individual visitors from it.
              </p>
              <p className="mt-3">
                You can opt out of Google Analytics tracking by installing the{" "}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-trust-700 hover:text-trust-900"
                >
                  Google Analytics Opt-out Browser Add-on
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900">6. Facebook / Meta Pixel</h2>
              <p className="mt-3">
                We use the Facebook Pixel to measure the performance of our Facebook advertising campaigns. The Pixel may collect information about your visit to this site and link it to your Facebook profile if you are logged in to Facebook. This helps us understand which ads lead to meaningful visits.
              </p>
              <p className="mt-3">
                You can manage your ad preferences at{" "}
                <a
                  href="https://www.facebook.com/adpreferences"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-trust-700 hover:text-trust-900"
                >
                  facebook.com/adpreferences
                </a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900">7. Affiliate links</h2>
              <p className="mt-3">
                This site participates in affiliate programs including the Amazon Associates Program. When you click a product link and make a purchase, we may earn a small commission at no extra cost to you. We track outbound clicks via Google Analytics to understand which products are most relevant to our visitors. See our full{" "}
                <Link href="/about#affiliate-disclosure" className="underline text-trust-700 hover:text-trust-900">
                  affiliate disclosure
                </Link>{" "}
                for details.
              </p>
              <p className="mt-3">
                Interactive Pet Marketplace is a participant in the GoAffPro Affiliate Program, an affiliate advertising program designed to provide a means for sites to earn advertising fees by advertising and linking to the partner site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900">8. Cookies</h2>
              <p className="mt-3">
                This site uses cookies placed by Google Analytics and the Facebook Pixel to function as described above. We do not use cookies for any other purpose. Most browsers allow you to refuse or delete cookies — see your browser's help documentation for instructions.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900">9. Third-party links</h2>
              <p className="mt-3">
                This site links to product pages on Amazon and other retailers. Once you leave our site, their privacy policies apply. We are not responsible for the privacy practices of any third-party site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900">10. Children's privacy</h2>
              <p className="mt-3">
                This site is not directed at children under 13. We do not knowingly collect personal information from children. If you believe a child has provided us with personal information, please contact us and we will delete it promptly.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900">11. Your rights</h2>
              <p className="mt-3">
                Depending on where you live, you may have the right to access, correct, or delete the personal information we hold about you. To make a request, contact us via the{" "}
                <Link href="/contact" className="underline text-trust-700 hover:text-trust-900">
                  contact page
                </Link>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-900">12. Changes to this policy</h2>
              <p className="mt-3">
                We may update this policy from time to time. The date at the top of this page reflects the most recent revision. Continued use of the site after any change constitutes acceptance of the updated policy.
              </p>
            </section>

          </div>
        </div>
      </div>
    </PageShell>
  );
}
