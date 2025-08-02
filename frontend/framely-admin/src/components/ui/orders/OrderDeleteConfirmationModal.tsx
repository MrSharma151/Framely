"use client";

import React from "react";
import Button from "../Button";

interface OrderDeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message?: string;
}

const OrderDeleteConfirmationModal: React.FC<OrderDeleteConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  message = "Are you sure you want to delete this order?",
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-60 flex items-center justify-center">
      <div className="bg-[#1a1a1a] w-full max-w-sm rounded-xl p-6 border border-gray-700 shadow-xl">
        <h2 className="text-lg font-semibold text-white mb-4">Confirm Delete</h2>
        <p className="text-gray-300 mb-6">{message}</p>

        <div className="flex justify-end gap-4">
          <Button
            onClick={onClose}
            className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2"
          >
            Cancel
          </Button>

          <Button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2"
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

export default OrderDeleteConfirmationModal;
