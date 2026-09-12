import { notFound } from "next/navigation";

import { serviceDetails } from "@/data/services/serviceDetails";
import ServiceForm from "@/components/admin/services/ServiceForm";
import { Button } from "@base-ui/react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
type EditServicePageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditServicePage({
  params,
}: EditServicePageProps) {
  const { id } = await params;

  const service = serviceDetails.find(
    (service) => service.id === id
  );

  if (!service) {
    notFound();
  }

  return (
    <div className="space-y-6">
        <Button
          className="bg-[#072069] text-white hover:bg-[#072069]/90"
          render={<Link href="/admin/services" />}
        >
          <ArrowLeft />
        </Button>

      <div className="mt-4">
        <h1 className="text-2xl font-bold tracking-tight text-[#0F1729]">
          Edit Service
        </h1>

        <p className="mt-1 text-sm text-[#676F7E]">
          Update the service information.
        </p>
      </div>

      <ServiceForm service={service} />
    </div>
  );
}