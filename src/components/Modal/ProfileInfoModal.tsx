import { usePublicResource } from "@/context/PublicContext";
import { TExperience, TProfileUser } from "@/types/profile";
import { TRoleUser } from "@/types/role";
import { TTag } from "@/types/tag";
import { faCircleXmark, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { bgTagColors } from "./bgTagColor";

const ProfileInfoModal: React.FC<{
  data: TProfileUser | null;
  toggle: any;
}> = ({ data, toggle }) => {
  const email = sessionStorage.getItem("email") || "";
  const [profileData, setProfileData] = useState<TProfileUser | null>(data);
  const { roles, tags, isLoading } = usePublicResource();

  // // role
  // const [roleSearchTerm, setRoleSearchTerm] = useState<string>("");
  // const [filteredRoles, setFilteredRoles] = useState<TRoleUser[] | null>(null);
  // const [isInputRoleFocused, setIsInputRoleFocused] = useState<boolean>(false);
  // const [visibleRolesCount, setVisibleRolesCount] = useState<number>(10);

  // // tag
  // const [tagSearchTerm, setTagSearchTerm] = useState<string>("");
  // const [filteredTags, setFilteredTags] = useState<TTag[] | null>(null);
  // const [isInputTagFocused, setIsInputTagFocused] = useState<boolean>(false);
  // const [visibleTagsCount, setVisibleTagsCount] = useState<number>(10);

  // shared-state
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredItems, setFilteredItems] = useState<
    TRoleUser[] | TTag[] | null
  >(null);
  // const [isInputFocused, setIsInputFocused] = useState<boolean>(false);
  const [isInputFocused, setIsInputFocused] = useState<{
    [key: string]: boolean;
  }>({ role: false, tags: false });
  const [visibleItemCount, setVisibleItemCount] = useState<number>(10);
  const [currentItemType, setCurrentItemType] = useState<"role" | "tags">(
    "role"
  );

  useEffect(() => {
    setProfileData(data);
  }, [data]);

  useEffect(() => {
    const handler = setTimeout(() => {
      let itemsToFilter = currentItemType === "role" ? roles : tags;
      if (itemsToFilter && searchTerm) {
        const filtered = itemsToFilter.filter((item) =>
          item.name?.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredItems(filtered);
      } else {
        setFilteredItems(itemsToFilter || []);
      }
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, currentItemType, roles, tags]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
    field: string
  ) => {
    e.preventDefault();
    const { value } = e.target;
    setSearchTerm(value);

    switch (field) {
      case "role":
        setCurrentItemType("role");
        break;
      case "tags":
        setCurrentItemType("tags");
        break;
      case "birthday":
        const dateValue = new Date(value);
        setProfileData((prevData) => ({
          ...prevData,
          [field]: dateValue,
        }));
        break;
      case "address.street":
      case "address.city":
      case "address.state":
      case "address.zip_code":
        const addressField = field.split(".")[1];
        setProfileData((prevData) => ({
          ...prevData,
          address: {
            ...prevData?.address,
            [addressField]: value,
          },
        }));
        break;
      case "experience":
        const experienceOptions: Record<string, TExperience> = {
          no_experience: { value: "no_experience", label: "No Experience" },
          less_than_year: { value: "less_than_year", label: "< 1 year" },
          more_than_year: { value: "more_than_year", label: "> 1 year" },
        };
        setProfileData((prevData) => ({
          ...prevData,
          experience: experienceOptions[value],
        }));
        break;
      default:
        setProfileData((prevData) => ({
          ...prevData,
          [field]: value,
        }));
        break;
    }
  };

  const handleSelectItem = (item: TRoleUser | TTag) => {
    if (!profileData) return;
    const handlers: { [key: string]: (item: any) => void } = {
      role: (item: TRoleUser) => {
        setProfileData((prevData) => ({
          ...prevData,
          role: item,
        }));
      },
      tags: (item: TTag) => {
        const newTag = { ...item, color: getRandomBgColor() };
        const isTagExist = profileData.tags?.find(
          (t) => t.name === newTag.name
        );
        if (!isTagExist) {
          setProfileData((prevData) => ({
            ...prevData,
            tags: [...(prevData?.tags || []), newTag],
          }));
        } else {
          return alert("You have already added");
        }
      },
    };
    const handler = handlers[currentItemType];
    if (handler) {
      handler(item);
    }
    setSearchTerm("");
    setIsInputFocused({ ...isInputFocused, [currentItemType]: false });
    setFilteredItems(null);
  };

  const handleScrollRole = (e: React.UIEvent<HTMLUListElement, UIEvent>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight) {
      setVisibleItemCount((prevCount) => prevCount + 10);
    }
  };

  const handleRemoveTag = (
    tag: TTag,
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.preventDefault();
    if (!profileData) return;
    const updatedTags =
      profileData.tags?.filter((t) => t.name !== tag.name) || [];
    setProfileData((prevData) => ({
      ...prevData,
      tags: updatedTags,
    }));
  };

  const getRandomBgColor = () => {
    if (!tags || tags.length === 0)
      return bgTagColors[Math.floor(Math.random() * bgTagColors.length)];
    const lastColor = tags[tags.length - 1]?.color || "";
    let newColor = bgTagColors[Math.floor(Math.random() * bgTagColors.length)];
    while (newColor === lastColor) {
      newColor = bgTagColors[Math.floor(Math.random() * bgTagColors.length)];
    }
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
                <div className="w-full relative">
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
                    onFocus={() => {
                      setIsInputFocused({ ...isInputFocused, role: true });
                      setCurrentItemType("role");
                    }}
                    onBlur={() => {
                      setTimeout(
                        () =>
                          setIsInputFocused({ ...isInputFocused, role: false }),
                        150
                      );
                      setVisibleItemCount(10);
                    }}
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-sm font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  />
                  {isInputFocused.role &&
                    filteredItems &&
                    filteredItems.length > 0 && (
                      <ul
                        className="bg-white border border-[#e0e0e0] rounded-md shadow-lg mt-1 max-h-40 overflow-y-auto absolute z-10 w-full"
                        onMouseDown={(e) => e.preventDefault()}
                        onScroll={handleScrollRole}
                      >
                        {filteredItems
                          .slice(0, visibleItemCount)
                          .map((role: TRoleUser) => (
                            <li
                              key={role._id}
                              onClick={() => handleSelectItem(role)}
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
                    value={profileData?.experience?.value}
                    onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                      handleInputChange(e, "experience")
                    }
                    className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-sm font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                  >
                    <option value="no_experience">No Experience</option>
                    <option value="less_than_year">&lt; 1 year</option>
                    <option value="more_than_year">&gt; 1 year</option>
                  </select>
                </div>
              </div>
              <div className="w-full pt-2 relative">
                <label
                  htmlFor="tags"
                  className="block text-sm font-medium text-[#07074D]"
                >
                  Tags {JSON.stringify(searchTerm)}
                </label>
                <div className="border border-[#e0e0e0] rounded-md p-2 flex flex-wrap items-center gap-2 bg-white">
                  {Array.isArray(profileData?.tags) &&
                    profileData.tags.length > 0 &&
                    profileData.tags.map((tag, index) => (
                      <div
                        key={tag._id}
                        className={`cursor-default py-1 px-3 text-sm rounded-full flex items-center ${tag.color}`}
                      >
                        <span className="text-sm text-[#07074D]">
                          {tag.name}
                        </span>
                        <button
                          type="button"
                          onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                            handleRemoveTag(tag, e)
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
                    value={searchTerm}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleInputChange(e, "tags")
                    }
                    onFocus={() => {
                      setIsInputFocused({ ...isInputFocused, tags: true });
                      setCurrentItemType("tags");
                    }}
                    onBlur={() => {
                      setTimeout(
                        () =>
                          setIsInputFocused({ ...isInputFocused, tags: false }),
                        150
                      );
                      setVisibleItemCount(10);
                    }}
                    placeholder="Type to add tags"
                    className="flex-grow outline-none text-sm font-medium bg-transparent"
                  />
                </div>

                {/* Dropdown suggestion */}
                {isInputFocused.tags &&
                  filteredItems &&
                  filteredItems.length > 0 && (
                    <ul
                      onMouseDown={(e) => e.preventDefault()}
                      onScroll={handleScrollRole}
                      className="border border-gray-300 bg-white rounded-md shadow-lg mt-1 max-h-40 overflow-y-auto absolute z-10 w-full"
                    >
                      {filteredItems
                        .slice(0, visibleItemCount)
                        .map((tag: TTag) => (
                          <li
                            key={tag._id}
                            onClick={() => {
                              handleSelectItem(tag);
                            }}
                            className="cursor-pointer py-2 px-4 text-sm hover:bg-gray-200"
                          >
                            {tag.name}
                          </li>
                        ))}
                    </ul>
                  )}
              </div>
            </div>
          </form>
        </div>
        <div className="mt-2">
          <button
            onClick={() => console.log(profileData)}
            className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-2 px-8 text-center text-sm font-semibold text-white outline-none"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfoModal;
