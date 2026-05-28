'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search, ArrowRight } from 'lucide-react'

export function HeroSection() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) router.push(`/products?search=${encodeURIComponent(query)}`)
  }

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gradient-to-br from-white via-yellow-50 to-amber-50">
      {/* Background blobs */}
      <div className="absolute top-20 right-20 w-72 h-72 rounded-full bg-yellow-100 opacity-60 blur-3xl" />
      <div className="absolute bottom-20 left-20 w-56 h-56 rounded-full bg-amber-100 opacity-40 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div>
            <div className="inline-flex items-center gap-2 bg-yellow-100 rounded-full px-4 py-2 mb-6">
              <span className="text-sm font-medium text-yellow-800">✨ New Korean Skincare Collection</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl text-gray-900 leading-tight mb-6">
              Glow Like
              <br />
              <span className="italic text-yellow-500">You Mean It</span>
            </h1>
            <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-md">
              Discover skincare that actually works. Curated products from trusted brands, delivered to your door.
            </p>

            {/* Search bar */}
            <form onSubmit={handleSearch} className="flex gap-3 mb-8 max-w-lg">
              <div className="flex-1 flex items-center gap-3 bg-white rounded-full px-5 py-3 shadow-soft border border-gray-100">
                <Search size={18} className="text-gray-400 flex-shrink-0" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products, brands..."
                  className="flex-1 text-sm outline-none bg-transparent"
                />
              </div>
              <button type="submit" className="btn-yellow flex items-center gap-2">
                Search <ArrowRight size={16} />
              </button>
            </form>

            {/* Stats */}
            <div className="flex gap-8">
              {[
                { value: '200+', label: 'Products' },
                { value: '50K+', label: 'Happy Customers' },
                { value: '4.8★', label: 'Average Rating' },
              ].map(stat => (
                <div key={stat.label}>
                  <div className="text-2xl font-display font-bold text-gray-900">{stat.value}</div>
                  <div className="text-xs text-gray-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — hero visual */}
          <div className="relative hidden lg:flex items-center justify-center">
            <div className="relative w-80 h-80">
              {/* Glow */}
              <div className="absolute inset-0 rounded-full bg-yellow-200 opacity-50 blur-2xl" />
              {/* Main circle */}
              <div className="relative z-10 w-full h-full rounded-full bg-gradient-to-br from-yellow-100 to-amber-100 flex items-center justify-center shadow-glow">
                <span className="text-9xl">🌸</span>
              </div>
              {/* Floating badges */}
              <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-card px-4 py-3 flex items-center gap-2">
                <span className="text-2xl">🧴</span>
                <div>
                  <div className="text-xs font-semibold">Bestseller</div>
                  <div className="text-xs text-gray-500">Niacinamide Serum</div>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-card px-4 py-3 flex items-center gap-2">
                <span className="text-2xl">☀️</span>
                <div>
                  <div className="text-xs font-semibold">SPF 50</div>
                  <div className="text-xs text-gray-500">No white cast</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
