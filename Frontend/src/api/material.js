import API from "./axios";

export const getMaterials = async (params = {}) => {
  const response = await API.get("/materials", {
    params,
  });

  return response.data;
};

export const getMaterialById = async (id) => {
  const response = await API.get(`/materials/${id}`);

  return response.data;
};

export const downloadMaterial = async (id) => {
  const response = await API.get(
    `/materials/${id}/download`
  );

  return response.data;
};

export const getMaterialReviews = async (id) => {
  const response = await API.get(
    `/materials/${id}/reviews`
  );

  return response.data;
};

export const addReview = async (
  id,
  reviewData
) => {
  const response = await API.post(
    `/materials/${id}/review`,
    reviewData
  );

  return response.data;
};

export const uploadMaterial = async (formData) => {
  try {
    const token = localStorage.getItem("token");

    const response = await API.post("/materials", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(
      "Upload Material Error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

