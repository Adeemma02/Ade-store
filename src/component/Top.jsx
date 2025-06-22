import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";

const Top = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const categories = [
    "Electronics",
    "Fashion",
    "Sport",
    "Health",
    "Toy",
    "Automotives",
    "Accessories",
    "Computer",
    "Wearables",
    "Camera",
  ];

  const handleCategoryClick = (category) => {
    console.log(`Clicked category: ${category}`);
    console.log(`Navigating to: /category/${category.toLowerCase()}`);
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="w-full bg-transparent border-b-2 border-b-[#F0F2F5] px-4 md:px-8 lg:px-12 xl:px-14 py-2">
      <nav className="flex items-center justify-start space-x-6">
        {/* Desktop Category Dropdown */}
        <div className="relative hidden md:flex">
          <button
            className="hover:text-[#3D99F5] border-2 px-4 py-1.5 rounded-full border-[#3D99F5] poppins font-normal text-sm md:text-base transition cursor-pointer flex items-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
          >
            <Menu size={20} className="mr-2" />
            Categories
          </button>
          {isMobileMenuOpen && (
            <ul className="absolute left-0 top-10 w-48 bg-white shadow-lg rounded-lg py-2 z-50">
              {categories.map((category) => (
                <li key={category}>
                  <NavLink
                    to={`/category/${category.toLowerCase()}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#F0F2F5] hover:text-[#3D99F5] transition"
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Mobile Hamburger with Dropdown */}
        <div className="md:hidden relative">
          <button
            onClick={() => {
              console.log("Toggled mobile menu");
              setIsMobileMenuOpen(!isMobileMenuOpen);
            }}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            className="text-2xl focus:outline-none"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          {isMobileMenuOpen && (
            <ul className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-lg py-2 z-50">
              {categories.map((category) => (
                <li key={category}>
                  <NavLink
                    to={`/category/${category.toLowerCase()}`}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#F0F2F5] hover:text-[#3D99F5] transition"
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </NavLink>
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Navigation (Product, Service, Contact) */}
        <div className="flex items-center space-x-4 md:space-x-16">
          {["Product", "Service", "Contact"].map((item) => (
            <NavLink
              key={item}
              to={`/${item.toLowerCase()}`}
              className="hover:text-[#3D99F5] poppins font-normal text-base md:text-lg transition cursor-pointer"
              onClick={() =>
                console.log(`Navigating to /${item.toLowerCase()}`)
              }
            >
              {item}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default Top;
