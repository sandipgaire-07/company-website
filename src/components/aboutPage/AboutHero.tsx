import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
export default function AboutHero() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Content */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-[#0EA5E9]">
            About LeafClutch
          </p>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#0F1729] sm:text-5xl lg:text-6xl">
            Building Technology That{" "}
            <span className="text-[#072069]">Moves Businesses Forward.</span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-[#676F7E] sm:text-lg">
            We build practical, scalable, and user-focused software solutions
            that help businesses simplify their operations, improve
            productivity, and grow with confidence.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              render={
                <a href="/contact">
                  Get in Touch
                  <ArrowRight className="ml-2 size-4" />
                </a>
              }
              nativeButton={false}
              size="lg"
              className="h-auto rounded-md bg-linear-to-r from-[#072069] to-[#0EA5E9] px-6 py-3 text-sm font-medium text-white shadow-lg shadow-[#0EA5E9]/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#0EA5E9]/30"
            />

            <Button
              render={<Link href="/products">Explore Our Products</Link>}
              nativeButton={false}
              size="lg"
              variant="outline"
              className="border-[#DADEE7] text-[#072069] hover:bg-[#EBF0FA]"
            />
          </div>
        </div>

        {/* Visual */}
        <div className="relative flex min-h-90 items-center justify-center overflow-hidden rounded-3xl bg-[#F8FAFC]">
          <div className="absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0EA5E9]/10 blur-3xl" />

          <Image
            src="/about-hero.png"
            alt="About LeafClutch"
            width={600}
            height={500}
            className="relative h-auto w-full max-w-xl object-contain"
          />
        </div>
      </div>
    </section>
  );
}