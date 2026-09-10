-- ============================================================
-- GLOBAL SITE SETTINGS TABLE (Company Name, Logo, Contact, Social Links)
-- Admin can update company info dynamically
-- ============================================================

CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Public read access to site settings
CREATE POLICY "Public read site_settings" ON site_settings FOR SELECT USING (true);

-- Seed initial company settings
INSERT INTO site_settings (key, value) VALUES
(
  'company_info',
  '{
    "company_name": "NCT SOFT Pvt. Ltd.",
    "short_name": "NCT SOFT",
    "tagline": "Build Fast. Scale Smart. Run Better.",
    "established_year": "2010",
    "location": "Butwal Sub Metropolitan City, Rupandehi, Nepal",
    "phone": "+977-9800000000",
    "email": "info@nctsoft.com.np",
    "logo_url": "/nct_logo.webp",
    "dark_logo_url": "/nct_logo.webp",
    "favicon_url": "/favicon.ico",
    "social_links": {
      "facebook": "https://facebook.com/nctsoft",
      "linkedin": "https://linkedin.com/company/nctsoft",
      "instagram": "https://instagram.com/nctsoft"
    }
  }'::jsonb
)
ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value;
