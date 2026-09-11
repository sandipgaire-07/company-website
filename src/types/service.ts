export type Service = {
  id: string;
  title: string;
  description: string;
  slug: string;
  animationUrl: string;
};

export type ServiceFeature = {
  id: string;
  title: string;
  description: string;
  icon: string;
  sortOrder: number;
};

export type ServiceDetails = Service & {
  color: string;
  features: ServiceFeature[];
};