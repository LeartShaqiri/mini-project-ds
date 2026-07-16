import { createClient, type SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key'

let supabaseInstance: SupabaseClient | null = null

function getSupabase(): SupabaseClient | null {
  if (supabaseInstance) return supabaseInstance
  try {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey)
    return supabaseInstance
  } catch {
    console.warn('Supabase not configured. Running without backend.')
    return null
  }
}

export const supabase = getSupabase()
