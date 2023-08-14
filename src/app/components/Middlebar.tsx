import { BsChat, BsDot, BsThreeDots } from "react-icons/bs"
import { AiOutlineRetweet, AiOutlineHeart } from 'react-icons/ai'
import { IoStatsChart, IoShareOutline } from 'react-icons/io5'
import ComposeTweet from "./server-component/compose-tweet"


export default function Middlebar() {

    return (
        <main className="xl:ml-[275px] flex flex-col w-[600px] h-full min-h-screen border-r-[1px] border-l-[1px] border-gray-500">
            <h1 className="text-xl font-bold backdrop-blur sticky top-0 ml-3">Home</h1>

            <div className="border-b-[1px] border-t-[1px] border-gray-500 relative space-x-2 items-stretch flex p-4">
                <div className='rounded-full bg-red-500 w-12 h-12 flex-none'></div>
                <div className="flex flex-col w-full  ">

                    <ComposeTweet />
                </div>

            </div>

            {Array.from({ length: 5 }).map((item, index) => (
                <div key={index} className="flex space-x-4 px-4 border-b-[0.5px] py-3">
                    <div className='rounded-full bg-red-500 w-12 h-12 flex-none'></div>

                    <div className='flex flex-col space-y-2'>
                        <div className=' text-sm flex space-x-1 items-center justify-between'>
                            <div className="flex items-center space-x-1 w-full">
                                <div className='font-bold'>Person Name</div>
                                <div className='text-gray-500'>@person</div>
                                <div>
                                    <BsDot />
                                </div>
                                <div className=''>Aug-12</div>
                            </div>
                            <div>
                                <BsThreeDots />
                            </div>
                        </div>

                        <div className="text-sm">
                            tweet caption Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae, perspiciatis saepe. Aperiam aliquid debitis ipsam itaque a iusto perspiciatis, quod alias doloribus neque, atque officia quidem nisi laborum ipsum assumenda!
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