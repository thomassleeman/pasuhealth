-- Add code_used_at column to partner_applications table
-- This tracks when an invite code has been used for registration

ALTER TABLE partner_applications
ADD COLUMN IF NOT EXISTS code_used_at TIMESTAMP WITH TIME ZONE;

-- Add index for efficient querying of unused codes
CREATE INDEX IF NOT EXISTS idx_partner_applications_code_used_at
  ON partner_applications(code_used_at);

-- Comment on column
COMMENT ON COLUMN partner_applications.code_used_at IS 'Timestamp when the invite code was used to create a partner account. NULL means code has not been used yet.';
