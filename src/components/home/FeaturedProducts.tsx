'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { products } from '@/data/products'
import { ProductCard } from '@/components/product/ProductCard'

function SectionHeader({ title, subtitle, href }: { title: string; subtitle: string; href: string }) {
  return (
    <div className="flex items-end justify-between mb-10">
      <div>
        <h2 className="font-display text-4xl text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-500">{subtitle}</p>
      </div>
      <Link href={href} className="hidden md:flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors">
        View All <ArrowRight size={16} />
      </Link>
    </div>
  )
}

export function FeaturedProducts() {
  const featured = products.filter(p => p.isFeatured).slice(0, 4)
  return (
    <section className="py-16 bg-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Featured Products" subtitle="Hand-picked by our beauty experts" href="/products?filter=featured" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {featured.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  )
}

export function TrendingProducts() {
  const trending = products.filter(p => p.isTrending).slice(0, 4)
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Trending Now 🔥" subtitle="What everyone is talking about" href="/products?filter=trending" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {trending.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  )
}

export function BestSellers() {
  const bestsellers = products.filter(p => p.isBestSeller).slice(0, 4)
  return (
    <section className="py-16 bg-amber-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader title="Best Sellers ⭐" subtitle="Our most loved products" href="/products?filter=bestseller" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {bestsellers.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  )
}
