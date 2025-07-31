"use client";

import { useState } from "react";

interface AddProductModalProps {
  onClose: () => void;
  onProductAdded: (newProduct: Product) => void;
}

interface Product {
  name: string;
  price: number;
  brand: string;
  category: string;
  imageUrl: string;
}

export default function AddProductModal({ onClose, onProductAdded }: AddProductModalProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const newProduct: Product = { name, price, brand, category, imageUrl };
      // Dummy delay to mimic API
      await new Promise((res) => setTimeout(res, 500));
      onProductAdded(newProduct);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>

        <div className="space-y-4">
          <input
            className="w-full border p-2 rounded"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="w-full border p-2 rounded"
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          <input
            className="w-full border p-2 rounded"
            placeholder="Brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
          <input
            className="w-full border p-2 rounded"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <input
            className="w-full border p-2 rounded"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? "Saving..." : "Add Product"}
          </button>
        </div>
      </div>
    </div>
  );
}
