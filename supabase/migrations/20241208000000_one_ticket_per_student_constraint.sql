-- Add constraint to ensure only one completed ticket per student
-- This creates a partial unique index that only applies to completed tickets

CREATE UNIQUE INDEX idx_unique_completed_ticket_per_student
ON ticket_confirmations (email)
WHERE payment_status = 'completed';

-- Add a comment explaining the constraint
COMMENT ON INDEX idx_unique_completed_ticket_per_student IS 'Ensures only one completed ticket per student email';
