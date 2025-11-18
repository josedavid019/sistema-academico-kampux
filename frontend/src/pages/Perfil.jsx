import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  BuildingLibraryIcon,
  AcademicCapIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";

export function Perfil() {
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);

  const [profileData, setProfileData] = useState({
    firstName: "Juan",
    lastName: "Pérez",
    email: user?.email || "juan.perez@university.edu",
    phone: "+34 612 345 678",
    university: "Universidad Internacional",
    program: "Ingeniería en Sistemas",
    semester: "6to Semestre",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // TODO: Implementar guardado en backend
    alert("Perfil actualizado (próximamente se conectará al backend)");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center text-sm text-blue-600 hover:text-blue-700 mb-6"
        >
          <ArrowLeftIcon className="w-4 h-4 mr-1" />
          Volver al Dashboard
        </Link>

        {/* Profile Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              {profileData.firstName[0]}
              {profileData.lastName[0]}
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900">
                {profileData.firstName} {profileData.lastName}
              </h1>
              <p className="text-gray-600">{profileData.program}</p>
            </div>

            {!isEditing && (
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Editar Perfil
              </button>
            )}
          </div>
        </div>

        {/* Profile Information */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <UserIcon className="w-5 h-5 text-blue-600" />
            Información Personal
          </h2>

          {isEditing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nombre
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={profileData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Apellido
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={profileData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={profileData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Universidad
                  </label>
                  <input
                    type="text"
                    name="university"
                    value={profileData.university}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Programa
                  </label>
                  <input
                    type="text"
                    name="program"
                    value={profileData.program}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-medium"
                >
                  Guardar Cambios
                </button>
                <button
                  onClick={() => setIsEditing(false)}
                  className="flex-1 bg-gray-300 text-gray-900 py-2 rounded-lg hover:bg-gray-400 transition font-medium"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
                <UserIcon className="w-5 h-5 text-gray-400" />
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Nombre Completo</p>
                  <p className="font-medium text-gray-900">
                    {profileData.firstName} {profileData.lastName}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
                <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-medium text-gray-900">{profileData.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
                <PhoneIcon className="w-5 h-5 text-gray-400" />
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Teléfono</p>
                  <p className="font-medium text-gray-900">{profileData.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
                <BuildingLibraryIcon className="w-5 h-5 text-gray-400" />
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Universidad</p>
                  <p className="font-medium text-gray-900">{profileData.university}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 pb-4 border-b border-gray-200">
                <AcademicCapIcon className="w-5 h-5 text-gray-400" />
                <div className="flex-1">
                  <p className="text-sm text-gray-600">Programa Académico</p>
                  <p className="font-medium text-gray-900">{profileData.program}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Security Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <CheckCircleIcon className="w-5 h-5 text-green-600" />
            Seguridad
          </h2>

          <div className="space-y-4">
            <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
              <p className="font-medium text-gray-900">Cambiar Contraseña</p>
              <p className="text-sm text-gray-600">Actualiza tu contraseña regularmente</p>
            </button>

            <button className="w-full text-left px-4 py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
              <p className="font-medium text-gray-900">Autenticación de Dos Factores</p>
              <p className="text-sm text-gray-600">Añade una capa extra de seguridad</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
