import { SupabaseClient } from "@supabase/supabase-js"

export const supabaseServer = new SupabaseClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SECRET_KEY)