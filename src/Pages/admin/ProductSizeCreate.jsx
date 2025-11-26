import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Edit, Delete } from "@mui/icons-material";

export default function ProductSizeCreate() {
  const [selectedCategory, setSelectedCategory] = useState("fashion");
  const [value, setValue] = useState("");
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [confirm, setConfirm] = useState({ open: false, id: null });

  // Mock Data Store (In a real app, this would come from an API)
  const [optionsMap, setOptionsMap] = useState({
    fashion: [
      { id: 1, name: "XS" },
      { id: 2, name: "S" },
      { id: 3, name: "M" },
      { id: 4, name: "L" },
      { id: 5, name: "XL" },
      { id: 6, name: "XXL" },
    ],
    footwear: [
      { id: 101, name: "UK 6" },
      { id: 102, name: "UK 7" },
      { id: 103, name: "UK 8" },
      { id: 104, name: "UK 9" },
      { id: 105, name: "UK 10" },
    ],
    cosmetics: [
      { id: 201, name: "50ml" },
      { id: 202, name: "100ml" },
      { id: 203, name: "200ml" },
      { id: 204, name: "500ml" },
    ],
  });

  // Get current rows based on selection
  const rows = optionsMap[selectedCategory] || [];

  function onAdd(e) {
    e.preventDefault();
    const v = value.trim();
    if (!v) {
      toast.error("Please enter a value.");
      return;
    }
    // Check duplicate in current category
    const exists = rows.some((r) => r.name.toLowerCase() === v.toLowerCase());
    if (exists) {
      toast.error(`This option already exists in ${selectedCategory}.`);
      return;
    }

    const newId = Date.now();
    setOptionsMap((prev) => ({
      ...prev,
      [selectedCategory]: [...prev[selectedCategory], { id: newId, name: v }],
    }));
    setValue("");
    toast.success("Option added");
  }

  function onStartEdit(row) {
    setEditId(row.id);
    setEditValue(row.name);
  }

  function onSaveEdit() {
    const v = editValue.trim();
    if (!v) {
      toast.error("Please enter a value.");
      return;
    }
    const exists = rows.some((r) => r.name.toLowerCase() === v.toLowerCase() && r.id !== editId);
    if (exists) {
      toast.error("This option already exists.");
      return;
    }

    setOptionsMap((prev) => ({
      ...prev,
      [selectedCategory]: prev[selectedCategory].map((r) =>
        r.id === editId ? { ...r, name: v } : r
      ),
    }));
    setEditId(null);
    setEditValue("");
    toast.success("Option updated");
  }

  function onDelete(id) {
    setConfirm({ open: true, id });
  }

  function doDelete() {
    setOptionsMap((prev) => ({
      ...prev,
      [selectedCategory]: prev[selectedCategory].filter((r) => r.id !== confirm.id),
    }));
    setConfirm({ open: false, id: null });
    toast.success("Option deleted");
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Manage Variant Options</h1>
        <div className="w-full sm:w-64">
          <label className="block text-xs text-gray-600 mb-1 font-semibold">
            SELECT CATEGORY TYPE
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:ring-2 focus:ring-blue-500 outline-none"
          >
            <option value="fashion">Fashion (Clothing Sizes)</option>
            <option value="footwear">Footwear (Shoe Sizes)</option>
            <option value="cosmetics">Cosmetics (Volume)</option>
          </select>
        </div>
      </div>

      <form onSubmit={onAdd} className="bg-white rounded-lg shadow border border-gray-200 p-6">
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-gray-600 mb-1 uppercase">
              Add New {selectedCategory} Option
            </label>
            <div className="flex gap-2">
              <input
                value={value}
                onChange={(e) => setValue(e.target.value)}
                className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder={
                  selectedCategory === "fashion"
                    ? "e.g., XXL"
                    : selectedCategory === "footwear"
                    ? "e.g., UK 11"
                    : "e.g., 750ml"
                }
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 text-sm font-medium"
              >
                ADD
              </button>
            </div>
          </div>
        </div>
      </form>

      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-700">
                <th className="text-left font-medium px-4 py-2 uppercase">
                  {selectedCategory} Option
                </th>
                <th className="text-left font-medium px-4 py-2">ACTION</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map((row) => (
                <tr key={row.id} className="align-middle">
                  <td className="px-4 py-3">
                    {editId === row.id ? (
                      <input
                        value={editValue}
                        onChange={(e) => setEditValue(e.target.value)}
                        className="border border-gray-300 rounded-md px-2 py-1 text-sm w-40"
                        autoFocus
                      />
                    ) : (
                      <span className="text-gray-800 font-medium">{row.name}</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3 text-gray-600">
                      {editId === row.id ? (
                        <>
                          <button
                            title="Save"
                            onClick={onSaveEdit}
                            className="p-1 rounded hover:bg-green-50 text-green-600"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </button>
                          <button
                            title="Cancel"
                            onClick={() => {
                              setEditId(null);
                              setEditValue("");
                            }}
                            className="p-1 rounded hover:bg-gray-100"
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            title="Edit"
                            onClick={() => onStartEdit(row)}
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                          >
                            <Edit fontSize="small" />
                          </button>
                          <button
                            title="Delete"
                            onClick={() => onDelete(row.id)}
                            className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                          >
                            <Delete fontSize="small" />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td className="px-4 py-6 text-gray-500 text-center" colSpan={2}>
                    No options found for {selectedCategory}. Add one above!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {confirm.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setConfirm({ open: false, id: null })}
          />
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-sm p-5 z-10">
            <div className="text-base font-semibold text-gray-900">Delete Option</div>
            <div className="mt-2 text-sm text-gray-600">
              Are you sure you want to delete this option?
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="px-3 py-1.5 rounded border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                onClick={() => setConfirm({ open: false, id: null })}
              >
                Cancel
              </button>
              <button
                className="px-3 py-1.5 rounded text-white bg-red-600 hover:bg-red-700"
                onClick={doDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
