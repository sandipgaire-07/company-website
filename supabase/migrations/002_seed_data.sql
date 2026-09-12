-- ============================================================
-- NCT SOFT / ApexFlow Technologies — Seed Data
-- Comprehensive static seed data matching frontend UI components
-- ============================================================

-- 1. DEFAULT ADMIN USER IN AUTH & ADMIN_USER TABLE
INSERT INTO admin_user (email) VALUES ('admin@nctsoft.com.np')
ON CONFLICT (email) DO NOTHING;

INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  recovery_sent_at,
  last_sign_in_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
)
SELECT 
  '00000000-0000-0000-0000-000000000000',
  'a1b2c3d4-e5f6-7890-abcd-ef1234567890',
  'authenticated',
  'authenticated',
  'admin@nctsoft.com.np',
  crypt('Admin@123456', gen_salt('bf')),
  NOW(),
  NOW(),
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{}',
  NOW(),
  NOW(),
  '',
  '',
  '',
  ''
WHERE NOT EXISTS (
  SELECT 1 FROM auth.users WHERE email = 'admin@nctsoft.com.np'
);

-- 2. SITE SETTINGS
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

-- 3. PRODUCTS
INSERT INTO products (id, name, slug, description, image, icon, category, badge, color, is_active, is_featured, sort_order) VALUES
('11111111-1111-1111-1111-111111111111', 'ApexFlow Hospitality', 'apexflow-hospitality', 'Real-time booking engine and multi-property management system.', '/showcase/hospitality.webp', 'Building2', 'Hospitality', 'Enterprise SaaS', '#4458A1', true, true, 1),
('22222222-2222-2222-2222-222222222222', 'ApexFlow RestroCloud', 'apexflow-restrocloud', 'Cloud KDS, kitchen dispatch, and QR table ordering suite.', '/showcase/restrocloud.webp', 'Utensils', 'Food & Beverage', 'Flagship POS', '#E7212B', true, true, 2),
('33333333-3333-3333-3333-333333333333', 'ApexFlow BioPulse', 'apexflow-biopulse', 'Biometric IoT sync, automated payroll, and leave management.', '/showcase/biopulse.webp', 'Fingerprint', 'Workforce Tech', 'HR Automation', '#10B981', true, true, 3),
('44444444-4444-4444-4444-444444444444', 'ApexFlow LedgerPro', 'apexflow-ledgerpro', 'IRD-certified double-entry accounting and tax audit system.', '/showcase/ledgerpro.png', 'BookOpenCheck', 'FinTech', 'Audit Ready', '#F59E0B', true, true, 4)
ON CONFLICT (slug) DO UPDATE SET 
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  category = EXCLUDED.category,
  badge = EXCLUDED.badge,
  color = EXCLUDED.color;

-- 4. PRODUCT STATS (Specific metrics for product detail pages)
INSERT INTO product_stats (product_id, value, label, description, sort_order) VALUES
('11111111-1111-1111-1111-111111111111', '100+', 'Properties', 'Managed through the platform', 1),
('11111111-1111-1111-1111-111111111111', '25K+', 'Bookings', 'Processed every month', 2),
('11111111-1111-1111-1111-111111111111', '32%', 'More Occupancy', 'With smarter operations', 3),
('11111111-1111-1111-1111-111111111111', '98%', 'Satisfaction', 'From platform users', 4),

('22222222-2222-2222-2222-222222222222', '50K+', 'Orders', 'Handled each month', 1),
('22222222-2222-2222-2222-222222222222', '27%', 'Faster Service', 'From kitchen dispatch', 2),
('22222222-2222-2222-2222-222222222222', '200+', 'Locations', 'Serving customers daily', 3),
('22222222-2222-2222-2222-222222222222', '99%', 'Order Accuracy', 'Across connected teams', 4),

('33333333-3333-3333-3333-333333333333', '1K+', 'Employees', 'Synced across teams', 1),
('33333333-3333-3333-3333-333333333333', '40%', 'Less Admin', 'Work for HR teams', 2),
('33333333-3333-3333-3333-333333333333', '99%', 'Accuracy', 'Across attendance data', 3),
('33333333-3333-3333-3333-333333333333', '150+', 'Businesses', 'Managing workforce better', 4),

('44444444-4444-4444-4444-444444444444', '400+', 'Businesses', 'Running cleaner books', 1),
('44444444-4444-4444-4444-444444444444', '12K+', 'Reports', 'Generated every month', 2),
('44444444-4444-4444-4444-444444444444', '99.9%', 'Accuracy', 'Across financial records', 3),
('44444444-4444-4444-4444-444444444444', '45%', 'Time Saved', 'During month-end close', 4);

-- 5. PRODUCT PRICES
INSERT INTO product_prices (product_id, plan_name, description, billing_cycle, price, discounted_price, currency, features, is_highlighted, sort_order) VALUES
('11111111-1111-1111-1111-111111111111', 'Basic', 'For small businesses getting started.', 'monthly', 5000.00, 3999.00, 'NPR', '["Up to 3 users", "Basic reporting", "Core business tools", "Email support"]'::jsonb, false, 1),
('11111111-1111-1111-1111-111111111111', 'Professional', 'For growing businesses that need more.', 'monthly', 9000.00, 6999.00, 'NPR', '["Up to 10 users", "Advanced reporting", "Analytics dashboard", "Priority support"]'::jsonb, true, 2),
('11111111-1111-1111-1111-111111111111', 'Enterprise', 'Advanced tools for larger organizations.', 'monthly', 15000.00, 11999.00, 'NPR', '["Unlimited users", "Advanced analytics", "Multi-location support", "Dedicated support"]'::jsonb, false, 3),

('22222222-2222-2222-2222-222222222222', 'Basic', 'For small businesses getting started.', 'monthly', 5000.00, 3999.00, 'NPR', '["Up to 3 users", "Basic reporting", "Core business tools", "Email support"]'::jsonb, false, 1),
('22222222-2222-2222-2222-222222222222', 'Professional', 'For growing businesses that need more.', 'monthly', 9000.00, 6999.00, 'NPR', '["Up to 10 users", "Advanced reporting", "Analytics dashboard", "Priority support"]'::jsonb, true, 2),
('22222222-2222-2222-2222-222222222222', 'Enterprise', 'Advanced tools for larger organizations.', 'monthly', 15000.00, 11999.00, 'NPR', '["Unlimited users", "Advanced analytics", "Multi-location support", "Dedicated support"]'::jsonb, false, 3)
ON CONFLICT (product_id, plan_name, billing_cycle) DO UPDATE SET price = EXCLUDED.price;

-- 6. PRODUCT FEATURES
INSERT INTO product_features (product_id, title, description, icon, sort_order) VALUES
('11111111-1111-1111-1111-111111111111', 'Real-time Booking Engine', 'Manage direct reservations with a fast, reliable booking flow.', 'CalendarCheck', 1),
('11111111-1111-1111-1111-111111111111', 'Multi-property Management', 'Keep every property and room operation visible in one workspace.', 'Building2', 2),
('11111111-1111-1111-1111-111111111111', 'Guest Management', 'Create thoughtful guest experiences with organized profiles and history.', 'Users', 3),
('11111111-1111-1111-1111-111111111111', 'Hospitality Reports', 'Use clear performance data to improve occupancy and revenue.', 'BarChart3', 4),

('22222222-2222-2222-2222-222222222222', 'Cloud Kitchen Display', 'Give kitchen teams a clear view of every order and priority.', 'MonitorSmartphone', 1),
('22222222-2222-2222-2222-222222222222', 'Kitchen Dispatch', 'Coordinate preparation and handoff without unnecessary delays.', 'CookingPot', 2),
('22222222-2222-2222-2222-222222222222', 'QR Table Ordering', 'Let guests browse menus and order directly from their table.', 'QrCode', 3),

('33333333-3333-3333-3333-333333333333', 'Biometric IoT Sync', 'Connect attendance devices and keep workforce data current.', 'Fingerprint', 1),
('33333333-3333-3333-3333-333333333333', 'Automated Payroll', 'Reduce manual calculations with dependable payroll workflows.', 'WalletCards', 2),

('44444444-4444-4444-4444-444444444444', 'Double-entry Ledger', 'Keep financial records structured, balanced, and dependable.', 'BookOpenCheck', 1),
('44444444-4444-4444-4444-444444444444', 'IRD-ready Records', 'Support compliant reporting with consistent financial data.', 'ShieldCheck', 2);

-- 7. COMPANY STATS (Matches Stat type: value, label, description)
INSERT INTO company_stats (value, label, description, icon, sort_order) VALUES
('15+', 'Years', 'Influencing Landscapes', 'Calendar', 1),
('125+', 'Projects', 'Excellence Achieved', 'Briefcase', 2),
('26+', 'Awards', 'Innovation Wins', 'Award', 3),
('99%', 'Happy', 'Client Satisfaction', 'Smile', 4);

-- 8. SERVICES
INSERT INTO services (title, slug, description, icon, color, sort_order) VALUES
('Enterprise Software Engineering', 'enterprise-software', 'Custom enterprise resource planning and bespoke software tailored for scaling enterprises.', 'Code', '#4458A1', 1),
('Cloud Infrastructure & IoT', 'cloud-iot', 'Distributed cloud architecture and IoT biometric sync for modern workforce monitoring.', 'Cloud', '#10B981', 2),
('FinTech & IRD Billing Systems', 'fintech-billing', 'IRD-compliant tax audit engines, double-entry ledgers, and seamless payment integrations.', 'DollarSign', '#F59E0B', 3);

-- 9. TESTIMONIALS
INSERT INTO testimonials (client_name, company_name, role, message, avatar_url, product_name, rating, sort_order) VALUES
('Rajesh Sharma', 'Himalayan Resort & Spa', 'Managing Director', 'ApexFlow Hospitality has completely simplified our booking and multi-property management. Our staff manages front-desk and room operations much more efficiently.', '/testimonials/client-1.jpg', 'ApexFlow Hospitality', 5, 1),
('Sita Thapa', 'Food & Flavor Chains', 'Business Owner', 'ApexFlow RestroCloud''s QR table ordering and Kitchen Dispatch System sped up our food delivery workflow dramatically and increased table turnover.', '/testimonials/client-2.jpg', 'ApexFlow RestroCloud', 5, 2),
('Amit Karki', 'Apex Enterprise Solutions', 'HR Manager', 'ApexFlow BioPulse made biometric attendance sync and automated monthly payroll processing completely seamless for our 300+ staff.', '/testimonials/client-3.jpg', 'ApexFlow BioPulse', 5, 3),
('Sunita Shrestha', 'Vertex Traders', 'Finance Director', 'ApexFlow LedgerPro gave us complete IRD-compliant tax audit reports and real-time ledger accounting without manual calculation errors.', '/testimonials/client-1.jpg', 'ApexFlow LedgerPro', 5, 4);

-- 10. PORTFOLIO SHOWCASE
INSERT INTO portfolio_showcase (title, slug, category, description, image_url, badge_text, accent_color, sort_order, is_featured) VALUES
('ApexFlow Hospitality', 'apexflow-hospitality', 'Hospitality', 'Real-time booking engine and multi-property management system.', '/showcase/hospitality.webp', 'Enterprise SaaS', '#4458A1', 1, true),
('ApexFlow RestroCloud', 'apexflow-restrocloud', 'Food & Beverage', 'Cloud KDS, kitchen dispatch, and QR table ordering suite.', '/showcase/restrocloud.webp', 'Flagship POS', '#E7212B', 2, true),
('ApexFlow BioPulse', 'apexflow-biopulse', 'Workforce Tech', 'Biometric IoT sync, automated payroll, and leave management.', '/showcase/biopulse.webp', 'HR Automation', '#10B981', 3, true),
('ApexFlow LedgerPro', 'apexflow-ledgerpro', 'FinTech', 'IRD-certified double-entry accounting and tax audit system.', '/showcase/ledgerpro.png', 'Audit Ready', '#F59E0B', 4, true);

-- 11. PARTNER INTEGRATIONS
INSERT INTO partner_integrations (name, category, logo_url, description, sort_order) VALUES
('FonePay QR', 'payment_gateway', '/integrations/fonepay.png', 'Instant QR & Merchant Payment Gateway', 1),
('Khalti SDK', 'payment_gateway', '/integrations/khalti.png', 'Wallet Checkout API Integration', 2),
('eSewa Commerce', 'payment_gateway', '/integrations/esewa.png', 'Direct Bank Transfer & Wallet API', 3),
('Tax & IRD Verified', 'certification', '/integrations/ird.webp', 'Compliant with Inland Revenue Billing Guidelines', 4),
('ISO Security 27001', 'certification', '/integrations/iso.png', 'Certified Data Security & Quality Protocol', 5);

-- 12. JOB POSTINGS
INSERT INTO job_postings (title, slug, department, location, employment_type, description, responsibilities, requirements, qualifications, application_deadline, href) VALUES
('Principal Cloud Architect', 'principal-cloud-architect', 'Engineering', 'Kathmandu / Hybrid', 'Full-time', 'Design high-availability cloud infrastructure for scalable SaaS products.', ARRAY['Design cloud infrastructure', 'Lead system performance tuning'], ARRAY['5+ years Node.js/Go', 'PostgreSQL performance tuning', 'Kubernetes & AWS/GCP'], ARRAY['B.S. in Computer Science or equivalent'], 'October 30, 2026', '/careers/apply'),
('Senior Frontend Engineer', 'senior-frontend-engineer', 'Engineering', 'Remote', 'Full-time', 'Build lightning-fast Next.js interfaces with Tailwind & Framer Motion.', ARRAY['Develop React components', 'Optimize web performance'], ARRAY['3+ years Next.js App Router', 'TypeScript expertise', 'Component Library Architecture'], ARRAY['B.S. in Software Engineering or equivalent'], 'October 15, 2026', '/careers/apply');

-- 13. BLOG POSTS
INSERT INTO blog_posts (title, slug, category, excerpt, content, cover_image, author_name, is_published) VALUES
('Building Better Digital Workflows for Growing Businesses', 'building-better-digital-workflows', 'Business Technology', 'The right digital workflow can remove friction from everyday operations.', '["Growing businesses often rely on a collection of tools that solve individual problems but do not always work well together.", "A thoughtful digital workflow starts with understanding how work actually moves through a team."]'::jsonb, '/file.svg', 'LeafClutch Team', true),
('Why Data-Driven Products Win Customer Trust', 'why-data-driven-products-win', 'Product Strategy', 'Useful data is more than a reporting tool.', '["Data-driven product development does not mean replacing judgment with dashboards.", "Good product data answers practical questions."]'::jsonb, '/file.svg', 'Aarav Sharma', true);

-- 14. COMPANIES (CLIENT LOGOS)
INSERT INTO companies (name, logo, logo_url, sort_order) VALUES
('Company One', '/companies/company-one.svg', '/companies/company-one.svg', 1),
('Company Two', '/companies/company-two.svg', '/companies/company-two.svg', 2),
('Company Three', '/companies/company-three.svg', '/companies/company-three.svg', 3),
('Company Four', '/companies/company-four.svg', '/companies/company-four.svg', 4),
('Company Five', '/companies/company-five.svg', '/companies/company-five.svg', 5),
('Company Six', '/companies/company-six.svg', '/companies/company-six.svg', 6);
