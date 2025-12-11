-- Add QR code data column to ticket_confirmations table
ALTER TABLE ticket_confirmations ADD COLUMN qr_code_data JSONB;

-- Add comment explaining the column
COMMENT ON COLUMN ticket_confirmations.qr_code_data IS 'JSON data containing all ticket, student, and transaction information for QR code generation';
