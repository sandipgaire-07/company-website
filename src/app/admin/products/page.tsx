import Link from "next/link";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
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

        <Button
  className="bg-linear-to-r bg-[#072069] text-white hover:opacity-90"
  render={<Link href="/admin/products/new" />}
>
  <Plus />
  Add Product
</Button>
      </div>

      {/* Product list */}
      <ProductList/>
    </div>
  );
}