'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useStore } from '@/store'
import { products } from '@/data/products'

export default function AdminDashboard() {
  const { user, isAuthenticated, orders } = useStore()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') router.push('/login')
  }, [isAuthenticated, user])

  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0)

  const stats = [
    { label: 'Total Products', value: products.length, icon: '🧴', color: 'bg-blue-50' },
    { label: 'Total Orders', value: orders.length, icon: '📦', color: 'bg-green-50' },
    { label: 'Revenue', value: `₹${totalRevenue}`, icon: '💰', color: 'bg-yellow-50' },
    { label: 'Users', value: '1,240', icon: '👥', color: 'bg-purple-50' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-display text-4xl text-gray-900">Admin Panel</h1>
            <p className="text-gray-500 mt-1">Welcome back, {user?.name}</p>
          </div>
          <Link href="/" className="btn-outline text-sm">← Back to Store</Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map(s => (
            <div key={s.label} className={`${s.color} rounded-2xl p-5 border border-white`}>
              <div className="text-3xl mb-2">{s.icon}</div>
              <div className="text-2xl font-bold text-gray-900">{s.value}</div>
              <div className="text-sm text-gray-500">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { title: 'Manage Products', desc: 'Add, edit or remove products', href: '/admin/products', icon: '🧴' },
            { title: 'View Orders', desc: 'Track and manage all orders', href: '/admin/orders', icon: '📦' },
            { title: 'Manage Users', desc: 'View and manage user accounts', href: '/admin/users', icon: '👥' },
          ].map(item => (
            <Link key={item.title} href={item.href}
              className="bg-white rounded-2xl shadow-soft p-6 hover:shadow-card transition-shadow flex items-start gap-4 group"
            >
              <div className="text-4xl">{item.icon}</div>
              <div>
                <div className="font-semibold text-gray-900 group-hover:text-yellow-600 transition-colors">{item.title}</div>
                <div className="text-sm text-gray-500 mt-1">{item.desc}</div>
              </div>
            </Link>
          ))}
        </div>

        {/* Recent orders */}
        <div className="bg-white rounded-2xl shadow-soft p-6">
          <h2 className="font-semibold text-gray-900 text-lg mb-4">Recent Orders</h2>
          {orders.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-8">No orders yet</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="text-left py-3 text-gray-500 font-medium">Order ID</th>
                    <th className="text-left py-3 text-gray-500 font-medium">Items</th>
                    <th className="text-left py-3 text-gray-500 font-medium">Total</th>
                    <th className="text-left py-3 text-gray-500 font-medium">Status</th>
                    <th className="text-left py-3 text-gray-500 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 10).map(order => (
                    <tr key={order.id} className="border-b border-gray-50">
                      <td className="py-3 font-mono text-xs">{order.id}</td>
                      <td className="py-3">{order.items.length} items</td>
                      <td className="py-3 font-semibold">₹{order.total}</td>
                      <td className="py-3">
                        <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full capitalize">
                          {order.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3 text-gray-500">{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
