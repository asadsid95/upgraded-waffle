'use server'

import { Database } from "../supabase.types"
import { supabaseServer } from "."
import { pool } from "../db"

export type TweetType = Database['public']['Tables']['tweets'] &
{
    profiles: Pick<Database['public']['Tables']['profiles']['Row'], 'full_name' | 'username'>
}

const queryWithCurrentUserId = `SELECT
    t.*,
    profiles.username, profiles.full_name,
    COUNT(l.id) AS likes_count,
    EXISTS (
        SELECT 1
        FROM likes
        WHERE user_id = $1 
        AND tweet_id = t.id
    ) AS user_has_liked
    FROM tweets t
    LEFT JOIN likes l ON t.id = l.tweet_id
    JOIN profiles ON t.profile_id = profiles.id
    GROUP BY t.id, profiles.username, profiles.full_name
    ORDER BY t.created_at DESC;
`

const queryWithoutCurrentUserId = `SELECT
t.*,
profiles.username, profiles.full_name,
COUNT(l.id) AS likes_count
FROM tweets t
LEFT JOIN likes l ON t.id = l.tweet_id
JOIN profiles ON t.profile_id = profiles.id
GROUP BY t.id, profiles.username, profiles.full_name
ORDER BY t.created_at DESC;`

export const getTweets = async (currentUserID: string) => {

    let query = pool.query(queryWithoutCurrentUserId)

    if (currentUserID) {
        query = pool.query(queryWithCurrentUserId, [currentUserID])
    }

    try {
        const res = await query
        return { data: res.rows }
    } catch (error) {
        console.log(error.message)
    }

    // pool.end()



    // return await supabaseServer.from('tweets').select(`
    // *, profiles(
    //     full_name, 
    //     username
    //     )
    // `).returns<TweetType[]>()

}

export const getLikesCount = async (tweetId: string) => {
    const res = await supabaseServer.from('likes').select('id', { count: 'exact' }).eq('tweet_id', tweetId)
    // console.log(res)

    return res
}

export const isLiked = async ({
    tweetId, userId
}: {
    tweetId: String;
    userId?: string
}) => {

    if (!userId) return false

    const { data, error } = await supabaseServer
        .from('likes')
        .select("id")
        .eq("tweet_id", tweetId)
        .eq("user_id", userId).single()

    return Boolean(data?.id)

}