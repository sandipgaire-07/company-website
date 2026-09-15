export type PortfolioItem = {
  id: string;
  projectName: string;
  slug: string;
  client: string;
  category: string;
  description: string;
  technologies: string[];
  projectImage: string;
  imageGallery: string[];
  projectUrl?: string;
  caseStudy: string;
  completionDate: string;
  isFeatured: boolean;
  isPublished: boolean;
  sortOrder: number;
};

