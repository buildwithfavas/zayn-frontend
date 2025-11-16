import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const catData = [
  {
    id: 1,
    name: "Fashion",
    subs: [
      { id: 11, name: "Women", subs: [{ id: 111, name: "Tops" }, { id: 112, name: "Jeans" }] },
      { id: 12, name: "Girls", subs: [{ id: 121, name: "Kurtas & Suits" }, { id: 122, name: "Sarees" }, { id: 123, name: "Tops" }, { id: 124, name: "Kurta Sets" }] },
      { id: 13, name: "Men", subs: [{ id: 131, name: "Shirts" }, { id: 132, name: "T-Shirts" }] },
    ],
  },
  {
    id: 2,
    name: "Electronics",
    subs: [
      { id: 21, name: "Mobiles", subs: [{ id: 211, name: "Smartphones" }] },
      { id: 22, name: "Laptops", subs: [{ id: 221, name: "Gaming Laptops" }, { id: 222, name: "Ultrabooks" }] },
    ],
  },
];

function formatINR(n) {
  return `₹${Number(n).toFixed(2)}`;
}

export default function ProductList() {
  const navigate = useNavigate();

  const initialProducts = useMemo(() => {
    const items = [];
    let pid = 1;
    catData.forEach((c) => {
      c.subs.forEach((s) => {
        const subs2 = s.subs && s.subs.length ? s.subs : [{ id: s.id * 100 + 1, name: "General" }];
        subs2.forEach((ss) => {
          for (let i = 0; i < 3; i++) {
            const base = 500 + ((pid * 17) % 400);
            const sale = base - (i + 1) * 10;
            const stock = 5 + ((pid * 7) % 20);
            items.push({
              id: pid,
              name: `${ss.name} ${s.name} ${pid % 2 ? "Shirt" : "Item"}`,
              catId: c.id,
              subId: s.id,
              subsubId: ss.id,
              price: base,
              salePrice: sale,
              sales: (pid * 3) % 10,
              stock,
              offerPercent: pid % 4 === 0 ? 7 : 0,
            });
            pid += 1;
          }
        });
      });
    });
    while (items.length < 100) {
      const src = items[items.length - 1];
      items.push({ ...src, id: items.length + 1, name: `${src.name} ${items.length + 1}` });
    }
    return items;
  }, []);

  const [rows, setRows] = useState(initialProducts);
  const [catId, setCatId] = useState("");
  const [subId, setSubId] = useState("");
  const [subsubId, setSubsubId] = useState("");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);
  const [offer, setOffer] = useState({ open: false, id: null, value: "" });
  const [confirm, setConfirm] = useState({ open: false, id: null });

  const categoryOptions = useMemo(() => catData.map((c) => ({ id: c.id, name: c.name })), []);
  const subOptions = useMemo(() => {
    if (!catId) return [];
    const cat = catData.find((c) => c.id === Number(catId));
    return cat ? cat.subs : [];
  }, [catId]);
  const subsubOptions = useMemo(() => {
    if (!catId || !subId) return [];
    const cat = catData.find((c) => c.id === Number(catId));
    const sub = cat?.subs.find((s) => s.id === Number(subId));
    return sub ? sub.subs : [];
  }, [catId, subId]);

  const filtered = useMemo(() => {
    let data = rows;
    if (catId) data = data.filter((r) => r.catId === Number(catId));
    if (subId) data = data.filter((r) => r.subId === Number(subId));
    if (subsubId) data = data.filter((r) => r.subsubId === Number(subsubId));
    if (q.trim()) data = data.filter((r) => r.name.toLowerCase().includes(q.toLowerCase()));
    return data;
  }, [rows, catId, subId, subsubId, q]);

  const total = filtered.length;
  const start = page * rowsPerPage;
  const end = Math.min(start + rowsPerPage, total);
  const pageRows = filtered.slice(start, end);

  function resetPage() {
    setPage(0);
  }

  function openOfferModal(p) {
    setOffer({ open: true, id: p.id, value: p.offerPercent ? String(p.offerPercent) : "" });
  }
  function saveOffer() {
    const v = Math.max(0, Math.min(90, Number(offer.value) || 0));
    setRows((prev) => prev.map((r) => (r.id === offer.id ? { ...r, offerPercent: v } : r)));
    setOffer({ open: false, id: null, value: "" });
  }
  function handleDelete(id) {
    setRows((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Products</h1>
        <Link to="/admin/products/upload" className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 text-sm">ADD PRODUCT</Link>
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="p-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          <div>
            <label className="block text-xs text-gray-600 mb-1">Category By</label>
            <select
              value={catId}
              onChange={(e) => { setCatId(e.target.value); setSubId(""); setSubsubId(""); resetPage(); }}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
            >
              <option value="">All</option>
              {categoryOptions.map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Sub Category By</label>
            <select
              value={subId}
              onChange={(e) => { setSubId(e.target.value); setSubsubId(""); resetPage(); }}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
              disabled={!catId}
            >
              <option value="">All</option>
              {subOptions.map((s) => (<option key={s.id} value={s.id}>{s.name}</option>))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Third Level Sub Category By</label>
            <select
              value={subsubId}
              onChange={(e) => { setSubsubId(e.target.value); resetPage(); }}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white"
              disabled={!subId}
            >
              <option value="">All</option>
              {subsubOptions.map((ss) => (<option key={ss.id} value={ss.id}>{ss.name}</option>))}
            </select>
          </div>
          <div>
            <label className="block text-xs text-gray-600 mb-1">Search here...</label>
            <input value={q} onChange={(e) => { setQ(e.target.value); resetPage(); }} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm" placeholder="Search here..." />
          </div>
        </div>

        <div className="border-t border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-gray-700">
                  <th className="text-left font-medium px-4 py-2">PRODUCT</th>
                  <th className="text-left font-medium px-4 py-2">CATEGORY</th>
                  <th className="text-left font-medium px-4 py-2">SUB CATEGORY</th>
                  <th className="text-left font-medium px-4 py-2">PRICE</th>
                  <th className="text-left font-medium px-4 py-2">SALES</th>
                  <th className="text-left font-medium px-4 py-2">STOCK</th>
                  <th className="text-left font-medium px-4 py-2">Offer %</th>
                  <th className="text-left font-medium px-4 py-2">Offers</th>
                  <th className="text-left font-medium px-4 py-2">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {pageRows.map((p) => {
                  const cat = catData.find((c) => c.id === p.catId);
                  const sub = cat?.subs.find((s) => s.id === p.subId);
                  const ss = sub?.subs.find((x) => x.id === p.subsubId);
                  return (
                    <tr key={p.id} className="align-top">
                      <td className="px-4 py-3 text-gray-900 font-medium">{p.name}</td>
                      <td className="px-4 py-3 text-gray-700">{cat?.name || "-"}</td>
                      <td className="px-4 py-3 text-gray-700">{sub?.name || "-"}</td>
                      <td className="px-4 py-3">
                        <div className="text-gray-500 line-through">{formatINR(p.price)}</div>
                        <div className="text-blue-600">{formatINR(p.salePrice)}</div>
                      </td>
                      <td className="px-4 py-3 text-gray-700">{p.sales} sale</td>
                      <td className="px-4 py-3 text-blue-600">{p.stock}</td>
                      <td className="px-4 py-3 text-blue-600">{p.offerPercent ? `${p.offerPercent}%` : "-"}</td>
                      <td className="px-4 py-3">
                        <button className="inline-flex items-center whitespace-nowrap px-2.5 py-1 rounded text-white bg-blue-600 hover:bg-blue-700 text-xs" onClick={() => openOfferModal(p)}>ADD OFFER</button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3 text-gray-600">
                          <button title="Edit" onClick={() => navigate(`/admin/products/upload?edit=${p.id}`)}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536M4 20h4l10.293-10.293a1 1 0 000-1.414l-2.586-2.586a1 1 0 00-1.414 0L4 16v4z" /></svg>
                          </button>
                          <button title="View" onClick={() => navigate(`/admin/products/${p.id}`)}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                          </button>
                          <button title="Delete" onClick={() => setConfirm({ open: true, id: p.id })}>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6M9 7h6m-7 0a2 2 0 012-2h4a2 2 0 012 2m-8 0H5m11 0h3" /></svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {pageRows.length === 0 && (
                  <tr>
                    <td className="px-4 py-6 text-gray-500" colSpan={9}>No products</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-end gap-6 px-4 py-2 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <span>Rows per page:</span>
              <select
                value={rowsPerPage}
                onChange={(e) => { setRowsPerPage(Number(e.target.value)); resetPage(); }}
                className="border border-gray-300 rounded px-2 py-1 bg-white"
              >
                {[10, 25, 50, 100].map((n) => (<option key={n} value={n}>{n}</option>))}
              </select>
            </div>
            <div>{total === 0 ? "0-0 of 0" : `${start + 1}-${end} of ${total}`}</div>
            <div className="flex items-center gap-1">
              <button
                className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
                disabled={page === 0}
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                aria-label="Prev page"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button
                className="p-1 rounded hover:bg-gray-100 disabled:opacity-50"
                disabled={end >= total}
                onClick={() => setPage((p) => (end >= total ? p : p + 1))}
                aria-label="Next page"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {offer.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOffer({ open: false, id: null, value: "" })} />
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-sm p-5 z-10">
            <div className="text-base font-semibold text-gray-900">Set Offer %</div>
            <div className="mt-4 space-y-3">
              <input
                type="number"
                value={offer.value}
                onChange={(e) => setOffer((o) => ({ ...o, value: e.target.value }))}
                className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
                min={0}
                max={90}
                placeholder="Enter percentage"
              />
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" className="px-3 py-1.5 rounded border border-gray-300 text-gray-700 bg-white hover:bg-gray-50" onClick={() => setOffer({ open: false, id: null, value: "" })}>Cancel</button>
                <button type="button" className="px-3 py-1.5 rounded text-white bg-blue-600 hover:bg-blue-700" onClick={saveOffer}>Save</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {confirm.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setConfirm({ open: false, id: null })} />
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-sm p-5 z-10">
            <div className="text-base font-semibold text-gray-900">Delete Product</div>
            <div className="mt-2 text-sm text-gray-600">Are you sure you want to delete this product? This action cannot be undone.</div>
            <div className="mt-4 flex justify-end gap-2">
              <button className="px-3 py-1.5 rounded border border-gray-300 text-gray-700 bg-white hover:bg-gray-50" onClick={() => setConfirm({ open: false, id: null })}>Cancel</button>
              <button className="px-3 py-1.5 rounded text-white bg-red-600 hover:bg-red-700" onClick={() => { handleDelete(confirm.id); setConfirm({ open: false, id: null }); }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
