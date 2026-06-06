import API from "./axios";

// ---------------- APPROVED MATERIALS ----------------
export const getApprovedMaterials = async () => {
  const response = await API.get("/materials/approved");

  console.log("APPROVED MATERIALS:", response.data);

  return response.data;
};

// ---------------- WISHLIST ----------------
export const getWishlist = async () => {
  const response = await API.get("/wishlist");

  console.log("WISHLIST:", response.data);

  return response.data;
};

export const addToWishlist = async (materialId) => {
  const response = await API.post("/wishlist", { materialId });

  console.log("ADD TO WISHLIST:", response.data);

  return response.data;
};

// ---------------- DOWNLOAD MATERIAL ----------------
// Option 1: direct download link hit (most common)
export const downloadMaterial = (materialId) => {
  const token = localStorage.getItem("token");

  const url = `http://localhost:8000/api/materials/download/${materialId}?token=${token}`;

  // open in new tab OR trigger download
  window.open(url, "_blank");
};

// ---------------- REVIEW MATERIAL ----------------
export const addReview = async (materialId, reviewData) => {
  const response = await API.post(
    `/materials/${materialId}/review`,
    reviewData
  );

  console.log("ADD REVIEW RESPONSE:", response.data);

  return response.data;
};

// ---------------- GET REVIEWS ----------------
export const getReviews = async (materialId) => {
  const response = await API.get(`/materials/${materialId}/reviews`);

  console.log("REVIEWS:", response.data);

  return response.data;
};