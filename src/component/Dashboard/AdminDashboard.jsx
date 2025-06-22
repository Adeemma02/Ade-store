import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import MainContent from "./MainContent";
import AdminHome from "./pages/admin/AdminHome";
import Users from "./pages/admin/Users";
import Vendors from "./pages/admin/Vendors";
import Products from "./pages/admin/Products";
import Services from "./pages/admin/Services";
import Payments from "./pages/admin/Payments";
import Analytics from "./pages/admin/Analytics";
import Settings from "./pages/admin/Settings";
import { ProductProvider } from "./ProductProvider"; // Updated import
import { Helmet } from "react-helmet";

const AdminDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <ProductProvider>
      {" "}
      {/* Add if needed */}
      <Helmet>
        <title>Admin Dashboard - E-Commerce Management</title>
        <meta
          name="description"
          content="Admin dashboard for managing users, vendors, products, services, payments, and analytics."
        />
      </Helmet>
      <div className="flex h-screen bg-gray-100">
        <Sidebar
          isOpen={isSidebarOpen}
          closeSidebar={closeSidebar}
          role="admin"
        />
        <div className="flex-1 flex flex-col">
          <Header toggleSidebar={toggleSidebar} role="admin" />
          <MainContent>
            <Routes>
              <Route path="/" element={<AdminHome />} />
              <Route path="/users" element={<Users />} />
              <Route path="/vendors" element={<Vendors />} />
              <Route path="/products" element={<Products />} />
              <Route path="/services" element={<Services />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </MainContent>
        </div>
      </div>
    </ProductProvider>
  );
};

export default AdminDashboard;
