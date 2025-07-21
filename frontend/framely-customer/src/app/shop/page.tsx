"use client";

import { useState } from "react";
import {
  Search,
  Filter,
  ShoppingCart,
  ChevronDown,
  XCircle,
} from "lucide-react";
import Button from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import toast from "react-hot-toast"; // ✅ Toast import

const categories = ["All", "Spectacles", "Sunglasses", "Contact Lenses"];

const products = [
  {
    id: 1,
    category: "Spectacles",
    name: "Premium Clear Frame for Professional Office Look",
    price: 2499,
    image:
      "https://images.unsplash.com/photo-1589571894960-20bbe2828d0a?auto=format&fit=crop&w=800&q=80",
    description: "Lightweight premium frame with anti-glare lenses.",
  },
  {
    id: 2,
    category: "Sunglasses",
    name: "Classic Aviator",
    price: 1999,
    image:
      "https://images.unsplash.com/photo-1591076482161-422ec19f3101?auto=format&fit=crop&w=800&q=80",
    description: "Timeless aviator sunglasses with UV protection.",
  },
  {
    id: 3,
    category: "Contact Lenses",
    name: "Hydro Comfort Lenses",
    price: 1499,
    image:
      "https://images.unsplash.com/photo-1616486692649-8f02d34ef1d5?auto=format&fit=crop&w=800&q=80",
    description: "Soft & breathable lenses for all-day comfort.",
  },
  {
    id: 4,
    category: "Sunglasses",
    name: "Polarized Wayfarer",
    price: 2299,
    image:
      "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=800&q=80",
    description: "Stylish polarized sunglasses for outdoor wear.",
  },
  {
    id: 5,
    category: "Spectacles",
    name: "Minimalist Rimless Lightweight Frame",
    price: 2799,
    image:
      "https://images.unsplash.com/photo-1605792657660-596af9009e82?auto=format&fit=crop&w=800&q=80",
    description: "Ultra-light rimless frame for a modern look.",
  },
  {
    id: 6,
    category: "Contact Lenses",
    name: "Color Tint Lenses",
    price: 1899,
    image:
      "https://images.unsplash.com/photo-1602742450404-d2f531d03f71?auto=format&fit=crop&w=800&q=80",
    description: "Enhance your look with subtle color tints.",
  },
  {
    id: 7,
    category: "Sunglasses",
    name: "Luxury Gold Frame Sunglasses with Polarized Lenses",
    price: 3499,
    image:
      "https://images.unsplash.com/photo-1577803645773-f96470509666?auto=format&fit=crop&w=800&q=80",
    description: "Luxury golden frame with premium polarized lenses.",
  },
  {
    id: 8,
    category: "Spectacles",
    name: "Retro Round Glasses Classic Edition",
    price: 2599,
    image:
      "https://images.unsplash.com/photo-1602810318383-e833a7b86f58?auto=format&fit=crop&w=800&q=80",
    description: "Retro-inspired round glasses with premium build quality.",
  },
];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);

  const { addToCart, cart } = useCart(); // ✅ अब cart भी ले रहे हैं ताकि quantity check कर सकें

  // ✅ Filter + sort calculation
  const filteredProducts = products
    .filter((p) =>
      selectedCategory === "All" ? true : p.category === selectedCategory
    )
    .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === "low-high") return a.price - b.price;
      if (sortOrder === "high-low") return b.price - a.price;
      return 0;
    });

  // ✅ Add to cart handler with feedback
  const handleAddToCart = (product: {
    id: number;
    name: string;
    price: number;
    image: string;
  }) => {
    // ✅ Check if product already exists in cart
    const existing = cart.find((item) => item.id === product.id);

    addToCart(product);

    // ✅ Toast message
    if (existing) {
      toast.success(
        `${product.name} quantity updated (x${existing.quantity + 1})`
      );
    } else {
      toast.success(`${product.name} added to cart`);
    }

    // ✅ Close modal after adding to cart
    setSelectedProduct(null);
  };

  return (
    <section className="relative py-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/5 via-transparent to-white/5" />

      {/* Title */}
      <div className="relative z-10 text-center mb-10 px-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
          Shop <span className="text-blue-400">Eyewear</span>
        </h1>
        <p className="text-gray-300 mt-3 max-w-2xl mx-auto text-sm sm:text-base">
          Explore Spectacles, Sunglasses & Contact Lenses – Premium Quality,
          Affordable Prices.
        </p>
      </div>

      {/* Filters Row */}
      <div className="relative z-10 container mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-6 mb-8">
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                  : "bg-[var(--background-alt)] text-gray-300 hover:bg-blue-500/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search + Sort */}
        <div className="flex flex-wrap gap-3 items-center">
          {/* Search Bar */}
          <div className="flex items-center bg-[var(--background-alt)] rounded-full px-3 py-2 w-64 shadow-inner">
            <Search size={18} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-transparent outline-none text-sm text-gray-200 ml-2 w-full"
            />
          </div>

          {/* Sort Dropdown */}
          <div>
            <button
              onClick={() =>
                setSortOrder(
                  sortOrder === "low-high"
                    ? "high-low"
                    : sortOrder === "high-low"
                    ? ""
                    : "low-high"
                )
              }
              className="flex items-center gap-2 bg-[var(--background-alt)] px-4 py-2 rounded-full text-gray-300 hover:bg-blue-500/20 transition shadow-sm"
            >
              <Filter size={16} />
              {sortOrder === "low-high"
                ? "Price: Low → High"
                : sortOrder === "high-low"
                ? "Price: High → Low"
                : "Sort"}
              <ChevronDown size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Product Grid */}
      <div className="relative z-10 container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="relative">
            <div
              className="glass rounded-2xl overflow-hidden cursor-pointer group hover:scale-[1.03] transition-all shadow-lg hover:shadow-blue-500/10"
              onClick={() => setSelectedProduct(product.id)}
            >
              {/* Product Image */}
              <div className="relative w-full h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
              </div>

              {/* Fixed height product info */}
              <div className="p-5 text-center h-[110px] flex flex-col justify-center">
                <h3 className="text-lg font-semibold text-white truncate">
                  {product.name}
                </h3>
                <p className="text-blue-400 font-bold mt-2">₹{product.price}</p>
              </div>
            </div>

            {/* Modal opens over product */}
            {selectedProduct === product.id && (
              <div
                className="absolute inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm rounded-xl"
                onClick={() => setSelectedProduct(null)}
              >
                <div
                  className="bg-[var(--background-alt)] rounded-xl shadow-xl w-full max-w-sm relative"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Modal Image */}
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-52 object-cover rounded-t-xl"
                    />

                    {/* Close Button */}
                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition"
                    >
                      <XCircle
                        size={26}
                        className="hover:text-red-400 transition"
                      />
                    </button>
                  </div>

                  {/* Modal Content */}
                  <div className="p-4">
                    <h2 className="text-xl font-bold">{product.name}</h2>
                    <p className="text-blue-400 font-semibold mt-2">
                      ₹{product.price}
                    </p>
                    <p className="text-gray-300 text-sm mt-3">
                      {product.description}
                    </p>

                    <div className="mt-4">
                      <Button
                        variant="primary"
                        size="sm"
                        className="w-full"
                        onClick={() =>
                          handleAddToCart({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            image: product.image,
                          })
                        }
                      >
                        <ShoppingCart size={18} /> Add to Cart
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}

        {/* No products */}
        {filteredProducts.length === 0 && (
          <div className="col-span-full text-center text-gray-400">
            No products found.
          </div>
        )}
      </div>
    </section>
  );
}
