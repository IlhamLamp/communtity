import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SocialProfileGroup: React.FC<{ data: any }> = ({ data }) => {
  return (
    <div className="px-2 flex gap-4 rounded-sm">
      {data
        ?.filter((link: any) => link?.is_exist)
        .map((social: any) => (
          <a key={social?.id} href={social?.link} className="cursor-pointer">
            <FontAwesomeIcon
              icon={social?.icon}
              className="text-lg lg:text-xl text-slate-600 hover:text-navy"
            />
          </a>
        ))}
    </div>
  );
};

export default SocialProfileGroup;
