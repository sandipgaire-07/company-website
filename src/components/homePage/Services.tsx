
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import { Card, CardContent } from "@/components/ui/card";
import { services } from "@/data/services";

export default function Services() {
  return (
    <section className="bg-[#F8FAFC] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">

        {/* Section Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#0EA5E9]">
            Our Expertise
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0F1729] sm:text-4xl lg:text-5xl">
            Services We{" "}
            <span className="text-[#072069]">Perfect.</span>
          </h2>

          <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-gradient-to-r from-[#072069] via-[#0EA5E9] to-[#3BE3A0]" />

          <p className="mt-5 text-base leading-7 text-[#676F7E]">
            We create modern digital solutions that help businesses work
            smarter, grow faster, and build a stronger digital presence.
          </p>
        </div>

        {/* Services Grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Card
              key={service.id}
              className="group relative overflow-hidden border-0 bg-white shadow-sm ring-1 ring-[#DADEE7] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <CardContent className="relative p-6 sm:p-7">
                {/* Lottie Animation */}
                <div className="mt-5 flex h-36 items-center justify-center overflow-hidden rounded-2xl bg-[#F8FAFC]">
                  <DotLottieReact
                    src={service.animationUrl}
                    loop
                    autoplay
                    className="h-40 w-40"
                  />
                </div>

                {/* Content */}
                <h3 className="mt-6 text-xl font-semibold text-[#0F1729]">
                  {service.title}
                </h3>

                <p className="mt-3 min-h-[48px] text-sm leading-6 text-[#676F7E]">
                  {service.description}
                </p>

                {/* Learn More */}
                <Link
                  href={`/services/${service.slug}`}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#072069] transition-colors duration-300 hover:text-[#0EA5E9]"
                >
                  Learn More
                  <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </Link>

                {/* Bottom Accent */}
                <div className="absolute bottom-0 left-0 h-1 w-0 bg-[#0EA5E9] transition-all duration-300 group-hover:w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
