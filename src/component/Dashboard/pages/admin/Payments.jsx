import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Payments = () => {
  const [filter, setFilter] = useState("All");
  const payments = [
    {
      id: 1,
      orderId: "123",
      amount: 199.99,
      status: "Completed",
      date: "2025-06-05",
    },
    {
      id: 2,
      orderId: "124",
      amount: 89.5,
      status: "Pending",
      date: "2025-06-04",
    },
  ];

  const filteredPayments =
    filter === "All"
      ? payments
      : payments.filter((payment) => payment.status === filter);

  return (
    <div>
      <Helmet>
        <title>Manage Payments - Admin Dashboard</title>
        <meta
          name="description"
          content="View and manage payment transactions."
        />
      </Helmet>
      <h2 className="text-2xl font-bold text-[#3D99F5] mb-4">Payments</h2>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex flex-wrap gap-2 mb-4">
          {["All", "Completed", "Pending", "Failed"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
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
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-600">
                <th className="p-3">ID</th>
                <th className="p-3">Order ID</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="border-t">
                  <td className="p-3">{payment.id}</td>
                  <td className="p-3">{payment.orderId}</td>
                  <td className="p-3">₦{payment.amount}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        payment.status === "Completed"
                          ? "bg-green-100 text-green-600"
                          : payment.status === "Pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="p-3">{payment.date}</td>
                  <td className="p-3">
                    <Link
                      to={`/admin-dashboard/payments/${payment.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="md:hidden space-y-4">
          {filteredPayments.map((payment) => (
            <div
              key={payment.id}
              className="bg-gray-50 p-4 rounded-lg shadow-sm"
            >
              <h3 className="text-lg font-semibold">Payment #{payment.id}</h3>
              <p className="text-gray-600">Order ID: {payment.orderId}</p>
              <p className="text-gray-600">Amount: ₦{payment.amount}</p>
              <p className="text-gray-600">Status: {payment.status}</p>
              <p className="text-gray-600">Date: {payment.date}</p>
              <Link
                to={`/admin-dashboard/payments/${payment.id}`}
                className="text-blue-600 hover:underline mt-2 inline-block"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Payments;
