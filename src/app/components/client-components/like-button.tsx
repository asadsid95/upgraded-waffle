'use client'

import { likeTweet } from "@/app/lib/supabase/mutation";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { startTransition, useState, useTransition } from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { toast } from "sonner";

type LikeButtonProps = {
    tweetId: string;
    likesCount: number
}

export default function LikeButton({ tweetId, likesCount }: LikeButtonProps) {

    console.log(likesCount)
    const [supabase] = useState(() => createPagesBrowserClient());
    let [isTweetPending, startTransition] = useTransition()

    return (
        <button onClick={() => {
            supabase.auth.getUser().then((res) => {
                if (res.data && res.data.user) {
                    const user = res.data.user
                    startTransition(() =>
                        likeTweet({
                            tweetId,
                            userId: user.id
                        }))
                } else {
                    toast('please log in to like a tweet')
                }
            }).catch(() => {
                toast.error('Authen failed')
            })

        }}>
            <span>{likesCount.count}</span>
            <AiOutlineHeart />
        </button>
    )
}