'use client';
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
  setProfile: React.Dispatch<React.SetStateAction<TProfileUser | null>>;
}

const ProfileContext = createContext<IProfileContext | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [profile, setProfile] = useState<TProfileUser | null>(null);

  const profileMemo = useMemo(
    () => ({
      profile,
      setProfile,
    }),
    [profile]
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
