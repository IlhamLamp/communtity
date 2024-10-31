"use client";
import LoginAccountForm from "@/components/Form/LoginAccountForm";
import LoadingSpinner from "@/components/Loading/LoadingSpinner";
import { useAuth } from "@/context/AuthContext";
import { useProfile } from "@/context/ProfileContext";
import { TBasicLoginResponse, TBasicLoginUser } from "@/types/user";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

const LoginPage: React.FC = () => {
  const { profile, refreshProfile } = useProfile();
  const router = useRouter();
  const [formData, setFormData] = useState<TBasicLoginUser>({
    email: "",
    password: "",
  });
  // AUTO LOGIN CHECK
  const { isLogin, setIsLogin, setAuthData } = useAuth();

  const handleInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // MANUAL LOGIN WITH EMAIL PASSWORD
  const handleLoginClick = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    setIsLogin(false);

    const loginPromise = fetch("http://localhost:3001/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then(async (response) => {
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setIsLogin(true);
      localStorage.setItem("access_token", data.data.token);
      localStorage.setItem("refresh_token", data.data.refresh_token);
      setAuthData({
        id: data.data.id,
        email: data.data.email,
      });
      refreshProfile();
      router.push("/");
      return data;
    });

    toast.promise(loginPromise, {
      loading: "Logging in...",
      success: "🎉 Login successful!",
      error: (err: TBasicLoginResponse) => err.message,
    });
  };

  return (
    <div className="container mx-auto mt-14 bg-gray-100 lg:rounded-3xl">
      {isLogin && <LoadingSpinner />}
      <div className="flex justify-center px-6 py-8 lg:py-2">
        <div className="w-full xl:w-3/4 lg:w-11/12 flex shadow-xl rounded-3xl">
          <div
            className="w-full h-auto bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-3xl"
            style={{ backgroundImage: "url('./assets/signup.jpg')" }}
          />
          <div className="w-full lg:w-7/12 bg-white p-5 lg:rounded-r-3xl">
            <h3 className="text-2xl text-center">Login with your account!</h3>
            <LoginAccountForm
              data={formData}
              handleInput={handleInputChange}
              handleLogin={handleLoginClick}
              isLogin={isLogin}
            />
            <hr className="mb-6 border-t" />
            <div className="text-center">
              <a
                className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                href="/forgot-password"
              >
                Forgot Password?
              </a>
            </div>
            <div className="text-center">
              <a
                className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                href="/signup"
              >
                Don't have an account? Sign up!
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
