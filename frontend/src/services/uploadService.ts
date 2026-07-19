import apiClient from "./api";

export const uploadImage = async (
  file: File,
  folder = "general",
): Promise<string> => {
  const formData = new FormData();
  formData.append("image", file);

  const { data } = await apiClient.post<{ success: boolean; url: string }>(
    `/upload?folder=${folder}`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } },
  );

  return data.url;
};
