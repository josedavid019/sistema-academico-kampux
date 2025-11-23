import axios from "axios";

const asistenciaApi = axios.create({
  baseURL: "http://127.0.0.1:8000/api/asistencia/",
});

// Aula
export const getAulas = async () => {
  const res = await asistenciaApi.get("aulas/");
  return res.data;
};
export const getAula = async (id) => {
  const res = await asistenciaApi.get(`aulas/${id}/`);
  return res.data;
};
export const postAula = async (data) => {
  const res = await asistenciaApi.post("aulas/", data);
  return res.data;
};
export const putAula = async (id, data) => {
  const res = await asistenciaApi.put(`aulas/${id}/`, data);
  return res.data;
};
export const deleteAula = async (id) => {
  const res = await asistenciaApi.delete(`aulas/${id}/`);
  return res.data;
};

// SensorAsistencia
export const getSensorAsistencias = async () => {
  const res = await asistenciaApi.get("sensores/");
  return res.data;
};
export const getSensorAsistencia = async (id) => {
  const res = await asistenciaApi.get(`sensores/${id}/`);
  return res.data;
};
export const postSensorAsistencia = async (data) => {
  const res = await asistenciaApi.post("sensores/", data);
  return res.data;
};
export const putSensorAsistencia = async (id, data) => {
  const res = await asistenciaApi.put(`sensores/${id}/`, data);
  return res.data;
};
export const deleteSensorAsistencia = async (id) => {
  const res = await asistenciaApi.delete(`sensores/${id}/`);
  return res.data;
};

// Asistencia
export const getAsistencias = async () => {
  const res = await asistenciaApi.get("asistencias/");
  return res.data;
};
export const getAsistencia = async (id) => {
  const res = await asistenciaApi.get(`asistencias/${id}/`);
  return res.data;
};
export const postAsistencia = async (data) => {
  const res = await asistenciaApi.post("asistencias/", data);
  return res.data;
};
export const putAsistencia = async (id, data) => {
  const res = await asistenciaApi.put(`asistencias/${id}/`, data);
  return res.data;
};
export const deleteAsistencia = async (id) => {
  const res = await asistenciaApi.delete(`asistencias/${id}/`);
  return res.data;
};

// DetalleAsistencia
export const getDetalleAsistencias = async () => {
  const res = await asistenciaApi.get("detalles/");
  return res.data;
};
export const getDetalleAsistencia = async (id) => {
  const res = await asistenciaApi.get(`detalles/${id}/`);
  return res.data;
};
export const postDetalleAsistencia = async (data) => {
  const res = await asistenciaApi.post("detalles/", data);
  return res.data;
};
export const putDetalleAsistencia = async (id, data) => {
  const res = await asistenciaApi.put(`detalles/${id}/`, data);
  return res.data;
};
export const deleteDetalleAsistencia = async (id) => {
  const res = await asistenciaApi.delete(`detalles/${id}/`);
  return res.data;
};
