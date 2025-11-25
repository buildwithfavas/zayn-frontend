import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useGetUsersQuery, useBlockUserMutation } from "../../store/Api/admin/users";

const RUPEE = "\u20B9";

function formatINR(n) {
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(n);
  } catch {
    return `${RUPEE}${Number(n || 0).toFixed(2)}`;
  }
}

export default function UserDetails() {
  const { id } = useParams();
  const [confirmOpen, setConfirmOpen] = useState(false);

  // Fetch all users and find the specific user by ID
  const { data, isLoading, error } = useGetUsersQuery({ page: 1, perPage: 100 });
  const [blockUser, { isLoading: blockLoading }] = useBlockUserMutation();

  const user = useMemo(() => {
    if (!data?.users) return null;
    const found = data.users.find((u) => u._id === id);
    if (!found) return null;

    // Generate consistent dummy orders based on user ID
    const seed = parseInt(found._id.slice(-6), 16);
    const orderCount = (seed % 12) + 1;
    const orders = Array.from({ length: orderCount }, (_, i) => {
      const orderSeed = seed + i * 100;
      const amount = (orderSeed % 5000) + 1000;
      const daysAgo = (orderSeed % 150) + 1;
      const date = new Date();
      date.setDate(date.getDate() - daysAgo);

      return {
        id: `#ORD-${2500 - i * 50}`,
        date: date.toISOString().split("T")[0],
        amount: amount,
        status: i === 5 ? "Cancelled" : i % 8 === 0 ? "Pending" : "Delivered",
      };
    });

    return {
      id: found._id,
      name: found.name,
      email: found.email,
      phone: found.mobile ? `+91 ${found.mobile}` : "—",
      address: "—", // Not available in backend yet
      status: found.isBlocked ? "Blocked" : "Active",
      isBlocked: found.isBlocked,
      orders: orders,
    };
  }, [data, id]);

  const handleBlockUnblock = async () => {
    try {
      await blockUser(id).unwrap();
      setConfirmOpen(false);
    } catch (error) {
      console.error("Failed to block/unblock user:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-gray-600">Loading user details...</div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-red-600">Error loading user details. Please try again.</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Customer Details</h2>
          <div className="flex items-center gap-3">
            <Link
              to="/admin/users"
              className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
            >
              Back
            </Link>
            <button
              onClick={() => setConfirmOpen(true)}
              disabled={blockLoading}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-md ${
                user.isBlocked
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                  : "bg-red-600 hover:bg-red-700 text-white"
              } ${blockLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {user.isBlocked ? (
                  <g>
                    <circle cx="12" cy="12" r="9" strokeWidth="2" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 12l2.5 2.5L16 9"
                    />
                  </g>
                ) : (
                  <g>
                    <circle cx="12" cy="12" r="9" strokeWidth="2" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6.343 6.343L17.657 17.657"
                    />
                  </g>
                )}
              </svg>
              {blockLoading
                ? "Processing..."
                : user.isBlocked
                ? "Unblock Customer"
                : "Block Customer"}
            </button>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Personal Information */}
          <section>
            <div className="text-sm font-semibold text-gray-800 mb-4">Personal Information</div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <div className="text-xs text-gray-500">Full Name</div>
                <div className="mt-1 text-gray-900 font-medium">{user.name}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Email Address</div>
                <div className="mt-1 text-gray-900">{user.email}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Phone Number</div>
                <div className="mt-1 text-gray-900">{user.phone}</div>
              </div>
              <div>
                <div className="text-xs text-gray-500">Address</div>
                <div className="mt-1 text-gray-900">{user.address}</div>
              </div>
            </div>
          </section>

          {/* Order Information */}
          <section>
            <div className="text-sm font-semibold text-gray-800 mb-4">Order Information</div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-gray-50 text-gray-700">
                    <th className="text-left font-medium px-4 py-2">Order ID</th>
                    <th className="text-left font-medium px-4 py-2">Date</th>
                    <th className="text-left font-medium px-4 py-2">Amount</th>
                    <th className="text-left font-medium px-4 py-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {user.orders.length > 0 ? (
                    user.orders.map((o) => (
                      <tr key={o.id}>
                        <td className="px-4 py-3 text-gray-900 font-medium">{o.id}</td>
                        <td className="px-4 py-3 text-gray-600">{o.date}</td>
                        <td className="px-4 py-3 text-gray-900">{formatINR(o.amount)}</td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              o.status === "Delivered"
                                ? "text-green-700 bg-green-100"
                                : o.status === "Cancelled"
                                ? "text-red-700 bg-red-100"
                                : "text-yellow-800 bg-yellow-100"
                            }`}
                          >
                            {o.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="px-4 py-6 text-gray-500" colSpan={4}>
                        No orders
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setConfirmOpen(false)} />
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-sm p-5 z-10">
            <div className="text-base font-semibold text-gray-900">
              {user.isBlocked ? "Unblock Customer" : "Block Customer"}
            </div>
            <div className="mt-2 text-sm text-gray-600">
              Are you sure you want to {user.isBlocked ? "unblock" : "block"} this customer?
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="px-3 py-1.5 rounded border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                onClick={() => setConfirmOpen(false)}
                disabled={blockLoading}
              >
                Cancel
              </button>
              <button
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded text-white ${
                  user.isBlocked
                    ? "bg-emerald-600 hover:bg-emerald-700"
                    : "bg-red-600 hover:bg-red-700"
                } ${blockLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                onClick={handleBlockUnblock}
                disabled={blockLoading}
              >
                {user.isBlocked ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9" strokeWidth="2" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 12l2.5 2.5L16 9"
                    />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9" strokeWidth="2" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6.343 6.343L17.657 17.657"
                    />
                  </svg>
                )}
                {blockLoading ? "Processing..." : user.isBlocked ? "Unblock" : "Block"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
