"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Pencil } from "lucide-react";

import { getProducts } from "@/actions/content";

import DeleteProductDialog from "./DeleteDialogProduct";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ProductList() {
  const [list, setList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadProducts() {
    setLoading(true);

    const res = await getProducts();

    if (res.success && res.data) {
      setList(res.data);
    }

    setLoading(false);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <Card className="border-[#DADEE7] shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg text-[#0F1729]">
          All Products
        </CardTitle>
      </CardHeader>

      <CardContent>
        {loading ? (
          <p className="py-8 text-center text-sm text-[#676F7E]">
            Loading products...
          </p>
        ) : list.length === 0 ? (
          <p className="py-8 text-center text-sm text-[#676F7E]">
            No products found in database. Click "Add Product" to create one.
          </p>
        ) : (
          <div className="space-y-4">
            {list.map((product) => {
              const productId = product.id ?? product.slug;

              return (
                <div
                  key={productId}
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
                        src={
                          product.image ||
                          product.icon ||
                          "/showcase/hospitality.webp"
                        }
                        alt={product.name}
                        className="size-full object-cover"
                      />
                    </div>

                    <div>
                      <h3 className="font-semibold text-[#0F1729]">
                        {product.name}
                      </h3>

                      <p className="text-sm text-[#676F7E]">
                        {product.category || "General"}
                      </p>

                      <span className="mt-1 inline-block rounded-full bg-[#EBF0FA] px-2.5 py-1 text-xs font-medium text-[#072069]">
                        {product.badge || "SaaS"}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex shrink-0 items-center gap-2">
                    <Link
                      href={`/admin/products/${productId}/edit`}
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

                    <DeleteProductDialog
                      productId={productId}
                      productName={product.name}
                      onDeleted={loadProducts}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}