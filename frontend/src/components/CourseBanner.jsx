import React from "react";

export function CourseBanner({ title }) {
  return (
    <div className="relative rounded-t-lg overflow-hidden h-56">
      <img
        src={`https://via.placeholder.com/1600x320/1e3a8a/ffffff?text=${encodeURIComponent(
          title
        )}`}
        alt="banner"
        className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/30 mix-blend-multiply" />
      <div className="absolute inset-0 flex items-center">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-white text-xl sm:text-2xl font-bold drop-shadow">
            {title}
          </h2>
          <p className="text-sm text-white/80 mt-1">
            Contenido del curso — plataforma de ejemplo
          </p>
        </div>
      </div>
    </div>
  );
}

export default CourseBanner;
