import React from "react";
// import newsletter from '../assets/newsletter.png'
import { Mail } from "lucide-react";

const Newsletter = () => {
  // const backgroundImage = newsletter
  return (
    <div
      className="bg-cover py-18 px-5 bg-[#3D99F5]  bg-no-repeat bg-center h-fit w-full"
      // style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="max-w-[520px] w-full mx-auto">
        <h1 className="poppins text-white text-[20px] md:text-[40px] font-medium text-center mb-0">
          Join Our Newsletter
        </h1>
        <p className="text-center text-normal mt-0 mb:text-[18px] text-sm text-[#fefefe] mb-6">
          Sign up for deals, new products and promotions
        </p>
        <form className="flex items-center pb-2 border-b-1 border-b-[#fefefe] justify-between gap-4">
          <div className="flex gap-x-2 items-center">
            <Mail className="text-white w-fit" size={20} />
            <input
              type="email"
              placeholder="Email address"
              className="border-0 placeholder-white text-white outline-none flex-1  py-2"
            />
          </div>
          <button className="  text-white  cursor-pointer">Signup</button>
        </form>
      </div>
    </div>
  );
};

export default Newsletter;
