import React, { useState, useEffect, memo } from "react";
import { Skeleton } from "@mui/material";
import toy from "../assets/toy.png";
import shoe from "../assets/shoe.png";
import cloth from "../assets/cloth.png";
import { motion, AnimatePresence } from "framer-motion";
// import cloth from "../";

// Motion components
const MotionDiv = motion.div;
const MotionH2 = motion.h2;
const MotionP = motion.p;
const MotionImg = motion.img;

const slides = [
  {
    title: "Step Up Your Style",
    description:
      "Discover the latest shoes for every occasion. Comfort, quality, and unbeatable prices—find your perfect pair today.",
    image: shoe,
    alt: "Trendy Shoes",
    bg: "from-blue-100 to-blue-300",
  },
  {
    title: "Toys for Every Imagination",
    description:
      "Spark creativity and joy with our wide range of toys. Safe, fun, and perfect for kids of all ages.",
    image: toy,
    alt: "Colorful Toy",
    bg: "from-yellow-100 to-yellow-300",
  },
  {
    title: "Fashion for Everyone",
    description:
      "Upgrade your wardrobe with our stylish and affordable clothing collection. Shop the latest trends now.",
    image: cloth,
    alt: "Fashionable Clothes",
    bg: "from-pink-100 to-pink-300",
  },
];

const textVariants = {
  initial: { x: -60, opacity: 0 },
  animate: { x: 0, opacity: 1, transition: { duration: 0.7, ease: "easeOut" } },
  exit: { x: 60, opacity: 0, transition: { duration: 0.5, ease: "easeIn" } },
};

const imageVariants = {
  initial: { x: 60, opacity: 0, scale: 0.95 },
  animate: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.7, ease: "easeOut" },
  },
  exit: {
    x: -60,
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.5, ease: "easeIn" },
  },
};

const Hero = () => {
  const [current, setCurrent] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(Array(slides.length).fill(false));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 9000);
    return () => clearInterval(interval);
  }, []);

  const handleImgLoad = (idx) => {
    setImgLoaded((prev) => {
      const updated = [...prev];
      updated[idx] = true;
      return updated;
    });
  };

  return (
    <div className="w-full min-h-[60vh] md:min-h-[76vh] px-4 md:px-8 lg:px-12 xl:px-14 flex items-center justify-center bg-gradient-to-br from-white to-gray-200 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" />
      <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="w-full md:w-1/2 flex flex-col items-center md:items-start text-center md:text-left space-y-6"
            variants={textVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900 leading-tight">
              {slides[current].title}
            </h2>
            <p className="text-lg md:text-xl text-slate-900 font-light">
              {slides[current].description}
            </p>
            <div className="flex flex-wrap gap-4 mt-2 justify-center md:justify-start">
              <button className="rounded-xl px-8 py-3 text-base font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-shadow shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400">
                Shop Now
              </button>
              <button className="rounded-xl px-8 py-3 text-base font-semibold bg-white text-blue-600 border border-blue-600 hover:bg-blue-50 transition-shadow shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-200">
                Become a Vendor
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="w-full md:w-1/2 flex items-center justify-center relative min-h-[220px] md:min-h-[320px]"
            variants={imageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            {!imgLoaded[current] && (
              <Skeleton
                variant="rectangular"
                className="w-[220px] h-[220px] md:w-[320px] md:h-[320px] rounded-2xl"
                sx={{ zIndex: 10 }}
              />
            )}
            <img
              src={slides[current].image}
              alt={slides[current].alt}
              onLoad={() => handleImgLoad(current)}
              className={`w-[220px] h-[220px] md:w-[320px] md:h-[320px] object-contain rounded-2xl transition-opacity duration-500 ${
                imgLoaded[current] ? "opacity-100" : "opacity-0"
              }`}
              draggable={false}
              loading="eager"
              // style={{
              //   background: "linear-gradient(135deg, #f3f4f6 0%, #e0e7ff 100%)",
              // }}
            />
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, idx) => (
          <button
            key={idx}
            aria-label={`Go to slide ${idx + 1}`}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              current === idx ? "bg-blue-600 scale-110" : "bg-gray-300"
            }`}
            onClick={() => setCurrent(idx)}
          />
        ))}
      </div>
    </div>
  );
};

export default memo(Hero);

