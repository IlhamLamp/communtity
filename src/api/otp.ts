import { TOTPResponse } from "@/types/otp";
import { TRegisterUser } from "@/types/user";
import { API_AUTHENTICATION_SERVICE } from "@/utils/constant";

export const VerifyOTPService = async (
  data: TRegisterUser,
  otp_code: string
): Promise<TOTPResponse> => {
  const response = await fetch(`${API_AUTHENTICATION_SERVICE}/verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: data.id,
      email: data.email,
      otp_code,
    }),
  });
  const result: TOTPResponse = await response.json();
  if (!response.ok) {
    throw new Error(result.message);
  }
  return result;
};

export const ResendOTPService = async (
  data: TRegisterUser
): Promise<TOTPResponse> => {
  const response = await fetch(`${API_AUTHENTICATION_SERVICE}/resend-otp`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      id: data.id,
      email: data.email,
    }),
  });
  const result: TOTPResponse = await response.json();
  if (!response.ok) {
    throw new Error(result.message);
  }
  return result;
};
