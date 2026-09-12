import Link from "next/link";
import { Pencil } from "lucide-react";

import { faqs } from "@/data/faqs";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import DeleteFaqDialog from "@/components/admin/faq/DeleteFaqDialog";

export default function FaqList() {
  return (
    <Card className="border-[#DADEE7] shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg text-[#0F1729]">
          All FAQs
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="
                flex flex-col gap-4 rounded-xl
                border border-[#DADEE7] p-5
                transition
                hover:border-[#0EA5E9]/40
                hover:bg-[#F8FAFC]
                sm:flex-row sm:items-center sm:justify-between
              "
            >
              <div className="min-w-0">
                <h3 className="font-semibold text-[#0F1729]">
                  {faq.question}
                </h3>

                <p className="mt-2 line-clamp-2 max-w-2xl text-sm leading-6 text-[#676F7E]">
                  {faq.answer}
                </p>

                <span className="mt-3 inline-block rounded-full bg-[#EBF0FA] px-2.5 py-1 text-xs font-medium text-[#072069]">
                  Product Name: {faq.productId}
                </span>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                <Link
                  href={`/admin/faqs/${faq.id}/edit`}
                  className="
                    inline-flex
                    items-center
                    justify-center
                    gap-2
                    rounded-md
                    border
                    border-[#DADEE7]
                    bg-white
                    px-3
                    py-2
                    text-sm
                    font-medium
                    text-[#0F1729]
                    transition-colors
                    hover:bg-[#F8FAFC]
                    hover:text-[#072069]
                  "
                >
                  <Pencil className="size-4" />
                  Edit
                </Link>

                <DeleteFaqDialog question={faq.question} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}