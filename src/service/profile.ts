import { ProfileDefaultData } from "@/data/profile.default";
import { TRegisterUser } from "@/types/user";

export const RegisterUserProfile = async (data: TRegisterUser) => {
    console.log('userdata', data);
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
        console.log(profileData);
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