import Link from 'next/link'
import { BiHomeCircle, BiUser } from 'react-icons/bi'
import { BsBell, BsBookmark, BsThreeDots, BsTwitter } from 'react-icons/bs'
import { HiOutlineHashtag, } from 'react-icons/hi'
import { HiEnvelope, HiOutlineEnvelope } from 'react-icons/hi2'


const NAVIGATION_ITEMS = [
    {
        title: "Twitter",
        icon: BsTwitter
    },
    {
        title: 'Home',
        icon: BiHomeCircle
    },
    {
        title: 'Explore',
        icon: HiOutlineHashtag
    },
    {
        title: 'Notifications',
        icon: BsBell
    },
    {
        title: 'Messages',
        icon: HiOutlineEnvelope

    },
    {
        title: "Bookmarks",
        icon: BsBookmark
    },

    {
        title: 'Profile',
        icon: BiUser
    }
]


export default function LeftSideBar() {

    return (

        < section className="fixed w-[275px] flex flex-col h-screen items-stretch px-5 bg-black" >

            <div className='flex flex-col items-stretch h-full space-y-2 mt-4'>
                {NAVIGATION_ITEMS.map((item) => (
                    <Link
                        className='bg-black/60 flex items-center w-[50px] text-l justify-start space-x-2 rounded-3xl py-2 px-6 hover:bg-blue-400/10 transition duration-200'
                        href={`/${item.title.toLowerCase()}`} key={item.title}>

                        <div>
                            <item.icon />
                        </div>

                        <div>
                            {item.title !== "Twitter" && <div>{item.title}</div>}
                        </div>
                    </Link>
                ))}

                <button className='bg-twitterBlue w-full rounded-3xl p-3 text-xl text-center hover:bg-opacity-70 transition duration-200'>
                    Tweet
                </button>
            </div>

            <button className='flex items-center rounded-full bg-transparent space-x-2 p-3 text-center hover:bg-opacity-70 transition duration-200 '>
                <div className='flex items-center space-x-2 '>
                    <div className='rounded-full bg-red-500 w-12 h-8'></div>
                    <div className='text-left text-sm'>
                        <div className='font-semibold'>Person Name</div>
                        <div className=''>@person</div>
                    </div>
                </div>
                <div>
                    <BsThreeDots />
                </div>

            </button>


        </section >
    )
}