import React from "react";

const StatCard = ({ color, title, value }) => (
  <div className={`flex items-center justify-between rounded-lg px-4 py-4 text-white shadow ${color}`}>
    <div className="flex items-center gap-3">
      <span className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3v18h18" />
        </svg>
      </span>
      <div className="text-sm">
        <div className="opacity-90">{title}</div>
        <div className="text-xl font-semibold leading-tight">{value}</div>
      </div>
    </div>
    <svg className="w-6 h-6 opacity-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 19l6-6 4 4 6-10" />
    </svg>
  </div>
);

const TableShell = ({ title, filters = [] }) => (
  <div className="bg-white rounded-lg shadow border border-gray-200">
    <div className="px-4 py-3 border-b border-gray-200">
      <h3 className="font-semibold text-gray-800">{title}</h3>
    </div>
    <div className="p-4 space-y-4">
      {filters.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {filters.map((label) => (
            <select key={label} className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm">
              <option>{label}</option>
            </select>
          ))}
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-50 text-gray-700">
              <th className="text-left font-medium px-4 py-2">PRODUCT NAME</th>
              <th className="text-left font-medium px-4 py-2">CATEGORY</th>
              <th className="text-left font-medium px-4 py-2">TOTAL QUANTITY SOLD</th>
              <th className="text-left font-medium px-4 py-2">TOTAL REVENUE</th>
              <th className="text-left font-medium px-4 py-2">ORDER COUNT</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-6 text-gray-500" colSpan={5}>No data</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-end text-xs text-gray-600">
        <span className="mr-2">Rows per page:</span>
        <select className="border border-gray-300 rounded px-1 py-0.5">
          <option>50</option>
        </select>
        <span className="ml-3">1–50 of 50</span>
      </div>
    </div>
  </div>
);

const ChartShell = () => (
  <div className="bg-white rounded-lg shadow border border-gray-200">
    <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
      <h3 className="font-semibold text-gray-800">Total Users & Total Sales</h3>
      <div className="flex items-center gap-2 text-xs">
        <button className="px-2 py-1 rounded border border-gray-300 text-gray-700">Day</button>
        <button className="px-2 py-1 rounded border border-gray-300 bg-gray-100 text-gray-900">Month</button>
        <button className="px-2 py-1 rounded border border-gray-300 text-gray-700">Year</button>
        <button className="ml-2 px-2 py-1 rounded border border-gray-300 text-gray-700">Report</button>
      </div>
    </div>
    <div className="p-4">
      <div className="h-80 bg-gray-50 rounded border border-dashed border-gray-300 flex items-center justify-center text-gray-500">
        Chart Placeholder
      </div>
      <div className="mt-2 text-xs text-center text-gray-600">Legend: <span className="text-green-600 font-medium">TotalSales</span> | <span className="text-blue-600 font-medium">TotalUsers</span></div>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="rounded-lg shadow border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Welcome,
            <span className="text-blue-600"> Mohammed Favas</span>
          </h1>
          <p className="text-gray-600 mt-1">Here's what happening on your store today. See the statistics at once.</p>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard color="bg-emerald-500" title="Total Users" value="2354" />
        <StatCard color="bg-blue-500" title="Total Orders" value="581" />
        <StatCard color="bg-violet-500" title="Total Products" value="50" />
        <StatCard color="bg-rose-500" title="Total Category" value="8" />
      </div>

      {/* Top Selling Products */}
      <TableShell
        title="Top Selling Products"
        filters={["Category By", "Sub Category By", "Third Level Sub Category By"]}
      />

      {/* Top Selling Categories */}
      <div className="bg-white rounded-lg shadow border border-gray-200">
        <div className="px-4 py-3 border-b border-gray-200">
          <h3 className="font-semibold text-gray-800">Top Selling Categories</h3>
        </div>
        <div className="p-4">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="bg-gray-50 text-gray-700">
                  <th className="text-left font-medium px-4 py-2">CATEGORY</th>
                  <th className="text-left font-medium px-4 py-2">TOTAL QUANTITY SOLD</th>
                  <th className="text-left font-medium px-4 py-2">TOTAL REVENUE</th>
                  <th className="text-left font-medium px-4 py-2">ORDER COUNT</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="px-4 py-6 text-gray-500" colSpan={4}>No data</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Chart Section */}
      <ChartShell />
    </div>
  );
};

export default Dashboard;
