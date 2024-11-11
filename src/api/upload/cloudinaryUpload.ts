import { TUploadImageResponse } from "@/types/cloudinary";
import { API_UPLOAD_DOWNLOAD_SERVICE } from "@/utils/constant";

export const UploadImageToCloudinaryService = async (
  formData: FormData,
  access_token: string
): Promise<TUploadImageResponse | null> => {
  try {
    const response = await fetch(`${API_UPLOAD_DOWNLOAD_SERVICE}/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      body: formData,
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to upload image");
    }
    const responseData: TUploadImageResponse = await response.json();
    return responseData;
  } catch (error) {
    console.error("An error occured when upload image:", error);
    return null;
  }
};
