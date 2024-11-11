"use client";
import { OAuthGoogleLoginService } from "@/api/authentication";
import { CreateUserProfileService } from "@/api/profile";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/context/ProfileContext";
import { TOAuthUser } from "@/types/user";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AuthLoginSuccessCallbackPage: React.FC = () => {
  const searchParams = useSearchParams();
  const callback = searchParams.get("callback");
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const { isLoading, setIsLoading, isLogin, setIsLogin, setAuthData } =
    useAuth();
  const { refreshProfile } = useProfile();

  const handleUserProfile = async (data: TOAuthUser) => {
    if (data.created) {
      await CreateUserProfileService(data);
    }
    refreshProfile();
  };

  const fetchUserData = async () => {
    setIsLoading(true);

    try {
      if (!callback) return;

      const result = await OAuthGoogleLoginService(callback);
      if (result?.data) {
        localStorage.setItem("access_token", result.data.token);
        localStorage.setItem("refresh_token", result.data.refresh_token);
        setAuthData({
          id: result.data.id,
          email: result.data.email,
        });
        await handleUserProfile(result.data);
        setIsLogin(true);
      } else {
        throw new Error("Invalid data received");
      }
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
    } finally {
      setIsLoading(false);
      setIsSubmitting(false);
      router.push("/");
    }
  };

  useEffect(() => {
    if (!callback || isSubmitting) return;
    console.log("use effect test");

    setIsSubmitting(true);
    const loginPromise = fetchUserData();
    toast.promise(loginPromise, {
      loading: "Logging in...",
      success: "🎉 Login successful!",
      error: (err: Error) => err.message || "An error occurred",
    });
  }, [callback]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isLoading && isLogin) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <p className="text-xl font-semibold">Verification is complete</p>
          <p className="text-gray-600">
            You are being redirected to the main page
          </p>
        </div>
      </div>
    );
  }

  return null;
};

export default AuthLoginSuccessCallbackPage;
