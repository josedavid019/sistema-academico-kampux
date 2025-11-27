import React, { useState } from "react";
import SectionHeader from "../../components/SectionHeader";

export function CoordinadorDocentes() {
  const [docentes] = useState([
    {
      id: 1,
      nombre: "Dr. Ronald Castro",
      cedula: "1234567890",
      email: "ronald.castro@universidad.edu",
      especialidad: "Ingeniería de Software",
      horasPorSemana: 20,
      disponibilidad: ["Lunes 8-12", "Miércoles 14-18", "Viernes 10-12"],
      cursosAsignados: [
        {
          id: 1,
          nombre: "Ingeniería de Software II",
          grupo: "A",
          estudiantes: 35,
        },
      ],
    },
    {
      id: 2,
      nombre: "Dra. Laura Martínez",
      cedula: "0987654321",
      email: "laura.martinez@universidad.edu",
      especialidad: "Bases de Datos",
      horasPorSemana: 18,
      disponibilidad: ["Martes 8-12", "Jueves 14-18"],
      cursosAsignados: [
        { id: 2, nombre: "Bases de Datos", grupo: "B", estudiantes: 28 },
      ],
    },
    {
      id: 3,
      nombre: "Ing. Carlos Pérez",
      cedula: "5544332211",
      email: "carlos.perez@universidad.edu",
      especialidad: "Redes",
      horasPorSemana: 22,
      disponibilidad: ["Lunes 14-18", "Miércoles 8-12", "Viernes 14-18"],
      cursosAsignados: [
        {
          id: 3,
          nombre: "Redes de Computadores",
          grupo: "A",
          estudiantes: 22,
        },
      ],
    },
  ]);

  const [cursosDisponibles] = useState([
    { id: 1, nombre: "Ingeniería de Software II", grupo: "B", capacidad: 40 },
    { id: 2, nombre: "Auditoría Informática", grupo: "A", capacidad: 30 },
    { id: 3, nombre: "Seguridad Informática", grupo: "A", capacidad: 25 },
    { id: 4, nombre: "Programación Avanzada", grupo: "C", capacidad: 35 },
  ]);

  const [asignaciones, setAsignaciones] = useState([
    {
      id: 1,
      docente: "Dr. Ronald Castro",
      curso: "Ingeniería de Software II",
      grupo: "A",
      horas: 4,
      dia: "Lunes",
      horaInicio: "8:00",
    },
    {
      id: 2,
      docente: "Dra. Laura Martínez",
      curso: "Bases de Datos",
      grupo: "B",
      horas: 4,
      dia: "Martes",
      horaInicio: "8:00",
    },
  ]);

  const [mostrarModal, setMostrarModal] = useState(false);
  const [modalMode, setModalMode] = useState("crear");
  const [seleccionados, setSeleccionados] = useState({
    docente: "",
    curso: "",
    grupo: "",
    horas: 4,
    dia: "",
    horaInicio: "",
  });

  const handleGuardarAsignacion = () => {
    if (
      seleccionados.docente &&
      seleccionados.curso &&
      seleccionados.dia &&
      seleccionados.horaInicio
    ) {
      const nuevaAsignacion = {
        id: Math.max(...asignaciones.map((a) => a.id), 0) + 1,
        docente: docentes.find((d) => d.id === parseInt(seleccionados.docente))
          ?.nombre,
        curso: cursosDisponibles.find(
          (c) => c.id === parseInt(seleccionados.curso)
        )?.nombre,
        grupo: cursosDisponibles.find(
          (c) => c.id === parseInt(seleccionados.curso)
        )?.grupo,
        horas: seleccionados.horas,
        dia: seleccionados.dia,
        horaInicio: seleccionados.horaInicio,
      };

      setAsignaciones([...asignaciones, nuevaAsignacion]);
      setMostrarModal(false);
      setSeleccionados({
        docente: "",
        curso: "",
        grupo: "",
        horas: 4,
        dia: "",
        horaInicio: "",
      });
    }
  };

  const handleEliminarAsignacion = (id) => {
    setAsignaciones(asignaciones.filter((a) => a.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          title="Asignación de Docentes"
          subtitle="Gestiona la asignación de docentes a cursos y sus disponibilidades"
        />

        {/* Botón de Nueva Asignación */}
        <div className="mb-6">
          <button
            onClick={() => {
              setModalMode("crear");
              setMostrarModal(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition"
          >
            + Nueva Asignación
          </button>
        </div>

        {/* Grid de Docentes */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {docentes.map((docente) => (
            <div key={docente.id} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {docente.nombre}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {docente.especialidad}
                  </p>
                </div>
              </div>

              <div className="space-y-3 border-t border-gray-200 pt-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Email:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {docente.email}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Horas/Semana:</span>
                  <span className="text-sm font-medium text-gray-900">
                    {docente.horasPorSemana}h
                  </span>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-2">Disponibilidad:</p>
                  <div className="flex flex-wrap gap-2">
                    {docente.disponibilidad.map((disp, idx) => (
                      <span
                        key={idx}
                        className="inline-block bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs"
                      >
                        {disp}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-2">
                    Cursos Asignados:
                  </p>
                  {docente.cursosAsignados.length > 0 ? (
                    <div className="space-y-1">
                      {docente.cursosAsignados.map((curso, idx) => (
                        <p key={idx} className="text-sm text-gray-900">
                          • {curso.nombre} (Grupo {curso.grupo}) -{" "}
                          {curso.estudiantes} est.
                        </p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500">
                      Sin cursos asignados
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabla de Asignaciones */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Asignaciones Actuales ({asignaciones.length})
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Docente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Curso
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Grupo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Día
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Hora
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Horas
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Acción
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {asignaciones.map((asignacion) => (
                  <tr key={asignacion.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      {asignacion.docente}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {asignacion.curso}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {asignacion.grupo}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {asignacion.dia}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {asignacion.horaInicio}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {asignacion.horas}h
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        onClick={() => handleEliminarAsignacion(asignacion.id)}
                        className="text-red-600 hover:text-red-800 font-medium"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal Nueva Asignación */}
        {mostrarModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-lg max-w-2xl w-full p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Nueva Asignación de Docente
              </h2>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Docente *
                  </label>
                  <select
                    value={seleccionados.docente}
                    onChange={(e) =>
                      setSeleccionados({
                        ...seleccionados,
                        docente: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Seleccionar docente</option>
                    {docentes.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.nombre} ({d.especialidad})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Curso *
                  </label>
                  <select
                    value={seleccionados.curso}
                    onChange={(e) =>
                      setSeleccionados({
                        ...seleccionados,
                        curso: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Seleccionar curso</option>
                    {cursosDisponibles.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nombre} - Grupo {c.grupo}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Día *
                    </label>
                    <select
                      value={seleccionados.dia}
                      onChange={(e) =>
                        setSeleccionados({
                          ...seleccionados,
                          dia: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Seleccionar</option>
                      <option>Lunes</option>
                      <option>Martes</option>
                      <option>Miércoles</option>
                      <option>Jueves</option>
                      <option>Viernes</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Hora Inicio *
                    </label>
                    <input
                      type="time"
                      value={seleccionados.horaInicio}
                      onChange={(e) =>
                        setSeleccionados({
                          ...seleccionados,
                          horaInicio: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Horas por Semana
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="20"
                    value={seleccionados.horas}
                    onChange={(e) =>
                      setSeleccionados({
                        ...seleccionados,
                        horas: parseInt(e.target.value),
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={handleGuardarAsignacion}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition"
                >
                  Guardar Asignación
                </button>
                <button
                  onClick={() => setMostrarModal(false)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 px-4 py-2 rounded-lg font-medium transition"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
