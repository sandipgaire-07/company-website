import { notFound } from "next/navigation";

import ServiceFeatures from "@/components/serviceDetails/ServiceFeatures";
import ServiceHero from "@/components/serviceDetails/ServiceHero";
import { getServiceDetails, serviceDetails } from "@/data/services/serviceDetails";
import { adminGetServiceById } from "@/actions/admin";

export default async function ServiceDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const staticService = getServiceDetails(slug);
  const dbRes = await adminGetServiceById(slug);

  const service = dbRes.success && dbRes.data ? dbRes.data : staticService;

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
