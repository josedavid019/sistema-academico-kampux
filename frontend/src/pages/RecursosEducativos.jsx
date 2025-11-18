import React from "react";
import { Link } from "react-router-dom";

export function RecursosEducativos() {
  const recursos = [
    {
      id: 1,
      title: "SIRA",
      description: "Sistema de Información y Registro Académico",
      icon: "📊",
      color: "bg-blue-50",
      borderColor: "border-blue-200",
      status: "Activo",
    },
    {
      id: 2,
      title: "EBSCO",
      description: "Base de datos de investigación académica",
      icon: "📚",
      color: "bg-purple-50",
      borderColor: "border-purple-200",
      status: "Activo",
    },
    {
      id: 3,
      title: "eLibro",
      description: "Acceso a libros digitales y recursos de lectura",
      icon: "📖",
      color: "bg-green-50",
      borderColor: "border-green-200",
      status: "Activo",
    },
    {
      id: 4,
      title: "Reservas de Biblioteca",
      description: "Sistema de reserva de libros y materiales",
      icon: "🏫",
      color: "bg-orange-50",
      borderColor: "border-orange-200",
      status: "Activo",
    },
  ];

  const statistics = [
    { label: "Libros Disponibles", value: "15,234", icon: "📚" },
    { label: "Artículos Académicos", value: "8,567", icon: "📄" },
    { label: "Usuarios Activos", value: "2,456", icon: "👥" },
    { label: "Bases de Datos", value: "12", icon: "💾" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
          ← Volver al Dashboard
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">👥 Recursos Educativos</h1>
        <p className="text-gray-600 text-lg">
          Accede a nuestras bases de datos y recursos para potenciar tu aprendizaje
        </p>
      </div>

      {/* Statistics */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {statistics.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-4xl mb-2">{stat.icon}</div>
              <p className="text-gray-600 text-sm mb-2">{stat.label}</p>
              <p className="text-3xl font-bold text-blue-600">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Resources Grid */}
      <div className="max-w-7xl mx-auto mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recursos Principales</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recursos.map((recurso) => (
            <div
              key={recurso.id}
              className={`${recurso.color} border-l-4 ${recurso.borderColor} rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-5xl">{recurso.icon}</div>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                  {recurso.status}
                </span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">{recurso.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{recurso.description}</p>

              <button className="bg-blue-600 text-white hover:bg-blue-700 transition px-4 py-2 rounded-lg font-medium text-sm">
                Acceder →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Tips Section */}
      <div className="max-w-7xl mx-auto mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">💡 Consejos de Uso</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Maximiza tus búsquedas</h3>
            <p className="text-gray-600 text-sm">
              Usa palabras clave específicas y filtros avanzados para encontrar exactamente lo que necesitas
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Guarda tus favoritos</h3>
            <p className="text-gray-600 text-sm">
              Crea listas de lectura personalizadas para acceso rápido a tus recursos más usados
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Acceso desde cualquier lugar</h3>
            <p className="text-gray-600 text-sm">
              Todos nuestros recursos están disponibles 24/7 desde cualquier dispositivo
            </p>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-green-600 to-teal-600 rounded-lg text-white p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">¿Necesitas ayuda para acceder a un recurso?</h2>
          <p className="mb-6">Nuestro equipo de soporte está disponible para asistirte</p>
          <button className="bg-white text-green-600 hover:bg-gray-100 font-semibold py-2 px-6 rounded-lg transition">
            Contactar Soporte
          </button>
        </div>
      </div>
    </div>
  );
}
