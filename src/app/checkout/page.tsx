'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '@/store'
import toast from 'react-hot-toast'

type PaymentMethod = 'upi' | 'card' | 'cod'
type Step = 'address' | 'payment' | 'success'

function SuccessAnimation() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="text-8xl mb-6 animate-bounce">🎉</div>
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <span className="text-4xl">✅</span>
        </div>
        <h2 className="font-display text-4xl text-gray-900 mb-3">Order Placed!</h2>
        <p className="text-gray-500 mb-8">Thank you for shopping with Mellow</p>
        <div className="bg-yellow-50 rounded-2xl p-6 max-w-sm mx-auto mb-8 border border-yellow-100">
          <div className="text-2xl mb-2">🪙</div>
          <p className="font-semibold text-gray-900">You earned Mellow Coins!</p>
          <p className="text-sm text-gray-500">Coins added to your account</p>
        </div>
        <div className="flex gap-3 justify-center">
          <a href="/orders" className="btn-yellow">Track My Order</a>
          <a href="/products" className="btn-outline">Continue Shopping</a>
        </div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart, addOrder, user, triggerRewardPopup } = useStore()
  const router = useRouter()
  const [step, setStep] = useState<Step>('address')
  const [payment, setPayment] = useState<PaymentMethod>('upi')
  const [loading, setLoading] = useState(false)
  const [address, setAddress] = useState({
    name: user?.name || '',
    phone: '',
    pincode: '',
    line1: '',
    city: '',
    state: '',
  })

  const total = cartTotal()
  const shipping = total >= 499 ? 0 : 49

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!address.name || !address.phone || !address.line1 || !address.city || !address.pincode) {
      toast.error('Please fill all required fields')
      return
    }
    setStep('payment')
  }

  const handlePlaceOrder = async () => {
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))

    const coinsEarned = Math.floor(total / 200)
    const order = {
      id: 'ORD' + Date.now(),
      items: cart,
      total: total + shipping,
      status: 'placed' as const,
      date: new Date().toLocaleDateString('en-IN'),
      address: `${address.line1}, ${address.city}, ${address.state} - ${address.pincode}`,
      trackingNumber: 'MLW' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN'),
    }
    addOrder(order)
    clearCart()
    if (coinsEarned > 0) triggerRewardPopup(coinsEarned)
    setLoading(false)
    setStep('success')
  }

  if (step === 'success') return <SuccessAnimation />

  if (cart.length === 0) {
    router.push('/cart')
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="font-display text-4xl text-gray-900 mb-8">Checkout</h1>

        {/* Progress */}
        <div className="flex items-center gap-3 mb-8">
          {['Address', 'Payment', 'Done'].map((s, i) => (
            <div key={s} className="flex items-center gap-3">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors
                ${(step === 'address' && i === 0) || (step === 'payment' && i <= 1) || (step === 'success' && i <= 2)
                  ? 'bg-yellow-400 text-gray-900' : 'bg-gray-200 text-gray-500'}`}
              >
                {i + 1}
              </div>
              <span className="text-sm text-gray-600 font-medium">{s}</span>
              {i < 2 && <div className="w-12 h-0.5 bg-gray-200" />}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {step === 'address' && (
              <form onSubmit={handleAddressSubmit} className="bg-white rounded-2xl p-6 shadow-soft">
                <h2 className="font-semibold text-gray-900 text-lg mb-6">Delivery Address</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { key: 'name', label: 'Full Name', placeholder: 'Your name', col: 1 },
                    { key: 'phone', label: 'Phone Number', placeholder: '10-digit mobile number', col: 1 },
                    { key: 'line1', label: 'Address', placeholder: 'House no, Street, Area', col: 2 },
                    { key: 'city', label: 'City', placeholder: 'City', col: 1 },
                    { key: 'state', label: 'State', placeholder: 'State', col: 1 },
                    { key: 'pincode', label: 'PIN Code', placeholder: '6-digit PIN', col: 1 },
                  ].map(field => (
                    <div key={field.key} className={field.col === 2 ? 'sm:col-span-2' : ''}>
                      <label className="block text-xs font-medium text-gray-700 mb-1">{field.label}</label>
                      <input
                        type="text"
                        value={(address as any)[field.key]}
                        onChange={e => setAddress(prev => ({ ...prev, [field.key]: e.target.value }))}
                        placeholder={field.placeholder}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400 transition-colors"
                      />
                    </div>
                  ))}
                </div>
                <button type="submit" className="mt-6 btn-yellow w-full">
                  Continue to Payment
                </button>
              </form>
            )}

            {step === 'payment' && (
              <div className="bg-white rounded-2xl p-6 shadow-soft">
                <h2 className="font-semibold text-gray-900 text-lg mb-6">Payment Method</h2>
                <div className="space-y-3 mb-8">
                  {([
                    { id: 'upi', label: 'UPI Payment', icon: '📱', desc: 'Pay via any UPI app' },
                    { id: 'card', label: 'Credit / Debit Card', icon: '💳', desc: 'Visa, Mastercard, RuPay' },
                    { id: 'cod', label: 'Cash on Delivery', icon: '💵', desc: 'Pay when you receive' },
                  ] as const).map(opt => (
                    <label
                      key={opt.id}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-colors
                        ${payment === opt.id ? 'border-yellow-400 bg-yellow-50' : 'border-gray-100 hover:border-gray-200'}`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={opt.id}
                        checked={payment === opt.id}
                        onChange={() => setPayment(opt.id)}
                        className="hidden"
                      />
                      <span className="text-2xl">{opt.icon}</span>
                      <div>
                        <div className="font-semibold text-gray-900 text-sm">{opt.label}</div>
                        <div className="text-xs text-gray-500">{opt.desc}</div>
                      </div>
                      <div className={`ml-auto w-5 h-5 rounded-full border-2 flex items-center justify-center
                        ${payment === opt.id ? 'border-yellow-500 bg-yellow-400' : 'border-gray-300'}`}>
                        {payment === opt.id && <div className="w-2 h-2 rounded-full bg-white" />}
                      </div>
                    </label>
                  ))}
                </div>

                {payment === 'upi' && (
                  <div className="bg-gray-50 rounded-xl p-4 mb-4">
                    <label className="block text-xs font-medium text-gray-700 mb-1">UPI ID</label>
                    <input type="text" placeholder="yourname@upi" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-yellow-400" />
                  </div>
                )}

                {payment === 'card' && (
                  <div className="bg-gray-50 rounded-xl p-4 mb-4 space-y-3">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Card Number</label>
                      <input type="text" placeholder="1234 5678 9012 3456" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-yellow-400" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">Expiry</label>
                        <input type="text" placeholder="MM/YY" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-yellow-400" />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-1">CVV</label>
                        <input type="text" placeholder="***" className="w-full bg-white border border-gray-200 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-yellow-400" />
                      </div>
                    </div>
                  </div>
                )}

                <button
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  className="btn-yellow w-full flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <><span className="animate-spin">⏳</span> Processing...</>
                  ) : (
                    `Place Order · ₹${total + shipping}`
                  )}
                </button>
                <button onClick={() => setStep('address')} className="mt-3 w-full text-sm text-gray-500 hover:text-gray-700">
                  ← Back to Address
                </button>
              </div>
            )}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-soft sticky top-24">
              <h2 className="font-display text-xl text-gray-900 mb-4">Order Summary</h2>
              <div className="space-y-3 mb-4">
                {cart.map(({ product, quantity }) => (
                  <div key={product.id} className="flex gap-3 items-center">
                    <img src={product.image} alt={product.name} className="w-12 h-12 rounded-xl object-cover" />
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-gray-900 font-medium truncate">{product.name}</div>
                      <div className="text-xs text-gray-500">Qty: {quantity}</div>
                    </div>
                    <div className="text-sm font-bold">₹{product.price * quantity}</div>
                  </div>
                ))}
              </div>
              <hr className="border-gray-100 mb-3" />
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span><span>₹{total}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-green-600 font-medium' : ''}>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                </div>
                <div className="flex justify-between font-bold text-gray-900 text-base pt-2 border-t border-gray-100">
                  <span>Total</span><span>₹{total + shipping}</span>
                </div>
              </div>
              <div className="mt-4 bg-yellow-50 rounded-xl p-3 border border-yellow-100">
                <div className="text-xs text-yellow-800 font-medium">
                  🪙 You'll earn {Math.floor(total / 200)} Mellow Coins on this order!
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
