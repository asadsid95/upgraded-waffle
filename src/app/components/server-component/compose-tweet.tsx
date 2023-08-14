// server component with server action 

import { cookies } from "next/headers"
import { BsDot } from "react-icons/bs"

export default function ComposeTweet() {

    async function addTweetToDB(tweet: string) {
        'use server'


        console.log(tweet)
    }

    return (
        <form action={addTweetToDB as any}>
            <div className="align-text-top min-h-[150px]">
                <input
                    type='text'
                    placeholder="What's happening?"
                    className="w-full h-full bg-gray-800 border-b-[0.5px] rounded-md border-gray-400 pb-4 outline-none border-none" />
            </div>
            <div className="w-full justify-between items-center flex pt-2">
                <div><BsDot /></div>
                <div className="w-full max-w-[100px] ">
                    <button type="submit" className='w-full items-center rounded-full space-x-2 px-2 py-2 text-center hover:bg-opacity-70 transition duration-200 bg-primary text-md font-normal'>Tweet</button>
                </div>
            </div>
        </form>
    )
}