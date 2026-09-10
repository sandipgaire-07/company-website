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

export type ProductDetails = {
  productId: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  imageAlt: string;
  stats: ProductStat[];
  features: ProductFeature[];
};
