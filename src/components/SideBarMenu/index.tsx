import { menuItems } from "./data";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SideBarMenu: React.FC<{ isExpanded: boolean }> = ({ isExpanded }) => {
  return (
    <div className={isExpanded ? "mt-0" : "mt-10"}>
      {menuItems.map((i) => (
        <div className="flex flex-col gap-2 text-sm" key={i.title}>
          <span
            className={`text-gray-400 font-light my-2 ${
              isExpanded ? "block" : "hidden"
            }`}
          >
            {i.title}
          </span>
          <div
            className={`flex flex-col space-y-2 ${
              isExpanded ? "items-start" : "items-center"
            }`}
          >
            {i.items.map((item) => (
              <Link
                href={item.href}
                key={item.label}
                className={`flex items-center gap-4 text-gray-500 py-2 md:px-2 rounded-md hover:bg-Gray hover:text-Navy ${
                  isExpanded ? "justify-start" : "justify-center"
                }`}
              >
                <FontAwesomeIcon icon={item.icon} />
                <span className={`text-sm ${isExpanded ? "block" : "hidden"}`}>
                  {item.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SideBarMenu;
