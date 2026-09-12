import Link from "next/link";
import { Pencil } from "lucide-react";

import { products } from "@/data/products";

import DeleteProductDialog from "./DeleteDialogProduct";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ProductList() {
  return (
    <Card className="border-[#DADEE7] shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg text-[#0F1729]">
          All Products
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="
                flex flex-col gap-4 rounded-xl
                border border-[#DADEE7] p-4
                transition
                hover:border-[#0EA5E9]/40
                hover:bg-[#F8FAFC]
                sm:flex-row sm:items-center sm:justify-between
              "
            >
              {/* Product information */}
              <div className="flex items-center gap-4">
                <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#EBF0FA]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="size-full object-cover"
                  />
                </div>

                <div>
                  <h3 className="font-semibold text-[#0F1729]">
                    {product.name}
                  </h3>

                  <p className="text-sm text-[#676F7E]">
                    {product.category}
                  </p>

                  <span className="mt-1 inline-block rounded-full bg-[#EBF0FA] px-2.5 py-1 text-xs font-medium text-[#072069]">
                    {product.badge}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/products/${product.id}/edit`}
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

                <DeleteProductDialog productName={product.name} />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}