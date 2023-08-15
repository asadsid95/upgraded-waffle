import ComposeTweet from "./server-components/compose-tweet"
import { getTweets } from "../lib/supabase/queries"
import Tweet from "./client-components/tweet"

export default async function Middlebar() {

    const res = await getTweets()

    return (
        <main className="xl:ml-[275px] flex flex-col w-[600px] h-full min-h-screen border-r-[1px] border-l-[1px] border-gray-500">
            <h1 className="text-xl font-bold backdrop-blur sticky top-0 ml-3">Home</h1>

            <div className="border-b-[1px] border-t-[1px] border-gray-500 relative space-x-2 items-stretch flex p-4">
                <div className='rounded-full bg-gray-500 w-12 h-12 flex-none'></div>
                <div className="flex flex-col w-full  ">

                    <ComposeTweet />
                </div>

            </div>

            {res?.data && res.data.map((tweet, index) => (
                <Tweet key={tweet.id} tweet={tweet} />
            ))}

        </main>
    )
}