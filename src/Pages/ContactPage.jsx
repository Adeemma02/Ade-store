import React, { useState, useEffect } from "react";
import Header from "../component/Header";

import Top from "../component/Top";

import Footer from "../component/Footer";

import Newsletter from "../component/Newsletter";
import ContactUs from "../component/Contact";

const ContactPage = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        <ContactUs />
        <Newsletter />
        <Footer />
      </div>
    </div>
  );
};

export default ContactPage;
