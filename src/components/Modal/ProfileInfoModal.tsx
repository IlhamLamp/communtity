import { usePublicResource } from "@/context/PublicContext";
import {
  TAddress,
  TAddressFieldInputProfile,
  TExperience,
  TProfileUpdateResponse,
  TProfileUser,
  TSocialLinksFieldInputProfile,
} from "@/types/profile";
import { TRoleUser } from "@/types/role";
import { TTag } from "@/types/tag";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import FormProfileContactInformation from "./profile-form-info/contact-information";
import FormProfileAddressDetails from "./profile-form-info/address-details";
import FormProfileWorkingStatus from "./profile-form-info/working-status";
import toast from "react-hot-toast";
import { useProfile } from "@/context/ProfileContext";
import FormProfileSocialLink from "./profile-form-info/social-link";
import { UpdateUserProfileService } from "@/api/profile";

type ItemType = "role" | "tags";

const ProfileInfoModal: React.FC<{
  toggle: () => void;
  onProfileUpdated: () => void;
}> = ({ toggle, onProfileUpdated }) => {
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
  const [currentItemType, setCurrentItemType] = useState<ItemType>("role");

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
      const itemsToFilter = currentItemType === "role" ? roles : tags;
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
    field:
      | keyof TProfileUser
      | TAddressFieldInputProfile
      | TSocialLinksFieldInputProfile
  ) => {
    e.preventDefault();
    const { value } = e.target;

    const updateSocialLinkField = (field: TSocialLinksFieldInputProfile) => {
      setProfileData((prevData) => ({
        ...prevData,
        social_links: (prevData?.social_links || []).map((link) =>
          link.id === field.id ? { ...link, [field.subfield]: value } : link
        ),
      }));
    };

    const updateAddressField = (addressField: keyof TAddress) => {
      setProfileData((prevData) => ({
        ...prevData,
        address: {
          ...prevData?.address,
          [addressField]: addressField === "zip_code" ? Number(value) : value,
        },
      }));
    };

    const updateExperienceField = () => {
      const experienceOptions: Record<string, TExperience> = {
        no_experience: { value: "no_experience", label: "No Experience" },
        less_than_year: { value: "less_than_year", label: "< 1 year" },
        more_than_year: { value: "more_than_year", label: "> 1 year" },
      };
      setProfileData((prevData) => ({
        ...prevData,
        experience: experienceOptions[value],
      }));
    };

    setSearchTerm((prev) => ({
      ...prev,
      [field as keyof TProfileUser]: value,
    }));

    if (typeof field === "object" && field.key === "social_links") {
      updateSocialLinkField(field as TSocialLinksFieldInputProfile);
      return;
    }

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
        updateAddressField(addressField as keyof TAddress);
        break;
      case "experience":
        updateExperienceField();
        break;
      default:
        setProfileData((prevData) => ({
          ...prevData,
          [field as keyof TProfileUser]: value,
        }));
        break;
    }
  };

  const handleSelectItem = (item: TRoleUser | TTag) => {
    if (!profileData) return;
    const handlers: { [key in ItemType]: (item: TRoleUser | TTag) => void } = {
      role: (item: TRoleUser) => {
        setProfileData((prevData) => ({
          ...prevData,
          role: item,
        }));
      },
      tags: (item: TTag) => {
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

  const handleUpdateProfile = async () => {
    if (!profileData) return;
    toast
      .promise(UpdateUserProfileService(profileData), {
        loading: "Updating profile...",
        success: "🎉 Profile updated successfully!",
        error: (err: TProfileUpdateResponse) =>
          err.message || "Failed to update profile",
      })
      .then(() => {
        onProfileUpdated();
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
            <FormProfileSocialLink
              data={profileData}
              handleInputChange={handleInputChange}
            />
          </form>
        </div>

        <div className="mt-2">
          <button
            onClick={handleUpdateProfile}
            className="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-2 px-8 text-center text-sm font-semibold text-white outline-none"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfoModal;
