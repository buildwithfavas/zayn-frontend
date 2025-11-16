import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <div className="flex">
        <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <div className="flex-1 min-w-0">
          <AdminHeader onMenuClick={() => setSidebarOpen(true)} />
          <main className="p-4 sm:p-6">
            <div className="max-w-[1400px] mx-auto"><Outlet /></div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
