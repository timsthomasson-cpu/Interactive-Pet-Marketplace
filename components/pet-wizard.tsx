"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { products } from "./site-data";

// ── Types ─────────────────────────────────────────────────────────────────────
type State = {
  audience:        "senior" | "children" | null;
  petType:         "plushy" | "robot"    | null;
  traumatic:        boolean | null;
  soundIssues:      boolean | null;
  animalPref:      "cat" | "dog" | "both" | "other" | null;
  livesAlone:      "alone" | "caregiver" | null;
  childAge:        "under6" | "6to12" | "13plus" | null;
  mobility:        "stationary" | "mobile" | null;
  robotPref:       "cat" | "dog" | "robot" | null;
  traumaticRobot:   boolean | null;
  soundIssuesRobot: boolean | null;
  switchedToPlush:  boolean;
  budget:          "budget" | "value" | "premium" | null;
  exited:           boolean;
};

const INIT: State = {
  audience: null, petType: null,
  traumatic: null, soundIssues: null, animalPref: null, livesAlone: null, childAge: null,
  mobility: null, robotPref: null, traumaticRobot: null, soundIssuesRobot: null, switchedToPlush: false,
  budget: null, exited: false,
};

// ── Step resolver ─────────────────────────────────────────────────────────────
function step(s: State): string {
  if (s.exited) return "exit";
  if (!s.audience) return "audience";
  if (!s.petType) return "petType";

  // ── Plushy path (including switched-from-robot) ──────────────────────────
  const isPlush = s.petType === "plushy" || s.switchedToPlush;
  if (isPlush) {
    if (s.traumatic === null && !s.switchedToPlush) return "traumaticPlushy";
    if (s.traumatic === null && s.switchedToPlush) return "animalPref"; // skip traumatic when redirected
    if (s.traumatic === true) return s.budget === null ? "budget" : "results";
    if (s.soundIssues === null && !s.switchedToPlush) return "soundsPlushy";
    if (!s.animalPref) return "animalPref";
    if (s.audience === "senior" && !s.livesAlone) return "livesAlone";
    if (s.audience === "children" && !s.childAge) return "childAge";
    return s.budget === null ? "budget" : "results";
  }

  // ── Robot path ───────────────────────────────────────────────────────────
  if (!s.mobility) return "mobility";
  if (!s.robotPref) return "robotPref";
  if (s.traumaticRobot === null) return "traumaticRobot";
  if (s.soundIssuesRobot === null) return "soundsRobot";
  if (s.soundIssuesRobot === true) return "soundsWarning";
  return s.budget === null ? "budget" : "results";
}

// ── Product filter ────────────────────────────────────────────────────────────
function filter(s: State) {
  const isPlush = s.petType === "plushy" || s.switchedToPlush;

  let p = products.filter(prod => {
    // Type
    if (isPlush && prod.type !== "Interactive") return false;
    if (!isPlush && s.petType === "robot" && prod.type !== "AI & Robotic") return false;

    // Stationary/Mobile
    if (s.petType === "robot" && s.mobility && !s.switchedToPlush) {
      const want = s.mobility === "stationary" ? "Stationary" : "Mobile";
      if (prod.stationary && prod.stationary !== want) return false;
    }

    // Traumatic — exclude real-animal-looking products
    if (s.traumatic === true || s.traumaticRobot === true) {
      if (prod.category === "Cat" || prod.category === "Dog") return false;
    }

    // Sound control
    const needSound = s.soundIssues === true || (s.switchedToPlush && s.soundIssuesRobot === true);
    if (needSound && (prod.soundLevelControl == null || prod.soundLevelControl < 2)) return false;

    // Animal preference
    const pref = isPlush ? s.animalPref : s.robotPref;
    if (pref === "cat"   && prod.category !== "Cat") return false;
    if (pref === "dog"   && prod.category !== "Dog") return false;
    if (pref === "both"  && prod.category !== "Cat" && prod.category !== "Dog") return false;
    if (pref === "other" && (prod.category === "Cat" || prod.category === "Dog")) return false;
    if (pref === "robot" && prod.category !== "Robot") return false;

    // Age (children)
    if (s.audience === "children" && s.childAge === "under6") {
      if (prod.type !== "Interactive") return false;
      const a = prod.minimumAge ? parseInt(prod.minimumAge) : 0;
      if (!isNaN(a) && a > 5) return false;
    }
    if (s.audience === "children" && s.childAge === "6to12") {
      const a = prod.minimumAge ? parseInt(prod.minimumAge) : 0;
      if (!isNaN(a) && a > 6) return false;
    }

    // Budget
    if (s.budget === "budget"  && prod.priceCategory !== "Budget Friendly") return false;
    if (s.budget === "value"   && prod.priceCategory !== "Best Value") return false;
    if (s.budget === "premium" && prod.priceCategory !== "Premium") return false;

    return true;
  });

  return p.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0)).slice(0, 5);
}

// ── Best For page suggestion ──────────────────────────────────────────────────
function bestForLink(s: State) {
  if (s.audience === "senior") {
    if (s.livesAlone === "alone")     return { href: "/best-pets-for-seniors-living-alone", label: "Best Pets for Seniors Living Alone" };
    if (s.livesAlone === "caregiver") return { href: "/best-pets-for-seniors-in-memory-care-facilities", label: "Best Pets for Memory Care" };
    if (s.petType === "robot" && s.mobility === "mobile") return { href: "/best-pets-for-tech-savvy-seniors", label: "Best Pets for Tech Savvy Seniors" };
    return { href: "/best-for-seniors", label: "All Senior Pet Rankings" };
  }
  if (s.audience === "children") {
    if (s.childAge === "13plus" && s.petType === "robot") return { href: "/best-pets-for-tech-savvy-seniors", label: "Best Interactive Robots" };
    return { href: "/best-pets-for-children-and-families", label: "Best Pets for Children and Families" };
  }
  return { href: "/all-best-for-rankings", label: "All Best For Rankings" };
}

// ── Step components ───────────────────────────────────────────────────────────
type Option = { value: string; label: string; emoji: string; sub?: string };

function Question({
  q, sub, options, onPick,
}: { q: string; sub?: string; options: Option[]; onPick: (v: string) => void }) {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">{q}</h2>
        {sub && <p className="mt-2 text-base text-slate-600">{sub}</p>}
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {options.map(o => (
          <button key={o.value} onClick={() => onPick(o.value)}
            className="flex items-start gap-4 rounded-2xl border-2 border-slate-100 bg-white p-5 text-left transition hover:border-trust-400 hover:shadow-soft active:scale-95">
            <span className="text-3xl shrink-0">{o.emoji}</span>
            <div>
              <p className="text-base font-bold text-slate-900">{o.label}</p>
              {o.sub && <p className="mt-0.5 text-sm text-slate-500">{o.sub}</p>}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Progress dots ─────────────────────────────────────────────────────────────
const STEP_ORDER = ["audience","petType","mobility","robotPref","traumaticPlushy","traumaticRobot",
                    "soundsPlushy","soundsRobot","animalPref","robotPref","livesAlone","childAge","budget","results"];
function Progress({ current }: { current: string }) {
  const steps = ["audience","petType","question3","question4","budget","results"];
  const idx = current === "results" ? 5 : current === "budget" ? 4 :
    ["livesAlone","childAge","soundsRobot","soundsPlushy"].includes(current) ? 3 :
    ["animalPref","robotPref","traumaticPlushy","traumaticRobot"].includes(current) ? 2 :
    ["petType","mobility"].includes(current) ? 1 : 0;
  return (
    <div className="flex items-center gap-1.5">
      {steps.map((_, i) => (
        <div key={i} className={`h-2 rounded-full transition-all duration-300 ${
          i < idx ? "w-6 bg-trust-500" : i === idx ? "w-6 bg-trust-400" : "w-2 bg-slate-200"
        }`} />
      ))}
    </div>
  );
}

// ── Result card ───────────────────────────────────────────────────────────────
function ResultCard({ p }: { p: (typeof products)[number] }) {
  return (
    <div className="flex flex-col rounded-2xl border border-slate-100 bg-white p-4 shadow-soft">
      {p.imageUrl ? (
        <div className="overflow-hidden rounded-xl" style={{ aspectRatio: "4/3" }}>
          <img src={p.imageUrl} alt={p.name} className="h-full w-full object-cover" />
        </div>
      ) : (
        <div className="flex aspect-[4/3] items-center justify-center rounded-xl bg-slate-50 text-slate-300 text-sm">No image</div>
      )}
      <p className="mt-2 text-[10px] font-semibold uppercase tracking-wide text-slate-400">{p.manufacturer}</p>
      <p className="text-sm font-bold leading-snug text-slate-900">{p.name}</p>
      {p.rating && (
        <p className="mt-0.5 text-xs text-amber-400">
          {"★".repeat(Math.round(p.rating))}
          <span className="ml-1 text-slate-500">{p.rating.toFixed(1)}</span>
        </p>
      )}
      <div className="mt-auto flex items-center justify-between pt-3">
        <p className="text-sm font-bold text-slate-900">{p.price}</p>
        <a href={p.productUrl ?? "#"} target="_blank" rel="noopener noreferrer nofollow sponsored"
           className="inline-flex items-center justify-center rounded-full bg-trust-500 px-4 py-1.5 text-xs font-semibold text-white hover:bg-trust-600">
          View Details
        </a>
      </div>
    </div>
  );
}

// ── Main wizard ───────────────────────────────────────────────────────────────
export function PetWizard() {
  const [history, setHistory] = useState<State[]>([INIT]);
  const s = history[history.length - 1];
  const current = step(s);

  function go(updates: Partial<State>) {
    setHistory(h => [...h, { ...s, ...updates }]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function back() {
    if (history.length > 1) {
      setHistory(h => h.slice(0, -1));
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }
  function restart() { setHistory([INIT]); window.scrollTo({ top: 0, behavior: "smooth" }); }

  const results = useMemo(() => current === "results" ? filter(s) : [], [current, s]);
  const bfLink  = useMemo(() => current === "results" ? bestForLink(s) : null, [current, s]);

  return (
    <div className="bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-100 px-4 py-4 sm:px-6">
        <div className="mx-auto max-w-2xl flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-trust-500">Pet Finder</p>
            <h1 className="text-lg font-extrabold text-slate-900">Find Your Perfect Companion</h1>
          </div>
          {history.length > 1 && current !== "results" && (
            <button onClick={back}
              className="text-sm font-semibold text-slate-500 hover:text-slate-700 flex items-center gap-1">
              ← Back
            </button>
          )}
        </div>
        <div className="mx-auto max-w-2xl mt-3">
          <Progress current={current} />
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6">

        {/* ── Step: Who is this for? ── */}
        {current === "audience" && (
          <Question q="Who is this pet for?"
            sub="We'll tailor our questions to find the best match."
            options={[
              { value: "senior",   emoji: "🧓", label: "A Senior",             sub: "Myself, a parent, or a loved one" },
              { value: "children", emoji: "👧", label: "Children & Families",  sub: "A child or the whole family" },
            ]}
            onPick={v => go({ audience: v as State["audience"] })}
          />
        )}

        {/* ── Step: Plushy or Robot? ── */}
        {current === "petType" && (
          <Question q="What kind of companion are you looking for?"
            sub="Both provide genuine companionship — the choice comes down to what matters most."
            options={[
              { value: "plushy", emoji: "🐱", label: "Soft, Plushy Companion", sub: "Realistic fur, purring, heartbeat — warm and comforting" },
              { value: "robot",  emoji: "🤖", label: "AI & Robotic Pet",       sub: "Moves, responds, connects — technology-forward" },
            ]}
            onPick={v => go({ petType: v as State["petType"] })}
          />
        )}

        {/* ── PLUSHY PATH ── */}

        {current === "traumaticPlushy" && (
          <Question q="Any painful or traumatic animal experiences?"
            sub="This helps us avoid products that could trigger difficult memories."
            options={[
              { value: "no",  emoji: "✅", label: "No, no concerns" },
              { value: "yes", emoji: "⚠️", label: "Yes, there are concerns", sub: "We'll focus on companions that don't look like real animals" },
            ]}
            onPick={v => go({ traumatic: v === "yes" })}
          />
        )}

        {current === "soundsPlushy" && (
          <Question q="Any sensitivity to unexpected sounds or movements?"
            sub="Some companions are quieter and more predictable than others."
            options={[
              { value: "no",  emoji: "✅", label: "No, that's fine" },
              { value: "yes", emoji: "🔇", label: "Yes — prefer quieter options", sub: "We'll filter for pets with mute or volume controls" },
            ]}
            onPick={v => go({ soundIssues: v === "yes" })}
          />
        )}

        {current === "animalPref" && (
          <Question q="Any animal preference?"
            options={[
              { value: "cat",   emoji: "🐱", label: "Cat", sub: "Calming, familiar, great for seniors" },
              { value: "dog",   emoji: "🐶", label: "Dog", sub: "Loyal, energetic, great for families" },
              { value: "both",  emoji: "🐾", label: "Either is fine" },
              { value: "other", emoji: "🐼", label: "Something else", sub: "Panda or non-animal shapes" },
            ]}
            onPick={v => go({ animalPref: v as State["animalPref"] })}
          />
        )}

        {current === "livesAlone" && (
          <Question q="Does the senior live alone or with a caregiver?"
            sub="This helps us match the right level of care and complexity."
            options={[
              { value: "alone",     emoji: "🏠", label: "Lives independently", sub: "At home on their own" },
              { value: "caregiver", emoji: "🏥", label: "In care or with a caregiver", sub: "Memory care, assisted living, or family support" },
            ]}
            onPick={v => go({ livesAlone: v as State["livesAlone"] })}
          />
        )}

        {current === "childAge" && (
          <Question q="How old is the child?"
            sub="We'll match products that are age-appropriate and developmentally suitable."
            options={[
              { value: "under6",  emoji: "🍼", label: "Under 6",  sub: "Focus on safety and soft, simple interaction" },
              { value: "6to12",   emoji: "🎒", label: "6 to 12",  sub: "Full range of companions including simpler robots" },
              { value: "13plus",  emoji: "🎮", label: "13 and up", sub: "Full range including advanced AI robots" },
            ]}
            onPick={v => go({ childAge: v as State["childAge"] })}
          />
        )}

        {/* ── ROBOT PATH ── */}

        {current === "mobility" && (
          <Question q="Would you prefer a stationary pet or one that moves around?"
            options={[
              { value: "stationary", emoji: "🛋️", label: "Stationary",    sub: "Stays in one place, sits in your lap or on a surface" },
              { value: "mobile",     emoji: "🏃", label: "Moves around",  sub: "Walks, navigates rooms, follows people" },
            ]}
            onPick={v => go({ mobility: v as State["mobility"] })}
          />
        )}

        {current === "robotPref" && (
          <Question q="Any preference for what it looks like?"
            options={[
              { value: "cat",   emoji: "🐱", label: "Cat-like",    sub: "Feline form, familiar and calming" },
              { value: "dog",   emoji: "🐶", label: "Dog-like",    sub: "Canine form, energetic and loyal" },
              { value: "robot", emoji: "🤖", label: "Robot-style", sub: "Abstract design, clearly a robot" },
            ]}
            onPick={v => go({ robotPref: v as State["robotPref"] })}
          />
        )}

        {current === "traumaticRobot" && (
          <Question q="Any painful or traumatic animal experiences?"
            sub="This helps us avoid robots that closely resemble animals that could trigger difficult memories."
            options={[
              { value: "no",  emoji: "✅", label: "No, no concerns" },
              { value: "yes", emoji: "⚠️", label: "Yes, there are concerns", sub: "We'll focus on clearly robot-style companions" },
            ]}
            onPick={v => go({ traumaticRobot: v === "yes" })}
          />
        )}

        {current === "soundsRobot" && (
          <Question q="Any sensitivity to unexpected sounds or movements?"
            sub="Robotic pets are generally more active and noisier than plushy companions."
            options={[
              { value: "no",  emoji: "✅", label: "No, that's fine" },
              { value: "yes", emoji: "⚠️", label: "Yes — they find that difficult" },
            ]}
            onPick={v => go({ soundIssuesRobot: v === "yes" })}
          />
        )}

        {current === "soundsWarning" && (
          <div className="flex flex-col gap-6">
            <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5">
              <p className="text-lg font-bold text-amber-900">⚠️ Robots may not be the right fit</p>
              <p className="mt-2 text-sm leading-7 text-amber-800">
                AI and robotic pets are generally more active and unpredictable than plushy companions.
                For someone sensitive to unexpected sounds or movements, a soft plushy companion is
                usually a better experience.
              </p>
            </div>
            <Question q="Would you like to explore soft, plushy companions instead?"
              options={[
                { value: "yes", emoji: "🐱", label: "Yes, show me plushy options", sub: "We'll keep your other answers and filter for quieter companions" },
                { value: "no",  emoji: "↩️", label: "No, stay with robots",       sub: "Continue with the robot selection" },
              ]}
              onPick={v => {
                if (v === "yes") {
                  go({ switchedToPlush: true, soundIssues: true, petType: "robot", traumatic: null });
                } else {
                  go({ exited: true });
                }
              }}
            />
          </div>
        )}

        {/* ── BUDGET (shared) ── */}
        {current === "budget" && (
          <Question q="What is your budget?"
            options={[
              { value: "budget",  emoji: "💚", label: "Under $100",      sub: "Budget Friendly — great value, proven comfort" },
              { value: "value",   emoji: "💙", label: "$100 – $199",     sub: "Best Value — enhanced features and quality" },
              { value: "premium", emoji: "💜", label: "Over $200",        sub: "Premium — advanced AI, movement, and technology" },
            ]}
            onPick={v => go({ budget: v as State["budget"] })}
          />
        )}

        {/* ── RESULTS ── */}
        {current === "results" && (
          <div className="flex flex-col gap-6">
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
                {results.length > 0 ? `Your top ${results.length === 1 ? "match" : `${results.length} matches`}` : "No exact matches"}
              </h2>
              {results.length > 0 ? (
                <p className="mt-1 text-base text-slate-600">Based on your answers — ranked by customer rating.</p>
              ) : (
                <p className="mt-1 text-base text-slate-600">
                  Your combination of filters didn&rsquo;t match any products in our current catalogue.
                  Try adjusting one answer, or browse our full rankings.
                </p>
              )}
            </div>

            {results.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {results.map(p => <ResultCard key={p.slug} p={p} />)}
              </div>
            )}

            {bfLink && (
              <div className="rounded-2xl border border-trust-100 bg-trust-50 p-5">
                <p className="text-sm font-semibold text-slate-700">
                  Want to see the full scored and ranked list for your situation?
                </p>
                <Link href={bfLink.href}
                  className="mt-2 inline-flex items-center gap-1 text-base font-bold text-trust-600 underline underline-offset-4 hover:text-trust-800">
                  {bfLink.label} →
                </Link>
              </div>
            )}

            <button onClick={restart}
              className="text-sm font-semibold text-slate-400 underline hover:text-slate-600">
              Start over
            </button>
          </div>
        )}

        {/* ── EXIT ── */}
        {current === "exit" && (
          <div className="flex flex-col gap-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <p className="text-xl font-bold text-slate-900">We want to make sure we get this right</p>
              <p className="mt-2 text-base leading-7 text-slate-600">
                Based on your answers, an AI robotic pet may not be the best fit right now.
                That&rsquo;s a completely valid outcome — and it&rsquo;s why this wizard exists.
              </p>
              <p className="mt-3 text-base leading-7 text-slate-600">
                If you&rsquo;d like a personalised recommendation, feel free to contact us directly
                and we&rsquo;ll help you find the right match.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/contact"
                className="inline-flex items-center justify-center rounded-full bg-trust-500 px-6 py-3 text-sm font-semibold text-white hover:bg-trust-600">
                Contact us
              </Link>
              <button onClick={restart}
                className="text-sm font-semibold text-slate-500 underline hover:text-slate-700">
                Start over
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
