import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { adminGetTestimonials } from "@/actions/admin";
import TestimonialForm from "@/components/admin/testimonials/TestimonialForm";
import type { Testimonial } from "@/types/testimonial";

type EditTestimonialPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditTestimonialPage({
  params,
}: EditTestimonialPageProps) {
  const { id } = await params;

  const res = await adminGetTestimonials();

  const testimonial: Testimonial | undefined = res.success
    ? res.data?.find((item: Testimonial) => item.id === id)
    : undefined;

  if (!testimonial) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/admin/testimonials"
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
          aria-label="Back to testimonials"
        >
          <ArrowLeft className="size-4" />
        </Link>

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F1729]">
            Edit Testimonial
          </h1>

          <p className="mt-1 text-sm text-[#676F7E]">
            Update the testimonial information.
          </p>
        </div>
      </div>

      <TestimonialForm testimonial={testimonial} />
    </div>
  );
}