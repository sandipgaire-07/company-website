"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ProductDetails } from "@/types/productDetails";
import DemoRequestModal from "@/components/ui/DemoRequestModal";

export default function ProductHero({ product }: { product: ProductDetails }) {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="relative flex min-h-[320px] items-center justify-center overflow-hidden rounded-3xl bg-[#F8FAFC] p-8 sm:min-h-[420px]">
          <div
            className="absolute left-1/2 top-1/2 size-72 -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
            style={{ backgroundColor: `${product.color}25` }}
          />
          <Image
            src={product.image}
            alt={product.imageAlt || product.name}
            width={720}
            height={520}
            className="relative h-auto w-full max-w-xl object-contain"
          />
        </div>

        <div>
          <div
            className="inline-flex rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-wider"
            style={{ backgroundColor: `${product.color}15`, color: product.color }}
          >
            {product.category}
          </div>
          <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-[#676F7E]">
            {product.badge}
          </p>
          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#0F1729] sm:text-5xl lg:text-6xl">
            {product.name}
          </h1>
          <div className="mt-4 h-1.5 w-24 rounded-full" style={{ backgroundColor: product.color }} />
          <p className="mt-6 max-w-xl text-base leading-7 text-[#676F7E] sm:text-lg">
            {product.description}
          </p>
          <Button
            onClick={() => setIsDemoModalOpen(true)}
            size="lg"
            className="mt-8 h-auto rounded-md bg-gradient-to-r from-[#072069] to-[#0EA5E9] px-6 py-3 text-white shadow-lg shadow-[#0EA5E9]/20 transition-all hover:-translate-y-0.5 hover:shadow-xl cursor-pointer"
          >
            Request a Demo
            <ArrowRight className="ml-2 size-4" />
          </Button>
        </div>
      </div>

      <DemoRequestModal
        isOpen={isDemoModalOpen}
        onClose={() => setIsDemoModalOpen(false)}
        defaultProduct={product.name}
      />
    </section>
  );
}
