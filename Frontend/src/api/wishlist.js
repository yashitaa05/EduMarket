import API from "./axios";

export const getWishlist = async () => {
  const response = await API.get("/wishlist");
  return response.data;
};

export const addToWishlist = async (materialId) => {
  const response = await API.post(
    `/wishlist/${materialId}`
  );

  return response.data;
};

export const removeFromWishlist = async (
  materialId
) => {
  const response = await API.delete(
    `/wishlist/${materialId}`
  );

  return response.data;
};