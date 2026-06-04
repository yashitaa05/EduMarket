import API from "./axios";

export const getCreatorStats = async () => {
  const response = await API.get(
    "/auth/creator/stats"
  );

  return response.data;
};