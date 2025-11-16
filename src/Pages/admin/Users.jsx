import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";

const RUPEE = "\u20B9";

const initialData = [
  { id: 1, name: "Olivia Rhye", email: "olivia@example.com", orders: 12, totalSpent: 5250, status: "Active", avatar: "https://i.pravatar.cc/40?img=5" },
  { id: 2, name: "Lana Byrd", email: "lana.byrd@example.com", orders: 5, totalSpent: 5250, status: "Active", avatar: "https://i.pravatar.cc/40?img=15" },
  { id: 3, name: "Phoenix Baker", email: "phoenix@example.com", orders: 21, totalSpent: 5250, status: "Blocked", avatar: "https://i.pravatar.cc/40?img=11" },
  { id: 4, name: "James Gunn", email: "james.gunn@example.com", orders: 2, totalSpent: 5250, status: "Active", avatar: "https://i.pravatar.cc/40?img=18" },
];

function formatINR(n) {
  try {
    return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", minimumFractionDigits: 2 }).format(n);
  } catch {
    return `${RUPEE}${n.toFixed(2)}`;
  }
}

function StatusPill({ value }) {
  const isActive = value === "Active";
  const cls = isActive
    ? "text-green-700 bg-green-100"
    : "text-red-700 bg-red-100";
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cls}`}>
      {value}
    </span>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow p-4">
      <div className="flex items-center justify-between">
        <div className="text-sm font-medium text-gray-700">{title}</div>
        <div className="text-gray-500">{icon}</div>
      </div>
      <div className="mt-3 text-2xl font-semibold text-gray-900">{value}</div>
    </div>
  );
}

export default function Users() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState(initialData);
  const [confirm, setConfirm] = useState({ open: false, userId: null, newStatus: null });

  const stats = useMemo(() => {
    const total = users.length;
    const active = users.filter((u) => u.status === "Active").length;
    const blocked = users.filter((u) => u.status !== "Active").length;
    const thisMonth = 1204;
    return { total, active, blocked, thisMonth };
  }, [users]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter((u) =>
      u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q)
    );
  }, [query, users]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Users List</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Customers"
          value={stats.total}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a4 4 0 00-4-4h-1M7 20H2v-2a4 4 0 014-4h1m8-4a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          }
        />
        <StatCard
          title="This Month"
          value={stats.thisMonth.toLocaleString("en-IN")}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3M3 11h18M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5A2 2 0 003 7v10a2 2 0 002 2z" />
            </svg>
          }
        />
        <StatCard
          title="Active Customers"
          value={stats.active}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A7 7 0 1118.88 6.195M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          }
        />
        <StatCard
          title="Blocked Customers"
          value={stats.blocked}
          icon={
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636a9 9 0 11-12.728 12.728 9 9 0 0112.728-12.728zM6.343 6.343l11.314 11.314" />
            </svg>
          }
        />
      </div>

      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="font-semibold text-gray-800">All Customers</h3>
        </div>
        <div className="p-4 space-y-4">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
              </svg>
            </span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full border border-gray-300 rounded-md pl-9 pr-3 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search by name or email"
            />
          </div>

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
                {filtered.map((u) => (
                  <tr key={u.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={u.avatar}
                          alt={u.name}
                          className="w-8 h-8 rounded-full object-cover"
                          onError={(e) => { e.currentTarget.style.display = 'none'; }}
                        />
                        <span className="text-gray-900">{u.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{u.email}</td>
                    <td className="px-4 py-3 text-gray-600">{u.orders}</td>
                    <td className="px-4 py-3 text-gray-900">{formatINR(u.totalSpent)}</td>
                    <td className="px-4 py-3"><StatusPill value={u.status} /></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3 text-gray-600">
                        <Link to={`/admin/users/${u.id}`} className="hover:text-gray-900" title="View">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7-10-7-10-7z" />
                            <circle cx="12" cy="12" r="3" strokeWidth="2" />
                          </svg>
                        </Link>
                        <button
                          className="hover:text-gray-900"
                          title={u.status === 'Active' ? 'Block' : 'Unblock'}
                          onClick={() => setConfirm({ open: true, userId: u.id, newStatus: u.status === 'Active' ? 'Blocked' : 'Active' })}
                        >
                          {u.status === 'Active' ? (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <circle cx="12" cy="12" r="9" strokeWidth="2" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12l2.5 2.5L16 9" />
                            </svg>
                          ) : (
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <circle cx="12" cy="12" r="9" strokeWidth="2" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6.343 6.343L17.657 17.657" />
                            </svg>
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between text-xs text-gray-600">
            <div>Showing {filtered.length > 0 ? `1-${filtered.length}` : '0'} of 1000</div>
            <div className="flex items-center gap-1">
              <button className="px-2.5 py-1 rounded border border-gray-300 text-gray-700 bg-white hover:bg-gray-50">Previous</button>
              <button className="px-2.5 py-1 rounded border border-gray-300 text-gray-700 bg-white hover:bg-gray-50">1</button>
              <button className="px-2.5 py-1 rounded border border-gray-300 text-gray-700 bg-white hover:bg-gray-50">2</button>
              <button className="px-2.5 py-1 rounded border border-gray-300 text-white bg-blue-500">3</button>
              <button className="px-2.5 py-1 rounded border border-gray-300 text-gray-700 bg-white hover:bg-gray-50">Next</button>
            </div>
          </div>
        </div>
      </div>
      {confirm.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setConfirm({ open: false, userId: null, newStatus: null })} />
          <div className="relative bg-white rounded-lg shadow-lg w-full max-w-sm p-5 z-10">
            <div className="text-base font-semibold text-gray-900">{confirm.newStatus === 'Blocked' ? 'Block Customer' : 'Unblock Customer'}</div>
            <div className="mt-2 text-sm text-gray-600">Are you sure you want to {confirm.newStatus === 'Blocked' ? 'block' : 'unblock'} this customer?</div>
            <div className="mt-4 flex justify-end gap-2">
              <button
                className="px-3 py-1.5 rounded border border-gray-300 text-gray-700 bg-white hover:bg-gray-50"
                onClick={() => setConfirm({ open: false, userId: null, newStatus: null })}
              >
                Cancel
              </button>
              <button
                className={`inline-flex items-center gap-2 px-3 py-1.5 rounded text-white ${confirm.newStatus === 'Blocked' ? 'bg-red-600 hover:bg-red-700' : 'bg-emerald-600 hover:bg-emerald-700'}`}
                onClick={() => {
                  setUsers((prev) => prev.map((x) => x.id === confirm.userId ? { ...x, status: confirm.newStatus } : x));
                  setConfirm({ open: false, userId: null, newStatus: null });
                }}
              >
                {confirm.newStatus === 'Blocked' ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9" strokeWidth="2" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6.343 6.343L17.657 17.657" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9" strokeWidth="2" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12l2.5 2.5L16 9" />
                  </svg>
                )}
                {confirm.newStatus === 'Blocked' ? 'Block' : 'Unblock'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
