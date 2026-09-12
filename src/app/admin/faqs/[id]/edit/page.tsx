import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { faqs } from "@/data/faqs";
import FaqForm from "@/components/admin/faq/FaqForm";

type EditFaqPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditFaqPage({
  params,
}: EditFaqPageProps) {
  const { id } = await params;

  const faq = faqs.find((item) => item.id === id);

  if (!faq) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/faqs"
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
          aria-label="Back to FAQs"
        >
          <ArrowLeft className="size-4" />
        </Link>

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F1729]">
            Edit FAQ
          </h1>

          <p className="mt-1 text-sm text-[#676F7E]">
            Update the frequently asked question.
          </p>
        </div>
      </div>

      <FaqForm faq={faq} />
    </div>
  );
}