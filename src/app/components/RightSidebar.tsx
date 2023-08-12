import { BsSearch } from "react-icons/bs";

export default function RightSidebar() {

    return (

        <section className="w-full sticky flex flex-col space-y-3 right-0 top-2 mt-2 items-stretch h-screen px-6">
            <div>
                <div className="relative w-full h-full ">
                    <label
                        htmlFor='searchBox'
                        className="absolute top-0 left-0 h-full flex items-center justify-center">
                        <BsSearch className='w-5 h-5 text-gray-400' />
                    </label>
                    <input placeholder="Search" className=" outline-none bg-neutral/90 w-full h-full rounded-xl py-4 px-6 focus:border-2 focus:border-twitterBlue"></input>
                </div>

                <div className="flex flex-col rounded-xl bg-neutral-900 p-1">
                    <h3 className="font-bold text-2xl my-4">What&apos;s happening?</h3>

                    <div>
                        {Array.from({ length: 5 }).map((item, index) => (

                            <div key={index}>
                                <div>
                                    Trending item {index + 1}
                                </div>
                                <div className="text-xs text-neutral-400">
                                    40.0k</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}