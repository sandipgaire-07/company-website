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

type RevokeCertificateDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  certificateId: string;
  recipientName: string;
  onConfirm: () => void;
};

export default function RevokeCertificateDialog({
  open,
  onOpenChange,
  certificateId,
  recipientName,
  onConfirm,
}: RevokeCertificateDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-bold text-[#0F1729]">
            Revoke Certificate?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-[#676F7E]">
            This certificate (<span className="font-semibold text-[#0F1729]">{certificateId}</span> for <span className="font-semibold text-[#0F1729]">{recipientName}</span>) will no longer be considered valid.
            It will remain visible in the list with a &quot;Revoked&quot; status.
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
            className="bg-amber-600 text-white hover:bg-amber-700"
          >
            Revoke Certificate
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
