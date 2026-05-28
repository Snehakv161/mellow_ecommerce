'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Heart, ShoppingBag, Star } from 'lucide-react'
import { Product } from '@/data/products'
import { useStore } from '@/store'
import toast from 'react-hot-toast'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart, toggleWishlist, isWishlisted } = useStore()
  const wishlisted = isWishlisted(product.id)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addToCart(product)
    toast.success(`${product.name} added to cart! 🛍️`)
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    toggleWishlist(product)
    toast(wishlisted ? 'Removed from wishlist' : '❤️ Added to wishlist')
  }

  return (
    <Link href={`/product/${product.id}`}>
      <div className="product-card bg-white rounded-3xl border border-gray-100 overflow-hidden group shadow-soft">
        {/* Image */}
        <div className="relative aspect-square bg-gray-50 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />

          {/* Discount badge */}
          {product.discount > 0 && (
            <div className="absolute top-3 left-3 bg-yellow-300 text-gray-900 text-xs font-bold px-2 py-1 rounded-full">
              -{product.discount}%
            </div>
          )}

          {/* Wishlist */}
          <button
            onClick={handleWishlist}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white shadow-md flex items-center justify-center transition-transform hover:scale-110"
          >
            <Heart
              size={14}
              className={wishlisted ? 'fill-red-500 text-red-500' : 'text-gray-400'}
            />
          </button>

          {/* Add to cart - shows on hover */}
          <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <button
              onClick={handleAddToCart}
              className="w-full btn-yellow text-sm flex items-center justify-center gap-2 py-2"
            >
              <ShoppingBag size={14} /> Add to Cart
            </button>
          </div>
        </div>

        {/* Info */}
        <div className="p-4">
          <div className="text-xs text-gray-400 font-medium mb-1">{product.brand}</div>
          <h3 className="text-sm font-semibold text-gray-900 leading-snug mb-2 line-clamp-2">{product.name}</h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <Star size={12} className="fill-yellow-400 text-yellow-400" />
            <span className="text-xs font-semibold text-gray-700">{product.rating}</span>
            <span className="text-xs text-gray-400">({product.reviews.toLocaleString()})</span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="text-base font-bold text-gray-900">₹{product.price}</span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
