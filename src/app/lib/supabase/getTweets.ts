'use server'

import { SupabaseClient } from "@supabase/supabase-js"
import { Database } from "../supabase.types"
import { randomUUID } from "crypto"

export type TweetType = Database['public']['Tables']['tweets'] &
{
    profiles: Pick<Database['public']['Tables']['profiles']['Row'], 'full_name' | 'username'>
}

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
    `).returns<TweetType[]>()

}

export const likeTweet = async ({
    tweetId, userId }: {
        tweetId: string,
        userId: string
    }) => {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_SECRET_KEY) {

        const supabaseServer = new SupabaseClient<Database>(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SECRET_KEY)

        const { data, error } = await supabaseServer.from('likes').insert({
            id: randomUUID(),
            tweet_id: tweetId,
            user_id: userId
        })

        console.log(data)

    }
}