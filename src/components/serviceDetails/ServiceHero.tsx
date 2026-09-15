import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import LottiePlayer from "@/components/ui/LottiePlayer";
import { Button } from "@/components/ui/button";
import type { ServiceDetails } from "@/types/service";

export default function ServiceHero({ service }: { service: ServiceDetails }) {
  const accentColor = service.color || "#0EA5E9";

  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F1729] via-[#072069] to-[#0B4EA2] px-6 py-12 text-white shadow-xl sm:px-10 lg:px-16 lg:py-16">
        {/* Background Decorative Lighting */}
        <div
          className="pointer-events-none absolute -right-20 -top-20 size-96 rounded-full blur-3xl opacity-30"
          style={{ backgroundColor: accentColor }}
        />
        <div className="pointer-events-none absolute -bottom-24 -left-20 size-80 rounded-full bg-[#3BE3A0]/15 blur-3xl" />

        <div className="relative z-10 grid gap-10 lg:grid-cols-2 lg:items-center">
          {/* Text Content */}
          <div className="flex flex-col items-start">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-[#0EA5E9] backdrop-blur-md">
              <Sparkles className="size-3.5 text-[#3BE3A0]" />
              Our Services
            </div>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
              {service.title}
            </h1>

            <div
              className="mt-4 h-1.5 w-20 rounded-full"
              style={{ backgroundColor: accentColor }}
            />

            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-200 sm:text-lg">
              {service.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Button
                render={
                  <Link href="/contact">
                    Get Started
                    <ArrowRight className="ml-2 size-4" />
                  </Link>
                }
                nativeButton={false}
                size="lg"
                className="h-12 rounded-xl bg-white px-7 text-sm font-semibold text-[#072069] shadow-lg transition-all hover:bg-[#F8FAFC] hover:shadow-xl"
              />
            </div>
          </div>

          {/* Animation Area */}
          <div className="relative flex min-h-[260px] items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md sm:min-h-[320px]">
            <LottiePlayer src={service.animationUrl} className="h-64 w-64 sm:h-72 sm:w-72" />
          </div>
        </div>
      </div>
    </section>
  );
}
