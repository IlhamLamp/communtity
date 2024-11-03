import { API_UPLOAD_DOWNLOAD_SERVICE } from "@/utils/constant";
import { fetchWithAuth } from "./fetchWithAuth";

export const uploadImageToCloudinary = async (
  formData: FormData,
  accessToken: string | null,
  verifyToken: () => Promise<boolean>,
  clearAuthData: () => void
) => {
  const response = await fetchWithAuth(
    `${API_UPLOAD_DOWNLOAD_SERVICE}upload`,
    {
      method: "POST",
      body: formData,
    },
    accessToken,
    verifyToken,
    clearAuthData
  );

  if (!response.ok) {
    throw new Error("Failed to upload image");
  }
  return await response.json();
};
