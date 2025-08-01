"use client";

import { useEffect, useState, useRef } from "react";
import Button from "../Button";
import { X } from "lucide-react";

interface CategorySearchBarProps {
  searchTerm: string;
  onSearch: (term: string) => void;
}

export default function CategorySearchBar({
  searchTerm,
  onSearch,
}: CategorySearchBarProps) {
  const [inputValue, setInputValue] = useState(searchTerm);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setInputValue(searchTerm);
  }, [searchTerm]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(inputValue.trim());
  };

  const handleClear = () => {
    setInputValue("");
    onSearch("");
    inputRef.current?.focus();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col sm:flex-row sm:items-center gap-4 mb-5"
    >
      {/* Search Input with Clear Button */}
      <div className="relative w-full">
        <input
          ref={inputRef}
          type="text"
          placeholder="Search categories by name..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="w-full pr-10"
        />
        {inputValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute top-1/2 right-3 -translate-y-1/2 text-sm text-secondary hover:text-red-400"
            aria-label="Clear search"
          >
            <X size={18} />
          </button>
        )}
      </div>

      {/* Submit Button */}
      <div>
        <Button type="submit">Search</Button>
      </div>
    </form>
  );
}
