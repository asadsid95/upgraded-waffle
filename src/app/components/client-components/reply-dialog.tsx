'use client'

import { Dialog, DialogTrigger, DialogContent } from "../ui/dialog"
import { BsChat, BsDot, BsThreeDots } from "react-icons/bs"
import dayjs from "dayjs"
import { Input } from "../ui/input"
import { useState, useTransition } from "react"
import { useSupabase } from "@/app/supabase.provider"
import { toast } from "sonner"
import { reply } from "@/app/lib/supabase/mutation"

type ReplyDialogProps = {
    tweet: any
    // {
    //     userProfile: Profile;
    //     tweetDetails: Tweet
    // }
}

export default function ReplyDialog({ tweet }: ReplyDialogProps) {

    const [isReplyDialogOpen, setIsReplyDialogOpen] = useState(false)

    const [replyText, setReplyText] = useState('')
    let [isReplyPending, startTransition] = useTransition()
    const { supabase } = useSupabase()


    return (
        <Dialog onOpenChange={setIsReplyDialogOpen} open={isReplyDialogOpen}>
            <DialogTrigger asChild>
                <button
                    onClick={() => { }}
                    className="rounded-full hover:bg-white/30 transition duration-200 p-3 cursor-pointer hover:border-none">

                    <BsChat />
                </button>

            </DialogTrigger>
            <DialogContent className="bg-black border-none text-white sm:max-w-lg">
                <div className="flex space-x-4 px-4 border-b-[0.5px] py-3">

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

                        <div className="text-sm my-8">
                            {tweet.text}
                        </div>

                    </div>
                </div>
                <div>Replying to <span className="text-blue-500 underline underline-offset-6 cursor-pointer">@{tweet.username}</span>
                </div>

                <div className="flex items-center space-x-3">
                    <div className='rounded-full bg-gray-500 w-12 h-12 flex-none'></div>

                    <textarea onChange={(e) => { setReplyText(e.target.value) }} className="w-full h-full bg-gray-800 border-b-[0.5px] bg-white/20 rounded-md border-gray-400 pb-4 outline-none border-none" />


                </div>
                <div className="w-full justify-end items-center flex pt-2">
                    <div className="w-full max-w-[100px] ">
                        <button
                            onClick={() => {
                                supabase.auth.getUser().then((res) => { // POI
                                    if (res.data && res.data.user) {
                                        const user = res.data.user
                                        // insert row into reply table with data
                                        startTransition(() => {
                                            reply({
                                                tweetId: tweet.id,
                                                userId: user.id,
                                                replyText
                                            }).then((res) => {
                                                setIsReplyDialogOpen(false)
                                                console.log(res)
                                            }).catch(() => {
                                                toast.error('something wrong with DB')
                                            })
                                        })
                                        // reply({ replyText, tweetId, userId })
                                        // reply({ tweetId, userId, replyText })
                                    } else {
                                        toast('please log in to like a tweet')
                                    }
                                }).catch((error) => {
                                    toast.error('Authen failed')
                                    console.log(error)
                                })
                            }}
                            type="submit" className='w-full items-center rounded-full space-x-2 px-2 py-2 text-center hover:bg-opacity-70 transition duration-200 bg-primary text-md font-normal' > Reply</button>
                        {/* <button ref={resetRef} className="invisible" type="reset"></button> */}
                        <button className="invisible" type="reset"></button>
                    </div>
                </div>
            </DialogContent>

        </Dialog >

    )
} 