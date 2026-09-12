"use client";

import { Trash2 } from "lucide-react";

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

type DeleteProductDialogProps = {
  productName: string;
};

export default function DeleteProductDialog({
  productName,
}: DeleteProductDialogProps) {
  function handleDelete() {
    console.log("Delete product:", productName);

    // DELETE API will be connected later.
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="
              text-[#676F7E]
              hover:bg-red-50
              hover:text-red-500
            "
            aria-label={`Delete ${productName}`}
          />
        }
      >
        <Trash2 className="size-4" />
      </AlertDialogTrigger>

      <AlertDialogContent
  className="
    w-[calc(100%-2rem)]
    max-w-md
    rounded-2xl
    border-[#DADEE7]
    bg-white
    p-6
    shadow-xl
  "
>

   
    <AlertDialogDescription className="text-center text-sm leading-6 text-[#676F7E]">
      Are you sure you want to delete{" "}
      <span className="font-semibold text-[#0F1729]">
        {productName}
      </span>
      ? This action cannot be undone.
    </AlertDialogDescription>


  <AlertDialogFooter className="mt-6 flex-row justify-center gap-3 sm:justify-center">
    <AlertDialogCancel
      className="
        mt-0
        border-[#DADEE7]
        bg-white
        text-[#0F1729]
        hover:bg-[#F8FAFC]
      "
    >
      Cancel
    </AlertDialogCancel>

    <AlertDialogAction
      onClick={handleDelete}
      className="
        bg-red-500
        text-white
        hover:bg-red-600
      "
    >
      Delete Product
    </AlertDialogAction>
  </AlertDialogFooter>
</AlertDialogContent>
    </AlertDialog>
  );
}