"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { faqs } from "@/data/faqs";
import { products } from "@/data/products";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";

import type { FAQ } from "@/types/faq";

const faqSchema = z.object({
  productId: z.string().min(1, "Please select a product."),
  question: z.string().trim().min(5, "Please enter the question."),
  answer: z
    .string()
    .trim()
    .min(10, "Please enter at least 10 characters."),
});

type FaqFormValues = z.infer<typeof faqSchema>;

type FaqFormProps = {
  faq?: FAQ;
};

export default function FaqForm({ faq }: FaqFormProps) {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FaqFormValues>({
    resolver: zodResolver(faqSchema),

    defaultValues: {
      productId: faq?.productId ?? "",
      question: faq?.question ?? "",
      answer: faq?.answer ?? "",
    },
  });

  function onSubmit(values: FaqFormValues) {
    console.log("FAQ:", values);

    // API will be connected later.
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      <section className="rounded-2xl border border-[#DADEE7] bg-white p-6 shadow-sm">
        <div>
          <h2 className="text-xl font-semibold text-[#0F1729]">
            FAQ Information
          </h2>

          <p className="mt-1 text-sm text-[#676F7E]">
            Add the question and answer for this FAQ.
          </p>
        </div>

        <Separator className="my-6" />

        <div className="space-y-5">
          {/* Product */}
          <div className="space-y-2">
            <label
              htmlFor="productId"
              className="text-sm font-medium text-[#0F1729]"
            >
              Product
            </label>

            <select
              id="productId"
              className="
                flex h-10 w-full rounded-md border
                border-[#DADEE7]
                bg-white
                px-3 py-2
                text-sm
                text-[#0F1729]
                outline-none
                transition
                focus:border-[#072069]
                focus:ring-2
                focus:ring-[#072069]/10
              "
              defaultValue={faq?.productId ?? ""}
              onChange={(event) =>
                setValue("productId", event.target.value, {
                  shouldValidate: true,
                })
              }
            >
              <option value="" disabled>
                Select a product
              </option>

              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>

            {errors.productId && (
              <p className="text-sm text-red-500">
                {errors.productId.message}
              </p>
            )}
          </div>

          {/* Question */}
          <div className="space-y-2">
            <label
              htmlFor="question"
              className="text-sm font-medium text-[#0F1729]"
            >
              Question
            </label>

            <Input
              id="question"
              placeholder="What is LeafClutch POS?"
              {...register("question")}
            />

            {errors.question && (
              <p className="text-sm text-red-500">
                {errors.question.message}
              </p>
            )}
          </div>

          {/* Answer */}
          <div className="space-y-2">
            <label
              htmlFor="answer"
              className="text-sm font-medium text-[#0F1729]"
            >
              Answer
            </label>

            <Textarea
              id="answer"
              rows={7}
              placeholder="Write the answer to this question..."
              {...register("answer")}
            />

            {errors.answer && (
              <p className="text-sm text-red-500">
                {errors.answer.message}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Submit */}
      <div className="flex justify-end">
        <Button
          type="submit"
          size="lg"
          className="bg-[#072069] text-white hover:bg-[#072069]/90"
        >
          {faq ? "Update FAQ" : "Save FAQ"}
        </Button>
      </div>
    </form>
  );
}