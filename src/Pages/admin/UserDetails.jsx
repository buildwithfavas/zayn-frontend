import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

const RUPEE = "\u20B9";

const USERS = [
  {
    id: 1,
    name: "Olivia Rhye",
    email: "olivia@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, Anytown, USA 12345",
    status: "Active",
    orders: [
      { id: "#12543", date: "2023-10-26", amount: 5250, status: "Delivered" },
      { id: "#12542", date: "2023-09-15", amount: 5250, status: "Delivered" },
      { id: "#12541", date: "2023-08-01", amount: 5250, status: "Delivered" },
    ],
  },
  {
    id: 2,
    name: "Lana Byrd",
    email: "lana.byrd@example.com",
    phone: "+1 (555) 987-6543",
    address: "89 Sunset Blvd, Los Angeles, USA 90210",
    status: "Active",
    orders: [
      { id: "#12550", date: "2023-09-27", amount: 5250, status: "Delivered" },
      { id: "#12549", date: "2023-08-09", amount: 5250, status: "Pending" },
    ],
  },
  {
    id: 3,
    name: "Phoenix Baker",
    email: "phoenix@example.com",
    phone: "+1 (555) 222-3344",
    address: "77 Harbor Ave, San Diego, USA 92101",
    status: "Blocked",
    orders: [
      { id: "#12560", date: "2023-10-10", amount: 5250, status: "Delivered" },
      { id: "#12559", date: "2023-09-03", amount: 5250, status: "Pending" },
    ],
  },
  {
    id: 4,
    name: "James Gunn",
    email: "james.gunn@example.com",
    phone: "+1 (555) 111-7788",
    address: "12 Lake View, Austin, USA 73301",
    status: "Active",
    orders: [
      { id: "#12570", date: "2023-07-21", amount: 5250, status: "Delivered" },
    ],
  },
];

function formatINR(n) {
  try {
    return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 2 }).format(n);
  } catch {
    return `${RUPEE}${Number(n || 0).toFixed(2)}`;
  }
}

export default function UserDetails() {
  const { id } = useParams();
  const user = useMemo(() => {
    const found = USERS.find((u) => String(u.id) === String(id));
    return (
      found || {
        id,
        name: `Customer #${id}`,
        email: "placeholder@example.com",
        phone: "—",
        address: "—",
        status: "Active",
        orders: [],
      }
    );
  }, [id]);

  const [isBlocked, setIsBlocked] = useState(user.status !== "Active");
  const [confirmOpen, setConfirmOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Customer Details</h2>
          <div className="text-sm text-gray-500">
            Viewing details for <span className="text-gray-700 font-medium">{user.name}</span>
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
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${o.status === "Delivered" ? "text-green-700 bg-green-100" : "text-yellow-800 bg-yellow-100"}`}>
                            {o.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="px-4 py-6 text-gray-500" colSpan={4}>No orders</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
          <Link to="/admin/users" className="px-4 py-2 rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-50">Back</Link>
          <button
            onClick={() => setConfirmOpen(true)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-md ${isBlocked ? "bg-emerald-600 hover:bg-emerald-700 text-white" : "bg-red-600 hover:bg-red-700 text-white"}`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isBlocked ? (
                <g>
                  <circle cx="12" cy="12" r="9" strokeWidth="2" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12l2.5 2.5L16 9" />
                </g>
              ) : (
                <g>
                  <circle cx="12" cy="12" r="9" strokeWidth="2" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6.343 6.343L17.657 17.657" />
                </g>
              )}
            </svg>
            {isBlocked ? "Unblock Customer" : "Block Customer"}
          </button>
        </div>
      </div>
      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setConfirmOpen(false)} />
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-sm p-5 z-10">
            <div className="text-base font-semibold text-gray-900">{isBlocked ? "Unblock Customer" : "Block Customer"}</div>
            <div className="mt-2 text-sm text-gray-600">Are you sure you want to {isBlocked ? "unblock" : "block"} this customer?</div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="px-3 py-1.5 rounded border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                onClick={() => setConfirmOpen(false)}
              >
                Cancel
              </button>
              <button
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded text-white ${isBlocked ? "bg-emerald-600 hover:bg-emerald-700" : "bg-red-600 hover:bg-red-700"}`}
                onClick={() => {
                  setIsBlocked((v) => !v);
                  setConfirmOpen(false);
                }}
              >
                {isBlocked ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9" strokeWidth="2" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12l2.5 2.5L16 9" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9" strokeWidth="2" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6.343 6.343L17.657 17.657" />
                  </svg>
                )}
                {isBlocked ? "Unblock" : "Block"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
