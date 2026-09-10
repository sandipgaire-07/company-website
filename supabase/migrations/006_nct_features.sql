-- ============================================================
-- 006_nct_features.sql
-- Product FAQs, Company Stats, Product Features
-- ============================================================

-- ============================================================
-- PRODUCT FAQs
-- Questions & answers tied to individual products
-- ============================================================

CREATE TABLE IF NOT EXISTS product_faqs (
  id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id  UUID        NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  question    TEXT        NOT NULL,
  answer      TEXT        NOT NULL,
  sort_order  INTEGER     NOT NULL DEFAULT 0,
  is_active   BOOLEAN     NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_product_faqs_updated_at
  BEFORE UPDATE ON product_faqs
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

ALTER TABLE product_faqs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read product_faqs" ON product_faqs FOR SELECT USING (true);

-- ============================================================
-- COMPANY STATS / MILESTONES
-- e.g. "100+ Cooperatives", "Since 2010", "15+ Years"
-- ============================================================

CREATE TABLE IF NOT EXISTS company_stats (
  id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  label       TEXT        NOT NULL,
  value       TEXT        NOT NULL,
  icon        TEXT,                       -- icon name or SVG identifier
  sort_order  INTEGER     NOT NULL DEFAULT 0,
  is_active   BOOLEAN     NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_company_stats_updated_at
  BEFORE UPDATE ON company_stats
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

ALTER TABLE company_stats ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read company_stats" ON company_stats FOR SELECT USING (true);

-- ============================================================
-- PRODUCT / GENERAL FEATURES
-- e.g. "Profit Driven", "Automated Workflows"
-- product_id is nullable: NULL = company-level feature
-- ============================================================

CREATE TABLE IF NOT EXISTS product_features (
  id          UUID        PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id  UUID        REFERENCES products(id) ON DELETE CASCADE,
  title       TEXT        NOT NULL,
  description TEXT,
  icon        TEXT,
  sort_order  INTEGER     NOT NULL DEFAULT 0,
  is_active   BOOLEAN     NOT NULL DEFAULT true,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER set_product_features_updated_at
  BEFORE UPDATE ON product_features
  FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

ALTER TABLE product_features ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read product_features" ON product_features FOR SELECT USING (true);
