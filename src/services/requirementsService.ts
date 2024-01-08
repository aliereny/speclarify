import { axiosClient } from "@/data/axiosClient";

export const parsePDF = async (projectId: number, file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axiosClient.post(
    `/projects/${projectId}/parse-pdf`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
};

export const getProjectRequirements = async (projectId: number) => {
  const response = await axiosClient.get(`/projects/${projectId}/requirements`);
  return response.data;
};
