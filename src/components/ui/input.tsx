import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type = "text", ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-[#DADEE7] bg-white px-3 py-2 text-sm text-[#0F1729] outline-none transition-colors placeholder:text-[#676F7E]/70 focus:border-[#0EA5E9] focus:ring-2 focus:ring-[#0EA5E9]/20 disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export { Input };
