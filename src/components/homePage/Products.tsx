"use client";

import { useState } from "react";
import Image from "next/image";
import { products } from "@/data/products";

export default function Products() {
  const [selectedProductId, setSelectedProductId] = useState(
    products[0]?.id
  );
  const selectedProduct = products.find(
    (product) => product.id === selectedProductId
  );

  return (
    <section>
      <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#0EA5E9]">
            Our Products
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0F1729] sm:text-4xl lg:text-5xl">
            Solutions We{" "}
            <span className="text-[#072069]">Build</span>
          </h2>
          
          <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-gradient-to-r from-[#072069] via-[#0EA5E9] to-[#3BE3A0]" />

          <p className="mt-5 text-base leading-7 text-[#676F7E]">
            Explore our digital products designed to simplify operations,
            improve productivity, and help businesses grow.
          </p>
        </div>
{/* Product Area */}
<div className="mt-12 p-6 grid gap-8 lg:grid-cols-[280px_1fr]">

  {/* Product Selector */}
  <div className="rounded-2xl border max-h-110 border-[#DADEE7] bg-white p-3 overflow-y-auto">
        <p>Products:</p>
    {products.map((product,index) => {
      const isActive = product.id === selectedProductId;

      return (
        <button
          key={product.id}
          type="button"
          onClick={() => setSelectedProductId(product.id)}
          className={`w-full rounded-xl p-4 text-left transition-all duration-300 ${
            isActive
              ? "bg-[#EBF0FA]"
              : "hover:bg-[#F8FAFC]"
          }`}
        >
          <h4
            className={`text-base font-semibold ${
              isActive
                ? "text-[#072069]"
                : "text-[#0F1729]"
            }`}
          >
        
           <span>{index+1}.</span> {product.name}
          </h4>

          <p className="mt-1 text-sm text-[#676F7E]">
            {product.description}
          </p>
        </button>
      );
    })}
  </div>

{/* Product Showcase */}
<div className="overflow-hidden rounded-3xl border border-[#DADEE7] bg-white">
  <div className="grid items-center lg:grid-cols-2 p-4">

    {/* Product Content */}
    <div className="p-6 sm:p-8 lg:p-10">
      <p className="text-sm font-semibold uppercase tracking-wider text-[#0EA5E9]">
        Product
      </p>

      <h3 className="mt-3 text-3xl font-bold tracking-tight text-[#0F1729] sm:text-4xl">
        {selectedProduct?.name}
      </h3>

      <p className="mt-4 max-w-xl text-base leading-7 text-[#676F7E]">
        {selectedProduct?.description}
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          type="button"
          className="rounded-lg bg-[#072069] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0EA5E9]"
        >
          Request Demo
        </button>

        <button
          type="button"
          className="rounded-lg border border-[#DADEE7] px-5 py-2.5 text-sm font-semibold text-[#072069] transition-colors hover:bg-[#EBF0FA]"
        >
          Contact Us
        </button>
      </div>
    </div>

    {/* Product Image */}
    <div className="relative flex min-h-[280px] items-center justify-center bg-[#F8FAFC] sm:min-h-[350px] lg:min-h-[400px] p-4">
      {selectedProduct && (
        <Image
          src={selectedProduct.image}
          alt={selectedProduct.name}
          width={450}
          height={350}
          className="h-auto w-[70%] max-w-[380px] rounded-3xl object-contain"
        />
      )}
    </div>

  </div>
</div>

</div>
    </section>
  );
}