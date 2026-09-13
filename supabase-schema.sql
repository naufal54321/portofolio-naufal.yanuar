-- Portfolio Database Schema for Supabase
-- Safe to re-run (uses IF NOT EXISTS and DROP IF EXISTS)

-- Drop all existing policies first
DO $$ DECLARE
  r RECORD;
BEGIN
  FOR r IN (SELECT policyname, tablename FROM pg_policies WHERE schemaname = 'public') LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON %I', r.policyname, r.tablename);
  END LOOP;
END $$;

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  image TEXT NOT NULL DEFAULT '',
  github TEXT NOT NULL DEFAULT '',
  demo TEXT NOT NULL DEFAULT '',
  tech TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Skills table
CREATE TABLE IF NOT EXISTS skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  level INTEGER NOT NULL DEFAULT 0,
  category TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Experiences table
CREATE TABLE IF NOT EXISTS experiences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  company TEXT NOT NULL DEFAULT '',
  period TEXT NOT NULL DEFAULT '',
  description TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT '',
  avatar TEXT NOT NULL DEFAULT '',
  text TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Settings table (key-value for hero, about, contact, stats)
CREATE TABLE IF NOT EXISTS settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Insert default settings (skip if already exists)
INSERT INTO settings (key, value) VALUES
  ('hero_name', 'Muhammad Naufal Yanuar'),
  ('hero_title', 'Full Stack Web Developer'),
  ('hero_description', 'Saya mengembangkan website modern menggunakan Laravel, React, dan Tailwind CSS.'),
  ('about_bio_1', 'Mahasiswa Informatika yang memiliki minat besar dalam pengembangan aplikasi web modern.'),
  ('about_bio_2', 'Berpengalaman membangun aplikasi menggunakan Laravel, React, MySQL, Tailwind CSS, Bootstrap, dan JavaScript.'),
  ('stat_projects', '20+'),
  ('stat_websites', '5+'),
  ('stat_years', '3+'),
  ('stat_spirit', '100%'),
  ('contact_email', 'naufalm220@gmail.com'),
  ('contact_whatsapp', '+62 857-2773-2041'),
  ('contact_whatsapp_link', 'https://wa.me/6285727732041'),
  ('contact_instagram', '@naufal.ynr'),
  ('contact_instagram_link', 'https://instagram.com/naufal.ynr'),
  ('contact_github', 'naufal54321'),
  ('contact_github_link', 'https://github.com/naufal54321'),
  ('contact_linkedin', 'Muhammad Naufal Yanuar'),
  ('contact_linkedin_link', 'https://www.linkedin.com/in/muhammad-naufal-yanuar-069908373'),
  ('footer_name', 'Muhammad Naufal Yanuar'),
  ('profile_image', '/images/profile.png')
ON CONFLICT (key) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Public read skills" ON skills FOR SELECT USING (true);
CREATE POLICY "Public read experiences" ON experiences FOR SELECT USING (true);
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public read settings" ON settings FOR SELECT USING (true);

-- Authenticated write policies
CREATE POLICY "Auth insert projects" ON projects FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth update projects" ON projects FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete projects" ON projects FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Auth insert skills" ON skills FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth update skills" ON skills FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete skills" ON skills FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Auth insert experiences" ON experiences FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth update experiences" ON experiences FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete experiences" ON experiences FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Auth insert testimonials" ON testimonials FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth update testimonials" ON testimonials FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete testimonials" ON testimonials FOR DELETE USING (auth.role() = 'authenticated');

CREATE POLICY "Auth insert settings" ON settings FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Auth update settings" ON settings FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Auth delete settings" ON settings FOR DELETE USING (auth.role() = 'authenticated');
