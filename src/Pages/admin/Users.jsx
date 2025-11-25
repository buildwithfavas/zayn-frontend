import React from "react";
import { useGetUserStatsQuery } from "../../store/Api/admin/users";
import UserStats from "../../components/admin/UserStats";
import UsersTable from "../../components/admin/UsersTable";

export default function Users() {
  // Fetch user statistics from backend
  const { data: statsData } = useGetUserStatsQuery();

  const stats = {
    total: statsData?.total || 0,
    active: statsData?.active || 0,
    blocked: statsData?.blocked || 0,
    thisMonth: statsData?.thisMonth || 0,
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Users List</h1>

      {/* User Statistics */}
      <UserStats stats={stats} />

      {/* Users Table */}
      <UsersTable />
    </div>
  );
}
