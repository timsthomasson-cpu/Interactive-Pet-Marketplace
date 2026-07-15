import Link from "next/link";
import { PageShell } from "@/components/layout";
import { JsonLd, faqPageSchema, breadcrumbListSchema } from "@/components/json-ld";
import { PRIVACY_FAQ_FOR_SCHEMA } from "@/components/privacy-faq-data";

// ── All FAQ questions, grouped by category ────────────────────────────────────
const FAQ_CATEGORIES = [
  {
    id: "understanding",
    label: "Understanding Interactive Pets",
    icon: "💡",
    questions: [
      {
        q: "What is an interactive pet?",
        a: "An interactive pet is a companion device that responds to touch, sound, or movement in ways that feel emotionally engaging — without the responsibilities of a live animal. They range from simple plush companions that breathe and purr, to sophisticated AI robots that walk, respond to voice commands, and adapt their behaviour over time.",
      },
      {
        q: "What's the difference between an 'interactive pet' and an 'AI & robotic pet'?",
        a: "Interactive pets typically focus on emotional comfort and tactile response — soft, warm, and familiar. They react to touch and require no setup. AI & robotic pets add advanced capabilities: autonomous movement, sensors, voice recognition, and app connectivity. Both provide companionship; the right choice depends on what the person actually needs.",
      },
      {
        q: "Are these just toys?",
        a: "They're marketed and used as companions, not toys — and research supports that distinction. Peer-reviewed studies show measurable reductions in loneliness, depression, and anxiety in older adults who use them regularly. That said, quality varies enormously. Cheap novelty products behave like toys; well-designed companion pets do not.",
      },
      {
        q: "What are the main reasons people choose interactive pets over real ones?",
        a: "The most common reasons: housing or care facility restrictions on live animals, allergies, inability to manage the physical demands of pet care, wanting a companion without the grief of eventual loss, or simply needing something lower-maintenance. Many people also add an interactive pet after giving up a real pet they could no longer look after.",
      },
    ],
  },
  {
    id: "who",
    label: "Who Are They For?",
    icon: "👥",
    questions: [
      {
        q: "Are interactive pets good for seniors?",
        a: "A growing body of research says yes — particularly for seniors facing loneliness, isolation, or early cognitive decline. A 2024 study presented at the Gerontological Society of America's Annual Scientific Meeting found companion robotic pets measurably reduced depression, anxiety, and loneliness in community-dwelling women over 65. They work best alongside — not instead of — regular human contact.",
        link: { href: "/research-articles#loneliness", text: "See supporting research →" },
      },
      {
        q: "Are they suitable for someone with dementia or memory loss?",
        a: "Yes, and this is one of their strongest documented use cases. Research on PARO (the therapeutic robot seal) and Joy for All companions shows reduced agitation, improved mood, and better social engagement in memory care settings. Soft, familiar forms — cats and dogs — tend to work better for this audience than abstract robots. Most facilities that restrict real pets allow robotic companions.",
        link: { href: "/best-pets-for-seniors-in-memory-care-facilities", text: "See our Memory Care rankings →" },
      },
      {
        q: "Are interactive pets good for children?",
        a: "Yes, with the right product for the age group. Research shows regular interaction with animals — real or robotic — builds empathy, emotional intelligence, and social confidence in children. Robotic pets are particularly useful where allergies, housing rules, or family schedules make a real pet impractical. Touch-responsive pets with familiar animal forms work best for younger children.",
        link: { href: "/best-pets-for-children-and-families", text: "See our Children & Families rankings →" },
      },
      {
        q: "Who buys these most often?",
        a: "Most purchases fall into three groups: adult children buying for an elderly parent who lives alone or in a care facility; families buying for children where a real pet isn't practical; and seniors buying for themselves as a lower-maintenance alternative to pet ownership they can no longer manage.",
      },
      {
        q: "Are they appropriate for someone with anxiety?",
        a: "Potentially yes — particularly soft, touch-responsive companions that don't move unpredictably. Research on animal-assisted therapy shows calming effects from tactile interaction with animals. Interactive pets offer similar sensory comfort without noise, shedding, or sudden movements that can heighten anxiety. We evaluate this specifically in our anxiety-focused rankings.",
        link: { href: "/best-pets-for-anxiety", text: "See Best Pets for Anxiety →" },
      },
    ],
  },
  {
    id: "choosing",
    label: "Choosing the Right One",
    icon: "🎯",
    questions: [
      {
        q: "How do I choose the right interactive pet?",
        a: "Start with the person, not the product. What matters most: emotional comfort and touch, or more advanced interaction? Cat or dog preference? Are they comfortable with technology, or is simplicity essential? Is camera privacy a concern? Once you've answered those, our Best For rankings filter by the specific factors that matter.",
        link: { href: "/all-best-for-rankings", text: "Explore all Best For rankings →" },
      },
      {
        q: "What's the difference between budget and premium options?",
        a: "Budget-friendly companions ($30–$100) typically focus on tactile comfort — soft fur, simple sounds, breathing motion. They require minimal setup and have a low learning curve. Premium AI & robotic pets ($150–$500+) add autonomous movement, voice interaction, camera access, and app connectivity. Neither is inherently better — it depends on what the user actually values.",
      },
      {
        q: "What should I look for if buying for someone with limited mobility or dexterity?",
        a: "Prioritise pets with simple on/off operation (no buttons or apps required), lightweight construction, and touch response that works with gentle pressure. Avoid products that require frequent charging access, have small components, or need app interaction for basic functions.",
        link: { href: "/best-pets-for-seniors-with-vision-challenges", text: "See accessibility-focused rankings →" },
      },
      {
        q: "Do these products need Wi-Fi or a smartphone app?",
        a: "It depends on the product. Most traditional companion pets (Chongker, Joy for All, Perfect Petzzz) require no Wi-Fi, no app, and no setup — they respond directly to touch and sound. AI & robotic pets like the Enabot EBO or Robot Pet Dog typically require app connectivity for full functionality and remote access. We note this clearly in every product listing.",
      },
      {
        q: "How long do batteries last? What about charging?",
        a: "Simpler pets typically run on AA batteries (2–8 hours depending on use) or include a rechargeable option. More advanced AI robots usually charge via USB-C with longer between-charge intervals. Battery life and charging method are listed on each manufacturer's product page — check before purchasing if this matters for your situation.",
      },
    ],
  },
  {
    id: "privacy",
    label: "Camera & Privacy",
    icon: "🔒",
    questions: [
      {
        q: "Should I be worried about cameras in pet robots?",
        a: "Cautious is reasonable. A camera-equipped robot that moves through your home is functionally different from a fixed security camera: it can travel into private spaces, stays connected to the manufacturer's servers, and like any connected device can be affected by software vulnerabilities. There have been documented incidents involving major robot brands. None of this means camera-equipped pets are unsafe — it means the manufacturer's privacy and security features should be part of your buying decision.",
      },
      {
        q: "What data does the manufacturer typically collect?",
        a: "This varies significantly by brand. Mainstream camera robots typically collect: video and audio from the camera, movement data and room maps, app usage data, and sometimes voice clips if voice commands are enabled. The manufacturer's privacy policy is the authoritative source — look specifically for what's stored locally vs. on their servers, whether data is sold to third parties, and how long recordings are retained.",
      },
      {
        q: "What practical steps can I take to protect my privacy?",
        a: "Put the robot on its own Wi-Fi network (a guest network works), so it can't access other devices on your home network. Review and disable any data-sharing settings in the app. Check whether the camera has a physical shutter or indicator light. Review the privacy policy before purchasing. For high-sensitivity environments (bedrooms, medical areas), consider a non-camera companion pet instead.",
      },
      {
        q: "Are there good options without cameras?",
        a: "Yes — and for many use cases, a camera-free companion pet is the right answer. Chongker's Percy and MateCat lines, Joy for All companions, and Perfect Petzzz products all offer genuine emotional value with zero camera, zero Wi-Fi, and zero data collection. They score highest in our privacy-focused rankings.",
        link: { href: "/best-pets-for-privacy-conscious-families", text: "See Privacy-Conscious rankings →" },
      },
    ],
  },
  {
    id: "gifting",
    label: "Gifting",
    icon: "🎁",
    questions: [
      {
        q: "Are interactive pets good gifts?",
        a: "Yes — they're one of the better 'unusual but genuinely thoughtful' gift categories, particularly for elderly relatives who have expressed loneliness or who used to have pets. The key is choosing a quality product rather than a novelty item. A well-chosen companion pet says you paid attention to someone's actual emotional situation.",
      },
      {
        q: "How do I know if my parent or grandparent will actually use it?",
        a: "The main risk factors are: resistance to technology (mitigated by choosing a no-setup companion pet that requires no app or Wi-Fi) and the 'it feels strange' reaction (mitigated by choosing a familiar form — cat or dog — over an abstract robot). Joy for All and Chongker products have strong track records with this demographic and are available at lower price points, which reduces the risk of a misfire.",
      },
      {
        q: "What occasions are appropriate for this kind of gift?",
        a: "Birthdays, holidays, and Mother's/Father's Day are most common. They're also frequently given after a significant life change — moving to assisted living, losing a spouse, giving up a real pet they could no longer care for — when the emotional need is clear and present.",
      },
      {
        q: "What if the recipient doesn't like it?",
        a: "Check the retailer's return policy before purchasing. Products bought through Amazon typically have a 30-day return window. Products bought directly from manufacturers vary — check the specific page. If you're genuinely unsure, start with a less expensive option as a test. A $45 Joy for All cat is a lower-stakes introduction than a $178 MateCat Pro.",
      },
    ],
  },
];

// Build JSON-LD from all categories
const allFaqItems = [
  ...FAQ_CATEGORIES.flatMap((cat) =>
    cat.questions.map((q) => ({ question: q.q, answer: q.a }))
  ),
  ...PRIVACY_FAQ_FOR_SCHEMA,
];

export const metadata = {
  title: "FAQ — Interactive Pets Buyer's Guide | Interactive Pet Marketplace",
  description: "Honest answers to common questions about interactive and robotic pets: who they help, how to choose, camera privacy, gifting, and more.",
};

function FAQAccordion({ q, a, link }: { q: string; a: string; link?: { href: string; text: string } }) {
  return (
    <details className="group border-b border-slate-100 last:border-0">
      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 py-5 pr-2">
        <span className="text-base font-semibold text-slate-900 leading-snug">{q}</span>
        <span aria-hidden className="mt-0.5 shrink-0 text-xl font-light text-slate-400 transition-transform group-open:rotate-45">+</span>
      </summary>
      <div className="pb-5 pr-8">
        <p className="text-sm leading-7 text-slate-600">{a}</p>
        {link && (
          <Link href={link.href}
            className="mt-2 inline-flex items-center gap-1 text-sm font-semibold text-blue-600 underline hover:text-blue-700">
            {link.text}
          </Link>
        )}
      </div>
    </details>
  );
}

export default function FAQPage() {
  return (
    <PageShell>
      <JsonLd schema={[
        breadcrumbListSchema([{ name: "Home", path: "/" }, { name: "FAQ", path: "/questions" }]),
        faqPageSchema(allFaqItems),
      ]} />

      {/* Hero */}
      <section className="bg-slate-50 border-b border-slate-100 py-10 sm:py-14">
        <div className="container-shell max-w-4xl">
          <p className="eyebrow">Buyer&rsquo;s Guide</p>
          <h1 className="mt-1 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
            Frequently Asked Questions
          </h1>
          <p className="mt-3 max-w-2xl text-lg leading-8 text-slate-600">
            Honest answers about interactive and robotic companion pets — who they help,
            how to choose, privacy considerations, and gifting guidance.
          </p>
          {/* Category quick-jump */}
          <div className="mt-6 flex flex-wrap gap-2">
            {FAQ_CATEGORIES.map((cat) => (
              <a key={cat.id} href={`#${cat.id}`}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-4 py-1.5 text-sm font-medium text-slate-700 transition hover:border-trust-300 hover:text-trust-700">
                <span>{cat.icon}</span>{cat.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ sections */}
      <section className="bg-white py-10 sm:py-14">
        <div className="container-shell max-w-4xl space-y-12">
          {FAQ_CATEGORIES.map((cat) => (
            <div key={cat.id} id={cat.id} className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-2xl">{cat.icon}</span>
                <h2 className="text-xl font-extrabold text-slate-900">{cat.label}</h2>
              </div>
              <div className="mt-4 divide-y divide-slate-100 rounded-2xl border border-slate-100 bg-white px-6 shadow-soft">
                {cat.questions.map((faq) => (
                  <FAQAccordion key={faq.q} {...faq} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-50 py-10 sm:py-14">
        <div className="container-shell max-w-4xl">
          <div className="rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-soft">
            <h2 className="text-2xl font-extrabold text-slate-900">Didn&rsquo;t find your answer?</h2>
            <p className="mt-3 text-base leading-7 text-slate-600">
              Send us a note and we&rsquo;ll get back to you — usually within one business day.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact" className="inline-flex items-center justify-center rounded-full bg-trust-500 px-6 py-3 text-sm font-semibold text-white hover:bg-trust-600">
                Contact us
              </Link>
              <Link href="/research-articles" className="text-sm font-semibold text-blue-600 underline hover:text-blue-700">
                Browse the Research Library →
              </Link>
            </div>
          </div>
        </div>
      </section>

    </PageShell>
  );
}
