'use server'

import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { products as staticProducts } from '@/data/products'
import { productDetails as staticProductDetails } from '@/data/products/productDetails'
import { testimonials as staticTestimonials } from '@/data/testimonials'
import { serviceDetails as staticServices } from '@/data/services/serviceDetails'
import { jobs as staticJobs } from '@/data/jobs'
import { blogs as staticBlogs } from '@/data/blogs'
import { stats as staticStats } from '@/data/stats'
import { faqs as staticFaqs } from '@/data/faqs'
import { companies as staticCompanies } from '@/data/companies'
import type {
  ActionResult,
  DemoRequestInput,
  ContactSubmissionInput,
  JobApplicationInput,
  PortfolioShowcase,
  PartnerIntegration,
  ProductFeature
} from '@/types/index'

import type { Testimonial } from '@/types/testimonial'
import type { ProductDetails } from '@/types/productDetails'

// ============================================================
// PRODUCTS & VARIATIONS
// ============================================================

/**
 * Fetch all active products with stats, prices, and features
 */
export async function getProducts(): Promise<ActionResult<any[]>> {
  try {
    const supabase = createAdminClient()
    const { data, error } = await (supabase as any)
      .from('products')
      .select(`
        *,
        product_stats (*),
        product_features (*),
        product_prices (
          *,
          product_variations (*)
        )
      `)
      .eq('is_active', true)
      .order('sort_order')

    if (error) {
      console.warn('[getProducts] DB Error or Restricted Access:', error.message)
      return { success: true, data: staticProducts as any[] }
    }

    if (!data || data.length === 0) {
      return { success: true, data: staticProducts as any[] }
    }

    const mapped = data.map((p: any) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      category: p.category || "Solutions",
      description: p.description || "",
      image: p.image || p.icon || "/showcase/hospitality.webp",
      badge: p.badge || "Enterprise",
      color: p.color || "#4458A1",
      sortOrder: p.sort_order || 1,
      stats: (p.product_stats || []).map((s: any) => ({
        id: s.id,
        value: s.value,
        label: s.label,
        description: s.description,
      })),
      features: (p.product_features || []).map((f: any) => ({
        id: f.id,
        title: f.title,
        description: f.description,
        icon: f.icon || "Zap",
      })),
      pricing: (p.product_prices || []).map((pr: any) => ({
        id: pr.id,
        name: pr.plan_name,
        description: pr.description || "Plan details",
        price: Number(pr.price) || 0,
        discountedPrice: pr.discounted_price ? Number(pr.discounted_price) : undefined,
        currency: pr.currency || "NPR",
        billingPeriod: pr.billing_cycle || "month",
        features: Array.isArray(pr.features) && pr.features.length > 0
          ? pr.features
          : (pr.product_variations || []).map((v: any) => v.feature),
        isPopular: pr.is_highlighted || false,
        sortOrder: pr.sort_order,
      }))
    }))

    return { success: true, data: mapped }
  } catch (err: any) {
    return { success: true, data: staticProducts as any[] }
  }
}

/**
 * Fetch a single product by slug with its stats, prices, and features
 */
export async function getProductBySlug(slug: string): Promise<ActionResult<ProductDetails | null>> {
  try {
    const supabase = createAdminClient()
    const { data, error } = await (supabase as any)
      .from('products')
      .select(`
        *,
        product_stats (*),
        product_features (*),
        product_prices (
          *,
          product_variations (*)
        )
      `)
      .eq('slug', slug)
      .eq('is_active', true)
      .single()

    if (error || !data) {
      const fallback = staticProductDetails.find((p) => p.slug === slug)
      return { success: true, data: fallback || null }
    }

    const pData = data as any
    const mapped: ProductDetails = {
      id: pData.id,
      name: pData.name,
      slug: pData.slug,
      category: pData.category || "Solutions",
      description: pData.description || "",
      image: pData.image || pData.icon || "/showcase/hospitality.webp",
      badge: pData.badge || "Enterprise",
      color: pData.color || "#4458A1",
      sortOrder: pData.sort_order || 1,
      stats: (pData.product_stats || []).map((s: any) => ({
        id: s.id,
        value: s.value,
        label: s.label,
        description: s.description,
      })),
      features: (pData.product_features || []).map((f: any) => ({
        id: f.id,
        title: f.title,
        description: f.description,
        icon: f.icon || "Zap",
      })),
      pricing: (pData.product_prices || []).map((pr: any) => ({
        id: pr.id,
        name: pr.plan_name,
        description: pr.description || "Plan details",
        price: Number(pr.price) || 0,
        discountedPrice: pr.discounted_price ? Number(pr.discounted_price) : undefined,
        currency: pr.currency || "NPR",
        billingPeriod: pr.billing_cycle || "month",
        features: Array.isArray(pr.features) && pr.features.length > 0
          ? pr.features
          : (pr.product_variations || []).map((v: any) => v.feature),
        isPopular: pr.is_highlighted || false,
        sortOrder: pr.sort_order,
      }))
    }

    return { success: true, data: mapped }
  } catch (err: any) {
    const fallback = staticProductDetails.find((p) => p.slug === slug)
    return { success: true, data: fallback || null }
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
    const supabase = createAdminClient()
    const { data, error } = await (supabase as any)
      .from('services')
      .select('*')
      .eq('is_active', true)
      .order('sort_order')

    if (error || !data || data.length === 0) {
      return { success: true, data: staticServices as any[] }
    }
    const mapped = data.map((s: any) => ({
      id: s.id,
      title: s.title,
      slug: s.slug || "",
      description: s.description || "",
      animationUrl: s.animation_url || "",
      color: s.color || "#4458A1",
      features: s.features || []
    }))
    return { success: true, data: mapped }
  } catch (err: any) {
    return { success: true, data: staticServices as any[] }
  }
}

// ============================================================
// TESTIMONIALS
// ============================================================

/**
 * Fetch all active testimonials
 */
export async function getTestimonials(): Promise<ActionResult<Testimonial[]>> {
  try {
    const supabase = createAdminClient()
    const { data, error } = await (supabase as any)
      .from('testimonials')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error || !data) {
      return { success: true, data: staticTestimonials }
    }

    const mapped: Testimonial[] = data.map((item: any) => ({
      id: item.id,
      clientName: item.client_name || item.clientName || "Client",
      companyName: item.company_name || item.companyName || "Company",
      role: item.role || "Customer",
      message: item.message || "",
      avatar: item.avatar_url || item.avatar || "/testimonials/client-1.jpg",
      productName: item.product_name || item.productName || "ApexFlow Solution",
      rating: Number(item.rating) || 5,
    }))

    return { success: true, data: mapped }
  } catch (err: any) {
    return { success: true, data: staticTestimonials }
  }
}

// ============================================================
// FORM SUBMISSIONS
// ============================================================

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

export async function submitContactForm(input: ContactSubmissionInput): Promise<ActionResult<null>> {
  try {
    const supabase = await createClient()
    const { error } = await (supabase as any)
      .from('contact_submissions')
      .insert([input])

    if (error) return { success: false, error: error.message }
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function submitJobApplication(input: JobApplicationInput): Promise<ActionResult<null>> {
  try {
    const supabase = await createClient()
    const { error } = await (supabase as any)
      .from('job_applications')
      .insert([input])

    if (error) return { success: false, error: error.message }
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

// ============================================================
// PORTFOLIO & INTEGRATIONS
// ============================================================

export async function getPortfolioShowcase(): Promise<ActionResult<PortfolioShowcase[]>> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('portfolio_showcase')
      .select('*')
      .eq('is_featured', true)
      .order('sort_order')

    if (error || !data || data.length === 0) {
      return { success: true, data: [] }
    }
    return { success: true, data }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function getPartnerIntegrations(): Promise<ActionResult<PartnerIntegration[]>> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('partner_integrations')
      .select('*')
      .eq('is_active', true)
      .order('sort_order')

    if (error || !data || data.length === 0) {
      return { success: true, data: [] }
    }
    return { success: true, data }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

// ============================================================
// CAREERS & BLOGS
// ============================================================

export async function getJobPostings(): Promise<ActionResult<any[]>> {
  try {
    const supabase = createAdminClient()
    const { data, error } = await (supabase as any)
      .from('job_postings')
      .select('*')
      .eq('is_open', true)
      .order('created_at', { ascending: false })

    if (error || !data) {
      return { success: true, data: staticJobs as any[] }
    }
    const mapped = data.map((j: any) => ({
      id: j.id,
      slug: j.slug || "",
      title: j.title,
      description: j.description || "",
      responsibilities: j.responsibilities || [],
      requirements: j.requirements || [],
      qualifications: j.qualifications || [],
      location: j.location || "Remote",
      applicationDeadline: j.application_deadline || "Open until filled",
      href: j.href || "/careers/apply"
    }))
    return { success: true, data: mapped }
  } catch (err: any) {
    return { success: true, data: staticJobs as any[] }
  }
}

export async function getBlogPosts(): Promise<ActionResult<any[]>> {
  try {
    const supabase = createAdminClient()
    const { data, error } = await (supabase as any)
      .from('blog_posts')
      .select('*')
      .eq('is_published', true)
      .order('published_at', { ascending: false })

    if (error || !data) {
      return { success: true, data: staticBlogs as any[] }
    }
    const mapped = data.map((b: any) => ({
      id: b.id,
      slug: b.slug,
      title: b.title,
      category: b.category || "Engineering",
      excerpt: b.excerpt || "",
      content: Array.isArray(b.content) ? b.content : [b.content || ""],
      image: b.cover_image || "/file.svg",
      author: b.author_name || "NCT SOFT Team",
      publishedAt: b.published_at ? new Date(b.published_at).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }) : "Recently"
    }))
    return { success: true, data: mapped }
  } catch (err: any) {
    return { success: true, data: staticBlogs as any[] }
  }
}

// ============================================================
// SITE CONTENT & STATS
// ============================================================

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

    const companiesData = (!compRes.error && compRes.data && compRes.data.length > 0)
      ? compRes.data.map((c: any) => ({ id: c.id, name: c.name, logo: c.logo || c.logo_url }))
      : staticCompanies

    return {
      success: true,
      data: {
        sections: contentRes.data || [],
        achievements: achRes.data || [],
        companies: companiesData
      }
    }
  } catch (err: any) {
    return {
      success: true,
      data: {
        sections: [],
        achievements: [],
        companies: staticCompanies
      }
    }
  }
}

export async function getProductFaqs(productId?: string): Promise<ActionResult<any[]>> {
  try {
    const supabase = await createClient()
    let query = supabase
      .from('product_faqs')
      .select('*')
      .eq('is_active', true)
      .order('sort_order')

    if (productId) {
      query = query.eq('product_id', productId)
    }

    const { data, error } = await query

    if (error || !data || data.length === 0) {
      return { success: true, data: staticFaqs as any[] }
    }
    const mapped = data.map((f: any) => ({
      id: f.id,
      productId: f.product_id || "1",
      question: f.question,
      answer: f.answer
    }))
    return { success: true, data: mapped }
  } catch (err: any) {
    return { success: true, data: staticFaqs as any[] }
  }
}

export async function getCompanyStats(): Promise<ActionResult<any[]>> {
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('company_stats')
      .select('*')
      .eq('is_active', true)
      .order('sort_order')

    if (error || !data || data.length === 0) {
      return { success: true, data: staticStats as any[] }
    }
    const mapped = data.map((s: any) => ({
      id: s.id,
      value: s.value,
      label: s.label,
      description: s.description || ""
    }))
    return { success: true, data: mapped }
  } catch (err: any) {
    return { success: true, data: staticStats as any[] }
  }
}

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
    return { success: true, data: (data || []).map((f: any) => ({
      id: f.id,
      title: f.title,
      description: f.description || "",
      icon: f.icon || "Zap"
    })) as any }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}
