"use client";
import {
  GetAllAdditionalRoleService,
  GetAllAdditionalTagService,
} from "@/api/extras/additionalProfile";
import { TRoleUser } from "@/types/role";
import { TTag } from "@/types/tag";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface IPublicResourceContext {
  roles: TRoleUser[] | null;
  tags: TTag[] | null;
  isLoading: boolean;
  refreshRoles: () => void;
  refreshTags: () => void;
}

const PublicResourceContext = createContext<IPublicResourceContext | undefined>(
  undefined
);

export const PublicResourceProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [roles, setRoles] = useState<TRoleUser[] | null>(null);
  const [tags, setTags] = useState<TTag[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const refreshRoles = async () => {
    setIsLoading(true);
    try {
      const data = await GetAllAdditionalRoleService();
      setRoles(data?.data);
    } catch (error) {
      console.error("Error fetching roles:", error);
      setRoles([]);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshTags = async () => {
    setIsLoading(true);
    try {
      const data = await GetAllAdditionalTagService();
      setTags(data?.data);
    } catch (error) {
      console.error("Error fetching tag:", error);
      setTags([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshRoles();
    refreshTags();
  }, []);

  const publicResourceMemo = useMemo(
    () => ({
      roles,
      tags,
      isLoading,
      refreshRoles,
      refreshTags,
    }),
    [roles, tags, isLoading]
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
