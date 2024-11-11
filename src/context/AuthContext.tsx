"use client";
import {
  CheckUserTokenService,
  RefreshUserTokenService,
} from "@/api/authentication";
import { usePathname, useRouter } from "next/navigation";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface AuthContextType {
  id: number | null;
  email: string | null;
  isLogin: boolean;
  isLoading: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setAuthData: (data: { id: number; email: string }) => void;
  clearAuthData: () => void;
  verifyToken: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authData, setAuthData] = useState<{
    id: number | null;
    email: string | null;
  }>({
    id: null,
    email: null,
  });
  const router = useRouter();
  const currentPath = usePathname();
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const publicRoutes = [
    "/login",
    "/",
    "/faqs",
    "/signup",
    "/forgot-password",
    "/auth/login/success",
    "/auth/login/redirect",
  ];

  const setAuthDataHandler = (data: { id: number; email: string }) => {
    setAuthData(data);
    setIsLogin(true);
  };

  const clearAuthDataHandler = () => {
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("email");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setAuthData({ id: null, email: null });
    setIsLogin(false);
  };

  const verifyToken = useCallback(async (): Promise<boolean> => {
    const access_token = localStorage.getItem("access_token");
    const refresh_token = localStorage.getItem("refresh_token");

    setIsLoading(true);

    if (access_token) {
      const data = await CheckUserTokenService(access_token);
      if (data) {
        setAuthDataHandler({ id: data.data.id, email: data.data.email });
        setIsLoading(false);
        return true;
      }
      localStorage.removeItem("access_token");
    }

    if (refresh_token) {
      const data = await RefreshUserTokenService(refresh_token);
      if (data) {
        localStorage.setItem("access_token", data.token);
        setAuthDataHandler({ id: data.data.id, email: data.data.email });
        setIsLoading(false);
        return true;
      }
      clearAuthDataHandler();
    } else {
      clearAuthDataHandler();
    }
    setIsLoading(false);
    return false;
  }, []);

  useEffect(() => {
    if (isLogin && (currentPath === "/signup" || currentPath === "/login")) {
      return router.push("/");
    }
    if (!publicRoutes.includes(currentPath) && !isLogin && !isLoading) {
      return router.push("/login");
    }
    if (!isLogin && !isLoading) {
      verifyToken();
    }
  }, [currentPath, isLogin, isLoading, router, verifyToken]);

  useEffect(() => {
    const interval = setInterval(() => {
      verifyToken();
    }, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [verifyToken]);

  useEffect(() => {
    const storedId = sessionStorage.getItem("id");
    const storedEmail = sessionStorage.getItem("email");

    if (storedId && storedEmail) {
      setAuthData({
        id: Number(storedId),
        email: storedEmail,
      });
    }
  }, []);

  useEffect(() => {
    if (authData.id && authData.email) {
      sessionStorage.setItem("id", String(authData.id));
      sessionStorage.setItem("email", authData.email);
    }
  }, [authData]);

  const authMemo = useMemo(
    () => ({
      ...authData,
      setAuthData: setAuthDataHandler,
      clearAuthData: clearAuthDataHandler,
      isLogin,
      isLoading,
      setIsLoading,
      setIsLogin,
      verifyToken,
    }),
    [authData, isLogin, isLoading]
  );

  return (
    <AuthContext.Provider value={authMemo}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
