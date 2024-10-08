import { useRouter } from 'next/navigation';

type TResponseToken = {
    message: string;
    token: string;
    data: {
        id: number;
        email: string;
    }
    status: string;
}

export const RefreshToken = async (refresh_token: string): Promise<TResponseToken | null> => {
    try {
        const response = await fetch("http://localhost:3001/api/v1/auth/refresh-token", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refresh_token }),
        });
    
        if (!response.ok) {
            console.error("Failed to refresh token", await response.json());
            return null;
        }
        const data: TResponseToken = await response.json();
        return data;
    } catch (error) {
        console.error("Error", error)
        return null;
    }
}

export const CheckAccessToken = async (router: ReturnType<typeof useRouter>): Promise<boolean> => {
    const accessToken = localStorage.getItem("access_token");
    
    if (!accessToken) {
        return false;
    }
    try {
        const response = await fetch("http://localhost:3001/api/v1/auth/verify-token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`,
            },
        });
        if (!response.ok) {
            localStorage.removeItem("access_token");
            return false;
        } 
        router.push("/");
        return true;
    } catch (error) {
        console.error("Error verifying token:", error);
        return false;
    }
}

export const HandleLogout = (router: ReturnType<typeof useRouter>) => {
    console.log("Failed to refresh token, logging out...");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    router.push("/login");
}

// POSIBLY ERROR WHEN ACCESSTOKEN VALID BUT SESSION STORAGE GONE