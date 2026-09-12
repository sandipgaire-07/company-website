
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import LottiePlayer from "@/components/ui/LottiePlayer";

import { Card, CardContent } from "@/components/ui/card";
import { serviceDetails as staticServices } from "@/data/services/serviceDetails";
import { getServices } from "@/actions/content";

export default function Services() {
  const [services, setServices] = useState<any[]>(staticServices);

  useEffect(() => {
    async function loadServices() {
      const res = await getServices();
      if (res.success && res.data) {
        const mapped = res.data.map((s: any) => ({
          id: s.id,
          title: s.title,
          slug: s.slug || s.title.toLowerCase().replace(/\s+/g, "-"),
          description: s.description,
          animationUrl: s.animation_url || s.animationUrl || "https://lottie.host/your-web-animation.lottie",
          color: s.color || "#0EA5E9",
        }));
        setServices(mapped);
      }
    }
    loadServices();
  }, []);

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
          {services.map((service) => (
            <Card
              key={service.id}
              className="group relative overflow-hidden border-0 bg-white shadow-sm ring-1 ring-[#DADEE7] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <CardContent className="relative p-6 sm:p-7">
                {/* Lottie Animation */}
                <div className="mt-5 flex h-50 items-center justify-center overflow-hidden rounded-2xl bg-[#F8FAFC]">
                  {service.animationUrl && service.animationUrl.startsWith("http") ? (
                    <LottiePlayer src={service.animationUrl} className="h-50 w-50" />
                  ) : (
                    <div className="flex h-50 w-50 items-center justify-center text-4xl font-bold text-[#072069]">
                      {service.title.substring(0, 2)}
                    </div>
                  )}
                </div>

                {/* Content */}
                <h3 className="mt-6 text-2xl font-bold text-[#0f1930]">
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
                 <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#072069] via-[#0EA5E9] to-[#3BE3A0] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

