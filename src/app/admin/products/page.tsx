'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Plus, Pencil, Trash2, Search } from 'lucide-react'
import { products as initialProducts, Product } from '@/data/products'
import { useStore } from '@/store'
import toast from 'react-hot-toast'

export default function AdminProductsPage() {
  const { user, isAuthenticated } = useStore()
  const router = useRouter()
  const [productList, setProductList] = useState(initialProducts)
  const [search, setSearch] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editProduct, setEditProduct] = useState<Partial<Product> | null>(null)

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') router.push('/login')
  }, [isAuthenticated, user])

  const filtered = productList.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.brand.toLowerCase().includes(search.toLowerCase())
  )

  const handleDelete = (id: string) => {
    setProductList(prev => prev.filter(p => p.id !== id))
    toast.success('Product deleted')
  }

  const handleSave = () => {
    if (!editProduct?.name || !editProduct?.price) {
      toast.error('Please fill required fields')
      return
    }
    if (editProduct.id) {
      setProductList(prev => prev.map(p => p.id === editProduct.id ? { ...p, ...editProduct } as Product : p))
      toast.success('Product updated!')
    } else {
      const newProduct: Product = {
        ...editProduct as Product,
        id: 'p_' + Date.now(),
        image: editProduct.image || 'https://placehold.co/400x400?text=Product',
        images: [editProduct.image || 'https://placehold.co/400x400?text=Product'],
        rating: 4.0, reviews: 0,
        inStock: true, isTrending: false, isBestSeller: false, isFeatured: false,
        tags: [], benefits: [], skinType: ['All Skin Types'],
      }
      setProductList(prev => [newProduct, ...prev])
      toast.success('Product added!')
    }
    setShowModal(false)
    setEditProduct(null)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link href="/admin/dashboard" className="text-sm text-gray-500 hover:text-gray-700">← Dashboard</Link>
            <h1 className="font-display text-3xl text-gray-900 mt-1">Products</h1>
          </div>
          <button
            onClick={() => { setEditProduct({}); setShowModal(true) }}
            className="btn-yellow flex items-center gap-2"
          >
            <Plus size={16} /> Add Product
          </button>
        </div>

        {/* Search */}
        <div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-gray-200 mb-6 max-w-md">
          <Search size={16} className="text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search products..."
            className="flex-1 text-sm outline-none"
          />
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-6 py-4 text-gray-500 font-medium">Product</th>
                  <th className="text-left px-6 py-4 text-gray-500 font-medium">Category</th>
                  <th className="text-left px-6 py-4 text-gray-500 font-medium">Price</th>
                  <th className="text-left px-6 py-4 text-gray-500 font-medium">Stock</th>
                  <th className="text-left px-6 py-4 text-gray-500 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img src={p.image} alt={p.name} className="w-12 h-12 rounded-xl object-cover" />
                        <div>
                          <div className="font-medium text-gray-900">{p.name}</div>
                          <div className="text-xs text-gray-400">{p.brand}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{p.category}</td>
                    <td className="px-6 py-4 font-semibold">₹{p.price}</td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${p.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {p.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <button
                          onClick={() => { setEditProduct(p); setShowModal(true) }}
                          className="p-2 hover:bg-yellow-50 rounded-lg transition-colors text-gray-600 hover:text-yellow-700"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(p.id)}
                          className="p-2 hover:bg-red-50 rounded-lg transition-colors text-gray-600 hover:text-red-600"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl shadow-card p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
              <h2 className="font-semibold text-gray-900 text-lg mb-4">
                {editProduct?.id ? 'Edit Product' : 'Add Product'}
              </h2>
              <div className="space-y-4">
                {[
                  { key: 'name', label: 'Product Name', placeholder: 'e.g. Niacinamide Serum' },
                  { key: 'brand', label: 'Brand', placeholder: 'e.g. Minimalist' },
                  { key: 'category', label: 'Category', placeholder: 'e.g. Serum' },
                  { key: 'price', label: 'Price (₹)', placeholder: '599', type: 'number' },
                  { key: 'originalPrice', label: 'Original Price (₹)', placeholder: '799', type: 'number' },
                  { key: 'image', label: 'Image URL', placeholder: 'https://...' },
                  { key: 'description', label: 'Description', placeholder: 'Product description...' },
                ].map(field => (
                  <div key={field.key}>
                    <label className="block text-xs font-medium text-gray-700 mb-1">{field.label}</label>
                    {field.key === 'description' ? (
                      <textarea
                        value={(editProduct as any)?.[field.key] || ''}
                        onChange={e => setEditProduct(prev => ({ ...prev, [field.key]: e.target.value }))}
                        placeholder={field.placeholder}
                        rows={3}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400"
                      />
                    ) : (
                      <input
                        type={field.type || 'text'}
                        value={(editProduct as any)?.[field.key] || ''}
                        onChange={e => setEditProduct(prev => ({ ...prev, [field.key]: field.type === 'number' ? Number(e.target.value) : e.target.value }))}
                        placeholder={field.placeholder}
                        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-yellow-400"
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={handleSave} className="flex-1 btn-yellow">Save</button>
                <button onClick={() => { setShowModal(false); setEditProduct(null) }} className="flex-1 btn-outline">Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
