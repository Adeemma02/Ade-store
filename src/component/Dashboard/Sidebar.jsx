import React from "react";
import { NavLink } from "react-router-dom";
import {
  Home,
  Package,
  Truck,
  BarChart2,
  Settings,
  User,
  X,
  Users,
  CreditCard,
} from "lucide-react";

const Sidebar = ({ isOpen, closeSidebar, role }) => {
  const basePath = role === "admin" ? "/admin-dashboard" : "/vendor-dashboard";

  const vendorNavLinks = [
    {
      path: `${basePath}`,
      label: "Dashboard",
      icon: <Home size={20} />,
      exact: true,
    },
    {
      path: `${basePath}/products`,
      label: "Products",
      icon: <Package size={20} />,
    },
    { path: `${basePath}/orders`, label: "Orders", icon: <Truck size={20} /> },
    {
      path: `${basePath}/analytics`,
      label: "Analytics",
      icon: <BarChart2 size={20} />,
    },
    {
      path: `${basePath}/settings`,
      label: "Settings",
      icon: <Settings size={20} />,
    },
    { path: `${basePath}/profile`, label: "Profile", icon: <User size={20} /> },
  ];

  const adminNavLinks = [
    {
      path: `${basePath}`,
      label: "Dashboard",
      icon: <Home size={20} />,
      exact: true,
    },
    { path: `${basePath}/users`, label: "Users", icon: <Users size={20} /> },
    {
      path: `${basePath}/vendors`,
      label: "Vendors",
      icon: <Users size={20} />,
    },
    {
      path: `${basePath}/products`,
      label: "Products",
      icon: <Package size={20} />,
    },
    {
      path: `${basePath}/services`,
      label: "Services",
      icon: <Package size={20} />,
    },
    {
      path: `${basePath}/payments`,
      label: "Payments",
      icon: <CreditCard size={20} />,
    },
    {
      path: `${basePath}/analytics`,
      label: "Analytics",
      icon: <BarChart2 size={20} />,
    },
    {
      path: `${basePath}/settings`,
      label: "Settings",
      icon: <Settings size={20} />,
    },
  ];

  const navLinks = role === "admin" ? adminNavLinks : vendorNavLinks;

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0  z-40 lg:hidden"
          onClick={closeSidebar}
        ></div>
      )}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 lg:static lg:transform-none ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex items-center justify-between px-4 py-2 border-b border-[#3D99F5]">
          <div className="flex items-center space-x-3">
            <User className="cursor-pointer" size={25} />
            <div className="flex flex-col">
              <h2 className="text-base md:text-[18px] font-medium text-[#121417]">
                {role === "admin" ? "Admin User" : "AdeEmma"}
              </h2>
              <span className="text-[#3D99F5] text-base md:text-[18px] font-medium">
                {role === "admin" ? "Admin" : "Vendor"}
              </span>
            </div>
          </div>
          <button
            className="lg:hidden"
            onClick={closeSidebar}
            aria-label="Close Sidebar"
          >
            <X size={24} />
          </button>
        </div>
        <nav className="mt-4">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              end={link.exact}
              className={({ isActive }) =>
                `flex items-center px-4 py-3 transition-colors duration-200 ${
                  isActive
                    ? "bg-[#3D99F5] text-white"
                    : "text-gray-600 hover:bg-blue-50 hover:text-[#3D99F5]"
                }`
              }
              onClick={closeSidebar}
              title={link.label}
            >
              <span className="mr-3">{link.icon}</span>
              {link.label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
