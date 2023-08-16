'use client'

import dayjs from "dayjs"
import { AiOutlineRetweet, AiOutlineHeart } from "react-icons/ai"
import { BsChat, BsDot, BsThreeDots } from "react-icons/bs"
import { IoStatsChart, IoShareOutline } from "react-icons/io5"
import relatveTime from 'dayjs/plugin/relativeTime'
import LikeButton from "./like-button"
import { getLikesCount, isLiked } from "@/app/lib/supabase/queries"
import { DialogTrigger, Dialog, DialogContent } from "../ui/dialog"
import ReplyDialog from "./reply-dialog"
import { Toaster } from "sonner"


dayjs.extend(relatveTime)

type TweetProps = {
    tweet: any,
    userId?: any
}

// eslint-disable-next-line @next/next/no-async-client-component
export default async function Tweet({ tweet, userId }: TweetProps) {

    // const getTweetLikesCount = await getLikesCount(tweet.id)

    // const isUserHasLiked = await isLiked({
    //     tweetId: tweet.id,
    //     userId: userId
    // })

    return (

        <>
            <Toaster />
            <div className="flex space-x-4 px-4 border-b-[0.5px] py-3">
                <div className='rounded-full bg-gray-500 w-12 h-12 flex-none'></div>

                <div className='flex flex-col space-y-2'>
                    <div className=' text-sm flex space-x-1 items-center justify-between'>
                        <div className="flex items-center space-x-1 w-full">
                            <div className='font-bold'>{tweet.full_name ?? "Test User"}</div>
                            <div className='text-gray-500'>@{tweet.username}</div>
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
                            <ReplyDialog tweet={tweet} />
                        </div>
                        <div>
                            <AiOutlineRetweet />
                        </div>
                        <LikeButton
                            tweetId={tweet.id}
                            likesCount={tweet.likes_count}
                            isUserHasLiked={tweet.user_has_liked}
                        />
                        <div>
                            <IoStatsChart />
                        </div>
                        <div>
                            <IoShareOutline />
                        </div>
                    </div>

                </div>
            </div>
        </>
    )
}