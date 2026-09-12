"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Headphones,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

import {
  SiFacebook,
  SiInstagram,
  SiLinkerd,
  SiYoutube,
} from "@icons-pack/react-simple-icons";

import { footerData } from "@/data/footer";
import { getProducts } from "@/actions/content";

const iconMap = {
  Facebook: SiFacebook,
  Instagram: SiInstagram,
  Linkedin: SiLinkerd,
  Youtube: SiYoutube,
  Phone,
  Headphones,
  Mail,
  MapPin,
};

export default function Footer() {
  const [productList, setProductList] = useState<any[]>(footerData.products);

  useEffect(() => {
    async function loadFooterProducts() {
      const res = await getProducts();
      if (res.success && res.data && res.data.length > 0) {
        const mapped = res.data.map((p: any) => ({
          id: p.id || p.slug,
          label: p.name,
          href: `/products/${p.slug}`,
        }));
        setProductList(mapped);
      }
    }
    loadFooterProducts();
  }, []);

  return (
    <footer className="bg-[#0F1729] text-white">

      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-16">

        {/* Main Footer */}
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr_1.2fr_1.4fr]">

          {/* Brand */}
          <div>
            <Link
              href="/"
              className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-white"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-tr from-[#0EA5E9] to-[#3BE3A0] text-slate-950 font-black shadow-md shadow-[#0EA5E9]/20">
                N
              </span>
              <span>NCT <span className="text-[#0EA5E9]">SOFT</span></span>
            </Link>

            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">
              Building modern digital solutions that help businesses
              simplify operations, work smarter, and scale faster.
            </p>

            {/* Social Media */}
            <div className="mt-7 flex gap-3">
              {footerData.socialLinks.map((social) => {
                const Icon =
                  iconMap[social.icon as keyof typeof iconMap];

                return (
                  <a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.platform}
                    className="flex size-9 items-center justify-center rounded-full border border-white/10 text-white/60 transition-all duration-300 hover:border-[#0EA5E9] hover:bg-[#0EA5E9] hover:text-white"
                  >
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-white">
              Company
            </h3>

            <ul className="mt-5 space-y-3">
              {footerData.companyLinks.map((link) => (
                <li key={link.id}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-sm font-semibold text-white">
              Products
            </h3>

            <ul className="mt-5 grid grid-cols-1 gap-y-3 sm:grid-cols-2 sm:gap-x-6">
              {productList.map((product) => (
                <li key={product.id}>
                  <Link
                    href={product.href}
                    className="text-sm text-white/60 transition-colors hover:text-white"
                  >
                    {product.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get In Touch */}
          <div>
            <h3 className="text-sm font-semibold text-white">
              Get in Touch
            </h3>

            <div className="mt-5 space-y-4">
              {footerData.contacts.map((contact) => {
                const Icon =
                  iconMap[contact.icon as keyof typeof iconMap];

                const content = (
                  <div className="flex gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-[#0EA5E9]">
                      <Icon className="size-4" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs text-white/40">
                        {contact.label}
                      </p>

                      <p className="mt-0.5 text-sm text-white/70 transition-colors group-hover:text-white">
                        {contact.value}
                      </p>
                    </div>
                  </div>
                );

                return contact.href ? (
                  <a
                    key={contact.id}
                    href={contact.href}
                    className="group block"
                  >
                    {content}
                  </a>
                ) : (
                  <div key={contact.id}>
                    {content}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-xs text-slate-400">
            © {new Date().getFullYear()} NCT SOFT Pvt. Ltd. All rights reserved.
          </p>

          <div className="flex gap-5">
            <Link
              href="/privacy"
              className="text-xs text-white/40 transition-colors hover:text-white"
            >
              Privacy Policy
            </Link>

            <Link
              href="/terms"
              className="text-xs text-white/40 transition-colors hover:text-white"
            >
              Terms of Service
            </Link>
          </div>

        </div>
      </div>
    </footer>
  );
}