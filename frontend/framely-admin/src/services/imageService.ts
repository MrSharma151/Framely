// services/imageService.ts
import apiClient from "./apiClient";

export const uploadImage = async (formData: FormData): Promise<string> => {
  const res = await apiClient.post("/Blob/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.url;
};

export const deleteImage = async (fileName: string): Promise<void> => {
  await apiClient.delete(`/Blob/${fileName}`);
};

