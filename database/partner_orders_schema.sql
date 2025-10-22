-- Create partner_orders table for storing training order submissions

CREATE TABLE IF NOT EXISTS partner_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  partner_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

  -- Course details
  course_slug TEXT NOT NULL,
  course_title TEXT NOT NULL,

  -- Customer details
  customer_organisation TEXT NOT NULL,
  customer_first_name TEXT NOT NULL,
  customer_last_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  customer_job_title TEXT NOT NULL,

  -- Order details
  participant_count INTEGER NOT NULL CHECK (participant_count > 0),
  sessions_needed INTEGER NOT NULL CHECK (sessions_needed > 0),
  price_per_session DECIMAL(10, 2) NOT NULL CHECK (price_per_session > 0),
  total_price DECIMAL(10, 2) NOT NULL CHECK (total_price > 0),
  partner_commission DECIMAL(10, 2) NOT NULL CHECK (partner_commission >= 0),

  -- Scheduling
  preferred_start_date DATE NOT NULL,
  special_requirements TEXT,

  -- Status tracking
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'completed', 'cancelled')),

  -- Timestamps
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_partner_orders_partner_id ON partner_orders(partner_id);
CREATE INDEX IF NOT EXISTS idx_partner_orders_status ON partner_orders(status);
CREATE INDEX IF NOT EXISTS idx_partner_orders_created_at ON partner_orders(created_at DESC);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_partner_orders_updated_at
  BEFORE UPDATE ON partner_orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE partner_orders ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Partners can view their own orders
CREATE POLICY "Partners can view own orders"
  ON partner_orders
  FOR SELECT
  USING (auth.uid() = partner_id);

-- Partners can create their own orders
CREATE POLICY "Partners can create own orders"
  ON partner_orders
  FOR INSERT
  WITH CHECK (auth.uid() = partner_id);

-- Partners can update their own pending orders
CREATE POLICY "Partners can update own pending orders"
  ON partner_orders
  FOR UPDATE
  USING (auth.uid() = partner_id AND status = 'pending')
  WITH CHECK (auth.uid() = partner_id);

-- Add comments for documentation
COMMENT ON TABLE partner_orders IS 'Stores training order submissions from partners';
COMMENT ON COLUMN partner_orders.partner_id IS 'References the partner who submitted the order';
COMMENT ON COLUMN partner_orders.status IS 'Order status: pending (awaiting review), approved (confirmed), completed (training delivered), cancelled';
COMMENT ON COLUMN partner_orders.partner_commission IS 'Commission amount for the partner (15% of total price)';
