import { BsChat, BsDot, BsThreeDots } from "react-icons/bs"
import { AiOutlineRetweet, AiOutlineHeart } from 'react-icons/ai'
import { IoStatsChart, IoShareOutline } from 'react-icons/io5'
import ComposeTweet from "./server-components/compose-tweet"
import dayjs from "dayjs"
import relatveTime from 'dayjs/plugin/relativeTime'
import { getTweets } from "../lib/supabase/getTweets"

dayjs.extend(relatveTime)


export default async function Middlebar() {

    const res = await getTweets()



    return (
        <main className="xl:ml-[275px] flex flex-col w-[600px] h-full min-h-screen border-r-[1px] border-l-[1px] border-gray-500">
            <h1 className="text-xl font-bold backdrop-blur sticky top-0 ml-3">Home</h1>

            <div className="border-b-[1px] border-t-[1px] border-gray-500 relative space-x-2 items-stretch flex p-4">
                <div className='rounded-full bg-red-500 w-12 h-12 flex-none'></div>
                <div className="flex flex-col w-full  ">

                    <ComposeTweet />
                </div>

            </div>

            {res?.data && res.data.map((tweet, index) => (
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
                            <div>
                                <AiOutlineHeart />
                            </div>
                            <div>
                                <IoStatsChart />
                            </div>
                            <div>
                                <IoShareOutline />
                            </div>
                        </div>

                    </div>
                </div>
            ))}

        </main>
    )
}