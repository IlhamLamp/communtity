import { usePublicResource } from "@/context/PublicContext";
import {
  TAddressFieldInputProfile,
  TExperience,
  TProfileUpdateResponse,
  TProfileUser,
} from "@/types/profile";
import { TRoleUser } from "@/types/role";
import { TTag } from "@/types/tag";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { bgTagColors } from "./bgTagColor";
import FormProfileContactInformation from "./profile-form-info/contact-information";
import FormProfileAddressDetails from "./profile-form-info/address-details";
import FormProfileWorkingStatus from "./profile-form-info/working-status";
import { UpdateUserProfile } from "@/service/profile";
import toast from "react-hot-toast";
import { useProfile } from "@/context/ProfileContext";

const ProfileInfoModal: React.FC<{
  toggle: any;
  onProfileUdpated: () => void;
}> = ({ toggle, onProfileUdpated }) => {
  const { profile } = useProfile();
  const [profileData, setProfileData] = useState<TProfileUser | null>(profile);
  const { roles, tags } = usePublicResource();

  // shared-state
  const [searchTerm, setSearchTerm] = useState<{
    role: string;
    tags: string;
  }>({
    role: "",
    tags: "",
  });

  const [filteredItems, setFilteredItems] = useState<
    TRoleUser[] | TTag[] | null
  >(null);
  const [isInputFocused, setIsInputFocused] = useState<{
    [key: string]: boolean;
  }>({ role: false, tags: false });
  const [visibleItemCount, setVisibleItemCount] = useState<number>(10);
  const [currentItemType, setCurrentItemType] = useState<"role" | "tags">(
    "role"
  );

  useEffect(() => {
    setProfileData(profile);
  }, [profile]);

  useEffect(() => {
    setSearchTerm((prev) => ({
      ...prev,
      role: profileData?.role?.name ?? "",
    }));
  }, [profileData]);

  useEffect(() => {
    const handler = setTimeout(() => {
      let itemsToFilter = currentItemType === "role" ? roles : tags;
      const searchValue =
        currentItemType === "role" ? searchTerm.role : searchTerm.tags;
      if (itemsToFilter && searchTerm) {
        const filtered = itemsToFilter.filter((item) =>
          item.name?.toLowerCase().includes(searchValue.toLowerCase())
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
    field: keyof TProfileUser | TAddressFieldInputProfile
  ) => {
    e.preventDefault();
    const { value } = e.target;
    setSearchTerm((prev) => ({
      ...prev,
      [field]: value,
    }));

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
        if (addressField === "zip_code") {
          setProfileData((prevData) => ({
            ...prevData,
            address: {
              ...prevData?.address,
              [addressField]: Number(value),
            },
          }));
        } else {
          setProfileData((prevData) => ({
            ...prevData,
            address: {
              ...prevData?.address,
              [addressField]: value,
            },
          }));
        }
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
        // const newTag = { ...item, color: getRandomBgColor() };
        const isTagExist = profileData.tags?.find((t) => t.name === item.name);
        if (!isTagExist) {
          setProfileData((prevData) => ({
            ...prevData,
            tags: [...(prevData?.tags || []), item],
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
    setSearchTerm((prev) => ({
      ...prev,
      [currentItemType]: "",
    }));
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

  const handleUpdateProfile = async () => {
    if (!profileData) return;
    toast
      .promise(UpdateUserProfile(profileData), {
        loading: "Updating profile...",
        success: "🎉 Profile updated successfully!",
        error: (err: TProfileUpdateResponse) =>
          err.message || "Failed to update profile",
      })
      .then(() => {
        onProfileUdpated();
      })
      .catch((error) => {
        console.error("Profile update failed:", error);
      });
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
            <FormProfileContactInformation
              data={profileData}
              handleInputChange={handleInputChange}
            />
            <FormProfileAddressDetails
              data={profileData}
              handleInputChange={handleInputChange}
            />
            <FormProfileWorkingStatus
              data={profileData}
              filteredItems={filteredItems}
              handleInputChange={handleInputChange}
              handleRemoveTag={handleRemoveTag}
              handleScrollRole={handleScrollRole}
              handleSelectItem={handleSelectItem}
              isInputFocused={isInputFocused}
              searchTerm={searchTerm}
              setCurrentItemType={setCurrentItemType}
              setIsInputFocused={setIsInputFocused}
              setVisibleItemCount={setVisibleItemCount}
              visibleItemCount={visibleItemCount}
            />
          </form>
        </div>
        <div className="mt-2">
          <button
            onClick={handleUpdateProfile}
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
