import axios from "axios";

const usuariosApi = axios.create({
  baseURL: "http://127.0.0.1:8000/api/usuarios/",
  withCredentials: true, // <-- IMPORTANT: allow cookies (sessionid) to be sent/received
  headers: {
    "Content-Type": "application/json",
  },
});

// Each helper returns response.data for convenience
export const loginUsuario = async (usuario) =>
  (await usuariosApi.post("login/", usuario)).data;

export const registerUsuario = async (usuario) =>
  (await usuariosApi.post("register/", usuario)).data;

export const logoutUsuario = async () => {
  try {
    return (await usuariosApi.post("logout/")).data;
  } catch (error) {
    console.error("Error al hacer logout:", error);
    throw error;
  }
};

export const postEstudiante = async (estudiante) =>
  (await usuariosApi.post("estudiantes/", estudiante)).data;

export const postDocente = async (docente) =>
  (await usuariosApi.post("docentes/", docente)).data;

export const postCoordinador = async (coordinador) =>
  (await usuariosApi.post("coordinadores/", coordinador)).data;

export const postAdministrador = async (administrador) =>
  (await usuariosApi.post("administradores/", administrador)).data;

// Estudiantes - list & detail
export const getEstudiantes = async () => {
  const res = await usuariosApi.get("estudiantes/");
  return res.data;
};

export const getEstudiante = async (id) => {
  const res = await usuariosApi.get(`estudiantes/${id}/`);
  return res.data;
};
