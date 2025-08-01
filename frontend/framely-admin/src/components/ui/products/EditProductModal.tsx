"use client";

import { useState } from "react";
import ProductService from "@/services/ProductService";
import { toast } from "react-hot-toast";

interface Product {
  id: number;
  name: string;
  price: number;
  brand: string;
  imageUrl: string;
  description: string;
  stockQuantity: number;
  category: {
    id: number;
    name: string;
  };
}

interface EditProductModalProps {
  product: Product;
  onClose: () => void;
  onProductUpdated: () => void;
}

export default function EditProductModal({ product, onClose, onProductUpdated }: EditProductModalProps) {
  const [name, setName] = useState(product.name);
  const [price, setPrice] = useState(product.price);
  const [brand, setBrand] = useState(product.brand);
  const [description, setDescription] = useState(product.description);
  const [stockQuantity, setStockQuantity] = useState(product.stockQuantity);
  const [categoryId, setCategoryId] = useState(product.category.id);
  const [imageUrl, setImageUrl] = useState(product.imageUrl);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async () => {
    if (!name || !price || !brand || !categoryId) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);
    try {
      await ProductService.updateProduct(product.id, {
        name,
        price,
        brand,
        description,
        imageUrl,
        categoryId,
      });
      toast.success("Product updated successfully");
      onProductUpdated();
      onClose();
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-900 rounded-xl p-6 w-full max-w-md shadow-xl">
        <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Edit Product</h2>

        <div className="space-y-3">
          <input className="w-full border p-2 rounded" placeholder="Product Name" value={name} onChange={(e) => setName(e.target.value)} />
          <input className="w-full border p-2 rounded" type="number" placeholder="Price" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
          <input className="w-full border p-2 rounded" placeholder="Brand" value={brand} onChange={(e) => setBrand(e.target.value)} />
          <input className="w-full border p-2 rounded" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
          <input className="w-full border p-2 rounded" type="number" placeholder="Stock Quantity" value={stockQuantity} onChange={(e) => setStockQuantity(Number(e.target.value))} />
          <input className="w-full border p-2 rounded" type="number" placeholder="Category ID" value={categoryId} onChange={(e) => setCategoryId(Number(e.target.value))} />
          <input className="w-full border p-2 rounded" placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600" onClick={onClose} disabled={loading}>
            Cancel
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700" onClick={handleUpdate} disabled={loading}>
            {loading ? "Updating..." : "Update Product"}
          </button>
        </div>
      </div>
    </div>
  );
}
