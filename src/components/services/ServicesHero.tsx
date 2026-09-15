import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function ServicesHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#0F1729] via-[#072069] to-[#0F1729] px-4 py-20 text-white sm:px-6 sm:py-28 lg:px-8 lg:py-32">
      {/* Background Decorative Gradient Orbs */}
      <div className="pointer-events-none absolute -left-20 -top-20 size-96 rounded-full bg-[#0EA5E9]/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 bottom-0 size-96 rounded-full bg-[#3BE3A0]/15 blur-3xl" />

      <div className="relative mx-auto max-w-4xl text-center">
        {/* Badge */}

        {/* Heading */}
        <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
          Technology Solutions Built Around{" "}
          <span className="bg-gradient-to-r from-[#0EA5E9] via-white to-[#3BE3A0] bg-clip-text text-transparent">
            Your Business
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-300 sm:text-lg">
          Explore our services designed to help businesses build, improve, and scale their digital products with speed, reliability, and enterprise-grade design.
        </p>

        {/* CTA Buttons */}
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            render={
              <Link href="/contact">
                Get Started
                <ArrowRight className="ml-2 size-4" />
              </Link>
            }
            nativeButton={false}
            size="lg"
            className="h-12 rounded-xl bg-[#0EA5E9] px-8 text-sm font-semibold text-white shadow-lg transition-all hover:bg-[#0EA5E9]/90 hover:shadow-xl"
          />

          <Button
            render={
              <a href="#services-grid">
                Explore Services
              </a>
            }
            nativeButton={false}
            size="lg"
            variant="outline"
            className="h-12 rounded-xl border-white/20 bg-white/5 px-8 text-sm font-semibold text-white backdrop-blur-md hover:bg-white/10 hover:text-white"
          />
        </div>
      </div>
    </section>
  );
}
