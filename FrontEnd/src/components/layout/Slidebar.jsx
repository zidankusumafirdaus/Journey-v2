import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const links = [
    { path: "/me", label: "Me" },
    { path: "/quest", label: "Quest" },
    { path: "/snot", label: "SNot" },
  ];

  return (
    <>
      {/* Hamburger Button */}
      <div className="absolute top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-gray-200 text-base sm:text-lg focus:outline-none"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-24 transform transition-transform duration-300 ease-in-out z-40
        ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <nav className="flex flex-col mt-12 space-y-2 px-3 text-gray-200 text-xs sm:text-sm md:text-base font-normal">
          {links.map((link) => (
            <button
              key={link.path}
              className={`text-left transition-colors duration-200 ${
                location.pathname.startsWith(link.path)
                  ? "text-gray-100 font-semibold" // aktif
                  : "hover:text-gray-400"
              }`}
              onClick={() => {
                navigate(link.path);
                setIsOpen(false);
              }}
            >
              {link.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Overlay Click for Out */}
      {isOpen && (
        <div
          className="fixed inset-0"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;