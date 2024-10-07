"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

interface AuthContextType {
  id: number | null;
  email: string | null;
  refresh_token: string | null;
  setAuthData: (data: {
    id: number;
    email: string;
    refresh_token: string;
  }) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [authData, setAuthData] = useState<{
    id: number | null;
    email: string | null;
    refresh_token: string | null;
  }>({
    id: null,
    email: null,
    refresh_token: null,
  });

  const setAuthDataHandler = (data: {
    id: number;
    email: string;
    refresh_token: string;
  }) => {
    setAuthData(data);
  };

  // Load initial data from sessionStorage (if any)
  useEffect(() => {
    const storedId = sessionStorage.getItem("id");
    const storedEmail = sessionStorage.getItem("email");
    const storedRefreshToken = sessionStorage.getItem("refresh_token");

    if (storedId && storedEmail && storedRefreshToken) {
      setAuthData({
        id: Number(storedId),
        email: storedEmail,
        refresh_token: storedRefreshToken,
      });
    }
  }, []);

  // Save to sessionStorage whenever authData changes
  useEffect(() => {
    if (authData.id && authData.email && authData.refresh_token) {
      sessionStorage.setItem("id", String(authData.id));
      sessionStorage.setItem("email", authData.email);
      sessionStorage.setItem("refresh_token", authData.refresh_token);
    }
  }, [authData]);

  const authMemo = useMemo(
    () => ({
      ...authData,
      setAuthData: setAuthDataHandler,
    }),
    [authData, setAuthData]
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
