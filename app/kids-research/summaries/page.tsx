import { PageShell } from "@/components/layout";
import { SectionHeading } from "@/components/ui";
import Link from "next/link";

const summaries: { title: string; source: string; url: string; lead?: string; bullets: string[]; closing?: string }[] = [
  {
    title: "The Impact of AI on Children's Development",
    source: "Harvard Graduate School of Education",
    url: "https://www.gse.harvard.edu/ideas/edcast/24/10/impact-ai-childrens-development",
    lead: "This article discusses how AI companions can support:",
    bullets: ["Reading comprehension", "Vocabulary development", "Interactive learning", "Personalized engagement"],
    closing: "Researchers found AI companions that ask children questions during reading and storytelling can improve language development and participation."
  },
  {
    title: "Why AI Robot Toys Could Be Good for Kids",
    source: "University of Alberta",
    url: "https://www.ualberta.ca/folio/2018/12/why-ai-robot-toys-could-be-good-for-kids.html",
    lead: "The article highlights how AI-powered robot toys may:",
    bullets: ["Encourage empathy", "Teach digital-age skills", "Improve interactive learning", "Build emotional awareness"],
    closing: "It argues AI companions can provide more meaningful interaction than passive toys."
  },
  {
    title: "A Literature Review of Artificial Intelligence in Children's Toys",
    source: "SAGE Journals",
    url: "https://journals.sagepub.com/doi/10.1177/20539517251389860",
    lead: "This academic review found AI toys may help:",
    bullets: ["Cognitive development", "STEM learning", "Social-emotional growth", "Early digital literacy"],
    closing: "The review also notes adaptive AI toys can personalize learning experiences based on developmental stages."
  },
  {
    title: "Moxie Is the Robot Pal You Dreamed of as a Kid",
    source: "WIRED",
    url: "https://www.wired.com/story/embodied-moxie-robot-children/",
    lead: "The article profiles the Moxie social robot designed to help children build:",
    bullets: ["Social skills", "Emotional intelligence", "Eye contact", "Reading comprehension", "Kindness and empathy"],
    closing: "The robot uses conversational AI and missions focused on friendship and emotional growth."
  },
  {
    title: "Robots and Children that Learn Together",
    source: "arXiv Research Study",
    url: "https://arxiv.org/abs/2506.18365",
    lead: "This classroom study found children who taught peer-like robots showed:",
    bullets: ["Better long-term learning retention", "Higher engagement", "Improved meta-cognitive thinking", "Stronger grammar and vocabulary performance"],
    closing: "Researchers concluded social robots can function as adaptive learning partners."
  },
  {
    title: "ELLA: Generative AI-Powered Social Robots for Early Language Development at Home",
    source: "arXiv Research Study",
    url: "https://arxiv.org/abs/2603.12508",
    lead: "This study examined an AI-powered language-learning robot for preschool children. Benefits observed included:",
    bullets: ["Interactive storytelling engagement", "Improved language participation", "Personalized dialogue", "Increased at-home learning interaction"],
    closing: "Researchers emphasized the value of adaptive conversational support."
  },
  {
    title: "A HeARTfelt Robot: Social Robot-Driven Deep Emotional Art Reflection with Children",
    source: "arXiv Research Study",
    url: "https://arxiv.org/abs/2409.10710",
    lead: "The research found social robots helped children:",
    bullets: ["Practice empathy", "Improve self-awareness", "Discuss emotions more openly", "Develop social-emotional learning skills"],
    closing: "Children were more comfortable discussing feelings with robot-guided conversations."
  },
  {
    title: "Social Robots for Education: A Review",
    source: "Science Robotics",
    url: "https://www.science.org/doi/10.1126/scirobotics.aat5954",
    lead: "A large-scale analysis of thousands of studies found social robots are increasingly being used to support:",
    bullets: ["Cognitive development", "Emotional support", "Classroom engagement", "Personalized education", "Social skills"],
    closing: "The article concludes interactive robots can create more engaging and inclusive learning environments."
  },
  {
    title: "Why Electronic Pets Might Be the Perfect Pet for Your Child",
    source: "Keyi Robot",
    url: "https://us.keyirobot.com/blogs/buying-guide/why-electronic-pets-might-be-the-perfect-pet-for-your-child",
    lead: "The article explains how AI pets may help children:",
    bullets: ["Learn responsibility", "Develop nurturing behaviors", "Reduce anxiety", "Practice caring interactions", "Experience companionship without real-pet burdens"],
    closing: "It especially emphasizes emotional comfort and social growth."
  },
  {
    title: "Interactive Media — Advantages",
    source: "Wikipedia",
    url: "https://en.wikipedia.org/wiki/Interactive_media",
    lead: "The article summarizes research showing interactive technologies can improve:",
    bullets: ["Communication skills", "Verbal interaction", "Learning attitudes", "Reading abilities", "Multi-style learning engagement"],
    closing: "Interactive educational media was found particularly useful for children with different learning styles and autism spectrum disorders."
  }
];

export default function KidsResearchSummariesPage() {
  return <PageShell><section className="pt-14 pb-6 sm:pt-16 sm:pb-7 lg:pt-20 lg:pb-8"><div className="container-shell"><SectionHeading eyebrow="Article summaries" title="Summaries: Articles on the Effect of Interactive Pets on Children" text="Brief summaries of each research article. Click any title to read the original source." /></div></section><section className="section-pad pt-2"><div className="container-shell"><ol className="space-y-10 list-decimal pl-6 max-w-4xl">{summaries.map((s,i) => <li key={s.url} className="text-slate-700"><Link href={s.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-trust-700 underline hover:text-trust-900">&ldquo;{s.title}&rdquo;</Link><span className="text-slate-600"> — {s.source}</span>{s.lead && <p className="mt-3 text-slate-700">{s.lead}</p>}<ul className="mt-2 list-disc pl-6 space-y-1 text-slate-700">{s.bullets.map(b => <li key={b}>{b}</li>)}</ul>{s.closing && <p className="mt-3 text-slate-700">{s.closing}</p>}</li>)}</ol><p className="mt-12 text-sm text-slate-600"><Link href="/kids-research" className="underline text-trust-700 hover:text-trust-900">&larr; Back to article list</Link></p></div></section></PageShell>;
}
