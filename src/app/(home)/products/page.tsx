import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { getProducts } from "@/actions/content";
import CTA from "@/components/homePage/Cta";

export const metadata = {
  title: "Our Products | LeafClutch",
  description: "Explore our innovative software products and enterprise solutions designed to streamline operations and drive business growth.",
};

export default async function ProductsPage() {
  const res = await getProducts();
  const productList = res.success && res.data ? res.data : [];

  return (
    <main className="min-h-screen bg-slate-50/50">
      {/* Page Hero Header */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#072069]/5 via-white to-transparent py-16 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wider text-[#0EA5E9]">
              Our Products
            </p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-[#0F1729] sm:text-5xl lg:text-6xl">
              Innovative Solutions Built For{" "}
              <span className="text-[#072069]">Growth</span>
            </h1>
            <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-gradient-to-r from-[#072069] via-[#0EA5E9] to-[#3BE3A0]" />
            <p className="mt-6 text-lg leading-8 text-[#676F7E]">
              Discover our range of enterprise software platforms designed to optimize operations, automate workflows, and empower modern teams.
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid Section */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
        {productList.length === 0 ? (
          <div className="rounded-2xl border border-[#DADEE7] bg-white p-12 text-center">
            <p className="text-lg font-medium text-[#676F7E]">
              No products found at this moment.
            </p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {productList.map((product) => {
              return (
                <div
                  key={product.id || product.slug}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-[#DADEE7] bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#072069]/5"
                >
                  {/* Image Header */}
                  <div className="relative flex h-52 items-center justify-center overflow-hidden bg-[#F8FAFC] p-6">
                    {product.badge && (
                      <span className="absolute left-4 top-4 z-10 inline-flex items-center gap-1 rounded-full bg-[#072069] px-3 py-1 text-xs font-semibold text-white shadow-xs">
                        <Sparkles className="h-3 w-3" />
                        {product.badge}
                      </span>
                    )}

                    <Image
                      src={product.image || "/showcase/hospitality.webp"}
                      alt={product.name}
                      width={320}
                      height={200}
                      className="h-full w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Body Content */}
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div>
                      {product.category && (
                        <p className="text-xs font-semibold uppercase tracking-wider text-[#0EA5E9]">
                          {product.category}
                        </p>
                      )}
                      <h2 className="mt-2 text-xl font-bold text-[#0F1729] transition-colors group-hover:text-[#072069]">
                        {product.name}
                      </h2>
                      <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#676F7E]">
                        {product.description}
                      </p>
                    </div>

                    {/* Footer / Link */}
                    <div className="mt-6 border-t border-[#DADEE7]/60 pt-4">
                      <Link
                        href={`/products/${product.slug}`}
                        className="group/btn flex items-center justify-between text-sm font-semibold text-[#072069] transition-colors hover:text-[#0EA5E9]"
                      >
                        <span>View Details</span>
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F8FAFC] transition-transform group-hover/btn:translate-x-1 group-hover/btn:bg-[#EBF0FA]">
                          <ArrowRight className="h-4 w-4" />
                        </span>
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Reused Existing CTA */}
      <CTA />
    </main>
  );
}
