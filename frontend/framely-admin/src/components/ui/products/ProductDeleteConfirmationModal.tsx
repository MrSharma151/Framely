// components/ui/products/ProductDeleteConfirmationModal.tsx

"use client";

import React from "react";
import Button from "../Button";

interface Props {
  isOpen: boolean;
  productName: string;
  isDeleting: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function ProductDeleteConfirmationModal({
  isOpen,
  productName,
  isDeleting,
  onCancel,
  onConfirm,
}: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-[#1e1e1e] border border-red-600 rounded-xl shadow-lg max-w-sm w-full p-6">
        <h2 className="text-xl text-red-500 font-semibold mb-3">Delete Product</h2>
        <p className="text-sm text-gray-300 mb-4">
          Are you sure you want to delete <span className="font-bold text-white">{productName}</span>? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <Button onClick={onCancel} variant="outline" className="border-gray-400 text-gray-200" disabled={isDeleting}>
            Cancel
          </Button>
          <Button onClick={onConfirm} variant="danger" disabled={isDeleting}>
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </div>
      </div>
    </div>
  );
}
