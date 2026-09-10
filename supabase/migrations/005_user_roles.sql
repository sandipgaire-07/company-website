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

-- Seed default admin account into Supabase auth.users
-- Password: Admin@123456
CREATE EXTENSION IF NOT EXISTS pgcrypto;

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
  gen_random_uuid(),
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

