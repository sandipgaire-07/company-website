"use client";

import { useForm, useFieldArray, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import ProductBasicInformation from "./ProductBasicInformation";
import ProductStats from "./ProductStats";
import ProductFeatures from "./ProductFeatures";
import ProductPricing from "./ProductPricing";

import { Button } from "@/components/ui/button";
import type { ProductDetails } from "@/types/productDetails";

export const productSchema = z.object({
  name: z.string().trim().min(2, "Please enter the product name."),

  slug: z.string().trim().min(2, "Please enter the product slug."),

  category: z.string().trim().min(2, "Please enter the category."),

  description: z
    .string()
    .trim()
    .min(10, "Please enter at least 10 characters."),

  badge: z.string().trim().min(2, "Please enter a badge."),

  color: z.string().trim().min(4, "Please enter a color."),

  stats: z.array(
    z.object({
      value: z.string().trim().min(1, "Required."),
      label: z.string().trim().min(1, "Required."),
      description: z.string().trim().min(1, "Required."),
    })
  ),

  features: z.array(
    z.object({
      title: z.string().trim().min(2, "Required."),
      description: z.string().trim().min(5, "Required."),
      icon: z.string().trim().min(1, "Required."),
    })
  ),

  pricing: z.array(
    z.object({
      name: z.string().trim().min(2, "Required."),
      description: z.string().trim().min(5, "Required."),
      price: z.coerce.number().min(0, "Price cannot be negative."),

      discountedPrice: z
        .union([
          z.coerce.number().min(0),
          z.literal(""),
        ])
        .optional(),

      currency: z.string().trim().min(1, "Required."),
      billingPeriod: z.string().trim().min(1, "Required."),
      features: z.array(z.string().trim().min(1)),
      isPopular: z.boolean(),
    })
  ),
});

export type ProductFormInput = z.input<typeof productSchema>;
export type ProductFormValues = z.output<typeof productSchema>;

type ProductFormProps = {
  product?: ProductDetails;
};

export default function ProductForm({ product }: ProductFormProps) {
  const {
    register,
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductFormInput, undefined, ProductFormValues>({
    resolver: zodResolver(productSchema),

    defaultValues: product
      ? {
          name: product.name,
          slug: product.slug,
          category: product.category,
          description: product.description,
          badge: product.badge,
          color: product.color,

          stats: product.stats.map((stat) => ({
            value: stat.value,
            label: stat.label,
            description: stat.description,
          })),

          features: product.features.map((feature) => ({
            title: feature.title,
            description: feature.description,
            icon: feature.icon,
          })),

          pricing: product.pricing.map((plan) => ({
            name: plan.name,
            description: plan.description,
            price: plan.price,
            discountedPrice: plan.discountedPrice ?? "",
            currency: plan.currency,
            billingPeriod: plan.billingPeriod,
            features: plan.features,
            isPopular: plan.isPopular,
          })),
        }
      : {
          name: "",
          slug: "",
          category: "",
          description: "",
          badge: "",
          color: "#0EA5E9",

          stats: [
            {
              value: "",
              label: "",
              description: "",
            },
          ],

          features: [
            {
              title: "",
              description: "",
              icon: "Zap",
            },
          ],

          pricing: [
            {
              name: "",
              description: "",
              price: 0,
              discountedPrice: "",
              currency: "NPR",
              billingPeriod: "Monthly",
              features: [""],
              isPopular: false,
            },
          ],
        },
  });

  const {
    fields: statFields,
    append: appendStat,
    remove: removeStat,
  } = useFieldArray({
    control,
    name: "stats",
  });

  const {
    fields: featureFields,
    append: appendFeature,
    remove: removeFeature,
  } = useFieldArray({
    control,
    name: "features",
  });

  const {
    fields: pricingFields,
    append: appendPricing,
    remove: removePricing,
  } = useFieldArray({
    control,
    name: "pricing",
  });

  const pricingValues = useWatch({
    control,
    name: "pricing",
  });

  function onSubmit(values: ProductFormValues) {
    console.log("Product:", values);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <ProductBasicInformation
        register={register}
        errors={errors}
      />

      <ProductStats
        register={register}
        statFields={statFields}
        appendStat={appendStat}
        removeStat={removeStat}
      />

      <ProductFeatures
        register={register}
        featureFields={featureFields}
        appendFeature={appendFeature}
        removeFeature={removeFeature}
      />

      <ProductPricing
        register={register}
        setValue={setValue}
        pricingFields={pricingFields}
        appendPricing={appendPricing}
        removePricing={removePricing}
        pricingValues={pricingValues}
      />

      <div className="flex justify-end">
        <Button
          type="submit"
          size="lg"
          className="bg-linear-to-r bg-[#072069] text-white hover:opacity-90"
        >
          {product ? "Update Product" : "Save Product"}
        </Button>
      </div>
    </form>
  );
}