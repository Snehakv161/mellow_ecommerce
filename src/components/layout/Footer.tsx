import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-100 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <h2 className="font-display text-3xl text-gray-900 mb-3">Mellow</h2>
            <p className="text-sm text-gray-500 leading-relaxed">
              Your destination for luxury skincare and cosmetics. Korean-inspired beauty, curated for every skin type.
            </p>
            <div className="flex gap-4 mt-6">
              {['Instagram', 'YouTube', 'Pinterest'].map(platform => (
                <a key={platform} href="#" className="text-xs text-gray-500 hover:text-gray-900 transition-colors">
                  {platform}
                </a>
              ))}
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">Shop</h3>
            <ul className="space-y-3">
              {['All Products', 'Skincare', 'Makeup', 'Haircare', 'Body Care', 'New Arrivals'].map(link => (
                <li key={link}>
                  <Link href="/products" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">Help</h3>
            <ul className="space-y-3">
              {['Track Order', 'Returns & Refunds', 'Shipping Policy', 'Contact Us', 'FAQ'].map(link => (
                <li key={link}>
                  <a href="#" className="text-sm text-gray-500 hover:text-gray-900 transition-colors">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Rewards */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4 text-sm uppercase tracking-wider">Mellow Coins</h3>
            <div className="bg-yellow-50 rounded-2xl p-4 border border-yellow-100">
              <div className="text-3xl mb-2">🪙</div>
              <p className="text-sm text-gray-700 font-medium">Earn rewards on every purchase!</p>
              <p className="text-xs text-gray-500 mt-1">Every ₹200 spent = 1 Mellow Coin</p>
              <p className="text-xs text-gray-500">10 coins = ₹100 discount</p>
              <Link href="/register" className="btn-yellow text-xs mt-3 inline-block px-4 py-2">
                Join Now
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            © 2024 Mellow. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(link => (
              <a key={link} href="#" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">
                {link}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span>Secure payments via</span>
            <span className="font-semibold text-gray-600">Razorpay</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
