import { RegisterUserProfile } from "@/service/profile";
import { TRegisterResponse, TRegisterUser } from "@/types/user";
import { API_AUTHENTICATION_SERVICE } from "@/utils/constant";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const VerifyOtpForm: React.FC<{ data: TRegisterUser }> = ({ data }) => {
  const [timer, setTimer] = useState<number>(30);
  const [isRequestOtpDisabled, setIsRequestOtpDisabled] =
    useState<boolean>(true);
  const [otpValues, setOtpValues] = useState<string[]>(Array(6).fill(""));
  const [isVerified, setIsVerified] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(countdown);
    } else {
      setIsRequestOtpDisabled(false);
    }
  }, [timer]);

  const handleOtpChange = (
    ev: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = ev.target;
    if (value.match(/^[0-9]{1}$/) || value === "") {
      const newOtpValues = [...otpValues];
      newOtpValues[index] = value;
      setOtpValues(newOtpValues);

      // Automatically move to the next input if filled
      if (value && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) {
          (nextInput as HTMLInputElement).focus();
        }
      }
    }
  };

  const handleVerifyOTP = async () => {
    const otp_code = otpValues.join("");
    if (!data || otp_code.length !== 6) return;

    const verifyOtpPromise = fetch(`${API_AUTHENTICATION_SERVICE}verify`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id: data.id,
        email: data.email,
        otp_code,
      }),
    }).then(async (response) => {
      const responseData: TRegisterResponse = await response.json();
      if (!response.ok) {
        return Promise.reject(responseData.message);
        // throw new Error(responseData.message);
      }
      await RegisterUserProfile(data);
      return responseData;
    });

    toast
      .promise(verifyOtpPromise, {
        loading: "Verifying OTP...",
        success:
          "🎉 OTP verified successfully! redirects to the login page within 5 seconds",
        error: (err: TRegisterResponse) => err.message || "invalid otp",
      })
      .then(() => {
        setIsVerified(true);
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      });
  };

  const handleResendOTP = async () => {
    setIsRequestOtpDisabled(true);
    setTimer(30);

    const resendOtpPromise = fetch(`${API_AUTHENTICATION_SERVICE}resend-otp`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        id: data.id,
        email: data.email,
      }),
    }).then(async (response) => {
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Failed to resend OTP.");
      }
      return data;
    });

    toast.promise(resendOtpPromise, {
      loading: "Resending OTP...",
      success: "🎉 OTP has been resent to your email!",
      error: (err: TRegisterResponse) => err.message || "Failed to resend OTP.",
    });
  };

  const countdownSeconds = timer < 10 ? `0${timer}` : timer;

  return (
    <div className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
      <div className="w-full max-w-lg">
        <div className="flex flex-col justify-center items-center">
          <div className="flex flex-row w-full justify-center items-center text-center gap-2">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="text-lg text-gray-600"
            />
            <p className="text-gray-600 text-center text-sm">
              One Time Password (OTP) has been sent via Email to:
            </p>
          </div>
          <span className="font-semibold text-sm">{data?.email}</span>
        </div>
        {/* OTP input fields */}
        <div className="grid grid-cols-6 gap-x-4 my-6">
          {otpValues.map((value, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength={1}
              value={value}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleOtpChange(e, index)
              }
              className="rounded-lg bg-gray-100 cursor-text w-14 aspect-square text-center text-lg font-semibold"
            />
          ))}
        </div>
        <div className="flex justify-center items-center space-x-2 mb-6">
          <p className="text-sm font-medium text-center rounded text-gray-500">
            Didn't receive code?
          </p>
          <button
            className={`text-sm font-medium text-center rounded ${
              isRequestOtpDisabled
                ? "text-gray-400 cursor-not-allowed"
                : "text-blue-500 hover:text-blue-600"
            }`}
            disabled={isRequestOtpDisabled}
            onClick={handleResendOTP}
          >
            Request again {timer > 0 ? `(00:00:${countdownSeconds})` : ""}
          </button>
        </div>
        <button
          className={`w-full px-4 py-2 text-lg font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 ${
            isVerified ? "cursor-not-allowed opacity-50" : ""
          }`}
          onClick={handleVerifyOTP}
          disabled={isVerified}
        >
          Verify
        </button>
      </div>
    </div>
  );
};

export default VerifyOtpForm;
