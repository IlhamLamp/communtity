import { getRandomBgColor } from "@/components/Modal/bgTagColor";

export const saveTagToDatabase = async (tagName: string) => {
  const response = await fetch("http://localhost:3002/api/v1/tag/create", {
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
}

export const saveRoleToDatabase = async (roleName: string) => {
  const response = await fetch("http://localhost:3002/api/v1/role/create", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
      body: JSON.stringify({ name: roleName, description: roleName, is_active: true}),
    });
    
    if (!response.ok) {
      throw new Error("Failed to save role");
    }
    
  return await response.json();
}