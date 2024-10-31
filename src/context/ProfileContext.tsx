"use client";
import { RefreshUserProfile } from "@/service/profile";
import { TProfileUser } from "@/types/profile";
import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

interface IProfileContext {
  profile: TProfileUser | null;
  isLoading: boolean;
  setProfile: React.Dispatch<React.SetStateAction<TProfileUser | null>>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  refreshProfile: () => void;
}

const ProfileContext = createContext<IProfileContext | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [profile, setProfile] = useState<TProfileUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const refreshProfile = async () => {
    setIsLoading(true);
    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        throw new Error("Access token not found");
      }
      const response = await RefreshUserProfile(accessToken);
      const profileData = response?.data;
      if (!profileData) throw new Error("Profile data is undefined");
      setProfile(profileData);
    } catch (error) {
      console.error("Failed to refresh profile:", error);
      setProfile(null);
    } finally {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      refreshProfile();
    }
  }, []);

  const profileMemo = useMemo(
    () => ({
      profile,
      isLoading,
      setProfile,
      setIsLoading,
      refreshProfile,
    }),
    [profile, isLoading]
  );
  return (
    <ProfileContext.Provider value={profileMemo}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfile must be used within an ProfileProvider");
  }
  return context;
};
