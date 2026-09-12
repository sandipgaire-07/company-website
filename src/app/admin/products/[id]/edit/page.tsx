import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ProductForm from "@/components/admin/products/ProductForm";
import { productDetails as staticDetails } from "@/data/products/productDetails";
import { adminGetProductById } from "@/actions/admin";
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

  let product: ProductDetails | undefined = staticDetails.find(
    (p) => p.id === id || p.slug === id
  );

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
      image: dbProduct.image || dbProduct.icon || "/showcase/hospitality.webp",

      stats: dbProduct.product_stats && dbProduct.product_stats.length > 0
        ? dbProduct.product_stats.map((s: any) => ({
            value: s.value,
            label: s.label,
            description: s.description,
          }))
        : product?.stats || [],
      features: dbProduct.product_features && dbProduct.product_features.length > 0
        ? dbProduct.product_features.map((f: any) => ({
            title: f.title || f.feature_title || "",
            description: f.description || f.feature_description || "",
            icon: f.icon || "Zap",
          }))
        : product?.features || [],
      pricing: dbProduct.product_prices && dbProduct.product_prices.length > 0
        ? dbProduct.product_prices.map((p: any) => ({
            name: p.plan_name,
            description: p.description || "Plan details",
            price: Number(p.price) || 0,
            currency: p.currency || "NPR",
            billingPeriod: p.billing_cycle || "monthly",
            features: Array.isArray(p.features) ? p.features : ["All core features"],
            isPopular: p.is_highlighted || false,
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
        className="inline-flex items-center gap-2 rounded-lg bg-[#072069] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
      >
        <ArrowLeft className="h-4 w-4" /> Back to products
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