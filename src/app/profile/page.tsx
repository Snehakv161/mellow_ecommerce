'use client'

import { useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { Heart, Package, Settings, Coins, MapPin } from 'lucide-react'
import { useStore } from '@/store'
import { ProductCard } from '@/components/product/ProductCard'

type Tab = 'profile' | 'orders' | 'wishlist' | 'settings'

export default function ProfilePage() {
  const searchParams = useSearchParams()
  const [tab, setTab] = useState<Tab>((searchParams.get('tab') as Tab) || 'profile')
  const { user, isAuthenticated, wishlist, orders } = useStore()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) router.push('/login')
  }, [isAuthenticated])

  if (!user) return null

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <span>👤</span> },
    { id: 'orders', label: 'Orders', icon: <Package size={16} /> },
    { id: 'wishlist', label: 'Wishlist', icon: <Heart size={16} /> },
    { id: 'settings', label: 'Settings', icon: <Settings size={16} /> },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-soft p-6 mb-6 flex items-center gap-5">
          <div className="w-16 h-16 rounded-full bg-yellow-300 flex items-center justify-center text-2xl font-bold text-gray-900">
            {user.name.charAt(0)}
          </div>
          <div className="flex-1">
            <h1 className="font-display text-2xl text-gray-900">{user.name}</h1>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 bg-yellow-50 rounded-xl px-4 py-2 border border-yellow-100">
              <span className="text-xl">🪙</span>
              <div>
                <div className="text-lg font-bold text-gray-900">{user.coins}</div>
                <div className="text-xs text-gray-500">Mellow Coins</div>
              </div>
            </div>
            {user.coins >= 10 && (
              <p className="text-xs text-green-600 mt-1">= ₹{Math.floor(user.coins / 10) * 100} discount available!</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Sidebar tabs */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-2xl shadow-soft p-3">
              {tabs.map(t => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id as Tab)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors mb-1
                    ${tab === t.id ? 'bg-yellow-100 text-gray-900' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                  {t.icon} {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="md:col-span-3">
            {tab === 'profile' && (
              <div className="bg-white rounded-2xl shadow-soft p-6">
                <h2 className="font-semibold text-gray-900 text-lg mb-6">Personal Information</h2>
                <div className="space-y-4">
                  {[
                    { label: 'Full Name', value: user.name },
                    { label: 'Email', value: user.email },
                    { label: 'Account Type', value: user.role === 'admin' ? '👑 Admin' : '🌸 Member' },
                    { label: 'Mellow Coins', value: `🪙 ${user.coins} coins` },
                  ].map(field => (
                    <div key={field.label} className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-sm text-gray-500">{field.label}</span>
                      <span className="text-sm font-medium text-gray-900">{field.value}</span>
                    </div>
                  ))}
                </div>

                {/* Coin info */}
                <div className="mt-8 bg-yellow-50 rounded-2xl p-6 border border-yellow-100">
                  <h3 className="font-semibold text-gray-900 mb-3">🪙 How Mellow Coins Work</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li>• Every ₹200 spent = 1 Mellow Coin</li>
                    <li>• 10 coins = ₹100 discount</li>
                    <li>• New members get 10 welcome coins</li>
                    <li>• Coins never expire</li>
                  </ul>
                  <div className="mt-4 pt-4 border-t border-yellow-200">
                    <div className="text-sm font-semibold text-gray-900">Your balance: {user.coins} coins</div>
                    <div className="text-xs text-gray-500">Worth ₹{Math.floor(user.coins / 10) * 100} in discounts</div>
                  </div>
                </div>
              </div>
            )}

            {tab === 'orders' && (
              <div className="bg-white rounded-2xl shadow-soft p-6">
                <h2 className="font-semibold text-gray-900 text-lg mb-6">Order History</h2>
                {orders.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-5xl mb-4">📦</div>
                    <p className="text-gray-500">No orders yet</p>
                    <Link href="/products" className="btn-yellow mt-4 inline-block">Shop Now</Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map(order => (
                      <div key={order.id} className="border border-gray-100 rounded-xl p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <div className="font-semibold text-sm text-gray-900">{order.id}</div>
                            <div className="text-xs text-gray-400">{order.date}</div>
                          </div>
                          <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-1 rounded-full capitalize">
                            {order.status.replace('_', ' ')}
                          </span>
                        </div>
                        <div className="flex gap-2 mb-3">
                          {order.items.slice(0, 3).map(({ product }) => (
                            <img key={product.id} src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                          ))}
                          {order.items.length > 3 && (
                            <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-xs text-gray-500">
                              +{order.items.length - 3}
                            </div>
                          )}
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-bold text-gray-900">₹{order.total}</span>
                          <Link href="/orders" className="text-xs text-yellow-600 hover:text-yellow-800 font-medium">Track Order →</Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {tab === 'wishlist' && (
              <div className="bg-white rounded-2xl shadow-soft p-6">
                <h2 className="font-semibold text-gray-900 text-lg mb-6">My Wishlist ({wishlist.length})</h2>
                {wishlist.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-5xl mb-4">❤️</div>
                    <p className="text-gray-500">Your wishlist is empty</p>
                    <Link href="/products" className="btn-yellow mt-4 inline-block">Browse Products</Link>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    {wishlist.map(p => <ProductCard key={p.id} product={p} />)}
                  </div>
                )}
              </div>
            )}

            {tab === 'settings' && (
              <div className="bg-white rounded-2xl shadow-soft p-6">
                <h2 className="font-semibold text-gray-900 text-lg mb-6">Settings</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Language</h3>
                    <select className="border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 w-full">
                      <option>English</option>
                      <option>Hindi</option>
                      <option>Bengali</option>
                      <option>Tamil</option>
                    </select>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Notifications</h3>
                    {['Order updates', 'Offers & promotions', 'New arrivals', 'Coin rewards'].map(notif => (
                      <label key={notif} className="flex items-center justify-between py-2">
                        <span className="text-sm text-gray-600">{notif}</span>
                        <div className="w-10 h-6 bg-yellow-400 rounded-full relative cursor-pointer">
                          <div className="w-5 h-5 bg-white rounded-full absolute top-0.5 right-0.5 shadow" />
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
