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

export async function adminCreateProduct(input: {
  name: string
  slug: string
  description?: string
  icon?: string
  category?: string
}): Promise<ActionResult<any>> {
  try {
    const auth = await requireAdmin()
    if (!auth.authorized) return { success: false, error: auth.error }

    const adminSupabase = createAdminClient()
    const { data, error } = await (adminSupabase as any)
      .from('products')
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

export async function adminUpdateProduct(id: string, input: Partial<{
  name: string
  slug: string
  description: string
  category: string
  is_active: boolean
}>): Promise<ActionResult<null>> {
  try {
    const auth = await requireAdmin()
    if (!auth.authorized) return { success: false, error: auth.error }

    const adminSupabase = createAdminClient()
    const { error } = await (adminSupabase as any)
      .from('products')
      .update(input)
      .eq('id', id)

    if (error) return { success: false, error: error.message }
    revalidatePath('/')
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}

export async function adminDeleteProduct(id: string): Promise<ActionResult<null>> {
  try {
    const auth = await requireAdmin()
    if (!auth.authorized) return { success: false, error: auth.error }

    const adminSupabase = createAdminClient()
    const { error } = await (adminSupabase as any)
      .from('products')
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
}): Promise<ActionResult<any>> {
  try {
    const auth = await requireAdmin()
    if (!auth.authorized) return { success: false, error: auth.error }

    const adminSupabase = createAdminClient()
    const { data, error } = await (adminSupabase as any)
      .from('blog_posts')
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

