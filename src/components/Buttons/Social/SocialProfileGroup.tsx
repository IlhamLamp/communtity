import { iconMapping } from "@/lib/iconMapping";
import { TSocialLinks } from "@/types/profile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SocialProfileGroup: React.FC<{ data: TSocialLinks[] }> = ({ data }) => {
  return (
    <div className="px-2 flex gap-4 rounded-sm">
      {data
        ?.filter((link) => link?.is_exist)
        .map((social) => (
          <a
            key={social?.name}
            href={social?.link}
            target="_blank"
            className="cursor-pointer"
          >
            <FontAwesomeIcon
              icon={iconMapping[social.name ?? "Web"]}
              className="text-lg lg:text-xl text-slate-600 hover:text-navy"
            />
          </a>
        ))}
    </div>
  );
};

export default SocialProfileGroup;
