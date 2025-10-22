# Supabase Database Setup for Admin Dashboard

This document outlines the database changes you need to make in Supabase to enable the admin dashboard functionality.

## Important: Check Existing Tables First

Before running any SQL, let's check what tables you already have:

```sql
-- Check if tables exist
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('partners', 'partner_orders', 'admins');
```

Run this query first and note which tables already exist. Then follow the relevant sections below.

---

## 0. Create Partners Table (if it doesn't exist)

**Only run this if the `partners` table doesn't exist yet:**

```sql
-- Create partners table
CREATE TABLE IF NOT EXISTS public.partners (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(user_id)
);

-- Enable Row Level Security
ALTER TABLE public.partners ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to read their own partner data
CREATE POLICY "Users can read own partner data"
  ON public.partners
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy to allow users to insert their own partner data
CREATE POLICY "Users can insert own partner data"
  ON public.partners
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy to allow admins to read all partner data
CREATE POLICY "Admins can read all partners"
  ON public.partners
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.admins
      WHERE admins.email = auth.jwt() ->> 'email'
    )
  );
```

## 0b. Create or Update Partner Orders Table

If the `partner_orders` table doesn't exist yet, create it:

```sql
-- Create partner_orders table
CREATE TABLE IF NOT EXISTS public.partner_orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  partner_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  course_slug TEXT NOT NULL,
  course_title TEXT NOT NULL,
  customer_organisation TEXT NOT NULL,
  customer_first_name TEXT NOT NULL,
  customer_last_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_job_title TEXT NOT NULL,
  participant_count INTEGER NOT NULL,
  sessions_needed INTEGER NOT NULL,
  price_per_session DECIMAL(10, 2) NOT NULL,
  total_price DECIMAL(10, 2) NOT NULL,
  partner_commission DECIMAL(10, 2) NOT NULL,
  preferred_start_date DATE NOT NULL,
  special_requirements TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  admin_notes TEXT,
  status_history JSONB DEFAULT '[]'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.partner_orders ENABLE ROW LEVEL SECURITY;

-- Policy to allow partners to read their own orders
CREATE POLICY "Partners can read own orders"
  ON public.partner_orders
  FOR SELECT
  TO authenticated
  USING (auth.uid() = partner_id);

-- Policy to allow partners to insert their own orders
CREATE POLICY "Partners can insert own orders"
  ON public.partner_orders
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = partner_id);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_partner_orders_updated_at BEFORE UPDATE ON public.partner_orders
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## 1. Create Admins Table

Run this SQL in the Supabase SQL Editor:

```sql
-- Create admins table
CREATE TABLE IF NOT EXISTS public.admins (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.admins ENABLE ROW LEVEL SECURITY;

-- Create policy to allow authenticated users to read admin table
CREATE POLICY "Allow authenticated users to read admins"
  ON public.admins
  FOR SELECT
  TO authenticated
  USING (true);

-- Insert your admin email
INSERT INTO public.admins (email)
VALUES ('contact@pasuhealth.com');
```

## 2. Update Partner Orders Table

Run this SQL to add new columns and update the status enum:

```sql
-- Add new columns to partner_orders table
ALTER TABLE public.partner_orders
ADD COLUMN IF NOT EXISTS admin_notes TEXT,
ADD COLUMN IF NOT EXISTS status_history JSONB DEFAULT '[]'::jsonb;

-- You'll need to update the status column type to include 'paid'
-- First, check if you have an enum type or just using text
-- If using text, no change needed
-- If using an enum, you'll need to add the new value:

-- Check current type (run this to see):
SELECT column_name, data_type, udt_name
FROM information_schema.columns
WHERE table_name = 'partner_orders' AND column_name = 'status';

-- If it's an enum type, add the 'paid' value:
-- ALTER TYPE order_status_enum ADD VALUE IF NOT EXISTS 'paid';
-- (Replace 'order_status_enum' with your actual enum type name)

-- If it's just text, you're all set! The application will handle the validation.
```

## 3. Initialize Status History for Existing Orders (Optional)

If you have existing orders, you can initialize their status history:

```sql
-- Initialize status_history for existing orders
UPDATE public.partner_orders
SET status_history = jsonb_build_array(
  jsonb_build_object(
    'status', status,
    'timestamp', created_at::text
  )
)
WHERE status_history IS NULL OR status_history = '[]'::jsonb;
```

## 4. Row Level Security Policies

Ensure your RLS policies allow admins to update orders:

```sql
-- Policy to allow admins full access to partner_orders
CREATE POLICY "Admins can update all orders"
  ON public.partner_orders
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.admins
      WHERE admins.email = auth.jwt() ->> 'email'
    )
  );

-- Policy to allow admins to read all orders
CREATE POLICY "Admins can read all orders"
  ON public.partner_orders
  FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.admins
      WHERE admins.email = auth.jwt() ->> 'email'
    )
  );
```

## 5. Verify Setup

After running these commands, verify:

1. ✅ `admins` table exists with your email
2. ✅ `partner_orders` table has `admin_notes` and `status_history` columns
3. ✅ Status column accepts 5 values: pending, approved, completed, paid, cancelled
4. ✅ RLS policies allow admins to read and update orders

## Testing

1. Sign up/login with the email `contact@pasuhealth.com`
2. Navigate to `/admin/partner-orders`
3. You should see the admin dashboard
4. Try updating an order status and verify:
   - Status updates in database
   - Partner receives email notification
   - Status history is recorded

## Adding More Admins

To add additional admin users:

```sql
INSERT INTO public.admins (email)
VALUES ('another-admin@pasuhealth.com')
ON CONFLICT (email) DO NOTHING;
```

---

## Troubleshooting

### Error: "Could not find a relationship between 'partner_orders' and 'partners'"

This error means the foreign key relationship isn't set up properly. Fix it by running:

```sql
-- Check current foreign keys on partner_orders
SELECT
    tc.table_name,
    kcu.column_name,
    ccu.table_name AS foreign_table_name,
    ccu.column_name AS foreign_column_name
FROM information_schema.table_constraints AS tc
JOIN information_schema.key_column_usage AS kcu
  ON tc.constraint_name = kcu.constraint_name
  AND tc.table_schema = kcu.table_schema
JOIN information_schema.constraint_column_usage AS ccu
  ON ccu.constraint_name = tc.constraint_name
  AND ccu.table_schema = tc.table_schema
WHERE tc.constraint_type = 'FOREIGN KEY'
  AND tc.table_name = 'partner_orders';
```

If `partner_id` doesn't reference anything, or if the tables don't exist, run sections 0 and 0b above.

### Partners table exists but no data shows up

Make sure partners are being created when users sign up. You might need a database trigger:

```sql
-- Automatically create partner record when user signs up
CREATE OR REPLACE FUNCTION public.handle_new_partner_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.partners (user_id, first_name, last_name, email)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name',
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger the function every time a user signs up
DROP TRIGGER IF EXISTS on_auth_user_created_partner ON auth.users;
CREATE TRIGGER on_auth_user_created_partner
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_partner_user();
```

### Check what data exists

```sql
-- See all partners
SELECT * FROM public.partners;

-- See all orders
SELECT * FROM public.partner_orders;

-- See all admins
SELECT * FROM public.admins;
```
