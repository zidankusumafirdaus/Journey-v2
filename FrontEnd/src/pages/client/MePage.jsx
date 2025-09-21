import React from "react";
import Sidebar from "../../components/layout/Slidebar";

const MePage = () => {
  return (
    <section
      className="relative flex flex-col items-center justify-center text-center min-h-screen 
      bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700
      px-4 sm:px-6 md:px-12"
    >
      <Sidebar />

      {/* Title */}
      <h1 className="max-w-3xl px-1 mx-auto text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-100 leading-tight text-center">
        Hi, I'm <span className="text-gray-300">Zidan Kusuma</span>
      </h1>

      {/* Subtitle */}
      <p className="mt-6 max-w-md sm:max-w-lg md:max-w-xl px-1 mx-auto text-base sm:text-lg md:text-xl text-gray-400 leading-relaxed text-center">
        An ordinary informatic student who studying web development. I am studying web development to change (my) world.
      </p>
    </section>
  );
};

export default MePage;