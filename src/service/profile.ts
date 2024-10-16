import { ProfileDefaultData } from "@/data/profile.default";
import { TProfileLoggedInResponse } from "@/types/profile";
import { TRegisterUser } from "@/types/user";

export const RegisterUserProfile = async (data: TRegisterUser) => {
    const { id, email } = data
    if (!id) {
        console.error('User ID is missing from data');
        return Promise.reject('User ID is required');
    }
    const randomString = Math.random().toString(36).substring(2, 8); 
    const first_name = email?.split('@')[0];
    const username = `${first_name}_${randomString}`;
    const profileData = {
        ...ProfileDefaultData,
        user_id: id,
        first_name,
        username,
    }
    try {
        const response = await fetch("http://localhost:3002/api/v1/profile/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(profileData),
        })
        if (!response.ok) {
            const resData = await response.json();
            console.error(resData.error);
            return Promise.reject(resData.message);
        }
        return response;
    } catch (error) {
        console.error(error);
        return error;
    }
}

export const RefreshUserProfile = async (access_token?: string) => {
    const token = access_token || localStorage.getItem("access_token");
    if (!token) {
        console.error('Refresh profile missing access token');
        return Promise.reject('Access token is required');
    }
    try {
        const response = await fetch("http://localhost:3002/api/v1/profile/me", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            },
        })
        if (!response.ok) {
            const res = await response.json();
            console.error(res.error);
            return Promise.reject(res.message);
        }
        const profileData: TProfileLoggedInResponse = await response.json();
        return profileData;
    } catch (error) {
        console.error('An error occurred while fetching the profile:', error);
        return Promise.reject('An error occurred while fetching the profile');
    }
}