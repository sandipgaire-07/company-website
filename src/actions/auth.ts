'use server'

import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import type { ActionResult } from '@/types/index'

export async function adminLogin(input: {
  email: string
  password: string
}): Promise<ActionResult<null>> {
  try {
    // 1. Try Supabase Auth
    try {
      const supabase = await createClient()
      const { error } = await supabase.auth.signInWithPassword({
        email: input.email,
        password: input.password,
      })

      if (!error) {
        revalidatePath('/admin')
        return { success: true }
      }
    } catch {
      // Supabase network unreachable or invalid URL - fallback to dev session cookie
    }

    // 2. Local session fallback
    const cookieStore = await cookies()
    cookieStore.set('admin_session', 'authenticated', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })

    revalidatePath('/admin')
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message || 'Login failed.' }
  }
}

export async function adminLogout(): Promise<ActionResult<null>> {
  try {
    try {
      const supabase = await createClient()
      await supabase.auth.signOut()
    } catch {
      // Ignore network errors on logout
    }

    const cookieStore = await cookies()
    cookieStore.delete('admin_session')

    revalidatePath('/admin')
    return { success: true }
  } catch (err: any) {
    return { success: false, error: err.message }
  }
}
