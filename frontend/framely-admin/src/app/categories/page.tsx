"use client";

import React, { useEffect, useState } from "react";
import { Category } from "@/services/CategoryService";
import CategorySearchBar from "@/components/ui/categories/CategorySearchBar";
import CategoryTable from "@/components/ui/categories/CategoryTable";
import AddCategoryModal from "@/components/ui/categories/AddCategoryModal";
import EditCategoryModal from "@/components/ui/categories/EditCategoryModal";
import ConfirmDeleteModal from "@/components/ui/categories/ConfirmDeleteModal";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "@/services/CategoryService";
import Button from "@/components/ui/Button";

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState({
    open: false,
    categoryId: null as number | null,
    categoryName: "",
  });

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await getCategories();
      setCategories(response.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleAddCategory = async (newCategory: Omit<Category, "id">) => {
    const success = await createCategory(newCategory);
    if (success) {
      fetchCategories();
      setIsAddModalOpen(false);
    }
  };

  const handleEditCategory = async (
    id: number,
    updatedCategory: Omit<Category, "id">
  ): Promise<boolean> => {
    const success = await updateCategory(id, updatedCategory);
    if (success) {
      fetchCategories();
      setSelectedCategory(null);
      return true;
    }
    return false;
  };

  const triggerDeleteModal = (category: Category) => {
    setConfirmDeleteModal({
      open: true,
      categoryId: category.id,
      categoryName: category.name,
    });
  };

  const confirmDeleteCategory = async () => {
    if (confirmDeleteModal.categoryId) {
      const success = await deleteCategory(confirmDeleteModal.categoryId);
      if (success) fetchCategories();
    }
    setConfirmDeleteModal({ open: false, categoryId: null, categoryName: "" });
  };

  const handleOpenEditModal = (category: Category) => {
    setSelectedCategory(category);
  };

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full bg-dark-glass backdrop-blur-md px-4 sm:px-6 md:px-10 py-6 md:py-10 rounded-xl shadow-2xl fade-in transition-all duration-300">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
        <h1 className="title text-2xl sm:text-3xl font-bold text-primary">📁 Categories</h1>
        <Button
          variant="gradient"
          size="md"
          onClick={() => setIsAddModalOpen(true)}
          className="shadow-md"
        >
          ➕ Add Category
        </Button>
      </div>

      {/* Search */}
      <div className="mb-4">
        <CategorySearchBar searchTerm={searchTerm} onSearch={handleSearch} />
      </div>

      {/* Table */}
      <div className="mt-4 overflow-hidden rounded-xl">
        <CategoryTable
          categories={filteredCategories}
          onEdit={handleOpenEditModal}
          onDelete={(id) => {
            const category = categories.find((cat) => cat.id === id);
            if (category) triggerDeleteModal(category);
          }}
          isLoading={loading}
        />
      </div>

      {/* Modals */}
      <AddCategoryModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddCategory}
      />
      <EditCategoryModal
        isOpen={!!selectedCategory}
        category={selectedCategory}
        onClose={() => setSelectedCategory(null)}
        onUpdate={handleEditCategory}
        onSuccess={() => {}}
      />
      <ConfirmDeleteModal
        isOpen={confirmDeleteModal.open}
        categoryName={confirmDeleteModal.categoryName}
        onConfirm={confirmDeleteCategory}
        onCancel={() =>
          setConfirmDeleteModal({ open: false, categoryId: null, categoryName: "" })
        }
      />
    </div>
  );
};

export default CategoriesPage;
