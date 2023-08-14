import { SupabaseClient } from "@supabase/supabase-js"
import { Database } from "../supabase.types"

export const getTweets = async () => {

    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SECRET_KEY) {
        return { error: { message: "supa base credentials not provided!" } as any }
    }

    const supabaseServer = new SupabaseClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SECRET_KEY)
    return await supabaseServer.from('tweets').select(`
    *, profiles(
        full_name, 
        username
        )
    `).returns<(Database['public']['Tables']['tweets'] &
    { profiles: Pick<Database['public']['Tables']['profiles']['Row'], 'full_name' | 'username'> })[]>()

}