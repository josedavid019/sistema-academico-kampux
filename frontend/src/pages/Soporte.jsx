import React, { useState } from "react";
import { Link } from "react-router-dom";

export function Soporte() {
  const [openFAQ, setOpenFAQ] = useState(null);

  const supportChannels = [
    {
      id: 1,
      title: "Chat en Vivo",
      description: "Habla directamente con un agente",
      icon: "💬",
      time: "5 minutos",
      available: true,
    },
    {
      id: 2,
      title: "Correo Electrónico",
      description: "Envía tu consulta por email",
      icon: "📧",
      time: "2-4 horas",
      available: true,
    },
    {
      id: 3,
      title: "Teléfono",
      description: "Llamada directa con soporte",
      icon: "☎️",
      time: "10 minutos",
      available: true,
    },
    {
      id: 4,
      title: "Centro de Ayuda",
      description: "Base de conocimiento y artículos",
      icon: "📖",
      time: "Instantáneo",
      available: true,
    },
  ];

  const faqItems = [
    {
      id: 1,
      question: "¿Cómo cambio mi contraseña?",
      answer:
        "Ve a Configuración > Seguridad > Cambiar Contraseña e ingresa tu contraseña actual y la nueva.",
    },
    {
      id: 2,
      question: "¿Cómo descargo mis calificaciones?",
      answer: "En el Dashboard, ve a Calificaciones > Descargar PDF. Puedes descargar por semestre.",
    },
    {
      id: 3,
      question: "¿Cómo contacto a mi profesor?",
      answer:
        "En la sección de Herramientas > Mensajería, selecciona tu profesor y envía un mensaje directo.",
    },
    {
      id: 4,
      question: "¿Cuáles son los horarios de soporte?",
      answer: "Ofrecemos soporte de lunes a viernes, 8:00 AM - 6:00 PM. Consulta nuestra sección de horarios.",
    },
    {
      id: 5,
      question: "¿Puedo recuperar archivos eliminados?",
      answer: "Sí, tienes 30 días para recuperar archivos eliminados. Ve a Configuración > Papelera.",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
          ← Volver al Dashboard
        </Link>

        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">🎧 Soporte</h1>
        <p className="text-gray-600 text-lg">
          Estamos aquí para ayudarte. Elige tu canal de soporte preferido
        </p>
      </div>

      {/* Support Channels Grid */}
      <div className="max-w-7xl mx-auto mb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {supportChannels.map((channel) => (
            <div
              key={channel.id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow border-l-4 border-blue-500"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="text-5xl">{channel.icon}</div>
                {channel.available && (
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-semibold">
                    Disponible
                  </span>
                )}
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">{channel.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{channel.description}</p>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">Tiempo respuesta: {channel.time}</span>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition font-medium text-sm">
                  Contactar
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="max-w-7xl mx-auto mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-6">❓ Preguntas Frecuentes</h2>

        <div className="space-y-4">
          {faqItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => setOpenFAQ(openFAQ === item.id ? null : item.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
              >
                <h3 className="text-lg font-semibold text-gray-900">{item.question}</h3>
                <span className="text-2xl text-gray-600">
                  {openFAQ === item.id ? "−" : "+"}
                </span>
              </button>

              {openFAQ === item.id && (
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-700">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg text-white p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">¿Necesitas ayuda inmediata?</h2>
          <p className="mb-6">Nuestro equipo de soporte está disponible para ayudarte</p>
          <button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-2 px-6 rounded-lg transition">
            Iniciar Chat en Vivo
          </button>
        </div>
      </div>
    </div>
  );
}
