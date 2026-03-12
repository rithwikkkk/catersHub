export interface Caterer {
  id: string
  name: string
  cuisine: string[]
  rating: number
  reviewCount: number
  pricePerPlate: number
  minGuests: number
  maxGuests: number
  image: string
  description: string
  location: string
  occasions: string[]
}

export interface MenuItem {
  id: string
  catererId: string
  name: string
  description: string
  price: number
  category: string
  image: string
  isVegetarian: boolean
  isVegan: boolean
  isGlutenFree: boolean
}

export interface Order {
  id: string
  userId: string
  catererId: string
  catererName: string
  items: { menuItem: MenuItem; quantity: number }[]
  totalAmount: number
  guestCount: number
  eventDate: string
  status: "pending" | "confirmed" | "preparing" | "delivered" | "cancelled"
  createdAt: string
}

export interface User {
  id: string
  name: string
  email: string
  phone: string
  role: "user" | "caterer" | "admin"
  createdAt: string
}

export const cuisineTypes = [
  "Indian",
  "Chinese",
  "Italian",
  "Mexican",
  "Thai",
  "Japanese",
  "Mediterranean",
  "American",
  "French",
  "Continental",
]

export const occasionTypes = [
  "Wedding",
  "Birthday",
  "Corporate Event",
  "Anniversary",
  "Baby Shower",
  "Graduation",
  "Holiday Party",
  "Casual Gathering",
]

export const caterers: Caterer[] = [
  {
    id: "1",
    name: "Royal Feast Catering",
    cuisine: ["Indian", "Continental"],
    rating: 4.8,
    reviewCount: 234,
    pricePerPlate: 45,
    minGuests: 50,
    maxGuests: 500,
    image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=400&h=300&fit=crop",
    description: "Premium catering service specializing in traditional Indian cuisine with a modern twist.",
    location: "Downtown",
    occasions: ["Wedding", "Corporate Event", "Anniversary"],
  },
  {
    id: "2",
    name: "Mediterranean Delights",
    cuisine: ["Mediterranean", "Italian"],
    rating: 4.6,
    reviewCount: 189,
    pricePerPlate: 38,
    minGuests: 30,
    maxGuests: 300,
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop",
    description: "Authentic Mediterranean flavors with fresh, locally sourced ingredients.",
    location: "Midtown",
    occasions: ["Wedding", "Birthday", "Casual Gathering"],
  },
  {
    id: "3",
    name: "Asian Fusion Kitchen",
    cuisine: ["Chinese", "Japanese", "Thai"],
    rating: 4.7,
    reviewCount: 156,
    pricePerPlate: 42,
    minGuests: 25,
    maxGuests: 250,
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&h=300&fit=crop",
    description: "Modern Asian fusion cuisine blending traditional techniques with contemporary presentation.",
    location: "Eastside",
    occasions: ["Corporate Event", "Birthday", "Graduation"],
  },
  {
    id: "4",
    name: "Taco Fiesta Catering",
    cuisine: ["Mexican"],
    rating: 4.5,
    reviewCount: 203,
    pricePerPlate: 28,
    minGuests: 20,
    maxGuests: 400,
    image: "https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=300&fit=crop",
    description: "Vibrant Mexican cuisine with authentic recipes passed down through generations.",
    location: "Westside",
    occasions: ["Birthday", "Casual Gathering", "Holiday Party"],
  },
  {
    id: "5",
    name: "French Elegance",
    cuisine: ["French", "Continental"],
    rating: 4.9,
    reviewCount: 145,
    pricePerPlate: 65,
    minGuests: 40,
    maxGuests: 200,
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400&h=300&fit=crop",
    description: "Exquisite French cuisine crafted by award-winning chefs for the most elegant occasions.",
    location: "Uptown",
    occasions: ["Wedding", "Anniversary", "Corporate Event"],
  },
  {
    id: "6",
    name: "BBQ Masters",
    cuisine: ["American"],
    rating: 4.4,
    reviewCount: 278,
    pricePerPlate: 32,
    minGuests: 30,
    maxGuests: 500,
    image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=400&h=300&fit=crop",
    description: "Smoky, tender BBQ meats and classic American sides for any celebration.",
    location: "Southside",
    occasions: ["Birthday", "Graduation", "Holiday Party", "Casual Gathering"],
  },
]

export const menuItems: MenuItem[] = [
  // Royal Feast Catering
  {
    id: "m1",
    catererId: "1",
    name: "Butter Chicken",
    description: "Tender chicken in rich tomato and butter sauce",
    price: 18,
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=300&h=200&fit=crop",
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
  },
  {
    id: "m2",
    catererId: "1",
    name: "Paneer Tikka Masala",
    description: "Grilled cottage cheese in creamy spiced sauce",
    price: 16,
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=300&h=200&fit=crop",
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: true,
  },
  {
    id: "m3",
    catererId: "1",
    name: "Garlic Naan",
    description: "Freshly baked flatbread with garlic butter",
    price: 4,
    category: "Bread",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=300&h=200&fit=crop",
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: false,
  },
  {
    id: "m4",
    catererId: "1",
    name: "Vegetable Biryani",
    description: "Fragrant rice with mixed vegetables and aromatic spices",
    price: 14,
    category: "Rice",
    image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=300&h=200&fit=crop",
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
  },
  // Mediterranean Delights
  {
    id: "m5",
    catererId: "2",
    name: "Grilled Lamb Chops",
    description: "Herb-marinated lamb chops with Mediterranean spices",
    price: 24,
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=200&fit=crop",
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
  },
  {
    id: "m6",
    catererId: "2",
    name: "Falafel Platter",
    description: "Crispy chickpea fritters with hummus and tahini",
    price: 12,
    category: "Appetizer",
    image: "https://images.unsplash.com/photo-1593001874117-c99c800e3eb5?w=300&h=200&fit=crop",
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: false,
  },
  {
    id: "m7",
    catererId: "2",
    name: "Greek Salad",
    description: "Fresh vegetables with feta cheese and olives",
    price: 10,
    category: "Salad",
    image: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=300&h=200&fit=crop",
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: true,
  },
  // Asian Fusion Kitchen
  {
    id: "m8",
    catererId: "3",
    name: "Kung Pao Chicken",
    description: "Spicy stir-fried chicken with peanuts and vegetables",
    price: 16,
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1525755662778-989d0524087e?w=300&h=200&fit=crop",
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
  },
  {
    id: "m9",
    catererId: "3",
    name: "Vegetable Spring Rolls",
    description: "Crispy rolls filled with fresh vegetables",
    price: 8,
    category: "Appetizer",
    image: "https://images.unsplash.com/photo-1548507200-d6ca262e1c73?w=300&h=200&fit=crop",
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: false,
  },
  {
    id: "m10",
    catererId: "3",
    name: "Sushi Platter",
    description: "Assorted fresh sushi rolls and nigiri",
    price: 28,
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=300&h=200&fit=crop",
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
  },
  // Taco Fiesta
  {
    id: "m11",
    catererId: "4",
    name: "Carne Asada Tacos",
    description: "Grilled steak tacos with fresh salsa and guacamole",
    price: 14,
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1551504734-5ee1c4a1479b?w=300&h=200&fit=crop",
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
  },
  {
    id: "m12",
    catererId: "4",
    name: "Veggie Burrito Bowl",
    description: "Rice, beans, vegetables, and all the fixings",
    price: 12,
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=300&h=200&fit=crop",
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
  },
  // French Elegance
  {
    id: "m13",
    catererId: "5",
    name: "Coq au Vin",
    description: "Classic French braised chicken in red wine sauce",
    price: 32,
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?w=300&h=200&fit=crop",
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
  },
  {
    id: "m14",
    catererId: "5",
    name: "Ratatouille",
    description: "Provençal vegetable stew with herbs",
    price: 18,
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1572453800999-e8d2d1589b7c?w=300&h=200&fit=crop",
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
  },
  // BBQ Masters
  {
    id: "m15",
    catererId: "6",
    name: "Smoked Brisket",
    description: "12-hour smoked beef brisket with house rub",
    price: 22,
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=300&h=200&fit=crop",
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
  },
  {
    id: "m16",
    catererId: "6",
    name: "BBQ Pulled Pork",
    description: "Tender pulled pork with tangy BBQ sauce",
    price: 18,
    category: "Main Course",
    image: "https://images.unsplash.com/photo-1623653387945-2fd25214f8fc?w=300&h=200&fit=crop",
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: true,
  },
]

export const orders: Order[] = [
  {
    id: "o1",
    userId: "u1",
    catererId: "1",
    catererName: "Royal Feast Catering",
    items: [
      { menuItem: menuItems[0], quantity: 50 },
      { menuItem: menuItems[1], quantity: 30 },
      { menuItem: menuItems[2], quantity: 80 },
    ],
    totalAmount: 1700,
    guestCount: 80,
    eventDate: "2026-04-15",
    status: "confirmed",
    createdAt: "2026-03-01",
  },
  {
    id: "o2",
    userId: "u1",
    catererId: "2",
    catererName: "Mediterranean Delights",
    items: [
      { menuItem: menuItems[4], quantity: 25 },
      { menuItem: menuItems[5], quantity: 25 },
    ],
    totalAmount: 900,
    guestCount: 25,
    eventDate: "2026-03-20",
    status: "delivered",
    createdAt: "2026-02-15",
  },
  {
    id: "o3",
    userId: "u2",
    catererId: "3",
    catererName: "Asian Fusion Kitchen",
    items: [
      { menuItem: menuItems[7], quantity: 40 },
      { menuItem: menuItems[8], quantity: 40 },
    ],
    totalAmount: 960,
    guestCount: 40,
    eventDate: "2026-03-25",
    status: "pending",
    createdAt: "2026-03-10",
  },
]

export const users: User[] = [
  {
    id: "u1",
    name: "John Smith",
    email: "john@example.com",
    phone: "+1 234 567 8900",
    role: "user",
    createdAt: "2025-01-15",
  },
  {
    id: "u2",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    phone: "+1 234 567 8901",
    role: "user",
    createdAt: "2025-02-20",
  },
  {
    id: "c1",
    name: "Royal Feast Admin",
    email: "admin@royalfeast.com",
    phone: "+1 234 567 8902",
    role: "caterer",
    createdAt: "2024-06-10",
  },
  {
    id: "a1",
    name: "Platform Admin",
    email: "admin@simbha.com",
    phone: "+1 234 567 8903",
    role: "admin",
    createdAt: "2024-01-01",
  },
]
