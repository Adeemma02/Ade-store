import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { Suspense, lazy } from "react";
import { Helmet } from "react-helmet";
import "./App.css";
import { CartProvider } from "./context/CartContext";
import ErrorBoundary from "./component/ErrorBoundary";
import ScrollTop from "./component/ScrollTop";

// Lazy-loaded components
const Home = lazy(() => import("./Pages/Home"));
const Login = lazy(() => import("./Auth/Login"));
const SignUp = lazy(() => import("./Auth/SignUp"));
const NotFound = lazy(() => import("./Pages/NotfoundPage"));
const CartPage = lazy(() => import("./Pages/CartPage"));
const ContactPage = lazy(() => import("./Pages/ContactPage"));
const ProdPage = lazy(() => import("./Pages/ProdPage"));
const ServicePage = lazy(() => import("./Pages/ServicePage"));
const CategoryPage = lazy(() => import("./Pages/CategoryPage"));
const ProductDisplay = lazy(() => import("./component/ProductDisplay"));
const VendorDashboard = lazy(() =>
  import("./component/Dashboard/VendorDashboard")
);
const AdminDashboard = lazy(() =>
  import("./component/Dashboard/AdminDashboard")
);

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-center">
      <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
      <p className="mt-4 text-lg font-medium text-gray-700">Loading...</p>
    </div>
  </div>
);

function App() {
  return (
    <CartProvider>
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Helmet>
          <title>E-Commerce Platform - Admin & Vendor Dashboard</title>
          <meta
            name="description"
            content="Manage your e-commerce business with our robust admin and vendor dashboards."
          />
          <meta
            name="keywords"
            content="e-commerce, admin dashboard, vendor dashboard, products, orders, analytics"
          />
          <meta name="robots" content="index, follow" />
          <link rel="canonical" href="https://yourdomain.com" />
        </Helmet>
        <div className="app">
          <Suspense fallback={<LoadingFallback />}>
            <ErrorBoundary>
              <ScrollTop />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/product/:id" element={<ProductDisplay />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/product" element={<ProdPage />} />
                <Route path="/service" element={<ServicePage />} />
                <Route path="/category/:category" element={<CategoryPage />} />
                <Route
                  path="/vendor-dashboard/*"
                  element={<VendorDashboard />}
                />
                <Route path="/admin-dashboard/*" element={<AdminDashboard />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ErrorBoundary>
          </Suspense>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
