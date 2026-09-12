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
      admin_user: {
        Row: {
          id: string
          email: string
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
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
          category: string
          description: string | null
          image: string | null
          icon: string | null
          badge: string | null
          color: string | null
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
          category?: string
          description?: string | null
          image?: string | null
          icon?: string | null
          badge?: string | null
          color?: string | null
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
          category?: string
          description?: string | null
          image?: string | null
          icon?: string | null
          badge?: string | null
          color?: string | null
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
          description: string | null
          billing_cycle: 'monthly' | 'yearly' | 'one_time'
          price: number
          discounted_price: number | null
          currency: string
          features: Json
          is_highlighted: boolean
          sort_order: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          product_id: string
          plan_name: string
          description?: string | null
          billing_cycle?: 'monthly' | 'yearly' | 'one_time'
          price: number
          discounted_price?: number | null
          currency?: string
          features?: Json
          is_highlighted?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          plan_name?: string
          description?: string | null
          billing_cycle?: 'monthly' | 'yearly' | 'one_time'
          price?: number
          discounted_price?: number | null
          currency?: string
          features?: Json
          is_highlighted?: boolean
          sort_order?: number
          created_at?: string
          updated_at?: string
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
      product_stats: {
        Row: {
          id: string
          product_id: string
          value: string
          label: string
          description: string
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          product_id: string
          value: string
          label: string
          description: string
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          value?: string
          label?: string
          description?: string
          sort_order?: number
          created_at?: string
        }
      }
      product_faqs: {
        Row: {
          id: string
          product_id: string | null
          question: string
          answer: string
          sort_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          product_id?: string | null
          question: string
          answer: string
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          product_id?: string | null
          question?: string
          answer?: string
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      product_features: {
        Row: {
          id: string
          product_id: string | null
          title: string
          description: string | null
          icon: string | null
          sort_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          product_id?: string | null
          title: string
          description?: string | null
          icon?: string | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          product_id?: string | null
          title?: string
          description?: string | null
          icon?: string | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      companies: {
        Row: {
          id: string
          name: string
          logo: string
          logo_url: string | null
          website_url: string | null
          is_active: boolean
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          logo: string
          logo_url?: string | null
          website_url?: string | null
          is_active?: boolean
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          logo?: string
          logo_url?: string | null
          website_url?: string | null
          is_active?: boolean
          sort_order?: number
          created_at?: string
        }
      }
      company_stats: {
        Row: {
          id: string
          value: string
          label: string
          description: string | null
          icon: string | null
          sort_order: number
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          value: string
          label: string
          description?: string | null
          icon?: string | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          value?: string
          label?: string
          description?: string | null
          icon?: string | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      services: {
        Row: {
          id: string
          title: string
          slug: string | null
          description: string | null
          icon: string | null
          animation_url: string | null
          color: string | null
          features: Json
          is_active: boolean
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          slug?: string | null
          description?: string | null
          icon?: string | null
          animation_url?: string | null
          color?: string | null
          features?: Json
          is_active?: boolean
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string | null
          description?: string | null
          icon?: string | null
          animation_url?: string | null
          color?: string | null
          features?: Json
          is_active?: boolean
          sort_order?: number
          created_at?: string
        }
      }
      team_members: {
        Row: {
          id: string
          name: string
          role: string
          bio: string | null
          avatar_url: string | null
          linkedin_url: string | null
          sort_order: number
          is_active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          role: string
          bio?: string | null
          avatar_url?: string | null
          linkedin_url?: string | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          role?: string
          bio?: string | null
          avatar_url?: string | null
          linkedin_url?: string | null
          sort_order?: number
          is_active?: boolean
          created_at?: string
        }
      }
      testimonials: {
        Row: {
          id: string
          client_name: string
          company_name: string | null
          role: string | null
          avatar_url: string | null
          message: string
          product_name: string | null
          rating: number
          is_active: boolean
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          client_name: string
          company_name?: string | null
          role?: string | null
          avatar_url?: string | null
          message: string
          product_name?: string | null
          rating?: number
          is_active?: boolean
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          client_name?: string
          company_name?: string | null
          role?: string | null
          avatar_url?: string | null
          message?: string
          product_name?: string | null
          rating?: number
          is_active?: boolean
          sort_order?: number
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
          slug: string | null
          department: string
          location: string
          employment_type: 'Full-time' | 'Part-time' | 'Contract' | 'Internship'
          description: string
          application_deadline: string | null
          href: string | null
          responsibilities: string[]
          requirements: string[]
          qualifications: string[]
          is_open: boolean
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          slug?: string | null
          department?: string
          location?: string
          employment_type?: 'Full-time' | 'Part-time' | 'Contract' | 'Internship'
          description: string
          application_deadline?: string | null
          href?: string | null
          responsibilities?: string[]
          requirements?: string[]
          qualifications?: string[]
          is_open?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string | null
          department?: string
          location?: string
          employment_type?: 'Full-time' | 'Part-time' | 'Contract' | 'Internship'
          description?: string
          application_deadline?: string | null
          href?: string | null
          responsibilities?: string[]
          requirements?: string[]
          qualifications?: string[]
          is_open?: boolean
          created_at?: string
        }
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          slug: string
          category: string
          excerpt: string | null
          content: Json
          cover_image: string | null
          author_name: string
          published_at: string
          is_published: boolean
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          category?: string
          excerpt?: string | null
          content: Json
          cover_image?: string | null
          author_name?: string
          published_at?: string
          is_published?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          category?: string
          excerpt?: string | null
          content?: Json
          cover_image?: string | null
          author_name?: string
          published_at?: string
          is_published?: boolean
          created_at?: string
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
          status: 'pending' | 'contacted' | 'closed'
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
          status?: 'pending' | 'contacted' | 'closed'
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
          status?: 'pending' | 'contacted' | 'closed'
          created_at?: string
        }
      }
      contact_submissions: {
        Row: {
          id: string
          name: string
          email: string
          phone: string | null
          company: string | null
          subject: string | null
          message: string
          status: 'new' | 'read' | 'archived'
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone?: string | null
          company?: string | null
          subject?: string | null
          message: string
          status?: 'new' | 'read' | 'archived'
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string | null
          company?: string | null
          subject?: string | null
          message?: string
          status?: 'new' | 'read' | 'archived'
          created_at?: string
        }
      }
      job_applications: {
        Row: {
          id: string
          job_id: string | null
          job_title: string
          full_name: string
          email: string
          phone: string
          resume_url: string
          cover_message: string | null
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          job_id?: string | null
          job_title: string
          full_name: string
          email: string
          phone: string
          resume_url: string
          cover_message?: string | null
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          job_id?: string | null
          job_title?: string
          full_name?: string
          email?: string
          phone?: string
          resume_url?: string
          cover_message?: string | null
          status?: string
          created_at?: string
        }
      }
    }
  }
}
