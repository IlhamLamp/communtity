interface FetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

export const fetchWithAuth = async (
  url: string,
  options: FetchOptions = {},
  accessToken: string | null,
  verifyToken: () => Promise<boolean>,
  clearAuthData: () => void
): Promise<Response> => {
  let token = accessToken;

  const authOptions: FetchOptions = {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    },
  };

  let response = await fetch(url, authOptions);
  if (response.status === 401) {
    const refreshSuccess = await verifyToken();

    if (refreshSuccess) {
      token = localStorage.getItem("access_token");
      authOptions.headers = {
        ...authOptions.headers,
        Authorization: `Bearer ${token}`,
      };
      response = await fetch(url, authOptions);
    } else {
      clearAuthData();
      window.location.href = "/login";
    }
  }

  return response;
};
