import React from "react";
import { Package, Truck, Users, CreditCard } from "lucide-react";
import { Helmet } from "react-helmet";

const AdminHome = () => {
  return (
    <div>
      <Helmet>
        <title>Admin Dashboard Overview</title>
        <meta
          name="description"
          content="Overview of e-commerce platform metrics for administrators."
        />
      </Helmet>
      <h2 className="text-2xl font-bold text-[#3D99F5] mb-4">
        Admin Dashboard
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
          <Users size={32} className="text-[#3D99F5] mr-4" />
          <div>
            <h3 className="text-lg font-semibold">Total Users</h3>
            <p className="text-2xl font-bold text-[#3D99F5]">1,230</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
          <Users size={32} className="text-yellow-600 mr-4" />
          <div>
            <h3 className="text-lg font-semibold">Total Vendors</h3>
            <p className="text-2xl font-bold text-yellow-600">45</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
          <Package size={32} className="text-green-600 mr-4" />
          <div>
            <h3 className="text-lg font-semibold">Total Products</h3>
            <p className="text-2xl font-bold text-green-600">320</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm flex items-center">
          <CreditCard size={32} className="text-purple-600 mr-4" />
          <div>
            <h3 className="text-lg font-semibold">Total Revenue</h3>
            <p className="text-2xl font-bold text-purple-600">₦12,450</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <h3 className="text-lg font-semibold mb-4">Recent Activities</h3>
        <ul className="space-y-4">
          <li className="flex justify-between">
            <span>New vendor registered</span>
            <span className="text-gray-500">1 hour ago</span>
          </li>
          <li className="flex justify-between">
            <span>Product approved</span>
            <span className="text-gray-500">3 hours ago</span>
          </li>
          <li className="flex justify-between">
            <span>Payment processed</span>
            <span className="text-gray-500">Yesterday</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminHome;
