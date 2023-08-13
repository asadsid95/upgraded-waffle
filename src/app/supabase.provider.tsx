"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { createBrowserSupabaseClient, createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

// createPagesBrowserClient

import type { SupabaseClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/app/lib/supabase.types";
import { Dialog, DialogContent } from "@/app/components/ui/dialog";
import { Input } from "@/app/components/ui/input";
import { Button } from "@/app/components/ui/button";
import { Toaster, toast } from "sonner";
import { DialogClose } from "@radix-ui/react-dialog";

type SupabaseContext = {
    supabase: SupabaseClient<Database>;
};

const Context = createContext<SupabaseContext | undefined>(undefined);

export default function SupabaseProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [supabase] = useState(() => createPagesBrowserClient());
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);

    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");

    // const [isLoading, setIsLoading] = useState(false);

    const submit_login = async (e: any) => {
        e.preventDefault()

        const { data, error } = await supabase.from('profiles').select().eq('username', username.trim())

        if (data && data?.length > 0) {
            console.log(data)
            return toast.error('username already exists')
        }

        await supabase.auth.signInWithOtp({
            email: email.trim(),
            options: {
                data: {
                    username
                }
            }
        })
    }

    useEffect(() => {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(() => {
            router.refresh();
        });

        supabase.auth.getSession().then((res) => {
            console.log(res)

            if (!res.data.session) {
                setIsOpen(true);
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [router, supabase]);

    return (
        <Context.Provider value={{ supabase }}>
            <>
                <Toaster />
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogContent className="bg-black p-6 text-black">
                        <h3>Please sign in</h3>

                        <form onSubmit={submit_login}>
                            <Input type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
                            <Input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)} />
                            <p className="text-sm text-gray-300 my-2">You&apos;ll receive a magic link</p>
                            <div className="flex w-full justify-end">
                                <Button className='bg-white text-black'>Login</Button>
                            </div>
                        </form>

                    </DialogContent>

                </Dialog>

                {/* <div >
                    <input placeholder="enter username" />
                </div> */}

                {/* <Toaster />
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogContent className="p-6">
                        <h3 className="text-lg my-1">Please sign in to continue</h3>
                        <form
                            onSubmit={async (e) => {
                                e.preventDefault();

                                setIsLoading(true);

                                // first check if the username exists or not
                                const { data, error } = await supabase
                                    .from("profiles")
                                    .select()
                                    .eq("username", username.trim());

                                if (data && data?.length > 0) {
                                    return toast.error(
                                        "username already exists, please use another"
                                    );
                                }

                                await supabase.auth.signInWithOtp({
                                    email: email.trim(),
                                    options: {
                                        data: {
                                            username,
                                        },
                                    },
                                });

                                setIsLoading(false);
                            }}
                        >
                            <Input
                                type="email"
                                placeholder="email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Input
                                type="text"
                                placeholder="username"
                                min={3}
                                onChange={(e) => setUsername(e.target.value)}
                                className="my-2"
                            />
                            <p className="text-sm text-gray-900 my-2">
                                you will receive a login magic link here!
                            </p>
                            <div className="flex w-full justify-end">
                                <Button disabled={isLoading}>Login</Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog> */}
                {children}</>
        </Context.Provider>
    );
}

export const useSupabase = () => {
    const context = useContext(Context);

    if (context === undefined) {
        throw new Error("useSupabase must be used inside SupabaseProvider");
    }

    return context;
};