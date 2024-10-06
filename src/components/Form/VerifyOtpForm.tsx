import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

const VerifyOtpForm: React.FC = () => {
  const [timer, setTimer] = useState<number>(30);
  const [isRequestOtpDisabled, setIsRequestOtpDisabled] =
    useState<boolean>(true);

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

  const handleRequestAgain = () => {
    setTimer(30);
    setIsRequestOtpDisabled(true);
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
          <span className="font-semibold text-sm">john.doe@mail.com</span>
        </div>
        <div className="grid grid-cols-6 gap-x-4 my-6">
          <div
            contentEditable="true"
            className="rounded-lg bg-gray-100 cursor-text w-14 aspect-square flex items-center justify-center"
          >
            <span className="text-gray-700 dark:text-gray-400">1</span>
          </div>
          <div
            contentEditable="true"
            className="rounded-lg bg-gray-100 cursor-text w-14 aspect-square flex items-center justify-center"
          >
            <span className="text-gray-700 dark:text-gray-400">9</span>
          </div>
          <div
            contentEditable="true"
            className="rounded-lg bg-gray-100 cursor-text w-14 aspect-square flex items-center justify-center"
          >
            <span className="text-gray-700 dark:text-gray-400">6</span>
          </div>
          <div
            contentEditable="true"
            className="rounded-lg bg-gray-100 cursor-text w-14 aspect-square flex items-center justify-center"
          >
            <span className="text-gray-700 dark:text-gray-400">4</span>
          </div>
          <div
            contentEditable="true"
            className="rounded-lg bg-gray-100 cursor-text w-14 aspect-square flex items-center justify-center"
          >
            <span className="text-gray-700 dark:text-gray-400">3</span>
          </div>
          <div
            contentEditable="true"
            className="rounded-lg bg-gray-100 cursor-text w-14 aspect-square flex items-center justify-center"
          >
            <span className="text-gray-700 dark:text-gray-400">3</span>
          </div>
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
            onClick={handleRequestAgain}
          >
            Request again {timer > 0 ? `(00:00:${countdownSeconds})` : ""}
          </button>
        </div>
        <button className="w-full px-4 py-2 text-lg font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700">
          Verify
        </button>
      </div>
    </div>
  );
};

export default VerifyOtpForm;
