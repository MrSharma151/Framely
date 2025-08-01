import React from "react";
import { Category } from "@/services/CategoryService";
import { Pencil, Trash } from "lucide-react";
import Button from "../Button";

interface CategoryTableProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id: number) => void;
  isLoading?: boolean;
}

const CategoryTable: React.FC<CategoryTableProps> = ({
  categories,
  onEdit,
  onDelete,
  isLoading = false,
}) => {
  return (
    <div className="category-table card bg-glassmorphism border border-border-color shadow-md backdrop-blur-md overflow-hidden">
      <table className="w-full text-base text-left font-medium text-primary">
        <thead>
          <tr className="text-sm uppercase text-secondary font-semibold border-b border-border-color bg-surface">
            <th className="py-4 px-6">ID</th>
            <th className="py-4 px-6">Name</th>
            <th className="py-4 px-6">Description</th>
            <th className="py-4 px-6 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={4} className="py-8 px-6 text-center text-secondary italic">
                Loading categories...
              </td>
            </tr>
          ) : categories.length === 0 ? (
            <tr>
              <td colSpan={4} className="py-8 px-6 text-center text-secondary italic">
                No categories found.
              </td>
            </tr>
          ) : (
            categories.map((category, index) => (
              <tr
                key={category.id}
                className={`transition-all duration-200 ${
                  index % 2 === 0 ? "bg-surface" : "bg-surface-hover"
                } hover:bg-highlight/10 border-b border-border-color`}
              >
                <td className="px-6 py-4">{category.id}</td>
                <td className="px-6 py-4">{category.name}</td>
                <td className="px-6 py-4 text-secondary">
                  {category.description || "-"}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(category)}
                      title="Edit"
                      className="group"
                    >
                      <Pencil size={20} className="text-primary group-hover:text-accent transition" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(category.id)}
                      title="Delete"
                      className="group"
                    >
                      <Trash size={20} className="text-red-400 group-hover:text-red-500 transition" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryTable;
