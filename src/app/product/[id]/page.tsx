'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Star, ShoppingBag, Heart, ArrowLeft, Check } from 'lucide-react'
import { products } from '@/data/products'
import { useStore } from '@/store'
import { ProductCard } from '@/components/product/ProductCard'
import toast from 'react-hot-toast'

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const product = products.find(p => p.id === params.id)
  const [activeImage, setActiveImage] = useState(0)
  const [activeTab, setActiveTab] = useState<'description' | 'ingredients' | 'usage'>('description')
  const [qty, setQty] = useState(1)

  const { addToCart, toggleWishlist, isWishlisted } = useStore()
  const wishlisted = product ? isWishlisted(product.id) : false

  if (!product) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="text-6xl mb-4">😕</div>
        <h2 className="font-display text-2xl mb-4">Product not found</h2>
        <button onClick={() => router.push('/products')} className="btn-yellow">Browse Products</button>
      </div>
    </div>
  )

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addToCart(product)
    toast.success(`Added ${qty}x ${product.name} to cart! 🛍️`)
  }

  const handleBuyNow = () => {
    handleAddToCart()
    router.push('/cart')
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-8 transition-colors"
        >
          <ArrowLeft size={16} /> Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-3xl overflow-hidden bg-gray-50">
              <img
                src={product.images[activeImage] || product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-colors ${i === activeImage ? 'border-yellow-400' : 'border-transparent'}`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <div className="text-sm text-gray-400 font-medium mb-1">{product.brand}</div>
            <h1 className="font-display text-3xl text-gray-900 mb-3">{product.name}</h1>

            {/* Rating */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className={i < Math.round(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'} />
                ))}
              </div>
              <span className="text-sm font-semibold">{product.rating}</span>
              <span className="text-sm text-gray-400">({product.reviews.toLocaleString()} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-3 mb-6">
              <span className="text-3xl font-bold text-gray-900">₹{product.price}</span>
              {product.originalPrice > product.price && (
                <>
                  <span className="text-lg text-gray-400 line-through">₹{product.originalPrice}</span>
                  <span className="bg-yellow-300 text-gray-900 text-sm font-bold px-3 py-1 rounded-full">
                    {product.discount}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-2 gap-2 mb-6">
              {product.benefits.map(b => (
                <div key={b} className="flex items-center gap-2 text-sm text-gray-700">
                  <Check size={14} className="text-green-500 flex-shrink-0" />
                  {b}
                </div>
              ))}
            </div>

            {/* Skin types */}
            <div className="flex flex-wrap gap-2 mb-6">
              {product.skinType.map(st => (
                <span key={st} className="bg-yellow-50 border border-yellow-200 text-yellow-800 text-xs px-3 py-1 rounded-full">
                  {st}
                </span>
              ))}
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-sm font-medium text-gray-700">Quantity</span>
              <div className="flex items-center gap-3 border border-gray-200 rounded-full px-4 py-2">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="text-gray-600 hover:text-gray-900 font-bold">-</button>
                <span className="w-6 text-center text-sm font-semibold">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="text-gray-600 hover:text-gray-900 font-bold">+</button>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3 mb-8">
              <button onClick={handleAddToCart} className="flex-1 btn-yellow flex items-center justify-center gap-2">
                <ShoppingBag size={18} /> Add to Cart
              </button>
              <button onClick={handleBuyNow} className="flex-1 btn-outline flex items-center justify-center gap-2">
                Buy Now
              </button>
              <button
                onClick={() => { toggleWishlist(product); toast(wishlisted ? 'Removed from wishlist' : '❤️ Added to wishlist') }}
                className="w-12 h-12 border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                <Heart size={18} className={wishlisted ? 'fill-red-500 text-red-500' : 'text-gray-500'} />
              </button>
            </div>

            {/* Tabs */}
            <div>
              <div className="flex gap-1 border-b border-gray-100 mb-4">
                {(['description', 'ingredients', 'usage'] as const).map(tab => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-sm font-medium capitalize transition-colors border-b-2 -mb-px ${activeTab === tab ? 'border-yellow-400 text-gray-900' : 'border-transparent text-gray-500 hover:text-gray-700'}`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className="text-sm text-gray-600 leading-relaxed">
                {activeTab === 'description' && product.description}
                {activeTab === 'ingredients' && product.ingredients}
                {activeTab === 'usage' && product.usage}
              </div>
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div>
            <h2 className="font-display text-3xl text-gray-900 mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
