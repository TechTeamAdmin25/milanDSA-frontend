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
    console.log('Applying upload_status migration...');

    // Execute each SQL statement separately
    const statements = [
      `ALTER TABLE explore_posts_manager ADD COLUMN upload_status TEXT NOT NULL DEFAULT 'pending' CHECK (upload_status IN ('pending', 'approved', 'denied'))`,
      `UPDATE explore_posts_manager SET upload_status = 'approved' WHERE upload_status = 'pending' OR upload_status IS NULL`,
      `CREATE INDEX idx_explore_posts_upload_status ON explore_posts_manager(upload_status)`,
      `CREATE INDEX idx_explore_posts_status_created_at ON explore_posts_manager(upload_status, created_at DESC)`
    ];

    for (let i = 0; i < statements.length; i++) {
      console.log(`Executing statement ${i + 1}/${statements.length}...`);
      const { error } = await supabase.rpc('exec_sql', { sql: statements[i] });

      if (error) {
        console.error(`Error executing statement ${i + 1}:`, error);
        // Continue with other statements even if one fails
      }
    }

    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

applyMigration();
