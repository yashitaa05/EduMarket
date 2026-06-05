import axios from "axios";

// Base URL (change if your backend runs on different port/domain)
const API = axios.create({
  baseURL: "http://localhost:8000/api/admin",
});

// Optional: attach token automatically (if using JWT auth)
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});


// 📌 Get all pending materials (for admin approval)
export const getPendingMaterials = async () => {
  try {
    const res = await API.get("/pending");
    return res.data;
  } catch (error) {
    console.error("Error fetching pending materials:", error);
    throw error;
  }
};


// 📌 Approve a material
export const approveMaterial = async (id) => {
  try {
    const res = await API.put(`/approve/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error approving material:", error);
    throw error;
  }
};


// 📌 Delete a material
export const deleteMaterial = async (id) => {
  try {
    const res = await API.delete(`/delete/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting material:", error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const res = await API.delete(`/user/delete/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const res = await API.get("/users");
    return res.data;
  } catch (error) {
    console.error("Error fetching users:", error.message);
    throw error;
  }
};
export const updateUserRole = async (id, role) => {
  try {
    const res = await API.put(`/user/role/${id}`, { role });
    return res.data;
  } catch (error) {
    console.error("Error updating user role:", error);
    throw error;
  }
};