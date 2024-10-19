"use client";
import { TRoleUser } from "@/types/role";
import React, { createContext, useContext, useMemo, useState } from "react";

interface IPublicResourceContext {
  roles: TRoleUser[] | null;
  isLoading: boolean;
}

const PublicResourceContext = createContext<IPublicResourceContext | undefined>(
  undefined
);

export const PublicResourceProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [roles, setRoles] = useState<TRoleUser[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const refreshRoles = () => {};

  const publicResourceMemo = useMemo(
    () => ({
      roles,
      isLoading,
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
