export type ProductStat = {
  id: string;
  value: string;
  label: string;
  description: string;
};

export type ProductFeature = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

import { Product } from "@/types/product";

export type ProductPricingPlan = {
  id: string;
  name: string;
  description: string;
  price: number;
  discountedPrice?: number;
  currency: string;
  billingPeriod: string;
  features: string[];
  isPopular: boolean;
  sortOrder?: number;
};

export type ProductDetails = Product & {
  imageAlt?: string;
  stats: ProductStat[];
  features: ProductFeature[];
  pricing: ProductPricingPlan[];
};

