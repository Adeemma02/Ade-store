import React, { useRef, useState, useEffect } from "react";
import toy from "../assets/toy.jpg";
import { Link } from "react-router-dom";

const categories = [
  {
    name: "Electronics",
    itemsLeft: "200+ items left",
    path: "/category/electronics",
  },
  { name: "Fashion", itemsLeft: "150+ items left", path: "/category/fashion" },
  { name: "Sport", itemsLeft: "100+ items left", path: "/category/sport" },
  { name: "Health", itemsLeft: "80+ items left", path: "/category/health" },
  { name: "Toy", itemsLeft: "120+ items left", path: "/category/toy" },
  {
    name: "Automotives",
    itemsLeft: "60+ items left",
    path: "/category/automotives",
  },
  {
    name: "Accesories",
    itemsLeft: "90+ items left",
    path: "/category/accesories",
  },
  {
    name: "Computer",
    itemsLeft: "110+ items left",
    path: "/category/computer",
  },
  {
    name: "Wearables",
    itemsLeft: "70+ items left",
    path: "/category/wearables",
  },
  { name: "Camera", itemsLeft: "50+ items left", path: "/category/camera" },
];

// Function to generate category-appropriate images
const getCategoryImage = (categoryName) => {
  const imageMap = {
    Electronics:
      "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop",
    Fashion:
      "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop",
    Sport:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop",
    Health:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop",
    Toy: toy,
    Automotives:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=300&fit=crop",
    Accesories:
      "https://images.unsplash.com/photo-1523779917675-b6ed3a42a561?w=400&h=300&fit=crop",
    Computer:
      "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=300&fit=crop",
    Wearables:
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400&h=300&fit=crop",
    Camera:
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=300&fit=crop",
  };

  return (
    imageMap[categoryName] ||
    "https://images.unsplash.com/photo-1560472355-536de3962603?w=400&h=300&fit=crop"
  );
};

const Shop = () => {
  const scrollRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    const maxScrollLeft = el.scrollWidth - el.clientWidth;
    const progress =
      maxScrollLeft === 0 ? 100 : (scrollLeft / maxScrollLeft) * 100;
    setScrollProgress(progress);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.addEventListener("scroll", handleScroll);
    // Set initial progress
    handleScroll();
    return () => el?.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="w-full py-8 md:py-12">
      {/* Header */}
      <div className="flex justify-between items-center px-4 md:px-8 lg:px-12 mb-6">
        <h2 className="text-xl md:text-3xl font-semibold poppins text-[#121417]">
          Shop by Category
        </h2>
        <div className="hidden sm:block">
          {/* <button className="text-sm text-[#3D99F5] cursor-pointer hover:underline flex items-center gap-1 group">
            View More{" "}
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button> */}
        </div>
      </div>

      {/* Slider */}
      <div className="relative px-4 md:px-8 lg:px-12">
        <div
          ref={scrollRef}
          className="flex overflow-x-scroll gap-4 scrollbar-hide scroll-smooth"
          style={{ WebkitOverflowScrolling: "touch" }} // for iOS smooth scrolling
        >
          {categories.map(({ name, itemsLeft, path }) => (
            <Link to={path}>
              {" "}
              <div
                key={name}
                className="min-w-[160px] sm:min-w-[180px] md:min-w-[200px] lg:min-w-[220px] h-48 relative rounded-xl flex-shrink-0 cursor-pointer group overflow-hidden"
              >
                <img
                  src={getCategoryImage(name)}
                  alt={name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 bg-opacity-50 flex flex-col justify-center items-center text-center px-2 transition-opacity group-hover:bg-opacity-60">
                  <span className="text-white text-base md:text-lg font-semibold poppins">
                    {name}
                  </span>
                  <span className="text-gray-300 text-sm md:text-base mt-1 poppins">
                    {itemsLeft}
                  </span>
                </div>
              </div>{" "}
            </Link>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="w-full h-2 bg-gray-200 mt-6 rounded overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${scrollProgress}%` }}
          ></div>
        </div>
      </div>
    </section>
  );
};

export default Shop;
