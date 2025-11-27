import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { Menu, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  ChevronUpDownIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/24/outline";

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuthStore();
  const isAdmin = !!(
    user &&
    (user.rol === "administrador" ||
      user.role === "administrador" ||
      user.is_staff ||
      user.is_superuser)
  );

  const isCoordinador = !!(
    user &&
    (user.rol === "coordinador" || user.role === "coordinador")
  );
  const isDocente = !!(
    user &&
    (user.rol === "docente" || user.role === "docente")
  );
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      navigate("/", { replace: true });
    } catch (err) {
      // opcional: mostrar toast o setError
      console.error("Error al cerrar sesión:", err);
      // puedes usar setState para mostrar mensaje
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <nav className="h-16 bg-[#1f2e40] flex justify-between items-center px-4 md:px-6 shadow-lg">
      <div className="flex items-center gap-6">
        <Link
          to={
            isAuthenticated
              ? isAdmin
                ? "/admin"
                : isCoordinador
                ? "/coordinador"
                : isDocente
                ? "/docente"
                : "/dashboard"
              : "/"
          }
          className="flex items-center gap-2"
        >
          <img
            className="h-14"
            src="https://i.ibb.co/27cwjzyJ/Logo-Kampux.png"
            alt="Logo Kampux"
          />
          <h1 className="text-white font-bold text-xl hidden sm:block">
            Kampux
          </h1>
        </Link>
        {isAuthenticated && (
          <>
            {/* Botón Dashboard - solo para usuarios estudiante (no admins, no coordinadores, no docentes) */}
            {!isAdmin && !isCoordinador && !isDocente && (
              <Link
                to="/dashboard"
                className={`font-medium px-3 py-2 transition relative z-20 ${
                  location.pathname === "/dashboard"
                    ? "bg-white text-[#2563eb] rounded-t-lg mb-[-16px] pb-6"
                    : "text-white hover:bg-[#2a3f52] rounded-lg"
                }`}
                style={
                  location.pathname === "/dashboard"
                    ? { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }
                    : {}
                }
              >
                Dashboard
              </Link>
            )}

            {/* Menú Académico - solo para usuarios estudiante (no admins, no coordinadores, no docentes) */}
            {!isAdmin && !isCoordinador && !isDocente && (
              <Menu as="div" className="relative inline-block text-left">
                <Menu.Button
                  className={`font-medium px-3 py-2 transition flex items-center gap-1 focus:outline-none cursor-pointer relative z-20 ${
                    [
                      "/horarios",
                      "/prematricula",
                      "/resultados",
                      "/materiales",
                      "/mis-tareas",
                    ].includes(location.pathname)
                      ? "bg-white text-[#2563eb] rounded-t-lg mb-[-16px] pb-6"
                      : "text-white hover:bg-[#2a3f52] rounded-lg"
                  }`}
                >
                  Académico
                  <ChevronDownIcon className="w-4 h-4" aria-hidden="true" />
                </Menu.Button>
                <Transition
                  as={React.Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute left-0 mt-2 w-48 origin-top-left bg-white rounded-lg shadow-xl z-50 border border-gray-200 focus:outline-none">
                    <div className="py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/horarios"
                            className={`block px-4 py-2 text-sm transition relative z-10 ${
                              location.pathname === "/horarios"
                                ? "bg-white text-[#2563eb] rounded-t-lg mb-[-16px] pb-6"
                                : active
                                ? "bg-gray-100 text-gray-700"
                                : "text-gray-700 hover:bg-gray-100 rounded-lg"
                            }`}
                          >
                            Horarios
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/prematricula"
                            className={`block px-4 py-2 text-sm transition relative z-10 ${
                              location.pathname === "/prematricula"
                                ? "bg-white text-[#2563eb] rounded-t-lg mb-[-16px] pb-6"
                                : active
                                ? "bg-gray-100 text-gray-700"
                                : "text-gray-700 hover:bg-gray-100 rounded-lg"
                            }`}
                          >
                            Prematrículas
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/resultados"
                            className={`block px-4 py-2 text-sm transition relative z-10 ${
                              location.pathname === "/resultados"
                                ? "bg-white text-[#2563eb] rounded-t-lg mb-[-16px] pb-6"
                                : active
                                ? "bg-gray-100 text-gray-700"
                                : "text-gray-700 hover:bg-gray-100 rounded-lg"
                            }`}
                          >
                            Resultados
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/materiales"
                            className={`block px-4 py-2 text-sm transition relative z-10 ${
                              location.pathname === "/materiales"
                                ? "bg-white text-[#2563eb] rounded-t-lg mb-[-16px] pb-6"
                                : active
                                ? "bg-gray-100 text-gray-700"
                                : "text-gray-700 hover:bg-gray-100 rounded-lg"
                            }`}
                          >
                            Materiales
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            to="/mis-tareas"
                            className={`block px-4 py-2 text-sm transition relative z-10 ${
                              location.pathname === "/mis-tareas"
                                ? "bg-white text-[#2563eb] rounded-t-lg mb-[-16px] pb-6"
                                : active
                                ? "bg-gray-100 text-gray-700"
                                : "text-gray-700 hover:bg-gray-100 rounded-lg"
                            }`}
                          >
                            Mis Tareas
                          </Link>
                        )}
                      </Menu.Item>
                    </div>
                  </Menu.Items>
                </Transition>
              </Menu>
            )}
            {/* Botones Coordinación - visible solo para coordinadores */}
            {isCoordinador && (
              <>
                <Link
                  to="/coordinador"
                  className={`font-medium px-3 py-2 transition relative z-20 ${
                    location.pathname === "/coordinador"
                      ? "bg-white text-[#2563eb] rounded-t-lg mb-[-16px] pb-6"
                      : "text-white hover:bg-[#2a3f52] rounded-lg"
                  }`}
                >
                  Panel Coordinación
                </Link>
                <Link
                  to="/coordinador/estudiantes"
                  className={`font-medium px-3 py-2 transition relative z-20 ${
                    location.pathname === "/coordinador/estudiantes"
                      ? "bg-white text-[#2563eb] rounded-t-lg mb-[-16px] pb-6"
                      : "text-white hover:bg-[#2a3f52] rounded-lg"
                  }`}
                >
                  Estudiantes
                </Link>
                <Link
                  to="/coordinador/solicitudes"
                  className={`font-medium px-3 py-2 transition relative z-20 ${
                    location.pathname === "/coordinador/solicitudes"
                      ? "bg-white text-[#2563eb] rounded-t-lg mb-[-16px] pb-6"
                      : "text-white hover:bg-[#2a3f52] rounded-lg"
                  }`}
                >
                  Solicitudes
                </Link>
                <Link
                  to="/coordinador/docentes"
                  className={`font-medium px-3 py-2 transition relative z-20 ${
                    location.pathname === "/coordinador/docentes"
                      ? "bg-white text-[#2563eb] rounded-t-lg mb-[-16px] pb-6"
                      : "text-white hover:bg-[#2a3f52] rounded-lg"
                  }`}
                >
                  Docentes
                </Link>
                <Link
                  to="/coordinador/reportes"
                  className={`font-medium px-3 py-2 transition relative z-20 ${
                    location.pathname === "/coordinador/reportes"
                      ? "bg-white text-[#2563eb] rounded-t-lg mb-[-16px] pb-6"
                      : "text-white hover:bg-[#2a3f52] rounded-lg"
                  }`}
                >
                  Reportes
                </Link>
              </>
            )}
            {/* Botones Administración - visible solo para admins */}
            {isAdmin && (
              <>
                <Link
                  to="/admin"
                  className={`font-medium px-3 py-2 transition relative z-20 ${
                    location.pathname === "/admin"
                      ? "bg-white text-[#2563eb] rounded-t-lg mb-[-16px] pb-6"
                      : "text-white hover:bg-[#2a3f52] rounded-lg"
                  }`}
                >
                  Panel Admin
                </Link>
                <Link
                  to="/admin/materias"
                  className={`font-medium px-3 py-2 transition relative z-20 ${
                    location.pathname === "/admin/materias"
                      ? "bg-white text-[#2563eb] rounded-t-lg mb-[-16px] pb-6"
                      : "text-white hover:bg-[#2a3f52] rounded-lg"
                  }`}
                >
                  Materias
                </Link>
                <Link
                  to="/admin/programas"
                  className={`font-medium px-3 py-2 transition relative z-20 ${
                    location.pathname === "/admin/programas"
                      ? "bg-white text-[#2563eb] rounded-t-lg mb-[-16px] pb-6"
                      : "text-white hover:bg-[#2a3f52] rounded-lg"
                  }`}
                >
                  Programas
                </Link>
                <Link
                  to="/admin/matriculas"
                  className={`font-medium px-3 py-2 transition relative z-20 ${
                    location.pathname === "/admin/matriculas"
                      ? "bg-white text-[#2563eb] rounded-t-lg mb-[-16px] pb-6"
                      : "text-white hover:bg-[#2a3f52] rounded-lg"
                  }`}
                >
                  Matrículas
                </Link>
                <Link
                  to="/admin/usuarios"
                  className={`font-medium px-3 py-2 transition relative z-20 ${
                    location.pathname === "/admin/usuarios"
                      ? "bg-white text-[#2563eb] rounded-t-lg mb-[-16px] pb-6"
                      : "text-white hover:bg-[#2a3f52] rounded-lg"
                  }`}
                >
                  Lista de usuarios
                </Link>
                <Link
                  to="/admin/reportes"
                  className={`font-medium px-3 py-2 transition relative z-20 ${
                    location.pathname === "/admin/reportes"
                      ? "bg-white text-[#2563eb] rounded-t-lg mb-[-16px] pb-6"
                      : "text-white hover:bg-[#2a3f52] rounded-lg"
                  }`}
                >
                  Reportes
                </Link>
                <Link
                  to="/admin/configuracion"
                  className={`font-medium px-3 py-2 transition relative z-20 ${
                    location.pathname === "/admin/configuracion"
                      ? "bg-white text-[#2563eb] rounded-t-lg mb-[-16px] pb-6"
                      : "text-white hover:bg-[#2a3f52] rounded-lg"
                  }`}
                >
                  Configuración
                </Link>
              </>
            )}
            {/* Botón Mis cursos - solo para usuarios estudiante (no admins, no coordinadores, no docentes) */}
            {!isAdmin && !isCoordinador && !isDocente && (
              <Link
                to="/cursos"
                className={`font-medium px-3 py-2 transition relative z-20 ${
                  location.pathname === "/cursos"
                    ? "bg-white text-[#2563eb] rounded-t-lg mb-[-16px] pb-6"
                    : "text-white hover:bg-[#2a3f52] rounded-lg"
                }`}
              >
                Mis cursos
              </Link>
            )}
            {/* Enlaces para docentes */}
            {isDocente && (
              <>
                <Link
                  to="/docente"
                  className={`font-medium px-3 py-2 transition relative z-20 ${
                    location.pathname === "/docente"
                      ? "bg-white text-[#2563eb] rounded-t-lg mb-[-16px] pb-6"
                      : "text-white hover:bg-[#2a3f52] rounded-lg"
                  }`}
                >
                  Panel docente
                </Link>
                <Link
                  to="/docente/cursos"
                  className={`font-medium px-3 py-2 transition relative z-20 ${
                    location.pathname === "/docente/cursos"
                      ? "bg-white text-[#2563eb] rounded-t-lg mb-[-16px] pb-6"
                      : "text-white hover:bg-[#2a3f52] rounded-lg"
                  }`}
                >
                  Cursos
                </Link>
                <Link
                  to="/docente/contenidos"
                  className={`font-medium px-3 py-2 transition relative z-20 ${
                    location.pathname === "/docente/contenidos"
                      ? "bg-white text-[#2563eb] rounded-t-lg mb-[-16px] pb-6"
                      : "text-white hover:bg-[#2a3f52] rounded-lg"
                  }`}
                >
                  Contenidos
                </Link>
                <Link
                  to="/docente/actividades"
                  className={`font-medium px-3 py-2 transition relative z-20 ${
                    location.pathname === "/docente/actividades"
                      ? "bg-white text-[#2563eb] rounded-t-lg mb-[-16px] pb-6"
                      : "text-white hover:bg-[#2a3f52] rounded-lg"
                  }`}
                >
                  Actividades
                </Link>
                <Link
                  to="/docente/estudiantes"
                  className={`font-medium px-3 py-2 transition relative z-20 ${
                    location.pathname === "/docente/estudiantes"
                      ? "bg-white text-[#2563eb] rounded-t-lg mb-[-16px] pb-6"
                      : "text-white hover:bg-[#2a3f52] rounded-lg"
                  }`}
                >
                  Estudiantes
                </Link>
                <Link
                  to="/docente/calificaciones"
                  className={`font-medium px-3 py-2 transition relative z-20 ${
                    location.pathname === "/docente/calificaciones"
                      ? "bg-white text-[#2563eb] rounded-t-lg mb-[-16px] pb-6"
                      : "text-white hover:bg-[#2a3f52] rounded-lg"
                  }`}
                >
                  Calificaciones
                </Link>
                <Link
                  to="/docente/comunicacion"
                  className={`font-medium px-3 py-2 transition relative z-20 ${
                    location.pathname === "/docente/comunicacion"
                      ? "bg-white text-[#2563eb] rounded-t-lg mb-[-16px] pb-6"
                      : "text-white hover:bg-[#2a3f52] rounded-lg"
                  }`}
                >
                  Comunicación
                </Link>
              </>
            )}
          </>
        )}
      </div>

      {/* Menú de usuario a la derecha con Headless UI */}
      {isAuthenticated && (
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="flex items-center gap-2 text-white hover:bg-[#2a3f52] px-3 py-2 rounded-lg transition focus:outline-none cursor-pointer">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold">
              {(
                user?.nombre?.charAt(0) ||
                user?.apellido?.charAt(0) ||
                user?.email?.charAt(0) ||
                "U"
              ).toUpperCase()}
            </div>
            <span className="hidden md:block">
              {user
                ? `${user.nombre || ""} ${user.apellido || ""}`.trim() ||
                  user.email
                : "Usuario"}
            </span>
            <ChevronDownIcon className="w-4 h-4" aria-hidden="true" />
          </Menu.Button>
          <Transition
            as={React.Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 mt-2 w-48 origin-top-right bg-white rounded-lg shadow-xl z-50 border border-gray-200 focus:outline-none">
              <div className="px-4 py-3 border-b border-gray-200">
                <p className="text-sm font-medium text-gray-900">
                  {user
                    ? `${user.nombre || ""} ${user.apellido || ""}`.trim() ||
                      user.email
                    : "Usuario"}
                </p>
              </div>
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/perfil"
                      className={`flex items-center gap-2 px-4 py-2 text-sm text-gray-700 transition ${
                        active ? "bg-gray-100" : ""
                      }`}
                    >
                      <UserCircleIcon className="w-5 h-5" /> Mi Perfil
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      to="/configuracion"
                      className={`flex items-center gap-2 px-4 py-2 text-sm text-gray-700 transition ${
                        active ? "bg-gray-100" : ""
                      }`}
                    >
                      <Cog6ToothIcon className="w-5 h-5" /> Configuración
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className={`w-full flex items-center gap-2 text-left px-4 py-2 text-sm text-red-600 transition border-t border-gray-200 cursor-pointer ${
                        active ? "bg-red-50" : ""
                      }`}
                    >
                      <ArrowRightOnRectangleIcon className="w-5 h-5" />{" "}
                      {isLoggingOut ? "Cerrando..." : "Cerrar Sesión"}
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      )}
      {!isAuthenticated && (
        <div className="flex gap-3">
          <Link
            to="/login"
            className="px-4 py-2 text-white hover:bg-[#2a3f52] rounded-lg transition font-medium text-sm"
          >
            Iniciar Sesión
          </Link>
        </div>
      )}
    </nav>
  );
}
