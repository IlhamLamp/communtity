import { TProfileUser, TSocialLinksFieldInputProfile } from "@/types/profile";
import {
  faDiscord,
  faFacebook,
  faGithub,
  faInstagram,
  faLinkedin,
  faTelegram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FormProfileSocialLink: React.FC<{
  data: TProfileUser | null;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    field: TSocialLinksFieldInputProfile
  ) => void;
}> = ({ data, handleInputChange }) => {
  const iconMapping: Record<string, any> = {
    Linkedin: faLinkedin,
    Github: faGithub,
    Instagram: faInstagram,
    Facebook: faFacebook,
    Discord: faDiscord,
    Telegram: faTelegram,
    Twitter: faTwitter,
    Youtube: faYoutube,
    Web: faGlobe,
  };

  return (
    <div id="form-profile-socialLink" className="mb-2 pt-2">
      <label className="mb-2 block text-sm font-semibold text-[#07074D] sm:text-xl">
        Social Link (Optional)
      </label>
      <div className="gap-2 grid grid-cols-1 lg:grid-cols-3">
        {data?.social_links?.map((link) => (
          <div className="w-full" key={link.id}>
            <label
              htmlFor={link.name?.toLowerCase() ?? "unknown"}
              className="block text-sm font-medium text-[#07074D]"
            >
              <FontAwesomeIcon
                icon={iconMapping[link.name ?? "Web"]}
                className="pr-2 text-sm text-gray-600"
              />
              <span>{link.name ?? "unknown"}</span>
            </label>
            <input
              type="text"
              name={link.name?.toLowerCase() ?? "unknown"}
              id={link.name?.toLowerCase() ?? "unknown"}
              placeholder={`https://${
                link.name?.toLowerCase() ?? "example"
              }.com`}
              value={link.link ?? ""}
              onChange={(e) =>
                handleInputChange(e, {
                  key: "social_links",
                  id: link.id ?? -1,
                  subfield: "link",
                })
              }
              className="w-full rounded-md border border-[#e0e0e0] bg-white py-2 px-4 text-xs font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FormProfileSocialLink;
