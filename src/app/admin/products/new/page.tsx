import Link from "next/link";

import ProductForm from "@/components/admin/products/ProductForm";

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      <Link
        href="/admin/products"
        className="
          inline-flex
          items-center
          rounded-md
          bg-[#072069]
          px-4
          py-2
          text-sm
          font-medium
          text-white
          transition-colors
          hover:bg-[#072069]/90
        "
      >
        Back to products
      </Link>

      <div className="mt-4">
        <h1 className="text-2xl font-bold tracking-tight text-[#0F1729]">
          Add Product
        </h1>

        <p className="mt-1 text-sm text-[#676F7E]">
          Add a new product to your website.
        </p>
      </div>

      <ProductForm />
    </div>
  );
}