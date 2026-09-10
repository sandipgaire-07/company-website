import { Award, Rocket, Users } from "lucide-react";
import Image from "next/image";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

export default function About() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2 lg:gap-20">
       <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden rounded-3xl bg-[#F8FAFC]">
  <Image
    src="/about-image.png"
    alt="About LeafClutch"
    width={600}
    height={500}
    className="h-auto w-full object-contain"
  />
</div>

        {/* Right - Content */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-[#0EA5E9]">
            Pioneering Tech in Nepal
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0F1729] sm:text-4xl lg:text-5xl">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-[#072069] to-[#0EA5E9] bg-clip-text text-transparent">
              LeafClutch?
            </span>
          </h2>

          <div className="mt-4 h-1.5 w-24 rounded-full bg-gradient-to-r from-[#072069] via-[#0EA5E9] to-[#3BE3A0]" />

          <p className="mt-5 text-base leading-7 text-[#676F7E]">
            Based in Nepal, LeafClutch delivers modern, high-performance
            software solutions designed to help businesses simplify
            operations, improve productivity, and achieve sustainable growth.
          </p>

          {/* Feature Cards */}
   <div className="mt-8 grid gap-5 sm:grid-cols-2">
  {/* Expert Team */}
  <Card className="group relative overflow-hidden border-0 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
    {/* Accent */}
    <div className="absolute right-0 top-0 h-24 w-24 translate-x-1/3 -translate-y-1/3 rounded-full bg-[#0EA5E9]/10 blur-2xl transition-all duration-300 group-hover:bg-[#0EA5E9]/20" />

    <CardContent className="relative p-6">
      {/* Icon */}
      <div className="flex size-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#072069] to-[#0EA5E9] text-white shadow-md transition-transform duration-300 group-hover:scale-105">
        <Users className="size-5" />
      </div>

      <h3 className="mt-5 text-lg font-semibold text-[#0F1729]">
        Expert Team
      </h3>

      <p className="mt-2 text-sm leading-6 text-[#676F7E]">
        Skilled professionals committed to building reliable solutions
        that help your business grow.
      </p>

      {/* Bottom accent */}
      <div className="mt-5 h-1 w-10 rounded-full bg-[#0EA5E9] transition-all duration-300 group-hover:w-16" />
    </CardContent>
  </Card>

  {/* Growth Driven */}
<Card className="group relative overflow-hidden border-0 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
    {/* Accent */}
    <div className="absolute right-0 top-0 h-24 w-24 translate-x-1/3 -translate-y-1/3 rounded-full bg-[#3BE3A0]/10 blur-2xl transition-all duration-300 group-hover:bg-[#3BE3A0]/20" />

    <CardContent className="relative p-6">
      {/* Icon */}
      <div className="flex size-12 items-center justify-center rounded-xl bg-[#EBF0FA] text-[#072069] transition-all duration-300 group-hover:bg-gradient-to-br group-hover:from-[#072069] group-hover:to-[#0EA5E9] group-hover:text-white">
        <Rocket className="size-5" />
      </div>

      <h3 className="mt-5 text-lg font-semibold text-[#0F1729]">
        Growth Driven
      </h3>

      <p className="mt-2 text-sm leading-6 text-[#676F7E]">
        Practical software solutions designed to improve efficiency
        and deliver measurable business value.
      </p>

      {/* Bottom accent */}
      <div className="mt-5 h-1 w-10 rounded-full bg-[#3BE3A0] transition-all duration-300 group-hover:w-16" />
    </CardContent>
  </Card>
</div>
        </div>

      </div>
    </section>
  );
}