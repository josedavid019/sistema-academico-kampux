import React from "react";
import { Link } from "react-router-dom";

export function Home() {
  const menuItems = [
    {
      id: 1,
      title: "Manuales",
      description: "Da clic aquí",
      icon: "📚",
      color: "bg-blue-50",
      borderColor: "border-blue-200",
      link: "/manuales",
    },
    {
      id: 2,
      title: "Soporte",
      description: "Da clic aquí",
      icon: "🎧",
      color: "bg-orange-50",
      borderColor: "border-orange-200",
      link: "/soporte",
    },
    {
      id: 3,
      title: "Recursos educativos",
      description:
        "Reservas | Sira\nBase de datos | EBSCO\nBase de datos | eLibro",
      icon: "👥",
      color: "bg-green-50",
      borderColor: "border-green-200",
      link: "/recursos-educativos",
    },
    {
      id: 4,
      title: "Herramientas",
      description: "Da clic aquí",
      icon: "🛠️",
      color: "bg-purple-50",
      borderColor: "border-purple-200",
      link: "/herramientas",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      {/* Header Section */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left side - Title and Description */}
          <div className="md:pr-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Plataforma Virtual
              <br />
              <span className="text-blue-600">Kampux</span>
            </h1>
            <p className="text-gray-600 text-lg leading-relaxed">
              En este espacio encontrarás todo el apoyo que necesitas para usar
              nuestra plataforma Kampux y aprovechar al máximo las TIC.
            </p>
          </div>

          {/* Right side - Logo Area */}
          <div className="flex justify-center md:justify-end">
            <img
              src="https://i.ibb.co/27cwjzyJ/Logo-Kampux.png"
              alt="Logo Kampux"
              className="h-48 md:h-56 object-contain"
            />
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              to={item.link}
              className={`${item.color} border-2 ${item.borderColor} rounded-lg p-6 hover:shadow-lg transition-all duration-300 transform hover:scale-105 cursor-pointer group`}
            >
              <div className="flex items-start gap-4">
                {/* Icon */}
                <div className="text-5xl flex-shrink-0">{item.icon}</div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition">
                    {item.title}
                  </h3>
                  <p className="text-gray-700 text-sm md:text-base whitespace-pre-line">
                    {item.description}
                  </p>
                </div>

                {/* Arrow */}
                <div className="flex-shrink-0 text-blue-600 text-2xl group-hover:translate-x-1 transition">
                  →
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="max-w-7xl mx-auto mt-12">
        <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            ¿Necesitas ayuda?
          </h2>
          <p className="text-gray-600 mb-4">
            Nuestra plataforma está diseñada para ser intuitiva y fácil de usar.
            Si tienes alguna pregunta o necesitas asistencia, no dudes en
            contactar a nuestro equipo de soporte.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition">
            Contactar Soporte
          </button>
        </div>
      </div>
    </div>
  );
}
