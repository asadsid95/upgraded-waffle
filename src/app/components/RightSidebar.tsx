import { BsSearch } from "react-icons/bs";

export default function RightSidebar() {

    return (

        <section className="w-full sticky flex flex-col right-0 top-2 mt-2 h-screen px-5 overflow-scroll">
            <div className="space-y-5">
                <div className="relative w-full text-center bg-transparent">
                    <label
                        htmlFor='searchBox'
                        className="absolute top-0 left-0 h-full flex items-center justify-center ">
                        <BsSearch className='w-5 h-5 text-gray-400' />
                    </label>
                    <input placeholder="Search" className="outline-none bg-transparent w-full h-full rounded-xl py-4 px-6 focus:border-2 focus:border-primary"></input>
                </div>

                <div className="flex flex-col rounded-xl bg-neutral-900 px-4">
                    <h3 className="font-bold text-lg my-2">What&apos;s happening?</h3>

                    <div>
                        {Array.from({ length: 5 }).map((item, index) => (

                            <div key={index} className="my-4 text-sm hover:bg-gray-500/50 p-2 rounded-md transition duration-200">
                                <div>
                                    Trending item {index + 1}
                                </div>
                                <div className="text-xs text-neutral-400">
                                    40.0k</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-col bg-neutral-900 rounded-xl px-4 ">
                    <h3 className="font-semibold my-4">Who to follow?</h3>

                    <div>
                        {Array.from({ length: 5 }).map((item, index) => (
                            <div key={index} className="flex justify-between items-center space-y-2 rounded-md hover:bg-gray-500/50 transition duration-200 last:rounded-b-xl">
                                <div className="flex items-center space-x-2">
                                    <div className='rounded-full bg-red-500 w-8 h-8 flex-none'></div>
                                    <div className=' text-sm flex flex-col'>
                                        <div className='font-semibold'>Person Name</div>
                                        <div className='text-xs text-gray-400'>@person</div>
                                    </div>

                                </div>
                                {/* <div className=" w-full"> */}
                                <button className="rounded-full bg-gray-500 w-8 h-8 px-6 py-2"></button>
                                {/* </div> */}
                            </div>
                        ))}
                    </div>



                </div>

            </div>
        </section>
    )
}