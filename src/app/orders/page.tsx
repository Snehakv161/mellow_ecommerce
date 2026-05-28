'use client'

import { useStore } from '@/store'
import Link from 'next/link'

const STEPS = [
  { key: 'placed', label: 'Order Placed', icon: '📦', desc: 'Your order has been received' },
  { key: 'packed', label: 'Packed', icon: '📫', desc: 'Items packed & ready to ship' },
  { key: 'shipped', label: 'Shipped', icon: '🚚', desc: 'On the way to you' },
  { key: 'out_for_delivery', label: 'Out for Delivery', icon: '🛵', desc: 'Almost there!' },
  { key: 'delivered', label: 'Delivered', icon: '✅', desc: 'Enjoy your Mellow products!' },
]

const ORDER_STATUS_INDEX: Record<string, number> = {
  placed: 0, packed: 1, shipped: 2, out_for_delivery: 3, delivered: 4
}

export default function OrdersPage() {
  const { orders } = useStore()

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="text-8xl mb-6">📦</div>
          <h2 className="font-display text-3xl text-gray-900 mb-3">No orders yet</h2>
          <p className="text-gray-500 mb-8">Time to treat yourself!</p>
          <Link href="/products" className="btn-yellow">Shop Now</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="font-display text-4xl text-gray-900 mb-8">My Orders</h1>

        <div className="space-y-8">
          {orders.map(order => {
            const statusIdx = ORDER_STATUS_INDEX[order.status]

            return (
              <div key={order.id} className="bg-white rounded-2xl shadow-soft overflow-hidden">
                {/* Order header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Order ID</div>
                      <div className="font-semibold text-gray-900">{order.id}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Tracking No.</div>
                      <div className="font-semibold text-gray-900">{order.trackingNumber}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Order Date</div>
                      <div className="font-semibold text-gray-900">{order.date}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Est. Delivery</div>
                      <div className="font-semibold text-green-600">{order.estimatedDelivery}</div>
                    </div>
                    <div>
                      <div className="text-xs text-gray-400 mb-1">Total</div>
                      <div className="font-bold text-gray-900">₹{order.total}</div>
                    </div>
                  </div>

                  {/* Items */}
                  <div className="flex gap-2 flex-wrap">
                    {order.items.map(({ product, quantity }) => (
                      <div key={product.id} className="flex items-center gap-2 bg-gray-50 rounded-xl px-3 py-2">
                        <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover" />
                        <div>
                          <div className="text-xs font-medium text-gray-900 max-w-[120px] truncate">{product.name}</div>
                          <div className="text-xs text-gray-400">Qty: {quantity}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tracking timeline */}
                <div className="p-6">
                  <h3 className="font-semibold text-gray-900 mb-6 text-sm">Tracking</h3>
                  <div className="relative">
                    {/* Progress line */}
                    <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-gray-200" />
                    <div
                      className="absolute left-5 top-5 w-0.5 bg-yellow-400 transition-all duration-1000"
                      style={{ height: `${(statusIdx / (STEPS.length - 1)) * 100}%` }}
                    />

                    <div className="space-y-6 relative">
                      {STEPS.map((step, i) => {
                        const done = i <= statusIdx
                        const active = i === statusIdx
                        return (
                          <div key={step.key} className="flex items-start gap-4">
                            <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all
                              ${active ? 'bg-yellow-400 shadow-glow scale-110' : done ? 'bg-yellow-300' : 'bg-gray-100'}`}
                            >
                              {step.icon}
                            </div>
                            <div className="pt-1">
                              <div className={`font-semibold text-sm ${done ? 'text-gray-900' : 'text-gray-400'}`}>
                                {step.label}
                                {active && <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full font-normal">Current</span>}
                              </div>
                              <div className="text-xs text-gray-400">{step.desc}</div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                    <div className="text-xs text-gray-500">Delivery Address</div>
                    <div className="text-sm text-gray-800 font-medium mt-1">{order.address}</div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
