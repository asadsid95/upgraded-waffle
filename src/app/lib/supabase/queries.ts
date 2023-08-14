'use server'

import { Database } from "../supabase.types"
import { supabaseServer } from "."

export type TweetType = Database['public']['Tables']['tweets'] &
{
    profiles: Pick<Database['public']['Tables']['profiles']['Row'], 'full_name' | 'username'>
}

export const getTweets = async () => {

    return await supabaseServer.from('tweets').select(`
    *, profiles(
        full_name, 
        username
        )
    `).returns<TweetType[]>()

}
