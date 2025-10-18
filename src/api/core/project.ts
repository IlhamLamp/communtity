import { TProjectResponse, TProjects } from "@/types/project";
import { API_CORE_PROJECT_SERVICE } from "@/utils/constant";

export const GetAllProjectsService = async () => {
  try {
    const response = await fetch(`${API_CORE_PROJECT_SERVICE}`);
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to get all projects");
    }
    const responseData: TProjectResponse = await response.json();
    return responseData;
  } catch (error) {
    console.error("An error occured when get all role: ", error);
    return null;
  }
};

export const CreateProjectsService = async (
  formData: TProjects
): Promise<TProjectResponse | null> => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("Create project missing access token");
    return null;
  }
  const response = await fetch(`${API_CORE_PROJECT_SERVICE}/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};
