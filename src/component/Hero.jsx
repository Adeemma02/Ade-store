import React, { useState, useEffect, memo } from "react";
import { Skeleton } from "@mui/material";
import herobg from "../assets/hero-bg.jpeg";
import herobg1 from "../assets/hero-bg1.jpeg";
// import herobg2 from "../assets/hero-bg.png";

const Hero = () => {
  const images = [herobg, herobg1];
  const [currentImage, setCurrentImage] = useState(0);
  const [loadedImages, setLoadedImages] = useState(
    Array(images.length).fill(false)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleImageLoad = (index) => {
    setLoadedImages((prev) => {
      const updated = [...prev];
      updated[index] = true;
      return updated;
    });
  };

  return (
    <div className="w-full text-white md:min-h-[76vh] min-h-[50vh] px-4 md:px-8 lg:px-12 xl:px-14  flex flex-col items-center justify-center md:items-start gap-10 md:gap-16 poppins bg-cover bg-center bg-no-repeat relative overflow-hidden">
      <div
        className="absolute inset-0 flex transition-transform duration-1000 ease-in-out"
        style={{
          width: `${images.length * 100}%`,
          transform: `translateX(-${(100 / images.length) * currentImage}%)`,
        }}
      >
        {images.map((img, index) => (
          <div
            key={index}
            className="w-full h-full bg-cover bg-center bg-no-repeat relative"
          >
            {!loadedImages[index] && (
              <Skeleton
                variant="rectangular"
                className="w-full h-full object-cover absolute inset-0"
                sx={{ zIndex: 10 }}
              />
            )}
            <img
              src={img}
              alt={`Hero background ${index + 1}`}
              loading={index === 0 ? "eager" : "lazy"}
              onLoad={() => handleImageLoad(index)}
              className="w-full h-full object-cover absolute inset-0 "
              style={{ zIndex: 9 }}
            />
            <div className="absolute inset-0 bg-black/70 z-10"></div>
          </div>
        ))}
      </div>
      <div className="w-full md:w-2/3 mx-auto  flex flex-col justify-center space-y-6 md:space-y-12 relative z-10">
        <h2 className="text-4xl md:text-5xl text-center font-extrabold leading-tight">
          Shop Everything You Need
        </h2>
        <p className="text-lg md:text-xl text-center font-light ">
          Discover millions of products from trusted sellers worldwide. Fast
          shipping, secure payments, and unbeatable prices.
        </p>
        <div className="flex w-fit mx-auto flex-wrap justify-center flex-row gap-4 sm:gap-6">
          <button className="rounded-xl px-8 py-3 text-base font-semibold bg-white text-[#2563eb] hover:bg-gray-100 transition-shadow shadow-md hover:shadow-lg">
            Get Started
          </button>
          <button className="rounded-xl px-8 py-3 text-base font-semibold bg-white text-[#2563eb] hover:bg-gray-100 transition-shadow shadow-md hover:shadow-lg">
            Become a Vendor
          </button>
        </div>
      </div>
    </div>
  );
};

export default memo(Hero);
