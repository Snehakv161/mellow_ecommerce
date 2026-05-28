import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

export const supabase = createClientComponentClient()

// Database types
export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          name: string
          brand: string
          category: string
          price: number
          original_price: number
          discount: number
          rating: number
          reviews: number
          image: string
          images: string[]
          description: string
          ingredients: string
          benefits: string[]
          usage: string
          skin_type: string[]
          in_stock: boolean
          is_trending: boolean
          is_best_seller: boolean
          is_featured: boolean
          tags: string[]
          created_at: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          items: any[]
          total: number
          status: string
          address: string
          tracking_number: string
          estimated_delivery: string
          created_at: string
        }
      }
      users: {
        Row: {
          id: string
          name: string
          email: string
          role: string
          coins: number
          created_at: string
        }
      }
    }
  }
}
