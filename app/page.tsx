import { PageShell } from "@/components/layout";
import { JsonLd } from "@/components/json-ld";
import { organizationSchema, websiteSchema } from "@/components/json-ld";
import {
  HomepageHero,
  PopularCategories,
  BestForFinder,
  LatestArticles,
} from "@/components/homepage-sections";

export default function HomePage() {
  return (
    <PageShell>
      <JsonLd schema={[organizationSchema(), websiteSchema()]} />
      <HomepageHero />
      <PopularCategories />
      <BestForFinder />
      <LatestArticles />
    </PageShell>
  );
}
