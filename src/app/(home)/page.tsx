import About from "@/components/homePage/AboutUs";
import AchievementStory from "@/components/homePage/AchivementStory";
import CTA from "@/components/homePage/Cta";
import FAQ from "@/components/homePage/Faq";
import Hero from "@/components/homePage/Hero";
import Products from "@/components/homePage/Products";
import Services from "@/components/homePage/Services";
import Testimonials from "@/components/homePage/Testimonials";
import TrustedCompanies from "@/components/homePage/TrustedCompanies";
import { getHomepageSections } from "@/actions/homepageSection";
import type { HomepageSection } from "@/types/homepageSection";

export default async function Home() {
  const res = await getHomepageSections();
  const rawSections: HomepageSection[] = res.success && res.data ? res.data : [];

  // Filter active sections and sort by sortOrder ascending
  const activeSections = rawSections
    .filter((s) => s.isActive)
    .sort((a, b) => a.sortOrder - b.sortOrder);

  return (
    <>
      <Hero />
      {activeSections.map((section) => {
        switch (section.sectionKey) {
          case "about":
            return (
              <About
                key={section.id}
                title={section.title}
                description={section.description}
                image={section.image}
              />
            );

          case "services":
            return (
              <Services
                key={section.id}
              />
            );

          case "products":
            return (
              <Products
                key={section.id}
              />
            );

          case "statistics":
            return (
              <AchievementStory
                key={section.id}
              />
            );

          case "portfolio":
            // Portfolio section map
            return (
              <section key={section.id} className="bg-white py-12 text-center border-t border-slate-100">
                <div className="mx-auto max-w-7xl px-4">
                  <p className="text-sm font-semibold uppercase tracking-wider text-[#0EA5E9]">
                    Showcase
                  </p>
                  <h2 className="mt-2 text-3xl font-bold text-[#0F1729]">
                    {section.title}
                  </h2>
                  <p className="mt-3 text-base text-[#676F7E] max-w-2xl mx-auto">
                    {section.description}
                  </p>
                </div>
              </section>
            );

          case "testimonials":
            return (
              <Testimonials
                key={section.id}
              />
            );

          case "clients":
            return (
              <TrustedCompanies
                key={section.id}
              />
            );

          case "blogs":
            // Blogs section map
            return (
              <section key={section.id} className="bg-[#F8FAFC] py-12 text-center border-t border-slate-100">
                <div className="mx-auto max-w-7xl px-4">
                  <p className="text-sm font-semibold uppercase tracking-wider text-[#0EA5E9]">
                    Insights
                  </p>
                  <h2 className="mt-2 text-3xl font-bold text-[#0F1729]">
                    {section.title}
                  </h2>
                  <p className="mt-3 text-base text-[#676F7E] max-w-2xl mx-auto">
                    {section.description}
                  </p>
                </div>
              </section>
            );

          case "faq":
            return (
              <FAQ
                key={section.id}
              />
            );

          case "cta":
            return (
              <CTA
                key={section.id}
                title={section.title}
                description={section.description}
              />
            );

          default:
            return null;
        }
      })}
    </>
  );
}
