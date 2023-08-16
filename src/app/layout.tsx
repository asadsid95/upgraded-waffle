import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import SupabaseProvider from './supabase.provider'
import LeftSideBar from './components/left-sidebar'
import RightSidebar from './components/right-sidebar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="w-full h-full flex justify-center items-center relative bg-[#15202B] text-white">
          <div className="xl:max-w-[70vw] w-full h-full flex relative">
            <LeftSideBar />

            <SupabaseProvider>{children}</SupabaseProvider>
            <RightSidebar />
          </div>
        </div>
      </body>
    </html>
  )
}
