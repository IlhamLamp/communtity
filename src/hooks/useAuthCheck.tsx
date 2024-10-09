import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { CheckAccessToken, HandleLogout, RefreshToken } from "@/service/token";

const useAuthCheck = () => {
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(true); // New state to prevent looping
  const router = useRouter();
  const currentPath = usePathname();
  const { clearAuthData, setAuthData } = useAuth();

  const handleValidToken = (data: any) => {
    setIsLogin(true);
    setAuthData({
      id: data.data.id,
      email: data.data.email,
    });

    if (currentPath === "/login" || currentPath === "/signup") {
      router.push("/");
    }
  };

  const verifyToken = async () => {
    const access_token = localStorage.getItem("access_token");
    const refresh_token = localStorage.getItem("refresh_token");

    // Prevent re-verification if already verified
    if (isVerifying) {
      // If access token exists, check its validity
      if (access_token) {
        const data = await CheckAccessToken(access_token);
        if (data) {
          handleValidToken(data);
          setIsVerifying(false); // Mark verification complete
          return;
        }

        // If access token is invalid, remove it and proceed
        localStorage.removeItem("access_token");
        clearAuthData();
      }

      // If access token is invalid or missing, check refresh token
      if (refresh_token) {
        const data = await RefreshToken(refresh_token);
        if (data) {
          localStorage.setItem("access_token", data.token);
          handleValidToken(data);
          setIsVerifying(false); // Mark verification complete
          return;
        }

        // If refresh token is invalid, handle logout
        clearAuthData();
        HandleLogout(router);
        setIsVerifying(false); // Mark verification complete
        return;
      }

      // If neither tokens are present, redirect to login
      if (!access_token && !refresh_token) {
        clearAuthData();
        setIsLogin(false);
        if (currentPath !== "/" && currentPath !== "/login") {
          router.push("/login");
        }
      }
      setIsVerifying(false); // Mark verification complete
    }
  };

  useEffect(() => {
    if (isVerifying) {
      verifyToken();
    }
  }, [isVerifying, setAuthData, clearAuthData, router, currentPath]);

  return { isLogin, setIsLogin };
};

export default useAuthCheck;
