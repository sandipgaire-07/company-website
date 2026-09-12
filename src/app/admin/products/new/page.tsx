import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import ProductForm from "@/components/admin/products/ProductForm";

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <Link
        href="/admin/products"
        className="
          inline-flex
          items-center
          gap-2
          rounded-lg
          bg-[#072069]
          px-4
          py-2
          text-sm
          font-semibold
          text-white
          transition-opacity
          hover:opacity-90
        "
      >
        <ArrowLeft className="size-4" />
        Back to products
      </Link>

      <div className="mt-4">
        <h1 className="text-2xl font-bold tracking-tight text-[#0F1729]">
          Add Product
        </h1>

        <p className="mt-1 text-sm text-[#676F7E]">
          Add a new product to your website database.
        </p>
      </div>

      <ProductForm />
    </div>
  );
}