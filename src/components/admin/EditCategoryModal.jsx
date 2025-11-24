import React from "react";

/**
 * Edit Category Modal Component
 * @param {boolean} open - Whether modal is open
 * @param {object} formData - Form data with id, name, image, preview
 * @param {function} onNameChange - Callback when name changes
 * @param {function} onImageChange - Callback when image file changes
 * @param {function} onSave - Callback when user saves
 * @param {function} onCancel - Callback when user cancels
 * @param {ref} fileInputRef - Ref for file input element
 */
const EditCategoryModal = ({
  open,
  formData,
  onNameChange,
  onImageChange,
  onSave,
  onCancel,
  fileInputRef,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg p-5 z-10">
        <div className="text-base font-semibold text-gray-900">Edit Category</div>
        <div className="mt-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Category Name</label>
            <input
              value={formData.name}
              onChange={(e) => onNameChange(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="space-y-3">
            <img
              src={formData.preview || formData.image}
              alt={formData.name}
              className="w-full max-w-xs rounded bg-gray-100 object-cover"
              style={{ aspectRatio: "4/3" }}
              onError={(e) => {
                e.currentTarget.style.visibility = "hidden";
              }}
            />
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onImageChange}
              />
              <button
                type="button"
                className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 text-sm"
                onClick={() => fileInputRef.current && fileInputRef.current.click()}
              >
                UPLOAD NEW IMAGE
              </button>
            </div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              className="px-3 py-1.5 rounded border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
              onClick={onCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className="px-3 py-1.5 rounded text-white bg-blue-600 hover:bg-blue-700"
              onClick={onSave}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCategoryModal;
