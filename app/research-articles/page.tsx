import { PageShell } from "@/components/layout";
import { SectionHeading } from "@/components/ui";
import Link from "next/link";
import { JsonLd, breadcrumbListSchema } from "@/components/json-ld";
import { PageUpdated } from "@/components/page-updated";

const existingArticles: { title: string; source: string; url: string }[] = [
  { title: "Studies Show Benefits of Robotic Pets for Loved Ones With Dementia, Loneliness", source: "AARP", url: "https://www.aarp.org/caregiving/basics/robotic-companion-animals/" },
  { title: "Impacts of Low-cost Robotic Pets for Older Adults", source: "National Institutes of Health / PMC", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8082946/" },
  { title: "Robotic Pet Use Among Community-Dwelling Older Adults", source: "Oxford Academic", url: "https://academic.oup.com/psychsocgerontology/article/75/9/2018/5891953" },
  { title: "Robotic Pets Can Dramatically Improve the Lives of Older Adults With Dementia and Depression", source: "Forbes / Well Beings", url: "https://wellbeings.org/well-beings-x-forbes-robotic-pets-can-dramatically-improve-the-lives-of-older-adults-with-dementia-and-depression/" },
  { title: "Effect of a Robot Pet Companion on the Mood of Older Adults", source: "PubMed / American Journal of Geriatric Psychiatry", url: "https://www.ajgponline.org/article/S1064-7481(25)00558-5/fulltext" },
  { title: "Effect of Social Robots on Depression and Loneliness", source: "ScienceDirect / JAMDA", url: "https://www.jamda.com/article/S1525-8610(24)00176-2/fulltext" },
  { title: "Robotic Pets Provide Comfort to Dementia Patients", source: "Pacific Neuroscience Institute", url: "https://www.pacificneuroscienceinstitute.org/blog/brain-health/robotic-pets-provide-comfort-to-dementia-patients/" },
  { title: "ElliQ AI Companion Robot Review", source: "WIRED", url: "https://www.wired.com/review/elliq-ai-companion-robot/" },
  { title: "Companion Robots to Mitigate Loneliness Among Older Adults", source: "Frontiers in Psychology", url: "https://www.frontiersin.org/articles/10.3389/fpsyg.2023.1106633/full" },
  { title: "Wired for Companionship", source: "The Gerontologist / Oxford Academic", url: "https://academic.oup.com/gerontologist/article/65/12/gnaf219/8268528" },
  { title: "Intelligent Robot Interventions for People With Dementia: Systematic Review and Meta-Analysis of Randomized Controlled Trials", source: "Journal of Medical Internet Research", url: "https://www.jmir.org/2025/1/e59892" },
  { title: "Implementing Robotic Pets in Continuing Care Settings: A Scoping Review of Barriers and Facilitators", source: "Journal of the American Geriatrics Society", url: "https://agsjournals.onlinelibrary.wiley.com/doi/10.1111/jgs.19510" },
  { title: "Loneliness, Social Isolation, and Effects on Cognitive Decline in Patients With Dementia", source: "Alzheimer's & Dementia: Diagnosis, Assessment & Disease Monitoring", url: "https://alz-journals.onlinelibrary.wiley.com/doi/10.1002/dad2.70149" },
];

export const metadata = {
  title: "Research Articles | Interactive Companion Digest",
  description: "Primary research sources cited in Interactive Companion Digest articles — covering loneliness, senior wellbeing, children, and interactive pets.",
};

export default function ResearchArticlesPage() {
  return (
    <PageShell>
      <JsonLd schema={breadcrumbListSchema([{ name: "Home", path: "/" }, { name: "Research Articles", path: "/research-articles" }])} />

      <section className="pt-10 pb-4 sm:pt-12 sm:pb-6">
        <div className="container-shell">
          <SectionHeading as="h1" eyebrow="Sources" title="Research Articles"
            text="Primary sources cited in Interactive Companion Digest articles, plus our broader library of peer-reviewed research on interactive pets, senior wellbeing, and companion animal benefits." />
        </div>
      </section>

      {/* ── Digest article sources ── */}
      <section className="pb-8">
        <div className="container-shell max-w-4xl space-y-10">

          <div id="loneliness">
            <div className="flex items-center justify-between gap-4 mb-3">
              <h2 className="text-xl font-bold text-slate-900">Robotic Pets & Senior Loneliness</h2>
              <Link href="/digest/do-robotic-pets-help-with-loneliness"
                className="text-sm font-semibold text-blue-600 underline hover:text-blue-700 whitespace-nowrap">
                Read article →
              </Link>
            </div>
            <ul className="space-y-3">
              {[
                { title: "Woof, Woof! Robotic Pets Boost Senior Well-Being (GSA 2024 Annual Scientific Meeting)", source: "Medscape", url: "https://www.medscape.com/viewarticle/woof-woof-robotic-pets-boost-senior-well-being-2024a1000l4g" },
                { title: "The Potential Benefits of Companion Robotic Pets on the Quality of Life Among Community-Dwelling Older Women", source: "NIH / PubMed", url: "https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10738600/" },
                { title: "Robotic Pets Can Dramatically Improve the Lives of Older Adults With Dementia and Depression", source: "Forbes (Feb 2025)", url: "https://www.forbes.com/sites/tomchiodo/2025/02/26/robotic-pets-can-dramatically-improve-the-lives-of-older-adults-with-dementia-and-depression/" },
                { title: "2024 National Poll on Aging — Loneliness Among Adults 50–80", source: "University of Michigan", url: "https://www.healthyagingpoll.org/" },
                { title: "Robot Pets: A New Frontier in Combating Loneliness Among Older Adults", source: "Impact Lab", url: "https://www.impactlab.com/2024/07/07/robot-pets-a-new-frontier-in-combating-loneliness-among-older-adults/" },
              ].map((a, i) => (
                <li key={i} className="text-slate-700">
                  <Link href={a.url} target="_blank" rel="noopener noreferrer"
                    className="font-semibold text-blue-600 underline hover:text-blue-700">&ldquo;{a.title}&rdquo;</Link>
                  <span className="text-slate-500"> — {a.source}</span>
                </li>
              ))}
            </ul>
          </div>

          <div id="children">
            <div className="flex items-center justify-between gap-4 mb-3">
              <h2 className="text-xl font-bold text-slate-900">Interactive Pets & Child Development</h2>
              <Link href="/digest/interactive-pets-for-kids"
                className="text-sm font-semibold text-blue-600 underline hover:text-blue-700 whitespace-nowrap">
                Read article →
              </Link>
            </div>
            <ul className="space-y-3">
              {[
                { title: "Impact of Pet Ownership in Early Childhood on Mental Health — INMA Project (2025)", source: "VetNote", url: "https://www.vetnote.pl/en/blog/children-and-pets-development-benefits" },
                { title: "Pet Caregiving, Social Well-being and Nature Connection Among Children (2024)", source: "VetNote / Taiwan Study", url: "https://www.vetnote.pl/en/blog/children-and-pets-development-benefits" },
                { title: "The Relationship Between Humane Interactions with Animals, Empathy, and Prosocial Behavior among Children", source: "Human-Animal Interaction Bulletin", url: "https://www.cabidigitallibrary.org/doi/full/10.1079/hai.2020.0006" },
                { title: "Benefits of Pets for Kids", source: "Children's Hospital Colorado", url: "https://www.childrenscolorado.org/just-ask-childrens/articles/benefits-of-pets/" },
              ].map((a, i) => (
                <li key={i} className="text-slate-700">
                  <Link href={a.url} target="_blank" rel="noopener noreferrer"
                    className="font-semibold text-blue-600 underline hover:text-blue-700">&ldquo;{a.title}&rdquo;</Link>
                  <span className="text-slate-500"> — {a.source}</span>
                </li>
              ))}
            </ul>
          </div>

          <div id="comparison">
            <div className="flex items-center justify-between gap-4 mb-3">
              <h2 className="text-xl font-bold text-slate-900">Robotic vs. Real Pets — Decision Framework</h2>
              <Link href="/digest/real-pet-vs-robotic-pet"
                className="text-sm font-semibold text-blue-600 underline hover:text-blue-700 whitespace-nowrap">
                Read article →
              </Link>
            </div>
            <ul className="space-y-3">
              {[
                { title: "The Use of Robotic Pets by Community-Dwelling Older Adults: A Scoping Review", source: "International Journal of Social Robotics (2022)", url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8082946/" },
                { title: "Caring's 2024 Dementia Care Survey", source: "Caring.com", url: "https://www.caring.com/resources/robotic-pets-for-seniors" },
                { title: "PARO Therapeutic Robot — Clinical Evidence Summary", source: "Pacific Neuroscience Institute", url: "https://www.pacificneuroscienceinstitute.org/blog/brain-health/robotic-pets-provide-comfort-to-dementia-patients/" },
              ].map((a, i) => (
                <li key={i} className="text-slate-700">
                  <Link href={a.url} target="_blank" rel="noopener noreferrer"
                    className="font-semibold text-blue-600 underline hover:text-blue-700">&ldquo;{a.title}&rdquo;</Link>
                  <span className="text-slate-500"> — {a.source}</span>
                </li>
              ))}
            </ul>
          </div>

          <hr className="border-slate-200" />

          <div id="senior-research">
            <h2 className="text-xl font-bold text-slate-900 mb-3">Full Research Library — Senior Wellbeing</h2>
            <ol className="space-y-4 list-decimal pl-6">
              {existingArticles.map((a, i) => (
                <li key={i} className="text-slate-700">
                  <Link href={a.url} target="_blank" rel="noopener noreferrer"
                    className="font-semibold text-blue-600 underline hover:text-blue-700">&ldquo;{a.title}&rdquo;</Link>
                  <span className="text-slate-500"> — {a.source}</span>
                </li>
              ))}
            </ol>
          </div>

        </div>
      </section>

      <section className="pb-10">
        <div className="container-shell max-w-4xl">
          <PageUpdated date="2026-07-15" />
        </div>
      </section>
    </PageShell>
  );
}
