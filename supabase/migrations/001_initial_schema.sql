-- ============================================================
-- LeafClutch Technologies — Company Website
-- Initial Database Schema
-- ============================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================================
-- ENUMS
-- ============================================================

CREATE TYPE billing_cycle AS ENUM ('monthly', 'yearly', 'one_time');
CREATE TYPE submission_status AS ENUM ('new', 'read', 'replied');

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
-- SITE CONTENT
-- Generic key/value store for page section copy.
-- Each row represents one section (hero, about, etc.)
-- Use the 'extra' JSONB field for section-specific extra data.
-- ============================================================

CREATE TABLE IF NOT EXISTS site_content (
  id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  section     TEXT        NOT NULL UNIQUE,  -- 'hero' | 'about' | 'achievement_story' | ...
  title       TEXT,
  subtitle    TEXT,
  description TEXT,
  badge_text  TEXT,
  extra       JSONB,                        -- section-specific flexible fields
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- PRODUCTS
-- Core product catalogue. Each product can have multiple
-- pricing tiers (product_prices) and each tier has a
-- feature list (product_variations).
-- ============================================================

CREATE TABLE IF NOT EXISTS products (
  id           UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  name         TEXT        NOT NULL,
  slug         TEXT        NOT NULL UNIQUE,
  description  TEXT,
  icon         TEXT,                        -- Lucide icon name, e.g. 'ShoppingBag'
  category     TEXT,                        -- optional grouping, e.g. 'ERP', 'HR'
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
-- PRODUCT PRICES
-- Each product can have multiple pricing plans (Starter,
-- Professional, Enterprise) on different billing cycles.
-- ============================================================

CREATE TABLE IF NOT EXISTS product_prices (
  id              UUID          PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id      UUID          NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  plan_name       TEXT          NOT NULL,        -- 'Starter', 'Professional', 'Enterprise'
  billing_cycle   billing_cycle NOT NULL DEFAULT 'monthly',
  price           NUMERIC(12,2) NOT NULL,        -- amount in chosen currency
  currency        TEXT          NOT NULL DEFAULT 'NPR',
  is_highlighted  BOOLEAN       NOT NULL DEFAULT FALSE,  -- 'Most Popular' badge
  sort_order      INTEGER       NOT NULL DEFAULT 0,
  created_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  updated_at      TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
  UNIQUE (product_id, plan_name, billing_cycle)
);

CREATE TRIGGER product_prices_updated_at
  BEFORE UPDATE ON product_prices
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- ============================================================
-- PRODUCT VARIATIONS
-- Feature rows displayed inside each pricing tier card.
-- is_included = TRUE  → shown with a ✓ (included)
-- is_included = FALSE → shown with a ✗ (not included / greyed)
-- ============================================================

CREATE TABLE IF NOT EXISTS product_variations (
  id                   UUID    PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_price_id     UUID    NOT NULL REFERENCES product_prices(id) ON DELETE CASCADE,
  feature              TEXT    NOT NULL,   -- 'Up to 5 users', 'Inventory tracking', etc.
  is_included          BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order           INTEGER NOT NULL DEFAULT 0
);

-- ============================================================
-- COMPANIES (trusted partners / client logos)
-- ============================================================

CREATE TABLE IF NOT EXISTS companies (
  id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  name        TEXT        NOT NULL,
  logo_url    TEXT        NOT NULL,
  website_url TEXT,
  is_active   BOOLEAN     NOT NULL DEFAULT TRUE,
  sort_order  INTEGER     NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================================
-- ACHIEVEMENTS (stats cards — "1.5+ Years", "15+ Projects", …)
-- ============================================================

CREATE TABLE IF NOT EXISTS achievements (
  id          UUID    PRIMARY KEY DEFAULT uuid_generate_v4(),
  value       TEXT    NOT NULL,   -- '1.5+', '15+', '99%'
  title       TEXT    NOT NULL,   -- 'Years', 'Projects'
  description TEXT,               -- 'Influencing Landscapes'
  icon        TEXT,               -- Lucide icon name
  sort_order  INTEGER NOT NULL DEFAULT 0
);

-- ============================================================
-- SERVICES
-- ============================================================

CREATE TABLE IF NOT EXISTS services (
  id          UUID    PRIMARY KEY DEFAULT uuid_generate_v4(),
  title       TEXT    NOT NULL,
  description TEXT,
  icon        TEXT,
  is_active   BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order  INTEGER NOT NULL DEFAULT 0
);

-- ============================================================
-- TEAM MEMBERS
-- ============================================================

CREATE TABLE IF NOT EXISTS team_members (
  id           UUID    PRIMARY KEY DEFAULT uuid_generate_v4(),
  name         TEXT    NOT NULL,
  role         TEXT    NOT NULL,
  bio          TEXT,
  avatar_url   TEXT,
  linkedin_url TEXT,
  sort_order   INTEGER NOT NULL DEFAULT 0,
  is_active    BOOLEAN NOT NULL DEFAULT TRUE
);

-- ============================================================
-- TESTIMONIALS
-- ============================================================

CREATE TABLE IF NOT EXISTS testimonials (
  id              UUID    PRIMARY KEY DEFAULT uuid_generate_v4(),
  author_name     TEXT    NOT NULL,
  author_company  TEXT,
  author_role     TEXT,
  avatar_url      TEXT,
  content         TEXT    NOT NULL,
  rating          INTEGER NOT NULL DEFAULT 5 CHECK (rating BETWEEN 1 AND 5),
  is_active       BOOLEAN NOT NULL DEFAULT TRUE,
  sort_order      INTEGER NOT NULL DEFAULT 0
);

-- ============================================================
-- CONTACT SUBMISSIONS
-- ============================================================

CREATE TABLE IF NOT EXISTS contact_submissions (
  id         UUID              PRIMARY KEY DEFAULT uuid_generate_v4(),
  name       TEXT              NOT NULL,
  email      TEXT              NOT NULL,
  company    TEXT,
  message    TEXT              NOT NULL,
  status     submission_status NOT NULL DEFAULT 'new',
  created_at TIMESTAMPTZ       NOT NULL DEFAULT NOW()
);

-- ============================================================
-- INDEXES
-- ============================================================

CREATE INDEX IF NOT EXISTS idx_products_slug        ON products(slug);
CREATE INDEX IF NOT EXISTS idx_products_is_active   ON products(is_active);
CREATE INDEX IF NOT EXISTS idx_products_sort_order  ON products(sort_order);

CREATE INDEX IF NOT EXISTS idx_product_prices_product_id  ON product_prices(product_id);
CREATE INDEX IF NOT EXISTS idx_product_prices_sort_order  ON product_prices(sort_order);

CREATE INDEX IF NOT EXISTS idx_product_variations_price_id    ON product_variations(product_price_id);
CREATE INDEX IF NOT EXISTS idx_product_variations_sort_order  ON product_variations(sort_order);

CREATE INDEX IF NOT EXISTS idx_companies_is_active   ON companies(is_active);
CREATE INDEX IF NOT EXISTS idx_companies_sort_order  ON companies(sort_order);

CREATE INDEX IF NOT EXISTS idx_achievements_sort_order ON achievements(sort_order);
CREATE INDEX IF NOT EXISTS idx_services_is_active      ON services(is_active);
CREATE INDEX IF NOT EXISTS idx_team_members_is_active  ON team_members(is_active);
CREATE INDEX IF NOT EXISTS idx_testimonials_is_active  ON testimonials(is_active);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_status     ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);

-- ============================================================
-- ROW LEVEL SECURITY
-- All public content → everyone can read (no auth needed).
-- Writes → only service-role (admin) can modify.
-- contact_submissions → anyone can INSERT, only service-role reads.
-- ============================================================

ALTER TABLE site_content         ENABLE ROW LEVEL SECURITY;
ALTER TABLE products             ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_prices       ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_variations   ENABLE ROW LEVEL SECURITY;
ALTER TABLE companies            ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements         ENABLE ROW LEVEL SECURITY;
ALTER TABLE services             ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members         ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials         ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions  ENABLE ROW LEVEL SECURITY;

-- Public read — no auth required
CREATE POLICY "site_content_public_read"
  ON site_content FOR SELECT USING (TRUE);

CREATE POLICY "products_public_read"
  ON products FOR SELECT USING (is_active = TRUE);

CREATE POLICY "product_prices_public_read"
  ON product_prices FOR SELECT USING (TRUE);

CREATE POLICY "product_variations_public_read"
  ON product_variations FOR SELECT USING (TRUE);

CREATE POLICY "companies_public_read"
  ON companies FOR SELECT USING (is_active = TRUE);

CREATE POLICY "achievements_public_read"
  ON achievements FOR SELECT USING (TRUE);

CREATE POLICY "services_public_read"
  ON services FOR SELECT USING (is_active = TRUE);

CREATE POLICY "team_members_public_read"
  ON team_members FOR SELECT USING (is_active = TRUE);

CREATE POLICY "testimonials_public_read"
  ON testimonials FOR SELECT USING (is_active = TRUE);

-- Contact submissions: anyone can insert (public form), no one can read via anon key
CREATE POLICY "contact_submissions_public_insert"
  ON contact_submissions FOR INSERT WITH CHECK (TRUE);

-- NOTE: All write operations (INSERT/UPDATE/DELETE on content tables,
-- SELECT on contact_submissions) are handled via the service-role client
-- (admin.ts) which bypasses RLS entirely. No additional policies needed
-- for admin writes.
