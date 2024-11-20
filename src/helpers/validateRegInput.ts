import { TRegisterUser } from "@/types/user";

export const validateRegInput = (
  data: TRegisterUser,
  fields: (keyof TRegisterUser)[] = [
    "email",
    "password",
    "confirmation_password",
  ]
): Partial<TRegisterUser> => {
  const errors: Partial<TRegisterUser> = {};

  if (fields.includes("email")) {
    if (!data.email || !data.email.includes("@")) {
      errors.email = "Invalid email address";
    }
  }

  if (fields.includes("password")) {
    if (!data.password || data.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }
  }

  if (fields.includes("confirmation_password")) {
    if (data.password !== data.confirmation_password) {
      errors.confirmation_password = "Passwords do not match";
    }
  }

  return errors;
};
