-- ============================================================
-- SINGLE ADMIN USER SETUP
-- All admin actions are controlled by one Admin user.
-- ============================================================

CREATE TABLE IF NOT EXISTS admin_user (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE admin_user ENABLE ROW LEVEL SECURITY;

-- Allow public read of admin email to verify who is the admin
CREATE POLICY "Public read admin_user" ON admin_user FOR SELECT USING (true);

-- Seed initial single admin user email
INSERT INTO admin_user (email) VALUES ('admin@nctsoft.com.np')
ON CONFLICT (email) DO NOTHING;
