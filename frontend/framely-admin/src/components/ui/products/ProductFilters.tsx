"use client";

import { useEffect, useState } from "react";
import { Category, getAllCategories } from "@/services/CategoryService";
import { Search } from "lucide-react";

interface ProductFiltersProps {
  onSearch: (term: string) => void;
  onFilterCategory: (category: string) => void;
  onFilterBrand: (brand: string) => void;
  onSearchById: (id: number) => void; // ✅ NEW PROP
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  onSearch,
  onFilterCategory,
  onFilterBrand,
  onSearchById,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [brandTerm, setBrandTerm] = useState("");
  const [idTerm, setIdTerm] = useState(""); // ✅ For ID search
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await getAllCategories();
      setCategories(data || []);
    };
    fetchCategories();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleBrandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onFilterBrand(brandTerm);
  };

  const handleIdSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedId = parseInt(idTerm);
    if (!isNaN(parsedId)) {
      onSearchById(parsedId);
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const category = e.target.value;
    setSelectedCategory(category);
    onFilterCategory(category);
  };

  return (
    <div className="bg-[#1e1e2f] rounded-2xl p-4 mb-6 shadow-md border border-gray-800 flex flex-col gap-4 md:flex-row md:items-center md:justify-between flex-wrap">
      
      {/* 🔍 Search by ID */}
      <form onSubmit={handleIdSubmit} className="flex items-center gap-2 w-full md:w-1/4">
        <input
          type="text"
          placeholder="🆔 Search by ID..."
          value={idTerm}
          onChange={(e) => setIdTerm(e.target.value)}
          className="w-full px-4 py-2 rounded bg-[#2a2a3d] text-white placeholder:text-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />
        <button
          type="submit"
          className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-2 rounded transition"
        >
          <Search size={18} />
        </button>
      </form>

      {/* 🔤 Search by Name */}
      <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 w-full md:w-1/4">
        <input
          type="text"
          placeholder="🔍 Search by product name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded bg-[#2a2a3d] text-white placeholder:text-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded transition"
        >
          <Search size={18} />
        </button>
      </form>

      {/* 🏷️ Filter by Brand */}
      <form onSubmit={handleBrandSubmit} className="flex items-center gap-2 w-full md:w-1/4">
        <input
          type="text"
          placeholder="🏷️ Filter by brand..."
          value={brandTerm}
          onChange={(e) => setBrandTerm(e.target.value)}
          className="w-full px-4 py-2 rounded bg-[#2a2a3d] text-white placeholder:text-gray-400 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded transition"
        >
          Filter
        </button>
      </form>

      {/* 📂 Category Dropdown */}
      <div className="w-full md:w-1/4">
        <select
          value={selectedCategory}
          onChange={handleCategoryChange}
          className="w-full bg-[#2a2a3d] text-white px-4 py-2 rounded border border-gray-600 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="">📂 All Categories</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ProductFilters;
