import Link from "next/link";

import ServiceForm from "@/components/admin/services/ServiceForm";

export default function NewServicePage() {
  return (
    <div className="space-y-6">
      <Link
        href="/admin/services"
        className="
          inline-flex
          items-center
          rounded-md
          bg-[#072069]
          px-4
          py-2
          text-sm
          font-medium
          text-white
          transition-colors
          hover:bg-[#072069]/90
        "
      >
        Back to Services
      </Link>

      <div className="mt-3">
        <h1 className="text-2xl font-bold tracking-tight text-[#0F1729]">
          Add Service
        </h1>

        <p className="mt-1 text-sm text-[#676F7E]">
          Add a new service to your website.
        </p>
      </div>

      <ServiceForm />
    </div>
  );
}