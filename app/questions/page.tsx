import { FAQSection } from "@/components/faq";
import { InteractivePetsInfo } from "@/components/interactive-pets-info";
import { PageShell } from "@/components/layout";
export default function QuestionsPage() {
  return <PageShell><InteractivePetsInfo /><FAQSection /></PageShell>;
}
