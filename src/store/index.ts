import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/data/products';

interface CartItem {
  product: Product;
  quantity: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  coins: number;
  role: 'user' | 'admin';
}

interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: 'placed' | 'packed' | 'shipped' | 'out_for_delivery' | 'delivered';
  date: string;
  address: string;
  trackingNumber: string;
  estimatedDelivery: string;
}

interface StoreState {
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: () => number;
  cartCount: () => number;

  // Wishlist
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isWishlisted: (productId: string) => boolean;

  // Orders
  orders: Order[];
  addOrder: (order: Order) => void;

  // UI
  showRewardPopup: boolean;
  rewardCoins: number;
  triggerRewardPopup: (coins: number) => void;
  closeRewardPopup: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Auth
      user: null,
      isAuthenticated: false,
      login: (user) => set({ user, isAuthenticated: true }),
      logout: () => set({ user: null, isAuthenticated: false }),

      // Cart
      cart: [],
      addToCart: (product) => {
        const existing = get().cart.find(item => item.product.id === product.id);
        if (existing) {
          set({
            cart: get().cart.map(item =>
              item.product.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          });
        } else {
          set({ cart: [...get().cart, { product, quantity: 1 }] });
        }
      },
      removeFromCart: (productId) =>
        set({ cart: get().cart.filter(item => item.product.id !== productId) }),
      updateQuantity: (productId, quantity) => {
        if (quantity === 0) {
          get().removeFromCart(productId);
          return;
        }
        set({
          cart: get().cart.map(item =>
            item.product.id === productId ? { ...item, quantity } : item
          )
        });
      },
      clearCart: () => set({ cart: [] }),
      cartTotal: () => get().cart.reduce((total, item) => total + item.product.price * item.quantity, 0),
      cartCount: () => get().cart.reduce((count, item) => count + item.quantity, 0),

      // Wishlist
      wishlist: [],
      toggleWishlist: (product) => {
        const isIn = get().wishlist.some(p => p.id === product.id);
        if (isIn) {
          set({ wishlist: get().wishlist.filter(p => p.id !== product.id) });
        } else {
          set({ wishlist: [...get().wishlist, product] });
        }
      },
      isWishlisted: (productId) => get().wishlist.some(p => p.id === productId),

      // Orders
      orders: [],
      addOrder: (order) => set({ orders: [order, ...get().orders] }),

      // UI
      showRewardPopup: false,
      rewardCoins: 0,
      triggerRewardPopup: (coins) => set({ showRewardPopup: true, rewardCoins: coins }),
      closeRewardPopup: () => set({ showRewardPopup: false }),
    }),
    {
      name: 'mellow-store',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        cart: state.cart,
        wishlist: state.wishlist,
        orders: state.orders,
      }),
    }
  )
);
