import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Vendors = () => {
  const [filter, setFilter] = useState("All");
  const vendors = [
    {
      id: 1,
      name: "Vendor A",
      email: "vendorA@example.com",
      status: "Active",
      products: 50,
    },
    {
      id: 2,
      name: "Vendor B",
      email: "vendorB@example.com",
      status: "Pending",
      products: 20,
    },
  ];

  const filteredVendors =
    filter === "All"
      ? vendors
      : vendors.filter((vendor) => vendor.status === filter);

  return (
    <div>
      <Helmet>
        <title>Manage Vendors - Admin Dashboard</title>
        <meta
          name="description"
          content="Manage vendor accounts and their products."
        />
      </Helmet>
      <h2 className="text-2xl font-bold text-[#3D99F5] mb-4">Vendors</h2>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="flex flex-wrap gap-2 mb-4">
          {["All", "Active", "Pending", "Suspended"].map((status) => (
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
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Products</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredVendors.map((vendor) => (
                <tr key={vendor.id} className="border-t">
                  <td className="p-3">{vendor.id}</td>
                  <td className="p-3">{vendor.name}</td>
                  <td className="p-3">{vendor.email}</td>
                  <td className="p-3">{vendor.products}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        vendor.status === "Active"
                          ? "bg-green-100 text-green-600"
                          : vendor.status === "Pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {vendor.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <Link
                      to={`/admin-dashboard/vendors/${vendor.id}`}
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
          {filteredVendors.map((vendor) => (
            <div
              key={vendor.id}
              className="bg-gray-50 p-4 rounded-lg shadow-sm"
            >
              <h3 className="text-lg font-semibold">{vendor.name}</h3>
              <p className="text-gray-600">Email: {vendor.email}</p>
              <p className="text-gray-600">Products: {vendor.products}</p>
              <p className="text-gray-600">Status: {vendor.status}</p>
              <Link
                to={`/admin-dashboard/vendors/${vendor.id}`}
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

export default Vendors;
