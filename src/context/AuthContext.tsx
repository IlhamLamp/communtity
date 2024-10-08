"use client";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

interface AuthContextType {
  id: number | null;
  email: string | null;
  setAuthData: (data: { id: number; email: string }) => void;
  clearAuthData: () => void;
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

  const setAuthDataHandler = (data: { id: number; email: string }) => {
    setAuthData(data);
  };

  const clearAuthDataHandler = () => {
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("email");
    setAuthData({ id: null, email: null });
  };

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

  // Save to sessionStorage whenever authData changes
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
