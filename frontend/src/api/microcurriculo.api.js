import axios from "axios";

const microcurriculoApi = axios.create({
  baseURL: "http://127.0.0.1:8000/api/microcurriculo/",
});

// Microcurriculo
export const getMicrocurriculos = async () => {
  const res = await microcurriculoApi.get("microcurriculos/");
  return res.data;
};
export const getMicrocurriculo = async (id) => {
  const res = await microcurriculoApi.get(`microcurriculos/${id}/`);
  return res.data;
};
export const postMicrocurriculo = async (data) => {
  const res = await microcurriculoApi.post("microcurriculos/", data);
  return res.data;
};
export const putMicrocurriculo = async (id, data) => {
  const res = await microcurriculoApi.put(`microcurriculos/${id}/`, data);
  return res.data;
};
export const deleteMicrocurriculo = async (id) => {
  const res = await microcurriculoApi.delete(`microcurriculos/${id}/`);
  return res.data;
};

// ContenidoCompetencias
export const getContenidoCompetencias = async () => {
  const res = await microcurriculoApi.get("contenidos/");
  return res.data;
};
export const getContenidoCompetencia = async (id) => {
  const res = await microcurriculoApi.get(`contenidos/${id}/`);
  return res.data;
};
export const postContenidoCompetencia = async (data) => {
  const res = await microcurriculoApi.post("contenidos/", data);
  return res.data;
};
export const putContenidoCompetencia = async (id, data) => {
  const res = await microcurriculoApi.put(`contenidos/${id}/`, data);
  return res.data;
};
export const deleteContenidoCompetencia = async (id) => {
  const res = await microcurriculoApi.delete(`contenidos/${id}/`);
  return res.data;
};

// PlanMicrocurriculo
export const getPlanMicrocurriculos = async () => {
  const res = await microcurriculoApi.get("planes/");
  return res.data;
};
export const getPlanMicrocurriculo = async (id) => {
  const res = await microcurriculoApi.get(`planes/${id}/`);
  return res.data;
};
export const postPlanMicrocurriculo = async (data) => {
  const res = await microcurriculoApi.post("planes/", data);
  return res.data;
};
export const putPlanMicrocurriculo = async (id, data) => {
  const res = await microcurriculoApi.put(`planes/${id}/`, data);
  return res.data;
};
export const deletePlanMicrocurriculo = async (id) => {
  const res = await microcurriculoApi.delete(`planes/${id}/`);
  return res.data;
};

// DetallePlan
export const getDetallePlans = async () => {
  const res = await microcurriculoApi.get("detalles/");
  return res.data;
};
export const getDetallePlan = async (id) => {
  const res = await microcurriculoApi.get(`detalles/${id}/`);
  return res.data;
};
export const postDetallePlan = async (data) => {
  const res = await microcurriculoApi.post("detalles/", data);
  return res.data;
};
export const putDetallePlan = async (id, data) => {
  const res = await microcurriculoApi.put(`detalles/${id}/`, data);
  return res.data;
};
export const deleteDetallePlan = async (id) => {
  const res = await microcurriculoApi.delete(`detalles/${id}/`);
  return res.data;
};
