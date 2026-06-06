import API from "./axios";

export const getMaterials = (params) =>
  API.get("/materials", { params }).then(res => res.data);

export const getMaterialById = (id) =>
  API.get(`/materials/${id}`).then(res => res.data);

export const downloadMaterial = (id) =>
  API.get(`/materials/${id}/download`, { responseType: "blob" })
    .then(res => res.data);

export const getMaterialReviews = (id) =>
  API.get(`/materials/${id}/reviews`).then(res => res.data);

export const addReview = (id, reviewData) =>
  API.post(`/materials/${id}/reviews`, reviewData)
    .then(res => res.data);

export const uploadMaterial = (formData) =>
  API.post("/materials", formData).then(res => res.data);