"use client";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  brand: string;
  imageUrl: string;
  categoryId: number;
  categoryName: string;
}

interface ProductTableProps {
  onEditClick?: (product: Product) => void;
}

const ProductTable: React.FC<ProductTableProps> = ({ onEditClick }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>("name");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [page, setPage] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      // Simulating API call with dummy data
      const dummyRes = await import("../../data/products-dummy.json");
      const data = dummyRes.default;

      setProducts(data.data);
      setTotalPages(data.totalPages);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [page, sortBy, sortOrder]);

  const toggleSort = (field: string) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className="mt-6">
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <table className="w-full border text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-2">Image</th>
              <th className="p-2 cursor-pointer" onClick={() => toggleSort("name")}>
                Name {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th className="p-2 cursor-pointer" onClick={() => toggleSort("price")}>
                Price {sortBy === "price" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th className="p-2 cursor-pointer" onClick={() => toggleSort("brand")}>
                Brand {sortBy === "brand" && (sortOrder === "asc" ? "↑" : "↓")}
              </th>
              <th className="p-2">Category</th>
              <th className="p-2 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="border-b">
                <td className="p-2">
                  <img
                    src={p.imageUrl}
                    alt={p.name}
                    className="h-12 w-12 object-cover rounded"
                  />
                </td>
                <td className="p-2">{p.name}</td>
                <td className="p-2">₹{p.price}</td>
                <td className="p-2">{p.brand}</td>
                <td className="p-2">{p.categoryName}</td>
                <td className="p-2 text-right">
                  <button
                    className="text-blue-600 hover:underline mr-2"
                    onClick={() => onEditClick?.(p)}
                  >
                    Edit
                  </button>
                  <button className="text-red-600 hover:underline">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Pagination Controls */}
      <div className="flex justify-end gap-4 mt-4">
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() => setPage((prev) => prev - 1)}
          disabled={page === 1}
        >
          Prev
        </button>
        <span className="px-2 py-1">Page {page} of {totalPages}</span>
        <button
          className="px-3 py-1 border rounded disabled:opacity-50"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductTable;
