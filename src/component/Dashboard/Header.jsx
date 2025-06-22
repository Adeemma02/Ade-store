import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, LogOut, Bell, X } from "lucide-react";

const initialNotifications = [
  {
    id: 1,
    message: "Your payout for last week has been processed.",
    type: "success",
  },
  { id: 2, message: "2 products are low in stock.", type: "warning" },
];

const Header = ({ toggleSidebar, role }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);

  const getPageTitle = () => {
    const path = location.pathname;
    if (role === "admin") {
      if (path === "/admin-dashboard") return "Admin Dashboard";
      if (path === "/admin-dashboard/users") return "Users";
      if (path === "/admin-dashboard/vendors") return "Vendors";
      if (path === "/admin-dashboard/products") return "Products";
      if (path === "/admin-dashboard/services") return "Services";
      if (path === "/admin-dashboard/payments") return "Payments";
      if (path === "/admin-dashboard/analytics") return "Analytics";
      if (path === "/admin-dashboard/settings") return "Settings";
    } else {
      if (path === "/vendor-dashboard") return "Vendor Dashboard";
      if (path === "/vendor-dashboard/products") return "Products";
      if (path === "/vendor-dashboard/products/add") return "Add Product";
      if (path.startsWith("/vendor-dashboard/products/edit"))
        return "Edit Product";
      if (path === "/vendor-dashboard/orders") return "Orders";
      if (path.startsWith("/vendor-dashboard/orders/")) return "Order Details";
      if (path === "/vendor-dashboard/analytics") return "Analytics";
      if (path === "/vendor-dashboard/settings") return "Settings";
      if (path === "/vendor-dashboard/profile") return "Profile";
    }
    return role === "admin" ? "Admin Dashboard" : "Vendor Dashboard";
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const dismissNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <header className="bg-white shadow-sm px-4 py-5 flex justify-between items-center relative">
      <div className="flex items-center">
        <button
          className="lg:hidden mr-4"
          onClick={toggleSidebar}
          aria-label="Toggle Sidebar"
        >
          <Menu size={24} />
        </button>
        <h1 className="text-xl font-semibold text-[#3D99F5] md:text-2xl">
          {getPageTitle()}
        </h1>
      </div>

      <div className="flex items-center space-x-4">
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
        <button
          onClick={handleLogout}
          className="flex items-center cursor-pointer text-red-600 hover:text-red-800 transition duration-200"
          aria-label="Logout"
        >
          <LogOut size={20} className="mr-2" />
          Logout
        </button>
      </div>

      {showNotifications && notifications.length > 0 && (
        <div className="absolute right-8 mt-2 w-80 bg-white shadow-lg rounded-lg z-10">
          <div className="p-4 border-b font-semibold text-[#3D99F5] flex justify-between items-center">
            <span>Notifications</span>
            <button onClick={() => setShowNotifications(false)}>
              <X size={18} className="text-gray-500 hover:text-gray-700" />
            </button>
          </div>
          <ul>
            {notifications.map((n) => (
              <li
                key={n.id}
                className={`p-4 border-b last:border-b-0 flex justify-between items-start gap-2 ${
                  n.type === "success"
                    ? "bg-green-50 text-green-700"
                    : "bg-yellow-50 text-yellow-700"
                }`}
              >
                <span className="text-sm">{n.message}</span>
                <button
                  onClick={() => dismissNotification(n.id)}
                  className="text-xs text-gray-400 hover:text-gray-600"
                >
                  <X size={14} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
