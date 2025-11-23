import axios from "axios";

const horariosApi = axios.create({
  baseURL: "http://127.0.0.1:8000/api/horarios/",
});

// HorarioEstudiante
export const getHorarioEstudiantes = async () => {
  const res = await horariosApi.get("horario-estudiantes/");
  return res.data;
};
export const getHorarioEstudiante = async (id) => {
  const res = await horariosApi.get(`horario-estudiantes/${id}/`);
  return res.data;
};
export const postHorarioEstudiante = async (data) => {
  const res = await horariosApi.post("horario-estudiantes/", data);
  return res.data;
};
export const putHorarioEstudiante = async (id, data) => {
  const res = await horariosApi.put(`horario-estudiantes/${id}/`, data);
  return res.data;
};
export const deleteHorarioEstudiante = async (id) => {
  const res = await horariosApi.delete(`horario-estudiantes/${id}/`);
  return res.data;
};

// HorarioDocente
export const getHorarioDocentes = async () => {
  const res = await horariosApi.get("horario-docentes/");
  return res.data;
};
export const getHorarioDocente = async (id) => {
  const res = await horariosApi.get(`horario-docentes/${id}/`);
  return res.data;
};
export const postHorarioDocente = async (data) => {
  const res = await horariosApi.post("horario-docentes/", data);
  return res.data;
};
export const putHorarioDocente = async (id, data) => {
  const res = await horariosApi.put(`horario-docentes/${id}/`, data);
  return res.data;
};
export const deleteHorarioDocente = async (id) => {
  const res = await horariosApi.delete(`horario-docentes/${id}/`);
  return res.data;
};
