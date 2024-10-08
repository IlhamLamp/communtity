import { useRouter } from 'next/navigation';

type TResponseRefreshToken = {
    message: string;
    token: string;
    data: {
        id: number;
        email: string;
    }
    status: string;
}

type TResponseAccessToken = {
    message: string;
    is_valid: boolean;
    data: {
      id: number;
      email: string;
      iat?: number;
      exp?: number;
    },
    status: number;
}

export const RefreshToken = async (refresh_token: string): Promise<TResponseRefreshToken | null> => {
    if (!refresh_token) {
        return null;
    }
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
        const data: TResponseRefreshToken = await response.json();
        return data;
    } catch (error) {
        console.error("Error", error)
        return null;
    }
}

export const CheckAccessToken = async (access_token: string): Promise<TResponseAccessToken | null> => {    
    if (!access_token) {
        return null;
    }
    try {
        const response = await fetch("http://localhost:3001/api/v1/auth/verify-token", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access_token}`,
            },
        });
        if (!response.ok) {
            localStorage.removeItem("access_token");
            return null;
        }
        const data: TResponseAccessToken = await response.json();
        return data;
    } catch (error) {
        console.error("Error verifying token:", error);
        return null;
    }
}

export const HandleLogout = (router: ReturnType<typeof useRouter>) => {
    console.log("Failed to refresh token, logging out...");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    router.push("/login");
}

// POSIBLY ERROR WHEN ACCESSTOKEN VALID BUT SESSION STORAGE GONE