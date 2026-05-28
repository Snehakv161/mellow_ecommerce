'use client'

import { useState, useEffect } from 'react'
import { HeroSection } from '@/components/home/HeroSection'
import { CategoriesSection } from '@/components/home/CategoriesSection'
import { FeaturedProducts } from '@/components/home/FeaturedProducts'
import { TrendingProducts } from '@/components/home/TrendingProducts'
import { BestSellers } from '@/components/home/BestSellers'
import { CustomerReviews } from '@/components/home/CustomerReviews'

function LandingPage({ onEnter }: { onEnter: () => void }) {
  const [phase, setPhase] = useState<'glow' | 'text' | 'hand' | 'ready'>('glow')

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('text'), 600)
    const t2 = setTimeout(() => setPhase('hand'), 1400)
    const t3 = setTimeout(() => setPhase('ready'), 2200)
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3) }
  }, [])

  const handleScroll = () => onEnter()

  useEffect(() => {
    window.addEventListener('wheel', handleScroll, { once: true })
    window.addEventListener('touchmove', handleScroll, { once: true })
    return () => {
      window.removeEventListener('wheel', handleScroll)
      window.removeEventListener('touchmove', handleScroll)
    }
  }, [])

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white cursor-pointer"
      onClick={onEnter}
    >
      {/* Glowing circle */}
      <div className="relative flex items-center justify-center">
        <div
          className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-yellow-200"
          style={{
            animation: 'glowPulse 3s ease-in-out infinite',
            background: 'radial-gradient(circle, #FFF176 0%, #FFFDE7 60%, transparent 100%)',
          }}
        />

        {/* Brand text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {(phase === 'text' || phase === 'hand' || phase === 'ready') && (
            <h1
              className="font-display text-6xl md:text-8xl text-gray-900 tracking-tight"
              style={{ animation: 'fadeInUp 0.8s ease forwards' }}
            >
              Mellow
            </h1>
          )}
          {(phase === 'hand' || phase === 'ready') && (
            <span
              className="text-4xl mt-2"
              style={{ animation: 'waveHand 1.5s ease-in-out infinite' }}
            >
              👋
            </span>
          )}
        </div>
      </div>

      {/* Scroll hint */}
      {phase === 'ready' && (
        <div
          className="mt-12 flex flex-col items-center gap-2 text-gray-400"
          style={{ animation: 'fadeInUp 0.6s ease forwards' }}
        >
          <p className="text-sm font-body tracking-widest uppercase">Swipe up to enter</p>
          <div style={{ animation: 'bounce 2s ease-in-out infinite' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 19V5M5 12l7-7 7 7" />
            </svg>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Home() {
  const [showLanding, setShowLanding] = useState(true)
  const [animateOut, setAnimateOut] = useState(false)

  const handleEnter = () => {
    setAnimateOut(true)
    setTimeout(() => setShowLanding(false), 500)
  }

  return (
    <>
      {showLanding && (
        <div style={{ opacity: animateOut ? 0 : 1, transition: 'opacity 0.5s ease' }}>
          <LandingPage onEnter={handleEnter} />
        </div>
      )}
      <div style={{ opacity: showLanding ? 0 : 1, transition: 'opacity 0.5s ease' }}>
        <HeroSection />
        <CategoriesSection />
        <FeaturedProducts />
        <TrendingProducts />
        <BestSellers />
        <CustomerReviews />
      </div>
    </>
  )
}
