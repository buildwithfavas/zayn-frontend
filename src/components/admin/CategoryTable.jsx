import React from "react";
import { Link } from "react-router-dom";
import { Edit, Delete, Block, LockOpen, LocalOffer } from "@mui/icons-material";

export default function CategoryTable({
  categories,
  isLoading,
  totalCategories,
  currentPage,
  perPage,
  onPageChange,
  onEdit,
  onDelete,
  onBlockToggle,
  onOffer,
}) {
  const totalPages = Math.ceil(totalCategories / perPage);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64 bg-white rounded-lg border border-gray-200">
        <div className="text-gray-500">Loading categories...</div>
      </div>
    );
  }

  if (!categories || categories.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 bg-white rounded-lg border border-gray-200">
        <div className="text-gray-500">No categories found</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-700 border-b border-gray-200">
              <th className="text-left font-medium px-4 py-3">Image</th>
              <th className="text-left font-medium px-4 py-3">Name</th>
              <th className="text-left font-medium px-4 py-3">Offer</th>
              <th className="text-left font-medium px-4 py-3">Status</th>
              <th className="text-left font-medium px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {categories.map((category) => (
              <tr key={category._id} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="w-10 h-10 rounded-md overflow-hidden bg-gray-100 border border-gray-200">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = "https://via.placeholder.com/40";
                      }}
                    />
                  </div>
                </td>
                <td className="px-4 py-3 font-medium text-gray-900">{category.name}</td>
                <td className="px-4 py-3">
                  {category.offer ? (
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-purple-100 text-purple-800">
                      {category.offer}
                    </span>
                  ) : (
                    <span className="text-gray-400 text-xs">-</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      category.isBlocked ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800"
                    }`}
                  >
                    {category.isBlocked ? "Blocked" : "Active"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onEdit(category)}
                      className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onOffer(category._id, category.offer)}
                      className="p-1 text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                      title="Manage Offer"
                    >
                      <LocalOffer className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onBlockToggle(category._id, category.isBlocked)}
                      className={`p-1 rounded transition-colors ${
                        category.isBlocked
                          ? "text-green-600 hover:bg-green-50"
                          : "text-red-600 hover:bg-red-50"
                      }`}
                      title={category.isBlocked ? "Unblock" : "Block"}
                    >
                      {category.isBlocked ? (
                        <LockOpen className="w-4 h-4" />
                      ) : (
                        <Block className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => onDelete(category._id)}
                      className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                      title="Delete"
                    >
                      <Delete className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {/* Empty State */}
      {!isLoading && totalCategories === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-gray-500">
          <div className="bg-gray-100 p-4 rounded-full mb-3">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
              />
            </svg>
          </div>
          <p className="text-lg font-medium text-gray-900">No categories found</p>
          <p className="text-sm">
            Try adjusting your search or filter to find what you're looking for.
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalCategories > 0 && (
        <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
          <div className="text-xs text-gray-600">
            Showing {(currentPage - 1) * perPage + 1}-
            {Math.min(currentPage * perPage, totalCategories)} of {totalCategories}
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-2.5 py-1 rounded border border-gray-300 text-sm ${
                currentPage === 1
                  ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                  : "text-gray-700 bg-white hover:bg-gray-50"
              }`}
            >
              Previous
            </button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <button
                  key={pageNum}
                  onClick={() => onPageChange(pageNum)}
                  className={`px-2.5 py-1 rounded border border-gray-300 text-sm ${
                    currentPage === pageNum
                      ? "text-white bg-blue-500"
                      : "text-gray-700 bg-white hover:bg-gray-50"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-2.5 py-1 rounded border border-gray-300 text-sm ${
                currentPage === totalPages
                  ? "text-gray-400 bg-gray-100 cursor-not-allowed"
                  : "text-gray-700 bg-white hover:bg-gray-50"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
