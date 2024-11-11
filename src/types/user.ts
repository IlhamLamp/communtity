export type TRegisterUser = {
  id?: number;
  email?: string;
  password?: string;
  confirmation_password?: string;
  google_id?: string;
  otp_code?: string;
  otp_expiration?: Date;
  is_verified?: boolean;
  created_at?: Date;
  updated_at?: Date;
};

export type TRegisterResponse = {
  message: string;
  error: string;
  status: number;
  user?: TRegisterUser;
};

export type TBasicLoginUser = {
  email: string;
  password: string;
};

export type TBasicLoginResponse = {
  message: string;
  data?: {
    id: number;
    email: string;
    token: string;
    refresh_token: string;
  };
  status: number;
};

export type TOAuthUser = {
  id: number;
  google_id: string;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
  profile_picture: string;
  token: string;
  refresh_token: string;
  created: boolean;
};

export type TOAuthCallbackResponse = {
  message: string;
  data?: TOAuthUser;
  status: number;
};
