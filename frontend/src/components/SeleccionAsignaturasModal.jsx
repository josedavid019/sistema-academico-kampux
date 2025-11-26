import React, { useState, useEffect } from "react";

export default function SeleccionAsignaturasModal({
  open,
  onClose,
  asignaturas,
  initiallySelected = [],
  onConfirm,
}) {
  const [selected, setSelected] = useState(new Set(initiallySelected));
  const [filter, setFilter] = useState("");
  const [semester, setSemester] = useState("");

  useEffect(() => {
    setSelected(new Set(initiallySelected));
  }, [initiallySelected, open]);

  useEffect(() => {
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
    return undefined;
  }, [open]);

  if (!open) return null;

  const toggle = (id) => {
    setSelected((prev) => {
      const copy = new Set(prev);
      if (copy.has(id)) copy.delete(id);
      else copy.add(id);
      return copy;
    });
  };

  const handleConfirm = () => {
    onConfirm(Array.from(selected));
  };

  const listado = asignaturas.filter((a) => {
    const matchesFilter =
      filter === "" ||
      a.nombre.toLowerCase().includes(filter.toLowerCase()) ||
      a.codigo.toLowerCase().includes(filter.toLowerCase());
    const matchesSemester =
      semester === "" ||
      (a.semestre && a.semestre.toLowerCase().includes(semester.toLowerCase()));
    return matchesFilter && matchesSemester;
  });

  const semesters = Array.from(
    new Set(asignaturas.map((a) => a.semestre).filter(Boolean))
  ).sort();

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div
        className="relative bg-white rounded-xl shadow-2xl w-11/12 md:w-4/5 lg:w-3/5 border transform transition duration-200 ease-out scale-95 animate-modal-open"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-5 border-b">
          <div>
            <h3 className="font-semibold text-xl">Seleccionar asignaturas</h3>
            <p className="text-sm text-gray-500">
              Busca por código, nombre o filtra por semestre.
            </p>
          </div>
          <button
            className="text-gray-500 hover:text-gray-800 text-xl"
            onClick={onClose}
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>

        <div className="p-5 border-b flex flex-col md:flex-row md:items-center md:gap-4">
          <div className="flex items-center gap-3 flex-1 bg-gray-50 p-2 rounded shadow-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.9 14.32a8 8 0 111.414-1.414l4.387 4.387a1 1 0 01-1.414 1.414l-4.387-4.387zM8 14a6 6 0 100-12 6 6 0 000 12z"
                clipRule="evenodd"
              />
            </svg>
            <input
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Buscar por código o asignatura"
              className="w-full bg-transparent px-2 py-2 text-sm focus:outline-none"
            />
          </div>

          <div className="mt-3 md:mt-0 md:w-56">
            <select
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="w-full px-3 py-2 border rounded bg-white text-sm"
            >
              <option value="">Todos los semestres</option>
              {semesters.length === 0 ? (
                <option value="" disabled>
                  No hay semestres disponibles
                </option>
              ) : (
                semesters.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))
              )}
            </select>
          </div>
        </div>

        <div className="p-5 max-h-[60vh] overflow-y-auto space-y-3">
          {listado.length === 0 && (
            <div className="text-center text-sm text-gray-500 py-8">
              No se encontraron asignaturas.
            </div>
          )}

          <ul className="space-y-3">
            {listado.map((a) => (
              <li
                key={a.id}
                className="p-4 bg-white border rounded-lg hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start gap-4">
                  <button
                    type="button"
                    onClick={() => toggle(a.id)}
                    className={`flex items-center justify-center h-8 w-8 rounded-md transition-colors ${
                      selected.has(a.id)
                        ? "bg-blue-600 border-blue-600"
                        : "bg-white border border-gray-200"
                    }`}
                    aria-pressed={selected.has(a.id)}
                    aria-label={
                      selected.has(a.id) ? "Deseleccionar" : "Seleccionar"
                    }
                  >
                    {selected.has(a.id) ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-white"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 00-1.414-1.414L8 11.172 4.707 7.879A1 1 0 003.293 9.293l4 4a1 1 0 001.414 0l8-8z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="none"
                        stroke="currentColor"
                      >
                        <circle cx="10" cy="10" r="3" strokeWidth="1.5" />
                      </svg>
                    )}
                  </button>

                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-gray-800 truncate">
                          {a.nombre}
                        </div>
                        <div className="text-xs text-gray-500 truncate">
                          {a.codigo} • {a.creditos ?? "—"} créditos
                        </div>
                      </div>

                      <div className="flex-shrink-0 text-right">
                        <div className="mb-1">
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              a.estado === "Preinscrito"
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {a.estado}
                          </span>
                        </div>
                        <div>
                          <span
                            className={`text-xs px-2 py-1 rounded ${
                              a.modalidad === "Virtual"
                                ? "bg-indigo-100 text-indigo-800"
                                : a.modalidad === "Presencial"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-700"
                            }`}
                          >
                            {a.modalidad ?? "—"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-gray-600">
                      <div>
                        <span className="font-semibold text-gray-800">
                          Docente:
                        </span>{" "}
                        {a.docente ?? "—"}
                      </div>
                      <div>
                        <span className="font-semibold text-gray-800">
                          Día:
                        </span>{" "}
                        {a.dia ?? "—"}
                      </div>
                      <div>
                        <span className="font-semibold text-gray-800">
                          Hora:
                        </span>{" "}
                        {a.hora ?? "—"}
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center justify-between gap-3 p-5 border-t">
          <div className="text-sm text-gray-600">
            Seleccionadas:{" "}
            <span className="font-semibold text-gray-800">{selected.size}</span>
          </div>
          <div className="flex items-center gap-3">
            <button
              className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              onClick={handleConfirm}
            >
              Agregar seleccionadas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
