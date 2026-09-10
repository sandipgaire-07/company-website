'use server'

import { createClient } from '@/lib/supabase/server'
import type {
  ActionResult,
  DemoRequestInput,
  PortfolioShowcase,
  PartnerIntegration,
  JobPosting,
  BlogPost,
  ProductFaq,
  CompanyStat,
  ProductFeature
} from '@/types/index'

// ============================================================
// PRODUCTS & VARIATIONS
// ============================================================

/**
 * Fetch all active products with prices and feature variations
 */
export async function getProducts(): Promise<ActionResult<any[]>> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        product_prices (
          *,
          product_variations (*)
        )
      `)
      .eq('is_active', true)
      .order('sort_order')

    if (error) return { success: false, error: error.message }
    return { success: true, data: data || [] }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

/**
 * Fetch a single product by slug with its prices and variations
 */
export async function getProductBySlug(slug: string): Promise<ActionResult<any>> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('products')
      .select(`
        *,
        product_prices (
          *,
          product_variations (*)
        )
      `)
      .eq('slug', slug)
      .eq('is_active', true)
      .single()

    if (error) return { success: false, error: error.message }
    return { success: true, data }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

// ============================================================
// SERVICES
// ============================================================

/**
 * Fetch all active services
 */
export async function getServices(): Promise<ActionResult<any[]>> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('sort_order')

    if (error) return { success: false, error: error.message }
    return { success: true, data: data || [] }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

// ============================================================
// DYNAMIC SHOWCASE, INTEGRATIONS, JOBS & BLOGS
// ============================================================

/**
 * Submit a Request Demo or Contact form inquiry
 */
export async function submitDemoRequest(input: DemoRequestInput): Promise<ActionResult<null>> {
  try {
    const supabase = await createClient()
    const { error } = await (supabase as any)
      .from('demo_requests')
      .insert([input])

    if (error) return { success: false, error: error.message }
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

/**
 * Fetch Portfolio & SaaS products showcase (Atithya, Restro, Upastithi, etc.)
 */
export async function getPortfolioShowcase(): Promise<ActionResult<PortfolioShowcase[]>> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('portfolio_showcase')
      .select('*')
      .eq('is_featured', true)
      .order('sort_order')

    if (error) return { success: false, error: error.message }
    return { success: true, data: data || [] }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

/**
 * Fetch Integrations & Certifications (FonePay, Khalti, IRD, ISO)
 */
export async function getPartnerIntegrations(): Promise<ActionResult<PartnerIntegration[]>> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('partner_integrations')
      .select('*')
      .eq('is_active', true)
      .order('sort_order')

    if (error) return { success: false, error: error.message }
    return { success: true, data: data || [] }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

/**
 * Fetch Career Job Postings
 */
export async function getJobPostings(): Promise<ActionResult<JobPosting[]>> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('job_postings')
      .select('*')
      .eq('is_open', true)
      .order('created_at', { ascending: false })

    if (error) return { success: false, error: error.message }
    return { success: true, data: data || [] }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

/**
 * Fetch Blog Posts
 */
export async function getBlogPosts(): Promise<ActionResult<BlogPost[]>> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('is_published', true)
      .order('published_at', { ascending: false })

    if (error) return { success: false, error: error.message }
    return { success: true, data: data || [] }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

// ============================================================
// SITE CONTENT & METADATA
// ============================================================

/**
 * Fetch home page section content, stats, and partner companies
 */
export async function getSiteContent(): Promise<ActionResult<{
  sections: any[]
  achievements: any[]
  companies: any[]
}>> {
  try {
    const supabase = await createClient()
    
    const [contentRes, achRes, compRes] = await Promise.all([
      supabase.from('site_content').select('*'),
      supabase.from('achievements').select('*').order('sort_order'),
      supabase.from('companies').select('*').eq('is_active', true).order('sort_order')
    ])

    if (contentRes.error || achRes.error || compRes.error) {
      return {
        success: false,
        error: contentRes.error?.message || achRes.error?.message || compRes.error?.message
      }
    }

    return {
      success: true,
      data: {
        sections: contentRes.data || [],
        achievements: achRes.data || [],
        companies: compRes.data || []
      }
    }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

// ============================================================
// PRODUCT FAQs (PUBLIC READ)
// ============================================================

/**
 * Fetch FAQs for a specific product
 */
export async function getProductFaqs(productId: string): Promise<ActionResult<ProductFaq[]>> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('product_faqs')
      .select('*')
      .eq('product_id', productId)
      .eq('is_active', true)
      .order('sort_order')

    if (error) return { success: false, error: error.message }
    return { success: true, data: data || [] }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

// ============================================================
// COMPANY STATS (PUBLIC READ)
// ============================================================

/**
 * Fetch company statistics / milestones
 */
export async function getCompanyStats(): Promise<ActionResult<CompanyStat[]>> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('company_stats')
      .select('*')
      .eq('is_active', true)
      .order('sort_order')

    if (error) return { success: false, error: error.message }
    return { success: true, data: data || [] }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

// ============================================================
// PRODUCT FEATURES (PUBLIC READ)
// ============================================================

/**
 * Fetch product features. Pass productId for product-specific,
 * or omit for company-level general features.
 */
export async function getProductFeatures(productId?: string): Promise<ActionResult<ProductFeature[]>> {
  try {
    const supabase = await createClient()
    let query = supabase
      .from('product_features')
      .select('*')
      .eq('is_active', true)
      .order('sort_order')

    if (productId) {
      query = query.eq('product_id', productId)
    }

    const { data, error } = await query

    if (error) return { success: false, error: error.message }
    return { success: true, data: data || [] }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}
