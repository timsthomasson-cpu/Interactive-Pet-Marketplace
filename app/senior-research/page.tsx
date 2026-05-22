import { PageShell } from "@/components/layout";
import { SectionHeading } from "@/components/ui";
import Link from "next/link";
import { JsonLd, breadcrumbListSchema } from "@/components/json-ld";
import { PageUpdated } from "@/components/page-updated";

const articles: { title: string; source: string; url: string }[] = [
  {
    title: "Studies Show Benefits of Robotic Pets for Loved Ones With Dementia, Loneliness",
    source: "AARP",
    url: "https://www.aarp.org/caregiving/basics/robotic-companion-animals/"
  },
  {
    title: "Impacts of Low-cost Robotic Pets for Older Adults",
    source: "National Institutes of Health / PMC",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8082946/"
  },
  {
    title: "Robotic Pet Use Among Community-Dwelling Older Adults",
    source: "Oxford Academic",
    url: "https://academic.oup.com/psychsocgerontology/article/75/9/2018/5891953"
  },
  {
    title: "Robotic Pets Can Dramatically Improve the Lives of Older Adults With Dementia and Depression",
    source: "Forbes / Well Beings",
    url: "https://wellbeings.org/well-beings-x-forbes-robotic-pets-can-dramatically-improve-the-lives-of-older-adults-with-dementia-and-depression/"
  },
  {
    title: "Effect of a Robot Pet Companion on the Mood of Older Adults",
    source: "PubMed / American Journal of Geriatric Psychiatry",
    url: "https://www.ajgponline.org/article/S1064-7481(25)00558-5/fulltext"
  },
  {
    title: "Effect of Social Robots on Depression and Loneliness",
    source: "ScienceDirect / JAMDA",
    url: "https://www.jamda.com/article/S1525-8610(24)00176-2/fulltext"
  },
  {
    title: "Robotic Pets Provide Comfort to Dementia Patients",
    source: "Pacific Neuroscience Institute",
    url: "https://www.pacificneuroscienceinstitute.org/blog/brain-health/robotic-pets-provide-comfort-to-dementia-patients/"
  },
  {
    title: "ElliQ AI Companion Robot Review",
    source: "WIRED",
    url: "https://www.wired.com/review/elliq-ai-companion-robot/"
  },
  {
    title: "Companion Robots to Mitigate Loneliness Among Older Adults",
    source: "Frontiers in Psychology",
    url: "https://www.frontiersin.org/articles/10.3389/fpsyg.2023.1106633/full"
  },
  {
    title: "Wired for Companionship",
    source: "The Gerontologist / Oxford Academic",
    url: "https://academic.oup.com/gerontologist/article/65/12/gnaf219/8268528"
  },
  {
    title: "Intelligent Robot Interventions for People With Dementia: Systematic Review and Meta-Analysis of Randomized Controlled Trials",
    source: "Journal of Medical Internet Research",
    url: "https://www.jmir.org/2025/1/e59892"
  },
  {
    title: "Implementing Robotic Pets in Continuing Care Settings: A Scoping Review of Barriers and Facilitators",
    source: "Journal of the American Geriatrics Society",
    url: "https://agsjournals.onlinelibrary.wiley.com/doi/10.1111/jgs.19510"
  }
];

export const metadata = {
  title: "Research on Interactive Pets and Senior Wellbeing",
  description: "Research articles on robotic pets and AI companions for seniors. Evidence on loneliness, isolation, dementia, depression, and quality of life."
};

export default function SeniorResearchPage() {
  return <PageShell><JsonLd schema={breadcrumbListSchema([{ name: "Home", path: "/" }, { name: "Senior Research", path: "/senior-research" }])} /><section className="pt-10 pb-3 sm:pt-12 sm:pb-4 lg:pt-14 lg:pb-5"><div className="container-shell"><SectionHeading as="h1" eyebrow="Research" title="Research on Interactive Pets and Senior Wellbeing" text="A growing body of research suggests that interactive and robotic pets can meaningfully improve the lives of seniors — especially those facing loneliness, isolation, dementia, depression, or anxiety." /></div></section><section className="pb-2"><div className="container-shell max-w-4xl"><Link href="/senior-research/summaries" className="block group"><h3 className="text-2xl font-bold tracking-tight text-trust-700 group-hover:text-trust-900 underline">Articles on the Effect of Interactive Pets on Seniors</h3><p className="mt-1 text-xl font-bold underline text-slate-700 group-hover:text-slate-900">(Click to see summaries of articles.)</p></Link></div></section><section className="pb-4"><div className="container-shell max-w-4xl"><div className="p-4 border-l-4 border-trust-500 bg-trust-50 rounded-r"><p className="text-sm font-semibold text-trust-700 mb-2">Recently added — May 2026</p><ul className="text-sm text-slate-700 space-y-1"><li><Link href="https://www.jmir.org/2025/1/e59892" target="_blank" rel="noopener noreferrer" className="underline text-trust-700 hover:text-trust-900">Intelligent Robot Interventions for People With Dementia</Link> — Journal of Medical Internet Research (meta-analysis of 15 randomized controlled trials)</li><li><Link href="https://agsjournals.onlinelibrary.wiley.com/doi/10.1111/jgs.19510" target="_blank" rel="noopener noreferrer" className="underline text-trust-700 hover:text-trust-900">Implementing Robotic Pets in Continuing Care Settings</Link> — Journal of the American Geriatrics Society (scoping review of 42 studies)</li></ul></div></div></section><section className="pt-4 pb-10 sm:pt-6 sm:pb-12"><div className="container-shell"><ol className="space-y-6 list-decimal pl-6 max-w-4xl">{articles.map((article) => <li key={article.url} className="text-slate-700"><Link href={article.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-trust-700 underline hover:text-trust-900">&ldquo;{article.title}&rdquo;</Link><span className="text-slate-600"> — {article.source}</span></li>)}</ol><div className="mt-10 text-center"><PageUpdated date="2026-05-22" /></div></div></section></PageShell>;
}
