import { notFound } from "next/navigation";
import Link from "next/link";

import { ArrowLeft } from "lucide-react";

import ProductForm from "@/components/admin/products/ProductForm";
import { productDetails } from "@/data/products/productDetails";

type EditProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const { id } = await params;

  const product = productDetails.find(
    (product) => product.id === id
  );

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-7">
      <Link
        href="/admin/products"
        className="
          inline-flex
          items-center
          gap-2
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
        <ArrowLeft className="size-4" />
        Back to products
      </Link>

      <div className="mt-5">
        <h1 className="text-2xl font-bold tracking-tight text-[#0F1729]">
          Edit Product
        </h1>

        <p className="mt-1 text-sm text-[#676F7E]">
          Update the product information.
        </p>
      </div>

      <ProductForm product={product} />
    </div>
  );
}