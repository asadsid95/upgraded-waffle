'use server'

import { TweetType } from "@/app/lib/supabase/queries"
import dayjs from "dayjs"
import { AiOutlineRetweet, AiOutlineHeart } from "react-icons/ai"
import { BsChat, BsDot, BsThreeDots } from "react-icons/bs"
import { IoStatsChart, IoShareOutline } from "react-icons/io5"
import relatveTime from 'dayjs/plugin/relativeTime'
import { useState, useTransition } from "react"
import { toast } from "sonner"
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs"
import { likeTweet } from "@/app/lib/supabase/mutation"
import LikeButton from "./like-button"

dayjs.extend(relatveTime)

type TweetProps = {
    tweet: any
}
export default async function Tweet({ tweet }: TweetProps) {

    return (
        <div className="flex space-x-4 px-4 border-b-[0.5px] py-3">
            <div className='rounded-full bg-red-500 w-12 h-12 flex-none'></div>

            <div className='flex flex-col space-y-2'>
                <div className=' text-sm flex space-x-1 items-center justify-between'>
                    <div className="flex items-center space-x-1 w-full">
                        <div className='font-bold'>{tweet.profiles.full ?? ""}</div>
                        <div className='text-gray-500'>@{tweet.profiles.username}</div>
                        <div>
                            <BsDot />
                        </div>
                        <div className=''>{dayjs(tweet.created_at).fromNow()}</div>
                    </div>
                    <div>
                        <BsThreeDots />
                    </div>
                </div>

                <div className="text-sm">
                    {tweet.text}
                </div>
                <div className="bg-gray-400 aspect-square w-full h-96 rounded-xl">
                    Tweet
                </div>

                <div className="flex items-center justify-around space-x-2 w-full pb-2">
                    <div className="hover:bg-black/20">
                        <BsChat />
                    </div>
                    <div>
                        <AiOutlineRetweet />
                    </div>
                    <LikeButton tweetId={tweet.id} />
                    <div>
                        <IoStatsChart />
                    </div>
                    <div>
                        <IoShareOutline />
                    </div>
                </div>

            </div>
        </div>
    )
}