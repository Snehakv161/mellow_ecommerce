'use client'

import { useStore } from '@/store'
import { useEffect } from 'react'

export function RewardPopup() {
  const { showRewardPopup, rewardCoins, closeRewardPopup } = useStore()

  useEffect(() => {
    if (showRewardPopup) {
      const t = setTimeout(closeRewardPopup, 4000)
      return () => clearTimeout(t)
    }
  }, [showRewardPopup])

  if (!showRewardPopup) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div
        className="reward-popup bg-white rounded-3xl shadow-card border border-yellow-200 px-8 py-8 text-center max-w-xs pointer-events-auto"
        onClick={closeRewardPopup}
      >
        <div className="text-6xl mb-3" style={{ animation: 'bounce 1s ease-in-out infinite' }}>🪙</div>
        <h2 className="font-display text-2xl text-gray-900 mb-1">+{rewardCoins} Coins!</h2>
        <p className="text-gray-500 text-sm">Mellow Coins added to your account</p>
        <div className="mt-4 bg-yellow-50 rounded-xl p-3 border border-yellow-100">
          <p className="text-xs text-yellow-800 font-medium">Every ₹200 spent = 1 Mellow Coin 🌟</p>
        </div>
        <button className="mt-4 text-xs text-gray-400 hover:text-gray-600">Tap to dismiss</button>
      </div>
    </div>
  )
}
