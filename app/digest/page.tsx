import { PageShell } from "@/components/layout";
import Link from "next/link";

const ARTICLES = [
  {
    tag: "Research",
    tagColor: "text-purple-600 bg-purple-50",
    title: "Do Robotic Pets Actually Help with Loneliness? Here's What the Research Says",
    desc: "New peer-reviewed studies show measurable reductions in depression and loneliness among seniors who use robotic companion pets — with some important caveats.",
    href: "/digest/do-robotic-pets-help-with-loneliness",
    date: "July 2026",
    readTime: "5 min read",
  },
  {
    tag: "Guide",
    tagColor: "text-amber-600 bg-amber-50",
    title: "Why Interactive Pets Are Good for Kids (And What to Look For)",
    desc: "Research shows regular pet interaction builds empathy, emotional intelligence, and social confidence in children — and interactive robotic pets can fill the gap when a real pet isn't practical.",
    href: "/digest/interactive-pets-for-kids",
    date: "July 2026",
    readTime: "5 min read",
  },
  {
    tag: "Guide",
    tagColor: "text-amber-600 bg-amber-50",
    title: "Real Pet vs. Robotic Pet: When Does a Robotic Pet Actually Make Sense?",
    desc: "Robotic pets aren't right for everyone. Here's an honest decision framework for the situations where they genuinely make sense — and the ones where they don't.",
    href: "/digest/real-pet-vs-robotic-pet",
    date: "July 2026",
    readTime: "6 min read",
  },
];

export const metadata = {
  title: "Interactive Companion Digest | Interactive Pet Marketplace",
  description: "Guides, research, and honest reviews on interactive and robotic companion pets for seniors, families, and caregivers.",
};

export default function DigestIndex() {
  return (
    <PageShell>
      {/* Hero */}
      <section className="bg-amber-50 border-b border-amber-100 py-10 sm:py-14">
        <div className="container-shell">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                   strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6 text-white">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-amber-600">Publication</p>
              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Interactive Companion Digest
              </h1>
            </div>
          </div>
          <p className="mt-4 max-w-2xl text-base leading-7 text-slate-700">
            Guides, research, and honest reviews on interactive and robotic companion pets —
            for seniors, families, caregivers, and anyone looking for a smarter way to choose.
          </p>
        </div>
      </section>

      {/* Articles */}
      <section className="bg-white py-10 sm:py-14">
        <div className="container-shell">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ARTICLES.map((a) => (
              <Link key={a.href} href={a.href}
                className="group flex flex-col rounded-3xl border border-slate-100 bg-white p-6 shadow-soft transition hover:-translate-y-0.5 hover:shadow-md hover:border-slate-200">
                <div className="flex items-center justify-between gap-2">
                  <span className={`inline-block rounded px-2 py-0.5 text-xs font-bold uppercase tracking-wide ${a.tagColor}`}>
                    {a.tag}
                  </span>
                  <span className="text-xs text-slate-400">{a.readTime}</span>
                </div>
                <h2 className="mt-3 text-lg font-bold leading-snug text-slate-900 group-hover:text-trust-600 transition-colors">
                  {a.title}
                </h2>
                <p className="mt-2 flex-1 text-sm leading-6 text-slate-600">{a.desc}</p>
                <p className="mt-4 text-xs text-slate-400">{a.date}</p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-trust-600">
                  Read article →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
