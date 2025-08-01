"use client";
import { useEffect, useState } from "react";
import {
  Product,
  getProducts,
  searchProducts,
  getProductsByCategoryName,
  getProductsByBrand,
  createProduct,
  updateProduct,
} from "@/services/ProductService";

import AddProductModal from "@/components/ui/products/AddProductModal";
import EditProductModal from "@/components/ui/products/EditProductModal";
import ProductTable from "@/components/ui/products/ProductTable";
import ProductFilters from "@/components/ui/products/ProductFilters";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [sortBy] = useState("name");
  const [sortOrder] = useState<"asc" | "desc">("asc");

  const fetchProducts = async () => {
    setLoading(true);
    const response = await getProducts(currentPage, pageSize, sortBy, sortOrder);
    setProducts(response.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage]);

  const handleSearch = async (term: string) => {
    if (term.trim() === "") {
      fetchProducts();
      return;
    }

    setLoading(true);
    const results = await searchProducts(term);
    setProducts(results);
    setLoading(false);
  };

  const handleFilterCategory = async (category: string) => {
    if (!category) {
      fetchProducts();
      return;
    }

    setLoading(true);
    const results = await getProductsByCategoryName(category);
    setProducts(results);
    setLoading(false);
  };

  const handleFilterBrand = async (brand: string) => {
    if (!brand) {
      fetchProducts();
      return;
    }

    setLoading(true);
    const results = await getProductsByBrand(brand);
    setProducts(results);
    setLoading(false);
  };

  const handleProductAdded = async (newProduct: Omit<Product, "id">) => {
    const created = await createProduct(newProduct);
    if (created) {
      fetchProducts();
      setShowAddModal(false);
    }
  };

  const handleProductUpdated = async (id: number, updatedData: Partial<Product>) => {
    const success = await updateProduct(id, updatedData);
    if (success) {
      fetchProducts();
      setEditProduct(null);
    }
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
        onSearch={handleSearch}
        onFilterCategory={handleFilterCategory}
        onFilterBrand={handleFilterBrand}
      />

      {/* <ProductTable
        products={products}
        loading={loading}
        onEditClick={(product: Product) => setEditProduct(product)}
      /> */}

      {/* {showAddModal && (
        <AddProductModal
          onClose={() => setShowAddModal(false)}
          onProductAdded={handleProductAdded}
        />
      )} */}

      {/* {editProduct && (
        <EditProductModal
          product={editProduct}
          onClose={() => setEditProduct(null)}
          onProductUpdated={(updated) =>
            handleProductUpdated(editProduct.id, updated)
          }
        />
      )} */}
    </div>
  );
}
