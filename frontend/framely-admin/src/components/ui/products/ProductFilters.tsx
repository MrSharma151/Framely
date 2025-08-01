"use client";
import { useState } from "react";

interface ProductFiltersProps {
  onSearch: (term: string) => void;
  onFilterCategory: (category: string) => void;
  onFilterBrand: (brand: string) => void;
}

export default function ProductFilters({
  onSearch,
  onFilterCategory,
  onFilterBrand,
}: ProductFiltersProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCategory(value);
    onFilterCategory(value);
  };

  const handleBrandChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBrand(value);
    onFilterBrand(value);
  };

  return (
    <div className="mb-6 flex flex-col md:flex-row gap-4 items-center">
      <input
        type="text"
        placeholder="Search by name..."
        className="border px-3 py-2 rounded w-full md:w-1/3"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <input
        type="text"
        placeholder="Filter by category..."
        className="border px-3 py-2 rounded w-full md:w-1/4"
        value={category}
        onChange={handleCategoryChange}
      />
      <input
        type="text"
        placeholder="Filter by brand..."
        className="border px-3 py-2 rounded w-full md:w-1/4"
        value={brand}
        onChange={handleBrandChange}
      />
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Search
      </button>
    </div>
  );
}
