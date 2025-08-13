"use client";

import { useEffect, useState } from "react";
import { Product } from "@/services/ProductService";
import { toast } from "react-hot-toast";
import { getAllCategories, Category } from "@/services/CategoryService";
import Button from "@/components/ui/Button";

interface AddProductModalProps {
  onClose: () => void;
  onProductAdded: (newProduct: Omit<Product, "id">) => Promise<void>;
}

export default function AddProductModal({
  onClose,
  onProductAdded,
}: AddProductModalProps) {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number | "">("");
  const [brand, setBrand] = useState("");
  const [categoryId, setCategoryId] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllCategories();
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        toast.error("Failed to load categories");
      }
    };
    fetchCategories();
  }, []);

  const handleCreate = async () => {
    if (!name || !price || !brand || !categoryId || !description || !imageUrl) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newProduct: Omit<Product, "id"> = {
      name,
      price: Number(price),
      brand,
      categoryId: Number(categoryId),
      description,
      imageUrl,
    };

    setLoading(true);
    const toastId = toast.loading("Creating product...");
    try {
      await onProductAdded(newProduct);
      // toast.success("Product created successfully", { id: toastId });
      onClose();
    } catch (error) {
      console.error(error);
      toast.error("Failed to create product", { id: toastId });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal-content fade-in"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4">Add New Product</h2>

        <div className="space-y-4">
          <input
            className="w-full border border-[var(--border-color)] bg-[var(--surface-hover)] p-2 rounded"
            placeholder="Product Name *"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className="w-full border border-[var(--border-color)] bg-[var(--surface-hover)] p-2 rounded"
            type="number"
            placeholder="Price (in ₹) *"
            value={price}
            onChange={(e) =>
              setPrice(e.target.value === "" ? "" : Number(e.target.value))
            }
          />
          <input
            className="w-full border border-[var(--border-color)] bg-[var(--surface-hover)] p-2 rounded"
            placeholder="Brand *"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />

          {/* Category Dropdown */}
          <select
            className="w-full border border-[var(--border-color)] bg-[var(--surface-hover)] p-2 rounded"
            value={categoryId}
            onChange={(e) => setCategoryId(Number(e.target.value))}
          >
            <option value="">Select Category *</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name} (ID: {cat.id})
              </option>
            ))}
          </select>

          <textarea
            className="w-full border border-[var(--border-color)] bg-[var(--surface-hover)] p-2 rounded"
            placeholder="Description *"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <input
            className="w-full border border-[var(--border-color)] bg-[var(--surface-hover)] p-2 rounded"
            placeholder="Image URL *"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        {/* Action Buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={handleCreate}
            isLoading={loading}
          >
            Add Product
          </Button>
        </div>
      </div>
    </div>
  );
}
