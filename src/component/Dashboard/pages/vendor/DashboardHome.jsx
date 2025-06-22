// import React, { useState } from "react";
import { Package, Truck, TrendingUp, User, PlusCircle } from "lucide-react";
import { Helmet } from "react-helmet";
// Assume you have these components or replace with your own
import OrderDetails from "./OrderDetails";
import Analytics from "./Analytics";

const recentOrders = [
  {
    id: 1234,
    status: "Placed",
    time: "1 hour ago",
    amount: 120.5,
    customer: "John Doe",
  },
  {
    id: 1233,
    status: "Shipped",
    time: "3 hours ago",
    amount: 89.99,
    customer: "Jane Smith",
  },
  {
    id: 1232,
    status: "Delivered",
    time: "Yesterday",
    amount: 199.0,
    customer: "Michael Lee",
  },
  {
    id: 1231,
    status: "Cancelled",
    time: "2 days ago",
    amount: 59.5,
    customer: "Emily Clark",
  },
];

// const notifications = [
//   {
//     id: 1,
//     message: "Your payout for last week has been processed.",
//     type: "success",
//   },
//   { id: 2, message: "2 products are low in stock.", type: "warning" },
// ];

const DashboardHome = () => {
  // const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div>
      <Helmet>
        <title>Vendor Dashboard Overview</title>
        <meta
          name="description"
          content="Overview of your vendor dashboard with key metrics."
        />
      </Helmet>
      {/* Header with quick profile and notifications */}
      {/* <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#3D99F5]">Vendor Dashboard</h2>
        <div className="flex items-center gap-4">
          <button
            className="relative"
            onClick={() => setShowNotifications((v) => !v)}
            aria-label="Show notifications"
          >
            <Bell size={24} className="text-gray-600" />
            {notifications.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-1 text-xs">
                {notifications.length}
              </span>
            )}
          </button>
          <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
            <User size={20} className="text-[#3D99F5]" />
            <span className="font-medium text-gray-700">Hello, Vendor!</span>
          </div>
        </div>
      </div> */}
      {/* Notifications dropdown */}
      {/* {showNotifications && (
        <div className="absolute right-8 mt-2 w-80 bg-white shadow-lg rounded-lg z-10">
          <div className="p-4 border-b font-semibold text-[#3D99F5]">
            Notifications
          </div>
          <ul>
            {notifications.map((n) => (
              <li
                key={n.id}
                className={`p-4 border-b last:border-b-0 ${
                  n.type === "success"
                    ? "bg-green-50 text-green-700"
                    : "bg-yellow-50 text-yellow-700"
                }`}
              >
                {n.message}
              </li>
            ))}
          </ul>
        </div>
      )} */}
      {/* Stats cards with quick actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-between">
          <div className="flex items-center">
            <Package size={32} className="text-[#3D99F5] mr-4" />
            <div>
              <h3 className="text-lg font-semibold">Total Products</h3>
              <p className="text-2xl font-bold text-[#3D99F5]">120</p>
            </div>
          </div>
          <button className="ml-4 bg-[#3D99F5] text-white px-3 py-2 rounded hover:bg-[#2176c1] flex items-center gap-1 text-sm">
            <PlusCircle size={16} /> Add
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-between">
          <div className="flex items-center">
            <Truck size={32} className="text-yellow-600 mr-4" />
            <div>
              <h3 className="text-lg font-semibold">Total Orders</h3>
              <p className="text-2xl font-bold text-yellow-600">45</p>
            </div>
          </div>
          <button className="ml-4 bg-yellow-600 text-white px-3 py-2 rounded hover:bg-yellow-700 text-sm">
            View
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-between">
          <div className="flex items-center">
            <TrendingUp size={32} className="text-green-600 mr-4" />
            <div>
              <h3 className="text-lg font-semibold">Revenue</h3>
              <p className="text-2xl font-bold text-green-600">₦230</p>
            </div>
          </div>
          <button className="ml-4 bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700 text-sm">
            Analytics
          </button>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm flex items-center justify-between">
          <div className="flex items-center">
            <User size={32} className="text-purple-600 mr-4" />
            <div>
              <h3 className="text-lg font-semibold">Profile</h3>
              <p className="text-2xl font-bold text-purple-600">Edit</p>
            </div>
          </div>
          <button className="ml-4 bg-purple-600 text-white px-3 py-2 rounded hover:bg-purple-700 text-sm">
            Settings
          </button>
        </div>
      </div>
      {/* Analytics Preview */}
      <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
        <h3 className="text-lg font-semibold mb-4">
          Sales Analytics (Preview)
        </h3>
        {/* Replace with your Analytics component or a chart */}
        <Analytics />
      </div>
      {/* Recent Orders Table */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
        <table className="w-full text-left">
          <thead>
            <tr className="text-gray-600 border-b">
              <th className="py-2">Order ID</th>
              <th className="py-2">Customer</th>
              <th className="py-2">Status</th>
              <th className="py-2">Amount</th>
              <th className="py-2">Time</th>
              <th className="py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.id} className="border-b last:border-b-0">
                <td className="py-2">#{order.id}</td>
                <td className="py-2">{order.customer}</td>
                <td className="py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      order.status === "Placed"
                        ? "bg-blue-100 text-blue-600"
                        : order.status === "Shipped"
                        ? "bg-yellow-100 text-yellow-600"
                        : order.status === "Delivered"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-2">₦{order.amount}</td>
                <td className="py-2">{order.time}</td>
                <td className="py-2">
                  <button className="text-[#3D99F5] hover:underline text-sm">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Optional: OrderDetails component preview */}
      {/* <OrderDetails /> */}
    </div>
  );
};

export default DashboardHome;
