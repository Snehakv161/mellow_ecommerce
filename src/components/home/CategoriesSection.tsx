'use client'

import Link from 'next/link'
import { categories } from '@/data/products'

export function CategoriesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display text-4xl text-gray-900 mb-3">Shop by Category</h2>
          <p className="text-gray-500">Find exactly what your skin needs</p>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              href={`/products?category=${encodeURIComponent(cat.name)}`}
              className="flex flex-col items-center gap-3 p-4 rounded-2xl border border-gray-100 hover:border-yellow-200 hover:bg-yellow-50 transition-all group cursor-pointer"
            >
              <div className={`w-12 h-12 ${cat.color} rounded-xl flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                {cat.icon}
              </div>
              <span className="text-xs font-medium text-gray-700 text-center">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
