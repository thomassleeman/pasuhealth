-- Function to check if an email exists in auth.users
-- This is used to prevent duplicate applications from users who already have accounts

CREATE OR REPLACE FUNCTION check_email_exists(email_to_check TEXT)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Check if email exists in auth.users table
  RETURN EXISTS (
    SELECT 1
    FROM auth.users
    WHERE email = email_to_check
  );
END;
$$;

-- Grant execute permission to authenticated and anonymous users
GRANT EXECUTE ON FUNCTION check_email_exists(TEXT) TO anon, authenticated;

-- Comment on function
COMMENT ON FUNCTION check_email_exists IS 'Checks if an email address already has a registered account in auth.users. Used to prevent duplicate partner applications.';
