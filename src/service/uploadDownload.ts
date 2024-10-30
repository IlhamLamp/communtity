import { TUploadImageResponse } from "@/types/cloudinary";

export const uploadImageToCloudinary = async (
  formData: FormData
): Promise<TUploadImageResponse> => {
  const token = localStorage.getItem("access_token");
  const response = await fetch("http://localhost:3100/api/v1/upload", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload image");
  }

  return await response.json();
};
