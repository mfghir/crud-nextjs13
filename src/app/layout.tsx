
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import ReactQueryProvider from '@/components/ReactQueryProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}




export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen w-full overflow-x-scroll md:overflow-hidden px-6 py-8 lg:px-20 bg-gray-200`}>
        <ReactQueryProvider>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </ReactQueryProvider>
      </body>
    </html>
  )
}
