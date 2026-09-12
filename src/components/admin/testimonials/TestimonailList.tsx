
import Link from "next/link";
import { Pencil, Star } from "lucide-react";

import { testimonials } from "@/data/testimonials";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import DeleteTestimonialDialog from "./DeleteTestimonialDialog";

export default function TestimonialList() {
  return (
    <Card className="border-[#DADEE7] shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg text-[#0F1729]">
          All Testimonials
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="
                flex flex-col gap-4 rounded-xl
                border border-[#DADEE7] p-4
                transition
                hover:border-[#0EA5E9]/40
                hover:bg-[#F8FAFC]
                sm:flex-row sm:items-center sm:justify-between
              "
            >
              {/* Testimonial information */}
              <div className="flex items-start gap-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.clientName}
                  className="size-14 shrink-0 rounded-full object-cover"
                />

                <div className="min-w-0">
                  <h3 className="font-semibold text-[#0F1729]">
                    {testimonial.clientName}
                  </h3>

                  <p className="text-sm text-[#676F7E]">
                    {testimonial.role} · {testimonial.companyName}
                  </p>

                  <p className="mt-2 line-clamp-2 max-w-2xl text-sm text-[#676F7E]">
                    {testimonial.message}
                  </p>

                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-[#EBF0FA] px-2.5 py-1 text-xs font-medium text-[#072069]">
                      {testimonial.productName}
                    </span>

                    <span className="flex items-center gap-1 text-xs font-medium text-[#F59E0B]">
                      <Star className="size-3.5 fill-current" />
                      {testimonial.rating}/5
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex shrink-0 items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="border-[#DADEE7]"
                  render={
                    <Link
                      href={`/admin/testimonials/${testimonial.id}/edit`}
                    />
                  }
                >
                  <Pencil />
                  Edit
                </Button>

                <DeleteTestimonialDialog
                  clientName={testimonial.clientName}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

