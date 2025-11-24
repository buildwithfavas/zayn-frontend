import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import BlockIcon from "@mui/icons-material/Block";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";

/**
 * Reusable table component for the admin category list.
 * Props:
 *   - categories: array of category objects
 *   - isLoading: boolean indicating loading state
 *   - onEdit: (category) => void – called when the edit button is clicked
 *   - onDelete: (categoryId) => void – called when the delete button is clicked
 *   - onBlockToggle: (categoryId, currentlyBlocked) => void – toggles block/unblock state
 *   - onOffer: (categoryId, currentOffer) => void – opens offer modal
 */
const CategoryListTable = ({ categories, isLoading, onEdit, onDelete, onBlockToggle, onOffer }) => {
  return (
    <div className="bg-white rounded-lg shadow border border-gray-200">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-700">
              <th className="text-left font-medium px-4 py-2">IMAGE</th>
              <th className="text-left font-medium px-4 py-2">CATEGORY NAME</th>
              <th className="text-left font-medium px-4 py-2">ACTION</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading ? (
              <tr>
                <td colSpan={3} className="px-4 py-6 text-center">
                  Loading...
                </td>
              </tr>
            ) : (
              categories.map((c) => (
                <tr key={c._id}>
                  <td className="px-4 py-3">
                    <img
                      src={c.image}
                      alt={c.name}
                      className="w-9 h-9 rounded-full object-cover bg-gray-200"
                      onError={(e) => {
                        e.currentTarget.style.visibility = "hidden";
                      }}
                    />
                  </td>
                  <td className="px-4 py-3 text-gray-900">
                    {c.name}
                    {c.isBlocked && (
                      <span className="ml-2 bg-red-100 text-red-800 text-xs px-2 py-0.5 rounded">
                        Blocked
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3 text-gray-600">
                      {/* Edit */}
                      <button
                        className="hover:text-blue-600 transition-colors"
                        title="Edit"
                        onClick={() => onEdit(c)}
                      >
                        <EditIcon fontSize="small" />
                      </button>
                      {/* Delete */}
                      <button
                        className="hover:text-red-600 transition-colors"
                        title="Delete"
                        onClick={() => onDelete(c._id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </button>
                      {/* Block / Unblock */}
                      <button
                        className={`transition-colors ${
                          c.isBlocked
                            ? "text-green-600 hover:text-green-700"
                            : "text-red-600 hover:text-red-700"
                        }`}
                        title={c.isBlocked ? "Unblock" : "Block"}
                        onClick={() => onBlockToggle(c._id, c.isBlocked)}
                      >
                        {c.isBlocked ? (
                          <CheckCircleIcon fontSize="small" />
                        ) : (
                          <BlockIcon fontSize="small" />
                        )}
                      </button>
                      {/* Offer */}
                      <button
                        className="hover:text-orange-600 transition-colors"
                        title="Add / Edit Offer"
                        onClick={() => onOffer(c._id, c.offer)}
                      >
                        <LocalOfferIcon fontSize="small" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
            {!isLoading && categories.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-gray-500" colSpan={3}>
                  No categories
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoryListTable;
