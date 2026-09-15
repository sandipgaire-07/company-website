import Link from "next/link";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';


export default function Hero() {
  return (
    <section className="relative overflow-hidden px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      {/* Background gradient glow */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-[#0EA5E9]/10 blur-3xl" />
        <div className="absolute right-0 top-1/3 h-[400px] w-[400px] rounded-full bg-[#072069]/10 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 md:grid-cols-2">
        {/* Left Side */}
        <div>
          <span className="inline-flex rounded-full border border-[#DADEE7] bg-[#F8FAFC] px-4 py-2 text-sm font-medium text-[#072069]">
            Smart Software Solutions
          </span>

          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-[#0F1729] sm:text-5xl lg:text-6xl">
            Building Software
            <span className="block  bg-[#072069]  bg-clip-text text-transparent">
              That Moves Your Business Forward
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-[#676F7E] sm:text-lg">
            We create modern and reliable software solutions that
            help businesses work smarter, improve efficiency, and
            grow with confidence.
          </p>

          {/* Buttons */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md bg-[#072069] px-6 py-3 text-sm font-medium text-white shadow-lg shadow-[#0EA5E9]/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#0EA5E9]/30"
            >
              Get Started
            </Link>

            <Link
              href="#products"
              className="inline-flex items-center justify-center rounded-md border border-[#DADEE7] bg-white px-6 py-3 text-sm font-medium text-[#072069] transition-all duration-300 hover:border-[#0EA5E9] hover:bg-[#F8FAFC]"
            >
              Explore Products
            </Link>
          </div>
        </div>

      {/* Right Side */}
<div className="flex justify-center md:justify-end">
  <div className="relative w-full max-w-xl">
    {/* Gradient glow behind animation */}
    <div className="absolute -inset-4 -z-10 rounded-3xl bg-gradient-to-r from-[#072069]/20 to-[#0EA5E9]/20 blur-2xl" />

    <DotLottieReact
      src="https://lottie.host/0618f081-ed78-4aba-aa5d-e3a254164a48/RoeZhdGVv1.lottie"
      loop
      autoplay
      className="h-auto w-full scale-160"
    />
  </div>
</div>
      </div>
    </section>
  );
}