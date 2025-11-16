import React, { useState } from "react";

export default function ProductSizeCreate() {
  const [value, setValue] = useState("");
  const [rows, setRows] = useState([
    { id: 1, name: "XS" },
    { id: 2, name: "S" },
    { id: 3, name: "M" },
    { id: 4, name: "L" },
    { id: 5, name: "XL" },
  ]);
  const [editId, setEditId] = useState(null);
  const [editValue, setEditValue] = useState("");
  const [confirm, setConfirm] = useState({ open: false, id: null });

  function onAdd(e) {
    e.preventDefault();
    const v = value.trim();
    if (!v) {
      alert("Please enter a product size.");
      return;
    }
    const exists = rows.some((r) => r.name.toLowerCase() === v.toLowerCase());
    if (exists) {
      alert("This size already exists.");
      return;
    }
    const id = rows.length ? Math.max(...rows.map((r) => r.id)) + 1 : 1;
    setRows((prev) => [...prev, { id, name: v }]);
    setValue("");
  }

  function onStartEdit(row) {
    setEditId(row.id);
    setEditValue(row.name);
  }
  function onSaveEdit() {
    const v = editValue.trim();
    if (!v) {
      alert("Please enter a product size.");
      return;
    }
    const exists = rows.some((r) => r.name.toLowerCase() === v.toLowerCase() && r.id !== editId);
    if (exists) {
      alert("This size already exists.");
      return;
    }
    setRows((prev) => prev.map((r) => (r.id === editId ? { ...r, name: v } : r)));
    setEditId(null);
    setEditValue("");
  }

  function onDelete(id) {
    setConfirm({ open: true, id });
  }
  function doDelete() {
    setRows((prev) => prev.filter((r) => r.id !== confirm.id));
    setConfirm({ open: false, id: null });
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Add Product SIZE</h1>
      </div>

      <form onSubmit={onAdd} className="bg-white rounded-lg shadow border border-gray-200 p-6">
        <div className="space-y-3">
          <div>
            <label className="block text-xs text-gray-600 mb-1">PRODUCT SIZE</label>
            <input
              value={value}
              onChange={(e) => setValue(e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
              placeholder="e.g., XS"
            />
          </div>
          <button
            type="submit"
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            ADD SIZE
          </button>
        </div>
      </form>

      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-50 text-gray-700">
                <th className="text-left font-medium px-4 py-2">PRODUCT SIZE</th>
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
                      <span className="text-blue-600">{row.name}</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3 text-gray-600">
                      {editId === row.id ? (
                        <>
                          <button title="Save" onClick={onSaveEdit} className="p-1 rounded hover:bg-gray-100">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                          </button>
                          <button title="Cancel" onClick={() => { setEditId(null); setEditValue(""); }} className="p-1 rounded hover:bg-gray-100">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </>
                      ) : (
                        <>
                          <button title="Edit" onClick={() => onStartEdit(row)}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536M4 20h4l10.293-10.293a1 1 0 000-1.414l-2.586-2.586a1 1 0 00-1.414 0L4 16v4z" /></svg>
                          </button>
                          <button title="Delete" onClick={() => onDelete(row.id)}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m-7 0a2 2 0 012-2h4a2 2 0 012 2m-8 0H5m11 0h3" /></svg>
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td className="px-4 py-6 text-gray-500" colSpan={2}>No sizes</td>
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
            <div className="text-base font-semibold text-gray-900">Delete Size</div>
            <div className="mt-2 text-sm text-gray-600">Are you sure you want to delete this product size? This action cannot be undone.</div>
            <div className="mt-4 flex justify-end gap-2">
              <button className="px-3 py-1.5 rounded border border-gray-300 text-gray-700 bg-white hover:bg-gray-50" onClick={() => setConfirm({ open: false, id: null })}>Cancel</button>
              <button className="px-3 py-1.5 rounded text-white bg-red-600 hover:bg-red-700" onClick={doDelete}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
