import { createClient } from '@supabase/supabase-js';

// Hardcoded for this migration - replace with your actual values
const supabaseUrl = 'https://mzgbitcwtsjpxhwgkylw.supabase.co';
const supabaseServiceKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im16Z2JpdGN3dHNqcHhod2dreWx3Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NDc5NDI4OSwiZXhwIjoyMDgwMzcwMjg5fQ.B96t_fTHmxwLtwuMlISLvEw5UPFcoUJLq6sYA8TJoZs';

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function applyMigration() {
  try {
    console.log('Applying upload_status migration using direct SQL...');

    // First, let's check if the column already exists
    const { data: existingColumns, error: checkError } = await supabase
      .from('information_schema.columns')
      .select('column_name')
      .eq('table_name', 'explore_posts_manager')
      .eq('column_name', 'upload_status');

    if (checkError) {
      console.error('Error checking column existence:', checkError);
    }

    if (existingColumns && existingColumns.length > 0) {
      console.log('upload_status column already exists. Skipping migration.');
      return;
    }

    // Execute the migration SQL directly
    const migrationSQL = `
      -- Add the upload_status column with enum values
      ALTER TABLE explore_posts_manager
      ADD COLUMN upload_status TEXT NOT NULL DEFAULT 'pending'
      CHECK (upload_status IN ('pending', 'approved', 'denied'));

      -- Update all existing posts to approved status to maintain current visibility
      UPDATE explore_posts_manager
      SET upload_status = 'approved'
      WHERE upload_status = 'pending' OR upload_status IS NULL;
    `;

    console.log('Executing migration SQL...');

    // Try to execute via raw SQL if available
    try {
      // This might not work, but let's try
      await supabase.rpc('sql', { query: migrationSQL });
    } catch (e) {
      console.log('RPC method not available, trying alternative approach...');

      // Alternative: Try to add column using a more direct approach
      // Since we can't execute raw DDL through the client, let's try a different strategy

      console.log('Migration cannot be applied via client. Please run this SQL manually in Supabase dashboard:');
      console.log('\n' + migrationSQL);
      console.log('\nAlso create these indexes:');
      console.log('CREATE INDEX idx_explore_posts_upload_status ON explore_posts_manager(upload_status);');
      console.log('CREATE INDEX idx_explore_posts_status_created_at ON explore_posts_manager(upload_status, created_at DESC);');

      return;
    }

    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

applyMigration();
