"use client";

import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { adminDeleteProduct } from "@/actions/admin";

type DeleteProductDialogProps = {
  productId: string;
  productName: string;
  onDeleted?: () => void;
};

export default function DeleteProductDialog({
  productId,
  productName,
  onDeleted,
}: DeleteProductDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    setIsDeleting(true);
    try {
      const res = await adminDeleteProduct(productId);
      if (res.success) {
        toast.success(`"${productName}" deleted successfully.`);
        onDeleted?.();
      } else {
        toast.error(res.error || "Failed to delete product.");
      }
    } catch (err: any) {
      toast.error(err.message || "An unexpected error occurred.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="text-[#676F7E] hover:bg-red-50 hover:text-red-500"
            aria-label={`Delete ${productName}`}
          />
        }
      >
        <Trash2 className="size-4" />
      </AlertDialogTrigger>

      <AlertDialogContent className="w-[calc(100%-2rem)] max-w-md rounded-2xl border-[#DADEE7] bg-white p-6 shadow-xl">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-center text-base font-semibold text-[#0F1729]">
            Delete Product
          </AlertDialogTitle>
        </AlertDialogHeader>

        <AlertDialogDescription className="text-center text-sm leading-6 text-[#676F7E]">
          Are you sure you want to delete{" "}
          <span className="font-semibold text-[#0F1729]">{productName}</span>?
          This action cannot be undone.
        </AlertDialogDescription>

        <AlertDialogFooter className="mt-6 flex-row justify-center gap-3 sm:justify-center">
          <AlertDialogCancel className="mt-0 border-[#DADEE7] bg-white text-[#0F1729] hover:bg-[#F8FAFC]">
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-500 text-white hover:bg-red-600 disabled:opacity-50"
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-2 size-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete Product"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}