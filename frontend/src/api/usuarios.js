import axios from "axios";

const usuariosApi = axios.create({
  baseURL: "http://127.0.0.1:8000/api/usuarios/",
});

export const loginUsuario = async (usuario) =>
  usuariosApi.post("login/", usuario);

export const registerUsuario = async (usuario) =>
  usuariosApi.post("register/", usuario);

export const logoutUsuario = async () => {
  try {
    await usuariosApi.post("logout/");
  } catch (error) {
    console.error("Error al hacer logout:", error);
  }
};

export const postEstudiante = async (estudiante) =>
  usuariosApi.post("estudiantes/", estudiante);

export const postDocente = async (docente) =>
  usuariosApi.post("docentes/", docente);

export const postCoordinador = async (coordinador) =>
  usuariosApi.post("coordinadores/", coordinador);

export const postAdministrador = async (administrador) =>
  usuariosApi.post("administradores/", administrador);
