
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import TestimonialForm from "@/components/admin/testimonials/TestimonialForm";

export default function NewTestimonialPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button
          type="button"
          size="icon"
          className="bg-[#072069] text-white hover:bg-[#072069]/90"
          render={<Link href="/admin/testimonials" />}
        >
          <ArrowLeft />
        </Button>

        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F1729]">
            Add Testimonial
          </h1>

          <p className="mt-1 text-sm text-[#676F7E]">
            Add a new testimonial to your website.
          </p>
        </div>
      </div>

      <TestimonialForm />
    </div>
  );
}

