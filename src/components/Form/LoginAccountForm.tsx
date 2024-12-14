import { TBasicLoginUser } from "@/types/user";
import {
  faAt,
  faEye,
  faEyeSlash,
  faLock,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import toast from "react-hot-toast";
import OauthLoginBtn from "../Buttons/OauthLoginBtn";

const LoginAccountForm: React.FC<{
  data: TBasicLoginUser;
  handleInput: (ev: React.ChangeEvent<HTMLInputElement>) => void;
  handleLogin: (ev: React.FormEvent<HTMLFormElement>) => void;
  isLogin: boolean;
}> = ({ data, handleInput, handleLogin, isLogin }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const toggleShowPassword = (ev: React.MouseEvent<HTMLButtonElement>) => {
    ev.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleFormSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    if (!data.email || !data.password) {
      return toast.error("Please fill in both email and password.");
    }
    handleLogin(ev);
  };
  return (
    <form className="px-8 py-6 bg-white rounded" onSubmit={handleFormSubmit}>
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
          className={`${
            isLogin
              ? "cursor-not-allowed bg-gray-100 hover:bg-gray-200"
              : "bg-white"
          } w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-gray-100 rounded shadow appearance-none focus:outline-none focus:shadow-outline`}
          id="email"
          type="email"
          name="email"
          value={data.email}
          onChange={handleInput}
          placeholder="Email"
        />
      </div>
      <div className="mb-4">
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
            className={`${
              isLogin
                ? "cursor-not-allowed bg-gray-100 hover:bg-gray-200"
                : "bg-white"
            } w-full px-3 py-2 mb-3 text-sm leading-tight text-gray-700 border border-gray-100 rounded shadow appearance-none focus:outline-none focus:shadow-outline`}
            id="password"
            type={showPassword ? "text" : "password"}
            name="password"
            value={data.password}
            onChange={handleInput}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleFormSubmit(e as any);
              }
            }}
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
      </div>
      <div className="mb-3 text-center">
        <button
          className={`${
            isLogin
              ? "cursor-not-allowed bg-gray-100 hover:bg-gray-200"
              : "bg-blue-500 hover:bg-blue-700"
          } w-full px-4 py-2 font-bold text-white rounded-full focus:outline-none focus:shadow-outline`}
          type="submit"
        >
          {isLogin ? "Please wait..." : "Login"}
        </button>
      </div>
      <OauthLoginBtn />
    </form>
  );
};

export default LoginAccountForm;
