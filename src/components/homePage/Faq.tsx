"use client";

import { useState } from "react";

import { products } from "@/data/products";
import { faqs } from "@/data/faqs";

import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

export default function FAQ() {
  const [selectedProductId, setSelectedProductId] = useState(
    products[0]?.id
  );

  const productFAQs = faqs.filter(
    (faq) => faq.productId === selectedProductId
  );

  return (
    <section className="px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#0EA5E9]">
            FAQ
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0F1729] sm:text-4xl lg:text-5xl">
            Frequently Asked{" "}
            <span className="text-[#072069]">Questions</span>
          </h2>

          <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-gradient-to-r from-[#072069] via-[#0EA5E9] to-[#3BE3A0]" />

          <p className="mt-5 text-base leading-7 text-[#676F7E]">
            Find answers to common questions about our products and solutions.
          </p>
        </div>

        {/* FAQ Content */}
        <div className="mt-12 grid gap-8 lg:grid-cols-[280px_1fr] lg:gap-12">

          {/* Products */}
          <div>
            <p className="mb-3 text-sm font-semibold text-[#0F1729]">
              Explore by product
            </p>

            <div className="rounded-2xl border border-[#DADEE7] bg-white p-2">
              {products.map((product) => {
                const isActive = product.id === selectedProductId;

                return (
                  <button
                    key={product.id}
                    type="button"
                    onClick={() => setSelectedProductId(product.id)}
                    className={`w-full rounded-xl px-4 py-4 text-left transition-all duration-300 ${
                      isActive
                        ? "bg-[#EBF0FA] text-[#072069]"
                        : "text-[#676F7E] hover:bg-[#F8FAFC] hover:text-[#072069]"
                    }`}
                  >
                    <p className="font-semibold">
                      {product.name}
                    </p>

                    <p className="mt-1 text-xs leading-5 opacity-80">
                      {product.description}
                    </p>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Accordion */}
          <div className="min-w-0">
            <Accordion
              className="w-full"
              defaultValue={productFAQs[0]?.id ? [productFAQs[0].id] : []}
            >
              {productFAQs.map((faq) => (
                <AccordionItem
                  key={faq.id}
                  value={faq.id}
                  className="border-b border-[#DADEE7]"
                >
                  <AccordionTrigger className="flex w-full items-center justify-between gap-6 py-5 text-left text-base font-semibold text-[#0F1729] transition-colors hover:text-[#072069]">
                    {faq.question}
                  </AccordionTrigger>

                  <AccordionContent className="pb-5 pr-8 text-sm leading-6 text-[#676F7E]">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

        </div>
      </div>
    </section>
  );
}