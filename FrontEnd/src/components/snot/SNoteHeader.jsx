import React from "react";

const SNoteHeader = () => {
  return (
    <header className="text-center mb-12">
      <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-100">
        SNot <span className="text-gray-400">Collection</span>
      </h1>
      <p className="mt-4 text-gray-400 max-w-2xl px-10 mx-auto text-center text-sm sm:text-base md:text-lg leading-relaxed">
        I write whatever i want, even if it's like shit. So that's why i made SNot, because this is a Shit Note.
      </p>
    </header>
  );
};

export default SNoteHeader;