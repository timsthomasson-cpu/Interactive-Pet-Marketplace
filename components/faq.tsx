import { faqs } from "./site-data";
import { SectionHeading } from "./ui";
export function FAQSection() {
  return <section className="section-pad"><div className="container-shell"><SectionHeading eyebrow="FAQ" title="Common questions before someone buys." text="This also helps support SEO and keeps buyer hesitation lower." /><div className="mt-10 space-y-4">{faqs.map((faq)=><details key={faq.q} className="card p-6"><summary className="cursor-pointer list-none text-lg font-semibold text-slate-900">{faq.q}</summary><p className="mt-4 max-w-3xl text-sm leading-7 text-slate-600">{faq.a}</p></details>)}</div></div></section>;
}
