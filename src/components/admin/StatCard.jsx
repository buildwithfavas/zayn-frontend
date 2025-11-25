import React from "react";

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

export default StatCard;
