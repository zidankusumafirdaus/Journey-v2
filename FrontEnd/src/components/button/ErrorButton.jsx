import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHome } from "react-icons/fa";

export const ErrorButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/")}
      className="flex items-center gap-2 px-6 py-2 bg-gray-600 text-white 
                 rounded-lg shadow hover:bg-gray-500 transition mx-auto 
                 text-sm sm:text-base md:text-lg font-medium"
    >
      <FaHome className="w-4 h-4 sm:w-5 sm:h-5" />
      <span>Home</span>
    </button>
  );
};