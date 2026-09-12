"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Pencil } from "lucide-react";

import { getProducts } from "@/actions/content";
import { products as staticProducts } from "@/data/products";

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
        <CardTitle className="text-lg text-[#0F1729]">All Products</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-4">
          {list.map((product) => (
            <div
              key={product.id ?? product.slug}
              className="flex flex-col gap-4 rounded-xl border border-[#DADEE7] p-4 transition hover:border-[#0EA5E9]/40 hover:bg-[#F8FAFC] sm:flex-row sm:items-center sm:justify-between"
            >
              {/* Product info */}
              <div className="flex items-center gap-4">
                <div className="flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-[#EBF0FA]">
                  <img
                    src={product.image || product.icon || "/showcase/hospitality.webp"}
                    alt={product.name}
                    className="size-full object-cover"
                  />
                </div>

                <div>
                  <h3 className="font-semibold text-[#0F1729]">{product.name}</h3>
                  <p className="text-sm text-[#676F7E]">{product.category || "General"}</p>
                  <span className="mt-1 inline-block rounded-full bg-[#EBF0FA] px-2.5 py-1 text-xs font-medium text-[#072069]">
                    {product.badge || "SaaS"}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <Link
                  href={`/admin/products/${product.id ?? product.slug}/edit`}
                  className="inline-flex items-center gap-1.5 rounded-md border border-[#DADEE7] bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50"
                >
                  <Pencil className="h-3.5 w-3.5" />
                  Edit
                </Link>

                <DeleteProductDialog
                  productId={product.id ?? product.slug}
                  productName={product.name}
                  onDeleted={loadProducts}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}