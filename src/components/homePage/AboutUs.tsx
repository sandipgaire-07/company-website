import { Award, Rocket, Users } from "lucide-react";
import Image from "next/image";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

type AboutProps = {
  title?: string;
  description?: string;
  image?: string | null;
};

export default function About({ title, description, image }: AboutProps) {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 md:grid-cols-2 lg:gap-20">
        <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden rounded-3xl bg-[#F8FAFC]">
          <Image
            src={image || "/about-image.png"}
            alt={title || "About LeafClutch"}
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
            {title ? (
              title
            ) : (
              <>
                Why Choose{" "}
                <span className="bg-gradient-to-r from-[#072069] to-[#0EA5E9] bg-clip-text text-transparent">
                  LeafClutch?
                </span>
              </>
            )}
          </h2>

          <div className="mt-4 h-1.5 w-24 rounded-full bg-gradient-to-r from-[#072069] via-[#0EA5E9] to-[#3BE3A0]" />

          <p className="mt-5 text-base leading-7 text-[#676F7E]">
            {description ||
              "Based in Nepal, LeafClutch delivers modern, high-performance software solutions designed to help businesses simplify operations, improve productivity, and achieve sustainable growth."}
          </p>
        </div>

      </div>
    </section>
  );
}