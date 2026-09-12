import Link from "next/link";
import { Plus } from "lucide-react";
import ProductList from "@/components/admin/products/ProductList";

export default function ProductsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#0F1729]">
            Products
          </h1>

          <p className="mt-1 text-sm text-[#676F7E]">
            Manage the products displayed on your website.
          </p>
        </div>

        <Link
          href="/admin/products/new"
          className="inline-flex items-center gap-2 rounded-lg bg-[#072069] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90"
        >
          <Plus className="h-4 w-4" />
          Add Product
        </Link>
      </div>

      {/* Product list */}
      <ProductList />
    </div>
  );
}