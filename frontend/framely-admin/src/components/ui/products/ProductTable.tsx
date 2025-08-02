"use client";
import { Product } from "@/services/ProductService";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import Button from "../Button";

interface ProductTableProps {
  products: Product[];
  loading: boolean;
  onEditClick: (product: Product) => void;
  onDeleteClick: (product: Product) => void; // ✅ Changed to pass full product
  refreshProducts: () => Promise<void>;
}

export default function ProductTable({
  products,
  loading,
  onEditClick,
  onDeleteClick,
}: ProductTableProps) {
  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="animate-spin h-8 w-8 text-blue-500" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-10 text-gray-400">
        No products found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-2xl shadow border border-gray-700 dark:border-gray-800">
      <table className="min-w-full bg-white dark:bg-[#121212] text-sm text-left text-gray-800 dark:text-gray-200">
        <thead className="bg-gray-100 dark:bg-[#1e1e1e] uppercase text-xs font-semibold">
          <tr>
            <th className="px-4 py-3">ID</th>
            <th className="px-4 py-3">Image</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Description</th>
            <th className="px-4 py-3">Category ID</th>
            <th className="px-4 py-3">Category Name</th>
            <th className="px-4 py-3">Brand</th>
            <th className="px-4 py-3">Price (₹)</th>
            <th className="px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {products.map((product) => (
            <tr
              key={product.id}
              className="hover:bg-gray-50 dark:hover:bg-[#1a1a1a] transition-colors"
            >
              <td className="px-4 py-3 text-blue-400 font-semibold">{product.id}</td>
              <td className="px-4 py-3">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded shadow"
                />
              </td>
              <td className="px-4 py-3 font-medium">{product.name}</td>
              <td className="px-4 py-3 text-sm max-w-xs truncate" title={product.description}>
                {product.description}
              </td>
              <td className="px-4 py-3">{product.categoryId}</td>
              <td className="px-4 py-3">{product.categoryName}</td>
              <td className="px-4 py-3">{product.brand}</td>
              <td className="px-4 py-3 font-semibold">₹{product.price}</td>
              <td className="px-4 py-3 flex justify-center gap-3">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => onEditClick(product)}
                >
                  <Pencil className="w-4 h-4 mr-1" />
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => onDeleteClick(product)} // ✅ No confirm here
                >
                  <Trash2 className="w-4 h-4 mr-1" />
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
