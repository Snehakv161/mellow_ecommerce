'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'
import { useStore } from '@/store'
import toast from 'react-hot-toast'

export default function RegisterPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [showPw, setShowPw] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useStore()
  const router = useRouter()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.password) { toast.error('Please fill all fields'); return }
    if (form.password !== form.confirm) { toast.error('Passwords do not match'); return }
    if (form.password.length < 6) { toast.error('Password must be at least 6 characters'); return }

    setLoading(true)
    await new Promise(r => setTimeout(r, 800))
    login({ id: 'user_' + Date.now(), name: form.name, email: form.email, coins: 10, role: 'user' })
    toast.success('Account created! Welcome to Mellow 🌸 You got 10 welcome coins!')
    router.push('/')
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-yellow-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="font-display text-4xl text-gray-900">Mellow</Link>
          <p className="text-gray-500 mt-2">Start your glow journey ✨</p>
        </div>

        <div className="bg-white rounded-3xl shadow-card p-8">
          <h2 className="font-display text-2xl text-gray-900 mb-6">Create Account</h2>

          {/* Welcome coin banner */}
          <div className="bg-yellow-50 rounded-xl p-3 flex items-center gap-3 mb-6 border border-yellow-100">
            <span className="text-2xl">🪙</span>
            <div>
              <div className="text-sm font-semibold text-gray-900">Get 10 Welcome Coins!</div>
              <div className="text-xs text-gray-500">Sign up and start earning rewards</div>
            </div>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            {[
              { key: 'name', label: 'Full Name', type: 'text', placeholder: 'Your name' },
              { key: 'email', label: 'Email', type: 'email', placeholder: 'you@example.com' },
            ].map(field => (
              <div key={field.key}>
                <label className="block text-xs font-medium text-gray-700 mb-1">{field.label}</label>
                <input
                  type={field.type}
                  value={(form as any)[field.key]}
                  onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                  placeholder={field.placeholder}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition-colors"
                />
              </div>
            ))}

            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={form.password}
                  onChange={e => setForm(prev => ({ ...prev, password: e.target.value }))}
                  placeholder="Min. 6 characters"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 pr-10 text-sm focus:outline-none focus:border-yellow-400 transition-colors"
                />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-3 text-gray-400">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">Confirm Password</label>
              <input
                type="password"
                value={form.confirm}
                onChange={e => setForm(prev => ({ ...prev, confirm: e.target.value }))}
                placeholder="Re-enter password"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition-colors"
              />
            </div>

            <button type="submit" disabled={loading} className="w-full btn-yellow">
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 mt-6">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-yellow-600 hover:text-yellow-800">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
