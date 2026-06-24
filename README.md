# 🌸 Mellow — Luxury Skincare & Cosmetics E-Commerce

A full-stack e-commerce web app built with Next.js 14, Tailwind CSS, Framer Motion, and Supabase.

---

## ✨ Features

- 🌟 Animated landing page with glowing intro
- 🏠 Full homepage (hero, categories, featured, trending, bestsellers, reviews)
- 🔍 Product listing with live search + filters (brand, skin type, price, rating)
- 📦 Product detail page with multiple images, tabs, reviews
- 🛒 Cart with quantity management
- 💳 Checkout with UPI / Card / COD payment options
- 📍 Order tracking with animated timeline
- 👤 User profile with wishlist, order history, settings
- 🪙 Mellow Coins reward system
- 👑 Admin panel (products, orders, users)
- 🔐 Auth system (Login / Register / Forgot Password)
- 📱 Mobile responsive design

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Copy `.env.local.example` to `.env.local` and fill in your values:

```bash
cp .env.local.example .env.local
```

Fill in:
- `NEXT_PUBLIC_SUPABASE_URL` — from your Supabase project settings
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — from your Supabase project settings
- `NEXT_PUBLIC_RAZORPAY_KEY_ID` — from your Razorpay dashboard

### 3. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** and run the contents of `supabase-schema.sql`
3. Enable **Email Auth** in Authentication > Providers

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🔑 Demo Login

The app works fully without Supabase (uses local state):

- **Any email + any password** → logs in as regular user
- **admin@mellow.com + any password** → logs in as admin

---

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx            # Landing + Home page
│   ├── products/           # Product listing
│   ├── product/[id]/       # Product detail
│   ├── cart/               # Cart
│   ├── checkout/           # Checkout + payment
│   ├── orders/             # Order tracking
│   ├── profile/            # User profile
│   ├── login/              # Auth pages
│   ├── register/
│   ├── forgot-password/
│   └── admin/              # Admin panel
│       ├── dashboard/
│       ├── products/
│       ├── orders/
│       └── users/
├── components/
│   ├── layout/             # Navbar, Footer
│   ├── home/               # Home page sections
│   ├── product/            # ProductCard
│   └── ui/                 # RewardPopup
├── data/
│   └── products.ts         # Mock product data
├── store/
│   └── index.ts            # Zustand global store
└── lib/
    └── supabase.ts         # Supabase client
```

---

## 🎨 Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS |
| Animations | CSS Animations + Framer Motion ready |
| State | Zustand (with localStorage persistence) |
| Backend | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| Payments | Razorpay (integration ready) |
| Icons | Lucide React |
| Notifications | React Hot Toast |

---

## 🪙 Mellow Coins System

- Every purchase above ₹200 = 1 Mellow Coin
- 10 coins = ₹100 discount
- New users get 10 welcome coins
- Coins shown in profile and navbar dropdown

---

## 📱 Mobile First

The entire app is designed mobile-first with:
- Bottom-friendly touch targets
- Responsive grid layouts
- Mobile navigation menu
- Swipe-friendly product cards

---
