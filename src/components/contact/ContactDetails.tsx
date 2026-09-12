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

const contactIconMap = { Headphones, Mail, MapPin, Phone };
const socialIconMap = {
  Facebook: SiFacebook,
  Instagram: SiInstagram,
  Linkedin: SiLinkerd,
  Youtube: SiYoutube,
};

export default function ContactDetails() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-[#DADEE7] bg-white p-6 text-[#0F1729] shadow-sm sm:p-8">
      <div className="pointer-events-none absolute -right-12 -top-12 size-50 rounded-full bg-linear-to-br from-[#072069]/15 via-[#0EA5E9]/20 to-[#3BE3A0]/25 blur-2xl" />

      <div className="relative">
        <h2 className="text-2xl font-bold">Let&apos;s talk</h2>
        <p className="mt-3 max-w-md text-sm leading-6 text-[#676F7E]">
        Have a question or a project in mind? Our team is ready to help.
        </p>

        <div className="mt-8 space-y-5">
          {footerData.contacts.map((contact) => {
            const Icon = contactIconMap[contact.icon as keyof typeof contactIconMap];
            const content = (
              <div className="flex gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#0EA5E9]/10 text-[#072069]">
                  <Icon className="size-4" />
                </div>
                <div>
                  <p className="text-xs text-[#676F7E]">{contact.label}</p>
                  <p className="mt-1 text-sm text-[#0F1729]">{contact.value}</p>
                </div>
              </div>
            );

            return contact.href ? (
              <a key={contact.id} href={contact.href} className="block transition-opacity hover:opacity-80">
                {content}
              </a>
            ) : (
              <div key={contact.id}>{content}</div>
            );
          })}
        </div>

        <div className="mt-8 border-t border-[#DADEE7] pt-6">
          <p className="text-sm font-semibold">Follow us</p>
          <div className="mt-3 flex gap-3">
            {footerData.socialLinks.map((social) => {
              const Icon = socialIconMap[social.icon as keyof typeof socialIconMap];
              return (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.platform}
                  className="flex size-9 items-center justify-center rounded-full bg-[#072069]/5 text-[#072069] transition-colors hover:bg-[#0EA5E9] hover:text-white"
                >
                  <Icon className="size-4" />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
