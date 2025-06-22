import { useState } from "react";
import {
  Instagram,
  Facebook,
  Youtube,
  ChevronUpIcon,
  ChevronDownIcon,
} from "lucide-react";

import { Link } from "react-router-dom";
// import logo from "../assets/logo.png";

const Footer = () => {
  // State to manage visibility of each section's list
  const [isOpen, setIsOpen] = useState({
    page: true,
    info: true,
    office: true,
  });

  // Toggle function for each section
  const toggleSection = (section) => {
    setIsOpen((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <footer className="bg-black text-white px-5 sm:px-10 lg:px-20 py-10">
      <div className="w-full mx-auto flex flex-col md:flex-row md:justify-between gap-10 md:gap-0">
        {/* Left section */}
        <div className="md:w-1/3 mb-2 md:mb-0 border-b-1 border-b-gray-700 md:border-b-0 pb-4 md:pb-0 w-full">
          {/* <img src={logo} alt="logo" className="h-20" /> */}
          <p className="mb-2 text-[20px] poppins font-medium text-[#fefefe]">
            Ade Store
          </p>
          <p className="mb-6 text-base poppins font-normal text-[#fefefe]">
            Connecting vendors and shoppers for seamless commerce.Discover
            quality products from trusted sellers.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              aria-label="Instagram"
              className="text-[#fefefe] cursor-pointer"
            >
              <Instagram size={22} />
            </a>
            <a
              href="#"
              aria-label="Facebook"
              className="text-[#fefefe] cursor-pointer"
            >
              <Facebook size={22} />
            </a>
            <a
              href="#"
              aria-label="YouTube"
              className="text-[#fefefe] cursor-pointer"
            >
              <Youtube size={22} />
            </a>
          </div>
        </div>
        {/* Center section */}
        <div className="flex flex-wrap justify-between md:justify-start gap-10">
          <div className="md:w-[160px] border-b-1 border-b-gray-700 md:border-b-0 pb-4 md:pb-0 w-full">
            <div className="flex justify-between w-full">
              <h3 className="font-medium mb-4 poppins text-[16px] text-[#fefefe]">
                Page
              </h3>
              <button
                onClick={() => toggleSection("page")}
                className="text-white md:hidden block font-medium cursor-pointer"
                aria-label={
                  isOpen.page ? "Collapse Page section" : "Expand Page section"
                }
              >
                {isOpen.page ? (
                  <ChevronUpIcon size={20} />
                ) : (
                  <ChevronDownIcon size={20} />
                )}
              </button>
            </div>
            <ul
              className={`${
                isOpen.page ? "block" : "hidden"
              } md:block space-y-3 text-[14px] text-[#fefefe]`}
            >
              <li>
                <Link to="/" className="hover:text-white transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/prod" className="hover:text-white transition">
                  Product
                </Link>
              </li>
              <li>
                <Link to="/service" className="hover:text-white transition">
                  Service
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div className="md:w-[160px] border-b-1 border-b-gray-700 md:border-b-0 pb-4 md:pb-0 w-full">
            <div className="flex justify-between w-full">
              <h3 className="font-medium mb-4 poppins text-[16px] text-[#fefefe]">
                Info
              </h3>
              <button
                onClick={() => toggleSection("info")}
                className="text-white md:hidden block font-medium cursor-pointer"
                aria-label={
                  isOpen.info ? "Collapse Info section" : "Expand Info section"
                }
              >
                {isOpen.info ? (
                  <ChevronUpIcon size={20} />
                ) : (
                  <ChevronDownIcon size={20} />
                )}
              </button>
            </div>
            <ul
              className={`${
                isOpen.info ? "block" : "hidden"
              } md:block space-y-3 text-[14px] text-[#fefefe]`}
            >
              <li>
                <a href="#" className="hover:text-white transition">
                  Shipping Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition">
                  Return & Refund
                </a>
              </li>{" "}
              <li className="hover:text-white transition">
                Terms and Condition
              </li>{" "}
              <li className="hover:text-white py-2 transition">
                Privacy Policy
              </li>{" "}
              <li>
                <a href="#" className="hover:text-white transition">
                  FAQs
                </a>
              </li>
            </ul>
          </div>
          <div className="md:w-[160px] w-full">
            <div className="flex justify-between w-full">
              <h3 className="font-medium mb-4 poppins text-[16px] text-[#fefefe]">
                Office
              </h3>
              <button
                onClick={() => toggleSection("office")}
                className="text-white md:hidden block font-medium cursor-pointer"
                aria-label={
                  isOpen.office
                    ? "Collapse Office section"
                    : "Expand Office section"
                }
              >
                {isOpen.office ? (
                  <ChevronUpIcon size={20} />
                ) : (
                  <ChevronDownIcon size={20} />
                )}
              </button>
            </div>
            <ul
              className={`${
                isOpen.office ? "block" : "hidden"
              } md:block space-y-1.5 text-[14px] text-[#fefefe]`}
            >
              <li>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
                perferendis possimus sequi aut beatae
              </li>
              <li>Lagos</li>
              <li className="mt-3">+234 8000000000</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Divider */}
      <div className="border-t border-gray-700 mt-10 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        {/* Mobile view */}
        <div className="flex flex-col gap-6 md:hidden">
          {/* Payment icons */}

          {/* Privacy Policy & Terms */}
          <ul className="flex gap-4 text-[#6C7275] w-fit mx-auto poppins font-normal text-[12px]">
            <Link to="/privacy">
              <li className="hover:text-white transition">Privacy Policy</li>{" "}
            </Link>
            <Link to="/term">
              <li className="hover:text-white transition">
                Terms & Conditions
              </li>
            </Link>
          </ul>
          {/* Copyright */}
          <div className="text-[#E8ECEF] pop Pins text-center font-normal text-[12px]">
            Copyright © 2025 Ade Store. All rights reserved
          </div>
        </div>
        {/* Laptop view  */}
        <div className="hidden md:flex w-full md:items-center md:justify-between gap-6">
          <div className="text-[#E8ECEF] poppins font-normal text-[12px]">
            Copyright © 2025 KB Mart. All rights reserved |
            <Link to="/privacy">
              <p className="text-[#6C7275] ml-1">Privacy Policy</p>{" "}
            </Link>
            <Link to="/term">
              <p className="text-[#6C7275] ml-1">Terms & Conditions</p>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
