import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const initialCategories = [
  { id: 1, name: "Fashion", image: "https://images.unsplash.com/photo-1520975940505-df998d4fe4f2?w=64&q=80&auto=format&fit=crop" },
  { id: 2, name: "Electronics", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=64&q=80&auto=format&fit=crop" },
  { id: 3, name: "Home & Kitchen", image: "https://images.unsplash.com/photo-1496412705862-e0088f16f791?w=64&q=80&auto=format&fit=crop" },
];

export default function CategoriesList() {
  const [rows, setRows] = useState(initialCategories);
  const [confirm, setConfirm] = useState({ open: false, id: null });
  const [editOpen, setEditOpen] = useState(false);
  const [editForm, setEditForm] = useState({ id: null, name: "", image: "", file: null, preview: "" });
  const fileRef = useRef(null);

  useEffect(() => {
    return () => {
      if (editForm.preview) URL.revokeObjectURL(editForm.preview);
    };
  }, [editForm.preview]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Category List</h1>
        <Link to="/admin/categories/new" className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 text-sm">
          ADD CATEGORY
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-700">
                <th className="text-left font-medium px-4 py-2">IMAGE</th>
                <th className="text-left font-medium px-4 py-2">CATEGORY NAME</th>
                <th className="text-left font-medium px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map((c) => (
                <tr key={c.id}>
                  <td className="px-4 py-3">
                    <img
                      src={c.image}
                      alt={c.name}
                      className="w-9 h-9 rounded-full object-cover bg-gray-200"
                      onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }}
                    />
                  </td>
                  <td className="px-4 py-3 text-gray-900">{c.name}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3 text-gray-600">
                      <button
                        className="hover:text-gray-900"
                        title="Edit"
                        onClick={() => {
                          setEditForm({ id: c.id, name: c.name, image: c.image, file: null, preview: "" });
                          setEditOpen(true);
                        }}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536M4 20h4l10.293-10.293a1 1 0 000-1.414l-2.586-2.586a1 1 0 00-1.414 0L4 16v4z" />
                        </svg>
                      </button>
                      <button
                        className="hover:text-gray-900"
                        title="Delete"
                        onClick={() => setConfirm({ open: true, id: c.id })}
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m-7 0a2 2 0 012-2h4a2 2 0 012 2m-8 0H5m11 0h3" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td className="px-4 py-6 text-gray-500" colSpan={3}>No categories</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {confirm.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setConfirm({ open: false, id: null })} />
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-sm p-5 z-10">
            <div className="text-base font-semibold text-gray-900">Delete Category</div>
            <div className="mt-2 text-sm text-gray-600">Are you sure you want to delete this category?</div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="px-3 py-1.5 rounded border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                onClick={() => setConfirm({ open: false, id: null })}
              >
                Cancel
              </button>
              <button
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded text-white bg-red-600 hover:bg-red-700"
                onClick={() => {
                  setRows((prev) => prev.filter((x) => x.id !== confirm.id));
                  setConfirm({ open: false, id: null });
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {editOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setEditOpen(false)} />
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg p-5 z-10">
            <div className="text-base font-semibold text-gray-900">Edit Category</div>
            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Category Name</label>
                <input
                  value={editForm.name}
                  onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))}
                  className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="space-y-3">
                <img
                  src={editForm.preview || editForm.image}
                  alt={editForm.name}
                  className="w-full max-w-xs rounded bg-gray-100 object-cover"
                  style={{ aspectRatio: "4/3" }}
                  onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }}
                />
                <div>
                  <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => {
                    const f = e.target.files && e.target.files[0];
                    if (!f) return;
                    const url = URL.createObjectURL(f);
                    setEditForm((prev) => ({ ...prev, file: f, preview: url }));
                  }} />
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 text-sm"
                    onClick={() => fileRef.current && fileRef.current.click()}
                  >
                    UPLOAD NEW IMAGE
                  </button>
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  className="px-3 py-1.5 rounded border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                  onClick={() => setEditOpen(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-3 py-1.5 rounded text-white bg-blue-600 hover:bg-blue-700"
                  onClick={() => {
                    setRows((prev) => prev.map((r) => r.id === editForm.id ? { ...r, name: editForm.name, image: editForm.preview || editForm.image } : r));
                    setEditOpen(false);
                  }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
