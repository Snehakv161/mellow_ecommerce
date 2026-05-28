import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Toaster } from 'react-hot-toast'
import { RewardPopup } from '@/components/ui/RewardPopup'

export const metadata: Metadata = {
  title: 'Mellow — Luxury Skincare & Cosmetics',
  description: 'Discover premium skincare and cosmetics at Mellow. Korean-inspired beauty, curated for you.',
  keywords: 'skincare, cosmetics, beauty, Korean skincare, serum, moisturizer, sunscreen',
  openGraph: {
    title: 'Mellow — Luxury Skincare & Cosmetics',
    description: 'Discover premium skincare and cosmetics',
    type: 'website',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Toaster position="top-center" toastOptions={{
          style: {
            background: '#fff',
            color: '#1a1a1a',
            borderRadius: '12px',
            border: '1px solid #FFF176',
            boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
          }
        }} />
        <RewardPopup />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
