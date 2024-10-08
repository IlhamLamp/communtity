import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RefreshToken } from "@/service/token";

const useAuthCheck = (
  setAuthData: (data: { id: number; email: string }) => void
) => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const router = useRouter();

  const verifyAccessToken = async (accessToken: string) => {
    const response = await fetch(
      "http://localhost:3001/api/v1/auth/verify-token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.ok;
  };

  const handleRefreshToken = async (refreshToken: string) => {
    const data = await RefreshToken(refreshToken);
    if (data) {
      localStorage.setItem("access_token", data.token);
      setAuthData({ id: data.data.id, email: data.data.email });
      setIsLogin(true);
      router.push("/");
      return true;
    }
    return false;
  };

  const verifyToken = async () => {
    const accessToken = localStorage.getItem("access_token");
    const refreshToken = localStorage.getItem("refresh_token");

    if (accessToken) {
      const isValid = await verifyAccessToken(accessToken);
      if (isValid) {
        setIsLogin(true);
        return;
      }
      localStorage.removeItem("access_token");
    }

    if (refreshToken) {
      const isRefreshed = await handleRefreshToken(refreshToken);
      if (!isRefreshed) {
        setIsLogin(false);
        router.push("/login");
      }
    } else {
      setIsLogin(false);
      router.push("/login");
    }
  };

  useEffect(() => {
    verifyToken();
  }, [setAuthData, router]);

  return isLogin;
};

export default useAuthCheck;
