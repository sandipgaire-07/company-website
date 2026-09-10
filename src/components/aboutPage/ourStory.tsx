import Image from "next/image";

import { ourStory } from "@/data/aboutUs";

export default function OurStory() {
  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        {/* Image */}
        <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden rounded-3xl bg-[#F8FAFC]">
          <div className="absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0EA5E9]/10 blur-3xl" />

          <Image
            src={ourStory.image}
            alt={ourStory.imageAlt}
            width={600}
            height={500}
            className="relative h-auto w-full max-w-xl object-contain"
          />
        </div>

        {/* Content */}
        <div>
          <p className="text-sm font-semibold uppercase tracking-wider text-[#0EA5E9]">
            {ourStory.eyebrow}
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0F1729] sm:text-4xl lg:text-5xl">
            {ourStory.title}
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-7 text-[#676F7E] sm:text-lg">
            {ourStory.description}
          </p>
        </div>
      </div>
    </section>
  );
}