"use client";

import { useState } from "react";
import ProductService  from "@/services/ProductService";
import { toast } from "react-hot-toast"; // ✅ FIXED

interface AddProductModalProps {
  onClose: () => void;
  onProductCreated: () => void;
}

export default function AddProductModal({ onClose, onProductCreated }: AddProductModalProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [brand, setBrand] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    setLoading(true);
    const toastId = toast.loading("Creating product...");
    try {
      await ProductService.createProduct({
        name,
        price,
        brand,
        description,
        imageUrl,
        categoryId,
      });
      toast.success("Product created successfully", { id: toastId });
      onProductCreated();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to create product", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl">
        <h2 className="text-xl font-semibold mb-4">Add Product</h2>

        <div className="space-y-4">
          <input className="w-full border p-2 rounded" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input className="w-full border p-2 rounded" type="number" placeholder="Price" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
          <input className="w-full border p-2 rounded" placeholder="Brand" value={brand} onChange={(e) => setBrand(e.target.value)} />
          <input className="w-full border p-2 rounded" type="number" placeholder="Category ID" value={categoryId} onChange={(e) => setCategoryId(Number(e.target.value))} />
          <input className="w-full border p-2 rounded" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <input className="w-full border p-2 rounded" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400" onClick={onClose} disabled={loading}>Cancel</button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={handleCreate} disabled={loading}>
            {loading ? "Creating..." : "Add Product"}
          </button>
        </div>
      </div>
    </div>
  );
}
