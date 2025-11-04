-- Migration: Add partial unique index for email on active applications
-- This prevents duplicate applications for the same email when status is pending or approved
-- Allows rejected applications to reapply

-- Add the partial unique index
CREATE UNIQUE INDEX IF NOT EXISTS idx_partner_applications_email_active
  ON partner_applications(email)
  WHERE status IN ('pending', 'approved');

-- Add comment explaining the constraint
COMMENT ON INDEX idx_partner_applications_email_active IS 'Ensures email uniqueness for pending and approved applications. Rejected applications can reapply.';
