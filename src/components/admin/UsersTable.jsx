import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetUsersQuery, useBlockUserMutation } from "../../store/Api/admin/users";
import { Visibility, Search, Block, LockOpen } from "@mui/icons-material";

const RUPEE = "\u20B9";

function formatINR(n) {
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(n);
  } catch {
    return `${RUPEE}${n.toFixed(2)}`;
  }
}

function StatusPill({ value }) {
  const isActive = value === "Active";
  const cls = isActive ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100";
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cls}`}
    >
      {value}
    </span>
  );
}

function UsersTable() {
  const [searchInput, setSearchInput] = useState("");
  const [params, setParams] = useState({
    page: 1,
    perPage: 10,
    search: "",
    sortBy: "latest",
    filter: "all",
  });
  const [confirm, setConfirm] = useState({ open: false, userId: null, newStatus: null });

  const { data, isLoading, error } = useGetUsersQuery(params);
  const [blockUser] = useBlockUserMutation();

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      setParams((prev) => ({ ...prev, search: searchInput, page: 1 }));
    }, 500);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const users = React.useMemo(() => {
    if (!data?.users) return [];
    return data.users.map((user) => ({
      id: user._id,
      name: user.name,
      email: user.email,
      orders: user.orders || 0,
      totalSpent: user.totalSpent || 0,
      status: user.isBlocked ? "Blocked" : "Active",
      avatar: user.image || `https://i.pravatar.cc/40?img=${Math.floor(Math.random() * 70)}`,
    }));
  }, [data]);

  const handleClearSearch = () => {
    setSearchInput("");
    setParams((prev) => ({ ...prev, search: "", page: 1 }));
  };

  const handlePageChange = (newPage) => {
    setParams((prev) => ({ ...prev, page: newPage }));
  };

  const handleBlockUnblock = async () => {
    try {
      await blockUser(confirm.userId).unwrap();
      setConfirm({ open: false, userId: null, newStatus: null });
    } catch (error) {
      console.error("Failed to block/unblock user:", error);
    }
  };

  const totalPages = Math.ceil((data?.totalPosts || 0) / params.perPage);
  const currentPage = parseInt(data?.page) || 1;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-gray-600">Loading users...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-red-600">Error loading users. Please try again.</div>
      </div>
    );
  }

  return (
    <>
      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="font-semibold text-gray-800">All Customers</h3>
        </div>
        <div className="p-4 space-y-4">
          {/* Search, Filter and Sort */}
          <div className="flex items-center justify-between gap-4">
            {/* Search - Left Side */}
            <div className="flex gap-2 w-1/2">
              <div className="relative flex-1">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <Search className="w-4 h-4" />
                </span>
                <input
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full border border-gray-300 rounded-md pl-9 pr-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search by name or email"
                />
              </div>
              {searchInput && (
                <button
                  onClick={handleClearSearch}
                  className="px-3 py-2 bg-gray-200 text-gray-700 rounded-md text-sm font-medium hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Filter and Sort - Right Side */}
            <div className="flex items-center gap-4">
              {/* Filter Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Filter:</span>
                <select
                  value={params.filter || "all"}
                  onChange={(e) =>
                    setParams((prev) => ({ ...prev, filter: e.target.value, page: 1 }))
                  }
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All</option>
                  <option value="active">Active</option>
                  <option value="blocked">Blocked</option>
                </select>
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">Sort by:</span>
                <select
                  value={params.sortBy || "latest"}
                  onChange={(e) =>
                    setParams((prev) => ({ ...prev, sortBy: e.target.value, page: 1 }))
                  }
                  className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="latest">Latest</option>
                  <option value="oldest">Oldest</option>
                  <option value="ordersHigh">Orders (High to Low)</option>
                  <option value="ordersLow">Orders (Low to High)</option>
                  <option value="spentHigh">Total Spent (High to Low)</option>
                  <option value="spentLow">Total Spent (Low to High)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-gray-700">
                  <th className="text-left font-medium px-4 py-2">Customer Name</th>
                  <th className="text-left font-medium px-4 py-2">Email</th>
                  <th className="text-left font-medium px-4 py-2">Orders</th>
                  <th className="text-left font-medium px-4 py-2">Total Spent</th>
                  <th className="text-left font-medium px-4 py-2">Status</th>
                  <th className="text-left font-medium px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={u.avatar}
                          alt={u.name}
                          className="w-8 h-8 rounded-full object-cover"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                        <span className="text-gray-900">{u.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{u.email}</td>
                    <td className="px-4 py-3 text-gray-600">{u.orders}</td>
                    <td className="px-4 py-3 text-gray-900">{formatINR(u.totalSpent)}</td>
                    <td className="px-4 py-3">
                      <StatusPill value={u.status} />
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3 text-gray-600">
                        <Link
                          to={`/admin/users/${u.id}`}
                          className="p-1 text-teal-600 hover:bg-teal-50 rounded transition-colors"
                          title="View"
                        >
                          <Visibility className="w-5 h-5" />
                        </Link>
                        <button
                          className={`p-1 rounded transition-colors ${
                            u.status === "Active"
                              ? "text-red-600 hover:bg-red-50"
                              : "text-green-600 hover:bg-green-50"
                          }`}
                          title={u.status === "Active" ? "Block" : "Unblock"}
                          onClick={() =>
                            setConfirm({
                              open: true,
                              userId: u.id,
                              newStatus: u.status === "Active" ? "Blocked" : "Active",
                            })
                          }
                        >
                          {u.status === "Active" ? (
                            <Block className="w-5 h-5" />
                          ) : (
                            <LockOpen className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between text-xs text-gray-600">
            <div>
              Showing{" "}
              {users.length > 0
                ? `${(currentPage - 1) * params.perPage + 1}-${
                    (currentPage - 1) * params.perPage + users.length
                  }`
                : "0"}{" "}
              of {data?.totalPosts || 0}
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
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
                    onClick={() => handlePageChange(pageNum)}
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
                onClick={() => handlePageChange(currentPage + 1)}
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
        </div>
      </div>

      {/* Block/Unblock Confirmation Modal */}
      {confirm.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setConfirm({ open: false, userId: null, newStatus: null })}
          />
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-sm p-5 z-10">
            <div className="text-base font-semibold text-gray-900">
              {confirm.newStatus === "Blocked" ? "Block Customer" : "Unblock Customer"}
            </div>
            <div className="mt-2 text-sm text-gray-600">
              Are you sure you want to {confirm.newStatus === "Blocked" ? "block" : "unblock"} this
              customer?
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="px-3 py-1.5 rounded border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                onClick={() => setConfirm({ open: false, userId: null, newStatus: null })}
              >
                Cancel
              </button>
              <button
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded text-white ${
                  confirm.newStatus === "Blocked"
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-emerald-600 hover:bg-emerald-700"
                }`}
                onClick={handleBlockUnblock}
              >
                {confirm.newStatus === "Blocked" ? (
                  <Block className="w-4 h-4" />
                ) : (
                  <LockOpen className="w-4 h-4" />
                )}
                {confirm.newStatus === "Blocked" ? "Block" : "Unblock"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default UsersTable;
