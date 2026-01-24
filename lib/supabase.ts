
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

let supabase: ReturnType<typeof createClient> | undefined

if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
  if (typeof window !== 'undefined') {
    console.log('✅ Supabase initialized in REAL mode')
  }
} else {
  if (typeof window !== 'undefined') {
    console.warn('⚠️ Supabase credentials missing! Falling back to MOCK mode.')
  }
}

export { supabase }
