"use client";

import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import { Star } from "lucide-react";

import { testimonials } from "@/data/testimonials";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Card, CardContent } from "@/components/ui/card";

export default function Testimonials() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#0EA5E9]">
            Client Stories
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0F1729] sm:text-4xl lg:text-5xl">
            What Our{" "}
            <span className="text-[#072069]">Clients Say</span>
          </h2>

          <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-gradient-to-r from-[#072069] via-[#0EA5E9] to-[#3BE3A0]" />

          <p className="mt-5 text-base leading-7 text-[#676F7E]">
            Real experiences from businesses using our products to simplify
            their everyday operations.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative mx-auto mt-12 max-w-6xl sm:px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[
              Autoplay({
                delay: 4000,
                stopOnInteraction: false,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {testimonials.map((testimonial) => (
                <CarouselItem
                  key={testimonial.id}
                  className="p-6 w-210  sm:basis-1/3"
                >
                  <Card className="h-full overflow-hidden border-0 bg-white shadow-sm ring-1 ring-[#DADEE7] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                    <CardContent className="p-6">

                      {/* Client Image */}
                      <div className="relative mx-auto size-24 overflow-hidden rounded-full bg-[#F8FAFC] ring-4 ring-[#EBF0FA]">
                        <Image
                          src={testimonial.avatar}
                          alt={testimonial.clientName}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Rating */}
                      <div className="mt-5 flex justify-center gap-1">
                        {Array.from({
                          length: testimonial.rating,
                        }).map((_, index) => (
                          <Star
                            key={index}
                            className="size-4 fill-[#fffb0b] text-[#252402]"
                          />
                        ))}
                      </div>

                      {/* Message */}
                      <p className="mt-5 text-center text-sm leading-6 text-[#676F7E]">
                        &quot;{testimonial.message}&quot;
                      </p>

                      {/* Client */}
                      <div className="mt-6 text-center">
                        <h3 className="font-semibold text-[#0F1729]">
                          {testimonial.clientName}
                        </h3>

                        <p className="mt-1 text-xs text-[#676F7E]">
                          {testimonial.role} · {testimonial.companyName}
                        </p>
                      </div>

                      {/* Product */}
                      <div className="mt-5 flex justify-center">
                        <span className="rounded-full bg-[#EBF0FA] px-3 py-1.5 text-xs font-semibold text-[#072069]">
                          {testimonial.productName}
                        </span>
                      </div>

                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="left-0 border-0" />
            <CarouselNext className="right-0 border-0 rounded-2xl" />
          </Carousel>
        </div>

      </div>
    </section>
  );
}