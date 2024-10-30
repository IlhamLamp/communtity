import { useProfile } from "@/context/ProfileContext";
import { UpdateUserProfile } from "@/service/profile";
import { uploadImageToCloudinary } from "@/service/uploadDownload";
import { TProfileUpdateResponse, TProfileUser } from "@/types/profile";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const ProfileImageModal: React.FC<{
  toggle: () => void;
  onProfileUpdated: () => void;
  type: "profile_picture" | "profile_cover";
}> = ({ toggle, onProfileUpdated, type }) => {
  const { profile } = useProfile();
  const [profileData, setProfileData] = useState<TProfileUser | null>(profile);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setProfileData(profile);
  }, [profile]);

  const handleChangePicture = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!profileData) return;

    const file = event.target.files?.[0];
    if (!file) return toast.error("Please select file first!");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const uploadResponse = await toast.promise(
        uploadImageToCloudinary(formData),
        {
          loading: "Uploading picture...",
          success: "🎉 Picture uploaded successfully!",
          error: "Failed to upload picture",
        }
      );

      const updatedProfileData = {
        ...profileData,
        [type]: uploadResponse.secure_url,
      };

      toast
        .promise(UpdateUserProfile(updatedProfileData), {
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
    } catch (error) {
      console.error("Profile update failed:", error);
    }
  };

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
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
          <div className="w-full mx-auto flex justify-center">
            <img
              src={
                type === "profile_picture"
                  ? profileData?.profile_picture || "/assets/avatar.png"
                  : profileData?.profile_cover || "/assets/cover.jpg"
              }
              alt={
                type === "profile_picture" ? "User Profile" : "Profile Cover"
              }
              className={`object-cover ${
                type === "profile_picture"
                  ? "w-[8rem] h-[8rem] lg:w-1/2 lg:h-[20rem]"
                  : "w-full h-[20rem] lg:h-[30rem]"
              }`}
            />
          </div>
        </div>
        <div className="mt-2">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleChangePicture}
            className="hidden"
            accept="image/*"
          />
          <button
            onClick={handleButtonClick}
            className="hover:shadow-form w-full rounded-md bg-PurpleLight hover:bg-Purple py-2 px-8 text-center text-sm font-semibold text-[#6A64F1] outline-none shadow-lg transition duration-100 ease-in-out"
          >
            Change{" "}
            {type === "profile_picture" ? "Profile Picture" : "Cover Photo"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileImageModal;
