"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import Button from "../Button";

interface ConfirmDeleteModalProps {
  isOpen: boolean;
  categoryName?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDeleteModal({
  isOpen,
  categoryName,
  onConfirm,
  onCancel,
}: ConfirmDeleteModalProps) {
  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog onClose={onCancel} className="fixed inset-0 z-50 flex items-center justify-center px-4">
        {/* Overlay */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-150"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        {/* Modal Panel */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Dialog.Panel className="card w-full max-w-md z-10">
            <Dialog.Title className="text-xl font-bold mb-4 text-center">
              🗑️ Delete Category
            </Dialog.Title>
            <p className="text-sm mb-6 leading-relaxed text-center">
              Are you sure you want to delete
              {categoryName ? ` “${categoryName}”` : " this category"}? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={onCancel}>
                Cancel
              </Button>
              <Button variant="danger" onClick={onConfirm}>
                Yes, Delete
              </Button>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}
