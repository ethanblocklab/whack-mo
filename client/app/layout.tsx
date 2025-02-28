import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import DynamicProvider from '@/app/providers/DynamicProviders'
import ApolloProvider from '@/app/providers/ApolloProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Whac-a-Mole',
  description: 'Break Monad with Whac-a-Mole',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <DynamicProvider>
        <ApolloProvider>
          <body className={inter.className}>{children}</body>
        </ApolloProvider>
      </DynamicProvider>
    </html>
  )
}
