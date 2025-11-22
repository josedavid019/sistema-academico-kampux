import axios from "axios";

const academicoApi = axios.create({
  baseURL: "http://127.0.0.1:8000/api/academico/",
});

// Facultad
export const getFacultades = async () => {
  const res = await academicoApi.get("facultades/");
  return res.data;
};
export const getFacultad = async (id) => {
  const res = await academicoApi.get(`facultades/${id}/`);
  return res.data;
};
export const postFacultad = async (data) => {
  const res = await academicoApi.post("facultades/", data);
  return res.data;
};
export const putFacultad = async (id, data) => {
  const res = await academicoApi.put(`facultades/${id}/`, data);
  return res.data;
};
export const deleteFacultad = async (id) => {
  const res = await academicoApi.delete(`facultades/${id}/`);
  return res.data;
};

// Programa
export const getProgramas = async () => {
  const res = await academicoApi.get("programas/");
  return res.data;
};
export const getPrograma = async (id) => {
  const res = await academicoApi.get(`programas/${id}/`);
  return res.data;
};
export const postPrograma = async (data) => {
  const res = await academicoApi.post("programas/", data);
  return res.data;
};
export const putPrograma = async (id, data) => {
  const res = await academicoApi.put(`programas/${id}/`, data);
  return res.data;
};
export const deletePrograma = async (id) => {
  const res = await academicoApi.delete(`programas/${id}/`);
  return res.data;
};

// Materia
export const getMaterias = async () => {
  const res = await academicoApi.get("materias/");
  return res.data;
};
export const getMateria = async (id) => {
  const res = await academicoApi.get(`materias/${id}/`);
  return res.data;
};
export const postMateria = async (data) => {
  const res = await academicoApi.post("materias/", data);
  return res.data;
};
export const putMateria = async (id, data) => {
  const res = await academicoApi.put(`materias/${id}/`, data);
  return res.data;
};
export const deleteMateria = async (id) => {
  const res = await academicoApi.delete(`materias/${id}/`);
  return res.data;
};

// MateriaDocente
export const getMateriaDocentes = async () => {
  const res = await academicoApi.get("materias-docente/");
  return res.data;
};
export const getMateriaDocente = async (id) => {
  const res = await academicoApi.get(`materias-docente/${id}/`);
  return res.data;
};
export const postMateriaDocente = async (data) => {
  const res = await academicoApi.post("materias-docente/", data);
  return res.data;
};
export const putMateriaDocente = async (id, data) => {
  const res = await academicoApi.put(`materias-docente/${id}/`, data);
  return res.data;
};
export const deleteMateriaDocente = async (id) => {
  const res = await academicoApi.delete(`materias-docente/${id}/`);
  return res.data;
};

// CargaAcademica
export const getCargaAcademicas = async () => {
  const res = await academicoApi.get("cargas/");
  return res.data;
};
export const getCargaAcademica = async (id) => {
  const res = await academicoApi.get(`cargas/${id}/`);
  return res.data;
};
export const postCargaAcademica = async (data) => {
  const res = await academicoApi.post("cargas/", data);
  return res.data;
};
export const putCargaAcademica = async (id, data) => {
  const res = await academicoApi.put(`cargas/${id}/`, data);
  return res.data;
};
export const deleteCargaAcademica = async (id) => {
  const res = await academicoApi.delete(`cargas/${id}/`);
  return res.data;
};
