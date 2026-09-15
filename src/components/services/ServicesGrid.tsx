"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import LottiePlayer from "@/components/ui/LottiePlayer";
import { Card, CardContent } from "@/components/ui/card";
import type { ServiceDetails } from "@/types/service";

interface ServicesGridProps {
  services: ServiceDetails[] | any[];
}

export default function ServicesGrid({ services }: ServicesGridProps) {
  return (
    <section id="services-grid" className="bg-[#F8FAFC] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const accentColor = service.color || "#0EA5E9";
            return (
              <Card
                key={service.id || service.slug}
                className="group relative flex flex-col overflow-hidden border-0 bg-white shadow-sm ring-1 ring-[#DADEE7] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <CardContent className="flex flex-1 flex-col p-6 sm:p-7">
                  {/* Lottie Animation Area */}
                  <div className="flex h-48 w-full items-center justify-center overflow-hidden rounded-2xl bg-[#F8FAFC]">
                    {service.animationUrl && service.animationUrl.startsWith("http") ? (
                      <LottiePlayer src={service.animationUrl} className="h-44 w-44" />
                    ) : (
                      <div
                        className="flex h-20 w-20 items-center justify-center rounded-2xl text-2xl font-bold text-white shadow-md"
                        style={{ backgroundColor: accentColor }}
                      >
                        {service.title.substring(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>

                  {/* Service Title */}
                  <h3 className="mt-6 text-xl font-bold text-[#0F1729] group-hover:text-[#072069] transition-colors">
                    {service.title}
                  </h3>

                  {/* Service Description */}
                  <p className="mt-3 flex-1 text-sm leading-6 text-[#676F7E]">
                    {service.description}
                  </p>

                  {/* Explore Service Link */}
                  <div className="mt-6 pt-4 border-t border-slate-100">
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-[#072069] transition-colors duration-300 hover:text-[#0EA5E9]"
                    >
                      Explore Service
                      <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>

                  {/* Subtle Bottom Accent Line */}
                  <div
                    className="absolute inset-x-0 bottom-0 h-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{ backgroundColor: accentColor }}
                  />
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
