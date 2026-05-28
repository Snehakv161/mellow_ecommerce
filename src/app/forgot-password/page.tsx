'use client'

import { useState } from 'react'
import Link from 'next/link'
import toast from 'react-hot-toast'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) { toast.error('Please enter your email'); return }
    setSent(true)
    toast.success('Reset link sent!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-yellow-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/" className="font-display text-4xl text-gray-900">Mellow</Link>
        </div>
        <div className="bg-white rounded-3xl shadow-card p-8">
          {sent ? (
            <div className="text-center">
              <div className="text-6xl mb-4">📧</div>
              <h2 className="font-display text-2xl text-gray-900 mb-3">Check your inbox</h2>
              <p className="text-gray-500 text-sm mb-6">We've sent a password reset link to <strong>{email}</strong></p>
              <Link href="/login" className="btn-yellow">Back to Login</Link>
            </div>
          ) : (
            <>
              <h2 className="font-display text-2xl text-gray-900 mb-2">Forgot Password</h2>
              <p className="text-gray-500 text-sm mb-6">Enter your email and we'll send you a reset link.</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400"
                  />
                </div>
                <button type="submit" className="w-full btn-yellow">Send Reset Link</button>
              </form>
              <Link href="/login" className="block text-center text-sm text-gray-500 mt-4 hover:text-gray-700">← Back to Login</Link>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
