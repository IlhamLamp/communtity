import { TRegisterUser } from "@/types/user";
import {
  faAt,
  faEye,
  faEyeSlash,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import OauthLoginBtn from "../Buttons/OauthLoginBtn";

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
      <OauthLoginBtn />
    </form>
  );
};

export default RegisterAccountForm;
