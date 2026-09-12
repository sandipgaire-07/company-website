'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { createClient } from '@/lib/supabase/server'
import { requireAdmin } from '@/lib/auth/permissions'
import { revalidatePath } from 'next/cache'
import type { ActionResult, CompanySettings } from '@/types/index'

// ============================================================
// DYNAMIC COMPANY SETTINGS
// ============================================================

export async function getCompanySettings(): Promise<ActionResult<CompanySettings>> {
  try {
    const supabase = await createClient()
    const { data, error } = await (supabase as any)
      .from('site_settings')
      .select('value')
      .eq('key', 'company_info')
      .single()

    if (error) return { success: false, error: error.message }
    return { success: true, data: data.value as CompanySettings }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function updateCompanySettings(settings: Partial<CompanySettings>): Promise<ActionResult<null>> {
  try {
    const auth = await requireAdmin()
    if (!auth.authorized) return { success: false, error: auth.error }

    const adminSupabase = createAdminClient()
    
    const { data: current } = await (adminSupabase as any)
      .from('site_settings')
      .select('value')
      .eq('key', 'company_info')
      .single()

    const mergedSettings = {
      ...((current?.value as object) || {}),
      ...settings,
    }

    const { error } = await (adminSupabase as any)
      .from('site_settings')
      .upsert({
        key: 'company_info',
        value: mergedSettings,
        updated_at: new Date().toISOString(),
      }, { onConflict: 'key' })

    if (error) return { success: false, error: error.message }

    revalidatePath('/')
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

// ============================================================
// ADMIN PRODUCT MANAGEMENT
// ============================================================

// UUID v4 pattern detector
function isUUID(val: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(val)
}

export async function adminGetProductById(idOrSlug: string): Promise<ActionResult<any>> {
  try {
    const adminSupabase = createAdminClient()
    const query = (adminSupabase as any)
      .from('products')
      .select(`
        *,
        product_prices (
          *,
          product_variations (*)
        ),
        product_features (*),
        product_stats (*)
      `)

    const { data, error } = await (isUUID(idOrSlug)
      ? query.eq('id', idOrSlug)
      : query.eq('slug', idOrSlug)
    ).maybeSingle()

    if (error || !data) {
      return { success: false, error: error?.message || 'Product not found' }
    }
    return { success: true, data }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

function handleActionError(err: any): string {
  const message = err?.message || 'An unexpected error occurred'
  if (message.includes('fetch failed') || message.includes('ENOTFOUND') || message.includes('Failed to fetch')) {
    return 'Database connection failed: Unable to reach Supabase. Please verify NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local'
  }
  return message
}

function parseBillingCycle(val?: string): 'monthly' | 'yearly' | 'one_time' {
  if (!val) return 'monthly'
  const v = val.toLowerCase().trim()
  if (v.includes('year') || v === 'yearly') return 'yearly'
  if (v.includes('one') || v === 'one_time') return 'one_time'
  return 'monthly'
}

export async function adminCreateProduct(input: {
  name: string
  slug: string
  description?: string
  category?: string
  badge?: string
  color?: string
  image?: string
  icon?: string
  stats?: any[]
  features?: any[]
  pricing?: any[]
  [key: string]: any
}): Promise<ActionResult<any>> {
  try {
    const auth = await requireAdmin()
    if (!auth.authorized) return { success: false, error: auth.error }

    const adminSupabase = createAdminClient()

    const generatedSlug = (input.slug || input.name || `product-${Date.now()}`)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')

    const { data, error } = await (adminSupabase as any)
      .from('products')
      .insert([{
        name: input.name,
        slug: generatedSlug,
        description: input.description || '',
        category: input.category || 'Solutions',
        badge: input.badge || 'Enterprise',
        color: input.color || '#0EA5E9',
        image: input.image || input.icon || '/showcase/hospitality.webp',
        icon: input.icon || 'Building2',
        is_active: true,
      }])
      .select()
      .single()

    if (error) {
      console.error('[adminCreateProduct] Error:', error.message)
      return { success: false, error: error.message }
    }

    // Insert stats if present
    if (input.stats && input.stats.length > 0) {
      const statInserts = input.stats.map((s: any, idx: number) => ({
        product_id: data.id,
        value: String(s.value || ''),
        label: String(s.label || ''),
        description: String(s.description || ''),
        sort_order: idx + 1,
      }))
      await (adminSupabase as any).from('product_stats').insert(statInserts)
    }

    // Insert pricing if present
    if (input.pricing && input.pricing.length > 0) {
      const priceInserts = input.pricing.map((p: any, idx: number) => ({
        product_id: data.id,
        plan_name: String(p.name || 'Plan'),
        description: String(p.description || ''),
        billing_cycle: parseBillingCycle(p.billingPeriod),
        price: Number(p.price) || 0,
        discounted_price: (p.discountedPrice !== undefined && p.discountedPrice !== '' && !isNaN(Number(p.discountedPrice)))
          ? Number(p.discountedPrice)
          : null,
        currency: String(p.currency || 'NPR'),
        features: Array.isArray(p.features) ? p.features : [],
        is_highlighted: Boolean(p.isPopular),
        sort_order: idx + 1,
      }))
      await (adminSupabase as any).from('product_prices').insert(priceInserts)
    }

    // Insert features if present
    if (input.features && input.features.length > 0) {
      const featureInserts = input.features.map((f: any, idx: number) => ({
        product_id: data.id,
        title: String(f.title || ''),
        description: String(f.description || ''),
        icon: String(f.icon || 'Zap'),
        sort_order: idx + 1,
      }))
      await (adminSupabase as any).from('product_features').insert(featureInserts)
    }

    revalidatePath('/')
    return { success: true, data }
  } catch (err: any) {
    return { success: false, error: handleActionError(err) }
  }
}

export async function adminUpdateProduct(id: string, input: Partial<{
  name: string
  slug: string
  description: string
  category: string
  badge: string
  color: string
  image: string
  icon: string
  is_active: boolean
  stats: any[]
  features: any[]
  pricing: any[]
  [key: string]: any
}>): Promise<ActionResult<null>> {
  try {
    const auth = await requireAdmin()
    if (!auth.authorized) return { success: false, error: auth.error }

    const adminSupabase = createAdminClient()

    let target: any = null
    if (isUUID(id)) {
      const { data } = await (adminSupabase as any).from('products').select('id').eq('id', id).maybeSingle()
      target = data
    }
    if (!target && input.slug) {
      const { data } = await (adminSupabase as any).from('products').select('id').eq('slug', input.slug).maybeSingle()
      target = data
    }
    if (!target) {
      const { data } = await (adminSupabase as any).from('products').select('id').eq('slug', id).maybeSingle()
      target = data
    }

    if (!target?.id) {
      return { success: false, error: `Product with identifier "${id}" does not exist in database.` }
    }

    const productId = target.id

    // 2. Update main product table
    const updateData: Record<string, any> = {}
    if (input.name !== undefined) updateData.name = input.name
    if (input.slug !== undefined) updateData.slug = input.slug
    if (input.description !== undefined) updateData.description = input.description
    if (input.category !== undefined) updateData.category = input.category
    if (input.badge !== undefined) updateData.badge = input.badge
    if (input.color !== undefined) updateData.color = input.color
    if (input.image !== undefined) updateData.image = input.image
    if (input.icon !== undefined) updateData.icon = input.icon
    if (input.is_active !== undefined) updateData.is_active = input.is_active

    if (Object.keys(updateData).length > 0) {
      const { error } = await (adminSupabase as any)
        .from('products')
        .update(updateData)
        .eq('id', productId)

      if (error) return { success: false, error: error.message }
    }

    // 3. Update stats (delete all, re-insert)
    if (input.stats !== undefined) {
      const { error: statDelErr } = await (adminSupabase as any)
        .from('product_stats').delete().eq('product_id', productId)
      if (statDelErr) console.error('[adminUpdateProduct] stat delete error:', statDelErr.message)

      if (input.stats.length > 0) {
        const statInserts = input.stats.map((s: any, idx: number) => ({
          product_id: productId,
          value: String(s.value || ''),
          label: String(s.label || ''),
          description: String(s.description || ''),
          sort_order: idx + 1,
        }))
        const { error: statInsErr } = await (adminSupabase as any).from('product_stats').insert(statInserts)
        if (statInsErr) console.error('[adminUpdateProduct] stat insert error:', statInsErr.message)
      }
    }

    // 4. Update features (delete all, re-insert)
    if (input.features !== undefined) {
      const { error: featDelErr } = await (adminSupabase as any)
        .from('product_features').delete().eq('product_id', productId)
      if (featDelErr) console.error('[adminUpdateProduct] feature delete error:', featDelErr.message)

      if (input.features.length > 0) {
        const featureInserts = input.features.map((f: any, idx: number) => ({
          product_id: productId,
          title: String(f.title || ''),
          description: String(f.description || ''),
          icon: String(f.icon || 'Zap'),
          sort_order: idx + 1,
        }))
        const { error: featInsErr } = await (adminSupabase as any).from('product_features').insert(featureInserts)
        if (featInsErr) console.error('[adminUpdateProduct] feature insert error:', featInsErr.message)
      }
    }

    // 5. Update pricing — delete old then upsert new
    //    Uses upsert with onConflict to respect the UNIQUE(product_id, plan_name, billing_cycle) constraint
    if (input.pricing !== undefined) {
      const { error: priceDelErr } = await (adminSupabase as any)
        .from('product_prices').delete().eq('product_id', productId)
      if (priceDelErr) console.error('[adminUpdateProduct] price delete error:', priceDelErr.message)

      if (input.pricing.length > 0) {
        const priceInserts = input.pricing.map((p: any, idx: number) => ({
          product_id: productId,
          plan_name: String(p.name || 'Plan'),
          description: String(p.description || ''),
          billing_cycle: parseBillingCycle(p.billingPeriod),
          price: Number(p.price) || 0,
          discounted_price:
            p.discountedPrice !== undefined &&
            p.discountedPrice !== '' &&
            !isNaN(Number(p.discountedPrice))
              ? Number(p.discountedPrice)
              : null,
          currency: String(p.currency || 'NPR'),
          features: Array.isArray(p.features) ? p.features : [],
          is_highlighted: Boolean(p.isPopular),
          sort_order: idx + 1,
        }))
        const { error: priceInsErr } = await (adminSupabase as any)
          .from('product_prices')
          .upsert(priceInserts, { onConflict: 'product_id,plan_name,billing_cycle' })
        if (priceInsErr) {
          console.error('[adminUpdateProduct] price upsert error:', priceInsErr.message)
          return { success: false, error: priceInsErr.message }
        }
      }
    }

    revalidatePath('/')
    revalidatePath('/admin/products')
    revalidatePath(`/admin/products/${id}/edit`)
    if (input.slug) {
      revalidatePath(`/admin/products/${input.slug}/edit`)
    }
    return { success: true }
  } catch (err: any) {
    console.error('[adminUpdateProduct] error:', err.message)
    return { success: false, error: err.message }
  }
}


export async function adminDeleteProduct(id: string): Promise<ActionResult<null>> {
  try {
    const auth = await requireAdmin()
    if (!auth.authorized) return { success: false, error: auth.error }

    const adminSupabase = createAdminClient()

    // Resolve the real UUID first to avoid cross-type comparison
    const lookupQuery = (adminSupabase as any).from('products').select('id')
    const { data: target } = await (isUUID(id)
      ? lookupQuery.eq('id', id)
      : lookupQuery.eq('slug', id)
    ).single()

    const productId = target?.id || id

    const { error } = await (adminSupabase as any)
      .from('products')
      .delete()
      .eq('id', productId)

    if (error) return { success: false, error: error.message }
    revalidatePath('/')
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

// ============================================================
// ADMIN SERVICES MANAGEMENT
// ============================================================

export async function adminGetServiceById(idOrSlug: string): Promise<ActionResult<any>> {
  try {
    const adminSupabase = createAdminClient()
    let query = (adminSupabase as any).from('services').select('*')
    
    if (isUUID(idOrSlug)) {
      query = query.eq('id', idOrSlug)
    } else {
      query = query.eq('slug', idOrSlug)
    }

    const { data, error } = await query.maybeSingle()
    if (error || !data) return { success: false, error: error?.message || 'Service not found' }

    return {
      success: true,
      data: {
        id: data.id,
        title: data.title,
        slug: data.slug,
        description: data.description || '',
        animationUrl: data.animation_url || '',
        color: data.color || '#0EA5E9',
        features: Array.isArray(data.features) ? data.features : [],
      }
    }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function adminCreateService(input: {
  title: string
  slug: string
  description: string
  animationUrl?: string
  color?: string
  features?: any[]
}): Promise<ActionResult<any>> {
  try {
    const auth = await requireAdmin()
    if (!auth.authorized) return { success: false, error: auth.error }

    const adminSupabase = createAdminClient()
    const { data, error } = await (adminSupabase as any)
      .from('services')
      .insert([{
        title: input.title,
        slug: input.slug,
        description: input.description,
        animation_url: input.animationUrl || '',
        color: input.color || '#0EA5E9',
        features: input.features || [],
        is_active: true,
      }])
      .select()
      .single()

    if (error) return { success: false, error: error.message }
    revalidatePath('/')
    revalidatePath('/services')
    revalidatePath('/admin/services')
    return { success: true, data }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function adminUpdateService(id: string, input: Partial<{
  title: string
  slug: string
  description: string
  animationUrl: string
  color: string
  features: any[]
}>): Promise<ActionResult<null>> {
  try {
    const auth = await requireAdmin()
    if (!auth.authorized) return { success: false, error: auth.error }

    const adminSupabase = createAdminClient()
    const updateData: Record<string, any> = {}
    if (input.title !== undefined) updateData.title = input.title
    if (input.slug !== undefined) updateData.slug = input.slug
    if (input.description !== undefined) updateData.description = input.description
    if (input.animationUrl !== undefined) updateData.animation_url = input.animationUrl
    if (input.color !== undefined) updateData.color = input.color
    if (input.features !== undefined) updateData.features = input.features

    const { error } = await (adminSupabase as any)
      .from('services')
      .update(updateData)
      .eq('id', id)

    if (error) return { success: false, error: error.message }
    revalidatePath('/')
    revalidatePath('/services')
    revalidatePath('/admin/services')
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function adminDeleteService(idOrSlug: string): Promise<ActionResult<null>> {
  try {
    const auth = await requireAdmin()
    if (!auth.authorized) return { success: false, error: auth.error }

    const adminSupabase = createAdminClient()
    const query = (adminSupabase as any).from('services').delete()

    const { error } = await (isUUID(idOrSlug)
      ? query.eq('id', idOrSlug)
      : query.eq('slug', idOrSlug)
    )

    if (error) return { success: false, error: error.message }
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function adminGetJobBySlug(idOrSlug: string): Promise<ActionResult<any>> {
  try {
    const adminSupabase = createAdminClient()
    let query = (adminSupabase as any).from('job_postings').select('*')
    if (isUUID(idOrSlug)) {
      query = query.eq('id', idOrSlug)
    } else {
      query = query.eq('slug', idOrSlug)
    }
    const { data, error } = await query.maybeSingle()
    if (error || !data) return { success: false, error: error?.message || 'Job posting not found' }
    return {
      success: true,
      data: {
        id: data.id,
        title: data.title,
        slug: data.slug,
        description: data.description || '',
        responsibilities: data.responsibilities || [],
        requirements: data.requirements || [],
        qualifications: data.qualifications || [],
        location: data.location || 'Remote',
        applicationDeadline: data.application_deadline || 'Open until filled',
        href: data.href || `/career/${data.slug}`
      }
    }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function adminGetBlogPostBySlug(idOrSlug: string): Promise<ActionResult<any>> {
  try {
    const adminSupabase = createAdminClient()
    let query = (adminSupabase as any).from('blog_posts').select('*')
    if (isUUID(idOrSlug)) {
      query = query.eq('id', idOrSlug)
    } else {
      query = query.eq('slug', idOrSlug)
    }
    const { data, error } = await query.maybeSingle()
    if (error || !data) return { success: false, error: error?.message || 'Blog post not found' }
    return {
      success: true,
      data: {
        id: data.id,
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt || '',
        content: Array.isArray(data.content) ? data.content : [data.content || ''],
        image: data.cover_image || '/file.svg',
        author: data.author_name || 'NCT SOFT Team',
        category: data.category || 'Engineering',
        publishedAt: data.published_at ? new Date(data.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Recently'
      }
    }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

// ─── Admin-only: fetch ALL job postings (no is_open filter) ─────────────────

export async function adminGetAllJobs(): Promise<ActionResult<any[]>> {
  try {
    const adminSupabase = createAdminClient()
    const { data, error } = await (adminSupabase as any)
      .from('job_postings')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) return { success: false, error: error.message }
    const mapped = (data || []).map((j: any) => ({
      id: j.id,
      slug: j.slug || '',
      title: j.title,
      description: j.description || '',
      location: j.location || 'Remote',
      applicationDeadline: j.application_deadline || 'Open until filled',
      isOpen: j.is_open ?? true,
      responsibilities: j.responsibilities || [],
      requirements: j.requirements || [],
      qualifications: j.qualifications || [],
      href: j.href || `/career/${j.slug}`,
    }))
    return { success: true, data: mapped }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

// ─── Admin-only: fetch ALL blog posts (no is_published filter) ──────────────

export async function adminGetAllBlogPosts(): Promise<ActionResult<any[]>> {
  try {
    const adminSupabase = createAdminClient()
    const { data, error } = await (adminSupabase as any)
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) return { success: false, error: error.message }
    const mapped = (data || []).map((b: any) => ({
      id: b.id,
      slug: b.slug,
      title: b.title,
      category: b.category || 'Engineering',
      excerpt: b.excerpt || '',
      image: b.cover_image || '/file.svg',
      author: b.author_name || 'NCT SOFT Team',
      isPublished: b.is_published ?? false,
      publishedAt: b.published_at
        ? new Date(b.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
        : 'Draft',
    }))
    return { success: true, data: mapped }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

// ============================================================
// ADMIN CAREERS / JOB POSTINGS
// ============================================================

export async function adminCreateJob(input: {
  title: string
  slug: string
  description: string
  location?: string
  applicationDeadline?: string
  href?: string
  responsibilities?: string[]
  requirements?: string[]
  qualifications?: string[]
}): Promise<ActionResult<any>> {
  try {
    const auth = await requireAdmin()
    if (!auth.authorized) return { success: false, error: auth.error }

    const adminSupabase = createAdminClient()
    const { data, error } = await (adminSupabase as any)
      .from('job_postings')
      .insert([{
        title: input.title,
        slug: input.slug,
        description: input.description,
        location: input.location || 'Remote',
        application_deadline: input.applicationDeadline || 'Open until filled',
        href: input.href || `/career/${input.slug}`,
        responsibilities: input.responsibilities || [],
        requirements: input.requirements || [],
        qualifications: input.qualifications || [],
        is_open: true,
      }])
      .select()
      .single()

    if (error) return { success: false, error: error.message }
    revalidatePath('/')
    revalidatePath('/career')
    revalidatePath('/admin/careers')
    return { success: true, data }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function adminUpdateJob(id: string, input: Partial<{
  title: string
  slug: string
  description: string
  location: string
  applicationDeadline: string
  href: string
  responsibilities: string[]
  requirements: string[]
  qualifications: string[]
}>): Promise<ActionResult<null>> {
  try {
    const auth = await requireAdmin()
    if (!auth.authorized) return { success: false, error: auth.error }

    const adminSupabase = createAdminClient()
    const updateData: Record<string, any> = {}
    if (input.title !== undefined) updateData.title = input.title
    if (input.slug !== undefined) updateData.slug = input.slug
    if (input.description !== undefined) updateData.description = input.description
    if (input.location !== undefined) updateData.location = input.location
    if (input.applicationDeadline !== undefined) updateData.application_deadline = input.applicationDeadline
    if (input.href !== undefined) updateData.href = input.href
    if (input.responsibilities !== undefined) updateData.responsibilities = input.responsibilities
    if (input.requirements !== undefined) updateData.requirements = input.requirements
    if (input.qualifications !== undefined) updateData.qualifications = input.qualifications

    const { error } = await (adminSupabase as any)
      .from('job_postings')
      .update(updateData)
      .eq('id', id)

    if (error) return { success: false, error: error.message }
    revalidatePath('/')
    revalidatePath('/career')
    revalidatePath('/admin/careers')
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function adminDeleteJob(idOrSlug: string): Promise<ActionResult<null>> {
  try {
    const auth = await requireAdmin()
    if (!auth.authorized) return { success: false, error: auth.error }

    const adminSupabase = createAdminClient()
    const query = (adminSupabase as any).from('job_postings').delete()

    const { error } = await (isUUID(idOrSlug)
      ? query.eq('id', idOrSlug)
      : query.eq('slug', idOrSlug)
    )

    if (error) return { success: false, error: error.message }
    revalidatePath('/')
    revalidatePath('/career')
    revalidatePath('/admin/careers')
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

// ============================================================
// ADMIN PORTFOLIO SHOWCASE & INTEGRATIONS
// ============================================================

export async function adminCreateShowcase(input: {
  title: string
  slug: string
  category: string
  description?: string
  image_url: string
  badge_text?: string
  accent_color?: string
}): Promise<ActionResult<any>> {
  try {
    const auth = await requireAdmin()
    if (!auth.authorized) return { success: false, error: auth.error }

    const adminSupabase = createAdminClient()
    const { data, error } = await (adminSupabase as any)
      .from('portfolio_showcase')
      .insert([input])
      .select()
      .single()

    if (error) return { success: false, error: error.message }
    revalidatePath('/')
    return { success: true, data }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function adminDeleteShowcase(id: string): Promise<ActionResult<null>> {
  try {
    const auth = await requireAdmin()
    if (!auth.authorized) return { success: false, error: auth.error }

    const adminSupabase = createAdminClient()
    const { error } = await (adminSupabase as any)
      .from('portfolio_showcase')
      .delete()
      .eq('id', id)

    if (error) return { success: false, error: error.message }
    revalidatePath('/')
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function adminCreateIntegration(input: {
  name: string
  category: 'payment_gateway' | 'certification' | 'ecosystem'
  logo_url: string
  description?: string
}): Promise<ActionResult<any>> {
  try {
    const auth = await requireAdmin()
    if (!auth.authorized) return { success: false, error: auth.error }

    const adminSupabase = createAdminClient()
    const { data, error } = await (adminSupabase as any)
      .from('partner_integrations')
      .insert([input])
      .select()
      .single()

    if (error) return { success: false, error: error.message }
    revalidatePath('/')
    return { success: true, data }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function adminDeleteIntegration(id: string): Promise<ActionResult<null>> {
  try {
    const auth = await requireAdmin()
    if (!auth.authorized) return { success: false, error: auth.error }

    const adminSupabase = createAdminClient()
    const { error } = await (adminSupabase as any)
      .from('partner_integrations')
      .delete()
      .eq('id', id)

    if (error) return { success: false, error: error.message }
    revalidatePath('/')
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

// ============================================================
// ADMIN CAREERS & BLOGS
// ============================================================

export async function adminCreateJobPosting(input: {
  title: string
  department: string
  location?: string
  employment_type?: string
  description: string
  requirements?: string[]
}): Promise<ActionResult<any>> {
  try {
    const auth = await requireAdmin()
    if (!auth.authorized) return { success: false, error: auth.error }

    const adminSupabase = createAdminClient()
    const { data, error } = await (adminSupabase as any)
      .from('job_postings')
      .insert([input])
      .select()
      .single()

    if (error) return { success: false, error: error.message }
    revalidatePath('/')
    return { success: true, data }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function adminCreateBlogPost(input: {
  title: string
  slug: string
  excerpt?: string
  content: string
  cover_image?: string
  category?: string
  author_name?: string
  is_published?: boolean
}): Promise<ActionResult<any>> {
  try {
    const auth = await requireAdmin()
    if (!auth.authorized) return { success: false, error: auth.error }

    const adminSupabase = createAdminClient()
    const { data, error } = await (adminSupabase as any)
      .from('blog_posts')
      .insert([{
        ...input,
        is_published: input.is_published ?? true,
        published_at: new Date().toISOString(),
      }])
      .select()
      .single()

    if (error) return { success: false, error: error.message }
    revalidatePath('/')
    revalidatePath('/blog')
    revalidatePath('/admin/blog')
    return { success: true, data }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function adminUpdateBlogPost(id: string, input: Partial<{
  title: string
  slug: string
  excerpt: string
  content: string
  cover_image: string
  category: string
  author_name: string
  is_published: boolean
}>): Promise<ActionResult<null>> {
  try {
    const auth = await requireAdmin()
    if (!auth.authorized) return { success: false, error: auth.error }

    const adminSupabase = createAdminClient()
    const { error } = await (adminSupabase as any)
      .from('blog_posts')
      .update(input)
      .eq('id', id)

    if (error) return { success: false, error: error.message }
    revalidatePath('/')
    revalidatePath('/blog')
    revalidatePath('/admin/blog')
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function adminDeleteBlogPost(id: string): Promise<ActionResult<null>> {
  try {
    const auth = await requireAdmin()
    if (!auth.authorized) return { success: false, error: auth.error }

    const adminSupabase = createAdminClient()
    const { error } = await (adminSupabase as any)
      .from('blog_posts')
      .delete()
      .eq('id', id)

    if (error) return { success: false, error: error.message }
    revalidatePath('/')
    revalidatePath('/blog')
    revalidatePath('/admin/blog')
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}


// ============================================================
// ADMIN LEAD / DEMO REQUEST MANAGEMENT
// ============================================================

export async function adminGetDemoRequests(): Promise<ActionResult<any[]>> {
  try {
    const auth = await requireAdmin()
    if (!auth.authorized) return { success: false, error: auth.error }

    const adminSupabase = createAdminClient()
    const { data, error } = await (adminSupabase as any)
      .from('demo_requests')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) return { success: false, error: error.message }
    return { success: true, data: data || [] }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function adminUpdateDemoRequestStatus(id: string, status: 'pending' | 'contacted' | 'closed'): Promise<ActionResult<null>> {
  try {
    const auth = await requireAdmin()
    if (!auth.authorized) return { success: false, error: auth.error }

    const adminSupabase = createAdminClient()
    const { error } = await (adminSupabase as any)
      .from('demo_requests')
      .update({ status })
      .eq('id', id)

    if (error) return { success: false, error: error.message }
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

// ============================================================
// ADMIN CONTACT SUBMISSIONS MANAGEMENT
// ============================================================

export async function adminGetContactSubmissions(): Promise<ActionResult<any[]>> {
  try {
    const auth = await requireAdmin()
    if (!auth.authorized) return { success: false, error: auth.error }

    const adminSupabase = createAdminClient()
    const { data, error } = await (adminSupabase as any)
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) return { success: false, error: error.message }
    return { success: true, data: data || [] }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function adminUpdateContactStatus(id: string, status: 'new' | 'read' | 'archived'): Promise<ActionResult<null>> {
  try {
    const auth = await requireAdmin()
    if (!auth.authorized) return { success: false, error: auth.error }

    const adminSupabase = createAdminClient()
    const { error } = await (adminSupabase as any)
      .from('contact_submissions')
      .update({ status })
      .eq('id', id)

    if (error) return { success: false, error: error.message }
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

// ============================================================
// ADMIN JOB APPLICATIONS MANAGEMENT
// ============================================================

export async function adminGetJobApplications(): Promise<ActionResult<any[]>> {
  try {
    const auth = await requireAdmin()
    if (!auth.authorized) return { success: false, error: auth.error }

    const adminSupabase = createAdminClient()
    const { data, error } = await (adminSupabase as any)
      .from('job_applications')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) return { success: false, error: error.message }
    return { success: true, data: data || [] }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function adminUpdateJobApplicationStatus(id: string, status: 'pending' | 'reviewed' | 'rejected' | 'hired'): Promise<ActionResult<null>> {
  try {
    const auth = await requireAdmin()
    if (!auth.authorized) return { success: false, error: auth.error }

    const adminSupabase = createAdminClient()
    const { error } = await (adminSupabase as any)
      .from('job_applications')
      .update({ status })
      .eq('id', id)

    if (error) return { success: false, error: error.message }
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}


// ============================================================
// ADMIN PRODUCT FAQs
// ============================================================

export async function adminCreateProductFaq(input: {
  product_id: string
  question: string
  answer: string
  sort_order?: number
}): Promise<ActionResult<any>> {
  try {
    const auth = await requireAdmin()
    if (!auth.authorized) return { success: false, error: auth.error }

    const adminSupabase = createAdminClient()
    const { data, error } = await (adminSupabase as any)
      .from('product_faqs')
      .insert([input])
      .select()
      .single()

    if (error) return { success: false, error: error.message }
    revalidatePath('/')
    return { success: true, data }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function adminUpdateProductFaq(id: string, input: Partial<{
  question: string
  answer: string
  sort_order: number
  is_active: boolean
}>): Promise<ActionResult<null>> {
  try {
    const auth = await requireAdmin()
    if (!auth.authorized) return { success: false, error: auth.error }

    const adminSupabase = createAdminClient()
    const { error } = await (adminSupabase as any)
      .from('product_faqs')
      .update(input)
      .eq('id', id)

    if (error) return { success: false, error: error.message }
    revalidatePath('/')
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function adminDeleteProductFaq(id: string): Promise<ActionResult<null>> {
  try {
    const auth = await requireAdmin()
    if (!auth.authorized) return { success: false, error: auth.error }

    const adminSupabase = createAdminClient()
    const { error } = await (adminSupabase as any)
      .from('product_faqs')
      .delete()
      .eq('id', id)

    if (error) return { success: false, error: error.message }
    revalidatePath('/')
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

// ============================================================
// ADMIN COMPANY STATS
// ============================================================

export async function adminCreateCompanyStat(input: {
  label: string
  value: string
  icon?: string
  sort_order?: number
}): Promise<ActionResult<any>> {
  try {
    const auth = await requireAdmin()
    if (!auth.authorized) return { success: false, error: auth.error }

    const adminSupabase = createAdminClient()
    const { data, error } = await (adminSupabase as any)
      .from('company_stats')
      .insert([input])
      .select()
      .single()

    if (error) return { success: false, error: error.message }
    revalidatePath('/')
    return { success: true, data }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function adminUpdateCompanyStat(id: string, input: Partial<{
  label: string
  value: string
  icon: string
  sort_order: number
  is_active: boolean
}>): Promise<ActionResult<null>> {
  try {
    const auth = await requireAdmin()
    if (!auth.authorized) return { success: false, error: auth.error }

    const adminSupabase = createAdminClient()
    const { error } = await (adminSupabase as any)
      .from('company_stats')
      .update(input)
      .eq('id', id)

    if (error) return { success: false, error: error.message }
    revalidatePath('/')
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function adminDeleteCompanyStat(id: string): Promise<ActionResult<null>> {
  try {
    const auth = await requireAdmin()
    if (!auth.authorized) return { success: false, error: auth.error }

    const adminSupabase = createAdminClient()
    const { error } = await (adminSupabase as any)
      .from('company_stats')
      .delete()
      .eq('id', id)

    if (error) return { success: false, error: error.message }
    revalidatePath('/')
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

// ============================================================
// ADMIN PRODUCT FEATURES
// ============================================================

export async function adminCreateProductFeature(input: {
  title: string
  description?: string
  icon?: string
  product_id?: string
  sort_order?: number
}): Promise<ActionResult<any>> {
  try {
    const auth = await requireAdmin()
    if (!auth.authorized) return { success: false, error: auth.error }

    const adminSupabase = createAdminClient()
    const { data, error } = await (adminSupabase as any)
      .from('product_features')
      .insert([input])
      .select()
      .single()

    if (error) return { success: false, error: error.message }
    revalidatePath('/')
    return { success: true, data }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function adminUpdateProductFeature(id: string, input: Partial<{
  title: string
  description: string
  icon: string
  product_id: string | null
  sort_order: number
  is_active: boolean
}>): Promise<ActionResult<null>> {
  try {
    const auth = await requireAdmin()
    if (!auth.authorized) return { success: false, error: auth.error }

    const adminSupabase = createAdminClient()
    const { error } = await (adminSupabase as any)
      .from('product_features')
      .update(input)
      .eq('id', id)

    if (error) return { success: false, error: error.message }
    revalidatePath('/')
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function adminDeleteProductFeature(id: string): Promise<ActionResult<null>> {
  try {
    const auth = await requireAdmin()
    if (!auth.authorized) return { success: false, error: auth.error }

    const adminSupabase = createAdminClient()
    const { error } = await (adminSupabase as any)
      .from('product_features')
      .delete()
      .eq('id', id)

    if (error) return { success: false, error: error.message }
    revalidatePath('/')
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

// ============================================================
// ADMIN TESTIMONIALS
// ============================================================

export async function adminGetTestimonials(): Promise<ActionResult<any[]>> {
  try {
    const auth = await requireAdmin()
    if (!auth.authorized) return { success: false, error: auth.error }

    const adminSupabase = createAdminClient()
    const { data, error } = await (adminSupabase as any)
      .from('testimonials')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) return { success: false, error: error.message }
    const mapped = (data || []).map((item: any) => ({
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
    return { success: false, error: err.message }
  }
}


export async function adminCreateTestimonial(input: {
  clientName: string
  companyName: string
  role: string
  message: string
  avatar: string
  productName: string
  rating: number
}): Promise<ActionResult<any>> {
  try {
    const auth = await requireAdmin()
    if (!auth.authorized) return { success: false, error: auth.error }

    const adminSupabase = createAdminClient()
    const { data, error } = await (adminSupabase as any)
      .from('testimonials')
      .insert([{
        client_name: input.clientName,
        company_name: input.companyName,
        role: input.role,
        message: input.message,
        avatar_url: input.avatar,
        product_name: input.productName,
        rating: input.rating,
      }])
      .select()
      .single()

    if (error) return { success: false, error: error.message }
    revalidatePath('/')
    return { success: true, data }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function adminUpdateTestimonial(id: string, input: Partial<{
  clientName: string
  companyName: string
  role: string
  message: string
  avatar: string
  productName: string
  rating: number
}>): Promise<ActionResult<null>> {
  try {
    const auth = await requireAdmin()
    if (!auth.authorized) return { success: false, error: auth.error }

    const snakeCaseInput: Record<string, any> = {}
    if (input.clientName !== undefined) snakeCaseInput.client_name = input.clientName
    if (input.companyName !== undefined) snakeCaseInput.company_name = input.companyName
    if (input.role !== undefined) snakeCaseInput.role = input.role
    if (input.message !== undefined) snakeCaseInput.message = input.message
    if (input.avatar !== undefined) snakeCaseInput.avatar_url = input.avatar
    if (input.productName !== undefined) snakeCaseInput.product_name = input.productName
    if (input.rating !== undefined) snakeCaseInput.rating = input.rating

    const adminSupabase = createAdminClient()
    const { error } = await (adminSupabase as any)
      .from('testimonials')
      .update(snakeCaseInput)
      .eq('id', id)

    if (error) return { success: false, error: error.message }
    revalidatePath('/')
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function adminDeleteTestimonial(id: string): Promise<ActionResult<null>> {
  try {
    const auth = await requireAdmin()
    if (!auth.authorized) return { success: false, error: auth.error }

    const adminSupabase = createAdminClient()
    const { error } = await (adminSupabase as any)
      .from('testimonials')
      .delete()
      .eq('id', id)

    if (error) return { success: false, error: error.message }
    revalidatePath('/')
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}


