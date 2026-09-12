import { notFound } from "next/navigation";

import { testimonials } from "@/data/testimonials";
import TestimonialForm from "@/components/admin/testimonials/TestimonialForm";
import { Button } from "@base-ui/react";
import Link from "next/link";

type EditTestimonialPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditTestimonialPage({
  params,
}: EditTestimonialPageProps) {
  const { id } = await params;

  const testimonial = testimonials.find(
    (item) => item.id === id
  );

  if (!testimonial) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
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