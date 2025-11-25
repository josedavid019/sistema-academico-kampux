import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import {
  Cog6ToothIcon,
  BellIcon,
  ShieldCheckIcon,
  MoonIcon,
  LanguageIcon,
  ArrowLeftIcon,
} from "@heroicons/react/24/outline";
import { toastSuccess } from "../utils/toast";

export function Configuracion() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [activeTab, setActiveTab] = useState("general");
  const [preferences, setPreferences] = useState({
    notifications: true,
    emailNotifications: true,
    darkMode: false,
    language: "es",
    emailUpdates: false,
    twoFactor: false,
  });

  const handleToggle = (key) => {
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSave = () => {
    // TODO: Implementar guardado en backend
    toastSuccess(
      "Configuración guardada (próximamente se conectará al backend)"
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/tareas")}
            className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 mb-4"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-1" />
            Volver al Dashboard
          </button>
          <div className="flex items-center gap-3 mb-2">
            <Cog6ToothIcon className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Configuración</h1>
          </div>
          <p className="text-gray-600">
            Personaliza tu experiencia en la plataforma
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-200">
          {[
            { id: "general", label: "General", icon: Cog6ToothIcon },
            { id: "notifications", label: "Notificaciones", icon: BellIcon },
            { id: "security", label: "Seguridad", icon: ShieldCheckIcon },
          ].map((tab) => {
            const IconComponent = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 font-medium transition border-b-2 ${
                  activeTab === tab.id
                    ? "text-blue-600 border-blue-600"
                    : "text-gray-600 border-transparent hover:text-gray-900"
                }`}
              >
                <IconComponent className="w-5 h-5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow">
          {/* General Settings */}
          {activeTab === "general" && (
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Preferencias Generales
              </h2>

              <div className="space-y-6">
                {/* Language */}
                <div className="flex items-start justify-between pb-6 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <LanguageIcon className="w-5 h-5 text-gray-400" />
                    <div>
                      <h3 className="font-medium text-gray-900">Idioma</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Selecciona tu idioma preferido
                      </p>
                    </div>
                  </div>
                  <select
                    value={preferences.language}
                    onChange={(e) =>
                      setPreferences({
                        ...preferences,
                        language: e.target.value,
                      })
                    }
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="es">Español</option>
                    <option value="en">English</option>
                    <option value="pt">Português</option>
                  </select>
                </div>

                {/* Dark Mode */}
                <div className="flex items-start justify-between pb-6 border-b border-gray-200">
                  <div className="flex items-center gap-3">
                    <MoonIcon className="w-5 h-5 text-gray-400" />
                    <div>
                      <h3 className="font-medium text-gray-900">Modo Oscuro</h3>
                      <p className="text-sm text-gray-500 mt-1">
                        Activar tema oscuro
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleToggle("darkMode")}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      preferences.darkMode ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        preferences.darkMode ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {/* Save Button */}
                <div className="pt-6">
                  <button
                    onClick={handleSave}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                  >
                    Guardar Cambios
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Notifications */}
          {activeTab === "notifications" && (
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Preferencias de Notificaciones
              </h2>

              <div className="space-y-6">
                {/* Push Notifications */}
                <div className="flex items-start justify-between pb-6 border-b border-gray-200">
                  <div>
                    <h3 className="font-medium text-gray-900">
                      Notificaciones Push
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Recibir notificaciones en el navegador
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggle("notifications")}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      preferences.notifications ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        preferences.notifications
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {/* Email Notifications */}
                <div className="flex items-start justify-between pb-6 border-b border-gray-200">
                  <div>
                    <h3 className="font-medium text-gray-900">
                      Notificaciones por Email
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Recibir notificaciones por correo electrónico
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggle("emailNotifications")}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      preferences.emailNotifications
                        ? "bg-blue-600"
                        : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        preferences.emailNotifications
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {/* Email Updates */}
                <div className="flex items-start justify-between pb-6 border-b border-gray-200">
                  <div>
                    <h3 className="font-medium text-gray-900">
                      Actualizaciones por Email
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Recibir actualizaciones sobre nuevas características
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggle("emailUpdates")}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      preferences.emailUpdates ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        preferences.emailUpdates
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {/* Save Button */}
                <div className="pt-6">
                  <button
                    onClick={handleSave}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                  >
                    Guardar Preferencias
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Security */}
          {activeTab === "security" && (
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">
                Seguridad
              </h2>

              <div className="space-y-6">
                {/* Change Password */}
                <div className="pb-6 border-b border-gray-200">
                  <h3 className="font-medium text-gray-900 mb-4">
                    Cambiar Contraseña
                  </h3>
                  <div className="space-y-3">
                    <input
                      type="password"
                      placeholder="Contraseña actual"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="password"
                      placeholder="Nueva contraseña"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="password"
                      placeholder="Confirmar contraseña"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Two-Factor Authentication */}
                <div className="flex items-start justify-between pb-6 border-b border-gray-200">
                  <div>
                    <h3 className="font-medium text-gray-900">
                      Autenticación de Dos Factores
                    </h3>
                    <p className="text-sm text-gray-500 mt-1">
                      Añade una capa extra de seguridad a tu cuenta
                    </p>
                    {preferences.twoFactor && (
                      <p className="text-sm text-green-600 mt-2">
                        ✓ Habilitado
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => handleToggle("twoFactor")}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      preferences.twoFactor ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        preferences.twoFactor
                          ? "translate-x-6"
                          : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                {/* Active Sessions */}
                <div>
                  <h3 className="font-medium text-gray-900 mb-4">
                    Sesiones Activas
                  </h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-gray-900">
                          Windows - Este dispositivo
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Última actividad: Hace 5 minutos
                        </p>
                      </div>
                      <button className="text-sm text-red-600 hover:text-red-700">
                        Cerrar sesión
                      </button>
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <div className="pt-6">
                  <button
                    onClick={handleSave}
                    className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition"
                  >
                    Guardar Cambios de Seguridad
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
