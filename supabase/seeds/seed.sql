-- ============================================================
-- LeafClutch Technologies — Seed Data
-- Run AFTER 001_initial_schema.sql
-- Populates all static UI data into the database.
-- ============================================================

-- ============================================================
-- SITE SETTINGS  (company info stored as JSONB)
-- ============================================================

INSERT INTO site_settings (key, value) VALUES (
  'company_info',
  '{
    "company_name": "LeafClutch Technologies",
    "short_name": "LeafClutch",
    "tagline": "Building Technology With Purpose",
    "established_year": "2011",
    "location": "Butwal, Nepal",
    "phone": "+977-071-000000",
    "email": "hello@leafclutch.com",
    "logo_url": "/logo.svg",
    "dark_logo_url": "/logo-dark.svg",
    "favicon_url": "/favicon.ico",
    "social_links": {
      "facebook": "https://facebook.com/leafclutch",
      "linkedin": "https://linkedin.com/company/leafclutch",
      "instagram": "https://instagram.com/leafclutch"
    }
  }'::jsonb
) ON CONFLICT (key) DO NOTHING;

-- ============================================================
-- SITE CONTENT  (hero, about, mission/vision sections)
-- ============================================================

INSERT INTO site_content (section, title, subtitle, description, badge_text, extra) VALUES
(
  'hero',
  'Building Technology With Purpose',
  'Reliable software that powers smarter businesses.',
  'We design and build digital products that simplify operations, reduce friction, and help organizations grow sustainably.',
  'Nepal''s Trusted Software Company',
  NULL
),
(
  'about',
  'Building Technology With Purpose',
  'Our Story',
  'Our journey began with a simple vision: to use technology to solve real business problems. Over the years, we have continued to build reliable software solutions that help organizations work smarter, operate efficiently, and grow.',
  'Our Story',
  '{"image": "/about/our-story.png", "imageAlt": "Our story"}'::jsonb
),
(
  'mission',
  'Our Mission',
  NULL,
  'To build practical and reliable technology solutions that solve real business challenges, simplify operations, and help organizations achieve sustainable growth.',
  NULL,
  '{"icon": "Target"}'::jsonb
),
(
  'vision',
  'Our Vision',
  NULL,
  'To become a trusted technology partner by creating innovative digital solutions that empower businesses and shape a smarter digital future.',
  NULL,
  '{"icon": "Eye"}'::jsonb
)
ON CONFLICT (section) DO NOTHING;

-- ============================================================
-- COMPANY STATS
-- ============================================================

INSERT INTO company_stats (label, value, icon, sort_order) VALUES
('Years',    '15+',  'Clock',        1),
('Projects', '125+', 'FolderCheck',  2),
('Awards',   '26+',  'Trophy',       3),
('Happy',    '99%',  'SmilePlus',    4)
ON CONFLICT DO NOTHING;

-- ============================================================
-- COMPANIES  (trusted client logos)
-- ============================================================

INSERT INTO companies (name, logo_url, sort_order) VALUES
('Company One',   '/companies/company-one.svg',   1),
('Company Two',   '/companies/company-two.svg',   2),
('Company Three', '/companies/company-three.svg', 3),
('Company Four',  '/companies/company-four.svg',  4),
('Company Five',  '/companies/company-five.svg',  5),
('Company Six',   '/companies/company-six.svg',   6)
ON CONFLICT DO NOTHING;

-- ============================================================
-- SERVICES  (+ product_features rows per service)
-- ============================================================

INSERT INTO services (title, description, icon, sort_order) VALUES
('Web Development',    'Build fast, responsive, and modern websites designed to deliver great user experiences and measurable business results.',       'Globe',         1),
('App Development',    'Create intuitive and reliable mobile applications that connect your business with customers wherever they are.',                'Smartphone',    2),
('Graphic Design',     'Create compelling visual experiences that strengthen your brand identity and communicate your message effectively.',            'Palette',       3),
('Software Development','Develop custom software solutions tailored to your business processes, workflows, and long-term goals.',                      'Code2',         4),
('Digital Marketing',  'Grow your online presence through focused digital strategies that reach the right audience and drive meaningful results.',      'TrendingUp',    5),
('IT Consultancy',     'Get expert technology guidance to make better decisions, improve operations, and build a stronger digital foundation.',         'Lightbulb',     6)
ON CONFLICT DO NOTHING;

-- ============================================================
-- PRODUCTS
-- ============================================================

INSERT INTO products (name, slug, description, category, sort_order) VALUES
('ApexFlow Hospitality',  'apexflow-hospitality',  'Real-time booking engine and multi-property management system.', 'Hospitality',     1),
('ApexFlow RestroCloud',  'apexflow-restrocloud',  'Cloud KDS, kitchen dispatch, and QR table ordering suite.',     'Food & Beverage', 2),
('ApexFlow BioPulse',     'apexflow-biopulse',     'Biometric IoT sync, automated payroll, and leave management.', 'Workforce Tech',  3),
('ApexFlow LedgerPro',    'apexflow-ledgerpro',    'IRD-certified double-entry accounting and tax audit system.',  'FinTech',         4)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- PRODUCT FAQs
-- (product_id is NULL here — general FAQs; update with real UUIDs
--  once products are inserted if you need per-product filtering)
-- ============================================================

INSERT INTO product_faqs (question, answer, sort_order, product_id) VALUES
('What is LeafClutch POS?',
 'LeafClutch POS is a modern point-of-sale solution that helps businesses manage sales, inventory, and daily operations.',
 1, NULL),
('Can I manage inventory with LeafClutch POS?',
 'Yes. LeafClutch POS provides tools to help businesses monitor products and manage their inventory efficiently.',
 2, NULL),
('What can I manage with LeafClutch CRM?',
 'LeafClutch CRM helps businesses manage customers, leads, relationships, and sales activities from one platform.',
 3, NULL),
('Can I track leads?',
 'Yes. You can organize and track leads throughout your sales process.',
 4, NULL),
('What does LeafClutch HR provide?',
 'LeafClutch HR simplifies employee management, attendance, and other HR operations.',
 5, NULL),
('Can I manage employee attendance?',
 'Yes. Employee attendance can be managed through the HR platform.',
 6, NULL)
ON CONFLICT DO NOTHING;

-- ============================================================
-- TESTIMONIALS
-- ============================================================

INSERT INTO testimonials (client_name, company_name, role, avatar_url, message, product_name, rating, sort_order) VALUES
('Rajesh Sharma',   'Himalayan Resort & Spa',   'Managing Director',  '/testimonials/client-1.jpg',
 'ApexFlow Hospitality has completely simplified our booking and multi-property management. Our staff manages front-desk and room operations much more efficiently.',
 'ApexFlow Hospitality', 5, 1),
('Sita Thapa',      'Food & Flavor Chains',     'Business Owner',     '/testimonials/client-2.jpg',
 'ApexFlow RestroCloud''s QR table ordering and Kitchen Dispatch System sped up our food delivery workflow dramatically and increased table turnover.',
 'ApexFlow RestroCloud', 5, 2),
('Amit Karki',      'Apex Enterprise Solutions', 'HR Manager',        '/testimonials/client-3.jpg',
 'ApexFlow BioPulse made biometric attendance sync and automated monthly payroll processing completely seamless for our 300+ staff.',
 'ApexFlow BioPulse', 5, 3),
('Sunita Shrestha', 'Vertex Traders',           'Finance Director',   '/testimonials/client-1.jpg',
 'ApexFlow LedgerPro gave us complete IRD-compliant tax audit reports and real-time ledger accounting without manual calculation errors.',
 'ApexFlow LedgerPro', 5, 4),
('Bikram Adhikari', 'Horizon Group',            'CEO',               '/testimonials/client-2.jpg',
 'Integrating ApexFlow software across our corporate chain improved operational efficiency and simplified our management reporting.',
 'ApexFlow Hospitality', 5, 5),
('Priya Joshi',     'Everest Retail',           'Operations Manager', '/testimonials/client-3.jpg',
 'The system stability, real-time sync, and responsive support make ApexFlow products indispensable to our daily operations.',
 'ApexFlow RestroCloud', 5, 6)
ON CONFLICT DO NOTHING;

-- ============================================================
-- JOB POSTINGS
-- ============================================================

INSERT INTO job_postings (title, department, location, employment_type, description, requirements) VALUES
(
  'Frontend Developer',
  'Engineering',
  'Butwal, Nepal',
  'Full-time',
  'Build polished, accessible interfaces that make complex business workflows simple to use.',
  ARRAY[
    'Solid experience with React, TypeScript, and modern CSS.',
    'Understanding of responsive design and web accessibility.',
    'Comfort working with Git and collaborative development workflows.',
    '1+ years of professional frontend development experience.',
    'A strong portfolio or examples of shipped web projects.'
  ]
),
(
  'Backend Developer',
  'Engineering',
  'Butwal, Nepal',
  'Full-time',
  'Design reliable APIs and services that support the next generation of our business products.',
  ARRAY[
    'Experience with server-side development and relational databases.',
    'Knowledge of API design, authentication, and data validation.',
    'A thoughtful approach to testing and production reliability.',
    '1+ years of professional backend development experience.',
    'Experience shipping and supporting web applications.'
  ]
),
(
  'Product Designer',
  'Design',
  'Remote',
  'Full-time',
  'Turn customer needs into thoughtful product experiences through research, systems, and iteration.',
  ARRAY[
    'Strong understanding of user-centered design principles.',
    'Experience with Figma or a similar design tool.',
    'Ability to explain design decisions clearly and constructively.',
    '1+ years of product or digital design experience.',
    'A portfolio showing strong product thinking and visual craft.'
  ]
)
ON CONFLICT DO NOTHING;

-- ============================================================
-- BLOG POSTS
-- ============================================================

INSERT INTO blog_posts (title, slug, category, excerpt, content, cover_image, author_name, published_at, is_published) VALUES
(
  'Building Better Digital Workflows for Growing Businesses',
  'building-better-digital-workflows',
  'Business Technology',
  'The right digital workflow can remove friction from everyday operations and give teams more time to focus on meaningful work.',
  'Growing businesses often rely on a collection of tools that solve individual problems but do not always work well together. Over time, this creates duplicated work, disconnected information, and avoidable delays.

A thoughtful digital workflow starts with understanding how work actually moves through a team. From there, businesses can simplify handoffs, centralize important information, and automate repetitive steps without making the experience harder for people.

The most successful improvements are practical and measurable. Teams should be able to see where a process is improving and continue refining it as the business evolves.',
  '/file.svg',
  'LeafClutch Team',
  '2026-09-05 00:00:00+00',
  TRUE
),
(
  'Why Data-Driven Products Win Customer Trust',
  'why-data-driven-products-win',
  'Product Strategy',
  'Useful data is more than a reporting tool. It helps teams make clearer decisions and create products that respond to real customer needs.',
  'Data-driven product development does not mean replacing judgment with dashboards. It means combining customer insight with reliable signals so teams can make decisions with greater confidence.

Good product data answers practical questions: where users experience friction, which workflows create value, and what needs attention next. Clear measurement helps teams prioritize improvements instead of guessing.

When data is connected to a clear customer outcome, it becomes a foundation for trust. Users receive more relevant experiences, while teams can explain why a change was made and what it achieved.',
  '/file.svg',
  'Aarav Sharma',
  '2026-08-22 00:00:00+00',
  TRUE
),
(
  'Designing Software People Enjoy Using',
  'designing-software-people-enjoy-using',
  'Design & UX',
  'Simple, accessible interfaces help people complete important tasks with less effort and more confidence.',
  'Great software design begins by respecting the person using it. Interfaces should make the next step clear, communicate useful feedback, and stay out of the way when the work is already familiar.

Consistency is a powerful part of a good experience. Shared patterns, readable content, and accessible controls help users build confidence as they move through a product.

Design is also an ongoing practice. Listening to users, reviewing behavior, and improving small moments over time can create a product that feels noticeably easier to use.',
  '/file.svg',
  'Maya Thapa',
  '2026-08-10 00:00:00+00',
  TRUE
)
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- PORTFOLIO SHOWCASE  (products as portfolio items)
-- ============================================================

INSERT INTO portfolio_showcase (title, slug, category, description, image_url, badge_text, accent_color, is_featured, sort_order) VALUES
('ApexFlow Hospitality',  'apexflow-hospitality',  'Hospitality',     'Real-time booking engine and multi-property management system.', '/showcase/hospitality.webp',  'Enterprise SaaS', '#4458A1', TRUE, 1),
('ApexFlow RestroCloud',  'apexflow-restrocloud',  'Food & Beverage', 'Cloud KDS, kitchen dispatch, and QR table ordering suite.',     '/showcase/restrocloud.webp',  'Flagship POS',    '#E7212B', TRUE, 2),
('ApexFlow BioPulse',     'apexflow-biopulse',     'Workforce Tech',  'Biometric IoT sync, automated payroll, and leave management.', '/showcase/biopulse.webp',     'HR Automation',   '#10B981', TRUE, 3),
('ApexFlow LedgerPro',    'apexflow-ledgerpro',    'FinTech',         'IRD-certified double-entry accounting and tax audit system.',  '/showcase/ledgerpro.png',     'Audit Ready',     '#F59E0B', TRUE, 4)
ON CONFLICT (slug) DO NOTHING;

