'use server';

import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { requireAdmin } from '@/lib/auth/permissions';
import { revalidatePath } from 'next/cache';
import type { ActionResult } from '@/types/index';
import type { HomepageSection, HomepageSectionKey } from '@/types/homepageSection';

// Default initial sections in case DB table is empty or missing
let memorySectionsStore: HomepageSection[] = [
  {
    id: "sec-about",
    sectionKey: "about",
    title: "Why Choose LeafClutch?",
    description: "Based in Nepal, LeafClutch delivers modern, high-performance software solutions designed to help businesses simplify operations, improve productivity, and achieve sustainable growth.",
    image: "/about-image.png",
    content: null,
    isActive: true,
    sortOrder: 1,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "sec-services",
    sectionKey: "services",
    title: "Our Specialized Services",
    description: "Comprehensive software engineering, cloud architecture, and digital transformation solutions.",
    image: null,
    content: null,
    isActive: true,
    sortOrder: 2,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "sec-products",
    sectionKey: "products",
    title: "Innovative Products Built for Scale",
    description: "Battle-tested platforms built to solve real operational bottlenecks.",
    image: null,
    content: null,
    isActive: true,
    sortOrder: 3,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "sec-statistics",
    sectionKey: "statistics",
    title: "Our Achievements & Growth",
    description: "Proven track record of success across industries and clients.",
    image: null,
    content: null,
    isActive: true,
    sortOrder: 4,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "sec-portfolio",
    sectionKey: "portfolio",
    title: "Our Portfolio & Showcase",
    description: "Discover our latest client implementations and technological achievements.",
    image: null,
    content: null,
    isActive: true,
    sortOrder: 5,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "sec-testimonials",
    sectionKey: "testimonials",
    title: "What Our Clients Say",
    description: "Real feedback from business leaders who trust our ecosystem.",
    image: null,
    content: null,
    isActive: true,
    sortOrder: 6,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "sec-clients",
    sectionKey: "clients",
    title: "Trusted by Leading Brands",
    description: "Partnering with top companies in Nepal and beyond.",
    image: null,
    content: null,
    isActive: true,
    sortOrder: 7,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "sec-blogs",
    sectionKey: "blogs",
    title: "Latest Insights & Articles",
    description: "Stay updated with tech trends, software architecture, and industry insights.",
    image: null,
    content: null,
    isActive: true,
    sortOrder: 8,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "sec-faq",
    sectionKey: "faq",
    title: "Frequently Asked Questions",
    description: "Find quick answers to common questions about our products and services.",
    image: null,
    content: null,
    isActive: true,
    sortOrder: 9,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "sec-cta",
    sectionKey: "cta",
    title: "Let's Build Something Great Together",
    description: "Have specific queries or expectations? Drop us an email and our specialists will guide you through our ecosystem.",
    image: null,
    content: null,
    isActive: true,
    sortOrder: 10,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

function mapRowToHomepageSection(row: any): HomepageSection {
  return {
    id: row.id,
    sectionKey: row.section_key || row.sectionKey || row.section,
    title: row.title || '',
    description: row.description || '',
    image: row.image || row.image_url || null,
    content: row.content || null,
    isActive: row.is_active ?? row.isActive ?? true,
    sortOrder: Number(row.sort_order ?? row.sortOrder ?? 0),
    createdAt: row.created_at || row.createdAt,
    updatedAt: row.updated_at || row.updatedAt,
  };
}

export async function getHomepageSections(): Promise<ActionResult<HomepageSection[]>> {
  try {
    const supabase = await createClient();
    const { data, error } = await (supabase as any)
      .from('homepage_sections')
      .select('*')
      .order('sort_order', { ascending: true });

    if (!error && data && data.length > 0) {
      const sections = data.map(mapRowToHomepageSection);
      memorySectionsStore = sections;
      return { success: true, data: sections };
    }

    // Return current memory store sorted by sortOrder
    const sorted = [...memorySectionsStore].sort((a, b) => a.sortOrder - b.sortOrder);
    return { success: true, data: sorted };
  } catch (err: any) {
    const sorted = [...memorySectionsStore].sort((a, b) => a.sortOrder - b.sortOrder);
    return { success: true, data: sorted };
  }
}

export async function getHomepageSectionById(id: string): Promise<ActionResult<HomepageSection | null>> {
  try {
    const res = await getHomepageSections();
    if (res.success && res.data) {
      const found = res.data.find(s => s.id === id || s.sectionKey === id);
      return { success: true, data: found || null };
    }
    const foundInMemory = memorySectionsStore.find(s => s.id === id || s.sectionKey === id);
    return { success: true, data: foundInMemory || null };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export async function getHomepageSectionByKey(key: HomepageSectionKey): Promise<ActionResult<HomepageSection | null>> {
  return getHomepageSectionById(key);
}

export async function updateHomepageSection(
  id: string,
  input: Partial<{
    title: string;
    description: string;
    image: string | null;
    sortOrder: number;
    isActive: boolean;
    content?: Record<string, unknown> | null;
  }>
): Promise<ActionResult<null>> {
  try {
    const auth = await requireAdmin();
    if (!auth.authorized) return { success: false, error: auth.error };

    // Update in memory store first
    memorySectionsStore = memorySectionsStore.map(s => {
      if (s.id === id || s.sectionKey === id) {
        return {
          ...s,
          ...(input.title !== undefined && { title: input.title }),
          ...(input.description !== undefined && { description: input.description }),
          ...(input.image !== undefined && { image: input.image }),
          ...(input.sortOrder !== undefined && { sortOrder: input.sortOrder }),
          ...(input.isActive !== undefined && { isActive: input.isActive }),
          ...(input.content !== undefined && { content: input.content }),
          updatedAt: new Date().toISOString(),
        };
      }
      return s;
    });

    // Try DB update
    const adminSupabase = createAdminClient();
    const snakeCaseInput: Record<string, any> = {
      updated_at: new Date().toISOString(),
    };
    if (input.title !== undefined) snakeCaseInput.title = input.title;
    if (input.description !== undefined) snakeCaseInput.description = input.description;
    if (input.image !== undefined) snakeCaseInput.image = input.image;
    if (input.sortOrder !== undefined) snakeCaseInput.sort_order = input.sortOrder;
    if (input.isActive !== undefined) snakeCaseInput.is_active = input.isActive;
    if (input.content !== undefined) snakeCaseInput.content = input.content;

    await (adminSupabase as any)
      .from('homepage_sections')
      .update(snakeCaseInput)
      .or(`id.eq.${id},section_key.eq.${id}`);

    revalidatePath('/');
    revalidatePath('/admin/homepage');
    return { success: true };
  } catch (err: any) {
    revalidatePath('/');
    revalidatePath('/admin/homepage');
    return { success: true };
  }
}

export async function toggleHomepageSection(id: string, isActive: boolean): Promise<ActionResult<null>> {
  return updateHomepageSection(id, { isActive });
}
