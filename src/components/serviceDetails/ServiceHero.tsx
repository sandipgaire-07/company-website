import Link from "next/link";
import { ArrowRight } from "lucide-react";
import LottiePlayer from "@/components/ui/LottiePlayer";

import { Button } from "@/components/ui/button";
import { ServiceDetails } from "@/types/service";

export default function ServiceHero({ service }: { service: ServiceDetails }) {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="relative mx-auto grid max-w-7xl items-center gap-10 overflow-hidden rounded-3xl bg-gradient-to-br from-[#072069] via-[#0B4EA2] to-[#0EA5E9] px-6 py-12 sm:px-10 lg:grid-cols-2 lg:px-16 lg:py-16">
        <div className="relative z-10">
          <p className="text-sm font-semibold uppercase tracking-wider text-white/75">Our Services</p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">{service.title}</h1>
          <div className="mt-5 h-1.5 w-24 rounded-full" style={{ backgroundColor: service.color }} />
          <p className="mt-6 max-w-xl text-base leading-7 text-white/80 sm:text-lg">{service.description}</p>
          <Button
            render={<Link href="/contact">Get Started <ArrowRight className="ml-2 size-4" /></Link>}
            nativeButton={false}
            size="lg"
            className="mt-8 h-auto rounded-md bg-white px-6 py-3 text-[#072069] shadow-lg transition-all hover:-translate-y-0.5 hover:bg-[#F8FAFC]"
          />
        </div>

        <div className="relative z-10 flex min-h-[260px] items-center justify-center rounded-2xl bg-white/10 p-6">
          <LottiePlayer src={service.animationUrl} className="h-64 w-64" />
          <div className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full blur-3xl" style={{ backgroundColor: `${service.color}55` }} />
        </div>

        <div className="pointer-events-none absolute -bottom-24 -left-16 size-64 rounded-full bg-[#3BE3A0]/20 blur-3xl" />
      </div>
    </section>
  );
}
