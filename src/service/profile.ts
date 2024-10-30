import { ProfileDefaultData } from "@/data/profile.default";
import { TProfileLoggedInResponse, TProfileUser } from "@/types/profile";
import { TRegisterUser } from "@/types/user";

export const RegisterUserProfile = async (data: TRegisterUser) => {
  const { id, email } = data;
  if (!id) {
    console.error("User ID is missing from data");
    return Promise.reject("User ID is required");
  }
  const randomString = Math.random().toString(36).substring(2, 8);
  const first_name = email?.split("@")[0];
  const username = `${first_name}_${randomString}`;
  const profileData = {
    ...ProfileDefaultData,
    user_id: id,
    first_name,
    username,
  };
  try {
    const response = await fetch(
      "http://localhost:3002/api/v1/profile/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(profileData),
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      console.error(errorData.error);
      return Promise.reject(errorData.message);
    }
    return response;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const UpdateUserProfile = async (data: TProfileUser) => {
  if (!data) return Promise.reject("Invalid data");
  const token = localStorage.getItem("access_token");
  try {
    const response = await fetch(
      `http://localhost:3002/api/v1/profile/update/${data.user_id}`,
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
      console.error("Error:", errorData.message);
      return Promise.reject(errorData.message || "Failed to update profile");
    }

    const updatedProfile = await response.json();
    return updatedProfile;
  } catch (error) {
    console.error("An error occurred while updating the profile:", error);
    return Promise.reject("An error occurred while updating the profile");
  }
};

export const RefreshUserProfile = async (access_token?: string) => {
  const token = access_token || localStorage.getItem("access_token");
  if (!token) {
    console.error("Refresh profile missing access token");
    return Promise.reject("Access token is required");
  }
  try {
    const response = await fetch("http://localhost:3002/api/v1/profile/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      const res = await response.json();
      console.error(res.error);
      return Promise.reject(res.message);
    }
    const profileData: TProfileLoggedInResponse = await response.json();
    return profileData;
  } catch (error) {
    console.error("An error occurred while fetching the profile:", error);
    return Promise.reject("An error occurred while fetching the profile");
  }
};

export const SearchUserProfile = async (name: string) => {
  const token = localStorage.getItem("access_token");
  if (!token) {
    console.error("Search profile missing access token");
    return Promise.reject("Access token is required");
  }
  try {
    const response = await fetch(
      `http://localhost:3002/api/v1/profile/search?name=${name}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to retrieve profile");
    }

    return await response.json();
  } catch (error) {
    console.error("An error occurred while fetching the profile:", error);
    return Promise.reject("An error occurred while fetching the profile");
  }
};
