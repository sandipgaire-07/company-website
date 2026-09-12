import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { jobs } from "@/data/jobs";
import CareerForm from "@/components/admin/careers/CareerForm";
import { Button } from "@/components/ui/button";

type EditCareerPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditCareerPage({
  params,
}: EditCareerPageProps) {
  const { id } = await params;

  const job = jobs.find((item) => item.id === id);

  if (!job) {
    notFound();
  }

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
            Edit Job
          </h1>

          <p className="mt-1 text-sm text-[#676F7E]">
            Update the job opening information.
          </p>
        </div>
      </div>

      <CareerForm job={job} />
    </div>
  );
}