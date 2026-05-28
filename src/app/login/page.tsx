'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'
import { useStore } from '@/store'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useStore()
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email || !password) { toast.error('Please fill all fields'); return }
    setLoading(true)
    await new Promise(r => setTimeout(r, 800))

    // Demo: admin login
    const isAdmin = email === 'admin@mellow.com'
    login({
      id: 'user_' + Date.now(),
      name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
      email,
      coins: 25,
      role: isAdmin ? 'admin' : 'user',
    })
    toast.success('Welcome back! 🌸')
    router.push('/')
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-yellow-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="font-display text-4xl text-gray-900">Mellow</Link>
          <p className="text-gray-500 mt-2">Welcome back, beautiful ✨</p>
        </div>

        <div className="bg-white rounded-3xl shadow-card p-8">
          <h2 className="font-display text-2xl text-gray-900 mb-6">Sign In</h2>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-10 text-sm focus:outline-none focus:border-yellow-400 transition-colors"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-3 text-gray-400">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <Link href="/forgot-password" className="text-xs text-yellow-600 hover:text-yellow-800">Forgot password?</Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-yellow flex items-center justify-center gap-2"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-100" /></div>
            <div className="relative text-center"><span className="bg-white px-4 text-xs text-gray-400">or continue with</span></div>
          </div>

          <button className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors">
            <span className="text-lg">G</span> Continue with Google
          </button>

          <p className="text-center text-sm text-gray-500 mt-6">
            Don't have an account?{' '}
            <Link href="/register" className="font-semibold text-yellow-600 hover:text-yellow-800">Sign Up</Link>
          </p>

          <p className="text-center text-xs text-gray-400 mt-3">
            Demo: any email + any password works<br/>
            Admin: admin@mellow.com
          </p>
        </div>
      </div>
    </div>
  )
}
