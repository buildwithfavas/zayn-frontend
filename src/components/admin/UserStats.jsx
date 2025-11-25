import React from "react";
import { People, CalendarMonth, CheckCircle, Block } from "@mui/icons-material";
import StatCard from "./StatCard";

function UserStats({ stats }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard title="Total Customers" value={stats.total} icon={<People className="w-5 h-5" />} />
      <StatCard
        title="This Month"
        value={stats.thisMonth.toLocaleString("en-IN")}
        icon={<CalendarMonth className="w-5 h-5" />}
      />
      <StatCard
        title="Active Customers"
        value={stats.active}
        icon={<CheckCircle className="w-5 h-5" />}
      />
      <StatCard
        title="Blocked Customers"
        value={stats.blocked}
        icon={<Block className="w-5 h-5" />}
      />
    </div>
  );
}

export default UserStats;
