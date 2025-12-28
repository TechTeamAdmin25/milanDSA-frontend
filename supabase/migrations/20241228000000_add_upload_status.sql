-- Add upload_status column to explore_posts_manager table
-- This adds post approval workflow where new posts are pending by default

-- Add the upload_status column with enum values
ALTER TABLE explore_posts_manager
ADD COLUMN upload_status TEXT NOT NULL DEFAULT 'pending'
CHECK (upload_status IN ('pending', 'approved', 'denied'));

-- Update all existing posts to approved status to maintain current visibility
UPDATE explore_posts_manager
SET upload_status = 'approved'
WHERE upload_status = 'pending' OR upload_status IS NULL;

-- Create index on upload_status for efficient filtering
CREATE INDEX idx_explore_posts_upload_status ON explore_posts_manager(upload_status);

-- Create index on upload_status and created_at for admin dashboard queries
CREATE INDEX idx_explore_posts_status_created_at ON explore_posts_manager(upload_status, created_at DESC);
