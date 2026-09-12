import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { companies } from "@/data/companies";
import CollaborationForm from "@/components/admin/collaboration/CollaborationForm";

type EditCollaborationPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditCollaborationPage({
  params,
}: EditCollaborationPageProps) {
  const { id } = await params;

  const company = companies.find((item) => item.id === id);

  if (!company) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/collaborations"
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
          aria-label="Back to collaborations"
        >
          <ArrowLeft className="size-4" />
        </Link>

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F1729]">
            Edit Collaboration
          </h1>

          <p className="mt-1 text-sm text-[#676F7E]">
            Update the collaboration information.
          </p>
        </div>
      </div>

      <CollaborationForm collaboration={company} />
    </div>
  );
}