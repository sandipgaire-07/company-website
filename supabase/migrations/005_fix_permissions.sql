-- Complete RLS Policy Reset & Full Permissions Grant for Admin Operations

-- 1. Grant Schema & Table Access
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;

-- 2. Allow FULL Access RLS Policies for authenticated and service_role users
DROP POLICY IF EXISTS "products_all_access" ON products;
CREATE POLICY "products_all_access" ON products FOR ALL USING (TRUE) WITH CHECK (TRUE);

DROP POLICY IF EXISTS "product_prices_all_access" ON product_prices;
CREATE POLICY "product_prices_all_access" ON product_prices FOR ALL USING (TRUE) WITH CHECK (TRUE);

DROP POLICY IF EXISTS "product_stats_all_access" ON product_stats;
CREATE POLICY "product_stats_all_access" ON product_stats FOR ALL USING (TRUE) WITH CHECK (TRUE);

DROP POLICY IF EXISTS "product_features_all_access" ON product_features;
CREATE POLICY "product_features_all_access" ON product_features FOR ALL USING (TRUE) WITH CHECK (TRUE);

DROP POLICY IF EXISTS "product_faqs_all_access" ON product_faqs;
CREATE POLICY "product_faqs_all_access" ON product_faqs FOR ALL USING (TRUE) WITH CHECK (TRUE);

DROP POLICY IF EXISTS "services_all_access" ON services;
CREATE POLICY "services_all_access" ON services FOR ALL USING (TRUE) WITH CHECK (TRUE);

DROP POLICY IF EXISTS "testimonials_all_access" ON testimonials;
CREATE POLICY "testimonials_all_access" ON testimonials FOR ALL USING (TRUE) WITH CHECK (TRUE);

DROP POLICY IF EXISTS "companies_all_access" ON companies;
CREATE POLICY "companies_all_access" ON companies FOR ALL USING (TRUE) WITH CHECK (TRUE);

DROP POLICY IF EXISTS "site_settings_all_access" ON site_settings;
CREATE POLICY "site_settings_all_access" ON site_settings FOR ALL USING (TRUE) WITH CHECK (TRUE);

DROP POLICY IF EXISTS "site_content_all_access" ON site_content;
CREATE POLICY "site_content_all_access" ON site_content FOR ALL USING (TRUE) WITH CHECK (TRUE);
