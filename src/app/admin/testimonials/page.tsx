import Link from "next/link";
import { Plus } from "lucide-react";

import TestimonialList from "@/components/admin/testimonials/TestimonailList";

export default function TestimonialsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F1729]">
            Testimonials
          </h1>

          <p className="mt-1 text-sm text-[#676F7E]">
            Manage the testimonials displayed on your website.
          </p>
        </div>

        <Link
          href="/admin/testimonials/new"
          className="
            inline-flex
            items-center
            justify-center
            gap-2
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
          <Plus className="size-4" />
          Add Testimonial
        </Link>
      </div>

      <TestimonialList />
    </div>
  );
}