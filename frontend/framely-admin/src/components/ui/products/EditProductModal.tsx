"use client";

import React, { useEffect, useState } from "react";
import { Product } from "@/services/ProductService";
import { getAllCategories } from "@/services/CategoryService";
import { toast } from "react-hot-toast";
import Button from "../Button";

interface EditProductModalProps {
  product: Product;
  onClose: () => void;
  onProductUpdated: (updatedData: Product) => Promise<void>;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  product,
  onClose,
  onProductUpdated,
}) => {
  const [name, setName] = useState(product.name);
  const [brand, setBrand] = useState(product.brand);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [imageUrl, setImageUrl] = useState(product.imageUrl);
  const [categoryId, setCategoryId] = useState<number>(product.categoryId || 0);
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const all = await getAllCategories();
      setCategories(all);
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const updatedData: Product = {
      id: product.id, // ✅ Ensure ID is included in request
      name,
      brand,
      description,
      price,
      imageUrl,
      categoryId,
    };

    try {
      await onProductUpdated(updatedData);
      toast.success("Product updated successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="w-full max-w-lg bg-zinc-900 p-6 rounded-2xl shadow-lg border border-zinc-700">
        <h2 className="text-xl font-semibold mb-4 text-white">Edit Product</h2>
        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Readonly ID */}
          <input
            type="text"
            value={`ID: ${product.id}`}
            disabled
            className="w-full p-2 rounded bg-zinc-800 border border-zinc-700 text-zinc-400 cursor-not-allowed"
          />

          <input
            type="text"
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 rounded bg-zinc-800 border border-zinc-600 text-white"
            required
          />
          <input
            type="text"
            placeholder="Brand"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full p-2 rounded bg-zinc-800 border border-zinc-600 text-white"
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 rounded bg-zinc-800 border border-zinc-600 text-white"
            rows={3}
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            className="w-full p-2 rounded bg-zinc-800 border border-zinc-600 text-white"
            required
          />
          <input
            type="text"
            placeholder="Image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
            className="w-full p-2 rounded bg-zinc-800 border border-zinc-600 text-white"
          />
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(parseInt(e.target.value))}
            className="w-full p-2 rounded bg-zinc-800 border border-zinc-600 text-white"
            required
          >
            <option value={0}>Select Category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <div className="flex justify-end gap-3 mt-6">
            <Button type="button" onClick={onClose} variant="secondary">
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Updating..." : "Update Product"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
