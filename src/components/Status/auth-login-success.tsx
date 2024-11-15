"use client";
import { OAuthGoogleLoginService } from "@/api/authentication";
import { CreateUserProfileService } from "@/api/profile";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/context/ProfileContext";
import useCallbackParam from "@/hooks/useCallbackParam";
import { TOAuthUser } from "@/types/user";
import { useRouter } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import toast from "react-hot-toast";

const StatusAuthLoginSuccess: React.FC = () => {
  const router = useRouter();
  const callback = useCallbackParam();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number>(5);

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
    }
  };

  useEffect(() => {
    if (!callback || isSubmitting) return;

    setIsSubmitting(true);
    const loginPromise = fetchUserData();
    toast.promise(loginPromise, {
      loading: "Logging in...",
      success: "🎉 Login successfull!",
      error: (err: Error) => err.message || "An error occurred",
    });
  }, [callback]);

  useEffect(() => {
    if (isLogin) {
      const countdownTimer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);

      if (countdown < 1) {
        router.push("/");
      }

      return () => clearInterval(countdownTimer);
    }
  }, [isLogin, countdown, router]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isLoading && isLogin) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="text-center">
          <p className="text-xl font-semibold">Verification is complete</p>
          <p className="text-gray-600">
            You are being redirected to the main page in {countdown} seconds
          </p>
        </div>
      </div>
    );
  }

  return null;
};

export default StatusAuthLoginSuccess;
