'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ShoppingBag, Heart, User, Search, Menu, X, Coins } from 'lucide-react'
import { useStore } from '@/store'
import toast from 'react-hot-toast'

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()
  const { cartCount, isAuthenticated, user, logout } = useStore()
  const count = cartCount()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`)
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  const handleLogout = () => {
    logout()
    toast.success('Logged out successfully')
    router.push('/')
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="font-display text-2xl font-semibold text-gray-900">
              Mellow
            </Link>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center gap-8">
              <Link href="/products" className="text-sm font-body text-gray-600 hover:text-gray-900 transition-colors">
                All Products
              </Link>
              <Link href="/products?category=Skincare" className="text-sm font-body text-gray-600 hover:text-gray-900 transition-colors">
                Skincare
              </Link>
              <Link href="/products?category=Makeup" className="text-sm font-body text-gray-600 hover:text-gray-900 transition-colors">
                Makeup
              </Link>
              <Link href="/products?category=Haircare" className="text-sm font-body text-gray-600 hover:text-gray-900 transition-colors">
                Haircare
              </Link>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 rounded-full hover:bg-yellow-50 transition-colors"
              >
                <Search size={20} className="text-gray-700" />
              </button>

              {/* Wishlist */}
              <Link href="/profile?tab=wishlist" className="p-2 rounded-full hover:bg-yellow-50 transition-colors">
                <Heart size={20} className="text-gray-700" />
              </Link>

              {/* Cart */}
              <Link href="/cart" className="p-2 rounded-full hover:bg-yellow-50 transition-colors relative">
                <ShoppingBag size={20} className="text-gray-700" />
                {count > 0 && (
                  <span className="absolute -top-1 -right-1 bg-yellow-300 text-gray-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {count}
                  </span>
                )}
              </Link>

              {/* User */}
              {isAuthenticated ? (
                <div className="relative group">
                  <button className="flex items-center gap-2 p-2 rounded-full hover:bg-yellow-50 transition-colors">
                    <div className="w-7 h-7 rounded-full bg-yellow-200 flex items-center justify-center text-xs font-bold">
                      {user?.name?.charAt(0) || 'U'}
                    </div>
                  </button>
                  <div className="absolute right-0 top-12 bg-white rounded-2xl shadow-card border border-gray-100 w-48 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                    {user?.role === 'admin' && (
                      <Link href="/admin/dashboard" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50">
                        Admin Panel
                      </Link>
                    )}
                    <Link href="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50">
                      <User size={14} /> My Profile
                    </Link>
                    <Link href="/orders" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50">
                      📦 My Orders
                    </Link>
                    <Link href="/profile?tab=wishlist" className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-yellow-50">
                      <Heart size={14} /> Wishlist
                    </Link>
                    <div className="flex items-center gap-2 px-4 py-2 text-sm text-yellow-600 font-semibold">
                      <Coins size={14} /> {user?.coins || 0} Mellow Coins
                    </div>
                    <hr className="my-1 border-gray-100" />
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              ) : (
                <Link href="/login" className="btn-yellow text-sm py-2 px-4">
                  Login
                </Link>
              )}

              {/* Mobile menu */}
              <button
                className="md:hidden p-2 rounded-full hover:bg-yellow-50"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="border-t border-gray-100 px-4 py-3 bg-white">
            <form onSubmit={handleSearch} className="max-w-2xl mx-auto flex gap-2">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for products, brands..."
                className="flex-1 px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-yellow-300 text-sm"
                autoFocus
              />
              <button type="submit" className="btn-yellow text-sm py-2 px-6">
                Search
              </button>
            </form>
          </div>
        )}

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-100 bg-white px-4 py-4 flex flex-col gap-4">
            <Link href="/products" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-gray-700">All Products</Link>
            <Link href="/products?category=Sunscreen" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-gray-700">Skincare</Link>
            <Link href="/products?category=Makeup" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-gray-700">Makeup</Link>
            <Link href="/products?category=Haircare" onClick={() => setMenuOpen(false)} className="text-sm font-medium text-gray-700">Haircare</Link>
            {!isAuthenticated && (
              <div className="flex gap-2 pt-2">
                <Link href="/login" className="btn-yellow text-sm flex-1 text-center" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link href="/register" className="btn-outline text-sm flex-1 text-center" onClick={() => setMenuOpen(false)}>Register</Link>
              </div>
            )}
          </div>
        )}
      </nav>
      <div className="h-16" />
    </>
  )
}
