import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import { AuthProvider } from '@/contexts/AuthContext'
import Footer from '@/components/Footer'
import GoogleAd from '@/components/GoogleAd'
import { CompareSidebar } from '@/components/CompareSidebar'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  other: {
    'admaven-placement': 'Bqdr4rdgE',
  },
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
          data-cfasync="false" 
          src="//dcbbwymp1bhlf.cloudfront.net/?wbbcd=1118629"
        />
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
          <AuthProvider>
            <Navbar />
            <main className="flex-grow">
              <GoogleAd slot="your-ad-slot" />
              {children}
            </main>
            <Footer />
            <CompareSidebar />
          </AuthProvider>
      </body>
    </html>
  )
}
