import { TRegisterResponse, TRegisterUser } from "@/types/user";
import { API_AUTHENTICATION_SERVICE } from "@/utils/constant";

export const RegisterUserAccountService = async (
  formData: TRegisterUser
): Promise<TRegisterResponse> => {
  const response = await fetch(`${API_AUTHENTICATION_SERVICE}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message);
  }
  return data;
};

export const UpdateUserAccountPasswordService = async (
  formData: TRegisterUser,
  callback: string
): Promise<TRegisterResponse | null> => {
  try {
    const response = await fetch(
      `${API_AUTHENTICATION_SERVICE}/login/redirect?callback=${callback}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    const data: TRegisterResponse = await response.json();
    if (!response.ok) {
      throw new Error(data.message);
    }
    return data;
  } catch (error) {
    console.error("An error occured when updating user password: ", error);
    return null;
  }
};
