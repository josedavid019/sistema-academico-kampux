import React from "react";
import { Link } from "react-router-dom";

export function Herramientas() {
  const herramientas = [
    {
      id: 1,
      title: "Calendario Académico",
      description: "Gestiona fechas importantes y eventos",
      icon: "📅",
      category: "Gestión",
      color: "bg-blue-50",
    },
    {
      id: 2,
      title: "Expediente Académico",
      description: "Consulta tu historial académico",
      icon: "📋",
      category: "Académico",
      color: "bg-purple-50",
    },
    {
      id: 3,
      title: "Generador de Certificados",
      description: "Descarga certificados en PDF",
      icon: "📜",
      category: "Documentos",
      color: "bg-green-50",
    },
    {
      id: 4,
      title: "Mensajería",
      description: "Comunícate con profesores y compañeros",
      icon: "💬",
      category: "Comunicación",
      color: "bg-orange-50",
    },
    {
      id: 5,
      title: "Portal de Pagos",
      description: "Gestiona tus pagos y matrículas",
      icon: "💳",
      category: "Financiero",
      color: "bg-red-50",
    },
    {
      id: 6,
      title: "Horario de Clases",
      description: "Visualiza tu horario personalizado",
      icon: "⏰",
      category: "Gestión",
      color: "bg-cyan-50",
    },
    {
      id: 7,
      title: "Solicitud de Documentos",
      description: "Solicita certificados y documentos",
      icon: "📄",
      category: "Documentos",
      color: "bg-yellow-50",
    },
    {
      id: 8,
      title: "Encuestas Académicas",
      description: "Participa en evaluaciones de cursos",
      icon: "📊",
      category: "Académico",
      color: "bg-indigo-50",
    },
  ];

  const categories = [...new Set(herramientas.map((h) => h.category))];

  const stats = [
    { label: "Herramientas Disponibles", value: "8", icon: "🛠️" },
    { label: "Usuarios Activos", value: "3,456", icon: "👥" },
    { label: "Transacciones Mensuales", value: "12,345", icon: "📈" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
          ← Volver al Dashboard
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">🛠️ Herramientas</h1>
        <p className="text-gray-600 text-lg">Accede a todas las herramientas que necesitas para tu experiencia académica</p>
      </div>

      {/* Statistics */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="text-4xl mb-2">{stat.icon}</div>
              <p className="text-gray-600 text-sm mb-2">{stat.label}</p>
              <p className="text-3xl font-bold text-blue-600">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Tools Grid by Category */}
      {categories.map((category) => (
        <div key={category} className="max-w-7xl mx-auto mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            {category === "Gestión"
              ? "📋 Gestión"
              : category === "Académico"
              ? "🎓 Académico"
              : category === "Documentos"
              ? "📄 Documentos"
              : category === "Comunicación"
              ? "💬 Comunicación"
              : "💰 Financiero"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {herramientas
              .filter((h) => h.category === category)
              .map((herramienta) => (
                <div
                  key={herramienta.id}
                  className={`${herramienta.color} rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer border-l-4 border-blue-500`}
                >
                  <div className="text-4xl mb-3">{herramienta.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{herramienta.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{herramienta.description}</p>
                  <button className="text-blue-600 hover:text-blue-700 font-semibold text-sm">
                    Acceder →
                  </button>
                </div>
              ))}
          </div>
        </div>
      ))}

      {/* Usage Guide */}
      <div className="max-w-7xl mx-auto mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">📚 Guía de Uso</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">¿Cómo usar estas herramientas?</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-600 text-sm">
              <li>Selecciona la herramienta que necesitas</li>
              <li>Haz clic en "Acceder" para abrir la herramienta</li>
              <li>Sigue las instrucciones en pantalla</li>
              <li>Si necesitas ayuda, contacta con soporte</li>
            </ol>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Requisitos de Acceso</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600 text-sm">
              <li>Ser estudiante activo de la universidad</li>
              <li>Tener una cuenta válida en la plataforma</li>
              <li>Conexión a internet estable</li>
              <li>Navegador web actualizado (Chrome, Firefox, Safari)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg text-white p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">¿Necesitas orientación sobre una herramienta?</h2>
          <p className="mb-6">Mira nuestros videos tutoriales o contacta al soporte técnico</p>
          <button className="bg-white text-purple-600 hover:bg-gray-100 font-semibold py-2 px-6 rounded-lg transition">
            Ver Tutoriales
          </button>
        </div>
      </div>
    </div>
  );
}
