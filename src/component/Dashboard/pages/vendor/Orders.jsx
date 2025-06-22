import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

// Dummy orders for demonstration
const ORDERS = [
  {
    id: 2345,
    customer: "Michael Johnson",
    date: "2025-06-12",
    total: 149.99,
    status: "Pending",
  },
  {
    id: 2346,
    customer: "Sarah Williams",
    date: "2025-06-11",
    total: 299.5,
    status: "Shipped",
  },
  {
    id: 2347,
    customer: "David Brown",
    date: "2025-06-10",
    total: 79.99,
    status: "Delivered",
  },
  {
    id: 2348,
    customer: "Emily Davis",
    date: "2025-06-09",
    total: 450.0,
    status: "Cancelled",
  },
  {
    id: 2349,
    customer: "James Wilson",
    date: "2025-06-08",
    total: 129.95,
    status: "Pending",
  },
  {
    id: 2350,
    customer: "Olivia Taylor",
    date: "2025-06-07",
    total: 89.99,
    status: "Shipped",
  },
  {
    id: 2351,
    customer: "William Anderson",
    date: "2025-06-06",
    total: 199.5,
    status: "Delivered",
  },
  {
    id: 2352,
    customer: "Sophia Martinez",
    date: "2025-06-05",
    total: 349.99,
    status: "Pending",
  },
  {
    id: 2353,
    customer: "Benjamin Thomas",
    date: "2025-06-04",
    total: 159.0,
    status: "Shipped",
  },
  {
    id: 2354,
    customer: "Charlotte Garcia",
    date: "2025-06-03",
    total: 229.95,
    status: "Delivered",
  },
  {
    id: 2355,
    customer: "Daniel Rodriguez",
    date: "2025-06-02",
    total: 69.99,
    status: "Cancelled",
  },
  {
    id: 2356,
    customer: "Amelia Lopez",
    date: "2025-06-01",
    total: 179.5,
    status: "Pending",
  },
  {
    id: 2357,
    customer: "Matthew Hernandez",
    date: "2025-05-31",
    total: 399.99,
    status: "Shipped",
  },
  {
    id: 2358,
    customer: "Evelyn Gonzalez",
    date: "2025-05-30",
    total: 89.95,
    status: "Delivered",
  },
  {
    id: 2359,
    customer: "Samuel Perez",
    date: "2025-05-29",
    total: 149.0,
    status: "Pending",
  },
  {
    id: 2360,
    customer: "Abigail Torres",
    date: "2025-05-28",
    total: 269.99,
    status: "Shipped",
  },
  {
    id: 2361,
    customer: "Joseph Flores",
    date: "2025-05-27",
    total: 189.5,
    status: "Delivered",
  },
  {
    id: 2362,
    customer: "Harper Rivera",
    date: "2025-05-26",
    total: 99.99,
    status: "Cancelled",
  },
  {
    id: 2363,
    customer: "Andrew Mitchell",
    date: "2025-05-25",
    total: 329.95,
    status: "Pending",
  },
  {
    id: 2364,
    customer: "Ella Roberts",
    date: "2025-05-24",
    total: 149.5,
    status: "Shipped",
  },
];

const STATUS_OPTIONS = ["All", "Pending", "Shipped", "Delivered", "Cancelled"];

const Orders = () => {
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  // Filtering
  const filteredOrders = ORDERS.filter((order) => {
    const matchesStatus = filter === "All" || order.status === filter;
    const matchesSearch =
      order.customer.toLowerCase().includes(search.toLowerCase()) ||
      order.id.toString().includes(search);
    return matchesStatus && matchesSearch;
  });

  // Sorting
  const sortedOrders = [...filteredOrders].sort((a, b) => {
    if (sortBy === "date") {
      return sortOrder === "asc"
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date);
    }
    if (sortBy === "total") {
      return sortOrder === "asc" ? a.total - b.total : b.total - a.total;
    }
    return 0;
  });

  // Pagination
  const totalPages = Math.ceil(sortedOrders.length / pageSize);
  const paginatedOrders = sortedOrders.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Export as CSV
  const exportCSV = () => {
    const rows = [
      ["Order ID", "Customer", "Date", "Total", "Status"],
      ...filteredOrders.map((o) => [
        o.id,
        o.customer,
        o.date,
        o.total,
        o.status,
      ]),
    ];
    const csvContent =
      "data:text/csv;charset=utf-8," + rows.map((e) => e.join(",")).join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "orders.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Status update (simulate)
  const updateOrderStatus = (orderId, newStatus) => {
    alert(
      `Order #${orderId} status would be updated to "${newStatus}" (implement API call here)`
    );
  };

  return (
    <div>
      <Helmet>
        <title>Manage Orders - Vendor Dashboard</title>
        <meta
          name="description"
          content="View and manage your customer orders."
        />
      </Helmet>
      {/* <h2 className="text-2xl font-bold text-[#3D99F5] mb-4">Orders</h2> */}
      <div className="bg-white p-6 rounded-lg shadow-sm">
        {/* Search & Export */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
          <input
            type="text"
            placeholder="Search by customer or order ID"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="border px-3 py-2  rounded-md w-full md:w-64"
          />
          <button
            onClick={exportCSV}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Export CSV
          </button>
        </div>
        {/* Filter Buttons */}
        <div className="flex flex-wrap gap-2 mb-4">
          {STATUS_OPTIONS.map((status) => (
            <button
              key={status}
              onClick={() => {
                setFilter(status);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-md text-sm ${
                filter === status
                  ? "bg-[#3D99F5] text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
        {/* Table (Desktop) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-600">
                <th className="p-3">Order ID</th>
                <th className="p-3">Customer</th>
                <th
                  className="p-3 cursor-pointer"
                  onClick={() => {
                    setSortBy("date");
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                  }}
                >
                  Date{" "}
                  {sortBy === "date" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                </th>
                <th
                  className="p-3 cursor-pointer"
                  onClick={() => {
                    setSortBy("total");
                    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                  }}
                >
                  Total{" "}
                  {sortBy === "total" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
                </th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-gray-400">
                    No orders found.
                  </td>
                </tr>
              ) : (
                paginatedOrders.map((order) => (
                  <tr key={order.id} className="border-t">
                    <td className="p-3">{order.id}</td>
                    <td className="p-3">{order.customer}</td>
                    <td className="p-3">{order.date}</td>
                    <td className="p-3">₦{order.total}</td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : order.status === "Shipped"
                            ? "bg-blue-100 text-blue-600"
                            : order.status === "Delivered"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="p-3 flex gap-2">
                      <Link
                        to={`/vendor-dashboard/orders/${order.id}`}
                        className="text-blue-600 hover:underline"
                      >
                        View
                      </Link>
                      {/* Status Update Dropdown */}
                      {/* <select
                        value={order.status}
                        onChange={(e) =>
                          updateOrderStatus(order.id, e.target.value)
                        }
                        className="border rounded px-2 py-1 text-sm"
                      >
                        {STATUS_OPTIONS.filter((s) => s !== "All").map(
                          (status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          )
                        )}
                      </select> */}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4 gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-[#3D99F5] text-white"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        )}
        {/* Mobile Card View */}
        <div className="md:hidden space-y-4 mt-4">
          {paginatedOrders.length === 0 ? (
            <div className="text-center text-gray-400">No orders found.</div>
          ) : (
            paginatedOrders.map((order) => (
              <div
                key={order.id}
                className="bg-gray-50 p-4 rounded-lg shadow-sm"
              >
                <h3 className="text-lg font-semibold">Order #{order.id}</h3>
                <p className="text-gray-600">Customer: {order.customer}</p>
                <p className="text-gray-600">Date: {order.date}</p>
                <p className="text-gray-600">Total: ₦{order.total}</p>
                <p className="text-gray-600">Status: {order.status}</p>
                <div className="flex gap-2 mt-2">
                  <Link
                    to={`/vendor-dashboard/orders/${order.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    View Details
                  </Link>
                  <select
                    value={order.status}
                    onChange={(e) =>
                      updateOrderStatus(order.id, e.target.value)
                    }
                    className="border rounded px-2 py-1 text-sm"
                  >
                    {STATUS_OPTIONS.filter((s) => s !== "All").map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
