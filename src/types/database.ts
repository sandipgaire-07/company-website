// ============================================================
// LeafClutch Technologies — Database Types
// Auto-maintained to match supabase/migrations/001_initial_schema.sql
// ============================================================

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

// ── Enums ────────────────────────────────────────────────────

export type BillingCycle = 'monthly' | 'yearly' | 'one_time'
export type SubmissionStatus = 'new' | 'read' | 'replied'

// ── Row types (what you get back from SELECT) ────────────────

export interface SiteContentRow {
  id: string
  section: string        // 'hero' | 'about' | 'achievement_story' | etc.
  title: string | null
  subtitle: string | null
  description: string | null
  badge_text: string | null
  extra: Json | null     // flexible additional fields per section
  updated_at: string
}

export interface ProductRow {
  id: string
  name: string
  slug: string
  description: string | null
  icon: string | null    // Lucide icon name
  category: string | null
  is_active: boolean
  is_featured: boolean
  sort_order: number
  created_at: string
  updated_at: string
}

export interface ProductPriceRow {
  id: string
  product_id: string
  plan_name: string       // e.g. 'Starter', 'Professional', 'Enterprise'
  billing_cycle: BillingCycle
  price: number           // in NPR (or your chosen currency)
  currency: string        // 'NPR' | 'USD' etc.
  is_highlighted: boolean // show as recommended / most popular
  sort_order: number
  created_at: string
  updated_at: string
}

export interface ProductVariationRow {
  id: string
  product_price_id: string
  feature: string         // e.g. 'Up to 5 users'
  is_included: boolean    // true = ✓, false = ✗ (shown greyed out)
  sort_order: number
}

export interface CompanyRow {
  id: string
  name: string
  logo_url: string
  website_url: string | null
  is_active: boolean
  sort_order: number
  created_at: string
}

export interface AchievementRow {
  id: string
  value: string           // '1.5+', '99%', etc.
  title: string
  description: string | null
  icon: string | null     // Lucide icon name
  sort_order: number
}

export interface ServiceRow {
  id: string
  title: string
  description: string | null
  icon: string | null
  is_active: boolean
  sort_order: number
}

export interface TeamMemberRow {
  id: string
  name: string
  role: string
  bio: string | null
  avatar_url: string | null
  linkedin_url: string | null
  sort_order: number
  is_active: boolean
}

export interface TestimonialRow {
  id: string
  author_name: string
  author_company: string | null
  author_role: string | null
  avatar_url: string | null
  content: string
  rating: number
  is_active: boolean
  sort_order: number
}

export interface ContactSubmissionRow {
  id: string
  name: string
  email: string
  company: string | null
  message: string
  status: SubmissionStatus
  created_at: string
}

// ── Insert types (what you send in INSERT) ───────────────────

export type SiteContentInsert = Omit<SiteContentRow, 'id' | 'updated_at'>
export type ProductInsert = Omit<ProductRow, 'id' | 'created_at' | 'updated_at'>
export type ProductPriceInsert = Omit<ProductPriceRow, 'id' | 'created_at' | 'updated_at'>
export type ProductVariationInsert = Omit<ProductVariationRow, 'id'>
export type CompanyInsert = Omit<CompanyRow, 'id' | 'created_at'>
export type AchievementInsert = Omit<AchievementRow, 'id'>
export type ServiceInsert = Omit<ServiceRow, 'id'>
export type TeamMemberInsert = Omit<TeamMemberRow, 'id'>
export type TestimonialInsert = Omit<TestimonialRow, 'id'>
export type ContactSubmissionInsert = Omit<ContactSubmissionRow, 'id' | 'status' | 'created_at'>

// ── Database shape (used by createClient<Database>()) ────────

export interface Database {
  public: {
    Tables: {
      site_content: {
        Row: SiteContentRow
        Insert: SiteContentInsert
        Update: Partial<SiteContentInsert>
      }
      products: {
        Row: ProductRow
        Insert: ProductInsert
        Update: Partial<ProductInsert>
      }
      product_prices: {
        Row: ProductPriceRow
        Insert: ProductPriceInsert
        Update: Partial<ProductPriceInsert>
      }
      product_variations: {
        Row: ProductVariationRow
        Insert: ProductVariationInsert
        Update: Partial<ProductVariationInsert>
      }
      companies: {
        Row: CompanyRow
        Insert: CompanyInsert
        Update: Partial<CompanyInsert>
      }
      achievements: {
        Row: AchievementRow
        Insert: AchievementInsert
        Update: Partial<AchievementInsert>
      }
      services: {
        Row: ServiceRow
        Insert: ServiceInsert
        Update: Partial<ServiceInsert>
      }
      team_members: {
        Row: TeamMemberRow
        Insert: TeamMemberInsert
        Update: Partial<TeamMemberInsert>
      }
      testimonials: {
        Row: TestimonialRow
        Insert: TestimonialInsert
        Update: Partial<TestimonialInsert>
      }
      contact_submissions: {
        Row: ContactSubmissionRow
        Insert: ContactSubmissionInsert
        Update: Partial<Pick<ContactSubmissionRow, 'status'>>
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: {
      billing_cycle: BillingCycle
      submission_status: SubmissionStatus
    }
  }
}

// ── Convenience joined types (for common queries) ────────────

/** Product with all its pricing tiers and each tier's feature list */
export interface ProductWithPricing extends ProductRow {
  product_prices: (ProductPriceRow & {
    product_variations: ProductVariationRow[]
  })[]
}
