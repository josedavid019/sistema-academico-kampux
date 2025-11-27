import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/authStore";
import { Navbar } from "./components/Navbar";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Manuales } from "./pages/Manuales";
import { Soporte } from "./pages/Soporte";
import { RecursosEducativos } from "./pages/RecursosEducativos";
import { Herramientas } from "./pages/Herramientas";
import { Perfil } from "./pages/Perfil";
import { Configuracion } from "./pages/Configuracion";
import { NotFound } from "./pages/NotFound";
import { Dashboard } from "./pages/Dashboard";
import { Horarios } from "./pages/Horarios";
import { Resultados } from "./pages/Resultados";
import { Prematricula } from "./pages/Prematricula";
import { MisCursos } from "./pages/MisCursos";
import { CursoDetalle } from "./pages/CursoDetalle";
import { Materiales } from "./pages/Materiales";
import { MisTareas } from "./pages/MisTareas";
import { DocenteDashboard } from "./pages/docente/DocenteDashboard"; // Original import
import { DocenteCourses } from "./pages/docente/Courses";
import { DocenteContent } from "./pages/docente/Content";
import { DocenteActivities } from "./pages/docente/Activities";
import { DocenteStudents } from "./pages/docente/Students";
import { DocenteGrades } from "./pages/docente/Grades";
import { DocenteCommunication } from "./pages/docente/Communication";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminMaterias } from "./pages/admin/AdminMaterias";
import { AdminProgramas } from "./pages/admin/AdminProgramas";
import { AdminUsuarios } from "./pages/admin/AdminUsuarios";
import { AdminMatriculas } from "./pages/admin/AdminMatriculas";
import { AdminReportes } from "./pages/admin/AdminReportes";
import { AdminSettings } from "./pages/admin/AdminSettings";
import { AdminRoute } from "./components/AdminRoute";
import { CoordinadorDashboard } from "./pages/coordinador/CoordinadorDashboard";
import { CoordinadorEstudiantes } from "./pages/coordinador/CoordinadorEstudiantes";
import { CoordinadorSolicitudes } from "./pages/coordinador/CoordinadorSolicitudes";
import { CoordinadorDocentes } from "./pages/coordinador/CoordinadorDocentes";
import { CoordinadorReportes } from "./pages/coordinador/CoordinadorReportes";
import { CoordinadorRoute } from "./components/CoordinadorRoute";

function App() {
  const { loadUser, isAuthenticated } = useAuthStore();

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/dashboard" replace />
              ) : (
                <>
                  <Navbar />
                  <Home />
                </>
              )
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Navbar />
                <Dashboard />
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
          <Route
            path="/materiales"
            element={
              <ProtectedRoute>
                <Navbar />
                <Materiales />
              </ProtectedRoute>
            }
          />
          <Route
            path="/mis-tareas"
            element={
              <ProtectedRoute>
                <Navbar />
                <MisTareas />
              </ProtectedRoute>
            }
          />
          <Route
            path="/docente"
            element={
              <ProtectedRoute>
                <Navbar />
                <DocenteDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/docente/cursos"
            element={
              <ProtectedRoute>
                <Navbar />
                <DocenteCourses />
              </ProtectedRoute>
            }
          />
          <Route
            path="/docente/contenidos"
            element={
              <ProtectedRoute>
                <Navbar />
                <DocenteContent />
              </ProtectedRoute>
            }
          />
          <Route
            path="/docente/actividades"
            element={
              <ProtectedRoute>
                <Navbar />
                <DocenteActivities />
              </ProtectedRoute>
            }
          />
          <Route
            path="/docente/estudiantes"
            element={
              <ProtectedRoute>
                <Navbar />
                <DocenteStudents />
              </ProtectedRoute>
            }
          />
          <Route
            path="/docente/calificaciones"
            element={
              <ProtectedRoute>
                <Navbar />
                <DocenteGrades />
              </ProtectedRoute>
            }
          />
          <Route
            path="/docente/comunicacion"
            element={
              <ProtectedRoute>
                <Navbar />
                <DocenteCommunication />
              </ProtectedRoute>
            }
          />
          <Route
            path="/cursos/:id"
            element={
              <ProtectedRoute>
                <Navbar />
                <CursoDetalle />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <Navbar />
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/materias"
            element={
              <AdminRoute>
                <Navbar />
                <AdminMaterias />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/programas"
            element={
              <AdminRoute>
                <Navbar />
                <AdminProgramas />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/matriculas"
            element={
              <AdminRoute>
                <Navbar />
                <AdminMatriculas />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/reportes"
            element={
              <AdminRoute>
                <Navbar />
                <AdminReportes />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/configuracion"
            element={
              <AdminRoute>
                <Navbar />
                <AdminSettings />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/usuarios"
            element={
              <AdminRoute>
                <Navbar />
                <AdminUsuarios />
              </AdminRoute>
            }
          />
          <Route
            path="/coordinador"
            element={
              <CoordinadorRoute>
                <Navbar />
                <CoordinadorDashboard />
              </CoordinadorRoute>
            }
          />
          <Route
            path="/coordinador/estudiantes"
            element={
              <CoordinadorRoute>
                <Navbar />
                <CoordinadorEstudiantes />
              </CoordinadorRoute>
            }
          />
          <Route
            path="/coordinador/solicitudes"
            element={
              <CoordinadorRoute>
                <Navbar />
                <CoordinadorSolicitudes />
              </CoordinadorRoute>
            }
          />
          <Route
            path="/coordinador/docentes"
            element={
              <CoordinadorRoute>
                <Navbar />
                <CoordinadorDocentes />
              </CoordinadorRoute>
            }
          />
          <Route
            path="/coordinador/reportes"
            element={
              <CoordinadorRoute>
                <Navbar />
                <CoordinadorReportes />
              </CoordinadorRoute>
            }
          />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;
