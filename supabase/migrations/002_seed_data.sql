-- ============================================================
-- LeafClutch Technologies — Seed Data
-- Migrates existing hardcoded data into the database.
-- Run this AFTER 001_initial_schema.sql
-- ============================================================

-- ============================================================
-- SITE CONTENT
-- ============================================================

INSERT INTO site_content (section, title, subtitle, description, badge_text, extra) VALUES
(
  'hero',
  'Building Software That Moves Your Business Forward',
  'Smart Software Solutions',
  'We create modern and reliable software solutions that help businesses work smarter, improve efficiency, and grow with confidence.',
  'Smart Software Solutions',
  '{"lottie_url": "https://lottie.host/0618f081-ed78-4aba-aa5d-e3a254164a48/RoeZhdGVv1.lottie", "cta_primary_label": "Get Started", "cta_primary_href": "#contact", "cta_secondary_label": "Explore Products", "cta_secondary_href": "#products"}'
),
(
  'about',
  'Why Choose LeafClutch?',
  'Pioneering Tech in Nepal',
  'Based in Nepal, LeafClutch delivers modern, high-performance software solutions designed to help businesses simplify operations, improve productivity, and achieve sustainable growth.',
  'Pioneering Tech in Nepal',
  '{"image_url": "/about-image.png"}'
),
(
  'achievement_story',
  'The Tale of Our Achievement Story',
  'Since 2024',
  'Our journey is a testament to teamwork and perseverance. Together, we''ve overcome challenges and celebrated victories, creating a narrative of constant progress.',
  'Since 2024',
  '{"image_url": "/achievement-image.png"}'
);

-- ============================================================
-- ACHIEVEMENTS
-- ============================================================

INSERT INTO achievements (value, title, description, icon, sort_order) VALUES
('1.5+', 'Years',    'Influencing Landscapes', 'Sparkles',      1),
('15+',  'Projects', 'Excellence Achieved',     'FolderKanban',  2),
('26+',  'Awards',   'Innovation Wins',          'Award',         3),
('99%',  'Happy',    'Client Satisfaction',      'CheckCircle',   4);

-- ============================================================
-- COMPANIES (placeholder logos — replace logo_url with real assets)
-- ============================================================

INSERT INTO companies (name, logo_url, is_active, sort_order) VALUES
('Company One',   '/companies/company-one.svg',   TRUE, 1),
('Company Two',   '/companies/company-two.svg',   TRUE, 2),
('Company Three', '/companies/company-three.svg', TRUE, 3),
('Company Four',  '/companies/company-four.svg',  TRUE, 4),
('Company Five',  '/companies/company-five.svg',  TRUE, 5),
('Company Six',   '/companies/company-six.svg',   TRUE, 6);

-- ============================================================
-- PRODUCTS
-- ============================================================

INSERT INTO products (name, slug, description, icon, category, is_active, is_featured, sort_order) VALUES
(
  'LeafClutch POS',
  'leafclutch-pos',
  'A modern point-of-sale solution for growing businesses. Manage sales, inventory, and reports from one dashboard.',
  'ShoppingBag',
  'Retail',
  TRUE,
  TRUE,
  1
),
(
  'LeafClutch CRM',
  'leafclutch-crm',
  'Manage customers, relationships, and sales pipelines in one place. Track leads, follow-ups, and close deals faster.',
  'Users',
  'Sales',
  TRUE,
  FALSE,
  2
),
(
  'LeafClutch HR',
  'leafclutch-hr',
  'Simplify employee management and HR operations. Payroll, attendance, leave, and performance in a single platform.',
  'BriefcaseBusiness',
  'HR',
  TRUE,
  FALSE,
  3
);

-- ============================================================
-- PRODUCT PRICES
-- LeafClutch POS — 3 tiers × 2 billing cycles
-- ============================================================

-- POS — Monthly
INSERT INTO product_prices (product_id, plan_name, billing_cycle, price, currency, is_highlighted, sort_order)
SELECT id, 'Starter',      'monthly', 2999,  'NPR', FALSE, 1 FROM products WHERE slug = 'leafclutch-pos';
INSERT INTO product_prices (product_id, plan_name, billing_cycle, price, currency, is_highlighted, sort_order)
SELECT id, 'Professional', 'monthly', 5999,  'NPR', TRUE,  2 FROM products WHERE slug = 'leafclutch-pos';
INSERT INTO product_prices (product_id, plan_name, billing_cycle, price, currency, is_highlighted, sort_order)
SELECT id, 'Enterprise',   'monthly', 9999,  'NPR', FALSE, 3 FROM products WHERE slug = 'leafclutch-pos';

-- POS — Yearly (save ~2 months)
INSERT INTO product_prices (product_id, plan_name, billing_cycle, price, currency, is_highlighted, sort_order)
SELECT id, 'Starter',      'yearly', 29990,  'NPR', FALSE, 1 FROM products WHERE slug = 'leafclutch-pos';
INSERT INTO product_prices (product_id, plan_name, billing_cycle, price, currency, is_highlighted, sort_order)
SELECT id, 'Professional', 'yearly', 59990,  'NPR', TRUE,  2 FROM products WHERE slug = 'leafclutch-pos';
INSERT INTO product_prices (product_id, plan_name, billing_cycle, price, currency, is_highlighted, sort_order)
SELECT id, 'Enterprise',   'yearly', 99990,  'NPR', FALSE, 3 FROM products WHERE slug = 'leafclutch-pos';

-- ============================================================
-- LeafClutch CRM — Monthly
-- ============================================================

INSERT INTO product_prices (product_id, plan_name, billing_cycle, price, currency, is_highlighted, sort_order)
SELECT id, 'Starter',      'monthly', 1999,  'NPR', FALSE, 1 FROM products WHERE slug = 'leafclutch-crm';
INSERT INTO product_prices (product_id, plan_name, billing_cycle, price, currency, is_highlighted, sort_order)
SELECT id, 'Professional', 'monthly', 3999,  'NPR', TRUE,  2 FROM products WHERE slug = 'leafclutch-crm';
INSERT INTO product_prices (product_id, plan_name, billing_cycle, price, currency, is_highlighted, sort_order)
SELECT id, 'Enterprise',   'monthly', 7999,  'NPR', FALSE, 3 FROM products WHERE slug = 'leafclutch-crm';

-- CRM — Yearly
INSERT INTO product_prices (product_id, plan_name, billing_cycle, price, currency, is_highlighted, sort_order)
SELECT id, 'Starter',      'yearly', 19990,  'NPR', FALSE, 1 FROM products WHERE slug = 'leafclutch-crm';
INSERT INTO product_prices (product_id, plan_name, billing_cycle, price, currency, is_highlighted, sort_order)
SELECT id, 'Professional', 'yearly', 39990,  'NPR', TRUE,  2 FROM products WHERE slug = 'leafclutch-crm';
INSERT INTO product_prices (product_id, plan_name, billing_cycle, price, currency, is_highlighted, sort_order)
SELECT id, 'Enterprise',   'yearly', 79990,  'NPR', FALSE, 3 FROM products WHERE slug = 'leafclutch-crm';

-- ============================================================
-- LeafClutch HR — Monthly
-- ============================================================

INSERT INTO product_prices (product_id, plan_name, billing_cycle, price, currency, is_highlighted, sort_order)
SELECT id, 'Starter',      'monthly', 2499,  'NPR', FALSE, 1 FROM products WHERE slug = 'leafclutch-hr';
INSERT INTO product_prices (product_id, plan_name, billing_cycle, price, currency, is_highlighted, sort_order)
SELECT id, 'Professional', 'monthly', 4999,  'NPR', TRUE,  2 FROM products WHERE slug = 'leafclutch-hr';
INSERT INTO product_prices (product_id, plan_name, billing_cycle, price, currency, is_highlighted, sort_order)
SELECT id, 'Enterprise',   'monthly', 8999,  'NPR', FALSE, 3 FROM products WHERE slug = 'leafclutch-hr';

-- HR — Yearly
INSERT INTO product_prices (product_id, plan_name, billing_cycle, price, currency, is_highlighted, sort_order)
SELECT id, 'Starter',      'yearly', 24990,  'NPR', FALSE, 1 FROM products WHERE slug = 'leafclutch-hr';
INSERT INTO product_prices (product_id, plan_name, billing_cycle, price, currency, is_highlighted, sort_order)
SELECT id, 'Professional', 'yearly', 49990,  'NPR', TRUE,  2 FROM products WHERE slug = 'leafclutch-hr';
INSERT INTO product_prices (product_id, plan_name, billing_cycle, price, currency, is_highlighted, sort_order)
SELECT id, 'Enterprise',   'yearly', 89990,  'NPR', FALSE, 3 FROM products WHERE slug = 'leafclutch-hr';

-- ============================================================
-- PRODUCT VARIATIONS (feature list per price tier)
-- POS — Starter (Monthly)
-- ============================================================

INSERT INTO product_variations (product_price_id, feature, is_included, sort_order)
SELECT pp.id, 'Up to 3 terminals',        TRUE,  1 FROM product_prices pp JOIN products p ON p.id = pp.product_id WHERE p.slug = 'leafclutch-pos' AND pp.plan_name = 'Starter'      AND pp.billing_cycle = 'monthly';
INSERT INTO product_variations (product_price_id, feature, is_included, sort_order)
SELECT pp.id, 'Sales & invoicing',         TRUE,  2 FROM product_prices pp JOIN products p ON p.id = pp.product_id WHERE p.slug = 'leafclutch-pos' AND pp.plan_name = 'Starter'      AND pp.billing_cycle = 'monthly';
INSERT INTO product_variations (product_price_id, feature, is_included, sort_order)
SELECT pp.id, 'Basic inventory tracking',  TRUE,  3 FROM product_prices pp JOIN products p ON p.id = pp.product_id WHERE p.slug = 'leafclutch-pos' AND pp.plan_name = 'Starter'      AND pp.billing_cycle = 'monthly';
INSERT INTO product_variations (product_price_id, feature, is_included, sort_order)
SELECT pp.id, 'Daily reports',             TRUE,  4 FROM product_prices pp JOIN products p ON p.id = pp.product_id WHERE p.slug = 'leafclutch-pos' AND pp.plan_name = 'Starter'      AND pp.billing_cycle = 'monthly';
INSERT INTO product_variations (product_price_id, feature, is_included, sort_order)
SELECT pp.id, 'Multi-location support',    FALSE, 5 FROM product_prices pp JOIN products p ON p.id = pp.product_id WHERE p.slug = 'leafclutch-pos' AND pp.plan_name = 'Starter'      AND pp.billing_cycle = 'monthly';
INSERT INTO product_variations (product_price_id, feature, is_included, sort_order)
SELECT pp.id, 'Priority support',          FALSE, 6 FROM product_prices pp JOIN products p ON p.id = pp.product_id WHERE p.slug = 'leafclutch-pos' AND pp.plan_name = 'Starter'      AND pp.billing_cycle = 'monthly';

-- POS — Professional (Monthly)
INSERT INTO product_variations (product_price_id, feature, is_included, sort_order)
SELECT pp.id, 'Up to 10 terminals',        TRUE,  1 FROM product_prices pp JOIN products p ON p.id = pp.product_id WHERE p.slug = 'leafclutch-pos' AND pp.plan_name = 'Professional' AND pp.billing_cycle = 'monthly';
INSERT INTO product_variations (product_price_id, feature, is_included, sort_order)
SELECT pp.id, 'Sales & invoicing',         TRUE,  2 FROM product_prices pp JOIN products p ON p.id = pp.product_id WHERE p.slug = 'leafclutch-pos' AND pp.plan_name = 'Professional' AND pp.billing_cycle = 'monthly';
INSERT INTO product_variations (product_price_id, feature, is_included, sort_order)
SELECT pp.id, 'Advanced inventory',        TRUE,  3 FROM product_prices pp JOIN products p ON p.id = pp.product_id WHERE p.slug = 'leafclutch-pos' AND pp.plan_name = 'Professional' AND pp.billing_cycle = 'monthly';
INSERT INTO product_variations (product_price_id, feature, is_included, sort_order)
SELECT pp.id, 'Custom reports & exports',  TRUE,  4 FROM product_prices pp JOIN products p ON p.id = pp.product_id WHERE p.slug = 'leafclutch-pos' AND pp.plan_name = 'Professional' AND pp.billing_cycle = 'monthly';
INSERT INTO product_variations (product_price_id, feature, is_included, sort_order)
SELECT pp.id, 'Multi-location support',    TRUE,  5 FROM product_prices pp JOIN products p ON p.id = pp.product_id WHERE p.slug = 'leafclutch-pos' AND pp.plan_name = 'Professional' AND pp.billing_cycle = 'monthly';
INSERT INTO product_variations (product_price_id, feature, is_included, sort_order)
SELECT pp.id, 'Priority support',          FALSE, 6 FROM product_prices pp JOIN products p ON p.id = pp.product_id WHERE p.slug = 'leafclutch-pos' AND pp.plan_name = 'Professional' AND pp.billing_cycle = 'monthly';

-- POS — Enterprise (Monthly)
INSERT INTO product_variations (product_price_id, feature, is_included, sort_order)
SELECT pp.id, 'Unlimited terminals',       TRUE,  1 FROM product_prices pp JOIN products p ON p.id = pp.product_id WHERE p.slug = 'leafclutch-pos' AND pp.plan_name = 'Enterprise'   AND pp.billing_cycle = 'monthly';
INSERT INTO product_variations (product_price_id, feature, is_included, sort_order)
SELECT pp.id, 'Sales & invoicing',         TRUE,  2 FROM product_prices pp JOIN products p ON p.id = pp.product_id WHERE p.slug = 'leafclutch-pos' AND pp.plan_name = 'Enterprise'   AND pp.billing_cycle = 'monthly';
INSERT INTO product_variations (product_price_id, feature, is_included, sort_order)
SELECT pp.id, 'Advanced inventory',        TRUE,  3 FROM product_prices pp JOIN products p ON p.id = pp.product_id WHERE p.slug = 'leafclutch-pos' AND pp.plan_name = 'Enterprise'   AND pp.billing_cycle = 'monthly';
INSERT INTO product_variations (product_price_id, feature, is_included, sort_order)
SELECT pp.id, 'Custom reports & exports',  TRUE,  4 FROM product_prices pp JOIN products p ON p.id = pp.product_id WHERE p.slug = 'leafclutch-pos' AND pp.plan_name = 'Enterprise'   AND pp.billing_cycle = 'monthly';
INSERT INTO product_variations (product_price_id, feature, is_included, sort_order)
SELECT pp.id, 'Multi-location support',    TRUE,  5 FROM product_prices pp JOIN products p ON p.id = pp.product_id WHERE p.slug = 'leafclutch-pos' AND pp.plan_name = 'Enterprise'   AND pp.billing_cycle = 'monthly';
INSERT INTO product_variations (product_price_id, feature, is_included, sort_order)
SELECT pp.id, 'Dedicated priority support',TRUE,  6 FROM product_prices pp JOIN products p ON p.id = pp.product_id WHERE p.slug = 'leafclutch-pos' AND pp.plan_name = 'Enterprise'   AND pp.billing_cycle = 'monthly';

-- CRM — Starter (Monthly)
INSERT INTO product_variations (product_price_id, feature, is_included, sort_order)
SELECT pp.id, 'Up to 500 contacts',        TRUE,  1 FROM product_prices pp JOIN products p ON p.id = pp.product_id WHERE p.slug = 'leafclutch-crm' AND pp.plan_name = 'Starter'      AND pp.billing_cycle = 'monthly';
INSERT INTO product_variations (product_price_id, feature, is_included, sort_order)
SELECT pp.id, 'Lead tracking',             TRUE,  2 FROM product_prices pp JOIN products p ON p.id = pp.product_id WHERE p.slug = 'leafclutch-crm' AND pp.plan_name = 'Starter'      AND pp.billing_cycle = 'monthly';
INSERT INTO product_variations (product_price_id, feature, is_included, sort_order)
SELECT pp.id, 'Email follow-up reminders', TRUE,  3 FROM product_prices pp JOIN products p ON p.id = pp.product_id WHERE p.slug = 'leafclutch-crm' AND pp.plan_name = 'Starter'      AND pp.billing_cycle = 'monthly';
INSERT INTO product_variations (product_price_id, feature, is_included, sort_order)
SELECT pp.id, 'Sales pipeline view',       FALSE, 4 FROM product_prices pp JOIN products p ON p.id = pp.product_id WHERE p.slug = 'leafclutch-crm' AND pp.plan_name = 'Starter'      AND pp.billing_cycle = 'monthly';
INSERT INTO product_variations (product_price_id, feature, is_included, sort_order)
SELECT pp.id, 'Advanced analytics',        FALSE, 5 FROM product_prices pp JOIN products p ON p.id = pp.product_id WHERE p.slug = 'leafclutch-crm' AND pp.plan_name = 'Starter'      AND pp.billing_cycle = 'monthly';

-- CRM — Professional (Monthly)
INSERT INTO product_variations (product_price_id, feature, is_included, sort_order)
SELECT pp.id, 'Unlimited contacts',        TRUE,  1 FROM product_prices pp JOIN products p ON p.id = pp.product_id WHERE p.slug = 'leafclutch-crm' AND pp.plan_name = 'Professional' AND pp.billing_cycle = 'monthly';
INSERT INTO product_variations (product_price_id, feature, is_included, sort_order)
SELECT pp.id, 'Lead tracking',             TRUE,  2 FROM product_prices pp JOIN products p ON p.id = pp.product_id WHERE p.slug = 'leafclutch-crm' AND pp.plan_name = 'Professional' AND pp.billing_cycle = 'monthly';
INSERT INTO product_variations (product_price_id, feature, is_included, sort_order)
SELECT pp.id, 'Email follow-up reminders', TRUE,  3 FROM product_prices pp JOIN products p ON p.id = pp.product_id WHERE p.slug = 'leafclutch-crm' AND pp.plan_name = 'Professional' AND pp.billing_cycle = 'monthly';
INSERT INTO product_variations (product_price_id, feature, is_included, sort_order)
SELECT pp.id, 'Sales pipeline view',       TRUE,  4 FROM product_prices pp JOIN products p ON p.id = pp.product_id WHERE p.slug = 'leafclutch-crm' AND pp.plan_name = 'Professional' AND pp.billing_cycle = 'monthly';
INSERT INTO product_variations (product_price_id, feature, is_included, sort_order)
SELECT pp.id, 'Advanced analytics',        FALSE, 5 FROM product_prices pp JOIN products p ON p.id = pp.product_id WHERE p.slug = 'leafclutch-crm' AND pp.plan_name = 'Professional' AND pp.billing_cycle = 'monthly';

-- CRM — Enterprise (Monthly)
INSERT INTO product_variations (product_price_id, feature, is_included, sort_order)
SELECT pp.id, 'Unlimited contacts',        TRUE,  1 FROM product_prices pp JOIN products p ON p.id = pp.product_id WHERE p.slug = 'leafclutch-crm' AND pp.plan_name = 'Enterprise'   AND pp.billing_cycle = 'monthly';
INSERT INTO product_variations (product_price_id, feature, is_included, sort_order)
SELECT pp.id, 'Lead tracking',             TRUE,  2 FROM product_prices pp JOIN products p ON p.id = pp.product_id WHERE p.slug = 'leafclutch-crm' AND pp.plan_name = 'Enterprise'   AND pp.billing_cycle = 'monthly';
INSERT INTO product_variations (product_price_id, feature, is_included, sort_order)
SELECT pp.id, 'Email follow-up reminders', TRUE,  3 FROM product_prices pp JOIN products p ON p.id = pp.product_id WHERE p.slug = 'leafclutch-crm' AND pp.plan_name = 'Enterprise'   AND pp.billing_cycle = 'monthly';
INSERT INTO product_variations (product_price_id, feature, is_included, sort_order)
SELECT pp.id, 'Sales pipeline view',       TRUE,  4 FROM product_prices pp JOIN products p ON p.id = pp.product_id WHERE p.slug = 'leafclutch-crm' AND pp.plan_name = 'Enterprise'   AND pp.billing_cycle = 'monthly';
INSERT INTO product_variations (product_price_id, feature, is_included, sort_order)
SELECT pp.id, 'Advanced analytics',        TRUE,  5 FROM product_prices pp JOIN products p ON p.id = pp.product_id WHERE p.slug = 'leafclutch-crm' AND pp.plan_name = 'Enterprise'   AND pp.billing_cycle = 'monthly';

-- HR — Starter (Monthly)
INSERT INTO product_variations (product_price_id, feature, is_included, sort_order)
SELECT pp.id, 'Up to 25 employees',        TRUE,  1 FROM product_prices pp JOIN products p ON p.id = pp.product_id WHERE p.slug = 'leafclutch-hr' AND pp.plan_name = 'Starter'      AND pp.billing_cycle = 'monthly';
INSERT INTO product_variations (product_price_id, feature, is_included, sort_order)
SELECT pp.id, 'Attendance tracking',       TRUE,  2 FROM product_prices pp JOIN products p ON p.id = pp.product_id WHERE p.slug = 'leafclutch-hr' AND pp.plan_name = 'Starter'      AND pp.billing_cycle = 'monthly';
INSERT INTO product_variations (product_price_id, feature, is_included, sort_order)
SELECT pp.id, 'Leave management',          TRUE,  3 FROM product_prices pp JOIN products p ON p.id = pp.product_id WHERE p.slug = 'leafclutch-hr' AND pp.plan_name = 'Starter'      AND pp.billing_cycle = 'monthly';
INSERT INTO product_variations (product_price_id, feature, is_included, sort_order)
SELECT pp.id, 'Payroll processing',        FALSE, 4 FROM product_prices pp JOIN products p ON p.id = pp.product_id WHERE p.slug = 'leafclutch-hr' AND pp.plan_name = 'Starter'      AND pp.billing_cycle = 'monthly';
INSERT INTO product_variations (product_price_id, feature, is_included, sort_order)
SELECT pp.id, 'Performance reviews',       FALSE, 5 FROM product_prices pp JOIN products p ON p.id = pp.product_id WHERE p.slug = 'leafclutch-hr' AND pp.plan_name = 'Starter'      AND pp.billing_cycle = 'monthly';

-- HR — Professional (Monthly)
INSERT INTO product_variations (product_price_id, feature, is_included, sort_order)
SELECT pp.id, 'Up to 100 employees',       TRUE,  1 FROM product_prices pp JOIN products p ON p.id = pp.product_id WHERE p.slug = 'leafclutch-hr' AND pp.plan_name = 'Professional' AND pp.billing_cycle = 'monthly';
INSERT INTO product_variations (product_price_id, feature, is_included, sort_order)
SELECT pp.id, 'Attendance tracking',       TRUE,  2 FROM product_prices pp JOIN products p ON p.id = pp.product_id WHERE p.slug = 'leafclutch-hr' AND pp.plan_name = 'Professional' AND pp.billing_cycle = 'monthly';
INSERT INTO product_variations (product_price_id, feature, is_included, sort_order)
SELECT pp.id, 'Leave management',          TRUE,  3 FROM product_prices pp JOIN products p ON p.id = pp.product_id WHERE p.slug = 'leafclutch-hr' AND pp.plan_name = 'Professional' AND pp.billing_cycle = 'monthly';
INSERT INTO product_variations (product_price_id, feature, is_included, sort_order)
SELECT pp.id, 'Payroll processing',        TRUE,  4 FROM product_prices pp JOIN products p ON p.id = pp.product_id WHERE p.slug = 'leafclutch-hr' AND pp.plan_name = 'Professional' AND pp.billing_cycle = 'monthly';
INSERT INTO product_variations (product_price_id, feature, is_included, sort_order)
SELECT pp.id, 'Performance reviews',       FALSE, 5 FROM product_prices pp JOIN products p ON p.id = pp.product_id WHERE p.slug = 'leafclutch-hr' AND pp.plan_name = 'Professional' AND pp.billing_cycle = 'monthly';

-- HR — Enterprise (Monthly)
INSERT INTO product_variations (product_price_id, feature, is_included, sort_order)
SELECT pp.id, 'Unlimited employees',       TRUE,  1 FROM product_prices pp JOIN products p ON p.id = pp.product_id WHERE p.slug = 'leafclutch-hr' AND pp.plan_name = 'Enterprise'   AND pp.billing_cycle = 'monthly';
INSERT INTO product_variations (product_price_id, feature, is_included, sort_order)
SELECT pp.id, 'Attendance tracking',       TRUE,  2 FROM product_prices pp JOIN products p ON p.id = pp.product_id WHERE p.slug = 'leafclutch-hr' AND pp.plan_name = 'Enterprise'   AND pp.billing_cycle = 'monthly';
INSERT INTO product_variations (product_price_id, feature, is_included, sort_order)
SELECT pp.id, 'Leave management',          TRUE,  3 FROM product_prices pp JOIN products p ON p.id = pp.product_id WHERE p.slug = 'leafclutch-hr' AND pp.plan_name = 'Enterprise'   AND pp.billing_cycle = 'monthly';
INSERT INTO product_variations (product_price_id, feature, is_included, sort_order)
SELECT pp.id, 'Payroll processing',        TRUE,  4 FROM product_prices pp JOIN products p ON p.id = pp.product_id WHERE p.slug = 'leafclutch-hr' AND pp.plan_name = 'Enterprise'   AND pp.billing_cycle = 'monthly';
INSERT INTO product_variations (product_price_id, feature, is_included, sort_order)
SELECT pp.id, 'Performance reviews',       TRUE,  5 FROM product_prices pp JOIN products p ON p.id = pp.product_id WHERE p.slug = 'leafclutch-hr' AND pp.plan_name = 'Enterprise'   AND pp.billing_cycle = 'monthly';

-- ============================================================
-- SERVICES (example — update with real service descriptions)
-- ============================================================

INSERT INTO services (title, description, icon, is_active, sort_order) VALUES
('Custom Software Development', 'We build tailor-made software solutions that fit your exact business workflows and requirements.', 'Code2',       TRUE, 1),
('ERP & Business Systems',      'End-to-end enterprise resource planning systems covering inventory, finance, and operations.',       'LayoutDashboard', TRUE, 2),
('Mobile App Development',      'Cross-platform iOS and Android apps designed for performance and a seamless user experience.',       'Smartphone',  TRUE, 3),
('Cloud & SaaS Solutions',      'Scalable cloud-first applications and SaaS platforms built for reliability and rapid growth.',       'Cloud',       TRUE, 4),
('UI/UX Design',                'User-centred interface design that converts visitors into customers and drives engagement.',          'Palette',     TRUE, 5),
('Technical Consulting',        'Expert guidance on technology stack selection, architecture, and digital transformation strategy.',  'Lightbulb',   TRUE, 6);

-- ============================================================
-- TEAM MEMBERS (placeholder — fill in real data)
-- ============================================================

INSERT INTO team_members (name, role, bio, avatar_url, sort_order, is_active) VALUES
('Team Member 1', 'CEO & Co-Founder',       'Visionary leader driving LeafClutch''s mission to empower Nepali businesses with world-class software.', NULL, 1, TRUE),
('Team Member 2', 'CTO & Co-Founder',       'Full-stack engineer and architect behind LeafClutch''s core platform infrastructure.',                   NULL, 2, TRUE),
('Team Member 3', 'Head of Product',        'Translates customer needs into elegant, intuitive product experiences.',                                  NULL, 3, TRUE),
('Team Member 4', 'Lead Designer',          'Crafts stunning user interfaces that balance aesthetics with usability.',                                  NULL, 4, TRUE);

-- ============================================================
-- TESTIMONIALS (placeholder — fill in real client quotes)
-- ============================================================

INSERT INTO testimonials (author_name, author_company, author_role, content, rating, is_active, sort_order) VALUES
('Rajesh Shrestha', 'Kathmandu Retail Co.',  'Owner',         'LeafClutch POS transformed how we run our store. Inventory management is now effortless.',         5, TRUE, 1),
('Priya Tamang',    'TechNova Nepal',        'HR Manager',    'The HR module saved us hours every month on payroll. Attendance tracking is spot on.',             5, TRUE, 2),
('Suman Karki',     'GrowFast Pvt. Ltd.',   'Sales Director','Our sales team closed 30% more deals after switching to LeafClutch CRM. Highly recommend.',        5, TRUE, 3);
