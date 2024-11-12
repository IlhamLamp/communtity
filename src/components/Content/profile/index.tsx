"use client";
import SocialProfileGroup from "@/components/Buttons/Social/SocialProfileGroup";
import LoadingPage from "@/components/Loading/LoadingPage";
import ProfileInfoModal from "@/components/Modal/ProfileInfoModal";
import { useProfile } from "@/context/ProfileContext";
import { usePublicResource } from "@/context/PublicContext";
import { TProfileModalState } from "@/types/profile";
import { faCamera, faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import ProfileImageModal from "@/components/Modal/ProfileImageModal";

const ContentProfile: React.FC = () => {
  const { profile, refreshProfile, isLoading } = useProfile();
  const { refreshRoles, refreshTags } = usePublicResource();
  const [modalState, setModalState] = useState<TProfileModalState>({
    profileInfo: false,
    profilePicture: false,
    profileCover: false,
  });

  useEffect(() => {
    refreshProfile();
  }, []);

  const fullName =
    profile?.first_name && profile?.last_name
      ? `${profile.first_name} ${profile.last_name}`
      : profile?.first_name || profile?.last_name || "Anonymous";

  const toggleModal = (modalName: keyof TProfileModalState) => {
    setModalState((prevState) => ({
      ...prevState,
      [modalName]: !prevState[modalName],
    }));
  };

  const handleProfileUpdated = (modalName: keyof TProfileModalState) => {
    refreshProfile();
    refreshRoles();
    refreshTags();
    toggleModal(modalName);
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <section className="w-full overflow-hidden">
      <div className="w-full mx-auto">
        {/* COVER */}
        <div className="w-full mx-auto relative">
          <img
            src={profile?.profile_cover || "/assets/cover.jpg"}
            alt="User Cover"
            className="w-full h-[10rem] lg:h-[14rem]"
          />
          <div className="absolute right-4 bottom-4 cursor-pointer bg-black bg-opacity-20 rounded-full p-2">
            <FontAwesomeIcon
              icon={faCamera}
              className="text-white text-3xl"
              onClick={() => toggleModal("profileCover")}
            />
          </div>
        </div>
        {/* PROFILE */}
        <div className="w-full mx-auto h-[5rem] flex justify-center">
          <div className="relative">
            <img
              src={profile?.profile_picture || "/assets/avatar.png"}
              alt="User Profile"
              className="rounded-full object-cover w-[8rem] h-[8rem] bottom-[4rem] lg:w-[10rem] lg:h-[10rem] lg:bottom-[6rem] border-2 border-Navy shadow-xl relative"
            />
            <div className="absolute top-4 right-0 cursor-pointer bg-black bg-opacity-50 rounded-full p-2">
              <FontAwesomeIcon
                icon={faCamera}
                className="text-white text-xl"
                onClick={() => toggleModal("profilePicture")}
              />
            </div>
          </div>
        </div>
        {/* CONTENT */}
        <div className="w-[90%] lg:w-[80%] mx-auto lg:px-8 flex flex-col gap-4 justify-center items-center">
          <div className="w-full flex justify-center relative">
            <div id="profileNameRole">
              <h1 className="text-center text-slate-800 text-3xl lg:text-4xl">
                {fullName}
              </h1>
              <h5 className="text-center text-slate-600 text-xl">
                {profile?.role?.name}
              </h5>
            </div>
            <div className="absolute -top-5 lg:top-0 right-0 p-2 cursor-pointer">
              <FontAwesomeIcon
                icon={faPenToSquare}
                className="text-slate-600 text-xl lg:text-2xl"
                onClick={() => toggleModal("profileInfo")}
              />
            </div>
          </div>
          <p className="w-full text-gray-700 text-md text-justify px-4">
            {profile?.about}
          </p>
          <SocialProfileGroup data={profile?.social_links ?? []} />
          <div className="flex flex-wrap gap-4 justify-center items-center mt-10 mb-6">
            {Array.isArray(profile?.tags) &&
              profile.tags.length > 0 &&
              profile.tags.map((tag) => (
                <a
                  key={tag._id}
                  href={tag.name}
                  className={`cursor-pointer py-1 px-3 text-sm rounded-full flex items-center text-center ${tag.color}`}
                >
                  <span className="text-sm text-[#07074D]">{tag.name}</span>
                </a>
              ))}
          </div>
          {/* ALL INFO MODAL  */}
          {modalState.profileInfo && (
            <ProfileInfoModal
              toggle={() => toggleModal("profileInfo")}
              onProfileUpdated={() => handleProfileUpdated("profileInfo")}
            />
          )}
          {modalState.profilePicture && (
            <ProfileImageModal
              toggle={() => toggleModal("profilePicture")}
              onProfileUpdated={() => handleProfileUpdated("profilePicture")}
              type="profile_picture"
            />
          )}
          {modalState.profileCover && (
            <ProfileImageModal
              toggle={() => toggleModal("profileCover")}
              onProfileUpdated={() => handleProfileUpdated("profileCover")}
              type="profile_cover"
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default ContentProfile;
