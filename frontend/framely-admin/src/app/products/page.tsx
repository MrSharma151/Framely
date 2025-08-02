"use client";
import { toast } from "react-hot-toast";
import { useEffect, useState } from "react";
import {
  Product,
  getProducts,
  searchProducts,
  getProductsByCategoryName,
  getProductsByBrand,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductById,
} from "@/services/ProductService";

import AddProductModal from "@/components/ui/products/AddProductModal";
import EditProductModal from "@/components/ui/products/EditProductModal";
import ProductTable from "@/components/ui/products/ProductTable";
import ProductFilters from "@/components/ui/products/ProductFilters";
import ProductDeleteConfirmationModal from "@/components/ui/products/ProductDeleteConfirmationModal";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const [sortBy] = useState("name");
  const [sortOrder] = useState<"asc" | "desc">("asc");

  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    const response = await getProducts(currentPage, pageSize, sortBy, sortOrder);

    if (response) {
      setProducts(response.data);
      setTotalPages(response.totalPages);
    }

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
    setTotalPages(1);
    setCurrentPage(1);
    setLoading(false);
  };

  const handleSearchById = async (id: number) => {
  const product = await getProductById(id);
  if (product) {
    setProducts([product]); // sirf ek product dikhao
  } else {
    setProducts([]); // ya empty table dikhao
  }
};

const handleProductByIdSearch = async (id: number) => {
  if (!id) return;
  const product = await getProductById(id); // 👈 ye already import hona chahiye
  if (product) {
    setProducts([product]); // 👈 tumhara existing state update logic
  } else {
    toast.error("No product found with this ID");
  }
};


  const handleFilterCategory = async (category: string) => {
    if (!category) {
      fetchProducts();
      return;
    }

    setLoading(true);
    const results = await getProductsByCategoryName(category);
    setProducts(results);
    setTotalPages(1);
    setCurrentPage(1);
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
    setTotalPages(1);
    setCurrentPage(1);
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

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
  };

  const handleConfirmDelete = async () => {
    if (!productToDelete) return;

    setIsDeleting(true);
    const success = await deleteProduct(productToDelete.id);
    setIsDeleting(false);

    if (success) {
      fetchProducts();
      setProductToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setProductToDelete(null);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-white">Products</h1>
          <p className="text-gray-400">Manage all products here</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-all duration-200"
        >
          + Add Product
        </button>
      </div>

      <ProductFilters
        onSearch={handleSearch}
        onFilterCategory={handleFilterCategory}
        onFilterBrand={handleFilterBrand}
        onSearchById={handleProductByIdSearch}
      />

      <ProductTable
        products={products}
        loading={loading}
        onEditClick={(product: Product) => setEditProduct(product)}
        onDeleteClick={handleDeleteClick}
        refreshProducts={fetchProducts}
      />

      {/* Pagination Controls */}
      <div className="mt-6 flex justify-center gap-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-white">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-700 text-white rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

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
          onProductUpdated={(updatedFields) =>
            handleProductUpdated(editProduct.id, updatedFields)
          }
        />
      )}

      {/* Delete Confirmation Modal */}
      {productToDelete && (
        <ProductDeleteConfirmationModal
          isOpen={!!productToDelete}
          productName={productToDelete.name}
          isDeleting={isDeleting}
          onCancel={handleCancelDelete}
          onConfirm={handleConfirmDelete}
        />
      )}
    </div>
  );
}
