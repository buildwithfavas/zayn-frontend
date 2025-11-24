import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function AdminHeader({ onMenuClick }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem("adminAuthed");
    } catch {}
    navigate("/admin/login", { replace: true });
  };

  return (
    <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <button className="md:hidden" aria-label="menu" onClick={onMenuClick}>
          <MenuIcon className="text-gray-700" />
        </button>
        <span className="text-gray-800 font-semibold" aria-label="Brand">
          ZAYN Admin
        </span>
      </div>
      <div className="flex items-center gap-4">
        {/* Notification icon */}
        <button className="relative" aria-label="notifications">
          <NotificationsIcon className="text-gray-700" />
          {/* Optional red dot */}
          {/* <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full" /> */}
        </button>

        {/* Profile dropdown */}
        <div className="relative" ref={menuRef}>
          <button
            className="flex items-center justify-center text-gray-700 hover:text-gray-900"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Open user menu</span>
            <AccountCircleIcon sx={{ fontSize: 32 }} />
          </button>
          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow z-30">
              <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50">
                Profile
              </button>
              <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50">
                Settings
              </button>
              <div className="my-1 border-t border-gray-100" />
              <button
                onClick={handleLogout}
                className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-50"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
