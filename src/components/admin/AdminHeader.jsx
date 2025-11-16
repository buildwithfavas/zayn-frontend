import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <span className="text-gray-800" aria-label="Brand">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 10-8 0v4M5 8h14l-1 12H6L5 8z" />
          </svg>
        </span>
      </div>
      <div className="flex items-center gap-4">
        {/* Notification icon */}
        <button className="relative" aria-label="notifications">
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          {/* Optional red dot */}
          {/* <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full" /> */}
        </button>

        {/* Profile dropdown */}
        <div className="relative" ref={menuRef}>
          <button className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center" onClick={() => setOpen((v) => !v)}>
            <span className="sr-only">Open user menu</span>
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A7 7 0 1118.88 6.195M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow z-30">
              <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50">Profile</button>
              <button className="w-full text-left px-3 py-2 text-sm hover:bg-gray-50">Settings</button>
              <div className="my-1 border-t border-gray-100" />
              <button onClick={handleLogout} className="w-full text-left px-3 py-2 text-sm text-red-600 hover:bg-gray-50">Logout</button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
