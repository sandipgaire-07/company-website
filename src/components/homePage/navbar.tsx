
"use client";

import Link from "next/link";
import {
  BriefcaseBusiness,
  ChevronDown,
  Menu,
  ShoppingBag,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { products } from "@/data/products";

const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Contact", href: "/contact" },
];

const iconMap = {
  ShoppingBag,
  Users,
  BriefcaseBusiness,
};

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileProductsOpen, setIsMobileProductsOpen] = useState(false);
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  let closeTimeout: NodeJS.Timeout;

  const handleProductsEnter = () => {
    clearTimeout(closeTimeout);
    setIsProductsOpen(true);
  };

  const handleProductsLeave = () => {
    closeTimeout = setTimeout(() => {
      setIsProductsOpen(false);
    }, 150);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileProductsOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-[#DADEE7] bg-white/95 backdrop-blur">
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMobileMenu}
          className="text-xl font-bold tracking-tight text-[#072069]"
        >
          leafClutch
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-[#676F7E] transition-colors hover:text-[#072069]"
            >
              {item.label}
            </Link>
          ))}

          {/* Products Hover Dropdown */}
          <div
            className="relative"
            onMouseEnter={handleProductsEnter}
            onMouseLeave={handleProductsLeave}
          >
            <DropdownMenu
              open={isProductsOpen}
              onOpenChange={setIsProductsOpen}
            >
              <DropdownMenuTrigger
                className="flex items-center gap-1 text-sm font-medium text-[#676F7E] outline-none transition-colors hover:text-[#072069]"
                onPointerEnter={handleProductsEnter}
              >
                Products
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isProductsOpen ? "rotate-180" : ""
                  }`}
                />
              </DropdownMenuTrigger>
<DropdownMenuContent
  align="center"
  sideOffset={10}
  className="w-80 rounded-xl border border-[#DADEE7] bg-white p-2 shadow-xl shadow-[#072069]/10"
  onMouseEnter={handleProductsEnter}
  onMouseLeave={handleProductsLeave}
>
  {/* Dropdown Header */}
  <div className="mb-1 rounded-lg bg-gradient-to-r from-[#072069]/5 to-[#0EA5E9]/10 px-3 py-2.5">
    <p className="text-sm font-semibold text-[#072069]">
      Our Products
    </p>

    <p className="mt-0.5 text-xs text-[#676F7E]">
      Explore our software solutions
    </p>
  </div>

  {products.map((product) => {
    const Icon =
      iconMap[product.icon as keyof typeof iconMap];

    return (
      <DropdownMenuItem
        key={product.id}
        render={
          <Link href={`/products/${product.slug}`} />
        }
        className="group cursor-pointer rounded-lg p-0 outline-none focus:bg-[#F8FAFC] data-[highlighted]:bg-[#F8FAFC]"
      >
        <div className="flex w-full items-start gap-3 rounded-lg p-3 transition-all duration-200">
          {/* Icon */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#072069]/10 to-[#0EA5E9]/15 transition-all duration-200 group-hover:from-[#072069] group-hover:to-[#0EA5E9]">
            <Icon className="h-5 w-5 text-[#072069] transition-colors duration-200 group-hover:text-white" />
          </div>

          {/* Content */}
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-[#0F1729] transition-colors duration-200 group-hover:text-[#072069]">
              {product.name}
            </p>

            <p className="mt-1 line-clamp-2 text-xs leading-5 text-[#676F7E]">
              {product.description}
            </p>
          </div>

          {/* Arrow */}
          <span className="mt-2 text-sm text-[#DADEE7] transition-all duration-200 group-hover:translate-x-1 group-hover:text-[#0EA5E9]">
            →
          </span>
        </div>
      </DropdownMenuItem>
    );
  })}

  {/* View All */}
  <div className="mt-1 border-t border-[#DADEE7] pt-2">
    <DropdownMenuItem
      render={<Link href="/products" />}
      className="group cursor-pointer rounded-lg outline-none data-[highlighted]:bg-[#F8FAFC]"
    >
      <div className="flex w-full items-center justify-center gap-2 rounded-lg px-3 py-2.5">
        <span className="text-sm font-semibold text-[#0EA5E9] transition-colors group-hover:text-[#072069]">
          View all products
        </span>

        <span className="text-[#0EA5E9] transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      </div>
    </DropdownMenuItem>
  </div>
</DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Desktop CTA */}
        <Link
          href="#contact"
          className="hidden rounded-md bg-[#0EA5E9] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#072069] md:inline-flex"
        >
          Get Started
        </Link>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen((prev) => !prev)}
          aria-label={
            isMobileMenuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </nav>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="border-t border-[#DADEE7] bg-white md:hidden">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
            <div className="space-y-1">
              {/* Main Links */}
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className="block rounded-md px-3 py-2.5 text-sm font-medium text-[#676F7E] transition-colors hover:bg-[#F8FAFC] hover:text-[#072069]"
                >
                  {item.label}
                </Link>
              ))}

              {/* Mobile Products */}
             {/* Mobile Products */}
<div className="border-t border-[#DADEE7] pt-2">
  <button
    type="button"
    onClick={() =>
      setIsMobileProductsOpen((prev) => !prev)
    }
    className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-medium text-[#676F7E] transition-colors hover:bg-[#F8FAFC] hover:text-[#072069]"
    aria-expanded={isMobileProductsOpen}
  >
    <span>Products</span>

    <ChevronDown
      className={`h-4 w-4 transition-transform duration-200 ${
        isMobileProductsOpen ? "rotate-180" : ""
      }`}
    />
  </button>

  {/* Mobile Product List */}
  {isMobileProductsOpen && (
    <div className="mt-1 space-y-1 rounded-xl bg-gradient-to-b from-[#F8FAFC] to-[#EBF0FA]/60 p-2">
      {/* Header */}
      <div className="px-2 py-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-[#072069]">
          Our Products
        </p>

        <p className="mt-0.5 text-xs text-[#676F7E]">
          Explore our software solutions
        </p>
      </div>

      {products.map((product) => {
        const Icon =
          iconMap[product.icon as keyof typeof iconMap];

        return (
          <Link
            key={product.id}
            href={`/products/${product.slug}`}
            onClick={closeMobileMenu}
            className="group flex items-start gap-3 rounded-lg border border-transparent bg-white px-3 py-3 transition-all duration-200 hover:border-[#DADEE7] hover:bg-white hover:shadow-sm"
          >
            {/* Icon */}
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-[#072069]/10 to-[#0EA5E9]/15 transition-all duration-200 group-hover:from-[#072069] group-hover:to-[#0EA5E9]">
              <Icon className="h-4 w-4 text-[#072069] transition-colors duration-200 group-hover:text-white" />
            </div>

            {/* Product Info */}
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-[#0F1729] transition-colors duration-200 group-hover:text-[#072069]">
                {product.name}
              </p>

              <p className="mt-0.5 text-xs leading-5 text-[#676F7E]">
                {product.description}
              </p>
            </div>

            {/* Arrow */}
            <span className="mt-1 text-sm text-[#DADEE7] transition-all duration-200 group-hover:translate-x-1 group-hover:text-[#0EA5E9]">
              →
            </span>
          </Link>
        );
      })}

      {/* View All Products */}
      <Link
        href="/products"
        onClick={closeMobileMenu}
        className="group flex items-center justify-center gap-2 rounded-lg px-3 py-2.5 text-sm font-semibold text-[#0EA5E9] transition-colors hover:bg-white hover:text-[#072069]"
      >
        <span>View all products</span>

        <span className="transition-transform duration-200 group-hover:translate-x-1">
          →
        </span>
      </Link>
    </div>
  )}
</div>

              {/* Mobile CTA */}
              <div className="border-t border-[#DADEE7] pt-4">
                <Link
                  href="#contact"
                  onClick={closeMobileMenu}
                  className="flex w-full items-center justify-center rounded-md bg-[#0EA5E9] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#072069]"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
