import { initializeProfileData } from "@/helpers/initProfileData";
import {
  TGetAllProfileResponse,
  TProfileLoggedInResponse,
  TProfileUser,
} from "@/types/profile";
import { TOAuthUser, TRegisterUser } from "@/types/user";
import { API_USER_PROFILE_SERVICE } from "@/utils/constant";

export const CreateUserProfileService = async (
  data: TRegisterUser | TOAuthUser
): Promise<TProfileLoggedInResponse | null> => {
  const { id } = data;
  if (!id) {
    throw new Error("User ID is missing from data");
  }
  const profileData = initializeProfileData(data);
  try {
    const response = await fetch(`${API_USER_PROFILE_SERVICE}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to create user profile");
    }

    const responseData: TProfileLoggedInResponse = await response.json();
    return responseData;
  } catch (error) {
    console.error("An error occured when create profile:", error);
    return null;
  }
};

export const UpdateUserProfileService = async (
  data: TProfileUser
): Promise<TProfileLoggedInResponse | null> => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    console.error("Refresh profile missing access token");
    return null;
  }
  try {
    const response = await fetch(
      `${API_USER_PROFILE_SERVICE}/update/${data.user_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to update user profile");
    }
    const responseData: TProfileLoggedInResponse = await response.json();
    return responseData;
  } catch (error) {
    console.error("An error occured when updating profile: ", error);
    return null;
  }
};

export const RefreshUserProfileService =
  async (): Promise<TProfileLoggedInResponse | null> => {
    const token = localStorage.getItem("access_token");
    if (!token) {
      console.error("Refresh profile missing access token");
      return null;
    }
    try {
      const response = await fetch(`${API_USER_PROFILE_SERVICE}/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to retrive user profile");
      }
      const responseData: TProfileLoggedInResponse = await response.json();
      return responseData;
    } catch (error) {
      console.error("An error occured when create profile:", error);
      return null;
    }
  };

export const SearchUserProfileService = async (
  query: string
): Promise<TGetAllProfileResponse | null> => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    console.error("Refresh profile missing access token");
    return null;
  }
  try {
    const response = await fetch(
      `${API_USER_PROFILE_SERVICE}/search?name=${query}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to retrive user profile");
    }
    const responseData: TGetAllProfileResponse = await response.json();
    return responseData;
  } catch (error) {
    console.error("An error occured when create profile:", error);
    return null;
  }
};
