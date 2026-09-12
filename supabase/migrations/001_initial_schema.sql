-- ============================================================
-- NCT SOFT / ApexFlow Technologies — Database Reset & Initial Schema
-- Recreates all tables, enums, triggers, indexes, and RLS policies
-- Exact alignment with frontend TypeScript interfaces
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- ============================================================
-- DROP EXISTING TABLES & ENUMS (FULL CLEAN RESET)
-- ============================================================

DROP TABLE IF EXISTS job_applications CASCADE;
DROP TABLE IF EXISTS contact_submissions CASCADE;
DROP TABLE IF EXISTS demo_requests CASCADE;
DROP TABLE IF EXISTS blog_posts CASCADE;
DROP TABLE IF EXISTS job_postings CASCADE;
DROP TABLE IF EXISTS partner_integrations CASCADE;
DROP TABLE IF EXISTS portfolio_showcase CASCADE;
DROP TABLE IF EXISTS testimonials CASCADE;
DROP TABLE IF EXISTS team_members CASCADE;
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS achievements CASCADE;
DROP TABLE IF EXISTS company_stats CASCADE;
DROP TABLE IF EXISTS companies CASCADE;
DROP TABLE IF EXISTS product_features CASCADE;
DROP TABLE IF EXISTS product_stats CASCADE;
DROP TABLE IF EXISTS product_faqs CASCADE;
DROP TABLE IF EXISTS product_variations CASCADE;
DROP TABLE IF EXISTS product_prices CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS site_content CASCADE;
DROP TABLE IF EXISTS site_settings CASCADE;
DROP TABLE IF EXISTS admin_user CASCADE;

DROP TYPE IF EXISTS billing_cycle CASCADE;
DROP TYPE IF EXISTS submission_status CASCADE;
DROP TYPE IF EXISTS demo_status CASCADE;
DROP TYPE IF EXISTS employment_type CASCADE;
DROP TYPE IF EXISTS integration_category CASCADE;

-- ============================================================
-- ENUMS
-- ============================================================

CREATE TYPE billing_cycle AS ENUM ('monthly', 'yearly', 'one_time');
CREATE TYPE submission_status AS ENUM ('new', 'read', 'archived');
CREATE TYPE demo_status AS ENUM ('pending', 'contacted', 'closed');
CREATE TYPE employment_type AS ENUM ('Full-time', 'Part-time', 'Contract', 'Internship');
CREATE TYPE integration_category AS ENUM ('payment_gateway', 'certification', 'ecosystem');

-- ============================================================
-- UPDATED_AT TRIGGER FUNCTION
-- ============================================================

CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================================
-- ADMIN USERS TABLE & AUTOMATIC SYNC FROM AUTH.USERS
-- ============================================================

CREATE TABLE admin_user (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  email      TEXT        NOT NULL UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- SITE SETTINGS
-- Key/value store for company info, logos, social links
-- ============================================================

CREATE TABLE site_settings (
  id         UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  key        TEXT        NOT NULL UNIQUE,
  value      JSONB       NOT NULL,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER site_settings_updated_at
  BEFORE UPDATE ON site_settings
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- ============================================================
-- SITE CONTENT
-- Key/value store for page section dynamic copy
-- ============================================================

CREATE TABLE site_content (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  section     TEXT        NOT NULL UNIQUE,
  title       TEXT,
  subtitle    TEXT,
  description TEXT,
  badge_text  TEXT,
  extra       JSONB,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER site_content_updated_at
  BEFORE UPDATE ON site_content
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- ============================================================
-- PRODUCTS (Matches Product type: name, slug, category, description, image, badge, color, sortOrder)
-- ============================================================

CREATE TABLE products (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name         TEXT        NOT NULL,
  slug         TEXT        NOT NULL UNIQUE,
  category     TEXT        NOT NULL DEFAULT 'Solutions',
  description  TEXT,
  image        TEXT,
  icon         TEXT,
  badge        TEXT,
  color        TEXT        DEFAULT '#4458A1',
  is_active    BOOLEAN     NOT NULL DEFAULT TRUE,
  is_featured  BOOLEAN     NOT NULL DEFAULT FALSE,
  sort_order   INTEGER     NOT NULL DEFAULT 0,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- ============================================================
-- PRODUCT PRICES (Matches ProductPricingPlan: name, description, price, discountedPrice, currency, billingPeriod, features, isPopular)
-- ============================================================

CREATE TABLE product_prices (
  id               UUID          PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id       UUID          NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  plan_name        TEXT          NOT NULL,
  description      TEXT,
  billing_cycle    billing_cycle NOT NULL DEFAULT 'monthly',
  price            NUMERIC(12,2) NOT NULL,
  discounted_price NUMERIC(12,2),
  currency         TEXT          NOT NULL DEFAULT 'NPR',
  features         JSONB         NOT NULL DEFAULT '[]'::jsonb,
  is_highlighted   BOOLEAN       NOT NULL DEFAULT FALSE,
  sort_order       INTEGER       NOT NULL DEFAULT 0,
  created_at       TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at       TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  UNIQUE (product_id, plan_name, billing_cycle)
);

CREATE TRIGGER product_prices_updated_at
  BEFORE UPDATE ON product_prices
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- ============================================================
-- PRODUCT VARIATIONS (Feature inclusions)
-- ============================================================

CREATE TABLE product_variations (
  id               UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  product_price_id UUID        NOT NULL REFERENCES product_prices(id) ON DELETE CASCADE,
  feature          TEXT        NOT NULL,
  is_included      BOOLEAN     NOT NULL DEFAULT TRUE,
  sort_order       INTEGER     NOT NULL DEFAULT 0,
  created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- PRODUCT STATS (Matches ProductStat: id, value, label, description)
-- ============================================================

CREATE TABLE product_stats (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id  UUID        NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  value       TEXT        NOT NULL,
  label       TEXT        NOT NULL,
  description TEXT        NOT NULL,
  sort_order  INTEGER     NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- PRODUCT FAQs (Matches FAQ type: id, productId, question, answer)
-- ============================================================

CREATE TABLE product_faqs (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id  UUID        REFERENCES products(id) ON DELETE CASCADE,
  question    TEXT        NOT NULL,
  answer      TEXT        NOT NULL,
  sort_order  INTEGER     NOT NULL DEFAULT 0,
  is_active   BOOLEAN     NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER product_faqs_updated_at
  BEFORE UPDATE ON product_faqs
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- ============================================================
-- PRODUCT FEATURES (Matches ProductFeature type: id, title, description, icon)
-- ============================================================

CREATE TABLE product_features (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id  UUID        REFERENCES products(id) ON DELETE CASCADE,
  title       TEXT        NOT NULL,
  description TEXT,
  icon        TEXT,
  sort_order  INTEGER     NOT NULL DEFAULT 0,
  is_active   BOOLEAN     NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER product_features_updated_at
  BEFORE UPDATE ON product_features
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- ============================================================
-- COMPANIES (Matches Company type: id, name, logo, website_url)
-- ============================================================

CREATE TABLE companies (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT        NOT NULL,
  logo        TEXT        NOT NULL,
  logo_url    TEXT,
  website_url TEXT,
  is_active   BOOLEAN     NOT NULL DEFAULT TRUE,
  sort_order  INTEGER     NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- COMPANY STATS (Matches Stat type: id, value, label, description, icon)
-- ============================================================

CREATE TABLE company_stats (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  value       TEXT        NOT NULL,
  label       TEXT        NOT NULL,
  description TEXT,
  icon        TEXT,
  sort_order  INTEGER     NOT NULL DEFAULT 0,
  is_active   BOOLEAN     NOT NULL DEFAULT TRUE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER company_stats_updated_at
  BEFORE UPDATE ON company_stats
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- ============================================================
-- ACHIEVEMENTS
-- ============================================================

CREATE TABLE achievements (
  id          UUID    PRIMARY KEY DEFAULT gen_random_uuid(),
  value       TEXT    NOT NULL,
  title       TEXT    NOT NULL,
  description TEXT,
  icon        TEXT,
  sort_order  INTEGER NOT NULL DEFAULT 0
);

-- ============================================================
-- SERVICES (Matches Service & ServiceDetails types)
-- ============================================================

CREATE TABLE services (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  title         TEXT        NOT NULL,
  slug          TEXT        UNIQUE,
  description   TEXT,
  icon          TEXT,
  animation_url TEXT,
  color         TEXT,
  features      JSONB       DEFAULT '[]'::jsonb,
  is_active     BOOLEAN     NOT NULL DEFAULT TRUE,
  sort_order    INTEGER     NOT NULL DEFAULT 0,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TEAM MEMBERS
-- ============================================================

CREATE TABLE team_members (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name         TEXT        NOT NULL,
  role         TEXT        NOT NULL,
  bio          TEXT,
  avatar_url   TEXT,
  linkedin_url TEXT,
  sort_order   INTEGER     NOT NULL DEFAULT 0,
  is_active    BOOLEAN     NOT NULL DEFAULT TRUE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- TESTIMONIALS (Matches Testimonial type: clientName, companyName, role, message, avatar, productName, rating)
-- ============================================================

CREATE TABLE testimonials (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name  TEXT        NOT NULL,
  company_name TEXT,
  role         TEXT,
  avatar_url   TEXT,
  message      TEXT        NOT NULL,
  product_name TEXT,
  rating       INTEGER     NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  is_active    BOOLEAN     NOT NULL DEFAULT TRUE,
  sort_order   INTEGER     NOT NULL DEFAULT 0,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- PORTFOLIO SHOWCASE
-- ============================================================

CREATE TABLE portfolio_showcase (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  title        TEXT        NOT NULL,
  slug         TEXT        NOT NULL UNIQUE,
  category     TEXT        NOT NULL,
  description  TEXT,
  image_url    TEXT        NOT NULL,
  badge_text   TEXT,
  accent_color TEXT        NOT NULL DEFAULT '#072069',
  live_url     TEXT,
  is_featured  BOOLEAN     NOT NULL DEFAULT FALSE,
  sort_order   INTEGER     NOT NULL DEFAULT 0,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- PARTNER INTEGRATIONS
-- ============================================================

CREATE TABLE partner_integrations (
  id          UUID                 PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT                 NOT NULL,
  category    integration_category NOT NULL,
  logo_url    TEXT                 NOT NULL,
  description TEXT,
  is_active   BOOLEAN              NOT NULL DEFAULT TRUE,
  sort_order  INTEGER              NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ          NOT NULL DEFAULT NOW()
);

-- ============================================================
-- JOB POSTINGS (Matches Job type: slug, title, description, responsibilities, requirements, qualifications, location, applicationDeadline, href)
-- ============================================================

CREATE TABLE job_postings (
  id                   UUID            PRIMARY KEY DEFAULT gen_random_uuid(),
  title                TEXT            NOT NULL,
  slug                 TEXT            UNIQUE,
  department           TEXT            NOT NULL DEFAULT 'Engineering',
  location             TEXT            NOT NULL DEFAULT 'Remote',
  employment_type      employment_type NOT NULL DEFAULT 'Full-time',
  description          TEXT            NOT NULL,
  application_deadline TEXT,
  href                 TEXT,
  responsibilities     TEXT[]          NOT NULL DEFAULT '{}',
  requirements         TEXT[]          NOT NULL DEFAULT '{}',
  qualifications       TEXT[]          NOT NULL DEFAULT '{}',
  is_open              BOOLEAN         NOT NULL DEFAULT TRUE,
  created_at           TIMESTAMPTZ     NOT NULL DEFAULT NOW()
);

-- ============================================================
-- BLOG POSTS (Matches BlogPost type: slug, title, category, excerpt, content, image, author, publishedAt)
-- ============================================================

CREATE TABLE blog_posts (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  title        TEXT        NOT NULL,
  slug         TEXT        NOT NULL UNIQUE,
  category     TEXT        NOT NULL DEFAULT 'General',
  excerpt      TEXT,
  content      JSONB       NOT NULL DEFAULT '[]'::jsonb,
  cover_image  TEXT,
  author_name  TEXT        NOT NULL DEFAULT 'NCT SOFT Team',
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  is_published BOOLEAN     NOT NULL DEFAULT FALSE,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- DEMO REQUESTS
-- ============================================================

CREATE TABLE demo_requests (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name    TEXT        NOT NULL,
  email        TEXT        NOT NULL,
  phone        TEXT        NOT NULL,
  company_name TEXT,
  product_name TEXT,
  message      TEXT,
  status       demo_status NOT NULL DEFAULT 'pending',
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- CONTACT SUBMISSIONS
-- ============================================================

CREATE TABLE contact_submissions (
  id         UUID              PRIMARY KEY DEFAULT gen_random_uuid(),
  name       TEXT              NOT NULL,
  email      TEXT              NOT NULL,
  phone      TEXT,
  company    TEXT,
  subject    TEXT,
  message    TEXT              NOT NULL,
  status     submission_status NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ       NOT NULL DEFAULT NOW()
);

-- ============================================================
-- JOB APPLICATIONS
-- ============================================================

CREATE TABLE job_applications (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id        UUID        REFERENCES job_postings(id) ON DELETE SET NULL,
  job_title     TEXT        NOT NULL,
  full_name     TEXT        NOT NULL,
  email         TEXT        NOT NULL,
  phone         TEXT        NOT NULL,
  resume_url    TEXT        NOT NULL,
  cover_message TEXT,
  status        TEXT        NOT NULL DEFAULT 'pending',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- INDEXES FOR FAST QUERYING
-- ============================================================

CREATE INDEX idx_products_slug ON products(slug);
CREATE INDEX idx_products_is_active ON products(is_active);
CREATE INDEX idx_products_sort_order ON products(sort_order);

CREATE INDEX idx_product_prices_product_id ON product_prices(product_id);
CREATE INDEX idx_product_variations_price_id ON product_variations(product_price_id);
CREATE INDEX idx_product_stats_product_id ON product_stats(product_id);
CREATE INDEX idx_product_faqs_product_id ON product_faqs(product_id);
CREATE INDEX idx_product_features_product_id ON product_features(product_id);

CREATE INDEX idx_companies_is_active ON companies(is_active);
CREATE INDEX idx_company_stats_is_active ON company_stats(is_active);
CREATE INDEX idx_services_is_active ON services(is_active);
CREATE INDEX idx_testimonials_is_active ON testimonials(is_active);
CREATE INDEX idx_portfolio_showcase_is_featured ON portfolio_showcase(is_featured);
CREATE INDEX idx_partner_integrations_is_active ON partner_integrations(is_active);
CREATE INDEX idx_job_postings_is_open ON job_postings(is_open);
CREATE INDEX idx_blog_posts_is_published ON blog_posts(is_published);
CREATE INDEX idx_demo_requests_status ON demo_requests(status);
CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);

-- ============================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================

ALTER TABLE admin_user ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variations ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_features ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio_showcase ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner_integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_postings ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE demo_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;

-- Public Read Policies
CREATE POLICY "admin_user_public_read" ON admin_user FOR SELECT USING (TRUE);
CREATE POLICY "site_settings_public_read" ON site_settings FOR SELECT USING (TRUE);
CREATE POLICY "site_content_public_read" ON site_content FOR SELECT USING (TRUE);
CREATE POLICY "products_public_read" ON products FOR SELECT USING (TRUE);
CREATE POLICY "product_prices_public_read" ON product_prices FOR SELECT USING (TRUE);
CREATE POLICY "product_variations_public_read" ON product_variations FOR SELECT USING (TRUE);
CREATE POLICY "product_stats_public_read" ON product_stats FOR SELECT USING (TRUE);
CREATE POLICY "product_faqs_public_read" ON product_faqs FOR SELECT USING (TRUE);
CREATE POLICY "product_features_public_read" ON product_features FOR SELECT USING (TRUE);
CREATE POLICY "companies_public_read" ON companies FOR SELECT USING (TRUE);
CREATE POLICY "company_stats_public_read" ON company_stats FOR SELECT USING (TRUE);
CREATE POLICY "achievements_public_read" ON achievements FOR SELECT USING (TRUE);
CREATE POLICY "services_public_read" ON services FOR SELECT USING (TRUE);
CREATE POLICY "team_members_public_read" ON team_members FOR SELECT USING (TRUE);
CREATE POLICY "testimonials_public_read" ON testimonials FOR SELECT USING (TRUE);
CREATE POLICY "portfolio_showcase_public_read" ON portfolio_showcase FOR SELECT USING (TRUE);
CREATE POLICY "partner_integrations_public_read" ON partner_integrations FOR SELECT USING (TRUE);
CREATE POLICY "job_postings_public_read" ON job_postings FOR SELECT USING (TRUE);
CREATE POLICY "blog_posts_public_read" ON blog_posts FOR SELECT USING (TRUE);

-- Public Form Submissions
CREATE POLICY "demo_requests_public_insert" ON demo_requests FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "contact_submissions_public_insert" ON contact_submissions FOR INSERT WITH CHECK (TRUE);
CREATE POLICY "job_applications_public_insert" ON job_applications FOR INSERT WITH CHECK (TRUE);
