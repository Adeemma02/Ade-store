import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import MainContent from "./MainContent";
import DashboardHome from "./pages/vendor/DashboardHome";
import Products from "./pages/vendor/Products";
import AddProductForm from "./pages/vendor/AddProductForm";
import EditProductForm from "./pages/vendor/EditProductForm";
import Orders from "./pages/vendor/Orders";
import OrderDetails from "./pages/vendor/OrderDetails";
import Analytics from "./pages/vendor/Analytics";
import Settings from "./pages/vendor/Settings";
import Profile from "./pages/vendor/Profile";
import { ProductProvider } from "./ProductProvider"; // Updated import
import { Helmet } from "react-helmet";

const VendorDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <ProductProvider>
      <Helmet>
        <title>Vendor Dashboard - Manage Your Products and Orders</title>
        <meta
          name="description"
          content="Vendor dashboard for managing products, orders, analytics, and profile settings."
        />
      </Helmet>
      <div className="flex h-screen bg-gray-100">
        <Sidebar
          isOpen={isSidebarOpen}
          closeSidebar={closeSidebar}
          role="vendor"
        />
        <div className="flex-1 flex flex-col">
          <Header toggleSidebar={toggleSidebar} role="vendor" />
          <MainContent>
            <Routes>
              <Route path="/" element={<DashboardHome />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/add" element={<AddProductForm />} />
              <Route path="/products/edit/:id" element={<EditProductForm />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/orders/:orderId" element={<OrderDetails />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </MainContent>
        </div>
      </div>
    </ProductProvider>
  );
};

export default VendorDashboard;
