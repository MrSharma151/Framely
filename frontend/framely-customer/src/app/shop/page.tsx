"use client";

import { useState, useEffect } from "react";
import { Search, Filter, Loader2, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";

import {
  getProducts,
  getProductsByCategoryName,
  Product,
} from "@/services/productService";
import { getCategories, Category } from "@/services/categoryService";

import CategoryFilter from "@/components/ui/CategoryFilter";
import ProductCard from "@/components/ui/ProductCard";

export default function ShopPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryName, setSelectedCategoryName] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"" | "low-high" | "high-low">("");

  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [loadingCategories, setLoadingCategories] = useState(true);

  /** ✅ Fetch categories on mount */
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const res = await getCategories();
        setCategories(res.data || []);
      } catch {
        toast.error("Failed to load categories");
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, []);

  /** ✅ Fetch all products initially */
  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      setLoadingProducts(true);
      const res = await getProducts(1, 50, "name", "asc");
      setProducts(res.data || []);
    } catch {
      toast.error("Failed to load products");
    } finally {
      setLoadingProducts(false);
    }
  };

  /** ✅ Fetch products by category */
  const fetchCategoryProducts = async (categoryName: string) => {
    try {
      setLoadingProducts(true);
      const res = await getProductsByCategoryName(categoryName.trim());
      setProducts(res || []);
    } catch {
      toast.error(`Failed to load products for "${categoryName}"`);
    } finally {
      setLoadingProducts(false);
    }
  };

  /** ✅ Handle category selection */
  const handleCategorySelect = (categoryName: string | null) => {
    setSelectedCategoryName(categoryName);
    if (!categoryName) {
      fetchAllProducts();
    } else {
      fetchCategoryProducts(categoryName);
    }
  };

  /** ✅ Apply search + sort */
  const filteredProducts = products
    .filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (sortOrder === "low-high") return a.price - b.price;
      if (sortOrder === "high-low") return b.price - a.price;
      return 0;
    });

  const sortLabel =
    sortOrder === "low-high"
      ? "Price: Low → High"
      : sortOrder === "high-low"
      ? "Price: High → Low"
      : "Sort by Price";

  const toggleSort = () => {
    setSortOrder((prev) =>
      prev === "" ? "low-high" : prev === "low-high" ? "high-low" : ""
    );
  };

  return (
    <section className="relative py-16 sm:py-20">
      {/* ✅ Background gradient for premium feel */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/20 via-gray-800/10 to-transparent pointer-events-none" />

      {/* ✅ Page Title */}
      <div className="relative z-10 text-center mb-10 px-6">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
          Shop <span className="text-blue-400">Eyewear</span>
        </h1>
        <p className="text-gray-400 mt-3 max-w-2xl mx-auto text-sm sm:text-base">
          Premium quality eyewear. Find your perfect style today.
        </p>
      </div>

      {/* ✅ Category Filter */}
      <div className="relative z-20">
        <CategoryFilter
          categories={categories}
          selectedCategoryName={selectedCategoryName}
          onCategorySelect={handleCategorySelect}
          loading={loadingCategories}
        />
      </div>

      {/* ✅ Search & Sort Controls */}
      <div className="relative z-20 container mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 px-6 mt-6 mb-8">
        {/* Search Bar */}
        <div className="flex items-center bg-[var(--background-alt)] rounded-full px-4 py-2 w-full sm:w-72 shadow-inner">
          <Search size={18} className="text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-transparent outline-none text-sm text-gray-200 ml-3 w-full"
          />
        </div>

        {/* Sort Button */}
        <button
          onClick={toggleSort}
          className="flex items-center gap-2 bg-[var(--background-alt)] px-4 py-2 rounded-full text-gray-300 hover:bg-blue-500/20 transition shadow-sm"
        >
          <Filter size={16} />
          {sortLabel}
          <ChevronDown size={16} />
        </button>
      </div>

      {/* ✅ Products Loading State */}
      {loadingProducts && (
        <div className="flex justify-center items-center py-20 text-gray-400">
          <Loader2 className="animate-spin mr-2" /> Loading products...
        </div>
      )}

      {/* ✅ Product Grid */}
      {!loadingProducts && (
        <div className="relative z-20 container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

          {filteredProducts.length === 0 && (
            <div className="col-span-full text-center text-gray-400">
              No products found.
            </div>
          )}
        </div>
      )}
    </section>
  );
}
