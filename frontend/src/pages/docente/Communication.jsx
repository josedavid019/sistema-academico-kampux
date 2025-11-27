import React, { useState } from "react";
import SectionHeader from "../../components/SectionHeader";

export function DocenteCommunication() {
  const [messages, setMessages] = useState([
    { id: 1, from: "Estudiante A", text: "Consulta sobre la tarea" },
  ]);
  const [text, setText] = useState("");

  const send = (e) => {
    e.preventDefault();
    if (!text) return;
    setMessages((m) => [...m, { id: Date.now(), from: "Docente (sim)", text }]);
    setText("");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Comunicación"
          subtitle="Mensajería, foros y avisos"
        />

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4">Mensajería</h3>
            <div className="bg-gray-50 p-3 rounded h-64 overflow-auto">
              {messages.map((m) => (
                <div key={m.id} className="mb-2">
                  <strong className="text-sm text-gray-800">{m.from}:</strong>{" "}
                  <span className="text-sm text-gray-700">{m.text}</span>
                </div>
              ))}
            </div>
            <form onSubmit={send} className="mt-3 flex gap-2">
              <input
                className="flex-1 p-2 border rounded"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Escribir mensaje..."
              />
              <button
                className="bg-green-600 text-white px-3 py-1 rounded"
                type="submit"
              >
                Enviar
              </button>
            </form>
          </div>

          <aside className="bg-white rounded-lg shadow p-6">
            <h4 className="font-semibold mb-2">Accesos rápidos</h4>
            <div className="space-y-2 text-sm">
              <button className="block w-full text-left bg-gray-50 p-2 rounded">
                Foros
              </button>
              <button className="block w-full text-left bg-gray-50 p-2 rounded">
                Avisos
              </button>
              <button className="block w-full text-left bg-gray-50 p-2 rounded">
                Solicitar tutoría
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
