"use client";
import { RegisterUserAccountService } from "@/api/userAccount";
import RegisterAccountForm from "@/components/Form/RegisterAccountForm";
import VerifyOtpForm from "@/components/Form/VerifyOtpForm";
import { TRegisterResponse, TRegisterUser } from "@/types/user";
import Link from "next/link";
import React, { useState } from "react";
import toast from "react-hot-toast";

const SignUpPage: React.FC = () => {
  const [isOtpStage, setIsOtpStage] = useState<boolean>(false);
  const [formData, setFormData] = useState<TRegisterUser>({
    id: 0,
    email: "",
    password: "",
    confirmation_password: "",
    otp_code: "",
    is_verified: false,
  });

  const handleInputChange = async (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRegisterClick = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const registerPromise = RegisterUserAccountService(formData);
    toast
      .promise(registerPromise, {
        loading: "Registering account...",
        success:
          "📧 Registration successfull! Please check your email for OTP.",
        error: (err: TRegisterResponse) =>
          err.message || "An error occurred during registration.",
      })
      .then((data) => {
        setFormData((prevData) => ({
          ...prevData,
          id: data?.user?.id ?? 0,
          otp_code: "",
          is_verified: data?.user?.is_verified ?? false,
        }));
        setIsOtpStage(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <div className="container mx-auto mt-[3rem] lg:mt-[3.7rem] bg-gray-100 lg:rounded-3xl h-auto lg:min-h-[560px]">
      <div className="flex justify-center items-center px-6 py-8 lg:py-2">
        <div className="w-full xl:w-3/4 lg:w-11/12 flex shadow-xl rounded-3xl">
          <div
            className="w-full h-auto lg:min-h-[550px] bg-gray-400 hidden lg:block lg:w-5/12 bg-cover rounded-l-3xl"
            style={{ backgroundImage: "url('./assets/signup.jpg')" }}
          />
          <div className="w-full lg:w-7/12 bg-white p-5 lg:rounded-r-3xl h-auto">
            <h3 className="text-2xl text-center">
              {isOtpStage ? "OTP Verification" : "Create an Account!"}
            </h3>
            {!isOtpStage ? (
              <RegisterAccountForm
                data={formData}
                handleInput={handleInputChange}
                handleRegister={handleRegisterClick}
              />
            ) : (
              <VerifyOtpForm data={formData} />
            )}
            <hr className="mb-6 border-t" />
            <div className="text-center">
              <Link
                className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                href="/login"
              >
                Already have an account? Login!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
