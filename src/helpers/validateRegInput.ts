import { TRegisterUser } from "@/types/user";

export const validateRegInput = (data: TRegisterUser): TRegisterUser => {
  return {
    email: data?.email?.includes("@") ? "" : "Invalid email address",
    password:
      data?.password && data.password.length < 8
        ? ""
        : "Password must be at least 8 characters",
    confirmation_password:
      data.password === data.confirmation_password
        ? ""
        : "Passwords do not match",
  };
};
