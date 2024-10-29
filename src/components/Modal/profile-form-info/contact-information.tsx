import { SearchUserProfile } from "@/service/profile";
import { TProfileUser } from "@/types/profile";
import {
  faAt,
  faBirthdayCake,
  faCheck,
  faClose,
  faPhone,
  faUser,
  faUserTag,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ChangeEvent, useCallback, useState } from "react";

const FormProfileContactInformation: React.FC<{
  data: TProfileUser | null;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof TProfileUser
  ) => void;
}> = ({ data, handleInputChange }) => {
  const email = sessionStorage.getItem("email") ?? "";
  const [isUsernameAvailable, setIsUsernameAvailable] =
    useState<boolean>(false);

  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timer: NodeJS.Timeout;
    return (...args: any[]) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const validateUsername = async (username: string) => {
    if (!username || username === "") {
      console.error("Username can't be empty");
      setIsUsernameAvailable(false);
      return;
    }

    try {
      const result = await SearchUserProfile(username);
      if (result.data && result.data.length > 0) {
        setIsUsernameAvailable(false);
      } else {
        setIsUsernameAvailable(true);
      }
    } catch (error) {
      console.error("An error occurred while validate username profile");
    }
  };

  const debouncedValidateUsername = useCallback(
    debounce(validateUsername, 500),
    []
  );

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleInputChange(e, "username");
    debouncedValidateUsername(e.target.value);
  };

  return (
    <div id="form-contact-information" className="mb-2 pt-2">
      <label className="mb-2 block text-sm font-semibold text-[#07074D] sm:text-xl">
        Contact Information
      </label>
      <div className="gap-2 grid grid-cols-2 lg:grid-cols-3">
        <div className="w-full">
          <label
            htmlFor="first_name"
            className="block text-sm font-medium text-[#07074D]"
          >
            <FontAwesomeIcon
              icon={faUser}
              className="pr-2 text-sm text-gray-600"
            />
            <span>First Name</span>
          </label>
          <input
            type="text"
            name="first_name"
            id="first_name"
            placeholder="John"
            value={data?.first_name || ""}
            onChange={(e) => handleInputChange(e, "first_name")}
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-sm font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="last_name"
            className="block text-sm font-medium text-[#07074D]"
          >
            Last Name
          </label>
          <input
            type="text"
            name="last_name"
            id="last_name"
            placeholder="Doe"
            value={data?.last_name || ""}
            onChange={(e) => handleInputChange(e, "last_name")}
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-sm font-medium text-[#6B7280]"
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="username"
            className="flex justify-between text-sm font-medium text-[#07074D]"
          >
            <div>
              <FontAwesomeIcon
                icon={faUserTag}
                className="pr-2 text-sm text-gray-600"
              />
              <span>Username</span>
            </div>
            {isUsernameAvailable ? (
              <span className="flex text-CardFour items-center gap-2">
                <FontAwesomeIcon icon={faCheck} /> Available
              </span>
            ) : (
              <span className="flex text-CardOne items-center gap-2">
                <FontAwesomeIcon icon={faClose} /> Unavailable
              </span>
            )}
          </label>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="jdoe99"
            value={data?.username || ""}
            onChange={handleUsernameChange}
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-sm font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-[#07074D]"
          >
            <FontAwesomeIcon
              icon={faAt}
              className="pr-2 text-sm text-gray-600"
            />
            <span>Email</span>
          </label>
          <input
            type="email"
            name="email"
            id="email"
            disabled={true}
            placeholder="user@mail.com"
            value={email || ""}
            className="w-full rounded-md border border-[#e0e0e0] bg-gray-100 py-2 px-4 text-sm font-medium text-[#6B7280] cursor-not-allowed"
          />
        </div>
        <div className="w-full">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-[#07074D]"
          >
            <FontAwesomeIcon
              icon={faPhone}
              className="pr-2 text-sm text-gray-600"
            />
            <span>Phone Number</span>
          </label>
          <div className="flex">
            <span className="inline-flex items-center px-3 rounded-l-md border border-[#e0e0e0] bg-gray-100 text-gray-600 text-sm">
              +62
            </span>
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="8123456789"
              value={data?.phone || ""}
              onInput={(e: ChangeEvent<HTMLInputElement>) => {
                e.target.value = e.target.value.replace(/[^0-9]/g, "");
                if (e.target.value.length > 13)
                  e.target.value = e.target.value.slice(0, 13);
              }}
              onChange={(e) => handleInputChange(e, "phone")}
              className="w-full rounded-r-md border border-[#e0e0e0] bg-white py-2 px-4 text-sm font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md no-sp"
            />
          </div>
        </div>
        <div className="w-full">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-[#07074D]"
          >
            <FontAwesomeIcon
              icon={faBirthdayCake}
              className="pr-2 text-sm text-gray-600"
            />
            <span>Birthday</span>
          </label>
          <input
            type="date"
            name="date"
            id="date"
            className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-sm font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            value={
              data?.birthday
                ? new Date(data.birthday).toISOString().split("T")[0]
                : ""
            }
            onChange={(e) => handleInputChange(e, "birthday")}
          />
        </div>
      </div>
    </div>
  );
};

export default FormProfileContactInformation;
