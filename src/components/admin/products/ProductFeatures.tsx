import { Plus, Trash2 } from "lucide-react";
import type {
  FieldArrayWithId,
  UseFieldArrayAppend,
  UseFieldArrayRemove,
  UseFormRegister,
} from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

import type { ProductFormInput } from "./ProductForm";

type ProductFeaturesProps = {
  register: UseFormRegister<ProductFormInput>;
  featureFields: FieldArrayWithId<ProductFormInput, "features", "id">[];
  appendFeature: UseFieldArrayAppend<ProductFormInput, "features">;
  removeFeature: UseFieldArrayRemove;
};

export default function ProductFeatures({
  register,
  featureFields,
  appendFeature,
  removeFeature,
}: ProductFeaturesProps) {
  return (
    <section className="rounded-2xl border border-[#DADEE7] bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-[#0F1729]">
            Product Features
          </h2>

          <p className="mt-1 text-sm text-[#676F7E]">
            Add the features displayed on the product page.
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={() =>
            appendFeature({
              title: "",
              description: "",
              icon: "Zap",
            })
          }
        >
          <Plus />
          Add Feature
        </Button>
      </div>

      <Separator className="my-6" />

      <div className="space-y-6">
        {featureFields.map((field, index) => (
          <div
            key={field.id}
            className="rounded-xl border border-[#DADEE7] p-5"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-medium text-[#0F1729]">
                Feature {index + 1}
              </h3>

              {featureFields.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeFeature(index)}
                  className="text-red-500 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 />
                </Button>
              )}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor={`features.${index}.title`}
                  className="text-sm font-medium text-[#0F1729]"
                >
                  Title
                </label>

                <Input
                  id={`features.${index}.title`}
                  placeholder="Fast Reporting"
                  {...register(`features.${index}.title`)}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor={`features.${index}.icon`}
                  className="text-sm font-medium text-[#0F1729]"
                >
                  Icon
                </label>

                <Input
                  id={`features.${index}.icon`}
                  placeholder="Zap"
                  {...register(`features.${index}.icon`)}
                />
              </div>
            </div>

            <div className="mt-5 space-y-2">
              <label
                htmlFor={`features.${index}.description`}
                className="text-sm font-medium text-[#0F1729]"
              >
                Description
              </label>

              <Textarea
                id={`features.${index}.description`}
                rows={3}
                placeholder="Generate reports quickly..."
                {...register(`features.${index}.description`)}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
