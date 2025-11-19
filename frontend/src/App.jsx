import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import { Navbar } from "./components/Navbar";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Dashboard } from "./pages/Dashboard";
import { Manuales } from "./pages/Manuales";
import { Soporte } from "./pages/Soporte";
import { RecursosEducativos } from "./pages/RecursosEducativos";
import { Herramientas } from "./pages/Herramientas";
import { Perfil } from "./pages/Perfil";
import Configuracion from "./pages/Configuracion";
import { NotFound } from "./pages/NotFound";
import { TareasPendientes } from "./pages/TareasPendientes";
import { Horarios } from "./pages/Horarios";
import { Resultados } from "./pages/Resultados";
import { Prematricula } from "./pages/Prematricula";
import { MisCursos } from "./pages/MisCursos";

function App() {
  const { loadUser, isAuthenticated } = useAuthStore();

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <>
                <Navbar />
                <Navigate to="/tareas" />
              </>
            ) : (
              <>
                <Navbar />
                <Dashboard />
              </>
            )
          }
        />
        <Route
          path="/tareas"
          element={
            <ProtectedRoute>
              <Navbar />
              <TareasPendientes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/manuales"
          element={
            <>
              <Navbar />
              <Manuales />
            </>
          }
        />
        <Route
          path="/soporte"
          element={
            <>
              <Navbar />
              <Soporte />
            </>
          }
        />
        <Route
          path="/recursos-educativos"
          element={
            <>
              <Navbar />
              <RecursosEducativos />
            </>
          }
        />
        <Route
          path="/herramientas"
          element={
            <>
              <Navbar />
              <Herramientas />
            </>
          }
        />
        <Route
          path="/perfil"
          element={
            <ProtectedRoute>
              <Navbar />
              <Perfil />
            </ProtectedRoute>
          }
        />
        <Route
          path="/configuracion"
          element={
            <ProtectedRoute>
              <Navbar />
              <Configuracion />
            </ProtectedRoute>
          }
        />
        <Route
          path="/horarios"
          element={
            <ProtectedRoute>
              <Navbar />
              <Horarios />
            </ProtectedRoute>
          }
        />
        <Route
          path="/prematricula"
          element={
            <ProtectedRoute>
              <Navbar />
              <Prematricula />
            </ProtectedRoute>
          }
        />
        <Route
          path="/resultados"
          element={
            <ProtectedRoute>
              <Navbar />
              <Resultados />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cursos"
          element={
            <ProtectedRoute>
              <Navbar />
              <MisCursos />
            </ProtectedRoute>
          }
        />
        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
