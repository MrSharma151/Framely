"use client";
import { useState } from "react";
import AddProductModal from "@/components/ui/AddProductModal";
import EditProductModal from "@/components/ui/EditProductModal";
import ProductTable from "@/components/ui/ProductTable";
import ProductFilters from "@/components/ui/ProductFilters";

// 🧩 Dummy Product Type
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

export default function ProductsPage() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleProductAdded = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleProductUpdated = (updated: Product) => {
    console.log("Updated Product:", updated);
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Products</h1>
          <p className="text-gray-600">Manage all products here</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + Add Product
        </button>
      </div>

      <ProductFilters
        onSearch={(term) => console.log("Search:", term)}
        onFilterCategory={(cat) => console.log("Category:", cat)}
        onFilterBrand={(brand) => console.log("Brand:", brand)}
      />

      <ProductTable
        key={refreshKey}
        // onEditClick={(product: Product) => setEditProduct(product)}
      />

      {showAddModal && (
        <AddProductModal
          onClose={() => setShowAddModal(false)}
          onProductAdded={handleProductAdded}
        />
      )}

      {editProduct && (
        <EditProductModal
          product={editProduct}
          onClose={() => setEditProduct(null)}
          onProductUpdated={handleProductUpdated}
        />
      )}
    </div>
  );
}
