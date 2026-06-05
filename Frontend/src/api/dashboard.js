import API from "./axios";

export const getCreatorStats = async () => {
  const response = await API.get(
    "/materials/creator/stats"
  );

  return response.data;
};