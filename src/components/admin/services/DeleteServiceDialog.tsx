import { useState } from "react";
import { Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { adminDeleteService } from "@/actions/admin";
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

type DeleteServiceDialogProps = {
  serviceId?: string;
  serviceName: string;
  onDeleted?: () => void;
};

export default function DeleteServiceDialog({
  serviceId,
  serviceName,
  onDeleted,
}: DeleteServiceDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  async function handleDelete() {
    if (!serviceId) return;
    setIsDeleting(true);
    try {
      const res = await adminDeleteService(serviceId);
      if (res.success) {
        toast.success(`Service "${serviceName}" deleted successfully.`);
        setIsOpen(false);
        if (onDeleted) onDeleted();
      } else {
        toast.error(res.error || "Failed to delete service.");
      }
    } catch (err: any) {
      toast.error(err.message || "An error occurred while deleting.");
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
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
            aria-label={`Delete ${serviceName}`}
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
        <AlertDialogHeader className="items-center space-y-3 text-center">
          <AlertDialogTitle className="text-lg font-bold text-[#0F1729]">
            Delete Service
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center text-sm leading-6 text-[#676F7E]">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-[#0F1729]">
              {serviceName}
            </span>
            ? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter className="mt-6 flex-row justify-center gap-3 sm:justify-center">
          <AlertDialogCancel
            disabled={isDeleting}
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
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            disabled={isDeleting}
            className="bg-red-500 text-white hover:bg-red-600 disabled:opacity-50"
          >
            {isDeleting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" /> Deleting...
              </span>
            ) : (
              "Delete Service"
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}