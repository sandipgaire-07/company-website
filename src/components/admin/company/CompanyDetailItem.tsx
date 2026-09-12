"use client";

import { useEffect, useState } from "react";
import { Check, Pencil, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type CompanyDetailItemProps = {
  label: string;
  value: string;
  multiline?: boolean;
  onSave?: (value: string) => void;
};

export default function CompanyDetailItem({
  label,
  value,
  multiline = false,
  onSave,
}: CompanyDetailItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  useEffect(() => {
    setEditValue(value);
  }, [value]);

  function handleSave() {
    const trimmedValue = editValue.trim();

    if (!trimmedValue) return;

    onSave?.(trimmedValue);
    setIsEditing(false);
  }

  function handleCancel() {
    setEditValue(value);
    setIsEditing(false);
  }

  return (
    <div className="rounded-xl border border-[#DADEE7] p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-[#676F7E]">
            {label}
          </p>

          {isEditing ? (
            <div className="mt-2">
              {multiline ? (
                <Textarea
                  value={editValue}
                  onChange={(event) => setEditValue(event.target.value)}
                  rows={4}
                  autoFocus
                  className="border-[#DADEE7]"
                />
              ) : (
                <Input
                  value={editValue}
                  onChange={(event) => setEditValue(event.target.value)}
                  autoFocus
                  className="border-[#DADEE7]"
                />
              )}

              <div className="mt-3 flex items-center gap-2">
                <Button
                  type="button"
                  size="sm"
                  onClick={handleSave}
                  className="bg-[#072069] text-white hover:bg-[#072069]/90"
                >
                  <Check className="size-4" />
                  Save
                </Button>

                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  onClick={handleCancel}
                  className="border-[#DADEE7]"
                >
                  <X className="size-4" />
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <p className="mt-1 whitespace-pre-wrap text-sm leading-6 text-[#0F1729]">
              {value || "Not set"}
            </p>
          )}
        </div>

        {!isEditing && (
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setIsEditing(true)}
            className="shrink-0 text-[#676F7E] hover:bg-[#EBF0FA] hover:text-[#072069]"
            aria-label={`Edit ${label}`}
          >
            <Pencil className="size-4" />
          </Button>
        )}
      </div>
    </div>
  );
}