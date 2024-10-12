// import { useEffect, useState } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import { useAuth } from "@/context/AuthContext";
// import { CheckAccessToken, RefreshToken } from "@/service/token";

// const useAuthCheck = () => {
//   const { isLogin, isLoading, verifyToken } = useAuth();

//   // const [isVerifying, setIsVerifying] = useState<boolean>(true);
//   const router = useRouter();
//   const currentPath = usePathname();

//   const publicRoutes = ["/login", "/", "/faqs", "/signup", "/forgot-password"];

//   // const handleValidToken = (data: any) => {
//   //   setIsLogin(true);
//   //   setAuthData({
//   //     id: data.data.id,
//   //     email: data.data.email,
//   //   });

//   //   if (currentPath === "/login" || currentPath === "/signup") {
//   //     router.push("/");
//   //   }
//   // };

//   // const verifyToken = async () => {
//   //   const access_token = localStorage.getItem("access_token");
//   //   const refresh_token = localStorage.getItem("refresh_token");

//   //   setIsLoading(true);

//   //   // Prevent re-verification if already verified
//   //   if (isVerifying) {
//   //     // If access token exists, check its validity
//   //     if (access_token) {
//   //       const data = await CheckAccessToken(access_token);
//   //       if (data) {
//   //         handleValidToken(data);
//   //         setIsVerifying(false); // Mark verification complete
//   //         setIsLoading(false);
//   //         return;
//   //       }

//   //       // If access token is invalid, remove it and proceed
//   //       localStorage.removeItem("access_token");
//   //       clearAuthData();
//   //     }

//   //     // If access token is invalid or missing, check refresh token
//   //     if (refresh_token) {
//   //       const data = await RefreshToken(refresh_token);
//   //       if (data) {
//   //         localStorage.setItem("access_token", data.token);
//   //         handleValidToken(data);
//   //         setIsVerifying(false); // Mark verification complete
//   //         setIsLoading(false);
//   //         return;
//   //       }

//   //       // If refresh token is invalid, handle logout
//   //       localStorage.removeItem("access_token");
//   //       localStorage.removeItem("refresh_token");
//   //       clearAuthData();
//   //       setIsVerifying(false); // Mark verification complete
//   //       setIsLoading(false);
//   //       router.push("/login");
//   //       return;
//   //     }

//   //     // If neither tokens are present, redirect to login
//   //     if (!access_token && !refresh_token) {
//   //       clearAuthData();
//   //       setIsLogin(false);
//   //       if (currentPath !== "/login") {
//   //         router.push("/login");
//   //       }
//   //     }
//   //     setIsVerifying(false); // Mark verification complete
//   //     setIsLoading(false);
//   //   }
//   // };

//   useEffect(() => {
//     if (!publicRoutes.includes(currentPath) && !isLogin && !isLoading) {
//       router.push("/login"); // Jika route bukan public dan user belum login, redirect ke login
//     } else {
//       verifyToken(); // Verifikasi token di semua route
//     }
//   }, [currentPath, isLogin, isLoading]);

//   return { isLoading, isLogin };
// };

// export default useAuthCheck;
