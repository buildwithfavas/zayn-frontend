import React, { useMemo, useState } from "react";

const initialData = [
  {
    id: 1,
    name: "Fashion",
    subs: [
      { id: 11, name: "Women", subs: [{ id: 111, name: "Tops" }, { id: 112, name: "Jeans" }] },
      { id: 12, name: "Girls", subs: [{ id: 121, name: "Kurtas & Suits" }, { id: 122, name: "Sarees" }, { id: 123, name: "Tops" }, { id: 124, name: "Kurta Sets" }] },
      { id: 13, name: "Men", subs: [] },
    ],
  },
];

export default function SubcategoriesList() {
  const [data, setData] = useState(initialData);
  const [openCats, setOpenCats] = useState(() => Object.fromEntries(initialData.map((c) => [c.id, true])));
  const [openSubs, setOpenSubs] = useState(() => {
    const subs = {};
    initialData.forEach((c) => c.subs.forEach((s) => { subs[s.id] = true; }));
    return subs;
  });
  const [modal, setModal] = useState({ type: null, payload: null });
  const catOptions = useMemo(() => data.map((c) => ({ id: c.id, name: c.name })), [data]);

  function toggleCat(id) {
    setOpenCats((p) => ({ ...p, [id]: !p[id] }));
  }
  function toggleSub(id) {
    setOpenSubs((p) => ({ ...p, [id]: !p[id] }));
  }

  function updateName(level, ids, name) {
    setData((prev) => prev.map((c) => {
      if (level === 2 && c.id === ids.catId) {
        return { ...c, subs: c.subs.map((s) => (s.id === ids.subId ? { ...s, name } : s)) };
      }
      if (level === 3 && c.id === ids.catId) {
        return { ...c, subs: c.subs.map((s) => (s.id === ids.subId ? { ...s, subs: s.subs.map((ss) => (ss.id === ids.subsubId ? { ...ss, name } : ss)) } : s)) };
      }
      return c;
    }));
  }

  function deleteItem(level, ids) {
    setData((prev) => prev.map((c) => {
      if (level === 2 && c.id === ids.catId) {
        return { ...c, subs: c.subs.filter((s) => s.id !== ids.subId) };
      }
      if (level === 3 && c.id === ids.catId) {
        return { ...c, subs: c.subs.map((s) => (s.id === ids.subId ? { ...s, subs: s.subs.filter((ss) => ss.id !== ids.subsubId) } : s)) };
      }
      return c;
    }));
  }

  function addItem(level, ids, name) {
    const newId = Date.now();
    setData((prev) => prev.map((c) => {
      if (level === 2 && c.id === ids.catId) {
        return { ...c, subs: [...c.subs, { id: newId, name, subs: [] }] };
      }
      if (level === 3 && c.id === ids.catId) {
        return { ...c, subs: c.subs.map((s) => (s.id === ids.subId ? { ...s, subs: [...s.subs, { id: newId, name }] } : s)) };
      }
      return c;
    }));
  }

  function renderActions(level, ids) {
    return (
      <div className="flex items-center gap-2 text-gray-600">
        {level !== 3 && (
          <button title="Add" onClick={() => setModal({ type: "add", payload: { level, ids } })}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
          </button>
        )}
        <button title="Edit" onClick={() => setModal({ type: "edit", payload: { level, ids } })}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536M4 20h4l10.293-10.293a1 1 0 000-1.414l-2.586-2.586a1 1 0 00-1.414 0L4 16v4z" /></svg>
        </button>
        <button title="Delete" onClick={() => setModal({ type: "delete", payload: { level, ids } })}>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m-7 0a2 2 0 012-2h4a2 2 0 012 2m-8 0H5m11 0h3" /></svg>
        </button>
      </div>
    );
  }

  function getName(level, ids) {
    const cat = data.find((c) => c.id === ids.catId);
    if (!cat) return "";
    if (level === 2) return cat.subs.find((s) => s.id === ids.subId)?.name || "";
    const sub = cat.subs.find((s) => s.id === ids.subId);
    return sub?.subs.find((ss) => ss.id === ids.subsubId)?.name || "";
  }

  function AddEditModal() {
    if (!modal.type || (modal.type !== "add" && modal.type !== "edit")) return null;
    const level = modal.payload?.level;
    const ids = modal.payload?.ids;
    const isTopAdd = modal.type === "add" && level === 2 && !ids?.subId && !ids?.subsubId && !ids?.fromButton;
    const [formCatId, setFormCatId] = useState(catOptions[0]?.id || null);
    const [name, setName] = useState(modal.type === "edit" ? getName(level, ids) : "");
    const title = modal.type === "edit" ? "Edit" : "Add";
    const heading = `${title} ${level === 2 ? "Sub Category" : "Sub Sub Category"}`;
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40" onClick={() => setModal({ type: null, payload: null })} />
        <div className="relative bg-white rounded-lg shadow-lg w-full max-w-md p-5 z-10">
          <div className="text-base font-semibold text-gray-900">{heading}</div>
          <div className="mt-4 space-y-4">
            {modal.type === "add" && modal.payload?.fromButton && (
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <select value={formCatId || ""} onChange={(e) => setFormCatId(Number(e.target.value))} className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
                  {catOptions.map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))}
                </select>
              </div>
            )}
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input value={name} onChange={(e) => setName(e.target.value)} className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 text-sm" />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" className="px-3 py-1.5 rounded border border-gray-300 text-gray-700 bg-white hover:bg-gray-50" onClick={() => setModal({ type: null, payload: null })}>Cancel</button>
              <button
                type="button"
                className="px-3 py-1.5 rounded text-white bg-blue-600 hover:bg-blue-700"
                onClick={() => {
                  if (!name) return;
                  if (modal.type === "edit") {
                    updateName(level, ids, name);
                  } else {
                    if (modal.payload?.fromButton) {
                      addItem(2, { catId: formCatId }, name);
                    } else if (level === 2) {
                      addItem(3, ids, name);
                    } else if (level === 3) {
                      addItem(3, { catId: ids.catId, subId: ids.subId }, name);
                    }
                  }
                  setModal({ type: null, payload: null });
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function DeleteModal() {
    if (modal.type !== "delete") return null;
    const { level, ids } = modal.payload || {};
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40" onClick={() => setModal({ type: null, payload: null })} />
        <div className="relative bg-white rounded-lg shadow-lg w-full max-w-sm p-5 z-10">
          <div className="text-base font-semibold text-gray-900">Delete</div>
          <div className="mt-2 text-sm text-gray-600">Are you sure you want to delete this item?</div>
          <div className="mt-4 flex justify-end gap-2">
            <button className="px-3 py-1.5 rounded border border-gray-300 text-gray-700 bg-white hover:bg-gray-50" onClick={() => setModal({ type: null, payload: null })}>Cancel</button>
            <button className="px-3 py-1.5 rounded text-white bg-red-600 hover:bg-red-700" onClick={() => { deleteItem(level, ids); setModal({ type: null, payload: null }); }}>Delete</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Sub Category List</h1>
        <button
          className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 text-sm"
          onClick={() => setModal({ type: "add", payload: { level: 2, ids: {}, fromButton: true } })}
        >
          ADD NEW SUB CATEGORY
        </button>
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="p-3">
          {data.map((cat) => (
            <div key={cat.id} className="mb-2">
              <div className="flex items-center justify-between bg-gray-100 rounded px-3 py-2">
                <div className="font-medium text-gray-800">{cat.name}</div>
                <button onClick={() => toggleCat(cat.id)} className="text-gray-600">
                  <svg className={`w-4 h-4 transition-transform ${openCats[cat.id] ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                </button>
              </div>
              {openCats[cat.id] && (
                <div className="mt-2 ml-3">
                  {cat.subs.map((sub) => (
                    <div key={sub.id} className="mb-2">
                      <div className="flex items-center justify-between px-2 py-1">
                        <div className="flex items-center gap-2">
                          <button onClick={() => toggleSub(sub.id)} className="text-gray-600">
                            <svg className={`w-4 h-4 transition-transform ${openSubs[sub.id] ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                          </button>
                          <span className="text-gray-800">{sub.name}</span>
                        </div>
                        {renderActions(2, { catId: cat.id, subId: sub.id })}
                      </div>
                      {openSubs[sub.id] && (
                        <div className="mt-1 ml-6">
                          {sub.subs.map((ss) => (
                            <div key={ss.id} className="flex items-center justify-between px-2 py-1">
                              <div className="text-gray-800">{ss.name}</div>
                              {renderActions(3, { catId: cat.id, subId: sub.id, subsubId: ss.id })}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <AddEditModal />
      <DeleteModal />
    </div>
  );
}
