import React from "react";

/**
 * Delete Confirmation Modal
 * @param {boolean} open - Whether modal is open
 * @param {function} onConfirm - Callback when user confirms deletion
 * @param {function} onCancel - Callback when user cancels
 */
const DeleteConfirmModal = ({ open, onConfirm, onCancel }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-sm p-5 z-10">
        <div className="text-base font-semibold text-gray-900">Delete Category</div>
        <div className="mt-2 text-sm text-gray-600">
          Are you sure you want to delete this category?
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button
            className="px-3 py-1.5 rounded border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded text-white bg-red-600 hover:bg-red-700"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmModal;
