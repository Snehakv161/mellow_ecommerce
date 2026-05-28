export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  image: string;
  images: string[];
  description: string;
  ingredients: string;
  benefits: string[];
  usage: string;
  skinType: string[];
  inStock: boolean;
  isTrending: boolean;
  isBestSeller: boolean;
  isFeatured: boolean;
  tags: string[];
}

export const products: Product[] = [
  {
    id: "1",
    name: "Niacinamide 10% + Zinc 1% Serum",
    brand: "Minimalist",
    category: "Serum",
    price: 599,
    originalPrice: 799,
    discount: 25,
    rating: 4.7,
    reviews: 2847,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab12?w=600&h=600&fit=crop"
    ],
    description: "A lightweight serum with 10% Niacinamide and 1% Zinc PCA that visibly minimizes pores and balances excess sebum. Ideal for oily and acne-prone skin.",
    ingredients: "Aqua, Niacinamide, Zinc PCA, Pentylene Glycol, Glycerin, Sodium Hydroxide, Phenoxyethanol",
    benefits: ["Minimizes pores", "Controls oil", "Brightens skin", "Reduces acne marks"],
    usage: "Apply a few drops to face after cleansing, morning and evening. Follow with moisturizer.",
    skinType: ["Oily", "Combination", "Acne-Prone"],
    inStock: true,
    isTrending: true,
    isBestSeller: true,
    isFeatured: true,
    tags: ["niacinamide", "pore care", "acne", "serum"]
  },
  {
    id: "2",
    name: "Moisture Surge SPF 50 Sunscreen",
    brand: "Conscious Chemist",
    category: "Sunscreen",
    price: 449,
    originalPrice: 599,
    discount: 25,
    rating: 4.6,
    reviews: 1523,
    image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&h=600&fit=crop"
    ],
    description: "A lightweight, non-greasy SPF 50 PA++++ sunscreen with hyaluronic acid for hydration. No white cast, suitable for all skin tones.",
    ingredients: "Zinc Oxide, Titanium Dioxide, Hyaluronic Acid, Vitamin E, Niacinamide",
    benefits: ["SPF 50 PA++++", "No white cast", "Hydrating", "Broad spectrum protection"],
    usage: "Apply generously 15 minutes before sun exposure. Reapply every 2-3 hours.",
    skinType: ["All Skin Types"],
    inStock: true,
    isTrending: true,
    isBestSeller: false,
    isFeatured: true,
    tags: ["sunscreen", "SPF", "sun protection"]
  },
  {
    id: "3",
    name: "Vitamin C + E Moisturizer",
    brand: "Dot & Key",
    category: "Moisturizer",
    price: 695,
    originalPrice: 895,
    discount: 22,
    rating: 4.5,
    reviews: 987,
    image: "https://images.unsplash.com/photo-1601049676869-702ea24cfd58?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1601049676869-702ea24cfd58?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600&h=600&fit=crop"
    ],
    description: "A brightening moisturizer with 15% Vitamin C and Vitamin E that fades dark spots and gives a natural glow. Perfect for daily use.",
    ingredients: "Ascorbic Acid, Tocopherol, Hyaluronic Acid, Aloe Vera, Glycerin",
    benefits: ["Brightens skin", "Fades dark spots", "Antioxidant protection", "Deep hydration"],
    usage: "Apply morning and evening after serum. Use SPF in the daytime.",
    skinType: ["Normal", "Dry", "Combination"],
    inStock: true,
    isTrending: false,
    isBestSeller: true,
    isFeatured: true,
    tags: ["vitamin c", "brightening", "moisturizer"]
  },
  {
    id: "4",
    name: "Ultra Light Moisturizing Lotion",
    brand: "Cetaphil",
    category: "Moisturizer",
    price: 399,
    originalPrice: 499,
    discount: 20,
    rating: 4.8,
    reviews: 5621,
    image: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=600&h=600&fit=crop"
    ],
    description: "Dermatologist recommended ultra-light moisturizing lotion for all skin types. Fragrance-free, non-comedogenic.",
    ingredients: "Water, Glycerin, Hydroxyethyl Urea, Panthenol, Niacinamide",
    benefits: ["24-hour hydration", "Fragrance free", "Non-comedogenic", "Dermatologist tested"],
    usage: "Apply to face and body after cleansing, twice daily.",
    skinType: ["All Skin Types", "Sensitive"],
    inStock: true,
    isTrending: false,
    isBestSeller: true,
    isFeatured: false,
    tags: ["moisturizer", "sensitive skin", "daily care"]
  },
  {
    id: "5",
    name: "Onion Hair Oil with Redensyl",
    brand: "Mamaearth",
    category: "Haircare",
    price: 349,
    originalPrice: 449,
    discount: 22,
    rating: 4.3,
    reviews: 8934,
    image: "https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=600&h=600&fit=crop"
    ],
    description: "Enriched with Onion and Redensyl to reduce hair fall by up to 45% and promote new hair growth. Free from harmful chemicals.",
    ingredients: "Onion Extract, Redensyl, Bhringraj Oil, Castor Oil, Vitamin E",
    benefits: ["Reduces hair fall", "Promotes growth", "Strengthens hair", "Scalp nourishment"],
    usage: "Massage gently onto scalp. Leave for 1-2 hours or overnight. Wash with shampoo.",
    skinType: ["All Hair Types"],
    inStock: true,
    isTrending: true,
    isBestSeller: true,
    isFeatured: false,
    tags: ["hair oil", "hair fall", "onion", "haircare"]
  },
  {
    id: "6",
    name: "Lip Butter SPF 30 - Berry Bliss",
    brand: "Plum",
    category: "Lip Balm",
    price: 199,
    originalPrice: 250,
    discount: 20,
    rating: 4.6,
    reviews: 3241,
    image: "https://images.unsplash.com/photo-1586495777744-4e6232bf2b42?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1586495777744-4e6232bf2b42?w=600&h=600&fit=crop"
    ],
    description: "A nourishing lip butter with SPF 30 protection. Infused with shea butter and vitamin E for soft, moisturized lips all day.",
    ingredients: "Shea Butter, Vitamin E, Beeswax, Jojoba Oil, SPF 30",
    benefits: ["SPF 30 protection", "Deep moisturization", "Plumps lips", "Long lasting"],
    usage: "Apply on lips as needed throughout the day.",
    skinType: ["All"],
    inStock: true,
    isTrending: false,
    isBestSeller: false,
    isFeatured: true,
    tags: ["lip balm", "SPF", "lip care"]
  },
  {
    id: "7",
    name: "Fit Me Matte + Poreless Foundation",
    brand: "Maybelline",
    category: "Foundation",
    price: 450,
    originalPrice: 599,
    discount: 25,
    rating: 4.4,
    reviews: 6782,
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&h=600&fit=crop"
    ],
    description: "Lightweight foundation that blurs pores and controls shine for 12 hours. Available in 40 shades to match every skin tone.",
    ingredients: "Aqua, Dimethicone, Titanium Dioxide, Silica, Niacinamide",
    benefits: ["Blurs pores", "12-hour wear", "Natural finish", "Lightweight formula"],
    usage: "Apply with brush, sponge or fingertips starting at the center of the face.",
    skinType: ["Oily", "Combination"],
    inStock: true,
    isTrending: true,
    isBestSeller: true,
    isFeatured: true,
    tags: ["foundation", "matte", "makeup", "full coverage"]
  },
  {
    id: "8",
    name: "Retinol Face Serum 0.3%",
    brand: "The Derma Co",
    category: "Serum",
    price: 699,
    originalPrice: 999,
    discount: 30,
    rating: 4.5,
    reviews: 1847,
    image: "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1615397349754-cfa2066a298e?w=600&h=600&fit=crop"
    ],
    description: "A potent anti-aging serum with 0.3% Retinol that reduces fine lines, wrinkles and improves skin texture overnight.",
    ingredients: "Retinol 0.3%, Hyaluronic Acid, Squalane, Vitamin E, Peptides",
    benefits: ["Anti-aging", "Reduces wrinkles", "Smoothens texture", "Boosts collagen"],
    usage: "Apply 2-3 drops at night after cleansing. Always use SPF in the morning.",
    skinType: ["Normal", "Dry", "Mature"],
    inStock: true,
    isTrending: true,
    isBestSeller: false,
    isFeatured: true,
    tags: ["retinol", "anti-aging", "night serum"]
  },
  {
    id: "9",
    name: "Gentle Face Wash",
    brand: "Neutrogena",
    category: "Face Wash",
    price: 299,
    originalPrice: 399,
    discount: 25,
    rating: 4.6,
    reviews: 4521,
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=600&h=600&fit=crop"
    ],
    description: "A gentle, soap-free face wash that removes dirt and impurities without stripping skin of its natural moisture.",
    ingredients: "Glycerin, Salicylic Acid, Aloe Vera, Cucumber Extract",
    benefits: ["Deep cleansing", "Gentle formula", "Oil-free", "Fresh feeling"],
    usage: "Massage onto wet face for 20-30 seconds, rinse thoroughly. Use twice daily.",
    skinType: ["All Skin Types", "Sensitive"],
    inStock: true,
    isTrending: false,
    isBestSeller: true,
    isFeatured: false,
    tags: ["face wash", "cleanser", "gentle"]
  },
  {
    id: "10",
    name: "Rose Toner with Hyaluronic Acid",
    brand: "Plum",
    category: "Toner",
    price: 349,
    originalPrice: 449,
    discount: 22,
    rating: 4.5,
    reviews: 2134,
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=600&h=600&fit=crop"
    ],
    description: "A hydrating toner with Rose Water and Hyaluronic Acid that balances pH and preps skin for better serum absorption.",
    ingredients: "Rose Water, Hyaluronic Acid, Niacinamide, Aloe Vera, Witch Hazel",
    benefits: ["Hydrates skin", "Balances pH", "Minimizes pores", "Alcohol-free"],
    usage: "Apply to cotton pad and swipe across face after cleansing. Or mist directly.",
    skinType: ["All Skin Types"],
    inStock: true,
    isTrending: false,
    isBestSeller: false,
    isFeatured: true,
    tags: ["toner", "rose", "hydration"]
  },
  {
    id: "11",
    name: "Super Glow Face Primer",
    brand: "Lakme",
    category: "Primer",
    price: 299,
    originalPrice: 399,
    discount: 25,
    rating: 4.2,
    reviews: 3287,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=600&fit=crop"
    ],
    description: "A smoothening primer that creates a perfect canvas for makeup. Blurs imperfections and extends makeup wear all day.",
    ingredients: "Silica, Dimethicone, Vitamin E, Niacinamide",
    benefits: ["Blurs pores", "Extends makeup", "Smoothens skin", "Lightweight"],
    usage: "Apply evenly on face after moisturizer. Wait 1 minute before applying makeup.",
    skinType: ["All Skin Types"],
    inStock: true,
    isTrending: false,
    isBestSeller: false,
    isFeatured: false,
    tags: ["primer", "makeup", "base"]
  },
  {
    id: "12",
    name: "Hydra Bomb Body Lotion",
    brand: "Dot & Key",
    category: "Body Care",
    price: 549,
    originalPrice: 699,
    discount: 21,
    rating: 4.7,
    reviews: 1654,
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=600&h=600&fit=crop"
    ],
    description: "A rich body lotion with Shea Butter and Ceramides for intense 48-hour hydration. Non-greasy, fast-absorbing formula.",
    ingredients: "Shea Butter, Ceramides, Glycerin, Vitamin B5, Hyaluronic Acid",
    benefits: ["48-hour hydration", "Non-greasy", "Repairs skin barrier", "Soft skin"],
    usage: "Apply generously on body after shower. Massage until fully absorbed.",
    skinType: ["All Skin Types", "Dry"],
    inStock: true,
    isTrending: false,
    isBestSeller: false,
    isFeatured: false,
    tags: ["body lotion", "hydration", "body care"]
  }
];

export const categories = [
  { name: "Sunscreen", icon: "☀️", color: "bg-orange-50" },
  { name: "Moisturizer", icon: "💧", color: "bg-blue-50" },
  { name: "Lip Balm", icon: "💋", color: "bg-pink-50" },
  { name: "Lipstick", icon: "💄", color: "bg-red-50" },
  { name: "Foundation", icon: "✨", color: "bg-amber-50" },
  { name: "Primer", icon: "🎨", color: "bg-purple-50" },
  { name: "Serum", icon: "🧪", color: "bg-green-50" },
  { name: "Face Wash", icon: "🫧", color: "bg-cyan-50" },
  { name: "Toner", icon: "🌿", color: "bg-emerald-50" },
  { name: "Makeup", icon: "💅", color: "bg-rose-50" },
  { name: "Haircare", icon: "💆", color: "bg-violet-50" },
  { name: "Body Care", icon: "🧴", color: "bg-yellow-50" },
];

export const reviews = [
  {
    id: "r1",
    name: "Priya Sharma",
    avatar: "PS",
    rating: 5,
    product: "Niacinamide Serum",
    comment: "Absolutely love this serum! My skin has never looked better. The pores are visibly smaller and my skin tone has evened out beautifully.",
    date: "2 days ago"
  },
  {
    id: "r2",
    name: "Ananya Patel",
    avatar: "AP",
    rating: 5,
    product: "Vitamin C Moisturizer",
    comment: "Best purchase ever! The glow I get from this moisturizer is unreal. Totally worth every rupee.",
    date: "1 week ago"
  },
  {
    id: "r3",
    name: "Kavya Nair",
    avatar: "KN",
    rating: 4,
    product: "Sunscreen SPF 50",
    comment: "Great sunscreen with no white cast. Finally found one that works for my dusky skin tone. Highly recommend!",
    date: "2 weeks ago"
  }
];
