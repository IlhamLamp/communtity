import { usePublicResource } from "@/context/PublicContext";
import { TProfileUser } from "@/types/profile";
import { TRoleUser } from "@/types/role";
import { faCircleXmark, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";

const ProfileInfoModal: React.FC<{
  data: TProfileUser | null;
  toggle: any;
}> = ({ data, toggle }) => {
  const email = sessionStorage.getItem("email") || "";
  const [profileData, setProfileData] = useState<TProfileUser | null>(data);
  const [tags, setTags] = useState<{ label: string; color: string }[]>([]);
  const [tagsInput, setTagsInput] = useState<string>("");
  const [tagSuggestions, setTagSuggestions] = useState<string[]>([]);
  const [lastColor, setLastColor] = useState<string | null>(null);

  const [roleSearchTerm, setRoleSearchTerm] = useState<string>("");
  const [filteredRoles, setFilteredRoles] = useState<TRoleUser[]>([]);
  const [isInputRoleFocused, setIsInputRoleFocused] = useState<boolean>(false);
  const { roles, isLoading } = usePublicResource();

  useEffect(() => {
    setProfileData(data);
  }, [data]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (roles && roleSearchTerm) {
        const filtered = roles.filter((role) =>
          role.name?.toLowerCase().includes(roleSearchTerm.toLowerCase())
        );
        setFilteredRoles(filtered);
      } else {
        setFilteredRoles(roles || []);
      }
    }, 300);
    return () => {
      clearTimeout(handler);
    };
  }, [roleSearchTerm, roles]);

  const allTags = [
    "Technology",
    "Programming",
    "Web Development",
    "Design",
    "AI",
    "Machine Learning",
  ];

  const bgColors = [
    "bg-blue-200 hover:bg-blue-300",
    "bg-green-200 hover:bg-green-300",
    "bg-yellow-200 hover:bg-yellow-300",
    "bg-indigo-200 hover:bg-indigo-300",
    "bg-purple-200 hover:bg-purple-300",
    "bg-pink-200 hover:bg-pink-300",
    "bg-red-200 hover:bg-red-300",
    "bg-orange-200 hover:bg-orange-300",
    "bg-teal-200 hover:bg-teal-300",
    "bg-gray-200 hover:bg-gray-300",
    "bg-lime-200 hover:bg-lime-300",
  ];

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: string
  ) => {
    const { value } = e.target;

    if (field === "role") {
      setRoleSearchTerm(value);
    }

    if (field === "birthday") {
      const dateValue = new Date(value);
      setProfileData((prevData) => ({
        ...prevData,
        [field]: dateValue,
      }));
    } else if (field.startsWith("address.")) {
      const addressField = field.split(".")[1];
      setProfileData((prevData) => ({
        ...prevData,
        address: {
          ...prevData?.address,
          [addressField]: value,
        },
      }));
    } else {
      setProfileData((prevData) => ({
        ...prevData,
        [field]: value,
      }));
    }
  };

  const handleSelectRole = (role: TRoleUser) => {
    setProfileData((prevData) => ({
      ...prevData,
      role,
    }));
    setFilteredRoles([]);
  };

  const handleAddTag = (tag: string) => {
    if (!tags.some((t) => t.label === tag)) {
      const color = getRandomBgColor();
      setTags((prevTags) => [...prevTags, { label: tag, color }]);
    }
    setTagsInput("");
    setTagSuggestions([]);
  };

  const handleRemoveTag = (
    tag: string,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    setTags(tags.filter((t) => t.label !== tag));
  };

  const getRandomBgColor = () => {
    let randomIndex = Math.floor(Math.random() * bgColors.length);
    let newColor = bgColors[randomIndex];
    while (newColor === lastColor) {
      randomIndex = Math.floor(Math.random() * bgColors.length);
      newColor = bgColors[randomIndex];
    }
    setLastColor(newColor);
    return newColor;
  };

  return (
    <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center z-50 bg-gray-800 bg-opacity-50 px-2 lg:p-0">
      <div className="relative mx-auto w-full max-w-[800px] bg-white p-8 rounded-lg">
        <button onClick={toggle} className="absolute -top-4 -right-2 text-xl">
          <FontAwesomeIcon
            icon={faCircleXmark}
            size="xl"
            className="bg-white rounded-full text-red-400"
          />
        </button>

        <div className="max-h-[70vh] overflow-y-auto pr-2">
          <form>
            <div className="mb-2">
              <label className="mb-2 block text-sm font-semibold text-[#07074D] sm:text-xl">
                Contact Information
              </label>
              <div className="gap-2 grid grid-cols-2 lg:grid-cols-3">
                <div className="w-full">
                  <label
                    htmlFor="first_name"
                    className="block text-sm font-medium text-[#07074D]"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    id="first_name"
                    placeholder="John"
                    value={profileData?.first_name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange(e, "first_name")
                    }
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
                    value={profileData?.last_name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange(e, "last_name")
                    }
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-sm font-medium text-[#6B7280] cursor-not-allowed"
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="username"
                    className="block text-sm font-medium text-[#07074D]"
                  >
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    placeholder="jdoe99"
                    value={profileData?.username}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange(e, "username")
                    }
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-sm font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[#07074D]"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    disabled={true}
                    placeholder="user@mail.com"
                    value={email}
                    className="w-full rounded-md border border-[#e0e0e0] bg-gray-100 py-2 px-4 text-sm font-medium text-[#6B7280] cursor-not-allowed"
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-[#07074D]"
                  >
                    Phone Number
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-[#e0e0e0] bg-gray-100 text-gray-600 text-sm">
                      +62
                    </span>
                    <input
                      type="number"
                      name="phone"
                      id="phone"
                      placeholder="8123456789"
                      value={profileData?.phone}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        handleInputChange(e, "phone")
                      }
                      className="w-full rounded-r-md border border-[#e0e0e0] bg-white py-2 px-4 text-sm font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md no-sp"
                    />
                  </div>
                </div>
                <div className="w-full">
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-[#07074D]"
                  >
                    Birthday
                  </label>
                  <input
                    type="date"
                    name="date"
                    id="date"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-sm font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                    value={
                      profileData?.birthday
                        ? profileData.birthday.toISOString().split("T")[0]
                        : ""
                    }
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange(e, "birthday")
                    }
                  />
                </div>
              </div>
            </div>

            <div className="mb-2 pt-2">
              <label className="mb-2 block text-sm font-semibold text-[#07074D] sm:text-xl">
                Address Details
              </label>
              <div className="gap-2 grid grid-cols-1 lg:grid-cols-3">
                <div className="w-full">
                  <label
                    htmlFor="city"
                    className="block text-sm font-medium text-[#07074D]"
                  >
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    placeholder="Jakarta"
                    value={profileData?.address?.city}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange(e, "address.city")
                    }
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-sm font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="state"
                    className="block text-sm font-medium text-[#07074D]"
                  >
                    State
                  </label>
                  <input
                    type="text"
                    name="state"
                    id="state"
                    placeholder="Indonesia"
                    value={data?.address?.state}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange(e, "address.state")
                    }
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-sm font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
                <div className="w-full">
                  <label
                    htmlFor="zip_code"
                    className="block text-sm font-medium text-[#07074D]"
                  >
                    ZIP Code
                  </label>
                  <input
                    type="number"
                    name="zip_code"
                    id="zip_code"
                    placeholder="11111"
                    value={data?.address?.zip_code}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange(e, "address.zip_code")
                    }
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-sm font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                </div>
              </div>
              <div className="w-full pt-2">
                <label
                  htmlFor="street"
                  className="block text-sm font-medium text-[#07074D]"
                >
                  Street
                </label>
                <input
                  type="text"
                  name="street"
                  id="street"
                  placeholder="Jl. Mawar No.80"
                  value={data?.address?.street}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleInputChange(e, "address.street")
                  }
                  className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-sm font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                />
              </div>
            </div>

            <div className="mb-2 pt-2">
              <label className="mb-2 block text-sm font-semibold text-[#07074D] sm:text-xl">
                Working Status
              </label>
              <div className="gap-2 grid grid-cols-1 lg:grid-cols-2">
                <div className="w-full">
                  <label
                    htmlFor="role"
                    className="block text-sm font-medium text-[#07074D]"
                  >
                    Role
                  </label>
                  <input
                    type="text"
                    name="role"
                    id="role"
                    placeholder="Search role"
                    value={profileData?.role?.name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange(e, "role")
                    }
                    onFocus={() => setIsInputRoleFocused(true)}
                    onBlur={() => setIsInputRoleFocused(false)}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-sm font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                  {isInputRoleFocused && filteredRoles.length > 0 && (
                    <ul className="bg-white border border-[#e0e0e0] rounded-md shadow-lg mt-1 max-h-40 overflow-y-auto absolute z-10">
                      {filteredRoles.map((role: TRoleUser) => (
                        <li
                          key={role._id}
                          onClick={() => handleSelectRole(role)}
                          className="cursor-pointer py-2 px-4 hover:bg-gray-200 text-sm"
                        >
                          {role.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="w-full">
                  <label
                    htmlFor="experience"
                    className="block text-sm font-medium text-[#07074D]"
                  >
                    Experience
                  </label>
                  <select
                    name="experience"
                    id="experience"
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-sm font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  >
                    <option value="">No Experience</option>
                    <option value="< 1 year">&lt; 1 year</option>
                    <option value="> 1 year">&gt; 1 year</option>
                  </select>
                </div>
              </div>
              <div className="w-full pt-2">
                <label
                  htmlFor="tags"
                  className="block text-sm font-medium text-[#07074D]"
                >
                  Tags
                </label>
                <div className="border border-[#e0e0e0] rounded-md p-2 flex flex-wrap items-center gap-2 bg-white">
                  {tags.map((tag, index) => (
                    <div
                      key={index}
                      className={`py-1 px-3 text-sm rounded-full flex items-center ${tag.color}`}
                    >
                      <span className="text-sm text-[#07074D]">
                        {tag.label}
                      </span>
                      <button
                        onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                          handleRemoveTag(tag.label, e)
                        }
                        className="ml-2 text-slate-800 hover:text-slate-600"
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    </div>
                  ))}

                  <input
                    type="text"
                    name="tags"
                    id="tags"
                    value={tagsInput}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange(e, "tags")
                    }
                    placeholder="Type to add tags"
                    className="flex-grow outline-none text-sm font-medium bg-transparent"
                  />
                </div>

                {/* Dropdown suggestion */}
                {tagSuggestions.length > 0 && (
                  <ul className="border border-gray-300 bg-white rounded-md shadow-lg mt-1 max-h-40 overflow-y-auto">
                    {tagSuggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        onClick={() => handleAddTag(suggestion)}
                        className="cursor-pointer py-2 px-4 text-sm hover:bg-gray-200"
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </form>
        </div>
        <div className="mt-2">
          <button className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-2 px-8 text-center text-sm font-semibold text-white outline-none">
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfoModal;
