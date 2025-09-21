import React from "react";

const NotFound = () => {
  return (
    <section
      className="relative flex flex-col items-center justify-center text-center min-h-screen 
      bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 px-4"
    >
      <div className="p-10 rounded-xl shadow text-center space-y-8 max-w-lg bg-gray-800/40 backdrop-blur-md">
        <div className="text-6xl sm:text-7xl md:text-8xl font-bold text-transparent bg-gradient-to-r from-gray-300 to-gray-500 bg-clip-text">
          404
        </div>
        <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-100">
          Page not found
        </h1>
      </div>
    </section>
  );
};

export default NotFound;