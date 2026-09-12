import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import CareerForm from "@/components/admin/careers/CareerForm";

export default function NewCareerPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="shrink-0 text-[#676F7E] hover:bg-[#F8FAFC]"
          render={<Link href="/admin/careers" />}
          aria-label="Back to careers"
        >
          <ArrowLeft className="size-5" />
        </Button>

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F1729]">
            New Job Opening
          </h1>
          <p className="mt-1 text-sm text-[#676F7E]">
            Fill in the details below to post a new job.
          </p>
        </div>
      </div>

      <CareerForm />
    </div>
  );
}
