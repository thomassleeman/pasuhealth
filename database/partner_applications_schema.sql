-- Partner Applications Table
-- Stores applications from prospective partners before they create accounts

CREATE TABLE IF NOT EXISTS partner_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company_name TEXT,
  description TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  invite_code TEXT,
  code_expires_at TIMESTAMP WITH TIME ZONE,
  reviewed_by UUID REFERENCES auth.users(id),
  reviewed_at TIMESTAMP WITH TIME ZONE,
  admin_notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for efficient querying
CREATE INDEX IF NOT EXISTS idx_partner_applications_status ON partner_applications(status);
CREATE INDEX IF NOT EXISTS idx_partner_applications_email ON partner_applications(email);
CREATE INDEX IF NOT EXISTS idx_partner_applications_created_at ON partner_applications(created_at DESC);

-- Partial unique index to prevent duplicate applications for the same email when status is pending or approved
-- This allows rejected applications to reapply
CREATE UNIQUE INDEX IF NOT EXISTS idx_partner_applications_email_active
  ON partner_applications(email)
  WHERE status IN ('pending', 'approved');

-- Row Level Security Policies
ALTER TABLE partner_applications ENABLE ROW LEVEL SECURITY;

-- Admins can read all applications
CREATE POLICY "Admins can view all partner applications"
  ON partner_applications
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admins
      WHERE admins.email = auth.jwt() ->> 'email'
    )
  );

-- Admins can update applications (for approval/rejection)
CREATE POLICY "Admins can update partner applications"
  ON partner_applications
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM admins
      WHERE admins.email = auth.jwt() ->> 'email'
    )
  );

-- Allow public insert (for application submission)
CREATE POLICY "Anyone can submit a partner application"
  ON partner_applications
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Trigger to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_partner_applications_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER partner_applications_updated_at
  BEFORE UPDATE ON partner_applications
  FOR EACH ROW
  EXECUTE FUNCTION update_partner_applications_updated_at();

-- Comment on table
COMMENT ON TABLE partner_applications IS 'Stores applications from prospective partners before account creation. Admin approves/rejects and generates time-limited invite codes.';
