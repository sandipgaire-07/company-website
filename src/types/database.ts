export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          role: 'super_admin' | 'admin' | 'manager' | 'editor'
          permissions: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          role?: 'super_admin' | 'admin' | 'manager' | 'editor'
          permissions?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          role?: 'super_admin' | 'admin' | 'manager' | 'editor'
          permissions?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      site_settings: {
        Row: {
          id: string
          key: string
          value: Json
          updated_at: string
        }
        Insert: {
          id?: string
          key: string
          value: Json
          updated_at?: string
        }
        Update: {
          id?: string
          key?: string
          value?: Json
          updated_at?: string
        }
      }
      site_content: {
        Row: {
          id: string
          section: string
          title: string | null
          subtitle: string | null
          description: string | null
          badge_text: string | null
          extra: Json | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          section: string
          title?: string | null
          subtitle?: string | null
          description?: string | null
          badge_text?: string | null
          extra?: Json | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          section?: string
          title?: string | null
          subtitle?: string | null
          description?: string | null
          badge_text?: string | null
          extra?: Json | null
          created_at?: string
          updated_at?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          slug: string
          description: string | null
          icon: string | null
          category: string | null
          is_active: boolean
          is_featured: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string | null
          icon?: string | null
          category?: string | null
          is_active?: boolean
          is_featured?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string | null
          icon?: string | null
          category?: string | null
          is_active?: boolean
          is_featured?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
      }
      product_prices: {
        Row: {
          id: string
          product_id: string
          plan_name: string
          billing_cycle: 'monthly' | 'yearly'
          price: number
          currency: string
          is_highlighted: boolean
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          product_id: string
          plan_name: string
          billing_cycle: 'monthly' | 'yearly'
          price: number
          currency?: string
          is_highlighted?: boolean
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          plan_name?: string
          billing_cycle?: 'monthly' | 'yearly'
          price?: number
          currency?: string
          is_highlighted?: boolean
          sort_order?: number
          created_at?: string
        }
      }
      product_variations: {
        Row: {
          id: string
          product_price_id: string
          feature: string
          is_included: boolean
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          product_price_id: string
          feature: string
          is_included?: boolean
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          product_price_id?: string
          feature?: string
          is_included?: boolean
          sort_order?: number
          created_at?: string
        }
      }
      services: {
        Row: {
          id: string
          title: string
          description: string
          icon: string | null
          is_active: boolean
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          icon?: string | null
          is_active?: boolean
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          icon?: string | null
          is_active?: boolean
          sort_order?: number
          created_at?: string
        }
      }
      achievements: {
        Row: {
          id: string
          value: string
          title: string
          description: string | null
          icon: string | null
          sort_order: number
        }
        Insert: {
          id?: string
          value: string
          title: string
          description?: string | null
          icon?: string | null
          sort_order?: number
        }
        Update: {
          id?: string
          value?: string
          title?: string
          description?: string | null
          icon?: string | null
          sort_order?: number
        }
      }
      companies: {
        Row: {
          id: string
          name: string
          logo_url: string
          is_active: boolean
          sort_order: number
        }
        Insert: {
          id?: string
          name: string
          logo_url: string
          is_active?: boolean
          sort_order?: number
        }
        Update: {
          id?: string
          name?: string
          logo_url?: string
          is_active?: boolean
          sort_order?: number
        }
      }
      demo_requests: {
        Row: {
          id: string
          full_name: string
          email: string
          phone: string
          company_name: string | null
          product_name: string | null
          message: string | null
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          full_name: string
          email: string
          phone: string
          company_name?: string | null
          product_name?: string | null
          message?: string | null
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          email?: string
          phone?: string
          company_name?: string | null
          product_name?: string | null
          message?: string | null
          status?: string
          created_at?: string
        }
      }
      portfolio_showcase: {
        Row: {
          id: string
          title: string
          slug: string
          category: string
          description: string | null
          image_url: string
          badge_text: string | null
          accent_color: string
          live_url: string | null
          is_featured: boolean
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          category: string
          description?: string | null
          image_url: string
          badge_text?: string | null
          accent_color?: string
          live_url?: string | null
          is_featured?: boolean
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          category?: string
          description?: string | null
          image_url?: string
          badge_text?: string | null
          accent_color?: string
          live_url?: string | null
          is_featured?: boolean
          sort_order?: number
          created_at?: string
        }
      }
      partner_integrations: {
        Row: {
          id: string
          name: string
          category: 'payment_gateway' | 'certification' | 'ecosystem'
          logo_url: string
          description: string | null
          is_active: boolean
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          category: 'payment_gateway' | 'certification' | 'ecosystem'
          logo_url: string
          description?: string | null
          is_active?: boolean
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          category?: 'payment_gateway' | 'certification' | 'ecosystem'
          logo_url?: string
          description?: string | null
          is_active?: boolean
          sort_order?: number
          created_at?: string
        }
      }
      job_postings: {
        Row: {
          id: string
          title: string
          department: string
          location: string
          employment_type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship'
          description: string
          requirements: string[]
          is_open: boolean
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          department: string
          location?: string
          employment_type?: 'Full-time' | 'Part-time' | 'Contract' | 'Internship'
          description: string
          requirements?: string[]
          is_open?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          department?: string
          location?: string
          employment_type?: 'Full-time' | 'Part-time' | 'Contract' | 'Internship'
          description?: string
          requirements?: string[]
          is_open?: boolean
          created_at?: string
        }
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string | null
          content: string
          cover_image: string | null
          author_name: string
          category: string
          published_at: string
          is_published: boolean
        }
        Insert: {
          id?: string
          title: string
          slug: string
          excerpt?: string | null
          content: string
          cover_image?: string | null
          author_name?: string
          category?: string
          published_at?: string
          is_published?: boolean
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          excerpt?: string | null
          content?: string
          cover_image?: string | null
          author_name?: string
          category?: string
          published_at?: string
          is_published?: boolean
        }
      }
    }
  }
}
