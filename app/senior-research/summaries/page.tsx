import { PageShell } from "@/components/layout";
import { SectionHeading } from "@/components/ui";
import Link from "next/link";
import { JsonLd, breadcrumbListSchema } from "@/components/json-ld";

const summaries: { title: string; source: string; url: string; intro?: string; sectionLabel?: string; bullets: string[]; closing?: string }[] = [
  {
    title: "Studies Show Benefits of Robotic Pets for Loved Ones With Dementia, Loneliness",
    source: "AARP",
    url: "https://www.aarp.org/caregiving/basics/robotic-companion-animals/",
    intro: "AARP article discussing how animatronic pets help reduce stress, agitation, and loneliness in older adults, particularly those with dementia. It highlights positive emotional responses and increased engagement in care settings.",
    sectionLabel: "Main advantages identified",
    bullets: ["Reduced agitation", "Emotional comfort", "Easier caregiving", "Improved mood", "Companionship without maintenance"]
  },
  {
    title: "Impacts of Low-cost Robotic Pets for Older Adults",
    source: "NIH / PMC",
    url: "https://pmc.ncbi.nlm.nih.gov/articles/PMC8082946/",
    intro: "Large academic review of multiple robotic pet studies in elder care. Reviewed robotic cats, dogs, teddy bears, and the well-known PARO robotic seal.",
    sectionLabel: "Main findings",
    bullets: ["Improved emotional well-being", "Better social interaction", "Reduced loneliness", "Positive effects in residential care facilities", "Strong acceptance among seniors"]
  },
  {
    title: "Robotic Pet Use Among Community-Dwelling Older Adults",
    source: "Oxford Academic",
    url: "https://academic.oup.com/psychsocgerontology/article/75/9/2018/5891953",
    intro: "Research specifically focused on seniors living independently rather than in facilities.",
    sectionLabel: "Important insight — robotic pets were most effective for seniors who:",
    bullets: ["Live alone", "Have fewer social connections", "Have less active lifestyles"],
    closing: "Key benefit: AI/robotic pets may help seniors remain emotionally healthier while aging in place."
  },
  {
    title: "Robotic Pets Can Dramatically Improve the Lives of Older Adults With Dementia and Depression",
    source: "Forbes / Well Beings",
    url: "https://wellbeings.org/well-beings-x-forbes-robotic-pets-can-dramatically-improve-the-lives-of-older-adults-with-dementia-and-depression/",
    intro: "A practical overview of how newer AI-enabled robotic pets respond to touch, sound, and interaction.",
    sectionLabel: "Key advantages",
    bullets: ["Calming aggressive dementia behaviors", "Lower stress levels", "Comfort during isolation", "No feeding, walking, or cleanup requirements", "Adaptive interaction improves engagement over time"]
  },
  {
    title: "Effect of a Robot Pet Companion on the Mood of Older Adults",
    source: "PubMed / American Journal of Geriatric Psychiatry",
    url: "https://www.ajgponline.org/article/S1064-7481(25)00558-5/fulltext",
    intro: "Clinical research showing measurable mood improvement among older adults using robot pets.",
    sectionLabel: "Interesting result — caregivers reported the pets became:",
    bullets: ["Conversation starters", "Social focal points", "Sources of positive interaction with visitors and family"],
    closing: "This suggests benefits extend beyond direct companionship."
  },
  {
    title: "Effect of Social Robots on Depression and Loneliness",
    source: "ScienceDirect / JAMDA",
    url: "https://www.jamda.com/article/S1525-8610(24)00176-2/fulltext",
    intro: "A meta-analysis examining multiple social robot studies in long-term care settings.",
    sectionLabel: "Major conclusions — social robots showed:",
    bullets: ["Significant reduction in depression", "Significant reduction in loneliness", "Better outcomes in group activities", "Stronger results over longer-term use"],
    closing: "This is one of the stronger evidence-based summaries."
  },
  {
    title: "Robotic Pets Provide Comfort to Dementia Patients",
    source: "Pacific Neuroscience Institute",
    url: "https://www.pacificneuroscienceinstitute.org/blog/brain-health/robotic-pets-provide-comfort-to-dementia-patients/",
    intro: "Medical-oriented article focused on Alzheimer's and dementia care.",
    sectionLabel: "Advantages highlighted",
    bullets: ["Reduced feelings of isolation", "Emotional soothing", "Comfort during confusion or distress", "Increased calmness and engagement"],
    closing: "The article emphasizes that robotic pets are particularly useful when real pets are impractical."
  },
  {
    title: "ElliQ AI Companion Robot Review",
    source: "WIRED",
    url: "https://www.wired.com/review/elliq-ai-companion-robot/",
    intro: "Coverage of the AI companion robot ElliQ designed specifically for older adults living alone.",
    sectionLabel: "Unique AI-focused benefits",
    bullets: ["Conversational companionship", "Wellness reminders", "Activity suggestions", "Encouragement of healthy habits", "Family communication support"],
    closing: "This moves beyond \u201Crobotic pet\u201D into proactive AI companionship."
  },
  {
    title: "Companion Robots to Mitigate Loneliness Among Older Adults",
    source: "Frontiers in Psychology",
    url: "https://www.frontiersin.org/articles/10.3389/fpsyg.2023.1106633/full",
    intro: "Research examining opinions and ethical considerations surrounding AI companion robots.",
    sectionLabel: "Main takeaway — older adults generally view companion robots positively when:",
    bullets: ["Used to supplement human care", "Designed transparently", "Focused on reducing loneliness"],
    closing: "The study also explores ethical concerns around emotional attachment."
  },
  {
    title: "Wired for Companionship",
    source: "The Gerontologist / Oxford Academic",
    url: "https://academic.oup.com/gerontologist/article/65/12/gnaf219/8268528",
    intro: "A newer 2025 meta-analysis examining AI-enabled social robots for older adults.",
    sectionLabel: "Important findings — AI social robots appear especially helpful for:",
    bullets: ["Persistent loneliness", "Emotionally isolated seniors", "Older adults seeking regular interaction", "Individuals with limited mobility"],
    closing: "The study also notes outcomes vary depending on personality and emotional needs."
  }
];

export const metadata = {
  title: "Research Summaries — Interactive Pets and Seniors",
  description: "Concise summaries of research articles on robotic pets and AI companions for older adults: loneliness, dementia care, depression, and mood."
};

export default function SeniorResearchSummariesPage() {
  return <PageShell><JsonLd schema={breadcrumbListSchema([{ name: "Home", path: "/" }, { name: "Senior Research", path: "/senior-research" }, { name: "Article Summaries", path: "/senior-research/summaries" }])} /><section className="pt-14 pb-2 sm:pt-16 sm:pb-3 lg:pt-20 lg:pb-3"><div className="container-shell"><SectionHeading as="h1" eyebrow="Article summaries" title="Summaries: Articles on the Effect of Interactive Pets on Seniors" text="Brief summaries of each research article. Click any title to read the original source." /></div></section><section className="pt-0 pb-10 sm:pb-12"><div className="container-shell"><ol className="space-y-10 list-decimal pl-6 max-w-4xl">{summaries.map((s) => <li key={s.url} className="text-slate-700"><Link href={s.url} target="_blank" rel="noopener noreferrer" className="font-semibold text-trust-700 underline hover:text-trust-900">&ldquo;{s.title}&rdquo;</Link><span className="text-slate-600"> — {s.source}</span>{s.intro && <p className="mt-3 text-slate-700">{s.intro}</p>}{s.sectionLabel && <p className="mt-3 font-semibold text-slate-800">{s.sectionLabel}</p>}<ul className="mt-2 list-disc pl-6 space-y-1 text-slate-700">{s.bullets.map(b => <li key={b}>{b}</li>)}</ul>{s.closing && <p className="mt-3 text-slate-700">{s.closing}</p>}</li>)}</ol><p className="mt-12 text-sm text-slate-600"><Link href="/senior-research" className="underline text-trust-700 hover:text-trust-900">&larr; Back to article list</Link></p></div></section></PageShell>;
}
