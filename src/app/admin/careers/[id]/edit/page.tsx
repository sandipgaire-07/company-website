import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { adminGetJobBySlug } from "@/actions/admin";
import CareerForm from "@/components/admin/careers/CareerForm";

type EditCareerPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditCareerPage({
  params,
}: EditCareerPageProps) {
  const { id } = await params;

  const res = await adminGetJobBySlug(id);

  if (!res.success || !res.data) {
    notFound();
  }

  const job = res.data;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/careers"
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
          aria-label="Back to careers"
        >
          <ArrowLeft className="size-4" />
        </Link>

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F1729]">
            Edit Job Opening
          </h1>

          <p className="mt-1 text-sm text-[#676F7E]">
            Update the details for{" "}
            <span className="font-medium">{job.title}</span>.
          </p>
        </div>
      </div>

      <CareerForm job={job} jobId={job.id} />
    </div>
  );
}