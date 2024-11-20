import { TRegisterUser } from "./user";

export type TOTPResponse = {
  message: string;
  status: number;
  user?: TRegisterUser;
  error?: any;
};
