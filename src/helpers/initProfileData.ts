import { ProfileDefaultData } from "@/data/profile.default";
import { TOAuthUser, TRegisterUser } from "@/types/user";

export const initializeProfileData = (data: TRegisterUser | TOAuthUser) => {
  const randomString = Math.random().toString(36).substring(2, 8);
  const first_name =
    "first_name" in data ? data.first_name : data.email?.split("@")[0];
  const username = `${first_name}_${randomString}`;

  const profileData = {
    ...ProfileDefaultData,
    user_id: data.id!,
    first_name,
    last_name: "last_name" in data ? data.last_name : "",
    username,
    profile_picture: "profile_picture" in data ? data.profile_picture : "",
  };

  return profileData;
};
