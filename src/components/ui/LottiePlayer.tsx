"use client";

import { useEffect, useState, Component, ErrorInfo, ReactNode } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface LottiePlayerProps {
  src: string;
  className?: string;
}

class LottieErrorBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { hasError: boolean }> {
  constructor(props: { children: ReactNode; fallback: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Silently handle invalid animation URL or WASM fetch errors
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

export default function LottiePlayer({ src, className = "h-48 w-48" }: LottiePlayerProps) {
  const [hasError, setHasError] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Validate URL format before attempting to load via DotLottieReact
  const isValidUrl = Boolean(
    src &&
    typeof src === "string" &&
    src.trim().startsWith("http") &&
    !src.includes("your-web-animation.lottie") &&
    (src.includes(".json") || src.includes(".lottie") || src.includes("lottie"))
  );

  useEffect(() => {
    setMounted(true);
    setHasError(false);
  }, [src]);

  const fallbackUI = (
    <div className={`flex items-center justify-center rounded-xl bg-slate-100/80 p-4 text-xs font-medium text-slate-400 ${className}`}>
      Animation unavailable
    </div>
  );

  if (!mounted) {
    return (
      <div className={`flex items-center justify-center rounded-2xl bg-slate-100/50 ${className}`}>
        <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#072069] border-t-transparent" />
      </div>
    );
  }

  if (!isValidUrl || hasError) {
    return fallbackUI;
  }

  return (
    <LottieErrorBoundary fallback={fallbackUI}>
      <div className={`flex items-center justify-center overflow-hidden ${className}`}>
        <DotLottieReact
          src={src}
          loop
          autoplay
          onError={() => setHasError(true)}
          className="size-full object-contain"
        />
      </div>
    </LottieErrorBoundary>
  );
}
