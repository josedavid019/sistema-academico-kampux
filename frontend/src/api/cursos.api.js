import axios from "axios";

const cursosApi = axios.create({
  baseURL: "http://127.0.0.1:8000/api/cursos/",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export const getCurso = async (id) => (await cursosApi.get(`${id}/`)).data;
export const getActividades = async (cursoId) =>
  (await cursosApi.get(`${cursoId}/actividades/`)).data;

export const createActividad = async (cursoId, actividad) =>
  (await cursosApi.post(`${cursoId}/actividades/`, actividad)).data;

export const updateActividad = async (cursoId, actividadId, actividad) =>
  (await cursosApi.put(`${cursoId}/actividades/${actividadId}/`, actividad)).data;

export const deleteActividad = async (cursoId, actividadId) =>
  (await cursosApi.delete(`${cursoId}/actividades/${actividadId}/`)).data;

export const updateCurso = async (cursoId, datos) =>
  (await cursosApi.put(`${cursoId}/`, datos)).data;

export default cursosApi;
