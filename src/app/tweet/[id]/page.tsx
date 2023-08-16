import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"

export default function TweetPage({ params }: { params: { id: string } }) {

    const supabaseClient = createServerComponentClient({
        cookies, headers
    })
    const { data: userData, error: userError } = await supabaseClient.auth.getUser()
    // const tweet = await db.select()

    // pull tweets from DB for logged-in user

    return (
        <main> </main>
    )

}