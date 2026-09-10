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

-- Auto-sync any user created in Supabase Dashboard (auth.users) into admin_user table
INSERT INTO admin_user (email)
SELECT email FROM auth.users
WHERE email IS NOT NULL
ON CONFLICT (email) DO NOTHING;

-- Automatic trigger to sync future users created in Supabase Dashboard
CREATE OR REPLACE FUNCTION public.handle_new_admin_user()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.email IS NOT NULL THEN
    INSERT INTO public.admin_user (email)
    VALUES (NEW.email)
    ON CONFLICT (email) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created_admin ON auth.users;
CREATE TRIGGER on_auth_user_created_admin
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_admin_user();


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

