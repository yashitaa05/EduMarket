import API from "./axios";

export const getCreatorStats = async () => {
  const response = await API.get(
    "/creator/stats"
  );

  return response.data;
};