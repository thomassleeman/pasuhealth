-- Migration: Fix RLS policy for partner applications
-- This ensures anonymous users can submit applications

-- Drop existing INSERT policy if it exists
DROP POLICY IF EXISTS "Anyone can submit a partner application" ON partner_applications;

-- Recreate the INSERT policy to allow both anonymous and authenticated users
CREATE POLICY "Anyone can submit a partner application"
  ON partner_applications
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Verify RLS is enabled
ALTER TABLE partner_applications ENABLE ROW LEVEL SECURITY;
