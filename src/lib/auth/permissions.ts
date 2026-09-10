import { createClient } from '@/lib/supabase/server'

export interface AdminUser {
  id: string
  email: string
}

/**
 * Check if current user is logged in as Admin
 */
export async function getAdminUser(): Promise<AdminUser | null> {
  try {
    const supabase = await createClient()
    const { data: { user }, error } = await supabase.auth.getUser()
    if (error || !user) return null

    return {
      id: user.id,
      email: user.email || ''
    }
  } catch (err) {
    return null
  }
}

/**
 * Require single Admin authentication for admin operations
 */
export async function requireAdmin(): Promise<{ authorized: boolean; user?: AdminUser; error?: string }> {
  const user = await getAdminUser()
  if (!user) {
    return { authorized: false, error: 'Unauthorized: Admin authentication required' }
  }

  return { authorized: true, user }
}
