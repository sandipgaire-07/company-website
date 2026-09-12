import Link from "next/link";
import { Check } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProductPricingPlan } from "@/types/productDetails";

type ProductPricingProps = {
  pricing: ProductPricingPlan[];
  color: string;
};

export default function ProductPricing({
  pricing,
  color,
}: ProductPricingProps) {
  const sortedPricing = [...pricing].sort(
    (a, b) => a.sortOrder - b.sortOrder
  );

  return (
    <section className="bg-[#F8FAFC] px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-[#0EA5E9]">
            Pricing
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#0F1729] sm:text-4xl">
            Simple Plans, Flexible Growth
          </h2>
          <div className="mx-auto mt-4 h-1.5 w-24 rounded-full bg-gradient-to-r from-[#072069] via-[#0EA5E9] to-[#3BE3A0]" />
          <p className="mt-5 text-base leading-7 text-[#676F7E]">
            Choose the plan that fits your business today and scale as your
            needs grow.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {sortedPricing.map((plan) => {
            const hasDiscount = plan.discountedPrice !== undefined;
            const displayPrice = plan.discountedPrice ?? plan.price;
            const discount = hasDiscount
              ? Math.round(
                  ((plan.price - plan.discountedPrice!) / plan.price) * 100
                )
              : 0;

            return (
              <Card
                key={plan.id}
                className="relative flex h-full flex-col overflow-hidden border-0 bg-white shadow-sm ring-1 ring-[#DADEE7] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={plan.isPopular ? { boxShadow: `0 0 0 2px ${color}` } : undefined}
              >
                {plan.isPopular && (
                  <div
                    className="absolute right-4 top-4 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm"
                    style={{ backgroundColor: color }}
                  >
                    Most Popular
                  </div>
                )}

                <CardContent className="flex flex-1 flex-col p-6 sm:p-7">
                  <h3 className="text-xl font-bold text-[#0F1729]">{plan.name}</h3>
                  <p className="mt-2 min-h-12 text-sm leading-6 text-[#676F7E]">
                    {plan.description}
                  </p>

                  <div className="mt-6">
                    {hasDiscount && (
                      <p className="text-sm text-[#676F7E] line-through">
                        {plan.currency} {plan.price.toLocaleString()}
                      </p>
                    )}
                    <p className="mt-1 text-3xl font-bold text-[#072069]">
                      {plan.currency} {displayPrice.toLocaleString()}
                      <span className="ml-1 text-sm font-medium text-[#676F7E]">
                        /{plan.billingPeriod}
                      </span>
                    </p>
                    {hasDiscount && (
                      <span
                        className="mt-2 inline-block rounded-full px-2 py-1 text-xs font-semibold"
                        style={{ backgroundColor: `${color}15`, color }}
                      >
                        Save {discount}%
                      </span>
                    )}
                  </div>

                  <ul className="mt-7 flex-1 space-y-3">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex gap-2 text-sm text-[#676F7E]">
                        <Check className="mt-0.5 size-4 shrink-0" style={{ color }} />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    render={<Link href="/contact">{plan.isPopular ? "Contact Us" : "Get Started"}</Link>}
                    nativeButton={false}
                    className="mt-8 w-full text-white hover:opacity-90"
                    style={{ backgroundColor: color }}
                  />
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
