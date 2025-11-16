import React, { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";

const menus = [
  {
    type: "link",
    label: "Dashboard",
    to: "/admin/dashboard",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" />
      </svg>
    ),
  },
  {
    type: "dropdown",
    key: "homeSlides",
    label: "Home Slides",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5h16M4 12h16M4 19h16" />
      </svg>
    ),
    children: [
      { label: "All Slides", to: "/admin/home-slides" },
      { label: "Add Slide", to: "/admin/home-slides/new" },
    ],
  },
  {
    type: "dropdown",
    key: "category",
    label: "Category",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h10v10H7z" />
      </svg>
    ),
    children: [
      { label: "Category List", to: "/admin/categories", end: true },
      { label: "Add A Category", to: "/admin/categories/new" },
      { label: "Sub Category List", to: "/admin/subcategories", end: true },
      { label: "Add A Sub Category", to: "/admin/subcategories/new" },
    ],
  },
  {
    type: "dropdown",
    key: "products",
    label: "Products",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V7a2 2 0 00-2-2h-3l-1-2H10L9 5H6a2 2 0 00-2 2v6" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 13h22M5 21h14a2 2 0 002-2v-6H3v6a2 2 0 002 2z" />
      </svg>
    ),
    children: [
      { label: "Product List", to: "/admin/products", end: true },
      { label: "Add Product", to: "/admin/products/upload" },
      { label: "Add Product SIZE", to: "/admin/product-sizes/new" },
    ],
  },
  {
    type: "link",
    label: "Users",
    to: "/admin/users",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a4 4 0 00-4-4h-1M7 20H2v-2a4 4 0 014-4h1m8-4a4 4 0 11-8 0 4 4 0 018 0z" />
      </svg>
    ),
  },
  {
    type: "link",
    label: "Orders",
    to: "/admin/orders",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18M3 12h18M3 17h18" />
      </svg>
    ),
  },
  {
    type: "dropdown",
    key: "banners",
    label: "Banners",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5h14v14l-7-3-7 3z" />
      </svg>
    ),
    children: [
      { label: "All Banners", to: "/admin/banners" },
      { label: "Add Banner", to: "/admin/banners/new" },
    ],
  },
  {
    type: "link",
    label: "Coupon",
    to: "/admin/coupons",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13a4 4 0 118 0 4 4 0 11-8 0z" />
      </svg>
    ),
  },
  {
    type: "link",
    label: "Payment",
    to: "/admin/payment",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8h18v8H3z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12h18" />
      </svg>
    ),
  },
  {
    type: "link",
    label: "Referrals",
    to: "/admin/referrals",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 13a5 5 0 017.07 0l1.414 1.414a3 3 0 11-4.243 4.243l-1.06-1.06M14 11a5 5 0 00-7.07 0L5.515 12.414a3 3 0 104.243 4.243l1.06-1.06" />
      </svg>
    ),
  },
  {
    type: "link",
    label: "Logout",
    to: "/admin/login",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7M13 20H6a2 2 0 01-2-2V6a2 2 0 012-2h7" />
      </svg>
    ),
  },
];

export default function AdminSidebar({ open, onClose }) {
  const location = useLocation();
  const [openMap, setOpenMap] = useState({ homeSlides: false, category: false, products: false, banners: false });

  function toggle(key) {
    setOpenMap((prev) => ({ ...prev, [key]: !prev[key] }));
  }
  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-black/30 z-30 md:hidden ${open ? "block" : "hidden"}`}
        onClick={onClose}
      />
      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-40 md:z-0 h-full md:min-h-screen w-64 md:w-56 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-out ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >
        <div className="h-14 flex items-center px-4 border-b border-gray-200">
          <span className="ml-1 font-semibold">ZAYN</span>
        </div>
        <nav className="p-3 space-y-1 text-sm">
          {menus.map((m) => {
            if (m.type === "link") {
              return (
                <NavLink
                  key={m.label}
                  to={m.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 ${isActive ? "text-blue-700 bg-blue-50" : "text-gray-700"}`
                  }
                  onClick={onClose}
                >
                  <span className="text-gray-600">{m.icon}</span>
                  <span>{m.label}</span>
                </NavLink>
              );
            }
            return (
              <div key={m.label}>
                <button
                  type="button"
                  className="w-full flex items-center justify-between px-3 py-2 rounded-md hover:bg-gray-100 text-gray-700"
                  onClick={() => toggle(m.key)}
                >
                  <span className="flex items-center gap-3">
                    <span className="text-gray-600">{m.icon}</span>
                    <span>{m.label}</span>
                  </span>
                  <svg className={`w-4 h-4 text-gray-500 transition-transform ${openMap[m.key] ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {openMap[m.key] && (
                  <div className="mt-1 pl-9 space-y-1">
                    {m.children.map((c) => (
                      <NavLink
                        key={c.to}
                        to={c.to}
                        end={!!c.end}
                        className={({ isActive }) =>
                          `flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 ${isActive ? "text-blue-700 bg-blue-50" : "text-gray-700"}`
                        }
                        onClick={onClose}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                        <span>{c.label}</span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
