"use client";
import { Product } from "@/services/ProductService";
import { Loader2, Pencil } from "lucide-react";

interface ProductTableProps {
  products: Product[];
  loading: boolean;
  onEditClick: (product: Product) => void;
}

export default function ProductTable({
  products,
  loading,
  onEditClick,
}: ProductTableProps) {
  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <Loader2 className="animate-spin h-8 w-8 text-blue-600" />
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-10 text-gray-600">
        No products found.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg shadow">
      <table className="min-w-full bg-white dark:bg-gray-900 text-sm">
        <thead className="bg-gray-100 dark:bg-gray-800 text-left text-gray-700 dark:text-gray-300">
          <tr>
            <th className="px-4 py-3">Image</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Category</th>
            <th className="px-4 py-3">Brand</th>
            <th className="px-4 py-3">Price</th>
            <th className="px-4 py-3">Stock</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
              <td className="px-4 py-3">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
              <td className="px-4 py-3 font-medium">{product.name}</td>
              <td className="px-4 py-3">{product.categoryName}</td>
              <td className="px-4 py-3">{product.brand}</td>
              <td className="px-4 py-3">₹{product.price}</td>
              {/* <td className="px-4 py-3">{product.stockQuantity}</td> */}
              <td className="px-4 py-3">
                <button
                  onClick={() => onEditClick(product)}
                  className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                >
                  <Pencil className="w-4 h-4" />
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
