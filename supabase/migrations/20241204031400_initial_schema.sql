-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create custom types
CREATE TYPE pass_status AS ENUM ('available', 'sold', 'reserved');
CREATE TYPE event_type AS ENUM ('pro_show', 'workshop', 'competition', 'general');

-- Create events table
CREATE TABLE events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  event_type event_type NOT NULL DEFAULT 'general',
  venue VARCHAR(255),
  event_date TIMESTAMP WITH TIME ZONE,
  duration_minutes INTEGER,
  max_capacity INTEGER,
  price DECIMAL(10,2),
  image_url VARCHAR(500),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create passes table
CREATE TABLE passes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  pass_number VARCHAR(50) UNIQUE NOT NULL,
  status pass_status DEFAULT 'available',
  price DECIMAL(10,2) NOT NULL,
  seat_section VARCHAR(100),
  seat_row VARCHAR(50),
  seat_number VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create users table (extends Supabase auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255),
  phone VARCHAR(20),
  college_name VARCHAR(255),
  student_id VARCHAR(100),
  year_of_study VARCHAR(50),
  avatar_url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create bookings table
CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  pass_id UUID REFERENCES passes(id) ON DELETE CASCADE,
  booking_reference VARCHAR(100) UNIQUE NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  payment_status VARCHAR(50) DEFAULT 'pending',
  payment_method VARCHAR(100),
  payment_id VARCHAR(255),
  booking_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, pass_id)
);

-- Create indexes for better performance
CREATE INDEX idx_events_event_date ON events(event_date);
CREATE INDEX idx_events_event_type ON events(event_type);
CREATE INDEX idx_passes_event_id ON passes(event_id);
CREATE INDEX idx_passes_status ON passes(status);
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_pass_id ON bookings(pass_id);
CREATE INDEX idx_bookings_booking_reference ON bookings(booking_reference);

-- Enable Row Level Security
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE passes ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Events: Anyone can read active events
CREATE POLICY "Anyone can view active events" ON events
  FOR SELECT USING (is_active = true);

-- Events: Only authenticated users can manage events (admin functionality)
CREATE POLICY "Authenticated users can manage events" ON events
  FOR ALL USING (auth.role() = 'authenticated');

-- Passes: Anyone can view available passes
CREATE POLICY "Anyone can view available passes" ON passes
  FOR SELECT USING (status = 'available');

-- Passes: Only authenticated users can manage passes
CREATE POLICY "Authenticated users can manage passes" ON passes
  FOR ALL USING (auth.role() = 'authenticated');

-- Profiles: Users can view and update their own profile
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);

-- Profiles: Anyone can insert (for registration)
CREATE POLICY "Anyone can create profile" ON profiles
  FOR INSERT WITH CHECK (true);

-- Bookings: Users can view their own bookings
CREATE POLICY "Users can view own bookings" ON bookings
  FOR SELECT USING (auth.uid() = user_id);

-- Bookings: Users can create bookings for themselves
CREATE POLICY "Users can create own bookings" ON bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create functions for updating updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON events
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_passes_updated_at
  BEFORE UPDATE ON passes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data for MILAN 26'
INSERT INTO events (name, description, event_type, venue, event_date, duration_minutes, max_capacity, price, image_url) VALUES
('Thaman Live in Concert', 'Experience the musical maestro Thaman S in an electrifying live performance at MILAN 26!', 'pro_show', 'Main Stage', '2026-02-15 19:00:00+05:30', 180, 5000, 1500.00, '/ProShowPasses/Thaman/ThamanFullTransparent.png'),
('Thriple Live Performance', 'Get ready for an unforgettable night with Thriple at MILAN 26!', 'pro_show', 'Main Stage', '2026-02-16 19:00:00+05:30', 150, 5000, 1200.00, '/ProShowPasses/Thriple/ThripleFullTransparent.png');

-- Generate sample passes for the events
-- Thaman passes
INSERT INTO passes (event_id, pass_number, price, seat_section)
SELECT
  (SELECT id FROM events WHERE name = 'Thaman Live in Concert'),
  'THAMAN-' || LPAD(ROW_NUMBER() OVER ()::text, 4, '0'),
  1500.00,
  CASE
    WHEN ROW_NUMBER() OVER () <= 1000 THEN 'VIP'
    WHEN ROW_NUMBER() OVER () <= 3000 THEN 'Gold'
    ELSE 'Silver'
  END
FROM generate_series(1, 5000);

-- Thriple passes
INSERT INTO passes (event_id, pass_number, price, seat_section)
SELECT
  (SELECT id FROM events WHERE name = 'Thriple Live Performance'),
  'THRIPLE-' || LPAD(ROW_NUMBER() OVER ()::text, 4, '0'),
  1200.00,
  CASE
    WHEN ROW_NUMBER() OVER () <= 1000 THEN 'VIP'
    WHEN ROW_NUMBER() OVER () <= 3000 THEN 'Gold'
    ELSE 'Silver'
  END
FROM generate_series(1, 5000);
