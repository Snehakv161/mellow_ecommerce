'use client'

import { useState, useMemo } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { products, categories } from '@/data/products'
import { ProductCard } from '@/components/product/ProductCard'

const SORT_OPTIONS = [
  { label: 'Popularity', value: 'popularity' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Best Rated', value: 'rating' },
  { label: 'Newest', value: 'newest' },
]

const BRANDS = [...new Set(products.map(p => p.brand))].sort()
const SKIN_TYPES = ['Normal', 'Dry', 'Oily', 'Combination', 'Sensitive', 'All Skin Types', 'Acne-Prone']

export default function ProductsPage() {
  const searchParams = useSearchParams()
  const initialCategory = searchParams.get('category') || ''
  const initialSearch = searchParams.get('search') || ''

  const [search, setSearch] = useState(initialSearch)
  const [category, setCategory] = useState(initialCategory)
  const [sort, setSort] = useState('popularity')
  const [selectedBrands, setSelectedBrands] = useState<string[]>([])
  const [selectedSkinTypes, setSelectedSkinTypes] = useState<string[]>([])
  const [showFilters, setShowFilters] = useState(false)

  const toggleBrand = (brand: string) => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    )
  }

  const toggleSkinType = (type: string) => {
    setSelectedSkinTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    )
  }

  const filtered = useMemo(() => {
    let result = [...products]

    if (search) {
      const q = search.toLowerCase()
      result = result.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some(t => t.includes(q))
      )
    }

    if (category) {
      result = result.filter(p => p.category.toLowerCase() === category.toLowerCase())
    }

    if (selectedBrands.length) {
      result = result.filter(p => selectedBrands.includes(p.brand))
    }

    if (selectedSkinTypes.length) {
      result = result.filter(p =>
        p.skinType.some(st => selectedSkinTypes.includes(st))
      )
    }

    switch (sort) {
      case 'price_asc': result.sort((a, b) => a.price - b.price); break
      case 'price_desc': result.sort((a, b) => b.price - a.price); break
      case 'rating': result.sort((a, b) => b.rating - a.rating); break
      default: result.sort((a, b) => b.reviews - a.reviews)
    }

    return result
  }, [search, category, sort, selectedBrands, selectedSkinTypes])

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-4xl text-gray-900 mb-2">
            {category || 'All Products'}
          </h1>
          <p className="text-gray-500">{filtered.length} products found</p>
        </div>

        {/* Search + Sort bar */}
        <div className="flex flex-wrap gap-3 mb-6">
          <div className="flex-1 min-w-[200px] flex items-center gap-3 bg-gray-50 rounded-full px-4 py-3 border border-gray-200">
            <Search size={16} className="text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search products..."
              className="flex-1 text-sm bg-transparent outline-none"
            />
            {search && <button onClick={() => setSearch('')}><X size={14} className="text-gray-400" /></button>}
          </div>
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="border border-gray-200 rounded-full px-4 py-3 text-sm bg-white outline-none"
          >
            {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 border border-gray-200 rounded-full px-4 py-3 text-sm hover:bg-gray-50 transition-colors"
          >
            <SlidersHorizontal size={16} /> Filters
            {(selectedBrands.length + selectedSkinTypes.length) > 0 && (
              <span className="bg-yellow-300 text-gray-900 text-xs rounded-full px-2 py-0.5 font-bold">
                {selectedBrands.length + selectedSkinTypes.length}
              </span>
            )}
          </button>
        </div>

        {/* Categories pills */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setCategory('')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${!category ? 'bg-yellow-300 text-gray-900' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat.name}
              onClick={() => setCategory(category === cat.name ? '' : cat.name)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${category === cat.name ? 'bg-yellow-300 text-gray-900' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        {/* Filters panel */}
        {showFilters && (
          <div className="bg-yellow-50 rounded-2xl p-6 mb-6 border border-yellow-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Brands</h3>
                <div className="flex flex-wrap gap-2">
                  {BRANDS.map(brand => (
                    <button
                      key={brand}
                      onClick={() => toggleBrand(brand)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${selectedBrands.includes(brand) ? 'bg-yellow-300 text-gray-900' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">Skin Type</h3>
                <div className="flex flex-wrap gap-2">
                  {SKIN_TYPES.map(type => (
                    <button
                      key={type}
                      onClick={() => toggleSkinType(type)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${selectedSkinTypes.includes(type) ? 'bg-yellow-300 text-gray-900' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {(selectedBrands.length + selectedSkinTypes.length) > 0 && (
              <button
                onClick={() => { setSelectedBrands([]); setSelectedSkinTypes([]) }}
                className="mt-4 text-sm text-red-500 hover:text-red-700 font-medium"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}

        {/* Products grid */}
        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="font-display text-2xl text-gray-700 mb-2">No products found</h3>
            <p className="text-gray-400">Try adjusting your filters or search query</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {filtered.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  )
}
