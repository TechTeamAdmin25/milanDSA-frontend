-- Create operator_data table
CREATE TABLE operator_data (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  username VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  station_number INTEGER NOT NULL,
  printed_tickets INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RSVP status enum
CREATE TYPE rsvp_status AS ENUM ('pending', 'ready', 'printed');

-- Create rsvp_confirmations table
CREATE TABLE rsvp_confirmations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  registration_number VARCHAR(100) NOT NULL,
  email VARCHAR(255) NOT NULL,
  ticket_reference VARCHAR(100) NOT NULL UNIQUE,
  event_name VARCHAR(255) NOT NULL,
  rsvp_status rsvp_status DEFAULT 'ready',
  printed_by UUID REFERENCES operator_data(id) ON DELETE SET NULL,
  printed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT fk_ticket_reference FOREIGN KEY (ticket_reference) REFERENCES ticket_confirmations(booking_reference) ON DELETE CASCADE
);

-- Create indexes for better performance
CREATE INDEX idx_operator_username ON operator_data(username);
CREATE INDEX idx_rsvp_ticket_reference ON rsvp_confirmations(ticket_reference);
CREATE INDEX idx_rsvp_registration_number ON rsvp_confirmations(registration_number);
CREATE INDEX idx_rsvp_status ON rsvp_confirmations(rsvp_status);
CREATE INDEX idx_rsvp_full_name ON rsvp_confirmations(full_name);

-- Create trigger for updated_at on operator_data
CREATE TRIGGER update_operator_data_updated_at
  BEFORE UPDATE ON operator_data
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Create trigger for updated_at on rsvp_confirmations
CREATE TRIGGER update_rsvp_confirmations_updated_at
  BEFORE UPDATE ON rsvp_confirmations
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security
ALTER TABLE operator_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE rsvp_confirmations ENABLE ROW LEVEL SECURITY;

-- Create policies for operator_data
-- Operators can read their own data
CREATE POLICY "Operators can view own data" ON operator_data
  FOR SELECT USING (true);

-- Operators can update their own data
CREATE POLICY "Operators can update own data" ON operator_data
  FOR UPDATE USING (true);

-- Create policies for rsvp_confirmations
-- Anyone can read RSVP confirmations (for operator dashboard)
CREATE POLICY "Anyone can view RSVP confirmations" ON rsvp_confirmations
  FOR SELECT USING (true);

-- Anyone can insert RSVP confirmations (for student RSVP)
CREATE POLICY "Anyone can create RSVP confirmations" ON rsvp_confirmations
  FOR INSERT WITH CHECK (true);

-- Anyone can update RSVP confirmations (for operator printing)
CREATE POLICY "Anyone can update RSVP confirmations" ON rsvp_confirmations
  FOR UPDATE USING (true);
