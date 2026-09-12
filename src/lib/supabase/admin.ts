import { createClient } from '@supabase/supabase-js'
import type { Database } from '@/types/database'

/**
 * Admin / service-role client — bypasses RLS.
 * Only use in server-only contexts (Server Actions, API routes, scripts).
 * NEVER expose the service role key to the browser.
 */
export function createAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !key) throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY in environment')
  return createClient<Database>(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}
