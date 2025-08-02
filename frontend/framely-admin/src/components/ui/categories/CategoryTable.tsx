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
    <div className="w-full overflow-x-auto rounded-2xl shadow-xl border border-border-color bg-dark-glass backdrop-blur-md p-2 md:p-4 transition-all duration-300">
      <table className="min-w-full text-sm md:text-base text-left text-primary font-normal">
        <thead>
          <tr className="uppercase text-secondary font-semibold bg-surface/30 border-b border-border-color">
            <th className="py-3 px-4 md:px-6">ID</th>
            <th className="py-3 px-4 md:px-6">Name</th>
            <th className="py-3 px-4 md:px-6">Description</th>
            <th className="py-3 px-4 md:px-6 text-right">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td
                colSpan={4}
                className="py-6 px-4 md:px-6 text-center text-secondary italic"
              >
                Loading categories...
              </td>
            </tr>
          ) : categories.length === 0 ? (
            <tr>
              <td
                colSpan={4}
                className="py-6 px-4 md:px-6 text-center text-secondary italic"
              >
                No categories found.
              </td>
            </tr>
          ) : (
            categories.map((category, index) => (
              <tr
                key={category.id}
                className={`
                  transition-all duration-200
                  ${index % 2 === 0 ? "bg-surface/5" : "bg-surface/10"}
                  hover:bg-zinc-800 hover:shadow-md
                  border-b border-border-color
                `}
              >
                <td className="py-3 px-4 md:px-6 rounded-l-lg">{category.id}</td>
                <td className="py-3 px-4 md:px-6">{category.name}</td>
                <td className="py-3 px-4 md:px-6 text-secondary">
                  {category.description || "-"}
                </td>
                <td className="py-3 px-4 md:px-6 text-right rounded-r-lg">
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onEdit(category)}
                      title="Edit"
                      className="group"
                    >
                      <Pencil
                        size={20}
                        className="text-primary group-hover:text-accent transition"
                      />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onDelete(category.id)}
                      title="Delete"
                      className="group"
                    >
                      <Trash
                        size={20}
                        className="text-red-400 group-hover:text-red-500 transition"
                      />
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
