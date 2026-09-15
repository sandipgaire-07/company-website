import type { Metadata } from "next";
import ServicesHero from "@/components/services/ServicesHero";
import ServicesIntro from "@/components/services/ServicesIntro";
import ServicesGrid from "@/components/services/ServicesGrid";
import WhyChooseServices from "@/components/services/WhyChooseServices";
import CTA from "@/components/homePage/Cta";
import { getServices } from "@/actions/content";
import { serviceDetails as staticServices } from "@/data/services/serviceDetails";

export const metadata: Metadata = {
  title: "Our Services | LeafClutch",
  description:
    "Explore technology services from LeafClutch including web development, mobile app development, software engineering, graphic design, digital marketing, and IT consultancy.",
};

export default async function ServicesPage() {
  const res = await getServices();
  const fetchedServices = res.success && res.data && res.data.length > 0 ? res.data : staticServices;

  const services = fetchedServices.map((s: any) => {
    const staticMatch = staticServices.find((st) => st.slug === s.slug || st.id === s.id || st.title.toLowerCase() === s.title?.toLowerCase());
    return {
      id: s.id || staticMatch?.id || s.slug,
      title: s.title || staticMatch?.title || "Service",
      slug: s.slug || staticMatch?.slug || s.title?.toLowerCase().replace(/\s+/g, "-") || "service",
      description: s.description || staticMatch?.description || "",
      animationUrl: s.animationUrl || s.animation_url || staticMatch?.animationUrl || "",
      color: s.color || staticMatch?.color || "#0EA5E9",
      features: s.features && s.features.length > 0 ? s.features : (staticMatch?.features || []),
    };
  });

  return (
    <main>
      <ServicesHero />
      <ServicesIntro />
      <ServicesGrid services={services} />
      <WhyChooseServices />
      <CTA
        title="Ready to Scale Your Digital Products?"
        description="Whether you need a custom web platform, a mobile application, or IT consultancy, our specialists are ready to turn your vision into reality."
      />
    </main>
  );
}
