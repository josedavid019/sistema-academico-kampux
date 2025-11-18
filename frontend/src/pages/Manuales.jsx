import React from "react";
import { Link } from "react-router-dom";

export function Manuales() {
  const manuales = [
    {
      id: 1,
      title: "Manual de Uso - Plataforma Kampux",
      description: "Guía completa para comenzar a usar la plataforma",
      category: "Principiante",
      icon: "📖",
    },
    {
      id: 2,
      title: "Guía de Navegación",
      description: "Aprende a navegar por todas las funcionalidades",
      category: "Intermedio",
      icon: "🗺️",
    },
    {
      id: 3,
      title: "Preguntas Frecuentes (FAQ)",
      description: "Respuestas a las dudas más comunes",
      category: "Principiante",
      icon: "❓",
    },
    {
      id: 4,
      title: "Solución de Problemas",
      description: "Resuelve los problemas técnicos más comunes",
      category: "Avanzado",
      icon: "🔧",
    },
    {
      id: 5,
      title: "Guía de Seguridad",
      description: "Protege tu cuenta y datos personales",
      category: "Importante",
      icon: "🔒",
    },
    {
      id: 6,
      title: "Tips y Trucos",
      description: "Descubre funcionalidades avanzadas",
      category: "Intermedio",
      icon: "💡",
    },
  ];

  const getCategoryColor = (category) => {
    const colors = {
      Principiante: "bg-green-100 text-green-800",
      Intermedio: "bg-yellow-100 text-yellow-800",
      Avanzado: "bg-red-100 text-red-800",
      Importante: "bg-blue-100 text-blue-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6"
        >
          ← Volver al Dashboard
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          📚 Manuales
        </h1>
        <p className="text-gray-600 text-lg">
          Encuentra todos los manuales y guías que necesitas para aprovechar al máximo Kampux
        </p>
      </div>

      {/* Grid de Manuales */}
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {manuales.map((manual) => (
            <div
              key={manual.id}
              className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 cursor-pointer hover:border-blue-500 border-2 border-transparent"
            >
              <div className="text-4xl mb-4">{manual.icon}</div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {manual.title}
              </h3>

              <p className="text-gray-600 text-sm mb-4">{manual.description}</p>

              <div className="flex items-center justify-between">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(
                    manual.category
                  )}`}
                >
                  {manual.category}
                </span>
                <button className="text-blue-600 hover:text-blue-700 font-semibold">
                  Ver →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto mt-12">
        <div className="bg-blue-600 rounded-lg text-white p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">¿No encontraste lo que buscas?</h2>
          <p className="mb-6">Contacta con nuestro equipo de soporte para ayuda personalizada</p>
          <button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-2 px-6 rounded-lg transition">
            Contactar Soporte
          </button>
        </div>
      </div>
    </div>
  );
}
