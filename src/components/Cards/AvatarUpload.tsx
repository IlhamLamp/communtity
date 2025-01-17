import { useMainMenu } from "@/context/MainMenuContext";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

export const AvatarUpload: React.FC = () => {
  const { previewImgSrc, loadFileImg } = useMainMenu();
  return (
    <div className="relative flex-shrink-0 lg:my-2">
      <Image
        id="preview_img"
        className="h-[4rem] lg:h-[6rem] w-[4rem] lg:w-[6rem] object-cover rounded-full"
        src={previewImgSrc}
        alt="Current profile photo"
        width={300}
        height={100}
      />
      <label
        htmlFor="logo"
        className="absolute bottom-0 right-0 bg-purple-600 py-1 px-2 rounded-full cursor-pointer hover:bg-purple-800"
      >
        <FontAwesomeIcon icon={faPenToSquare} className="text-white" />
      </label>
      <input
        id="logo"
        name="logo"
        type="file"
        accept="image/*"
        onChange={loadFileImg}
        className="hidden"
      />
    </div>
  );
};
