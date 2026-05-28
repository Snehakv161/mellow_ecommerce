import { Star } from 'lucide-react'
import { reviews } from '@/data/products'

export function CustomerReviews() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl text-gray-900 mb-3">What Our Customers Say</h2>
          <p className="text-gray-500">Real reviews from real people</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map(review => (
            <div key={review.id} className="bg-yellow-50 rounded-3xl p-6 border border-yellow-100">
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'} />
                ))}
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-5 italic">"{review.comment}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-yellow-300 flex items-center justify-center text-sm font-bold text-gray-800">
                  {review.avatar}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">{review.name}</div>
                  <div className="text-xs text-gray-400">{review.product} · {review.date}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
