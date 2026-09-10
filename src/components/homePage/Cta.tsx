import { ArrowRight, Mail } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
 
<section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
  <div className="mx-auto max-w-7xl">
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#072069] via-[#0B4EA2] to-[#0EA5E9] px-6 py-12 sm:px-10 lg:px-14 lg:py-14">

      <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">

        {/* Left - Text */}
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-white/80">
            Need More Information?
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Let&apos;s Build Something{" "}
            <span className="text-[#3BE3A0]">Great Together.</span>
          </h2>

          <p className="mt-4 text-base leading-7 text-white/80 sm:text-lg">
            Have specific queries or expectations? Drop us an email and our
            specialists will guide you through our ecosystem.
          </p>
        </div>

        {/* Right - Buttons */}
        <div className="flex shrink-0 flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
          <Button
            render={
              <a href="/contact">
                Contact Us
                <ArrowRight className="ml-2 size-4" />
              </a>
            }
            nativeButton={false}
            size="lg"
            className="bg-white text-[#072069] hover:bg-[#F8FAFC]"
          />

          <Button
            render={
              <a href="mailto:contact@leafclutch.com">
                <Mail className="mr-2 size-4" />
                Send Email
              </a>
            }
            nativeButton={false}
            size="lg"
            variant="outline"
            className="border-white/40 bg-white/10 text-white hover:bg-white hover:text-[#072069]"
          />
        </div>

      </div>

      {/* Decorative Background */}
      <div className="pointer-events-none absolute -left-20 -top-20 size-72 rounded-full bg-[#0EA5E9]/30 blur-3xl" />

      <div className="pointer-events-none absolute -bottom-24 -right-20 size-80 rounded-full bg-[#3BE3A0]/20 blur-3xl" />

      <div className="pointer-events-none absolute right-1/4 top-10 size-32 rounded-full bg-white/10 blur-2xl" />

    </div>
  </div>
</section>


  );
}