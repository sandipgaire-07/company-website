import { notFound } from "next/navigation";

import ProductFeatures from "@/components/productDetails/ProductFeatures";
import ProductHero from "@/components/productDetails/ProductHero";
import ProductStats from "@/components/productDetails/ProductStats";
import ProductPricing from "@/components/productDetails/ProductPricing";
import { getProductDetails, productDetails } from "@/data/products/productDetails";

export function generateStaticParams() {
  return productDetails.map((product) => ({ slug: product.slug }));
}

export default async function ProductDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductDetails(slug);

  if (!product) {
    notFound();
  }

  return (
    <main>
      <ProductHero product={product} />
      <ProductStats stats={product.stats} color={product.color} />
      <ProductFeatures features={product.features} color={product.color} />
      <ProductPricing pricing={product.pricing} color={product.color} />
    </main>
  );
}
