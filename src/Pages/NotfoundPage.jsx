import React from "react";
import { useNavigate } from "react-router-dom";

const NotfoundPage = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center p-4">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="mb-6 text-gray-600">
        Sorry, the page you are looking for does not exist.
      </p>
      <button
        onClick={goHome}
        className="bg-[#3D99F5] text-white px-4 py-2 rounded hover:bg-blue-500 cursor-pointer transition"
      >
        Go Back Home
      </button>
    </div>
  );
};

export default NotfoundPage;
