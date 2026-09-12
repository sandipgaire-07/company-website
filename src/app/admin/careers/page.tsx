import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import CareerList from "@/components/admin/careers/CareerList";

export default function CareersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F1729]">
            Careers
          </h1>

          <p className="mt-1 text-sm text-[#676F7E]">
            Manage the job openings displayed on your website.
          </p>
        </div>

        <Button
          className="bg-[#072069] text-white hover:bg-[#072069]/90"
          render={<Link href="/admin/careers/new" />}
        >
          <Plus />
          Add Job
        </Button>
      </div>

      <CareerList />
    </div>
  );
}