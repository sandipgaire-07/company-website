import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { adminGetServiceById } from "@/actions/admin";
import ServiceForm from "@/components/admin/services/ServiceForm";

type EditServicePageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditServicePage({
  params,
}: EditServicePageProps) {
  const { id } = await params;

  const res = await adminGetServiceById(id);

  const service = res.success && res.data ? res.data : null;

  if (!service) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <Link
        href="/admin/services"
        className="
          inline-flex
          size-9
          items-center
          justify-center
          rounded-md
          bg-[#072069]
          text-white
          transition-colors
          hover:bg-[#072069]/90
        "
        aria-label="Back to services"
      >
        <ArrowLeft className="size-4" />
      </Link>

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