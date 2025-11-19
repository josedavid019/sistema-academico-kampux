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
  const handleLogout = async () => {
    await logout();
    navigate("/", { replace: true });
  };

  return (
    <nav className="h-16 bg-[#1f2e40] flex justify-between items-center px-4 md:px-6 shadow-lg">
      <div className="flex items-center gap-6">
        <Link to="/" className="flex items-center gap-2">
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
            {/* Botón Dashboard (antes de Académico) */}
            <Link
              to="/dashboard"
              className={`font-medium px-3 py-2 rounded-lg transition ${
                location.pathname === "/dashboard"
                  ? "bg-white text-[#2563eb]" // fondo blanco, azul tailwind 600
                  : "text-white hover:bg-[#2a3f52]"
              }`}
            >
              Dashboard
            </Link>

            {/* Menú Académico con Headless UI */}
            <Menu as="div" className="relative inline-block text-left">
              <Menu.Button
                className={`font-medium px-3 py-2 rounded-lg transition flex items-center gap-1 focus:outline-none cursor-pointer ${
                  ["/horarios", "/resultados"].includes(location.pathname)
                    ? "bg-white text-[#2563eb]"
                    : "text-white hover:bg-[#2a3f52]"
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
                          className={`block px-4 py-2 text-sm transition ${
                            location.pathname === "/horarios"
                              ? "bg-white text-[#2563eb]"
                              : active
                              ? "bg-gray-100 text-gray-700"
                              : "text-gray-700 hover:bg-gray-100"
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
                          className={`block px-4 py-2 text-sm transition ${
                            location.pathname === "/prematriculas"
                              ? "bg-white text-[#2563eb]"
                              : active
                              ? "bg-gray-100 text-gray-700"
                              : "text-gray-700 hover:bg-gray-100"
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
                          className={`block px-4 py-2 text-sm transition ${
                            location.pathname === "/resultados"
                              ? "bg-white text-[#2563eb]"
                              : active
                              ? "bg-gray-100 text-gray-700"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          Resultados
                        </Link>
                      )}
                    </Menu.Item>
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            {/* Botón Mis cursos */}
            <Link
              to="/cursos"
              className={`font-medium px-3 py-2 rounded-lg transition ${
                location.pathname === "/cursos"
                  ? "bg-white text-[#2563eb]"
                  : "text-white hover:bg-[#2a3f52]"
              }`}
            >
              Mis cursos
            </Link>
          </>
        )}
      </div>

      {/* Menú de usuario a la derecha con Headless UI */}
      {isAuthenticated && (
        <Menu as="div" className="relative inline-block text-left">
          <Menu.Button className="flex items-center gap-2 text-white hover:bg-[#2a3f52] px-3 py-2 rounded-lg transition focus:outline-none cursor-pointer">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-sm font-bold">
              {user?.email?.charAt(0).toUpperCase() || "U"}
            </div>
            <span className="hidden md:block">{user?.email || "Usuario"}</span>
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
                  {user?.email}
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
                      className={`w-full flex items-center gap-2 text-left px-4 py-2 text-sm text-red-600 transition border-t border-gray-200 cursor-pointer ${
                        active ? "bg-red-50" : ""
                      }`}
                    >
                      <ArrowRightOnRectangleIcon className="w-5 h-5" /> Cerrar
                      Sesión
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
          <Link
            to="/register"
            className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition font-medium text-sm"
          >
            Registrarse
          </Link>
        </div>
      )}
    </nav>
  );
}
