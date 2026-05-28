'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
import { useStore } from '@/store'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useStore()
  const router = useRouter()
  const total = cartTotal()
  const shipping = total >= 499 ? 0 : 49
  const finalTotal = total + shipping

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="text-8xl mb-6">🛍️</div>
          <h2 className="font-display text-3xl text-gray-900 mb-3">Your cart is empty</h2>
          <p className="text-gray-500 mb-8">Looks like you haven't added anything yet</p>
          <Link href="/products" className="btn-yellow">Start Shopping</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="font-display text-4xl text-gray-900 mb-8">Your Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map(({ product, quantity }) => (
              <div key={product.id} className="bg-white rounded-2xl p-4 shadow-soft flex gap-4">
                <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded-xl" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-gray-400">{product.brand}</div>
                  <h3 className="font-semibold text-gray-900 text-sm leading-snug mb-1">{product.name}</h3>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-bold text-gray-900">₹{product.price}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 border border-gray-200 rounded-full px-3 py-1">
                      <button onClick={() => updateQuantity(product.id, quantity - 1)} className="text-gray-600 hover:text-gray-900">
                        <Minus size={14} />
                      </button>
                      <span className="w-6 text-center text-sm font-semibold">{quantity}</span>
                      <button onClick={() => updateQuantity(product.id, quantity + 1)} className="text-gray-600 hover:text-gray-900">
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-gray-900">₹{product.price * quantity}</span>
                      <button onClick={() => removeFromCart(product.id)} className="p-1 text-gray-400 hover:text-red-500 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-soft sticky top-24">
              <h2 className="font-display text-xl text-gray-900 mb-6">Order Summary</h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Subtotal</span>
                  <span>₹{total}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-gray-400">Free shipping on orders above ₹499</p>
                )}
                <hr className="border-gray-100" />
                <div className="flex justify-between font-bold text-gray-900">
                  <span>Total</span>
                  <span>₹{finalTotal}</span>
                </div>
              </div>
              <button
                onClick={() => router.push('/checkout')}
                className="w-full btn-yellow flex items-center justify-center gap-2"
              >
                <ShoppingBag size={16} /> Proceed to Checkout
              </button>
              <Link href="/products" className="mt-3 text-sm text-gray-500 hover:text-gray-700 text-center block">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
