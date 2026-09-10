-- ============================================================
-- NCT SOFT Pvt. Ltd. — Seed Data
-- Official products, services, site content, and company data
-- Run this AFTER 001_initial_schema.sql
-- ============================================================

-- Clear existing data (allows re-running safely)
TRUNCATE TABLE product_variations, product_prices, products, site_content, achievements, companies, services, team_members, testimonials RESTART IDENTITY CASCADE;

-- ============================================================
-- SITE CONTENT
-- ============================================================

INSERT INTO site_content (section, title, subtitle, description, badge_text, extra) VALUES
(
  'hero',
  'Build Fast. Scale Smart. Run Better.',
  'Empowering Businesses Since 2010',
  'We craft powerful SaaS platforms and high-performance applications—from Accounting Systems to Management Solutions—helping businesses thrive across Nepal and beyond.',
  'Empowering Businesses Since 2010',
  '{"lottie_url": "https://lottie.host/0618f081-ed78-4aba-aa5d-e3a254164a48/RoeZhdGVv1.lottie", "cta_primary_label": "Launch Your Demo", "cta_primary_href": "#contact", "cta_secondary_label": "Explore Products", "cta_secondary_href": "#products"}'
),
(
  'about',
  'Why Choose NCT SOFT?',
  'Pioneering Tech in Nepal',
  'Based in the Western Nepal business hub of Butwal, NCT SOFT Pvt. Ltd. has been delivering high-performance SaaS solutions since 2010, empowering over 100+ enterprises and cooperatives.',
  'Pioneering Tech in Nepal',
  '{"image_url": "/about-image.png"}'
),
(
  'achievement_story',
  'The Tale of Our Achievement Story',
  'Since 2010',
  'Our journey is a testament to teamwork and perseverance. Together, we have overcome challenges and celebrated victories, creating a narrative of constant progress.',
  'Since 2010',
  '{"image_url": "/achievement-image.png"}'
);

-- ============================================================
-- ACHIEVEMENTS
-- ============================================================

INSERT INTO achievements (value, title, description, icon, sort_order) VALUES
('14+',  'Years',    'Building Software in Nepal', 'Sparkles',      1),
('100+','Clients',  'Enterprises & Cooperatives', 'FolderKanban',  2),
('15+',  'Products', 'SaaS Solutions & Mobile Apps', 'Award',         3),
('99.9%','Uptime',  'Cloud System Reliability',   'CheckCircle',   4);

-- ============================================================
-- INTEGRATED ECOSYSTEM / CLIENT COMPANIES
-- ============================================================

INSERT INTO companies (name, logo_url, is_active, sort_order) VALUES
('Restro POS',      '/Restro.webp',                   TRUE, 1),
('Smart Karobar',   '/Smart.webp',                    TRUE, 2),
('Upastithi HR',    '/Upastithi.webp',               TRUE, 3),
('Menu App',        '/menu.webp',                     TRUE, 4),
('Atithya HMS',     '/atithya.webp',                  TRUE, 5),
('NCard Digital',   '/ncard.png',                     TRUE, 6),
('Smart Trading',   '/smarttradind/smart karobar.png',TRUE, 7);

-- ============================================================
-- OFFICIAL PRODUCTS
-- ============================================================

INSERT INTO products (name, slug, description, icon, category, is_active, is_featured, sort_order) VALUES
(
  'Atithya HMS',
  'atithya-hms',
  'Complete hotel management system with room reservation, front office desk, billing, and housekeeping management.',
  'Hotel',
  'Hospitality',
  TRUE,
  TRUE,
  1
),
(
  'Restro POS',
  'restro-pos',
  'Cloud-based restaurant management system with KDS (Kitchen Display System), table QR ordering, and billing.',
  'Utensils',
  'Restaurant',
  TRUE,
  TRUE,
  2
),
(
  'Upastithi HR',
  'upastithi-hr',
  'Biometric attendance tracking, leave request management, and automated payroll processing system.',
  'UserCheck',
  'HR Tech',
  TRUE,
  TRUE,
  3
),
(
  'Smart Karobar',
  'smart-karobar',
  'IRD-certified double-entry accounting software, inventory control, and VAT billing platform.',
  'Calculator',
  'Accounting',
  TRUE,
  TRUE,
  4
);

-- ============================================================
-- PRODUCT PRICES — Atithya HMS
-- ============================================================

INSERT INTO product_prices (product_id, plan_name, billing_cycle, price, currency, is_highlighted, sort_order)
SELECT id, 'Basic',        'monthly', 4999,  'NPR', FALSE, 1 FROM products WHERE slug = 'atithya-hms';
INSERT INTO product_prices (product_id, plan_name, billing_cycle, price, currency, is_highlighted, sort_order)
SELECT id, 'Standard',     'monthly', 8999,  'NPR', TRUE,  2 FROM products WHERE slug = 'atithya-hms';
INSERT INTO product_prices (product_id, plan_name, billing_cycle, price, currency, is_highlighted, sort_order)
SELECT id, 'Enterprise',   'monthly', 14999, 'NPR', FALSE, 3 FROM products WHERE slug = 'atithya-hms';

INSERT INTO product_prices (product_id, plan_name, billing_cycle, price, currency, is_highlighted, sort_order)
SELECT id, 'Basic',        'yearly', 49990,  'NPR', FALSE, 1 FROM products WHERE slug = 'atithya-hms';
INSERT INTO product_prices (product_id, plan_name, billing_cycle, price, currency, is_highlighted, sort_order)
SELECT id, 'Standard',     'yearly', 89990,  'NPR', TRUE,  2 FROM products WHERE slug = 'atithya-hms';
INSERT INTO product_prices (product_id, plan_name, billing_cycle, price, currency, is_highlighted, sort_order)
SELECT id, 'Enterprise',   'yearly', 149990, 'NPR', FALSE, 3 FROM products WHERE slug = 'atithya-hms';

-- ============================================================
-- PRODUCT PRICES — Restro POS
-- ============================================================

INSERT INTO product_prices (product_id, plan_name, billing_cycle, price, currency, is_highlighted, sort_order)
SELECT id, 'Starter',      'monthly', 2999,  'NPR', FALSE, 1 FROM products WHERE slug = 'restro-pos';
INSERT INTO product_prices (product_id, plan_name, billing_cycle, price, currency, is_highlighted, sort_order)
SELECT id, 'Pro',          'monthly', 5999,  'NPR', TRUE,  2 FROM products WHERE slug = 'restro-pos';

INSERT INTO product_prices (product_id, plan_name, billing_cycle, price, currency, is_highlighted, sort_order)
SELECT id, 'Starter',      'yearly', 29990,  'NPR', FALSE, 1 FROM products WHERE slug = 'restro-pos';
INSERT INTO product_prices (product_id, plan_name, billing_cycle, price, currency, is_highlighted, sort_order)
SELECT id, 'Pro',          'yearly', 59990,  'NPR', TRUE,  2 FROM products WHERE slug = 'restro-pos';

-- ============================================================
-- PRODUCT VARIATIONS (Features)
-- ============================================================

-- Atithya HMS — Basic
INSERT INTO product_variations (product_price_id, feature, is_included, sort_order)
SELECT pp.id, 'Up to 25 Rooms',           TRUE, 1 FROM product_prices pp JOIN products p ON p.id = pp.product_id WHERE p.slug = 'atithya-hms' AND pp.plan_name = 'Basic' AND pp.billing_cycle = 'monthly';
INSERT INTO product_variations (product_price_id, feature, is_included, sort_order)
SELECT pp.id, 'Front Office Reservation', TRUE, 2 FROM product_prices pp JOIN products p ON p.id = pp.product_id WHERE p.slug = 'atithya-hms' AND pp.plan_name = 'Basic' AND pp.billing_cycle = 'monthly';
INSERT INTO product_variations (product_price_id, feature, is_included, sort_order)
SELECT pp.id, 'Guest Billing & Receipt',  TRUE, 3 FROM product_prices pp JOIN products p ON p.id = pp.product_id WHERE p.slug = 'atithya-hms' AND pp.plan_name = 'Basic' AND pp.billing_cycle = 'monthly';
INSERT INTO product_variations (product_price_id, feature, is_included, sort_order)
SELECT pp.id, 'OTA Channel Manager',      FALSE,4 FROM product_prices pp JOIN products p ON p.id = pp.product_id WHERE p.slug = 'atithya-hms' AND pp.plan_name = 'Basic' AND pp.billing_cycle = 'monthly';

-- ============================================================
-- SERVICES
-- ============================================================

INSERT INTO services (title, description, icon, is_active, sort_order) VALUES
('Web & Mobile App Development', 'Custom website design, mobile apps (Android/iOS), and scalable web applications.', 'Code2',       TRUE, 1),
('SaaS Software Solutions',     'Turnkey business management systems for hotels, restaurants, retail, and HR.',      'LayoutDashboard', TRUE, 2),
('IRD Certified Accounting',     'Inland Revenue Department (IRD) Nepal approved billing & inventory software.',      'FileSpreadsheet', TRUE, 3),
('Digital Marketing & Branding', 'Search engine optimization (SEO), social media marketing, and digital identity.',   'Megaphone',   TRUE, 4);

-- ============================================================
-- TESTIMONIALS
-- ============================================================

INSERT INTO testimonials (author_name, author_company, author_role, content, rating, is_active, sort_order) VALUES
('Ramesh Pokhrel', 'Grand Hotel Butwal',   'General Manager', 'Atithya HMS simplified our room booking and front desk management completely.', 5, TRUE, 1),
('Sita Adhikari',  'Chilly Restro & Bar', 'Owner',           'Restro POS sped up our kitchen order dispatch and improved billing accuracy.',  5, TRUE, 2);
