"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type MarqueeProps = {
  children: React.ReactNode;
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  repeat?: number;
};

export function Marquee({
  children,
  className,
  reverse = false,
  pauseOnHover = true,
  repeat = 4,
}: MarqueeProps) {
  return (
    <div
      className={cn(
        "group flex w-full overflow-hidden",
        className
      )}
    >
      {Array.from({ length: repeat }).map((_, index) => (
        <div
          key={index}
          className={cn(
            "flex shrink-0 items-center gap-12 pr-12",
            "animate-marquee",
            pauseOnHover && "group-hover:[animation-play-state:paused]",
            reverse && "[animation-direction:reverse]"
          )}
        >
          {children}
        </div>
      ))}
    </div>
  );
}