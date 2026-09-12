import ProductForm from "@/components/admin/products/ProductForm";
import { Button } from "@base-ui/react";
import Link from "next/link";

export default function NewProductPage() {
  return (
    <div className="space-y-6">
            <Button
  className="p-2 rounded bg-linear-to-r bg-[#072069] text-white hover:opacity-90"
  render={<Link href="/admin/products" />}
>
  Back to products
</Button>
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