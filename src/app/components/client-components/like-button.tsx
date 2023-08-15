'use client'

import { likeTweet, unlikeTweet } from "@/app/lib/supabase/mutation";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { startTransition, useState, useTransition } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { toast } from "sonner";

type LikeButtonProps = {
    tweetId: string;
    likesCount: any
    isUserHasLiked: boolean
}

export default function LikeButton({ tweetId, likesCount, isUserHasLiked }: LikeButtonProps) {

    console.log(likesCount)
    const [supabase] = useState(() => createPagesBrowserClient());
    let [isTweetPending, startTransition] = useTransition()

    return (
        <button onClick={() => {
            supabase.auth.getUser().then((res) => { // POI
                if (res.data && res.data.user) {
                    const user = res.data.user
                    startTransition(() =>
                        isUserHasLiked ? unlikeTweet({
                            tweetId,
                            userId: user.id
                        }) : likeTweet({
                            tweetId,
                            userId: user.id
                        }))
                } else {
                    toast('please log in to like a tweet')
                }
            }).catch(() => {
                toast.error('Authen failed')
            })

        }} className="flex items-center space-x-2">
            {
                isUserHasLiked ? <AiFillHeart className='text-rose-600' /> : <AiOutlineHeart />
            }
            <span>{likesCount ?? 0}</span>
        </button>
    )
}