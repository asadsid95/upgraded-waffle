'use client'

import { TweetType, likeTweet } from "@/app/lib/supabase/getTweets"
import dayjs from "dayjs"
import { AiOutlineRetweet, AiOutlineHeart } from "react-icons/ai"
import { BsChat, BsDot, BsThreeDots } from "react-icons/bs"
import { IoStatsChart, IoShareOutline } from "react-icons/io5"
import relatveTime from 'dayjs/plugin/relativeTime'
import { useState, useTransition } from "react"
import { toast } from "sonner"
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs"

dayjs.extend(relatveTime)

type TweetProps = {
    tweet: TweetType
}
export default function Tweet({ tweet }: TweetProps) {

    const [supabase] = useState(() => createPagesBrowserClient());
    let [isTweetPending, startTransition] = useTransition()

    return (
        <div key={tweet.id} className="flex space-x-4 px-4 border-b-[0.5px] py-3">
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
                    <button onClick={() => {
                        supabase.auth.getUser().then((res) => {
                            if (res.data && res.data.user) {
                                const user = res.data.user
                                startTransition(() =>
                                    likeTweet({
                                        tweetId: tweet.id,
                                        userId: user.id
                                    }))
                            } else {
                                toast('please log in to like a tweet')
                            }
                        }).catch(() => {
                            toast.error('Authen failed')
                        })

                    }}>
                        <AiOutlineHeart />
                    </button>
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