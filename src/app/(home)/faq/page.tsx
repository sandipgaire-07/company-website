import FAQ from "@/components/homePage/Faq";
import CTA from "@/components/homePage/Cta";

export const metadata = {
  title: "Frequently Asked Questions | LeafClutch",
  description: "Find answers to common questions about LeafClutch products, services, and software solutions.",
};

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-slate-50/50">
      <FAQ />
      <CTA />
    </main>
  );
}
