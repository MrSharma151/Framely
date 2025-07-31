"use client";

import { useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  brand: string;
  imageUrl: string;
  category: {
    id: number;
    name: string;
  };
}

interface EditProductModalProps {
  product: Product;
  onClose: () => void;
  onProductUpdated: (updated: Product) => void;
}

export default function EditProductModal({ product, onClose, onProductUpdated }: EditProductModalProps) {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [brand, setBrand] = useState(product.brand);
  const [category, setCategory] = useState(product.category.name);
  const [imageUrl, setImageUrl] = useState(product.imageUrl);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    setLoading(true);
    try {
      // Simulate async update
      await new Promise((resolve) => setTimeout(resolve, 500));

      const updatedProduct: Product = {
        ...product,
        name,
        price,
        brand,
        imageUrl,
        category: { ...product.category, name: category },
      };

      onProductUpdated(updatedProduct);
      onClose();
    } catch (err) {
      console.error(err);
      alert("Failed to update");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
        <h2 className="text-xl font-semibold mb-4">Edit Product</h2>

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
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={handleUpdate}
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Product"}
          </button>
        </div>
      </div>
    </div>
  );
}
