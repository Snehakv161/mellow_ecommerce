'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useStore } from '@/store'

const DEMO_USERS = [
  { id: 'u1', name: 'Priya Sharma', email: 'priya@example.com', role: 'user', coins: 45, orders: 3, joined: '12 Jan 2024' },
  { id: 'u2', name: 'Ananya Patel', email: 'ananya@example.com', role: 'user', coins: 120, orders: 8, joined: '5 Feb 2024' },
  { id: 'u3', name: 'Kavya Nair', email: 'kavya@example.com', role: 'user', coins: 10, orders: 1, joined: '20 Mar 2024' },
  { id: 'u4', name: 'Sneha Reddy', email: 'sneha@example.com', role: 'user', coins: 65, orders: 5, joined: '3 Apr 2024' },
  { id: 'u5', name: 'Admin', email: 'admin@mellow.com', role: 'admin', coins: 0, orders: 0, joined: '1 Jan 2024' },
]

export default function AdminUsersPage() {
  const { user, isAuthenticated } = useStore()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') router.push('/login')
  }, [isAuthenticated, user])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Link href="/admin/dashboard" className="text-sm text-gray-500 hover:text-gray-700">← Dashboard</Link>
          <h1 className="font-display text-3xl text-gray-900 mt-1">Users ({DEMO_USERS.length})</h1>
        </div>

        <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  {['User', 'Email', 'Role', 'Coins', 'Orders', 'Joined'].map(h => (
                    <th key={h} className="text-left px-6 py-4 text-gray-500 font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {DEMO_USERS.map(u => (
                  <tr key={u.id} className="border-b border-gray-50 hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-yellow-200 flex items-center justify-center font-bold text-sm">
                          {u.name.charAt(0)}
                        </div>
                        <span className="font-medium text-gray-900">{u.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{u.email}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-600'}`}>
                        {u.role === 'admin' ? '👑 Admin' : '🌸 User'}
                      </span>
                    </td>
                    <td className="px-6 py-4">🪙 {u.coins}</td>
                    <td className="px-6 py-4">{u.orders}</td>
                    <td className="px-6 py-4 text-gray-500">{u.joined}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
