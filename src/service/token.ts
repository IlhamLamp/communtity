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