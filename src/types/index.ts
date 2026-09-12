export type ActionResult<T> = {
  success: boolean
  data?: T
  error?: string
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  icon: string | null
  category: string | null
  is_active: boolean
  is_featured: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface ProductPrice {
  id: string
  product_id: string
  plan_name: string
  billing_cycle: 'monthly' | 'yearly'
  price: number
  currency: string
  is_highlighted: boolean
  sort_order: number
  created_at: string
}

export interface ProductVariation {
  id: string
  product_price_id: string
  feature: string
  is_included: boolean
  sort_order: number
  created_at: string
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string | null
  is_active: boolean
  sort_order: number
  created_at: string
}

export interface SiteContent {
  id: string
  section: string
  title: string | null
  subtitle: string | null
  description: string | null
  badge_text: string | null
  extra: Record<string, any> | null
  created_at: string
  updated_at: string
}

// Dynamic Company Settings & Admin Types
export interface AdminUser {
  id: string
  email: string
}

export interface CompanySettings {
  company_name: string
  short_name: string
  tagline: string
  established_year: string
  location: string
  phone: string
  email: string
  logo_url: string
  dark_logo_url: string
  favicon_url: string
  social_links: {
    facebook?: string
    linkedin?: string
    instagram?: string
    twitter?: string
  }
}

// Dynamic Website Additions
export interface DemoRequestInput {
  full_name: string
  email: string
  phone: string
  company_name?: string
  product_name?: string
  message?: string
}

export interface ContactSubmissionInput {
  name: string
  email: string
  phone?: string
  company?: string
  subject?: string
  message: string
}

export interface JobApplicationInput {
  job_id?: string
  job_title: string
  full_name: string
  email: string
  phone: string
  resume_url: string
  cover_message?: string
}


export interface PortfolioShowcase {
  id: string
  title: string
  slug: string
  category: string
  description: string | null
  image_url: string
  badge_text: string | null
  accent_color: string
  live_url: string | null
  is_featured: boolean
  sort_order: number
  created_at: string
}

export interface PartnerIntegration {
  id: string
  name: string
  category: 'payment_gateway' | 'certification' | 'ecosystem'
  logo_url: string
  description: string | null
  is_active: boolean
  sort_order: number
  created_at: string
}

export interface JobPosting {
  id: string
  title: string
  department: string
  location: string
  employment_type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship'
  description: string
  requirements: string[]
  is_open: boolean
  created_at: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content: string
  cover_image: string | null
  author_name: string
  category: string
  published_at: string
  is_published: boolean
}

export interface ProductFaq {
  id: string
  product_id: string
  question: string
  answer: string
  sort_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface CompanyStat {
  id: string
  label: string
  value: string
  icon: string | null
  sort_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}

export interface ProductFeature {
  id: string
  product_id: string | null
  title: string
  description: string | null
  icon: string | null
  sort_order: number
  is_active: boolean
  created_at: string
  updated_at: string
}
