import { PageShell } from "@/components/layout";
import { SectionHeading } from "@/components/ui";
import Link from "next/link";
import { JsonLd, breadcrumbListSchema } from "@/components/json-ld";

const articles: { title: string; source: string; url: string; note?: string }[] = [
  {
    title: "The Impact of AI on Children's Development",
    source: "Harvard Graduate School of Education",
    url: "https://www.gse.harvard.edu/ideas/edcast/24/10/impact-ai-childrens-development"
  },
  {
    title: "Why AI Robot Toys Could Be Good for Kids",
    source: "University of Alberta",
    url: "https://www.ualberta.ca/folio/2018/12/why-ai-robot-toys-could-be-good-for-kids.html"
  },
  {
    title: "Intelligent Toys, Complex Questions: A Literature Review of Artificial Intelligence in Children's Toys and Devices",
    source: "SAGE Journals",
    url: "https://journals.sagepub.com/doi/10.1177/20539517251389860"
  },
  {
    title: "Moxie Is the Robot Pal You Dreamed of as a Kid",
    source: "WIRED",
    url: "https://www.wired.com/story/embodied-moxie-robot-children/"
  },
  {
    title: "Robots and Children that Learn Together: Improving Knowledge Retention by Teaching Peer-Like Interactive Robots",
    source: "arXiv",
    url: "https://arxiv.org/abs/2506.18365"
  },
  {
    title: "ELLA: Generative AI-Powered Social Robots for Early Language Development at Home",
    source: "arXiv",
    url: "https://arxiv.org/abs/2603.12508"
  },
  {
    title: "A HeARTfelt Robot: Social Robot-Driven Deep Emotional Art Reflection with Children",
    source: "arXiv",
    url: "https://arxiv.org/abs/2409.10710"
  },
  {
    title: "Social Robots for Education: A Review",
    source: "Science Robotics",
    url: "https://www.science.org/doi/10.1126/scirobotics.aat5954"
  },
  {
    title: "Why Electronic Pets Might Be the Perfect Pet for Your Child",
    source: "Keyi Robot",
    url: "https://us.keyirobot.com/blogs/buying-guide/why-electronic-pets-might-be-the-perfect-pet-for-your-child"
  },
  {
    title: "Interactive Media — Advantages",
    source: "Wikipedia",
    url: "https://en.wikipedia.org/wiki/Interactive_media"
  }
];

export const metadata = {
  title: "Research on Interactive Pets and Children",
  description: "Research articles on how interactive pets and AI companions support children's learning, empathy, social-emotional development, and engagement."
};

export default function KidsResearchPage() {
  return <PageShell><JsonLd schema={breadcrumbListSchema([{ name: "Home", path: "/" }, { name: "Kids Research", path: "/kids-research" }])} /><section className="pt-10 pb-3 sm:pt-12 sm:pb-4 lg:pt-14 lg:pb-5"><div className="container-shell"><SectionHeading as="h1" eyebrow="Research" title="Research on Interactive Pets and Children" text="A growing body of research suggests that interactive and AI-powered pets and toys can support children's interactive learning, personalized engagement, empathy development, technology fluency, and social-emotional growth." /></div></section><section className="pb-2"><div className="container-shell max-w-4xl"><Link href="/kids-research/summaries" className="block group"><h3 className="text-2xl font-bold tracking-tight text-trust-700 group-hover:text-trust-900 underline">Articles on the Effect of Interactive Pets on Children</h3><p className="mt-1 text-xl font-bold underline text-slate-700 group-hover:text-slate-900">(Click to see summaries of articles.)</p></Link></div></section><section className="pt-6 pb-10 sm:pt-8 sm:pb-12"><div className="container-shell"><ol className="space-y-6 list-decimal pl-6 max-w-4xl">{articles.map((article) => <li key={article.url} className="text-slate-700"><Link href={article.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-trust-700 underline hover:text-trust-900">&ldquo;{article.title}&rdquo;</Link><span className="text-slate-600"> — {article.source}</span></li>)}</ol></div></section></PageShell>;
}
