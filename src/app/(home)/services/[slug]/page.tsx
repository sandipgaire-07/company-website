import { notFound } from "next/navigation";

import ServiceFeatures from "@/components/serviceDetails/ServiceFeatures";
import ServiceHero from "@/components/serviceDetails/ServiceHero";
import { getServiceDetails, serviceDetails } from "@/data/services/serviceDetails";

export function generateStaticParams() {
  return serviceDetails.map((service) => ({ slug: service.slug }));
}

export default async function ServiceDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceDetails(slug);

  if (!service) {
    notFound();
  }

  return (
    <main>
      <ServiceHero service={service} />
      <ServiceFeatures features={service.features} color={service.color} />
    </main>
  );
}
