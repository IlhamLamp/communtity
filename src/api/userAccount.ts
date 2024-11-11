import { TRegisterResponse, TRegisterUser } from "@/types/user";
import { API_AUTHENTICATION_SERVICE } from "@/utils/constant";

export const RegisterUserAccountService = async (
  formData: TRegisterUser
): Promise<TRegisterResponse> => {
  const response = await fetch(`${API_AUTHENTICATION_SERVICE}/register`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};
