import { Plus, Trash2 } from "lucide-react";
import type {
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

import type { ProductFormInput } from "./ProductForm";

type ProductPricingProps = {
  register: UseFormRegister<ProductFormInput>;
  setValue: UseFormSetValue<ProductFormInput>;
  pricingFields: FieldArrayWithId<ProductFormInput, "pricing", "id">[];
  appendPricing: UseFieldArrayAppend<ProductFormInput, "pricing">;
  removePricing: UseFieldArrayRemove;
  pricingValues?: ProductFormInput["pricing"];
};

export default function ProductPricing({
  register,
  setValue,
  pricingFields,
  appendPricing,
  removePricing,
  pricingValues,
}: ProductPricingProps) {
  return (
    <section className="rounded-2xl border border-[#DADEE7] bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-[#0F1729]">
            Pricing Plans
          </h2>

          <p className="mt-1 text-sm text-[#676F7E]">
            Add pricing plans for this product.
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={() =>
            appendPricing({
              name: "",
              description: "",
              price: 0,
              discountedPrice: "",
              currency: "NPR",
              billingPeriod: "Monthly",
              features: [""],
              isPopular: false,
            })
          }
        >
          <Plus />
          Add Plan
        </Button>
      </div>

      <Separator className="my-6" />

      <div className="space-y-6">
        {pricingFields.map((field, index) => {
          const pricingFeatures = pricingValues?.[index]?.features ?? [""];

          return (
            <div
              key={field.id}
              className="rounded-xl border border-[#DADEE7] p-5"
            >
              <div className="mb-5 flex items-center justify-between">
                <h3 className="font-medium text-[#0F1729]">Plan {index + 1}</h3>

                {pricingFields.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => removePricing(index)}
                    className="text-red-500 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 />
                  </Button>
                )}
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <label
                    htmlFor={`pricing.${index}.name`}
                    className="text-sm font-medium text-[#0F1729]"
                  >
                    Plan Name
                  </label>

                  <Input
                    id={`pricing.${index}.name`}
                    placeholder="Starter"
                    {...register(`pricing.${index}.name`)}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor={`pricing.${index}.currency`}
                    className="text-sm font-medium text-[#0F1729]"
                  >
                    Currency
                  </label>

                  <Input
                    id={`pricing.${index}.currency`}
                    placeholder="NPR"
                    {...register(`pricing.${index}.currency`)}
                  />
                </div>
              </div>

              <div className="mt-5 space-y-2">
                <label
                  htmlFor={`pricing.${index}.description`}
                  className="text-sm font-medium text-[#0F1729]"
                >
                  Description
                </label>

                <Textarea
                  id={`pricing.${index}.description`}
                  rows={3}
                  placeholder="Perfect for small businesses..."
                  {...register(`pricing.${index}.description`)}
                />
              </div>

              <div className="mt-5 grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <label
                    htmlFor={`pricing.${index}.price`}
                    className="text-sm font-medium text-[#0F1729]"
                  >
                    Price
                  </label>

                  <Input
                    id={`pricing.${index}.price`}
                    type="number"
                    min="0"
                    placeholder="1000"
                    {...register(`pricing.${index}.price`)}
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor={`pricing.${index}.discountedPrice`}
                    className="text-sm font-medium text-[#0F1729]"
                  >
                    Discounted Price
                  </label>

                  <Input
                    id={`pricing.${index}.discountedPrice`}
                    type="number"
                    min="0"
                    placeholder="800"
                    {...register(`pricing.${index}.discountedPrice`)}
                  />
                </div>
              </div>

              <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-end">
                <div className="flex-1 space-y-2">
                  <label
                    htmlFor={`pricing.${index}.billingPeriod`}
                    className="text-sm font-medium text-[#0F1729]"
                  >
                    Billing Period
                  </label>

                  <Input
                    id={`pricing.${index}.billingPeriod`}
                    placeholder="Monthly"
                    {...register(`pricing.${index}.billingPeriod`)}
                  />
                </div>

                <div className="flex items-center gap-3 pb-2">
                  <Switch
                    checked={pricingValues?.[index]?.isPopular ?? false}
                    onCheckedChange={(checked: boolean) =>
                      setValue(`pricing.${index}.isPopular`, checked)
                    }
                  />

                  <label className="text-sm font-medium text-[#0F1729]">
                    Popular Plan
                  </label>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-[#0F1729]">
                    Plan Features
                  </label>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setValue(`pricing.${index}.features`, [...pricingFeatures, ""])
                    }
                  >
                    <Plus />
                    Add Feature
                  </Button>
                </div>

                <div className="mt-3 space-y-3">
                  {pricingFeatures.map((_, featureIndex) => (
                    <div key={featureIndex} className="flex gap-2">
                      <Input
                        placeholder="Unlimited users"
                        {...register(
                          `pricing.${index}.features.${featureIndex}`
                        )}
                      />

                      {pricingFeatures.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const updatedFeatures = pricingFeatures.filter(
                              (_, i) => i !== featureIndex
                            );

                            setValue(
                              `pricing.${index}.features`,
                              updatedFeatures
                            );
                          }}
                          className="shrink-0 text-red-500 hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
