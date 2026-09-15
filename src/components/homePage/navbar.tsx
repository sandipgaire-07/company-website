"use client";

import Link from "next/link";
import {
  ChevronDown,
  Menu,
  X,
  Briefcase,
  BookOpen,
  GraduationCap,
  Award,
  FolderKanban,
  HelpCircle,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const primaryNavItems = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Our Products", href: "/products" },
];

const othersItems = [
  { label: "Careers", href: "/career", icon: Briefcase, external: false },
  { label: "Blogs", href: "/blog", icon: BookOpen, external: false },
  {
    label: "Training & Internship",
    href: "https://leafclutchtech.com.np",
    icon: GraduationCap,
    external: true,
  },
  { label: "Verify Certificate", href: "/verify-certificate", icon: Award, external: false },
  { label: "Our Work / Portfolio", href: "/portfolio", icon: FolderKanban, external: false },
  { label: "FAQ", href: "/faq", icon: HelpCircle, external: false },
];

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileOthersOpen, setIsMobileOthersOpen] = useState(false);
  const [isOthersOpen, setIsOthersOpen] = useState(false);

  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleOthersEnter = () => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
    }
    setIsOthersOpen(true);
  };

  const handleOthersLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setIsOthersOpen(false);
    }, 150);
  };

  useEffect(() => {
    return () => {
      if (closeTimeout.current) {
        clearTimeout(closeTimeout.current);
      }
    };
  }, []);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setIsMobileOthersOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md transition-all shadow-xs">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          onClick={closeMobileMenu}
          className="group flex items-center gap-2 text-2xl font-extrabold tracking-tight text-[#072069]"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#0EA5E9] to-[#3BE3A0] text-slate-950 font-black shadow-md shadow-[#0EA5E9]/20">
            L
          </span>
          <span>
            Leaf<span className="text-[#0EA5E9]">Clutch</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {primaryNavItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm font-medium text-[#676F7E] transition-colors hover:text-[#072069]"
            >
              {item.label}
            </Link>
          ))}

          {/* Others Dropdown */}
          <div
            className="relative"
            onMouseEnter={handleOthersEnter}
            onMouseLeave={handleOthersLeave}
          >
            <DropdownMenu open={isOthersOpen} onOpenChange={setIsOthersOpen}>
              <DropdownMenuTrigger
                className="flex items-center gap-1 text-sm font-medium text-[#676F7E] outline-none transition-colors hover:text-[#072069]"
                onPointerEnter={handleOthersEnter}
              >
                Others
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isOthersOpen ? "rotate-180" : ""
                  }`}
                />
              </DropdownMenuTrigger>

              <DropdownMenuContent
                align="center"
                sideOffset={10}
                className="w-64 rounded-xl border border-[#DADEE7] bg-white p-2 shadow-xl shadow-[#072069]/10"
                onMouseEnter={handleOthersEnter}
                onMouseLeave={handleOthersLeave}
              >
                {othersItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <DropdownMenuItem
                      key={item.label}
                      render={
                        item.external ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                          />
                        ) : (
                          <Link href={item.href} />
                        )
                      }
                      className="group cursor-pointer rounded-lg p-2.5 outline-none transition-colors hover:bg-[#F8FAFC] data-[highlighted]:bg-[#F8FAFC]"
                    >
                      <div className="flex w-full items-center gap-3">
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#072069]/5 text-[#072069] transition-colors group-hover:bg-[#072069] group-hover:text-white">
                          <Icon className="h-4 w-4" />
                        </div>
                        <span className="text-sm font-medium text-[#0F1729] transition-colors group-hover:text-[#072069]">
                          {item.label}
                        </span>
                      </div>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Link
            href="/contact"
            className="text-sm font-medium text-[#676F7E] transition-colors hover:text-[#072069]"
          >
            Contact Us
          </Link>
        </div>

        {/* Desktop CTA */}
        <Link
          href="/contact"
          className="hidden rounded-md bg-[#072069] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#0EA5E9] md:inline-flex"
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
            isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"
          }
          aria-expanded={isMobileMenuOpen}
        >
          {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </nav>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="border-t border-[#DADEE7] bg-white md:hidden">
          <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6">
            <div className="space-y-1">
              {primaryNavItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={closeMobileMenu}
                  className="block rounded-md px-3 py-2.5 text-sm font-medium text-[#676F7E] transition-colors hover:bg-[#F8FAFC] hover:text-[#072069]"
                >
                  {item.label}
                </Link>
              ))}

              {/* Mobile Others Dropdown */}
              <div className="border-t border-[#DADEE7] pt-2">
                <button
                  type="button"
                  onClick={() => setIsMobileOthersOpen((prev) => !prev)}
                  className="flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-[#676F7E] transition-colors hover:bg-[#F8FAFC] hover:text-[#072069]"
                  aria-expanded={isMobileOthersOpen}
                >
                  <span>Others</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-200 ${
                      isMobileOthersOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {isMobileOthersOpen && (
                  <div className="mt-1 space-y-1 rounded-xl bg-[#F8FAFC] p-2">
                    {othersItems.map((item) => {
                      const Icon = item.icon;
                      return item.external ? (
                        <a
                          key={item.label}
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={closeMobileMenu}
                          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-[#0F1729] hover:bg-white hover:text-[#072069]"
                        >
                          <Icon className="h-4 w-4 text-[#072069]" />
                          <span>{item.label}</span>
                        </a>
                      ) : (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={closeMobileMenu}
                          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-[#0F1729] hover:bg-white hover:text-[#072069]"
                        >
                          <Icon className="h-4 w-4 text-[#072069]" />
                          <span>{item.label}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Mobile Contact Link */}
              <Link
                href="/contact"
                onClick={closeMobileMenu}
                className="block rounded-md px-3 py-2.5 text-sm font-medium text-[#676F7E] transition-colors hover:bg-[#F8FAFC] hover:text-[#072069]"
              >
                Contact Us
              </Link>

              {/* Mobile CTA */}
              <div className="border-t border-[#DADEE7] pt-4">
                <Link
                  href="/contact"
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
