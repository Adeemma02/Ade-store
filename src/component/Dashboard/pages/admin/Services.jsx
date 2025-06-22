import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const Services = () => {
  const [services, setServices] = useState([
    { id: 1, name: "Express Shipping", price: 10, status: "Active" },
    { id: 2, name: "Gift Wrapping", price: 5, status: "Active" },
  ]);

  const toggleStatus = (id) => {
    setServices(
      services.map((service) =>
        service.id === id
          ? {
              ...service,
              status: service.status === "Active" ? "Inactive" : "Active",
            }
          : service
      )
    );
  };

  return (
    <div>
      <Helmet>
        <title>Manage Services - Admin Dashboard</title>
        <meta
          name="description"
          content="Manage additional services like shipping and gift wrapping."
        />
      </Helmet>
      <h2 className="text-2xl font-bold text-[#3D99F5] mb-4">Services</h2>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-600">
                <th className="p-3">ID</th>
                <th className="p-3">Name</th>
                <th className="p-3">Price</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {services.map((service) => (
                <tr key={service.id} className="border-t">
                  <td className="p-3">{service.id}</td>
                  <td className="p-3">{service.name}</td>
                  <td className="p-3">₦{service.price}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-sm ${
                        service.status === "Active"
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {service.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <Link
                      to={`/admin-dashboard/services/${service.id}`}
                      className="text-blue-600 hover:underline mr-2"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => toggleStatus(service.id)}
                      className="text-blue-600 hover:underline"
                    >
                      Toggle Status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="md:hidden space-y-4">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-gray-50 p-4 rounded-lg shadow-sm"
            >
              <h3 className="text-lg font-semibold">{service.name}</h3>
              <p className="text-gray-600">Price: ₦{service.price}</p>
              <p className="text-gray-600">Status: {service.status}</p>
              <div className="mt-2">
                <Link
                  to={`/admin-dashboard/services/${service.id}`}
                  className="text-blue-600 hover:underline mr-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => toggleStatus(service.id)}
                  className="text-blue-600 hover:underline"
                >
                  Toggle Status
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
