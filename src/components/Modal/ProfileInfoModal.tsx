import {
  TAddressFieldInputProfile,
  TExperience,
  TProfileUpdateResponse,
  TProfileUser,
  TSocialLinksFieldInputProfile,
} from "@/types/profile";
import { TTag } from "@/types/tag";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useProfile } from "@/context/ProfileContext";
import { UpdateUserProfileService } from "@/api/profile";
import { useFilter } from "@/context/FilterContext";
import FormProfileContactInformation from "../Form/profile-form-info/contact-information";
import FormProfileAddressDetails from "../Form/profile-form-info/address-details";
import FormProfileWorkingStatus from "../Form/profile-form-info/working-status";
import FormProfileSocialLink from "../Form/profile-form-info/social-link";

const ProfileInfoModal: React.FC<{
  toggle: () => void;
  onProfileUpdated: () => void;
}> = ({ toggle, onProfileUpdated }) => {
  const { profile } = useProfile();
  const [profileData, setProfileData] = useState<TProfileUser | null>(profile);

  const { setCurrentItemType, setSearchTerm } = useFilter();

  useEffect(() => {
    setProfileData(profile);
  }, [profile]);

  useEffect(() => {
    setSearchTerm((prev) => ({
      ...prev,
      role: profileData?.role?.name ?? "",
    }));
  }, [profileData]);

  const updateProfileData = <T extends object>(
    field: keyof T | string,
    value: any
  ) => {
    setProfileData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const updateNestedField = (field: string, value: any) => {
    const [mainField, subField] = field.split(".");
    setProfileData((prevData) => ({
      ...prevData,
      [mainField]: {
        ...(prevData?.[mainField as keyof TProfileUser] as any),
        [subField]: subField === "zip_code" ? Number(value) : value,
      },
    }));
  };

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

    const updateExperienceField = () => {
      const experienceOptions: Record<string, TExperience> = {
        no_experience: { value: "no_experience", label: "No Experience" },
        less_than_year: { value: "less_than_year", label: "< 1 year" },
        more_than_year: { value: "more_than_year", label: "> 1 year" },
      };
      updateProfileData<TProfileUser>("experience", experienceOptions[value]);
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
        updateProfileData<TProfileUser>(field, new Date(value));
        break;
      case "address.street":
      case "address.city":
      case "address.state":
      case "address.zip_code":
        updateNestedField(field, value);
        break;
      case "experience":
        updateExperienceField();
        break;
      default:
        updateProfileData<TProfileUser>(field as keyof TProfileUser, value);
        break;
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
              handleInputChange={handleInputChange}
              handleUpdateData={updateProfileData<TProfileUser>}
              handleRemoveTag={handleRemoveTag}
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
