import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ServiceFeatures from "@/components/serviceDetails/ServiceFeatures";
import ServiceHero from "@/components/serviceDetails/ServiceHero";
import CTA from "@/components/homePage/Cta";
import { getServiceDetails } from "@/data/services/serviceDetails";
import { adminGetServiceById } from "@/actions/admin";

async function getService(slug: string) {
  const staticService = getServiceDetails(slug);
  try {
    const dbRes = await adminGetServiceById(slug);
    if (dbRes.success && dbRes.data) {
      const s = dbRes.data;
      return {
        id: s.id || staticService?.id || slug,
        title: s.title || staticService?.title || "Service",
        slug: s.slug || staticService?.slug || slug,
        description: s.description || staticService?.description || "",
        animationUrl: s.animation_url || s.animationUrl || staticService?.animationUrl || "",
        color: s.color || staticService?.color || "#0EA5E9",
        features: s.features && s.features.length > 0 ? s.features : (staticService?.features || []),
      };
    }
  } catch (e) {
    // Ignore db error, fallback to static
  }

  return staticService || null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);

  if (!service) {
    return {
      title: "Service Not Found | LeafClutch",
    };
  }

  return {
    title: `${service.title} | LeafClutch`,
    description: service.description,
  };
}

export default async function ServiceDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getService(slug);

  if (!service) {
    notFound();
  }

  return (
    <main>
      <ServiceHero service={service} />
      <ServiceFeatures features={service.features} color={service.color} />
      <CTA
        title={`Ready to Start Your ${service.title} Project?`}
        description={`Contact our team of experts to discuss how our ${service.title.toLowerCase()} services can help accelerate your business goals.`}
      />
    </main>
  );
}
