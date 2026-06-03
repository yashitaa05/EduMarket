import API from "./axios";

export const getMyMaterials = async () => {
  const response = await API.get(
    "/my-materials"
  );

  return response.data;
};