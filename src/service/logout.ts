import { API_AUTHENTICATION_SERVICE } from "@/utils/constant";

export const LogoutService = async () => {
  try {
    const access_token = localStorage.getItem("access_token");
    const response = await fetch(`${API_AUTHENTICATION_SERVICE}logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!response.ok) {
      const data = await response.json();
      return data;
    }
    console.log("succesfully logout");
    return;
  } catch (error) {
    console.error("An error when logout:", error);
  }
};
