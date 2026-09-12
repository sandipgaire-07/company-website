"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { products as staticProducts } from "@/data/products";
import { getProducts } from "@/actions/content";
import DemoRequestModal from "@/components/ui/DemoRequestModal";

export default function Products() {
  const [productList, setProductList] = useState<any[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      const res = await getProducts();
      if (res.success && res.data) {
        const mapped = res.data.map((p: any) => ({
          id: p.id || p.slug,
          name: p.name,
          slug: p.slug,
          category: p.category || "Solutions",
          description: p.description || "",
          image: p.image || p.icon || "/showcase/hospitality.webp",
          badge: p.badge || "Enterprise",
          color: p.color || "#072069",
          sortOrder: p.sort_order || 1,
        }));
        setProductList(mapped);
        if (mapped.length > 0) {
          setSelectedProductId(mapped[0].id);
        }
      }
      setLoading(false);
    }
    loadProducts();
  }, []);

  const selectedProduct = productList.find(
    (product) => product.id === selectedProductId
  ) || productList[0];

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
        <p className="px-2 py-1 text-sm font-bold text-[#0F1729]">Products:</p>
    {productList.map((product, index) => {
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
          onClick={() => setIsDemoModalOpen(true)}
          className="rounded-lg bg-[#072069] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#0EA5E9]"
        >
          Request Demo
        </button>

        <Link
          href="/contact"
          className="rounded-lg border border-[#DADEE7] px-5 py-2.5 text-sm font-semibold text-[#072069] transition-colors hover:bg-[#EBF0FA]"
        >
          Contact Us
        </Link>
      </div>
    </div>

    {/* Product Image */}
    <div className="relative flex min-h-[280px] items-center justify-center bg-[#F8FAFC] sm:min-h-[350px] lg:min-h-[400px] p-4">
      {selectedProduct && (
        <Image
          src={selectedProduct.image || "/showcase/hospitality.webp"}
          alt={selectedProduct.name}
          width={450}
          height={350}
          className="h-auto w-[70%] max-w-[380px] rounded-3xl object-contain"
        />
      )}
    </div>

  </div>
</div>

<DemoRequestModal
  isOpen={isDemoModalOpen}
  onClose={() => setIsDemoModalOpen(false)}
  defaultProduct={selectedProduct?.name || "ApexFlow Solution"}
/>

</div>

    </section>
  );
}