"use client";
import { TRoleResponse, TRoleUser } from "@/types/role";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface IPublicResourceContext {
  roles: TRoleUser[] | null;
  isLoading: boolean;
  refreshRoles: () => void;
}

const PublicResourceContext = createContext<IPublicResourceContext | undefined>(
  undefined
);

export const PublicResourceProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [roles, setRoles] = useState<TRoleUser[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const refreshRoles = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("http://localhost:3002/api/v1/role");
      const data: TRoleResponse = await response.json();
      setRoles(data.data);
    } catch (error) {
      console.error("Error fetching roles:", error);
      setRoles([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshRoles();
  }, []);

  const publicResourceMemo = useMemo(
    () => ({
      roles,
      isLoading,
      refreshRoles,
    }),
    [roles, isLoading]
  );
  return (
    <PublicResourceContext.Provider value={publicResourceMemo}>
      {children}
    </PublicResourceContext.Provider>
  );
};

export const usePublicResource = () => {
  const context = useContext(PublicResourceContext);
  if (!context) {
    throw new Error(
      "usePublicResource must be used within an PublicResourceProvider"
    );
  }
  return context;
};
