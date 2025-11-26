import React from "react";

export function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-4xl">
        <div className="bg-white rounded-lg shadow-2xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Left side - Branding */}
            <div className="hidden md:flex bg-gradient-to-b from-blue-600 to-indigo-700 flex-col justify-center items-center text-white p-12">
              <div className="text-center">
                <div className="mb-6">
                  <img
                    src="https://i.ibb.co/27cwjzyJ/Logo-Kampux.png"
                    alt="Logo Kampux"
                    className="h-24 mx-auto"
                  />
                </div>
                <h1 className="text-4xl font-bold mb-3">Kampux</h1>
                <p className="text-indigo-100 text-lg">Sistema Académico</p>
              </div>
            </div>

            {/* Right side - Form */}
            <div className="flex flex-col justify-center p-8 md:p-12">
              {title && (
                <div className="mb-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {title}
                  </h2>
                  {subtitle && <p className="text-gray-600">{subtitle}</p>}
                </div>
              )}
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
