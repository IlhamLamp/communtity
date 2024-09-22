import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { socialProfileGroupBtn } from "./data"

const SocialProfileGroup: React.FC = () => {
  return (
    <div className="px-2 flex gap-4 rounded-sm">
        { socialProfileGroupBtn.filter(data => data.is_exist).map((data) => (
            <a key={data?.id} href={data?.link} className="cursor-pointer">
              <FontAwesomeIcon icon={data?.icon} className="text-lg lg:text-xl text-slate-600 hover:text-navy"/>
            </a>
        ))}
    </div>
  )
}

export default SocialProfileGroup