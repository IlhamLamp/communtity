"use client";
import { UpdateUserAccountPasswordService } from "@/api/userAccount";
import SetupNewPasswordForm from "@/components/Form/SetupNewPasswordForm";
import { TRegisterUser } from "@/types/user";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AuthLoginRedirectSetPasswordPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callback = searchParams.get("callback") ?? "";
  const [formData, setFormData] = useState<TRegisterUser>({
    email: "",
    password: "",
    confirmation_password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const [countdown, setCountdown] = useState<number | null>(null);

  const handleInputChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = ev.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSavePasswordClick = async (
    ev?: React.FormEvent<HTMLFormElement>
  ) => {
    ev?.preventDefault();
    setIsSubmitting(true);

    try {
      const data = await UpdateUserAccountPasswordService(formData, callback);
      setCountdown(5);
      return data;
    } catch (error) {
      console.error("Error during set password:", error);
      throw error;
    } finally {
      setIsSubmitting(false);
      setIsVerified(true);
    }
  };

  useEffect(() => {
    if (countdown === null) return;

    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      router.push(`/auth/login/success?callback=${callback}`);
    }
  }, [countdown]);

  useEffect(() => {
    if (!callback || !isSubmitting) return;

    const toastPromise = handleSavePasswordClick();
    toast.promise(toastPromise, {
      loading: "Updating...",
      success: "🎉 Successfully Updated New Password!",
      error: "An error occurred while updating the password",
    });
  }, [callback, isSubmitting]);

  return (
    <div className="flex flex-1 mt-12 md:mt-14">
      <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center z-50 bg-gray-800 bg-opacity-50 px-2 lg:p-0">
        <div className="relative mx-auto w-full max-w-[600px] lg:max-w-[800px] bg-white p-8 rounded-lg text-center">
          <FontAwesomeIcon icon={faLock} bounce size="2xl" />
          <h1 className="font-semibold uppercase text-xl mt-4">
            Set your new Password
          </h1>
          <SetupNewPasswordForm
            data={formData}
            handleInput={handleInputChange}
            handleSavePassword={handleSavePasswordClick}
            isSubmitting={isSubmitting}
            isVerified={isVerified}
          />
          {countdown !== null && countdown > 0 && (
            <p className="mt-4 text-lg text-gray-600">
              Redirecting to auth page in {countdown} seconds...
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthLoginRedirectSetPasswordPage;
