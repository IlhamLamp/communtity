import { getRandomBgColor } from "@/components/Modal/bgTagColor";
import {
  API_PUBLIC_ROLE_SERVICE,
  API_PUBLIC_TAG_SERVICE,
} from "@/utils/constant";

export const saveTagToDatabase = async (tagName: string) => {
  const response = await fetch(`${API_PUBLIC_TAG_SERVICE}create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: tagName, color: getRandomBgColor() }),
  });

  if (!response.ok) {
    throw new Error("Failed to save tag");
  }

  return await response.json();
};

export const saveRoleToDatabase = async (roleName: string) => {
  const response = await fetch(`${API_PUBLIC_ROLE_SERVICE}create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: roleName,
      description: roleName,
      is_active: true,
    }),
  });

  if (!response.ok) {
    throw new Error("Failed to save role");
  }

  return await response.json();
};
