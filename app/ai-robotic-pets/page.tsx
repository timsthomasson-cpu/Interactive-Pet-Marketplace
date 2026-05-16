import Link from "next/link";
import { PageShell } from "@/components/layout";
import { CompareTable, GroupedProducts, TrustBoxesRow } from "@/components/sections";
import { products } from "@/components/site-data";
import { SectionHeading } from "@/components/ui";
import { CategoryHeader } from "@/components/category-header";
import { JsonLd, productSchema, breadcrumbListSchema } from "@/components/json-ld";

export const metadata = {
  title: "AI & Robotic Pets — Smart interactive companions",
  description: "Advanced robotic pets with motion, sensors, app features, and AI-driven behavior. Compare ratings, features, prices, and camera privacy considerations."
};

export default function Page() {
  const items = products.filter((p) => p.type === "AI & Robotic");
  const topPicks = items.filter((p) => p.flags?.topPick && p.imageUrl);
  return (
    <PageShell>
      <JsonLd
        schema={[
          breadcrumbListSchema([
            { name: "Home", path: "/" },
            { name: "AI & Robotic Pets", path: "/ai-robotic-pets" }
          ]),
          ...items.map(productSchema)
        ]}
      />
      <section className="section-pad pb-2 sm:pb-3">
        <div className="container-shell">
          <SectionHeading
            as="h1"
            eyebrow="Advanced smart options"
            title="AI & Robotic Pets"
            text="Articulated companions that move, respond, and adapt over time."
          />
        </div>
      </section>

      <CategoryHeader
        topPicks={topPicks}
        rotatorTitle="Our Top AI & Robotic Pet Picks"
        body={[
          <>
            <strong className="text-slate-900">What AI and robotic pets are.</strong>{" "}
            AI and robotic pets are physically articulated companions that move, respond, and adapt over time. Unlike plushy companions, which are soft and stationary, robotic pets walk, roll, look around, and react to their environment. Many include sensors for touch and sound, cameras for navigation, and software that gives each pet a distinct personality. The most advanced models are app-connected and learn the household over time.
          </>,
          <>
            <strong className="text-slate-900">Who they&rsquo;re for.</strong>{" "}
            This category appeals to tech-curious adults, families with older children who want a more interactive experience than a plush companion offers, and buyers shopping for a &ldquo;wow&rdquo; gift. They&rsquo;re also increasingly chosen by people who want a substantial robotic presence — something that moves around the house, recognizes faces, and can interact through voice — without the responsibility of feeding, training, or veterinary care. Robotic pets carry a steeper learning curve than plushy companions, so they tend to be a better fit when the recipient is comfortable charging a device, opening an app, and updating firmware occasionally.
          </>,
          <>
            <strong className="text-slate-900">A note on cameras and privacy.</strong>{" "}
            Many of these models include cameras — sometimes as a main feature (home monitoring, check-on-pets-from-work) and sometimes for navigation. A camera-equipped robot that moves around the house is a different kind of device than a stationary security camera: it can travel into bedrooms, bathrooms, and other spaces a fixed camera wouldn&rsquo;t see. This isn&rsquo;t a reason to avoid these products, but it is a reason to take the privacy questions seriously before buying. We&rsquo;ve written a{" "}
            <Link href="/questions#privacy" className="underline text-trust-700 hover:text-trust-900">
              buyer&rsquo;s guide to camera and privacy questions
            </Link>{" "}
            that walks through what to ask about any connected pet robot before you bring it home.
          </>
        ]}
        checklist={{
          title: "What to look for when choosing",
          items: [
            ["Mobility", "Some models walk on legs; others roll on wheels. Wheeled designs handle hard floors well; legged designs are more lifelike on carpet."],
            ["App and Wi-Fi", "Most premium models require a smartphone app for setup. Confirm the app supports your phone OS and that Wi-Fi is available where the pet will live."],
            ["Voice and AI features", "Newer models include conversational AI, voice recognition, or both. Older models may only respond to touch and movement."],
            ["Camera and privacy", "Many AI pets include cameras for navigation, person detection, or home monitoring. Check the manufacturer's privacy policy and whether camera features can be disabled."],
            ["Charging", "Look for self-docking models if the recipient won't want to remember to plug in the pet manually."]
          ]
        }}
      />

      <TrustBoxesRow variant="ai-robotic" />
      <GroupedProducts items={items} pageName="AI & Robotic Pets" />
      <CompareTable items={items} title="AI & Robotic Pets at a glance" text="Quickly scan type, audience, highlight, rating, and price." />
    </PageShell>
  );
}
