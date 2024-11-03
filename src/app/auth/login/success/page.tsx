"use client";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/context/ProfileContext";
import { RegisterUserProfile } from "@/service/profile";
import { TOAuthCallbackResponse, TOAuthUser } from "@/types/user";
import { API_AUTHENTICATION_SERVICE } from "@/utils/constant";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

const AuthLoginStatusRedirectPage = () => {
  const searchParams = useSearchParams();
  const callback = searchParams.get("callback");
  const router = useRouter();

  const { isLoading, setIsLoading, isLogin, setIsLogin, setAuthData } =
    useAuth();

  const { refreshProfile } = useProfile();

  const handleUserProfile = async (data: TOAuthUser) => {
    if (data.created) {
      await RegisterUserProfile(data);
    }
    refreshProfile();
  };

  const fetchUserData = async (): Promise<void> => {
    setIsLoading(true);

    try {
      if (!callback) return;

      const response = await fetch(
        `${API_AUTHENTICATION_SERVICE}login/success?callback=${callback}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data: TOAuthCallbackResponse = await response.json();
      if (data?.data) {
        localStorage.setItem("access_token", data.data.token);
        localStorage.setItem("refresh_token", data.data.refresh_token);
        setAuthData({
          id: data.data.id,
          email: data.data.email,
        });
        await handleUserProfile(data.data);
        setIsLogin(true);
        return;
      } else {
        throw new Error("Invalid data received");
      }
    } catch (error) {
      console.error("Error during login:", error);
    } finally {
      setIsLoading(false);
      router.push("/");
    }
  };

  useEffect(() => {
    if (!callback) return;

    const loginPromise = fetchUserData();
    toast.promise(loginPromise, {
      loading: "Logging in...",
      success: "🎉 Login successful!",
      error: (err: Error) => err.message || "An error occurred",
    });
  }, [callback]);

  if (!isLoading && !isLogin) {
    return <LoadingSpinner />;
  } else {
    return (
      <div className="container mx-auto mt-14 bg-gray-100 lg:rounded-3xl">
        <div className="h-screen flex justify-center text-center my-auto">
          verification is complete, you are immediately redirected to the main
          page
        </div>
      </div>
    );
  }
};

export default AuthLoginStatusRedirectPage;
