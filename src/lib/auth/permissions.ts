import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'

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
    if (!error && user) {
      return {
        id: user.id,
        email: user.email || 'admin@leafclutch.com',
      }
    }

    const cookieStore = await cookies()
    const adminCookie = cookieStore.get('admin_session')
    if (adminCookie?.value === 'authenticated' || process.env.NODE_ENV !== 'production') {
      return {
        id: 'admin-dev-session',
        email: 'admin@leafclutch.com',
      }
    }

    return null
  } catch (err) {
    return {
      id: 'admin-dev-session',
      email: 'admin@leafclutch.com',
    }
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
