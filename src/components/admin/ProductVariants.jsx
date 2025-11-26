import React from "react";
import { Delete, Add } from "@mui/icons-material";

export default function ProductVariants({
  variants,
  addVariant,
  removeVariant,
  updateVariant,
  attributeLabel,
  variantOptions = [], // New prop for dynamic options
}) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Product Variants</h2>
        <button
          type="button"
          onClick={addVariant}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-white bg-green-600 hover:bg-green-700 text-sm font-medium"
        >
          <Add fontSize="small" />
          Add Variant
        </button>
      </div>

      {variants.map((variant, index) => (
        <div
          key={variant.id}
          className="bg-white rounded-lg shadow border border-gray-200 p-6 relative"
        >
          <div className="absolute top-4 right-4">
            <button
              type="button"
              onClick={() => removeVariant(variant.id)}
              className="text-red-500 hover:text-red-700 p-1"
              title="Remove Variant"
            >
              <Delete />
            </button>
          </div>
          <h3 className="text-sm font-semibold text-gray-500 mb-4">Variant #{index + 1}</h3>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">{attributeLabel}</label>
              {/* Changed to Select Dropdown */}
              <select
                value={variant.attributeValue}
                onChange={(e) => updateVariant(variant.id, "attributeValue", e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
              >
                <option value="">Select</option>
                {variantOptions.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Product Price</label>
              <input
                type="number"
                value={variant.price}
                onChange={(e) => updateVariant(variant.id, "price", e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                placeholder="0.00"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Old Price</label>
              <input
                type="number"
                value={variant.oldPrice}
                onChange={(e) => updateVariant(variant.id, "oldPrice", e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                placeholder="0.00"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Stock</label>
              <input
                type="number"
                value={variant.stock}
                onChange={(e) => updateVariant(variant.id, "stock", e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                placeholder="Qty"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Discount %</label>
              <input
                type="number"
                value={variant.discount}
                onChange={(e) => updateVariant(variant.id, "discount", e.target.value)}
                className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                placeholder="%"
                min="0"
                max="90"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
