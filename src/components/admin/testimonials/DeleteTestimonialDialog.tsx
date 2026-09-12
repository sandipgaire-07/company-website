"use client";

import { useState } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { adminDeleteTestimonial } from "@/actions/admin";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type DeleteTestimonialDialogProps = {
  id: string;
  clientName: string;
  onDeleted?: () => void;
};

export default function DeleteTestimonialDialog({
  id,
  clientName,
  onDeleted,
}: DeleteTestimonialDialogProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    setIsDeleting(true);
    try {
      const result = await adminDeleteTestimonial(id);
      if (!result.success) {
        toast.error(result.error ?? "Failed to delete testimonial.");
        return;
      }
      toast.success(`Testimonial from ${clientName} deleted.`);
      onDeleted?.();
      router.refresh();
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
            aria-label={`Delete testimonial from ${clientName}`}
          />
        }
      >
        <Trash2 className="size-4" />
      </AlertDialogTrigger>

      <AlertDialogContent
        className="w-[calc(100%-2rem)] max-w-md rounded-2xl border-[#DADEE7] bg-white p-6 shadow-xl"
      >
        <AlertDialogHeader className="items-center space-y-3 text-center">
          <AlertDialogDescription className="text-center text-sm leading-6 text-[#676F7E]">
            Are you sure you want to delete the testimonial from{" "}
            <span className="font-semibold text-[#0F1729]">
              {clientName}
            </span>
            ? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-6 flex-row justify-center gap-3 sm:justify-center">
          <AlertDialogCancel
            className="mt-0 border-[#DADEE7] bg-white text-[#0F1729] hover:bg-[#F8FAFC]"
          >
            Cancel
          </AlertDialogCancel>

          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-red-500 text-white hover:bg-red-600"
          >
            {isDeleting ? (
              <>
                <Loader2 className="mr-1 size-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete Testimonial"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
