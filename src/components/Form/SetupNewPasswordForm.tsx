import { TRegisterUser } from "@/types/user";
import {
  faEye,
  faEyeSlash,
  faShield,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const SetupNewPasswordForm: React.FC<{
  data: TRegisterUser;
  handleInput: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  handleSavePassword: (ev: React.FormEvent<HTMLFormElement>) => void;
  isSubmitting: boolean;
  isVerified: boolean;
}> = ({ data, handleInput, handleSavePassword, isSubmitting, isVerified }) => {
  const [showInputField, setShowInputField] = useState<{
    password: boolean;
    confirmation_password: boolean;
  }>({
    password: false,
    confirmation_password: false,
  });

  const [errors, setErrors] = useState<{
    password: string;
    confirmation_password: string;
  }>({ password: "", confirmation_password: "" });

  const toggleShowPassword = (
    ev: React.MouseEvent<HTMLButtonElement>,
    field: "password" | "confirmation_password"
  ) => {
    ev.preventDefault();
    setShowInputField((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const validate = () => {
    const newErrors = {
      password:
        data?.password && data.password.length < 8
          ? "Password must be at least 8 characters"
          : "",
      confirmation_password:
        data?.password !== data.confirmation_password
          ? "Passwords do not match"
          : "",
    };
    setErrors(newErrors);
    return newErrors;
  };

  const handleFormSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const currentErrors = validate();
    if (!Object.values(currentErrors).some((error) => error !== "")) {
      handleSavePassword(ev);
    }
  };

  const disableSaveButton =
    data.password === "" ||
    data.confirmation_password === "" ||
    isSubmitting ||
    isVerified ||
    Object.values(errors).some((err) => err !== "");

  return (
    <form
      onSubmit={handleFormSubmit}
      className="my-4 flex flex-col gap-2 mx-auto w-full lg:w-3/5"
    >
      <div id="password">
        <div className="flex gap-2 items-center mb-2">
          <FontAwesomeIcon icon={faShieldHalved} />
          <label
            className="block text-sm font-bold text-gray-700"
            htmlFor="password"
          >
            New Password
          </label>
        </div>
        <div className="relative">
          <input
            className={`w-full pr-8 pl-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${
              errors.password ? "border-red-500" : "border-gray-100"
            }`}
            id="password"
            type={showInputField.password ? "text" : "password"}
            name="password"
            value={data.password}
            onChange={handleInput}
            placeholder="******************"
          />
          <button
            onClick={(ev) => toggleShowPassword(ev, "password")}
            className="absolute right-2 top-2 cursor-pointer"
          >
            <FontAwesomeIcon
              icon={showInputField.password ? faEyeSlash : faEye}
              className="text-sm text-gray-700"
            />
          </button>
        </div>
        {errors.password && (
          <p className="text-xs italic text-red-500">{errors.password}</p>
        )}
      </div>

      <div id="confirmation_password">
        <div className="flex gap-2 items-center mb-2">
          <FontAwesomeIcon icon={faShield} />
          <label
            className="block text-sm font-bold text-gray-700"
            htmlFor="confirmation_password"
          >
            Confirmation Password
          </label>
        </div>
        <div className="relative">
          <input
            className={`w-full pr-8 pl-3 py-2 mb-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${
              errors.confirmation_password
                ? "border-red-500"
                : "border-gray-100"
            }`}
            id="confirmation_password"
            type={showInputField.confirmation_password ? "text" : "password"}
            name="confirmation_password"
            value={data.confirmation_password}
            onChange={handleInput}
            placeholder="******************"
          />
          <button
            onClick={(ev) => toggleShowPassword(ev, "confirmation_password")}
            className="absolute right-2 top-2 cursor-pointer"
          >
            <FontAwesomeIcon
              icon={showInputField.confirmation_password ? faEyeSlash : faEye}
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

      <div className="mb-3 text-center">
        <button
          className={`${
            disableSaveButton
              ? "cursor-not-allowed bg-gray-100"
              : "bg-blue-500 hover:bg-blue-700"
          } w-full px-4 py-2 font-bold text-white rounded-full focus:outline-none focus:shadow-outline`}
          type="submit"
          disabled={disableSaveButton}
        >
          {isSubmitting ? "Updating password..." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default SetupNewPasswordForm;
