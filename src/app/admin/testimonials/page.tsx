import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
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

        <Button
          className="bg-linear-to-r bg-[#072069] text-white hover:opacity-90"
          render={<Link href="/admin/testimonials/new" />}
        >
          <Plus />
          Add Testimonial
        </Button>
      </div>

      <TestimonialList />
    </div>
  );
}