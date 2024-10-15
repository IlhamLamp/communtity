import { TRegisterUser } from "@/types/user";
import {
  faAt,
  faEye,
  faEyeSlash,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const RegisterAccountForm: React.FC<{
  data: TRegisterUser;
  handleInput: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  handleRegister: (ev: React.FormEvent<HTMLFormElement>) => void;
}> = ({ data, handleInput, handleRegister }) => {
  const [errors, setErrors] = useState<TRegisterUser>({
    email: "",
    password: "",
    confirmation_password: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const toggleShowPassword = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = (
    ev: React.MouseEvent<HTMLButtonElement>
  ) => {
    ev.preventDefault();
    setShowConfirmPassword(!showConfirmPassword);
  };

  const validate = () => {
    const newErrors = { email: "", password: "", confirmation_password: "" };
    if (!data.email?.includes("@")) {
      newErrors.email = "Invalid email address";
    }
    if (data?.password && data.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }
    if (data.password !== data.confirmation_password) {
      newErrors.confirmation_password = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === "");
  };

  const handleFormSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      try {
        handleRegister(ev);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <form
      className="px-8 pt-6 pb-8 mb-4 bg-white rounded"
      onSubmit={handleFormSubmit}
    >
      <div className="mb-4">
        <div className="flex gap-2 items-center mb-2">
          <FontAwesomeIcon icon={faAt} />
          <label
            className="block text-sm font-bold text-gray-700"
            htmlFor="email"
          >
            Email
          </label>
        </div>
        <input
          className={`w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${
            errors.email ? "border-red-500" : "border-gray-100"
          }`}
          id="email"
          type="email"
          name="email"
          value={data.email}
          onChange={handleInput}
          placeholder="Email"
        />
        {errors.email && (
          <p className="text-xs italic text-red-500">{errors.email}</p>
        )}
      </div>
      <div className="mb-4 md:flex md:justify-between">
        <div className="mb-4 md:mr-2 md:mb-0">
          <div className="flex gap-2 items-center mb-2">
            <FontAwesomeIcon icon={faLock} />
            <label
              className="block text-sm font-bold text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
          </div>
          <div className="relative">
            <input
              className={`w-full pr-8 pl-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${
                errors.password ? "border-red-500" : "border-gray-100"
              }`}
              id="password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={data.password}
              onChange={handleInput}
              placeholder="******************"
            />
            <button
              onClick={toggleShowPassword}
              className="absolute right-2 top-2 cursor-pointer"
            >
              <FontAwesomeIcon
                icon={showPassword ? faEyeSlash : faEye}
                className="text-sm text-gray-700"
              />
            </button>
          </div>
          {errors.password && (
            <p className="text-xs italic text-red-500">{errors.password}</p>
          )}
        </div>
        <div className="md:ml-2">
          <label
            className="block mb-2 text-sm font-bold text-gray-700"
            htmlFor="c_password"
          >
            Confirm Password
          </label>
          <div className="relative">
            <input
              className={`w-full pr-8 pl-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${
                errors.confirmation_password
                  ? "border-red-500"
                  : "border-gray-100"
              }`}
              id="confirmation_password"
              type={showConfirmPassword ? "text" : "password"}
              name="confirmation_password"
              value={data.confirmation_password}
              onChange={handleInput}
              placeholder="******************"
            />
            <button
              onClick={toggleShowConfirmPassword}
              className="absolute right-2 top-2 cursor-pointer"
            >
              <FontAwesomeIcon
                icon={showConfirmPassword ? faEyeSlash : faEye}
                className="text-sm text-gray-700"
              />
            </button>
          </div>
          {errors.confirmation_password && (
            <p className="text-xs italic text-red-500">
              {errors.confirmation_password}
            </p>
          )}
        </div>
      </div>
      <div className="mb-3 text-center">
        <button
          className={`${
            isSubmitting
              ? "cursor-not-allowed bg-gray-100"
              : "bg-blue-500 hover:bg-blue-700"
          } w-full px-4 py-2 font-bold text-white rounded-full focus:outline-none focus:shadow-outline`}
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Registering..." : "Register Account"}
        </button>
      </div>
      <div className="flex flex-col mx-auto items-center gap-4 mb-4">
        <p className="text-sm text-gray-700 ">or, sign up with</p>
        <div className="flex justify-center items-center space-x-4">
          <button className="flex items-center space-x-2 bg-white shadow-md border border-gray-100 rounded-full px-4 py-2">
            <img
              src="https://tailus.io/sources/blocks/social/preview/images/google.svg"
              className="h-5 w-5"
              alt="google logo"
            />
            <span className="text-sm text-gray-700 ">Google</span>
          </button>
          <button className="flex items-center space-x-2 bg-white shadow-md border border-gray-100 rounded-full px-4 py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              className="h-5 w-5"
              viewBox="0 0 16 16"
            >
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z" />
            </svg>
            <span className="text-sm text-gray-700 ">GitHub</span>
          </button>
        </div>
      </div>
    </form>
  );
};

export default RegisterAccountForm;
