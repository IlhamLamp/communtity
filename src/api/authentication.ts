import {
  TCheckAccessTokenResponse,
  TRefreshTokenResponse,
} from "@/types/token";
import {
  TBasicLoginResponse,
  TBasicLoginUser,
  TOAuthCallbackResponse,
} from "@/types/user";
import { API_AUTHENTICATION_SERVICE } from "@/utils/constant";

export const FormLoginService = async (
  formData: TBasicLoginUser
): Promise<TBasicLoginResponse> => {
  const response = await fetch(`${API_AUTHENTICATION_SERVICE}/login`, {
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

export const OAuthGoogleLoginService = async (
  callback: string
): Promise<TOAuthCallbackResponse | null> => {
  try {
    const response = await fetch(
      `${API_AUTHENTICATION_SERVICE}/login/success?callback=${callback}`
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed when get oauth callback");
    }
    const responseData: TOAuthCallbackResponse = await response.json();
    return responseData;
  } catch (error) {
    console.error("An error occured when get oauth callback:", error);
    return null;
  }
};

export const LogoutService = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("Refresh profile missing access token");
    return null;
  }
  try {
    const response = await fetch(`${API_AUTHENTICATION_SERVICE}/logout`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const data = await response.json();
      return data;
    }
    return;
  } catch (error) {
    console.error("An error when logout:", error);
    return error;
  }
};

export const RefreshUserTokenService = async (
  refresh_token: string
): Promise<TRefreshTokenResponse | null> => {
  try {
    const response = await fetch(
      `${API_AUTHENTICATION_SERVICE}/refresh-token`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refresh_token }),
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to retrive user profile");
    }
    const responseData: TRefreshTokenResponse = await response.json();
    return responseData;
  } catch (error) {
    console.error("An error occured when refresh toke:", error);
    return null;
  }
};

export const CheckUserTokenService = async (
  access_token: string
): Promise<TCheckAccessTokenResponse | null> => {
  try {
    const response = await fetch(`${API_AUTHENTICATION_SERVICE}/verify-token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to verify active token");
    }
    const responseData: TCheckAccessTokenResponse = await response.json();
    return responseData;
  } catch (error) {
    console.error("An error occured when verify active token:", error);
    return null;
  }
};
