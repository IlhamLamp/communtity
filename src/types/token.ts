export type TRefreshTokenResponse = {
  message: string;
  token: string;
  data: {
    id: number;
    email: string;
  };
  status: string;
};

export type TCheckAccessTokenResponse = {
  message: string;
  is_valid: boolean;
  data: {
    id: number;
    email: string;
    iat?: number;
    exp?: number;
  };
  status: number;
};
