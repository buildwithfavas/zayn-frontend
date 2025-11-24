import React from "react";

/**
 * Offer Modal Component
 * @param {boolean} open - Whether modal is open
 * @param {string} currentOffer - Current offer value
 * @param {function} onChange - Callback when offer value changes
 * @param {function} onSave - Callback when user saves
 * @param {function} onCancel - Callback when user cancels
 */
const OfferModal = ({ open, currentOffer, onChange, onSave, onCancel }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onCancel} />
      <div className="relative bg-white rounded-lg shadow-lg w-full max-w-sm p-5 z-10">
        <div className="text-base font-semibold text-gray-900">Add / Edit Offer</div>
        <div className="mt-2">
          <input
            type="text"
            placeholder="e.g., 10% OFF"
            className="w-full border rounded px-2 py-1.5"
            value={currentOffer}
            onChange={(e) => onChange(e.target.value)}
          />
        </div>
        <div className="mt-4 flex justify-end gap-2">
          <button
            className="px-3 py-1.5 rounded border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded text-white bg-blue-600 hover:bg-blue-700"
            onClick={onSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfferModal;
