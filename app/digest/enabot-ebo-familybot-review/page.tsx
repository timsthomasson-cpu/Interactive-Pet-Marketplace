import { DigestArticle, ArticleProductCard } from "@/components/digest-layout";
import { products } from "@/components/site-data";

export const metadata = {
  title: "Enabot EBO FamilyBot Product Review | Interactive Companion Digest",
  description:
    "A full comparison of Enabot's EBO FamilyBot lineup — EBO Air 2, EBO Air 2 Plus, EBO Air 2S, EBO X, and EBO Max — including features, pricing, and honest cons for each model.",
};

const tableCellClass = "border border-slate-200 px-3 py-2 align-top";
const tableHeadClass = "border border-slate-200 px-3 py-2 align-top font-bold text-slate-900 bg-slate-50 whitespace-nowrap";

const COMPARISON_ROWS: [string, string, string, string, string, string][] = [
  ["Verified price", "$179.00", "$359.00", "$279.00", "$789.00", "~$549.99*"],
  ["Camera", "2K", "3K", "2.5K, 137° field of view", "4K (8MP), stabilized gimbal", "4K, stabilized gimbal"],
  ["Mobility", "Tracked wheels, compact 9cm body", "Tracked wheels, 10mm obstacle crossing", "Tracked wheels, 10mm obstacle crossing", "Spherical body, 360° in-wheel motors, 1.5 m/s top speed", "Wheeled, V-SLAM navigation"],
  ["Patrol routes", "—", "Up to 10 custom routes", "Up to 10 custom routes", "Auto-mapped custom routes", "Up to 10 manually-guided paths"],
  ["AI / assistant", "Basic", "AI Assistant + Smart Patrol", "AI Tracking (no AI Assistant)", "Smart Personal Assistant", "Multimodal LLM agent"],
  ["Safety monitoring", "—", "Personalized alerts", "—", "Fall detection, cry detection, stranger detection", "Fall detection with instant alerts"],
  ["Storage", "32GB SD included, expandable to 256GB", "32GB built-in + 32GB microSD", "SD card, optional cloud subscription", "Expandable, cloud option", "Expandable, cloud option"],
  ["Privacy controls", "Not documented by manufacturer", "One-tap camera/mic disable", "Not documented by manufacturer", "Not documented by manufacturer", "App-based controls"],
];

export default function Article() {
  return (
    <DigestArticle
      meta={{
        tag: "Review",
        title: "Enabot EBO FamilyBot Product Review",
        deck: "Enabot's EBO lineup are self-driving home robots built around a camera, a companion app, and AI. Here's how the EBO Air 2, EBO Air 2 Plus, EBO Air 2S, EBO X, and EBO Max compare — features, pricing, and the honest drawbacks of each.",
        date: "July 2026",
        readTime: "9 min",
      }}
    >
      <p className="text-slate-700 leading-7">
        Enabot's EBO robots are pitched as an all-in-one pet-sitter, home-security camera, and
        family companion that roams the house on its own rather than sitting fixed on a shelf.
        The current lineup spans five models, from the budget-friendly EBO Air 2 up to the
        flagship EBO X. Below is a feature comparison followed by a closer look at each model,
        including the drawbacks worth knowing before buying.
      </p>

      <h2 className="mt-10 mb-3 text-2xl font-extrabold text-slate-900">Feature comparison</h2>
      <div className="overflow-x-auto rounded-xl border border-slate-200">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className={tableHeadClass}>Feature</th>
              <th className={tableHeadClass}>EBO Air 2</th>
              <th className={tableHeadClass}>EBO Air 2 Plus</th>
              <th className={tableHeadClass}>EBO Air 2S</th>
              <th className={tableHeadClass}>EBO X</th>
              <th className={tableHeadClass}>EBO Max</th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON_ROWS.map((row) => (
              <tr key={row[0]}>
                {row.map((cell, i) => (
                  <td key={i} className={i === 0 ? `${tableCellClass} font-semibold text-slate-900 bg-slate-50 whitespace-nowrap` : `${tableCellClass} text-slate-600`}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-2 text-xs text-slate-400">
        * EBO Max is not yet in our verified Product Matrix. Its price and specs above are sourced
        directly from Enabot&rsquo;s own product pages as of this writing and should be treated as
        preliminary until added to full product data.
      </p>

      <h2 className="mt-10 mb-3 text-2xl font-extrabold text-slate-900">EBO Air 2 FamilyBot</h2>
      <p className="text-slate-700 leading-7">
        Enabot&rsquo;s entry-level robot. An AI home monitoring robot designed to keep your home,
        pets, and loved ones connected and secure, with an interactive laser pointer to entertain
        pets while you&rsquo;re away. It runs on tracked wheels that handle carpet and hard
        flooring, with a compact 9cm body that can slip under beds and furniture.
      </p>
      <h3 className="mt-6 mb-2 text-lg font-bold text-slate-800">Cons</h3>
      <ul className="list-disc space-y-2 pl-5 text-slate-700">
        <li>
          <strong>Tripping hazard.</strong> Because it roams the floor autonomously, it can end up
          underfoot, especially for young kids, elderly family members, or anyone walking through
          a room at night. Keeping walkways clear reduces the risk.
        </li>
        <li>
          <strong>Anti-fall sensing has limits.</strong> Enabot advertises drop-sensing to keep the
          robot from tipping off ledges or stairs, but independent reviewers of this Air-series
          design found the anti-fall sensors didn&rsquo;t reliably catch every edge in testing.
          Homes with open stairwells should block them off rather than rely on the sensor alone.
        </li>
        <li>
          <strong>Fewer smart features.</strong> No patrol scheduling, fall detection, or AI
          assistant &mdash; those arrive on the higher-tier models.
        </li>
      </ul>
      <ArticleProductCard
        slug="ebo-air-2-familybot"
        reason="The most affordable EBO — best for basic pet monitoring and a laser toy, without patrol routes or an AI assistant."
        products={products}
      />

      <h2 className="mt-10 mb-3 text-2xl font-extrabold text-slate-900">EBO Air 2 Plus FamilyBot</h2>
      <p className="text-slate-700 leading-7">
        AI home monitoring robot with an AI Assistant, designed to keep your home, pets, and loved
        ones connected and secure. It carries all of the EBO Air 2S&rsquo;s features plus the AI
        assistant and smart patrol, and comes in multiple colors. Manufacturer documentation
        confirms one-tap camera and microphone disable, local face-data processing, and 32GB
        built-in storage plus a bundled 32GB microSD card.
      </p>
      <h3 className="mt-6 mb-2 text-lg font-bold text-slate-800">Cons</h3>
      <ul className="list-disc space-y-2 pl-5 text-slate-700">
        <li>
          <strong>Tripping hazard.</strong> Same underlying design as the Air 2: a low-profile
          robot that moves through the house on its own can be an unexpected obstacle, particularly
          on stairs, in dark hallways, or in homes with small children or mobility-limited
          residents.
        </li>
        <li>
          <strong>Reliance on tracked wheels.</strong> Like other Air-series models, it can slow
          down or struggle on thick carpet or high thresholds despite the 10mm obstacle rating.
        </li>
        <li>
          <strong>Highest price in the Air series.</strong> At roughly double the base Air 2&rsquo;s
          price, the added features may not justify the cost for buyers who just want basic pet
          monitoring.
        </li>
      </ul>
      <ArticleProductCard
        slug="ebo-air-2-plus-familybot"
        reason="Adds the AI assistant, smart patrol, and one-tap privacy controls — our top pick in the Air lineup."
        products={products}
      />

      <h2 className="mt-10 mb-3 text-2xl font-extrabold text-slate-900">EBO Air 2S FamilyBot</h2>
      <p className="text-slate-700 leading-7">
        A newer generation than the base EBO Air 2, with more features but without the AI
        Assistant. AI home monitoring robot designed to keep your home, pets, and loved ones
        connected and secure, currently offered in white only. It supports up to 10 patrol routes
        and real-time obstacle avoidance, with expressive eyes that track motion.
      </p>
      <h3 className="mt-6 mb-2 text-lg font-bold text-slate-800">Cons</h3>
      <ul className="list-disc space-y-2 pl-5 text-slate-700">
        <li>
          <strong>Tripping hazard.</strong> As with the rest of the Air series, its low-slung,
          self-driving movement through the home creates the same underfoot risk for kids, pets,
          and anyone not expecting a robot at floor level.
        </li>
        <li>
          <strong>Sits close in price to the Air 2 Plus</strong> without matching its AI Assistant
          or one-tap privacy controls, which can make the value proposition unclear next to its
          sibling model.
        </li>
        <li>
          <strong>Same drop-detection limitations</strong> as other Air-series robots &mdash;
          supervision is still recommended near stairs and ledges.
        </li>
      </ul>
      <ArticleProductCard
        slug="ebo-air-2s-familybot"
        reason="A step up from the base Air 2 with AI tracking and dual screen eyes, minus the AI assistant."
        products={products}
      />

      <h2 className="mt-10 mb-3 text-2xl font-extrabold text-slate-900">EBO X FamilyBot</h2>
      <p className="text-slate-700 leading-7">
        Enabot&rsquo;s premium, security-focused model. A high-resolution camera and an AI
        Assistant keep your home, pets, and loved ones connected and secure, with Smart Tracking
        and Sound Source Location for enhanced monitoring, plus fall detection and intelligent
        patrol.
      </p>
      <h3 className="mt-6 mb-2 text-lg font-bold text-slate-800">Cons</h3>
      <ul className="list-disc space-y-2 pl-5 text-slate-700">
        <li>
          <strong>Software and app issues.</strong> Multiple outlets, including TechRadar and
          Digital Trends, reported a clunky setup app, non-functional QR codes, tedious firmware
          updates, and an unreliable Alexa integration.
        </li>
        <li>
          <strong>Inconsistent &ldquo;follow me&rdquo; tracking.</strong> Reviewers found the
          tracking mode can lose the user easily and keep moving after someone sits down,
          sometimes bumping into furniture.
        </li>
        <li>
          <strong>Struggles on thick carpet and thresholds</strong> despite premium hardware —
          reviewers noted noticeable slowdown on carpet thicker than about 5mm.
        </li>
        <li>
          <strong>Tripping/underfoot hazard.</strong> At nearly 7 inches across and capable of 1.5
          m/s, it&rsquo;s a heavier, faster-moving obstacle than the Air-series bots — more likely
          to cause a stumble if it crosses someone&rsquo;s path unexpectedly, particularly in low
          light.
        </li>
        <li>
          <strong>Premium price, mixed reliability.</strong> At this price point, the reported
          software issues are a harder pill to swallow than on the cheaper Air-series models.
        </li>
      </ul>
      <ArticleProductCard
        slug="ebo-x-familybot"
        reason="The flagship security model, with fall detection and a smart personal assistant — at a premium price."
        products={products}
      />

      <h2 className="mt-10 mb-3 text-2xl font-extrabold text-slate-900">EBO Max</h2>
      <p className="text-slate-700 leading-7">
        Enabot&rsquo;s newest model, positioned between the Air 2 Plus and the EBO X. It ships
        with a 4K camera with time-lapse, skeleton tracking, and locked-on recording modes; a
        multimodal AI agent that combines vision, audio, and context; V-SLAM navigation; 360°
        sound localization with a 4-mic array; and fall detection with instant alerts. EBO Max is
        not yet part of our verified Product Matrix, so treat the details here as preliminary and
        confirm current pricing directly on Enabot&rsquo;s site before buying.
      </p>
      <h3 className="mt-6 mb-2 text-lg font-bold text-slate-800">Cons</h3>
      <ul className="list-disc space-y-2 pl-5 text-slate-700">
        <li>
          <strong>Manual path setup required.</strong> Unlike EBO X&rsquo;s automatic mapping, EBO
          Max needs paths manually guided in the app before V-SLAM can refine them — more setup
          effort than plug-and-play.
        </li>
        <li>
          <strong>No stairs handling.</strong> Like the rest of the lineup, it can&rsquo;t navigate
          stairs, so multi-level homes need separate units or manual carrying between floors — and
          stairwells remain a fall/tripping hazard for both the robot and people who might not see
          it on a landing.
        </li>
        <li>
          <strong>Tripping hazard.</strong> Same underfoot risk as the rest of the line: an
          autonomously roaming robot can end up in a walkway, particularly during a scheduled
          patrol when no one is expecting it to move.
        </li>
        <li>
          <strong>New product, limited track record.</strong> As a recent release, it has less
          long-term reliability data than the established Air-series or EBO X.
        </li>
      </ul>

      <h2 className="mt-10 mb-3 text-2xl font-extrabold text-slate-900">Bottom line</h2>
      <p className="text-slate-700 leading-7">
        Across the whole EBO line, the biggest recurring caveat isn&rsquo;t any one model&rsquo;s
        spec sheet &mdash; it&rsquo;s that these are autonomous, floor-level robots sharing space
        with the same people and pets they&rsquo;re meant to protect. That means real tripping and
        stair-fall risk in homes with young children, older adults, mobility aids, or multi-level
        layouts, regardless of which model you choose. The EBO Air 2 and EBO Air 2S suit buyers who
        want basic pet-cam functionality at a lower price; the EBO Air 2 Plus adds AI-assistant and
        privacy-control polish; EBO Max is a strong new option for AI-driven monitoring at a
        mid-range price; and EBO X, while the most capable on paper, has the most consistent
        complaints about software reliability for its premium price tag.
      </p>
    </DigestArticle>
  );
}
