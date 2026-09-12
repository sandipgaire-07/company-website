'use server'

import { createAdminClient } from '@/lib/supabase/admin'
import { requireAdmin } from '@/lib/auth/permissions'
import type { ActionResult } from '@/types/index'

export async function uploadImageAction(formData: FormData): Promise<ActionResult<string>> {
  try {
    const auth = await requireAdmin()
    if (!auth.authorized) return { success: false, error: auth.error }

    const file = formData.get('file') as File | null
    if (!file) {
      return { success: false, error: 'No file provided' }
    }

    // Validate file type
    if (!file.type.startsWith('image/')) {
      return { success: false, error: 'File must be an image' }
    }

    const adminSupabase = createAdminClient()
    const bucketName = 'uploads'

    // Ensure bucket exists
    const { data: buckets } = await adminSupabase.storage.listBuckets()
    const bucketExists = buckets?.some((b) => b.name === bucketName)

    if (!bucketExists) {
      const { error: createBucketError } = await adminSupabase.storage.createBucket(bucketName, {
        public: true,
      })
      if (createBucketError) {
        console.error('Failed to create bucket:', createBucketError.message)
        // If bucket creation fails (e.g. storage disabled or missing perms), fallback to data URL base64
        const buffer = await file.arrayBuffer()
        const base64 = Buffer.from(buffer).toString('base64')
        const dataUrl = `data:${file.type};base64,${base64}`
        return { success: true, data: dataUrl }
      }
    }

    const fileExt = file.name.split('.').pop() || 'png'
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`
    const buffer = await file.arrayBuffer()

    const { error: uploadError } = await adminSupabase.storage
      .from(bucketName)
      .upload(fileName, buffer, {
        contentType: file.type,
        upsert: true,
      })

    if (uploadError) {
      console.error('Supabase storage upload error, falling back to data URL:', uploadError.message)
      const base64 = Buffer.from(buffer).toString('base64')
      const dataUrl = `data:${file.type};base64,${base64}`
      return { success: true, data: dataUrl }
    }

    const { data: publicUrlData } = adminSupabase.storage
      .from(bucketName)
      .getPublicUrl(fileName)

    return { success: true, data: publicUrlData.publicUrl }
  } catch (err: any) {
    console.error('uploadImageAction error:', err)
    return { success: false, error: err?.message || 'Failed to upload image' }
  }
}
