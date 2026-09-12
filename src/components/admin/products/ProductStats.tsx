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

import type { ProductFormInput } from "./ProductForm";

type ProductStatsProps = {
  register: UseFormRegister<ProductFormInput>;
  statFields: FieldArrayWithId<ProductFormInput, "stats", "id">[];
  appendStat: UseFieldArrayAppend<ProductFormInput, "stats">;
  removeStat: UseFieldArrayRemove;
};

export default function ProductStats({
  register,
  statFields,
  appendStat,
  removeStat,
}: ProductStatsProps) {
  return (
    <section className="rounded-2xl border border-[#DADEE7] bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-[#0F1729]">
            Product Stats
          </h2>

          <p className="mt-1 text-sm text-[#676F7E]">
            Add statistics that appear on the product page.
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={() =>
            appendStat({
              value: "",
              label: "",
              description: "",
            })
          }
        >
          <Plus />
          Add Stat
        </Button>
      </div>

      <Separator className="my-6" />

      <div className="space-y-6">
        {statFields.map((field, index) => (
          <div
            key={field.id}
            className="rounded-xl border border-[#DADEE7] p-5"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-medium text-[#0F1729]">Stat {index + 1}</h3>

              {statFields.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeStat(index)}
                  className="text-red-500 hover:bg-red-50 hover:text-red-600"
                >
                  <Trash2 />
                </Button>
              )}
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label
                  htmlFor={`stats.${index}.value`}
                  className="text-sm font-medium text-[#0F1729]"
                >
                  Value
                </label>

                <Input
                  id={`stats.${index}.value`}
                  placeholder="50+"
                  {...register(`stats.${index}.value`)}
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor={`stats.${index}.label`}
                  className="text-sm font-medium text-[#0F1729]"
                >
                  Label
                </label>

                <Input
                  id={`stats.${index}.label`}
                  placeholder="Businesses"
                  {...register(`stats.${index}.label`)}
                />
              </div>
            </div>

            <div className="mt-5 space-y-2">
              <label
                htmlFor={`stats.${index}.description`}
                className="text-sm font-medium text-[#0F1729]"
              >
                Description
              </label>

              <Input
                id={`stats.${index}.description`}
                placeholder="Businesses using our platform"
                {...register(`stats.${index}.description`)}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
