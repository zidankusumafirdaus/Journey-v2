import React from "react";
import { Link } from "react-router-dom";

const QuestCard = ({ project }) => {
  return (
    <div
      className="bg-slate-900/50 border border-slate-700 rounded-2xl shadow-lg 
                overflow-hidden transition-all duration-500 
                hover:border-slate-500 hover:shadow-[0_0_20px_rgba(144,158,180,0.08)] 
                flex flex-col"
    >
      {/* Image */}
      <div className="relative w-full aspect-[16/9] px-3 pt-3">
        <div className="w-full h-full rounded-xl overflow-hidden border border-slate-700">
          <img
            src={project.foto}
            alt={project.judul}
            className="w-full h-full object-cover brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-transparent rounded-xl"></div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-3.5 text-left flex flex-col flex-grow">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-100">
          {project.judul}
        </h2>

        <div className="flex flex-wrap gap-1.5 mt-2">
          {project.teknologi.split(",").map((tech, index) => (
            <span
              key={index}
              className="px-2 py-0.5 text-[9px] sm:text-[10px] md:text-xs 
                        font-normal tracking-wide rounded-md 
                        bg-slate-800 text-gray-300 
                        border border-slate-700/60 shadow-sm"
            >
              {tech.trim()}
            </span>
          ))}
        </div>

        <p className="text-gray-400 mt-5 text-xs sm:text-sm md:text-base">
          {project.deskripsi}
        </p>

        <p className="text-gray-500 text-[10px] sm:text-xs md:text-sm mt-1">
          {project.tanggal}/{project.bulan}/{project.tahun}
        </p>

        {/* Link */}
        <div className="mt-auto pt-5">
          {project.link && (
            <Link
              to={project.link}
              className="mt-2 mb-1 block w-full text-center py-2 
                        text-xs sm:text-sm md:text-base font-medium rounded-xl 
                        bg-gray-700 text-gray-100 
                        hover:bg-gray-600 hover:text-white transition-all duration-300"
            >
              Link
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestCard;