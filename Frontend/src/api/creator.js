import API from "./axios";

export const getMyMaterials = async () => {
  const response = await API.get(
    "/materials/my-materials"
  );

  console.log(
    "MY MATERIALS API RESPONSE:",
    response.data
  );

  return response.data;
};