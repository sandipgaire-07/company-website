import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import CareerForm from "@/components/admin/careers/CareerForm";

export default function NewCareerPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
       <Link
  href="/admin/careers"
  className="inline-flex size-9 items-center justify-center rounded-md bg-[#072069] text-white transition-colors hover:bg-[#072069]/90"
  aria-label="Back to careers"
>
  <ArrowLeft className="size-4" />
</Link>

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F1729]">
            Add Job
          </h1>

          <p className="mt-1 text-sm text-[#676F7E]">
            Create a new job opening for your careers page.
          </p>
        </div>
      </div>

      <CareerForm />
    </div>
  );
}