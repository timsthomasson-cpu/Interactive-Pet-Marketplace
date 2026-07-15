import Link from "next/link";
import { PageShell } from "@/components/layout";
import { JsonLd, faqPageSchema, breadcrumbListSchema } from "@/components/json-ld";
import { PRIVACY_FAQ_FOR_SCHEMA } from "@/components/privacy-faq-data";

const FAQ_CATEGORIES = [
  {
    id: "understanding",
    label: "Understanding Interactive Pets",
    icon: "💡",
    questions: [
      {
        q: "What is an interactive pet?",
        a: "An interactive pet is a companion device — typically a soft robotic cat, dog, or other animal — that responds to touch, sound, or movement to provide emotional companionship without the care demands of a live animal. They range from simple plush companions that breathe and purr when held, to sophisticated AI robots with autonomous movement, voice recognition, and app connectivity.",
      },
      {
        q: "What is the difference between an interactive pet and an AI and robotic pet?",
        a: "Interactive pets focus on emotional comfort and tactile response — they are soft, familiar in form, and react immediately to touch with no setup required. AI and robotic pets add autonomous movement, sensors, voice recognition, and app connectivity that adapts behaviour over time. Both provide companionship. The right choice depends on whether the person values simplicity and warmth, or more advanced interaction and technology.",
      },
      {
        q: "Are interactive pets just toys?",
        a: "No. Interactive and robotic companion pets are clinically studied companion devices, not novelty toys. Peer-reviewed studies published in journals including the Journal of the American Medical Directors Association and The Gerontologist show measurable reductions in loneliness, depression, and anxiety in older adults who use them regularly. Quality varies significantly — cheap novelty products perform like toys, while well-designed companion pets demonstrably do not.",
      },
      {
        q: "Why do people choose an interactive pet instead of a real animal?",
        a: "The five most common reasons are: housing or care facility restrictions on live animals, allergies to pet dander, inability to manage feeding or veterinary care, wanting companionship without the grief of an animal's eventual death, and needing a lower-maintenance option after years of pet ownership. Many purchases are made by adult children selecting for a parent who can no longer safely care for a real animal.",
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
        a: "Yes. Interactive and robotic companion pets are clinically proven to benefit seniors facing loneliness, isolation, or early cognitive decline. A 2024 study presented at the Gerontological Society of America's Annual Scientific Meeting found significant reductions in depression, anxiety, and loneliness among 45 community-dwelling women over 65 who received a robotic companion pet. They are most effective as a complement to — not a replacement for — regular human contact.",
        link: { href: "/research-articles#loneliness", text: "See supporting research →" },
      },
      {
        q: "Are interactive pets suitable for someone with dementia?",
        a: "Yes, and memory care is one of their most thoroughly documented use cases. Research on PARO — a therapeutic robot seal cleared by the FDA as a medical device — shows significant reductions in agitation and improved mood in people with dementia. A 2021 systematic review confirmed improved social engagement and companionship from robotic companion use in memory care settings. Soft, familiar cat and dog forms consistently outperform abstract robot designs for this audience. Most care facilities that restrict live animals permit robotic companions.",
        link: { href: "/best-pets-for-seniors-in-memory-care-facilities", text: "See Memory Care rankings →" },
      },
      {
        q: "Are interactive pets good for children?",
        a: "Yes. A 2025 longitudinal study — the INMA Project — found that children with regular pet contact at ages 1 and 4–5 showed significantly fewer emotional problems at ages 7–8. A 2024 Taiwanese study confirmed that pet caregiving builds empathy and prosocial behaviour in children. Robotic pets deliver similar developmental benefits through touch-responsive feedback loops, without allergens, housing restrictions, or the unpredictability of live animals. Familiar cat and dog forms with direct touch response work best for younger children.",
        link: { href: "/best-pets-for-children-and-families", text: "See Children and Families rankings →" },
      },
      {
        q: "Who typically buys interactive pets?",
        a: "Three buyer groups account for most purchases: adult children buying for an elderly parent who lives alone or has moved to assisted living; families buying for children where allergies, apartment rules, or schedules make a live pet impractical; and seniors buying for themselves as a lower-maintenance alternative to pet ownership they can no longer manage. Gift purchases spike significantly around Mother's Day, Father's Day, and major winter holidays.",
      },
      {
        q: "Are interactive pets appropriate for someone with anxiety?",
        a: "Yes, particularly soft, touch-responsive companion pets that move predictably or remain stationary. Research on animal-assisted therapy consistently shows calming effects from tactile interaction with animals, driven by oxytocin release and reduced cortisol — not the animal's intelligence or complexity. Interactive companion pets provide the same sensory comfort loop without unexpected sounds, sudden movements, or unpredictable behaviour that can heighten anxiety.",
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
        a: "Start with the person's situation, not the product's features. Answer four questions first: Does the person value soft tactile comfort or more advanced interaction? Do they prefer cats or dogs? Can they manage a charging cable and basic app, or do they need zero-setup operation? Is camera access and data privacy a concern? Once those are clear, our ranked lists filter products by the specific criteria that matter for each situation.",
        link: { href: "/all-best-for-rankings", text: "Explore all Best For rankings →" },
      },
      {
        q: "What is the difference between budget-friendly and premium interactive pets?",
        a: "Budget-friendly companion pets in the $30–$100 range deliver tactile comfort — soft fur, simple sounds, breathing motion — with no setup, no app, and no connectivity required. Premium AI and robotic pets at $150–$500 and above add autonomous movement, voice interaction, live camera access, and adaptive behaviour. Premium is not inherently better: for seniors or children who value simplicity and warmth over technology, an $89 Chongker companion frequently outperforms a $499 AI robot on the metrics that matter most.",
      },
      {
        q: "What should I look for when buying for someone with limited mobility or dexterity?",
        a: "Prioritise four features: touch activation that responds to gentle pressure with no buttons or app required, lightweight construction under 2 lbs, standard USB or battery charging that does not require fine motor precision, and no small components that could become a hazard. Avoid products that require frequent app interaction, have multiple small buttons, or need accessories to operate basic functions.",
        link: { href: "/best-pets-for-seniors-with-vision-challenges", text: "See accessibility-focused rankings →" },
      },
      {
        q: "Do interactive pets need Wi-Fi or a smartphone app?",
        a: "It depends on the category. Traditional companion pets — including all Chongker, Joy for All, and Perfect Petzzz products — require no Wi-Fi, no app, and no account setup. They activate on touch or sound directly. AI and robotic pets — including the Enabot EBO Air 2S and the Robot Pet Dog — require app connectivity for full function and remote monitoring. Every product listing on this site specifies clearly whether Wi-Fi or an app is required.",
      },
      {
        q: "How long do batteries last and how do these products charge?",
        a: "Simple companion pets run on standard AA batteries for 4–8 hours of active use, or include a rechargeable battery with similar endurance. Advanced AI robots typically charge via USB-C and offer 2–6 hours of active use per charge, with longer standby periods between sessions. For care facility or gift use, prefer products with USB-C charging over battery-swapping for ease of maintenance. Specific battery life is listed on each manufacturer's product page.",
      },
    ],
  },
  {
    id: "privacy",
    label: "Camera and Privacy",
    icon: "🔒",
    questions: [
      {
        q: "Should I be concerned about cameras in robotic pet devices?",
        a: "Cautious is the right posture. A camera-equipped robot moving through your home differs meaningfully from a fixed security camera: it can enter private spaces, maintains an active connection to the manufacturer's servers, and is subject to the same vulnerabilities as any IoT connected device. Security researchers have documented real incidents with major robot brands, including unauthorised camera access and unintended feed exposure. Camera-equipped pet robots are not unsafe to own, but the manufacturer's privacy architecture should be part of your buying decision.",
      },
      {
        q: "What data does a robotic pet manufacturer typically collect?",
        a: "Data collection varies by brand but typically includes: video and audio from the camera — sometimes stored in the cloud by default — spatial mapping and movement data, app usage information, and voice clips if voice commands are enabled. The authoritative source is the manufacturer's privacy policy. Read it specifically for what is stored locally versus on company servers, whether data is shared with third parties, how long recordings are retained, and what happens to your data if the company is acquired or you cancel a subscription.",
      },
      {
        q: "What practical steps protect my privacy when using a camera robot?",
        a: "Four steps protect most users. First, place the robot on a guest Wi-Fi network separate from your main home network, preventing access to other devices. Second, disable cloud storage and data-sharing settings in the app if local storage is available. Third, verify the camera has a physical shutter or a clearly visible hardware indicator light — not just a software privacy mode. Fourth, avoid placing camera-equipped robots in bedrooms, bathrooms, or spaces where medical care occurs.",
      },
      {
        q: "Are there high-quality interactive pets with no camera?",
        a: "Yes, and they represent the majority of top-rated products on this site. Chongker's Percy Robot Cat and MateCat Pro, the full Joy for All companion line, and Perfect Petzzz products all score at or near the top of our emotional comfort and simplicity rankings with zero camera, zero Wi-Fi, and zero data collection. For most senior and family use cases, a camera-free companion pet is the stronger recommendation on both privacy and simplicity grounds.",
        link: { href: "/best-pets-for-privacy-conscious-families", text: "See privacy-conscious rankings →" },
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
        a: "Yes. Interactive and robotic companion pets are among the most consistently well-received gifts for elderly relatives — particularly those who have expressed loneliness, recently moved to assisted living, or had to give up a pet they could no longer care for. The essential criterion is quality: choose a product with soft realistic fur and direct touch response ($60 and above) rather than a novelty item. A well-chosen companion pet signals that the giver understood the recipient's actual emotional situation.",
      },
      {
        q: "How do I know if the recipient will actually use an interactive pet?",
        a: "Two factors predict successful adoption. First, form familiarity — cats and dogs are accepted immediately; abstract robot designs are frequently set aside unused. Second, zero setup requirement — if the recipient must pair an app, create an account, or manage charging before anything happens, adoption rate drops significantly. Joy for All and Chongker products meet both criteria: familiar animal forms, immediate touch response, and no technology barrier. Starting with a sub-$100 option reduces the financial risk of testing fit.",
      },
      {
        q: "What occasions are most appropriate for giving an interactive pet as a gift?",
        a: "The highest-volume purchase occasions are Mother's Day, Father's Day, birthdays, and major winter holidays. The highest-impact occasions — where the gift lands most meaningfully — are life transitions: a parent moving to assisted living, the loss of a spouse, giving up a pet due to declining health, or a recent diagnosis of early dementia or depression. Giving during a transition rather than at a conventional gift occasion typically produces a stronger and more lasting emotional response.",
      },
      {
        q: "What if the recipient does not like the interactive pet?",
        a: "Check the return window before purchasing. Products bought through Amazon typically allow returns within 30 days of delivery. Manufacturer direct purchases vary — some offer 30 days, others 15. If genuine uncertainty exists, start with a lower price point: a $45–$75 Joy for All companion is a lower-stakes introduction than a $178 MateCat Pro. The Percy Robot Cat at $89 is the most common entry-level gift purchase because it balances realistic quality, accessible price, and a straightforward return window.",
      },
    ],
  },
];

const allFaqItems = [
  ...FAQ_CATEGORIES.flatMap((cat) =>
    cat.questions.map((q) => ({ question: q.q, answer: q.a }))
  ),
  ...PRIVACY_FAQ_FOR_SCHEMA,
];

export const metadata = {
  title: "FAQ — Interactive Pets Buyer's Guide | Interactive Pet Marketplace",
  description: "Honest answers about interactive and robotic companion pets: who benefits, how to choose, camera privacy, gifting advice, and research citations.",
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

      <section className="bg-slate-50 py-10 sm:py-14">
        <div className="container-shell max-w-4xl">
          <div className="rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-soft">
            <h2 className="text-2xl font-extrabold text-slate-900">Didn&rsquo;t find your answer?</h2>
            <p className="mt-3 text-base leading-7 text-slate-600">
              Send us a note and we&rsquo;ll get back to you — usually within one business day.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
              <Link href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-trust-500 px-6 py-3 text-sm font-semibold text-white hover:bg-trust-600">
                Contact us
              </Link>
              <Link href="/research-articles"
                className="text-sm font-semibold text-blue-600 underline hover:text-blue-700">
                Browse the Research Library →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
