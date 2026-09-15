export type HomepageSectionKey =
  | "about"
  | "services"
  | "products"
  | "statistics"
  | "portfolio"
  | "testimonials"
  | "clients"
  | "blogs"
  | "faq"
  | "cta";

export type HomepageSection = {
  id: string;
  sectionKey: HomepageSectionKey;
  title: string;
  description: string;
  image?: string | null;
  content?: Record<string, unknown> | null;
  isActive: boolean;
  sortOrder: number;
  createdAt?: string;
  updatedAt?: string;
};
