"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type DeleteCertificateDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  certificateId: string;
  recipientName: string;
  onConfirm: () => void;
};

export default function DeleteCertificateDialog({
  open,
  onOpenChange,
  certificateId,
  recipientName,
  onConfirm,
}: DeleteCertificateDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-bold text-[#0F1729]">
            Delete Certificate?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-[#676F7E]">
            Are you sure you want to delete certificate <span className="font-semibold text-[#0F1729]">{certificateId}</span> issued to <span className="font-semibold text-[#0F1729]">{recipientName}</span>?
            This action will remove the record.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => onOpenChange(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              onConfirm();
              onOpenChange(false);
            }}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
