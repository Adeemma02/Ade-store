import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../component/Header";
import Top from "../component/Top";
import Footer from "../component/Footer";
import Newsletter from "../component/Newsletter";
import Category from "../component/Category";

const CategoryPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { category } = useParams();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Capitalize category (e.g., "electronics" → "Electronics")
  const formattedCategory =
    category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

  return (
    <div>
      <div
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled ? "bg-white/70 backdrop-blur-md shadow-md" : "bg-white"
        }`}
      >
        <Header />
        <Top />
      </div>
      <div className="pt-[120px]">
        <Category initialCategory={formattedCategory} />
        <Newsletter />
        <Footer />
      </div>
    </div>
  );
};

export default CategoryPage;
