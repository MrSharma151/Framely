import { useState } from "react";

interface ProductFiltersProps {
  onSearch: (term: string) => void;
  onFilterCategory: (category: string) => void;
  onFilterBrand: (brand: string) => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  onSearch,
  onFilterCategory,
  onFilterBrand,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categoryInput, setCategoryInput] = useState<string>("");
  const [brandInput, setBrandInput] = useState<string>("");

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      onSearch(searchTerm.trim());
    }
  };

  return (
    <div className="flex flex-wrap gap-4 items-center mb-6">
      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search products..."
        className="px-4 py-2 border rounded-md w-64"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSearch()}
      />
      <button
        onClick={handleSearch}
        className="bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        Search
      </button>

      {/* 📂 Category */}
      <select
        value={categoryInput}
        onChange={(e) => {
          const value = e.target.value;
          setCategoryInput(value);
          onFilterCategory(value);
        }}
        className="px-4 py-2 border rounded-md"
      >
        <option value="">-- Filter by Category --</option>
        <option value="aviator">Aviator</option>
        <option value="round">Round</option>
        <option value="rectangle">Rectangle</option>
      </select>

      {/* 🏷 Brand */}
      <select
        value={brandInput}
        onChange={(e) => {
          const value = e.target.value;
          setBrandInput(value);
          onFilterBrand(value);
        }}
        className="px-4 py-2 border rounded-md"
      >
        <option value="">-- Filter by Brand --</option>
        <option value="rayban">RayBan</option>
        <option value="oakley">Oakley</option>
        <option value="fastrack">Fastrack</option>
      </select>
    </div>
  );
};

export default ProductFilters;
