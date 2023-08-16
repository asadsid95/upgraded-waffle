'use server'

import { randomUUID } from "crypto"
import { supabaseServer } from "."
import { revalidatePath } from "next/cache"

export const likeTweet = async ({
    tweetId, userId }: {
        tweetId: string,
        userId: string
    }) => {


    const { data, error } = await supabaseServer.from('likes').insert({
        id: randomUUID(),
        tweet_id: tweetId,
        user_id: userId
    })
    revalidatePath('/')

    // console.log(data)

}

export const unlikeTweet = async ({
    tweetId, userId }: {
        tweetId: string,
        userId: string
    }) => {


    const { data, error } = await supabaseServer.from('likes').delete().eq('tweet_id', tweetId).eq('user_id', userId)

    revalidatePath('/')
    // console.log(data)

}


export const reply = async ({ tweetId, userId, replyText }: { tweetId: string, userId: string, replyText: string }) => {

    // able to verify/check replyText is truthy

    if (replyText == "") return 101010100
    var id = randomUUID()

    const { data, error } = await supabaseServer.from('replies').insert({
        text: replyText,
        user_id: userId,
        tweet_id: tweetId,
        id: id,
        reply_id: id
    })


    return { data, error }
}