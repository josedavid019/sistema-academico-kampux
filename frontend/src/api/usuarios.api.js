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

export const getEstudiantes = async () =>
  (await usuariosApi.get("estudiantes/all/")).data;

export const getEstudiante = async (id) =>
  (await usuariosApi.get(`estudiantes/${id}/`)).data;

export const putEstudiante = async (id, estudiante) =>
  (await usuariosApi.put(`estudiantes/${id}/`, estudiante)).data;

export const deleteEstudiante = async (id) =>
  (await usuariosApi.delete(`estudiantes/${id}/`)).data;

export const postDocente = async (docente) =>
  (await usuariosApi.post("docentes/", docente)).data;

export const getDocentes = async () =>
  (await usuariosApi.get("docentes/all/")).data;

export const getDocente = async (id) =>
  (await usuariosApi.get(`docentes/${id}/`)).data;

export const putDocente = async (id, docente) =>
  (await usuariosApi.put(`docentes/${id}/`, docente)).data;

export const deleteDocente = async (id) =>
  (await usuariosApi.delete(`docentes/${id}/`)).data;

export const postCoordinador = async (coordinador) =>
  (await usuariosApi.post("coordinadores/", coordinador)).data;

export const getCoordinadores = async () =>
  (await usuariosApi.get("coordinadores/all/")).data;

export const getCoordinador = async (id) =>
  (await usuariosApi.get(`coordinadores/${id}/`)).data;

export const putCoordinador = async (id, coordinador) =>
  (await usuariosApi.put(`coordinadores/${id}/`, coordinador)).data;

export const deleteCoordinador = async (id) =>
  (await usuariosApi.delete(`coordinadores/${id}/`)).data;

export const postAdministrador = async (administrador) =>
  (await usuariosApi.post("administradores/", administrador)).data;
export const getAdministradores = async () =>
  (await usuariosApi.get("administradores/all/")).data;

export const getAdministrador = async (id) =>
  (await usuariosApi.get(`administradores/${id}/`)).data;

export const putAdministrador = async (id, administrador) =>
  (await usuariosApi.put(`administradores/${id}/`, administrador)).data;

export const deleteAdministrador = async (id) =>
  (await usuariosApi.delete(`administradores/${id}/`)).data;

// Note: estudiantes list/detail are defined earlier; avoid duplicate exports.
