// server component with server action 

import { Database } from "@/app/lib/supabase.types";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { randomUUID } from "crypto";
import { cookies, headers } from "next/headers"
import { SupabaseClient } from '@supabase/supabase-js'
import FormClientComponent from "./FormClientComponent";
import { revalidatePath } from "next/cache";

export default function ComposeTweet() {

    async function addTweetToDB(formData: FormData) {
        'use server'

        const tweet = formData.get('tweet')

        if (!tweet) return;

        const supabaseClient = createServerComponentClient<Database>({ cookies, headers })

        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SECRET_KEY) {
            return { error: { message: "supa base credentials not provided!" } as any }
        }

        const supabaseServer = new SupabaseClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.SUPABASE_SECRET_KEY)

        const { data: userData, error: userError } = await supabaseClient.auth.getUser()

        if (userError) return;

        const { data, error } = await supabaseServer.from('tweets').insert({
            profile_id: userData.user.id,
            text: tweet.toString(),
            id: randomUUID()
        })

        revalidatePath('/')

        console.log(data, error)
        return { data, error }
    }

    // passing a server action into a client component
    return (
        <FormClientComponent
            serverAction={addTweetToDB} />
    )
}