import { SectionHeading } from "./ui";

const audienceBullets = [
  "Seniors living independently or in assisted living",
  "Loved ones experiencing loneliness",
  "Families wanting safe, low-maintenance playmates and companionship",
  "Anyone who loves pets but needs an easier solution"
];

const benefitBullets = [
  "Gentle daily comfort",
  "Realistic touch response",
  "Safe for apartments and senior living communities",
  "Allergy-friendly",
  "Easy for older adults to enjoy"
];

const reasons: { title: string; emoji: string; bullets: string[] }[] = [
  {
    title: "Emotional companionship",
    emoji: "❤️",
    bullets: [
      "Reduces loneliness",
      "Provides daily companionship without needing another person",
      "Gives comfort during grief or loss",
      "Offers a sense of routine and attachment",
      "Mimics affection (responds to voice, touch, presence)",
      "Helps people who miss having a pet but cannot own one",
      "Provides a calming presence at night",
      "Creates emotional bonding without unpredictability"
    ]
  },
  {
    title: "No real-pet responsibilities",
    emoji: "🧹",
    bullets: [
      "No feeding",
      "No walking",
      "No litter box",
      "No grooming",
      "No shedding",
      "No fleas or ticks",
      "No vet bills",
      "No vaccinations",
      "No pet insurance",
      "No boarding when traveling",
      "No odor",
      "No cleanup accidents"
    ]
  },
  {
    title: "Good for seniors",
    emoji: "👵👴",
    bullets: [
      "Easy companionship in assisted living",
      "Helps reduce isolation",
      "Can stimulate conversation",
      "May improve mood in memory care settings",
      "No fall risk from pulling on a leash",
      "No physical burden of care",
      "Can remind about medication if programmed",
      "Familiar, comforting routine"
    ]
  },
  {
    title: "Good for children",
    emoji: "👦👧",
    bullets: [
      "Teaches nurturing behavior",
      "Low-risk first \u201cpet\u201d responsibilities before real pet ownership",
      "Safe for children with allergies",
      "No biting or scratching risk (depending on model)",
      "Interactive play",
      "Builds responsibility habits",
      "Encourages imaginative play",
      "Can be educational"
    ]
  },
  {
    title: "Allergy-friendly",
    emoji: "🌿",
    bullets: [
      "No pet dander",
      "No fur allergies",
      "No asthma triggers",
      "No saliva allergens"
    ]
  },
  {
    title: "Housing restrictions",
    emoji: "🏠",
    bullets: [
      "Apartments that ban pets",
      "Rental properties with pet deposits",
      "HOA restrictions",
      "Temporary housing situations",
      "Hotels or dorm environments"
    ]
  },
  {
    title: "Travel convenience",
    emoji: "\u2708\ufe0f",
    bullets: [
      "Can be left at home without care",
      "Portable travel companion",
      "No boarding cost",
      "No pet sitter needed"
    ]
  },
  {
    title: "Health and therapeutic reasons",
    emoji: "\ud83e\ude7a",
    bullets: [
      "Anxiety reduction",
      "Stress relief",
      "Sensory comfort",
      "Dementia therapy use",
      "Autism sensory engagement",
      "Depression support",
      "PTSD calming aid",
      "Hospital comfort tool",
      "Rehab motivation"
    ]
  },
  {
    title: "Predictability and control",
    emoji: "\ud83c\udf9b\ufe0f",
    bullets: [
      "Behaves consistently",
      "No aggression surprises",
      "Programmable responses",
      "Can match owner preferences",
      "Can be turned off when needed",
      "No destructive behavior"
    ]
  },
  {
    title: "Technology interest",
    emoji: "\ud83e\udd16",
    bullets: [
      "Fascination with robotics",
      "Enjoy AI interaction",
      "Voice recognition interest",
      "Smart home integration appeal",
      "Novelty value",
      "Enjoy testing emerging AI products"
    ]
  },
  {
    title: "Entertainment value",
    emoji: "\ud83c\udfae",
    bullets: [
      "Fun interactions",
      "Tricks and responses",
      "Personality simulation",
      "Voice conversation for some models",
      "Play games",
      "Dance and music reactions for some models"
    ]
  },
  {
    title: "Educational uses for some models",
    emoji: "\ud83d\udcda",
    bullets: [
      "Teach AI concepts",
      "Teach robotics",
      "Coding interaction",
      "STEM learning",
      "Behavior modeling"
    ]
  },
  {
    title: "Safer than live pets in most situations",
    emoji: "\u26a0\ufe0f",
    bullets: [
      "No bites",
      "No scratches",
      "No disease transmission",
      "No escape risk",
      "No property damage from chewing or clawing"
    ]
  },
  {
    title: "Better for busy professionals",
    emoji: "\u23f1\ufe0f",
    bullets: [
      "No time burden",
      "No schedule disruption",
      "No early-morning walks",
      "No emergency pet-care interruptions"
    ]
  },
  {
    title: "Pet replacement for former pet owners",
    emoji: "\ud83d\udcad",
    bullets: [
      "Former pet owners who cannot physically manage a live pet",
      "Emotional substitute after losing a pet"
    ]
  }
];

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-600">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span aria-hidden className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-trust-500" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function InteractivePetsInfo() {
  return (
    <section className="section-pad pt-10 sm:pt-12">
      <div className="container-shell space-y-12">
        <SectionHeading
          eyebrow="About interactive pets"
          title="Who would enjoy them, what they offer, and why people choose them."
          text="A plain-English look at the audiences, benefits, and motivations behind interactive and AI companion pets."
        />

        {/* Audience block */}
        <div className="card p-6 sm:p-8">
          <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl">
            Who would enjoy interactive pets?
          </h3>
          <BulletList items={audienceBullets} />
        </div>

        {/* Benefits block */}
        <div className="card p-6 sm:p-8">
          <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl">
            What are the benefits?
          </h3>
          <BulletList items={benefitBullets} />
        </div>

        {/* Reasons — collapsible accordion */}
        <div>
          <h3 className="text-xl font-semibold text-slate-900 sm:text-2xl">
            All the reasons to explore interactive pets
          </h3>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            Tap any reason to expand.
          </p>
          <div className="mt-6 space-y-3">
            {reasons.map((reason) => (
              <details key={reason.title} className="group card p-5 sm:p-6">
                <summary className="cursor-pointer list-none flex items-center justify-between gap-4">
                  <span className="text-base font-semibold text-slate-900 sm:text-lg">
                    <span aria-hidden className="mr-2">{reason.emoji}</span>
                    {reason.title}
                  </span>
                  <span
                    aria-hidden
                    className="shrink-0 text-trust-700 text-lg transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <BulletList items={reason.bullets} />
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
