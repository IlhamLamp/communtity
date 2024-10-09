export const LogoutService = async() => {
    try {
        const access_token = localStorage.getItem('access_token');
        const response = await fetch('http://localhost:3001/api/v1/auth/logout', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${access_token}`
            }
        });

        if (!response.ok) {
            const data = await response.json();
            return data;
        }
      
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        return;
    } catch (error) {
        console.error("An error when logout:", error);
    }
}