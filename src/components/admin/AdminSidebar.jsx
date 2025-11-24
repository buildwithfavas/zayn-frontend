import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Dashboard as DashboardIcon,
  Slideshow as SlideshowIcon,
  Category as CategoryIcon,
  Inventory as InventoryIcon,
  People as PeopleIcon,
  ShoppingCart as ShoppingCartIcon,
  Image as ImageIcon,
  LocalOffer as LocalOfferIcon,
  Payment as PaymentIcon,
  Share as ShareIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";

const menus = [
  {
    type: "link",
    label: "Dashboard",
    to: "/admin/dashboard",
    icon: <DashboardIcon />,
  },
  {
    type: "dropdown",
    key: "homeSlides",
    label: "Home Slides",
    icon: <SlideshowIcon />,
    children: [
      { label: "All Slides", to: "/admin/home-slides" },
      { label: "Add Slide", to: "/admin/home-slides/new" },
    ],
  },
  {
    type: "dropdown",
    key: "category",
    label: "Category",
    icon: <CategoryIcon />,
    children: [
      { label: "Category List", to: "/admin/categories", end: true },
      { label: "Add A Category", to: "/admin/categories/new" },
      { label: "Sub Category List", to: "/admin/subcategories", end: true },
    ],
  },
  {
    type: "dropdown",
    key: "products",
    label: "Products",
    icon: <InventoryIcon />,
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
    icon: <PeopleIcon />,
  },
  {
    type: "link",
    label: "Orders",
    to: "/admin/orders",
    icon: <ShoppingCartIcon />,
  },
  {
    type: "dropdown",
    key: "banners",
    label: "Banners",
    icon: <ImageIcon />,
    children: [
      { label: "All Banners", to: "/admin/banners" },
      { label: "Add Banner", to: "/admin/banners/new" },
    ],
  },
  {
    type: "link",
    label: "Coupon",
    to: "/admin/coupons",
    icon: <LocalOfferIcon />,
  },
  {
    type: "link",
    label: "Payment",
    to: "/admin/payment",
    icon: <PaymentIcon />,
  },
  {
    type: "link",
    label: "Referrals",
    to: "/admin/referrals",
    icon: <ShareIcon />,
  },
  {
    type: "link",
    label: "Logout",
    to: "/admin/login",
    icon: <LogoutIcon />,
  },
];

export default function AdminSidebar({ open, onClose }) {
  const location = useLocation();
  const [openMap, setOpenMap] = useState({
    homeSlides: false,
    category: false,
    products: false,
    banners: false,
  });

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
        className={`fixed md:sticky top-0 left-0 z-40 md:z-0 h-full md:min-h-screen w-64 md:w-56 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-out ${
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
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
                    `flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 ${
                      isActive ? "text-blue-700 bg-blue-50" : "text-gray-700"
                    }`
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
                  <svg
                    className={`w-4 h-4 text-gray-500 transition-transform ${
                      openMap[m.key] ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
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
                          `flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-100 ${
                            isActive ? "text-blue-700 bg-blue-50" : "text-gray-700"
                          }`
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
