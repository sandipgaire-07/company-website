import { notFound } from "next/navigation";

import ProductFeatures from "@/components/productDetails/ProductFeatures";
import ProductHero from "@/components/productDetails/ProductHero";
import ProductStats from "@/components/productDetails/ProductStats";
import ProductPricing from "@/components/productDetails/ProductPricing";
import { getProductDetails, productDetails } from "@/data/products/productDetails";
import { getProductBySlug } from "@/actions/content";

export function generateStaticParams() {
  return productDetails.map((product) => ({ slug: product.slug }));
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const dbRes = await getProductBySlug(slug);

  const product = dbRes.success && dbRes.data ? dbRes.data : null;

  if (!product) {
    notFound();
  }

  return (
    <main>
      <ProductHero product={product} />
      {product.stats && <ProductStats stats={product.stats} color={product.color} />}
      {product.features && <ProductFeatures features={product.features} color={product.color} />}
      {product.pricing && <ProductPricing pricing={product.pricing} color={product.color} />}
    </main>
  );
}

