export type FooterLink = {
  id: string;
  label: string;
  href: string;
};

export type FooterContact = {
  id: string;
  label: string;
  value: string;
  href?: string;
  icon: string;
};

export type SocialLink = {
  id: string;
  platform: string;
  href: string;
  icon: string;
};

export type FooterData = {
  companyLinks: FooterLink[];
  products: FooterLink[];
  contacts: FooterContact[];
  socialLinks: SocialLink[];
};