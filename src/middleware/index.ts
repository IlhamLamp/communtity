import { useRouter } from 'next/navigation';

export const checkAccessToken = (router: ReturnType<typeof useRouter>, setIsLogin: React.Dispatch<React.SetStateAction<boolean>>) => {
    const accesToken = localStorage.getItem("access_token");
    if (accesToken) {
        setIsLogin(true);
        return router.push("/");
    }
}

// POSIBLY ERROR WHEN ACCESSTOKEN VALID BUT SESSION STORAGE GONE