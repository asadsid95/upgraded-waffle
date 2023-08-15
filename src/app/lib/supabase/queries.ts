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

export const getLikesCount = async (tweetId: string) => {
    const res = await supabaseServer.from('likes').select('count(*)').eq('tweet_id', tweetId)
    console.log(res)
    return res
}