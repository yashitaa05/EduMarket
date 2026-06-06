import API from "./axios";

/**
 * ADMIN: MATERIAL MANAGEMENT
 */

// Get all pending materials
export const getPendingMaterials = async () => {
  try {
    const res = await API.get("/admin/materials/pending");
    return res.data;
  } catch (err) {
    throw err.response?.data || err.message;
  }
};

// Approve material
export const approveMaterial = async (id) => {
  try {
    const res = await API.put(`/admin/materials/${id}/approve`);
    return res.data;
  } catch (err) {
    throw err.response?.data || err.message;
  }
};

// Delete material
export const deleteMaterial = async (id) => {
  try {
    const res = await API.delete(`/admin/materials/${id}`);
    return res.data;
  } catch (err) {
    throw err.response?.data || err.message;
  }
};


/**
 * ADMIN: USER MANAGEMENT
 */

// Get all users
export const getAllUsers = async () => {
  try {
    const res = await API.get("/admin/users");
    return res.data;
  } catch (err) {
    throw err.response?.data || err.message;
  }
};

// Delete user
export const deleteUser = async (id) => {
  try {
    const res = await API.delete(`/admin/users/${id}`);
    return res.data;
  } catch (err) {
    throw err.response?.data || err.message;
  }
};