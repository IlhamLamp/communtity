import { getRandomBgColor } from "@/helpers/tagColor";
import { TRoleResponse } from "@/types/role";
import { TTagResponse } from "@/types/tag";
import {
  API_PUBLIC_ROLE_SERVICE,
  API_PUBLIC_TAG_SERVICE,
} from "@/utils/constant";

export const GetAllAdditionalRoleService =
  async (): Promise<TRoleResponse | null> => {
    try {
      const response = await fetch(`${API_PUBLIC_ROLE_SERVICE}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to get all role");
      }
      const responseData: TRoleResponse = await response.json();
      return responseData;
    } catch (error) {
      console.error("An error occured when get all role: ", error);
      return null;
    }
  };

export const CreateAdditionalRoleService = async (
  roleName: string
): Promise<TRoleResponse | null> => {
  try {
    const response = await fetch(`${API_PUBLIC_ROLE_SERVICE}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: roleName,
        description: roleName,
        isActive: true,
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create new role");
    }
    const responseData: TRoleResponse = await response.json();
    return responseData;
  } catch (error) {
    console.error("An error occured when create new role: ", error);
    return null;
  }
};

export const GetAllAdditionalTagService =
  async (): Promise<TTagResponse | null> => {
    try {
      const response = await fetch(`${API_PUBLIC_TAG_SERVICE}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to get all tags");
      }
      const responseData: TTagResponse = await response.json();
      return responseData;
    } catch (error) {
      console.error("An error occured when get all tags: ", error);
      return null;
    }
  };

export const CreateAdditionalTagService = async (
  tagName: string
): Promise<TTagResponse | null> => {
  try {
    const response = await fetch(`${API_PUBLIC_TAG_SERVICE}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: tagName,
        color: getRandomBgColor(),
      }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create new tag");
    }
    const responseData: TTagResponse = await response.json();
    return responseData;
  } catch (error) {
    console.error("An error occured when create new tag: ", error);
    return null;
  }
};
