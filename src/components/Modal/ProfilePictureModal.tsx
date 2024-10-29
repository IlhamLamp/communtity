import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ProfilePictureModal: React.FC<{
  toggle: () => void;
  onProfileUdpated?: () => void;
}> = ({ toggle, onProfileUdpated }) => {
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
              src="/assets/avatar.png"
              alt="User Profile"
              className="object-cover w-[8rem] h-[8rem] bottom-[4rem] lg:w-[10rem] lg:h-[10rem] lg:bottom-[6rem]"
            />
          </div>
        </div>
        <div className="mt-2">
          <button
            // onClick={handleUpdateProfile}
            className="hover:shadow-form w-full rounded-md bg-PurpleLight hover:bg-Purple py-2 px-8 text-center text-sm font-semibold text-[#6A64F1] outline-none shadow-lg transition duration-100 ease-in-out"
          >
            Change Picture
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePictureModal;
