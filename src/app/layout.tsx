import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import Providers from '@/components/Providers'
import MaintenanceBanner from '@/components/MaintenanceBanner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'The Bazaar Builds',
  description: 'Share and discover the best builds for The Bazaar',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5095604091036937"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <MaintenanceBanner />
        <Providers>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}
