import React, { useMemo, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Edit as EditIcon,
  Visibility as VisibilityIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { useGetProductsQuery } from "../../store/Api/admin/product";
import { useGetCategoriesByLevelQuery } from "../../store/Api/admin/category";

function formatINR(n) {
  return `₹${Number(n).toFixed(2)}`;
}

export default function ProductList() {
  const navigate = useNavigate();

  const [catId, setCatId] = useState("");
  const [subId, setSubId] = useState("");
  const [subsubId, setSubsubId] = useState("");
  const [q, setQ] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [offer, setOffer] = useState({ open: false, id: null, value: "" });
  const [confirm, setConfirm] = useState({ open: false, id: null });

  // Fetch categories for filters
  const { data: rootData } = useGetCategoriesByLevelQuery({ level: "first", perPage: 1000 });
  const { data: subData } = useGetCategoriesByLevelQuery({ level: "second", perPage: 1000 });
  const { data: thirdData } = useGetCategoriesByLevelQuery({ level: "third", perPage: 1000 });

  const categoryOptions = rootData?.categories || [];

  const subOptions = useMemo(() => {
    if (!catId || !subData?.categories) return [];
    return subData.categories.filter((s) => s.parentId === catId);
  }, [catId, subData]);

  const subsubOptions = useMemo(() => {
    if (!subId || !thirdData?.categories) return [];
    return thirdData.categories.filter((ss) => ss.parentId === subId);
  }, [subId, thirdData]);

  // Fetch products from API
  const queryParams = {
    page: page + 1, // API uses 1-based indexing
    perPage: rowsPerPage,
    search: q,
    category: catId,
    subCategory: subId,
    thirdCategory: subsubId,
    admin: true,
  };

  const { data: productData, isLoading, refetch } = useGetProductsQuery(queryParams);
  const products = productData?.products || [];
  const total = productData?.totalPosts || 0;

  // Calculate start and end for display
  const start = page * rowsPerPage;
  const end = Math.min(start + rowsPerPage, total);

  function resetPage() {
    setPage(0);
  }

  function openOfferModal(p) {
    setOffer({ open: true, id: p.id, value: p.offerPercent ? String(p.offerPercent) : "" });
  }
  function saveOffer() {
    // In a real app, you would call an API mutation here
    // For now, we'll just close the modal as the backend dummy data is read-only for this specific field in this context
    // or we would need to add an update mutation
    setOffer({ open: false, id: null, value: "" });
  }

  function handleDelete(id) {
    // In a real app, call delete mutation
    setConfirm({ open: false, id: null });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Products</h1>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                resetPage();
              }}
              className="border border-gray-300 rounded-md pl-3 pr-8 py-2 text-sm w-64 focus:outline-none focus:ring-1 focus:ring-blue-500"
              placeholder="Search products..."
            />
            <svg
              className="w-4 h-4 text-gray-400 absolute right-2.5 top-2.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <Link
            to="/admin/products/upload"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 text-sm font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            ADD PRODUCT
          </Link>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="p-3 grid grid-cols-1 sm:grid-cols-3 gap-3 border-b border-gray-200 bg-gray-50/50">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Category</label>
            <select
              value={catId}
              onChange={(e) => {
                setCatId(e.target.value);
                setSubId("");
                setSubsubId("");
                resetPage();
              }}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              {categoryOptions.map((c) => (
                <option key={c._id || c.id} value={c._id || c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Sub Category</label>
            <select
              value={subId}
              onChange={(e) => {
                setSubId(e.target.value);
                setSubsubId("");
                resetPage();
              }}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              disabled={!catId}
            >
              <option value="">All Sub Categories</option>
              {subOptions.map((s) => (
                <option key={s._id || s.id} value={s._id || s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Third Level Category
            </label>
            <select
              value={subsubId}
              onChange={(e) => {
                setSubsubId(e.target.value);
                resetPage();
              }}
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              disabled={!subId}
            >
              <option value="">All Third Level</option>
              {subsubOptions.map((ss) => (
                <option key={ss._id || ss.id} value={ss._id || ss.id}>
                  {ss.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-gray-700 border-b border-gray-200">
                  <th className="text-left font-semibold px-4 py-3">PRODUCT</th>
                  <th className="text-left font-semibold px-4 py-3">CATEGORY</th>
                  <th className="text-left font-semibold px-4 py-3">SUB CATEGORY</th>
                  <th className="text-left font-semibold px-4 py-3">THIRD LEVEL</th>
                  <th className="text-left font-semibold px-4 py-3">PRICE</th>
                  <th className="text-left font-semibold px-4 py-3">SALES</th>
                  <th className="text-left font-semibold px-4 py-3">STOCK</th>
                  <th className="text-left font-semibold px-4 py-3">OFFER %</th>
                  <th className="text-left font-semibold px-4 py-3">OFFERS</th>
                  <th className="text-left font-semibold px-4 py-3">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {isLoading ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-8 text-center text-gray-500">
                      Loading products...
                    </td>
                  </tr>
                ) : products.length > 0 ? (
                  products.map((p) => (
                    <tr key={p.id} className="align-top hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-gray-900 font-medium">{p.name}</td>
                      <td className="px-4 py-3 text-gray-600">
                        {p.categoryId?.name || p.category?.name || "-"}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {p.subCategoryId?.name || p.subCategory?.name || "-"}
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {p.thirdSubCategoryId?.name || p.thirdCategory?.name || "-"}
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-gray-400 line-through text-xs">
                          {formatINR(p.price)}
                        </div>
                        <div className="text-gray-900 font-medium">{formatINR(p.salePrice)}</div>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{p.sales}</td>
                      <td className="px-4 py-3 text-green-600 font-medium">{p.stock}</td>
                      <td className="px-4 py-3 text-blue-600 font-medium">
                        {p.offerPercent ? `${p.offerPercent}%` : "-"}
                      </td>
                      <td className="px-4 py-3">
                        <button
                          className="inline-flex items-center whitespace-nowrap px-2.5 py-1 rounded text-blue-600 bg-blue-50 hover:bg-blue-100 border border-blue-200 text-xs font-medium transition-colors"
                          onClick={() => openOfferModal(p)}
                        >
                          ADD/EDIT OFFER
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2 text-gray-500">
                          <button
                            title="Edit"
                            className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                            onClick={() => navigate(`/admin/products/upload?edit=${p.id}`)}
                          >
                            <EditIcon fontSize="small" />
                          </button>
                          <button
                            title="View"
                            className="p-1 text-teal-600 hover:bg-teal-50 rounded transition-colors"
                            onClick={() => navigate(`/admin/products/${p.id}`)}
                          >
                            <VisibilityIcon fontSize="small" />
                          </button>
                          <button
                            title="Delete"
                            className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                            onClick={() => setConfirm({ open: true, id: p.id })}
                          >
                            <DeleteIcon fontSize="small" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="px-4 py-12 text-center">
                      <div className="flex flex-col items-center justify-center text-gray-500">
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
                              d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                            />
                          </svg>
                        </div>
                        <p className="text-lg font-medium text-gray-900">No products found</p>
                        <p className="text-sm">
                          Try adjusting your search or filter to find what you're looking for.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="flex items-center justify-end gap-6 px-4 py-3 border-t border-gray-200 bg-gray-50 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <span className="text-gray-600">Rows per page:</span>
              <select
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  resetPage();
                }}
                className="border border-gray-300 rounded px-2 py-1 bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {[10, 20, 30, 40, 50].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-gray-600">
              {total === 0 ? "0-0 of 0" : `${start + 1}-${end} of ${total}`}
            </div>
            <div className="flex items-center gap-1">
              <button
                className="p-1.5 rounded hover:bg-gray-200 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
                disabled={page === 0}
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                aria-label="Prev page"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                className="p-1.5 rounded hover:bg-gray-200 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
                disabled={end >= total}
                onClick={() => setPage((p) => (end >= total ? p : p + 1))}
                aria-label="Next page"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {offer.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setOffer({ open: false, id: null, value: "" })}
          />
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-sm p-6 z-10 transform transition-all">
            <div className="text-lg font-semibold text-gray-900 mb-4">Set Offer Percentage</div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Offer %</label>
                <input
                  type="number"
                  value={offer.value}
                  onChange={(e) => setOffer((o) => ({ ...o, value: e.target.value }))}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  min={0}
                  max={90}
                  placeholder="Enter percentage (0-90)"
                  autoFocus
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 font-medium text-sm transition-colors"
                  onClick={() => setOffer({ open: false, id: null, value: "" })}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 font-medium text-sm shadow-sm transition-colors"
                  onClick={saveOffer}
                >
                  Save Offer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {confirm.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setConfirm({ open: false, id: null })}
          />
          <div className="relative bg-white rounded-lg shadow-xl w-full max-w-sm p-6 z-10 transform transition-all">
            <div className="flex items-center gap-3 mb-4 text-red-600">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <div className="text-lg font-semibold text-gray-900">Delete Product</div>
            </div>
            <div className="text-sm text-gray-600 mb-6">
              Are you sure you want to delete this product? This action cannot be undone and will
              remove the product from the store.
            </div>
            <div className="flex justify-end gap-3">
              <button
                className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 font-medium text-sm transition-colors"
                onClick={() => setConfirm({ open: false, id: null })}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 rounded-md text-white bg-red-600 hover:bg-red-700 font-medium text-sm shadow-sm transition-colors"
                onClick={() => {
                  handleDelete(confirm.id);
                  setConfirm({ open: false, id: null });
                }}
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
