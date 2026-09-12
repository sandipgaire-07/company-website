import { notFound } from "next/navigation";
import { ProductDetails } from "@/types/productDetails";
import ProductForm from "@/components/admin/products/ProductForm";
import { productDetails } from "@/data/products/productDetails";
import { Button } from "@base-ui/react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

type EditProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const { id } = await params;

  const product = productDetails.find((product) => product.id === id);

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-7">
      <Button
  className="p-2 rounded bg-linear-to-r bg-[#072069] text-white hover:opacity-90"
  render={<Link href="/admin/products" />}
>
  Back to products
</Button>
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