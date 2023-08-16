'use client'

import { PostgrestError } from "@supabase/supabase-js";
import { useRef } from "react";
import { BsDot } from "react-icons/bs";
import { toast } from "sonner";

type ComposeTweetFormProps = {
    serverAction: (formData: FormData) => Promise<
        | { data: null; error: PostgrestError | null; }
        | { error: { message: string }; data?: undefined }
        | undefined>
}

export default function ComposeTweetForm({ serverAction }: ComposeTweetFormProps) {

    const resetRef = useRef<HTMLButtonElement>(null)

    const handleSubmitTweet = async (data: any) => {
        try {
            const res = await serverAction(data)
            // console.log(res)
            if (res?.error) {
                return toast.error(res.error.message)
            }
            toast.success("Tweet sent successfully!")
            resetRef.current?.click()
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    return (

        <form action={handleSubmitTweet as any}>
            <div className="align-text-top min-h-[150px]">
                <input
                    type='text'
                    name='tweet'
                    placeholder="What's happening?"
                    className="w-full h-full bg-gray-800 border-b-[0.5px] rounded-md border-gray-400 pb-4 outline-none border-none" />
            </div>
            <div className="w-full justify-between items-center flex pt-2">
                <div><BsDot /></div>
                <div className="w-full max-w-[100px] ">
                    <button type="submit" className='w-full items-center rounded-full space-x-2 px-2 py-2 text-center hover:bg-opacity-70 transition duration-200 bg-primary text-md font-normal'>Tweet</button>
                    <button ref={resetRef} className="invisible" type="reset"></button>
                </div>
            </div>
        </form>
    )
}