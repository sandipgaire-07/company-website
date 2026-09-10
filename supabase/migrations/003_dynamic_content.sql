-- ============================================================
-- ApexFlow Technologies — Dynamic Website Additions Migration
-- Unique custom branding, products showcase, and seeds
-- Run AFTER 001_initial_schema.sql and 002_seed_data.sql
-- ============================================================

-- 1. DEMO REQUESTS & CONTACT INQUIRIES
CREATE TABLE IF NOT EXISTS demo_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company_name TEXT,
  product_name TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'closed')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PORTFOLIO & SAAS PRODUCTS SHOWCASE
CREATE TABLE IF NOT EXISTS portfolio_showcase (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  badge_text TEXT,
  accent_color TEXT DEFAULT '#4458a1',
  live_url TEXT,
  is_featured BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. CERTIFICATIONS & INTEGRATIONS
CREATE TABLE IF NOT EXISTS partner_integrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('payment_gateway', 'certification', 'ecosystem')),
  logo_url TEXT NOT NULL,
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. CAREERS & JOB OPENINGS
CREATE TABLE IF NOT EXISTS job_postings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  department TEXT NOT NULL,
  location TEXT DEFAULT 'Kathmandu / Remote',
  employment_type TEXT DEFAULT 'Full-time' CHECK (employment_type IN ('Full-time', 'Part-time', 'Contract', 'Internship')),
  description TEXT NOT NULL,
  requirements TEXT[],
  is_open BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. BLOG POSTS
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image TEXT,
  author_name TEXT DEFAULT 'ApexFlow Engineering Team',
  category TEXT DEFAULT 'Cloud Architecture',
  published_at TIMESTAMPTZ DEFAULT NOW(),
  is_published BOOLEAN DEFAULT TRUE
);

-- Enable RLS
ALTER TABLE demo_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_showcase ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_postings ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Clear existing data for re-run safety
TRUNCATE TABLE portfolio_showcase, partner_integrations, job_postings, blog_posts RESTART IDENTITY CASCADE;

-- Public Read Policies
CREATE POLICY "Public read portfolio_showcase" ON portfolio_showcase FOR SELECT USING (true);
CREATE POLICY "Public read partner_integrations" ON partner_integrations FOR SELECT USING (true);
CREATE POLICY "Public read job_postings" ON job_postings FOR SELECT USING (true);
CREATE POLICY "Public read blog_posts" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "Public insert demo_requests" ON demo_requests FOR INSERT WITH CHECK (true);

-- ============================================================
-- SEED DATA — ApexFlow Technologies Unique Showcase & Ecosystem
-- ============================================================

INSERT INTO partner_integrations (name, category, logo_url, description, sort_order) VALUES
('FonePay QR',        'payment_gateway', '/integrations/fonepay.png',  'Instant QR & Merchant Payment Gateway', 1),
('Khalti SDK',         'payment_gateway', '/integrations/khalti.png',   'Wallet Checkout API Integration', 2),
('eSewa Commerce',     'payment_gateway', '/integrations/esewa.png',    'Direct Bank Transfer & Wallet API', 3),
('Tax & IRD Verified', 'certification',  '/integrations/ird.webp',     'Compliant with Inland Revenue Billing Guidelines', 4),
('ISO Security 27001', 'certification',  '/integrations/iso.png',      'Certified Data Security & Quality Protocol', 5);

INSERT INTO portfolio_showcase (title, slug, category, description, image_url, badge_text, accent_color, sort_order) VALUES
('ApexFlow Hospitality', 'apexflow-hospitality', 'Hospitality', 'Real-time booking engine and multi-property management system.', '/showcase/hospitality.webp', 'Enterprise SaaS', '#4458a1', 1),
('ApexFlow RestroCloud', 'apexflow-restrocloud',  'Food & Beverage','Cloud KDS, kitchen dispatch, and QR table ordering suite.', '/showcase/restrocloud.webp',  'Flagship POS',     '#e7212b', 2),
('ApexFlow BioPulse',    'apexflow-biopulse',    'Workforce Tech', 'Biometric IoT sync, automated payroll, and leave management.', '/showcase/biopulse.webp',   'HR Automation',   '#10b981', 3),
('ApexFlow LedgerPro',   'apexflow-ledgerpro',   'FinTech',        'IRD-certified double-entry accounting and tax audit system.', '/showcase/ledgerpro.png',     'Audit Ready',      '#f59e0b', 4);

INSERT INTO job_postings (title, department, location, employment_type, description, requirements) VALUES
('Principal Cloud Architect', 'Engineering', 'Kathmandu / Hybrid', 'Full-time', 'Design high-availability cloud infrastructure for scalable SaaS products.', ARRAY['5+ years Node.js/Go', 'PostgreSQL performance tuning', 'Kubernetes & AWS/GCP']),
('Senior Frontend Engineer',  'Engineering', 'Remote',            'Full-time', 'Build lightning-fast Next.js interfaces with Tailwind & Framer Motion.', ARRAY['3+ years Next.js App Router', 'TypeScript expertise', 'Component Library Architecture']);

INSERT INTO blog_posts (title, slug, excerpt, content, category) VALUES
('Designing High-Concurrency SaaS Architecture for 2026', 'designing-high-concurrency-saas-2026', 'How we built serverless data pipelines handling over 1M daily API requests.', 'Detailed post content on cloud architecture and database indexing...', 'Engineering');
