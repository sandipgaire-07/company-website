import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { adminGetProductById } from "@/actions/admin";
import ProductForm from "@/components/admin/products/ProductForm";

import { productDetails as staticDetails } from "@/data/products/productDetails";
import type { ProductDetails } from "@/types/productDetails";

type EditProductPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const { id } = await params;

  // Use static data as a fallback.
  let product: ProductDetails | undefined = staticDetails.find(
    (item) => item.id === id || item.slug === id
  );

  // Prefer the database product when available.
  const res = await adminGetProductById(id);

  if (res.success && res.data) {
    const dbProduct = res.data;

    product = {
      id: dbProduct.id,
      name: dbProduct.name,
      slug: dbProduct.slug,
      category: dbProduct.category || "Solutions",
      description: dbProduct.description || "",
      badge: dbProduct.badge || "Enterprise",
      color: dbProduct.color || "#0EA5E9",
      sortOrder: dbProduct.sort_order || 1,
      image:
        dbProduct.image ||
        dbProduct.icon ||
        "/showcase/hospitality.webp",

      stats:
        dbProduct.product_stats &&
        dbProduct.product_stats.length > 0
          ? dbProduct.product_stats.map((stat: any) => ({
              value: stat.value,
              label: stat.label,
              description: stat.description,
            }))
          : product?.stats || [],

      features:
        dbProduct.product_features &&
        dbProduct.product_features.length > 0
          ? dbProduct.product_features.map((feature: any) => ({
              title:
                feature.title ||
                feature.feature_title ||
                "",
              description:
                feature.description ||
                feature.feature_description ||
                "",
              icon: feature.icon || "Zap",
            }))
          : product?.features || [],

      pricing:
        dbProduct.product_prices &&
        dbProduct.product_prices.length > 0
          ? dbProduct.product_prices.map((price: any) => ({
              name: price.plan_name,
              description: price.description || "Plan details",
              price: Number(price.price) || 0,
              currency: price.currency || "NPR",
              billingPeriod: price.billing_cycle || "monthly",
              features: Array.isArray(price.features)
                ? price.features
                : ["All core features"],
              isPopular: price.is_highlighted || false,
            }))
          : product?.pricing || [],
    };
  }

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
          Update the product information in the database.
        </p>
      </div>

      <ProductForm product={product} />
    </div>
  );
}